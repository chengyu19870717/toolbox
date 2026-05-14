# ToolBox 后端 API 参考

> 版本：v1.0
> 文档定位：框架后端暴露给插件的所有接口（PluginContext 及其下挂的 Manager / Service）的完整签名、参数、返回值、用法。
> 前置阅读：`02-插件开发指南.md`

---

## 1. 总览

后端插件 API 全部位于 `api` 模块（Java 包：`com.toolbox.api.**`）。

```
com.toolbox.api
├── plugin
│   ├── PluginContext           ← 插件上下文（核心入口）
│   ├── ToolBoxPlugin           ← 插件入口接口
│   ├── ToolExtension           ← 工具扩展点
│   └── handler
│       ├── SyncHandler         ← 同步处理器
│       ├── TaskHandler         ← 异步任务处理器
│       ├── TaskExecutionContext
│       └── ProgressReporter
├── datasource
│   ├── DataSourceManager       ← 数据源管理
│   ├── QueryRequest
│   ├── QueryResult
│   └── DataSourceInfo
├── task
│   ├── TaskManager             ← 任务管理
│   ├── TaskInfo
│   ├── TaskStatus
│   └── TaskArtifact
├── notification
│   └── NotificationService
└── exception
    ├── ToolBoxException
    ├── DataSourceException
    ├── ValidationException
    ├── TaskCancelledException
    └── PluginException
```

**插件依赖方式**：

```kotlin
// build.gradle.kts
dependencies {
    compileOnly(project(":api"))   // 不打包，运行时由框架提供
}
```

---

## 2. PluginContext

插件访问框架能力的**唯一入口**。框架在加载插件时，调用 `Plugin.init(context)` 注入。

```java
package com.toolbox.api.plugin;

public interface PluginContext {

    /** 当前插件 ID（来自 plugin.properties 的 plugin.id） */
    String getPluginId();

    /** 当前操作的用户名（基于线程上下文，处理请求时有值） */
    String getCurrentUser();

    /** 数据源管理器 */
    DataSourceManager getDataSourceManager();

    /** 任务管理器 */
    TaskManager getTaskManager();

    /** 通知服务 */
    NotificationService getNotificationService();

    /** 插件私有日志记录器（输出到 logs/plugin-{pluginId}.log） */
    Logger getLogger();

    /**
     * 插件私有数据目录: plugins-data/{pluginId}/
     * 框架保证目录存在。
     */
    Path getDataDir();

    /**
     * 框架版本（语义化）。
     */
    String getFrameworkVersion();
}
```

**生命周期**：
- 框架加载插件 → 调用 `ToolBoxPlugin.init(context)` 把 context 注入
- context 在插件停止前一直有效
- 不要把 context 跨进程/跨 JVM 传递（它持有 Spring bean 引用）

**线程上下文**：
- `getCurrentUser()` 基于 ThreadLocal，**只在处理用户请求的线程里有值**
- 在 `TaskHandler.execute()` 里通过 `TaskExecutionContext.getUsername()` 拿（更可靠）
- 在自己 new 的线程里，ThreadLocal 不会自动传递，需要先取出来再传过去

---

## 3. ToolBoxPlugin

插件入口接口（与 PF4J 的 `Plugin` 配合使用）。

```java
package com.toolbox.api.plugin;

public interface ToolBoxPlugin {

    /**
     * 框架在 PF4J 加载完成后立即调用。
     * 插件应在这里：
     *   - 保存 context 引用
     *   - 初始化业务（连接外部服务、加载配置等）
     */
    void init(PluginContext context);
}
```

**典型实现**：继承 PF4J 的 `Plugin` 类 + 实现 `ToolBoxPlugin`：

```java
public class HelloWorldPlugin extends Plugin implements ToolBoxPlugin {

    private PluginContext context;

    public HelloWorldPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    public void init(PluginContext context) {
        this.context = context;
    }

    @Override
    public void start() {
        // PF4J 标准生命周期
    }

    @Override
    public void stop() {
        // 清理
    }
}
```

---

## 4. ToolExtension

