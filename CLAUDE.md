# ToolBox — Claude Code 使用手册

> 内部工具集容器：插件化架构，浏览器访问，团队共享

---

## 快速上手

```bash
# 后端启动（开发模式，含插件热调试）
./gradlew :framework:bootRun -Pdev

# 前端启动（主程序前端，代理到后端 9090）
cd frontend && npm run dev

# 打包 Windows 绿色版
./gradlew clean packageWindows

# 单个插件打包
./gradlew :plugin-sample-sql-runner:jar
```

**⚠️ 插件目录说明（dev vs 部署，两个不同位置）：**

| 模式 | 插件目录 | 说明 |
|---|---|---|
| `bootRun -Pdev`（开发模式） | `framework/plugins/` | 工作目录是 `framework/`，相对路径解析到此 |
| 部署 / `packageWindows` | `dist/ToolBox/plugins/` | 打包产物目录 |

更新插件后必须把新 jar 放入对应目录再重启，否则服务器仍加载旧版本。

```bash
# 开发模式下更新插件（构建 + 复制 + 重启）
./gradlew :plugin-xxx:jar
cp plugin-xxx/build/libs/plugin-xxx-*.jar framework/plugins/
# 重启 bootRun
```

**环境要求：**
- JDK 21（`java -version` 验证）
- Node.js 20+，npm 10+
- Docker Desktop（集成测试用 Testcontainers）

---

## 项目结构

```
toolbox/
├── api/                    # 插件 API 接口（只有接口和数据模型，零实现）
├── framework/              # Spring Boot 主程序
├── frontend/               # 主应用前端（Vue 3 + Element Plus）
├── frontend-sdk/           # 插件前端 SDK（npm 包，peer dependency）
├── plugin-sample-sql-runner/      # 示例插件：SQL 查询器
├── plugin-sample-excel-importer/  # 示例插件：Excel 导入工具
├── plugin-sample-flow-viewer/     # 示例插件：流程图查看器
├── app/                    # 打包入口，生成 Windows 绿色版 zip
└── docs/                   # 设计文档（01-架构总览 ~ 05-部署运维）
```

---

## 后端分层规范

遵循程钰开发规范 v1.1，四层单向调用：

```
SyncHandler / TaskHandler        ← 入口层（只做参数解析 + 调 Service，禁止业务逻辑）
        ↓
    XxxService                   ← 业务层（编排逻辑，持有事务边界）
        ↓
    DataSourceManager / FileStore ← 原子层（单一能力调用）
        ↓
    PluginContext / Logger        ← 基础设施层（横切，不调业务）
```

**三条强制约束：**

1. **调用单向**：只能向下调用，禁止反向和循环
2. **事务归属业务层**：跨原子操作的一致性在 Service 里用 `dsm.inTransaction()` 包裹，禁止在 Handler 里管事务
3. **DTO 隔离**：`QueryResult` 不直接透传给前端，转成 VO 再返回；禁止裸 Entity 对外暴露

**入口层写法模板：**

```java
// SyncHandler 只做这两件事
@Override
public Object handle(String action, Map<String, Object> params) {
    return switch (action) {
        case "loadTemplates" -> service.loadTemplates();
        case "saveTemplate"  -> service.saveTemplate(params);
        default -> throw new ValidationException("Unknown action: " + action);
    };
}
```

---

## 新增插件标准流程

**必须按顺序完成所有步骤，缺一步插件不可用：**

```
步骤 1  plugin.properties       声明 id / class / category / frontendEntry
步骤 2  XxxPlugin.java          继承 PF4J Plugin + 实现 ToolBoxPlugin，init() 里注入 context
步骤 3  XxxExtension.java       @Extension 注解，实现 ToolExtension，注册到 META-INF/extensions.idx
步骤 4  SyncHandler（按需）     快速返回（<1秒）的同步请求处理
步骤 5  TaskHandler（按需）     长任务，必须响应中断（见下文）
步骤 6  前端 index.ts           导出 createView(api, toolId) 工厂函数
步骤 7  前端主视图 .vue         参照 HelloWorldView.vue 模板
步骤 8  vite.config.ts          确认 external 包含 vue / element-plus / @toolbox/frontend-sdk
步骤 9  ./gradlew :plugin-xxx:jar  编译验证，unzip -l 检查 jar 内容
步骤 10 放入 plugins/ 重启      浏览器验证工具树出现新入口
```

---

## TaskHandler 中断响应（强制）

所有 `TaskHandler` **必须**在循环和关键节点响应取消，否则任务无法中断，线程池被打满：

```java
for (int i = 0; i < total; i++) {
    // 每次迭代必须检查
    if (ctx.isCancelled()) {
        throw new InterruptedException("Task cancelled");
    }
    process(i);
    reporter.report((i + 1) * 100 / total, "处理第 " + (i + 1) + " 项");
}
```

进度上报频率：**不超过每秒 2 次**，高频上报会刷屏 SSE。

---

## 命名约定

| 对象 | 规范 | 示例 |
|---|---|---|
| plugin.id | 小写字母 + 短横线 | `sql-runner` |
| ToolExtension.getId() | `{plugin-id}-{tool}` | `sql-runner-main` |
| SyncHandler action | camelCase | `loadTemplates` |
| Java 包名 | `com.toolbox.plugin.{id无横线}` | `com.toolbox.plugin.sqlrunner` |
| 前端组件文件 | PascalCase.vue | `SqlRunnerView.vue` |
| 插件 jar 文件 | `plugin-{id}-{version}.jar` | `plugin-sql-runner-1.0.0.jar` |

---

## 前端插件禁止事项

| 禁止 | 替代方案 |
|---|---|
| 直接 `fetch('/api/**')` | 用 `api.plugin.callSync()` 或 `api.dataSource.query()` |
| `import` vue / element-plus | external，运行时由框架 importmap 提供 |
| 修改 `document.title` | `api.tab.setTitle()` |
| `localStorage` 存业务数据 | 多用户共用浏览器，用后端 `context.getDataDir()` 存储 |
| SyncHandler 里做 >1s 操作 | 改用 TaskHandler 提交后台任务 |
| new Thread() / 自建线程池 | TaskHandler 或 `context.getTaskManager().submit()` |

---

## 跨平台文件路径（强制）

Mac 开发 → Windows 部署，**禁止手拼路径**：

```java
// ✅ 正确：NIO Path API
Path file = context.getDataDir().resolve("config").resolve("settings.json");
Files.writeString(file, content, StandardCharsets.UTF_8);

// ❌ 禁止：手拼分隔符
String path = dataDir + "\\config\\settings.json";

// ❌ 禁止：依赖默认编码
new FileReader(file);        // Mac=UTF-8，Windows中文系统=GBK，会乱码
```

所有 IO **显式指定** `StandardCharsets.UTF_8`。

---

## 异常处理规范

```java
// 用户输入错误 → 给用户看的友好提示
throw new ValidationException("请先选择数据源");

// 业务错误
throw new ToolBoxException("当前状态不允许此操作");

// 包装第三方异常
try {
    callExternal();
} catch (IOException e) {
    throw new ToolBoxException("外部接口调用失败", e);
}

// DataSourceException 框架会自动展示，直接往上抛即可，不要吞
```

**不要 catch Exception 后静默吞掉**——让框架的 `@ControllerAdvice` 统一处理。

---

## 前端错误处理规范

框架会**自动弹错误对话框**，插件代码：

```typescript
// ✅ 正确：try-catch 只做 UI 回滚
try {
  loading.value = true;
  await api.dataSource.query({ ... });
} catch (e) {
  // 框架已弹错误，这里只撤销 UI 状态
} finally {
  loading.value = false;
}

// ❌ 错误：自己再弹一次错误提示（重复弹）
} catch (e) {
  api.notification.error(e.message);  // 框架已经弹过了
}
```

SSE 订阅**必须**在组件卸载时取消，否则内存泄漏：

```typescript
const unsubscribe = api.task.subscribe(taskId, { ... });
onBeforeUnmount(() => unsubscribe());
```

---

## 日志规范

```java
// 关键路径打 INFO（开始/完成/关键数量）
log.info("开始处理 Excel，共 {} 行", rows.size());

// 详情打 DEBUG
log.debug("处理第 {} 行: id={}", i, row.getId());

// 错误打 ERROR + 异常对象
log.error("导入失败", e);

// ❌ 禁止在循环里打 INFO（日志爆炸）
for (int i = 0; i < total; i++) {
    log.info("处理第 {} 行", i);   // 禁止
}
```

插件通过 `context.getLogger()` 拿 logger，自动输出到 `logs/plugin-{id}.log`。

---

## 依赖管理（插件）

```kotlin
dependencies {
    compileOnly(project(":api"))           // 框架提供，不打包
    compileOnly("org.pf4j:pf4j:3.10.0")   // 框架提供，不打包
    compileOnly("org.slf4j:slf4j-api:2.0.9")

    implementation("com.xxx:my-lib:1.0")   // 插件私有依赖，打进 lib/
}
```

**Spring 相关依赖一律不引入**——插件不在 Spring 容器里，`@Autowired` 不生效，通过 `PluginContext` 构造器注入代替。

---

## 常见问题

**Q：插件加载了但工具树看不到？**
A：检查 `ToolExtension` 是否有 `@Extension` 注解；检查 `META-INF/extensions.idx` 是否生成。

**Q：TaskHandler 取消不响应？**
A：检查循环里是否有 `ctx.isCancelled()` 判断，缺少则线程不会中断。

**Q：前端报 `Cannot find module '@toolbox/frontend-sdk'`？**
A：主项目根目录跑 `npm install`，让 workspace 链接生效。

**Q：Windows 部署乱码？**
A：检查所有 IO 是否显式指定了 `StandardCharsets.UTF_8`，以及 JVM 参数是否有 `-Dfile.encoding=UTF-8`。

**Q：数据源连不上？**
A：JDBC params 加 `useSSL=false`、`serverTimezone=Asia/Shanghai`、`characterEncoding=utf8mb4`。