工具扩展点。每个插件可以注册多个 `ToolExtension`，每个对应工具树上的一个入口。

```java
package com.toolbox.api.plugin;

import org.pf4j.ExtensionPoint;

public interface ToolExtension extends ExtensionPoint {

    /** 工具唯一 ID（插件内唯一，建议加插件 ID 前缀避免冲突） */
    String getId();

    /** 显示名 */
    String getName();

    /** 描述（鼠标悬停时显示） */
    default String getDescription() { return ""; }

    /** 分类（用于工具树分组），默认值="其他" */
    default String getCategory() { return "其他"; }

    /** 图标（Material Design Icon 名） */
    default String getIcon() { return "mdi-wrench"; }

    /** 同步处理器（处理用户的同步请求），可空 */
    default SyncHandler getSyncHandler() { return null; }

    /** 异步任务处理器，可空 */
    default TaskHandler getTaskHandler() { return null; }

    /** 框架在加载完成后调用，注入 context */
    void init(PluginContext context);
}
```

**实现要求**：
- 类必须用 `@org.pf4j.Extension` 注解
- 必须有无参构造函数
- 框架会反射创建实例，每个插件单独的 ClassLoader

**示例**：

```java
@Extension
public class SqlRunnerExtension implements ToolExtension {

    private PluginContext context;

    @Override
    public void init(PluginContext context) {
        this.context = context;
    }

    @Override public String getId() { return "sql-runner-main"; }
    @Override public String getName() { return "SQL 查询器"; }
    @Override public String getCategory() { return "数据查询"; }
    @Override public String getIcon() { return "mdi-database"; }

    @Override
    public SyncHandler getSyncHandler() {
        return new SqlRunnerSyncHandler(context);
    }
}
```

---

## 5. SyncHandler

处理插件前端的同步请求（`api.plugin.callSync`）。

```java
package com.toolbox.api.plugin.handler;

public interface SyncHandler {

    /**
     * 处理一次同步调用。
     * @param action 前端 callSync 的第一个参数，约定的 action 名
     * @param params 前端 callSync 的第二个参数（已反序列化为 Map）
     * @return 任意可序列化为 JSON 的对象，会传回前端
     * @throws ToolBoxException 框架会自动展示给用户
     * @throws Exception 框架会包装为 ToolBoxException 展示
     */
    Object handle(String action, Map<String, Object> params) throws Exception;
}
```

**典型实现**：

```java
public class SqlRunnerSyncHandler implements SyncHandler {

    private final PluginContext context;

    public SqlRunnerSyncHandler(PluginContext context) {
        this.context = context;
    }

    @Override
    public Object handle(String action, Map<String, Object> params) {
        return switch (action) {
            case "loadTemplates" -> loadTemplates();
            case "saveTemplate" -> saveTemplate(params);
            case "deleteTemplate" -> deleteTemplate((String) params.get("id"));
            default -> throw new ValidationException("Unknown action: " + action);
        };
    }

    private List<SqlTemplate> loadTemplates() {
        // 从 context.getDataDir() 读模板文件
    }
}
```

**性能要求**：
- SyncHandler 必须**快速返回**（建议 1 秒内）
- 长时间操作改用 TaskHandler
- 同时执行的 SyncHandler 受 Spring MVC 默认线程池限制（200）

**安全要求**：
- 框架已做用户认证，handler 内部可以信任 `context.getCurrentUser()`
- 但权限校验需要插件自己做（如果有权限需求）

---

## 6. TaskHandler

处理后台异步任务。

```java
package com.toolbox.api.plugin.handler;

public interface TaskHandler {

    /**
     * 执行任务。
     * @param ctx 任务执行上下文（payload、progress reporter、用户名等）
     * @return 任务结果（包含产物）
     * @throws InterruptedException 任务被取消时抛出
     * @throws Exception 任何业务错误，框架会标记任务为 FAILED 并记录 error
     */
    TaskResult execute(TaskExecutionContext ctx) throws Exception;
}

public interface TaskExecutionContext {
    String getTaskId();
    String getPluginId();
    String getTaskType();
    String getTaskName();
    String getUsername();
    Map<String, Object> getPayload();
    ProgressReporter getProgressReporter();

    /** 检查任务是否已被取消（替代 Thread.isInterrupted） */
    boolean isCancelled();
}

public interface ProgressReporter {
    /**
     * 报告进度。
     * @param percent 0-100
     * @param message 当前阶段描述（可空）
     */
    void report(int percent, String message);

    /** 仅更新阶段消息，不变进度 */
    void message(String message);

    /** 输出日志行（会推送到前端的 ProgressPanel） */
    void log(String line);
}

public class TaskResult {
    private List<TaskArtifact> artifacts;
    private Map<String, Object> summary;     // 总结信息（前端可显示）

    // builder 模式
    public static Builder builder() { ... }

    public static class Builder {
        public Builder addArtifact(TaskArtifact artifact);
        public Builder summary(String key, Object value);
        public TaskResult build();
    }
}

public class TaskArtifact {
    private String name;             // 文件名
    private String path;             // 服务器绝对路径（temp/downloads/{user}/...）
    private String contentType;
    private long sizeBytes;

    public static Builder builder() { ... }
}
```

### 6.1 完整示例

```java
public class ExcelImportTaskHandler implements TaskHandler {

    private final PluginContext context;

    public ExcelImportTaskHandler(PluginContext context) {
        this.context = context;
    }

    @Override
    public TaskResult execute(TaskExecutionContext ctx) throws Exception {
        String fileId = (String) ctx.getPayload().get("fileId");
        String dataSourceId = (String) ctx.getPayload().get("dataSourceId");
        ProgressReporter reporter = ctx.getProgressReporter();

        reporter.report(0, "读取上传文件");
        Path inputFile = resolveUploadedFile(fileId, ctx.getUsername());

        reporter.report(10, "解析 Excel");
        List<UserRow> rows = parseExcel(inputFile);
        reporter.log("共解析 " + rows.size() + " 行");

        reporter.report(20, "写入数据库");
        int total = rows.size();
        int success = 0, failed = 0;

        for (int i = 0; i < total; i++) {
            // 必须响应中断
            if (ctx.isCancelled()) {
                throw new InterruptedException("任务被取消");
            }

            try {
                insertRow(dataSourceId, rows.get(i));
                success++;
            } catch (Exception e) {
                failed++;
                reporter.log("第 " + (i + 1) + " 行失败: " + e.getMessage());
            }

            // 每 100 行更新进度
            if (i % 100 == 0) {
                int percent = 20 + (i * 70 / total);
                reporter.report(percent, "已处理 " + (i + 1) + "/" + total);
            }
        }

        reporter.report(95, "生成报告");
        Path reportFile = generateReport(ctx, success, failed);

        reporter.report(100, "完成");

        return TaskResult.builder()
            .addArtifact(TaskArtifact.builder()
                .name("import-report.xlsx")
                .path(reportFile.toString())
                .contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .sizeBytes(Files.size(reportFile))
                .build())
            .summary("successCount", success)
            .summary("failedCount", failed)
            .build();
    }
}
```

### 6.2 中断响应

任务取消的实现：框架对线程调用 `Future.cancel(true)`，效果是 `Thread.interrupt()`。

**正确响应方式**：

```java
// 方式 1: 检查标志（推荐，可控）
if (ctx.isCancelled() || Thread.currentThread().isInterrupted()) {
    throw new InterruptedException("Cancelled");
}

// 方式 2: 调用本身响应中断的方法
Thread.sleep(100);                          // 抛 InterruptedException
queue.poll(1, TimeUnit.SECONDS);            // 抛 InterruptedException
future.get();                               // 抛 InterruptedException

// 方式 3: 数据库查询的取消
// 框架会在取消时自动调用 Statement.cancel()
// 你只需要正常 try-with-resources 拿连接、跑 SQL，被中断时抛 SQLException
```

**反面教材**：

```java
// ❌ 吞掉中断
try {
    Thread.sleep(1000);
} catch (InterruptedException ignored) {
    // 错！要么抛出，要么 Thread.currentThread().interrupt()
}

// ❌ 没有检查
while (true) {
    process();   // 永远不响应取消
}
```

### 6.3 文件产物的存放

任务产生的文件应放到 `temp/downloads/{username}/` 下，框架会：
- 保留 30 天（与任务一同清理）
- 通过 `/api/files/download/{taskId}/{name}` 暴露下载

**助手方法**（框架推荐用法，但需要插件自己实现或框架提供）：

```java
// 推荐：插件用自己的工具方法
private Path createOutputFile(TaskExecutionContext ctx, String filename) {
    Path dir = context.getFrameworkPaths()      // 由 framework 提供
                      .getDownloadsDir()
                      .resolve(ctx.getUsername())
                      .resolve(ctx.getTaskId());
    Files.createDirectories(dir);
    return dir.resolve(filename);
}
```

---

## 7. DataSourceManager

数据源连接和查询。

```java
package com.toolbox.api.datasource;

public interface DataSourceManager {

    /** 列出所有数据源（不含密码） */
    List<DataSourceInfo> list();

    /** 获取数据源信息（不含密码） */
    DataSourceInfo get(String dataSourceId);

    /** 测试连接（临时连接，不入连接池） */
    TestResult testConnection(String dataSourceId);

    /**
     * 执行查询。
     * 框架自动处理：连接获取、超时、行数限制、连接归还。
     */
    QueryResult query(QueryRequest request);

    /**
     * 在事务中执行多个操作。
     * lambda 内部用同一个 Connection。
     */
    <T> T inTransaction(String dataSourceId, TransactionalAction<T> action);

    /**
     * 拿到一个 Connection（自己管理生命周期，必须用 try-with-resources）。
     * 用于无法用上述高级 API 表达的场景。
     */
    Connection getConnection(String dataSourceId) throws SQLException;
}

public interface TransactionalAction<T> {
    T execute(Connection conn) throws SQLException;
}
```

### 7.1 QueryRequest

```java
public class QueryRequest {
    private String dataSourceId;       // 必填
    private String sql;                // 必填
    private List<Object> params;       // PreparedStatement 参数，可空
    private Integer timeoutSeconds;    // 默认 60
    private Integer maxRows;           // 默认 1000000
    private FetchMode fetchMode;       // ALL / STREAMING（默认 ALL）

    public static Builder builder() { ... }
}

public enum FetchMode {
    ALL,        // 一次性加载所有行到内存
    STREAMING   // 流式读取（用于真正的大数据量，需要插件自己消费迭代器）
}
```

### 7.2 QueryResult

```java
public class QueryResult {
    private List<ColumnMeta> columns;
    private List<Object[]> rows;
    private int rowCount;
    private boolean truncated;          // 是否被 maxRows 截断
    private long durationMs;

    /** 转换为 List<Map<String, Object>> 风格 */
    public List<Map<String, Object>> toMapList() { ... }

    /** 提取某一列 */
    public <T> List<T> column(String name) { ... }
    public <T> List<T> column(int index) { ... }

    /** 第一行第一列（标量结果） */
    public <T> T scalar() { ... }

    /** 仅取第一行 */
    public Map<String, Object> firstRow() { ... }

    /** 空结果（用于测试和默认值） */
    public static QueryResult empty() { ... }
}

public class ColumnMeta {
    private String name;
    private String jdbcType;            // "VARCHAR" / "INTEGER" / ...
    private int sqlType;                // java.sql.Types 数值
    private boolean nullable;
}
```

### 7.3 用法示例

**简单查询**：

```java
QueryRequest req = QueryRequest.builder()
    .dataSourceId("ds1")
    .sql("SELECT id, name, age FROM users WHERE age > ? LIMIT 100")
    .params(List.of(18))
    .timeoutSeconds(30)
    .build();

QueryResult result = dsm.query(req);

// 转 Map
List<Map<String, Object>> users = result.toMapList();
for (Map<String, Object> user : users) {
    System.out.println(user.get("name"));
}

// 提取某列
List<Long> ids = result.column("id");

// 标量
QueryResult countResult = dsm.query(QueryRequest.builder()
    .dataSourceId("ds1")
    .sql("SELECT COUNT(*) FROM users")
    .build());
Long count = countResult.scalar();
```

**事务**：

```java
boolean success = dsm.inTransaction("ds1", conn -> {
    try (PreparedStatement ps = conn.prepareStatement(
            "INSERT INTO users (name, age) VALUES (?, ?)")) {
        ps.setString(1, "Alice");
        ps.setInt(2, 25);
        ps.executeUpdate();
    }

    try (PreparedStatement ps = conn.prepareStatement(
            "UPDATE stats SET user_count = user_count + 1")) {
        ps.executeUpdate();
    }

    return true;
});
```

事务中任何 `SQLException` 都会自动回滚。

**手动管理 Connection**（用于复杂场景）：

```java
try (Connection conn = dsm.getConnection("ds1")) {
    // 自己控制 commit / rollback
    conn.setAutoCommit(false);
    try {
        // 复杂操作
        conn.commit();
    } catch (Exception e) {
        conn.rollback();
        throw e;
    }
}
```

### 7.4 错误处理

`DataSourceManager` 的所有方法在出错时抛 `DataSourceException`：

```java
try {
    QueryResult result = dsm.query(req);
} catch (DataSourceException e) {
    // 框架已经知道怎么展示这个异常给用户
    // 你可能需要做的：业务回滚、记录日志
    log.error("查询失败", e);
    throw e;  // 让框架处理给用户的展示
}
```

---

## 8. TaskManager

任务管理（**插件一般不直接调用**——TaskHandler 由框架自动调度）。

```java
package com.toolbox.api.task;

public interface TaskManager {

    /**
     * 提交一个任务。
     * 一般情况下插件不直接调用此方法，而是让前端通过 api.task.submit
     * 触发，框架自动找到对应的 TaskHandler 执行。
     *
     * 仅在插件需要"自动触发任务"（无前端交互）时使用。
     */
    String submit(TaskSubmitRequest request);

    /** 取消任务 */
    void cancel(String taskId);

    /** 获取任务信息 */
    TaskInfo get(String taskId);

    /** 列出某用户的任务 */
    List<TaskInfo> listByUser(String username, TaskListFilter filter);
}

public class TaskSubmitRequest {
    private String pluginId;
    private String taskType;
    private String name;
    private String username;
    private Map<String, Object> payload;
    private TaskHandler handler;       // 直接传 handler

    public static Builder builder() { ... }
}

public class TaskInfo {
    private String id;
    private String pluginId;
    private String taskType;
    private String name;
    private String username;
    private TaskStatus status;
    private int progressPercent;
    private String progressMessage;
    private Instant submittedAt;
    private Instant startedAt;
    private Instant finishedAt;
    private String errorMessage;
    private List<TaskArtifact> artifacts;
}

public enum TaskStatus {
    PENDING,        // 在队列里，未开始
    RUNNING,        // 执行中
    SUCCESS,        // 成功
    FAILED,         // 失败
    CANCELLED       // 已取消
}
```

---

## 9. NotificationService

向用户发送通知（在 Web 端弹 Toast）。

```java
package com.toolbox.api.notification;

public interface NotificationService {

    /** 通知特定用户 */
    void send(String username, NotificationLevel level, String message);

    /** 简便方法 */
    default void info(String username, String message) {
        send(username, NotificationLevel.INFO, message);
    }
    default void success(String username, String message) {
        send(username, NotificationLevel.SUCCESS, message);
    }
    default void warning(String username, String message) {
        send(username, NotificationLevel.WARNING, message);
    }
    default void error(String username, String message) {
        send(username, NotificationLevel.ERROR, message);
    }
}

public enum NotificationLevel {
    INFO, SUCCESS, WARNING, ERROR
}
```

**用法**：

```java
notificationService.success(ctx.getUsername(), "数据导入完成，成功 " + count + " 条");
```

**说明**：
- 通知通过 SSE 推送到该用户的浏览器
- 用户当前不在线（没打开浏览器）→ 通知丢弃（第一版不持久化通知）
- 不要滥用通知，频繁通知会让用户烦

---

## 10. 异常类

### 10.1 ToolBoxException（基类）

```java
public class ToolBoxException extends RuntimeException {
    private final String userMessage;     // 给用户看的友好消息
    private final String errorCode;        // 错误代码（可选）

    public ToolBoxException(String message);
    public ToolBoxException(String message, Throwable cause);
    public ToolBoxException(String userMessage, String errorCode, Throwable cause);

    public String getUserMessage();
    public String getErrorCode();
}
```

### 10.2 子类

```java
/** 数据源相关错误（连接失败、查询失败、语法错误等） */
public class DataSourceException extends ToolBoxException { ... }

/** 输入校验失败（参数缺失、格式不对等） */
public class ValidationException extends ToolBoxException { ... }

/** 任务被取消（InterruptedException 包装） */
public class TaskCancelledException extends ToolBoxException { ... }

/** 插件加载或配置错误 */
public class PluginException extends ToolBoxException { ... }
```

### 10.3 抛出建议

```java
// 用户输入错误
throw new ValidationException("请先选择数据源");

// 业务错误
throw new ToolBoxException("订单状态不允许此操作");

// 包装第三方异常
try {
    callExternalApi();
} catch (IOException e) {
    throw new ToolBoxException("外部接口调用失败", e);
}

// DataSourceException 通常框架内部抛，插件直接往上传播
```

### 10.4 框架统一处理

抛出的异常会被全局 `@ControllerAdvice` 捕获：
- 序列化为 `{ code, message, detail }` JSON 返回
- `userMessage` 为空时用 `getMessage()`
- 前端自动弹错误对话框
- 详情（堆栈）只在开发模式返回，生产环境隐藏

---

## 11. Logger

通过 `PluginContext.getLogger()` 拿到，使用 SLF4J Logger 接口：

```java
Logger log = context.getLogger();

log.trace("trace message: {}", value);
log.debug("debug message: {}", value);
log.info("info message: {}", value);
log.warn("warn message: {}", value);
log.error("error message", exception);
```

**特点**：
- 自动加上插件 ID 前缀
- 输出到独立文件 `logs/plugin-{pluginId}.log`
- 滚动策略与框架日志一致（按天 + 50MB，保留 30 天）
- 级别可在 `application.yml` 配置：

```yaml
logging:
  level:
    com.toolbox.plugin.helloworld: DEBUG
```

**最佳实践**：
- 关键路径打 INFO（"开始处理"、"处理完成 x 条"）
- 详情打 DEBUG
- 错误打 ERROR + 异常对象
- 不要在循环里打 INFO

---

## 12. 路径与文件

### 12.1 通过 PluginContext

```java
// 插件私有数据目录: plugins-data/{pluginId}/
Path dataDir = context.getDataDir();

// 自己组织子目录
Path config = dataDir.resolve("config.json");
Path userConfig = dataDir.resolve("users").resolve(currentUser).resolve("settings.json");
Files.createDirectories(userConfig.getParent());
```

### 12.2 上传/下载临时目录

第一版需要插件**自己拼路径**（约定优于配置）：

```java
// 上传文件位置（用户上传后框架告诉前端 fileId，前端传给后端）
// 后端怎么拿到上传的文件？前端通过 callSync 把 fileId 传过来，
// 后端调用框架提供的 FileResolver 查找：

// 框架可能提供（推荐在 PluginContext 上加）：
Path uploadedFile = context.resolveUploadedFile(fileId);

// 任务产物存放位置：
Path artifactDir = context.getArtifactDir(taskId);  // temp/downloads/{user}/{taskId}/
Files.createDirectories(artifactDir);
Path artifact = artifactDir.resolve("output.xlsx");
```

> **设计待补充**：以上 `resolveUploadedFile` / `getArtifactDir` 接口将在第一版实现里加到 `PluginContext` 上，本文档保留设计意图。

### 12.3 文件操作规范

```java
// ✅ 正确：用 NIO Path API
Path dir = context.getDataDir();
Path file = dir.resolve("data.json");
Files.writeString(file, jsonContent, StandardCharsets.UTF_8);

// ❌ 错误：手拼路径
String path = dataDir + "\\data.json";   // 跨平台要炸

// ✅ 正确：所有 IO 显式 UTF-8
Files.readString(file, StandardCharsets.UTF_8);
new InputStreamReader(stream, StandardCharsets.UTF_8);

// ❌ 错误：依赖默认编码
new FileReader(file);    // Mac 是 UTF-8，Windows 中文系统是 GBK
```

---

## 13. 依赖注入

插件**不能用 Spring** 的 `@Autowired` 等注解——插件不在 Spring 容器里。

正确做法：通过 `PluginContext` 拿能力，构造器注入到自己的类里。

```java
// ❌ 错误
public class HelloService {
    @Autowired private DataSourceManager dsm;   // 不会工作
}

// ✅ 正确
public class HelloService {
    private final DataSourceManager dsm;
    public HelloService(PluginContext context) {
        this.dsm = context.getDataSourceManager();
    }
}

// 在 ToolExtension.init() 里组装
@Override
public void init(PluginContext context) {
    this.helloService = new HelloService(context);
}
```

---

## 14. 线程模型

### 14.1 SyncHandler

- 在 Spring MVC 的 HTTP 工作线程里调用
- 默认 200 个并发上限（Tomcat 默认）
- ThreadLocal 里有 `currentUser` 等上下文
- **不要**在 SyncHandler 里 new Thread，更不要 fire-and-forget

### 14.2 TaskHandler

- 在框架的任务线程池里调用（每个用户最多 5 个并发，超出排队）
- ThreadLocal **不会**自动传递（不同线程）
- 通过 `TaskExecutionContext.getUsername()` 拿用户

### 14.3 自己起线程的注意事项

```java
// ❌ 危险：fire-and-forget
new Thread(() -> {
    // 长时间任务
}).start();
// → 没有取消能力、没有进度上报、没有结果

// ✅ 正确：任何长任务都用 TaskHandler
api.task.submit(...)  // 前端发起
// 或者：
context.getTaskManager().submit(...)  // 后端自动触发

// ✅ 唯一例外：插件内部的小型异步操作
private final ExecutorService executor = Executors.newSingleThreadExecutor();

@PreDestroy
void shutdown() {
    executor.shutdownNow();   // Plugin.stop() 里调
}
```

---

## 15. 配置文件读写

第一版没有专门的配置 API，插件自己读写 JSON 文件：

```java
public class PluginConfig {

    private final Path configFile;
    private final ObjectMapper mapper = new ObjectMapper();

    public PluginConfig(PluginContext context) {
        this.configFile = context.getDataDir().resolve("config.json");
    }

    public synchronized Settings load() throws IOException {
        if (!Files.exists(configFile)) {
            return new Settings();
        }
        return mapper.readValue(Files.readAllBytes(configFile), Settings.class);
    }

    public synchronized void save(Settings settings) throws IOException {
        Files.createDirectories(configFile.getParent());
        Path tmp = configFile.resolveSibling(configFile.getFileName() + ".tmp");
        mapper.writerWithDefaultPrettyPrinter().writeValue(tmp.toFile(), settings);
        Files.move(tmp, configFile, StandardCopyOption.ATOMIC_MOVE,
                                     StandardCopyOption.REPLACE_EXISTING);
    }
}
```

**注意**：
- 多线程并发 `save` 要加锁
- 写入用临时文件 + 原子重命名（避免半截文件）
- 显式指定 UTF-8（Jackson 默认就是 UTF-8，OK）

---

## 16. 完整调用链示例

把上面所有 API 串起来——一个完整的"导入用户 Excel"流程：

```
用户操作 → 前端 → 后端 SyncHandler → 后端 TaskHandler → 数据源 → 任务完成 → 通知用户
```

**前端**：

```typescript
// excel-importer/frontend/src/View.vue
async function startImport() {
  // 1. 上传文件
  const uploaded = await api.file.upload(selectedFile);

  // 2. 验证（同步调用）
  const validation = await api.plugin.callSync('validateFile', {
    fileId: uploaded.fileId,
  });

  if (validation.errors.length > 0) {
    api.notification.error(`文件校验失败：${validation.errors.join(', ')}`);
    return;
  }

  // 3. 提交任务
  const { taskId } = await api.task.submit({
    name: '导入用户数据',
    payload: {
      fileId: uploaded.fileId,
      dataSourceId: dsId.value,
    },
  });

  // 4. 订阅进度（ProgressPanel 组件自动做了）
  currentTaskId.value = taskId;
}
```

**后端 SyncHandler**：

```java
@Override
public Object handle(String action, Map<String, Object> params) throws Exception {
    if ("validateFile".equals(action)) {
        String fileId = (String) params.get("fileId");
        Path file = context.resolveUploadedFile(fileId);

        List<String> errors = new ArrayList<>();
        try (var workbook = WorkbookFactory.create(file.toFile())) {
            // 校验逻辑
            if (workbook.getNumberOfSheets() == 0) {
                errors.add("Excel 没有 Sheet");
            }
        }

        return Map.of("errors", errors);
    }
    throw new ValidationException("Unknown action: " + action);
}
```

**后端 TaskHandler**（已在前面给过完整示例）。

**插件 ToolExtension**：

```java
@Extension
public class ExcelImporterExtension implements ToolExtension {

    private PluginContext context;
    private SyncHandler syncHandler;
    private TaskHandler taskHandler;

    @Override
    public void init(PluginContext context) {
        this.context = context;
        this.syncHandler = new ExcelImporterSyncHandler(context);
        this.taskHandler = new ExcelImportTaskHandler(context);
    }

    @Override public String getId() { return "excel-importer-main"; }
    @Override public String getName() { return "Excel 数据导入"; }
    @Override public String getCategory() { return "数据加工"; }
    @Override public SyncHandler getSyncHandler() { return syncHandler; }
    @Override public TaskHandler getTaskHandler() { return taskHandler; }
}
```

---

## 17. API 演进策略

### 17.1 兼容性承诺

- `api` 模块的 public 接口保持**向后兼容**到下一个 major 版本
- 新增方法 → MINOR+1
- 行为修改 / 删除 → MAJOR+1
- 加 `@Deprecated` 标记后至少保留一个 MINOR 版本

### 17.2 插件适配

- 插件 `plugin.properties` 声明 `toolbox.minFrameworkVersion`
- 框架启动时检查，不满足时拒绝加载并给出明确错误
- 跨 MAJOR 升级时插件需要重新构建测试

### 17.3 内部 API 防滥用

- `framework` 模块的类**不在** `api` 模块导出
- 插件 ClassLoader 看不到 `framework.**` 的类
- 想用 framework 内部能力，请提 issue 走 API 评审

---

## 18. 速查表

最常用的 API 一览：

| 场景 | 调用 |
|---|---|
| 拿数据源管理器 | `context.getDataSourceManager()` |
| 列出数据源 | `dsm.list()` |
| 执行查询 | `dsm.query(QueryRequest.builder()...)` |
| 事务 | `dsm.inTransaction(dsId, conn -> { ... })` |
| 拿日志 | `context.getLogger()` |
| 拿私有数据目录 | `context.getDataDir()` |
| 当前用户 | `context.getCurrentUser()` 或 `ctx.getUsername()` |
| 通知用户 | `context.getNotificationService().success(user, msg)` |
| 报告任务进度 | `ctx.getProgressReporter().report(50, "处理中")` |
| 检查取消 | `ctx.isCancelled()` |
| 抛业务错误 | `throw new ToolBoxException("订单不存在")` |
| 抛参数校验错误 | `throw new ValidationException("缺少 dataSourceId")` |

---

**文档结束**

*接下来：`05-部署运维指南.md`*
