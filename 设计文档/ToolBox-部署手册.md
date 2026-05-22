# ToolBox 内网部署手册

**版本**：1.0.0  
**适用环境**：Windows Server 2019 / Windows 10/11（64位）  
**更新日期**：2026-05-20

---

## 一、部署包说明

```
ToolBox-1.0.0-windows.zip
└── ToolBox/
    ├── bin/
    │   ├── start.bat          启动脚本
    │   └── toolbox.vmoptions  JVM 参数
    ├── config/
    │   └── application.yml    服务配置（端口、路径、安全等）
    ├── lib/
    │   └── toolbox-app.jar    主程序（含前端静态资源）
    ├── plugins/               插件目录
    │   ├── plugin-data-standard-1.0.0.jar   数据标准
    │   ├── plugin-file-search-1.0.0.jar     文件检索
    │   ├── plugin-flow-parser-1.0.0.jar     流程解析
    │   └── plugin-todo-1.0.0.jar            待办任务
    ├── data/                  运行时数据（自动创建）
    ├── logs/                  日志（自动创建）
    ├── plugins-data/          插件数据（自动创建）
    └── temp/                  临时文件（自动创建）
```

---

## 二、环境要求

| 项目 | 要求 | 说明 |
|---|---|---|
| 操作系统 | Windows 10/11 / Server 2016+（64位） | — |
| Java | **JRE 21**（内置或系统均可） | 必须 21+，不兼容旧版本 |
| 内存 | ≥ 4 GB 可用内存 | 默认 JVM 堆 256MB~2GB |
| 磁盘 | ≥ 2 GB 空闲 | 日志和文件检索索引会持续增长 |
| 网络 | 仅需局域网访问 | 浏览器访问 9090 端口 |

---

## 三、Java 版本处理（重要）

ToolBox 需要 **Java 21**，但服务器上可能已有其他版本的 Java（如 Java 8、Java 11）。

**推荐方案：将 JRE 21 直接放入 ToolBox 目录，不影响系统现有 Java。**

`start.bat` 启动时按以下顺序查找 Java：
1. 优先使用 `ToolBox\jre\bin\java.exe`（内置 JRE，推荐）
2. 若内置不存在，使用系统 PATH 中的 Java，并检查版本是否 ≥ 21
3. 若版本不满足，给出明确提示并退出

### 操作步骤

**第 1 步：下载 JRE 21 压缩包**

> 从以下地址下载，选择 **Windows x64** → **JRE** → `.zip` 格式（不是 .msi 安装包）：
> https://adoptium.net/temurin/releases/?version=21&os=windows&arch=x64&package=jre

文件名类似：`OpenJDK21U-jre_x64_windows_hotspot_21.0.x_x.zip`（约 50MB）

**第 2 步：解压并重命名**

将压缩包解压后，把里面的文件夹（名称类似 `jdk-21.0.3+9-jre`）整体复制到 ToolBox 目录，**重命名为 `jre`**：

```
ToolBox\
  ├── bin\
  ├── jre\              ← 把 JRE 解压到这里，文件夹名必须是 jre
  │   ├── bin\
  │   │   └── java.exe  ← 启动脚本会自动找这个文件
  │   ├── lib\
  │   └── ...
  ├── lib\
  ├── plugins\
  └── ...
```

**第 3 步：验证**

双击 `bin\start.bat`，若看到：

```
[ToolBox] 使用内置 JRE: D:\ToolBox\jre
[ToolBox] 正在启动服务，请稍候...
```

说明内置 JRE 生效，与系统 Java 8 完全隔离。

### 如果 start.bat 提示版本错误

```
[错误] 当前系统 Java 版本为 1.8.0_291，ToolBox 需要 Java 21 或更高版本。
       请将 JRE 21 解压到 D:\ToolBox\jre\ 目录后重试。
```

按上方步骤放入内置 JRE 即可解决，**无需修改系统 Java**。

---

## 四、部署步骤

### 第 1 步：解压部署包

将 `ToolBox-1.0.0-windows.zip` 解压到目标目录，建议放在固定路径，例如：

```
D:\ToolBox\
```

解压后目录结构如下：
```
D:\ToolBox\
  ├── bin\
  ├── config\
  ├── lib\
  └── plugins\
```

### 第 2 步：修改配置（可选）

用记事本或任意文本编辑器打开 `config\application.yml`：

```yaml
server:
  port: 9090          # 访问端口，如有冲突改为其他端口（如 8080）

toolbox:
  security:
    jwt-secret: "请替换为随机字符串，不少于32位"   # ⚠️ 生产环境必改
    jwt-expire-hours: 8     # 登录 token 有效期（小时）
```

**常用配置说明：**

| 配置项 | 默认值 | 说明 |
|---|---|---|
| `server.port` | 9090 | 服务端口，防火墙需放行 |
| `jwt-secret` | dev-only-... | **必须修改**，否则存在安全风险 |
| `jwt-expire-hours` | 8 | 登录会话有效期 |
| `task.max-concurrent-per-user` | 5 | 每用户最大并发任务数 |
| `task.retention-days` | 30 | 任务记录保留天数 |

### 第 3 步：启动服务

双击 `bin\start.bat`，或在命令提示符中运行：

```bat
cd D:\ToolBox\bin
start.bat
```

看到以下输出表示启动成功：
```
Started ToolBoxApplication in X.XXX seconds
```

### 第 4 步：访问系统

在局域网内任意电脑打开浏览器，访问：

```
http://<服务器IP地址>:9090
```

例如服务器 IP 为 `192.168.1.100`，则访问：
```
http://192.168.1.100:9090
```

**首次登录：**
- 账号：`admin`
- 密码：`admin123`
- **首次登录必须修改密码**，修改后重新登录

---

## 五、设置为 Windows 服务（推荐）

设置为服务后，系统重启自动启动，无需手动运行 bat 脚本。

### 方式：使用 WinSW

**1. 下载 WinSW**

从 GitHub 下载 `WinSW-x64.exe`（约 600KB），重命名为 `toolbox-service.exe`，放入 `D:\ToolBox\bin\` 目录。

> 下载地址：https://github.com/winsw/winsw/releases（选 WinSW-x64.exe）

**2. 创建服务配置文件**

在 `D:\ToolBox\bin\` 目录创建 `toolbox-service.xml`，内容如下：

```xml
<service>
  <id>ToolBox</id>
  <name>ToolBox 内部工具平台</name>
  <description>ToolBox 团队内部工具集</description>
  <executable>java</executable>
  <arguments>@"D:\ToolBox\bin\toolbox.vmoptions" -jar "D:\ToolBox\lib\toolbox-app.jar" --spring.config.location=file:"D:\ToolBox\config\application.yml"</arguments>
  <logpath>D:\ToolBox\logs</logpath>
  <log mode="roll-by-size">
    <sizeThreshold>10240</sizeThreshold>
    <keepFiles>5</keepFiles>
  </log>
  <onfailure action="restart" delay="10 sec"/>
</service>
```

> ⚠️ 如果 ToolBox 不在 `D:\ToolBox`，将上面所有路径替换为实际路径。

**3. 安装并启动服务**

以**管理员身份**打开命令提示符：

```bat
cd D:\ToolBox\bin
toolbox-service.exe install
toolbox-service.exe start
```

验证服务状态：
```bat
toolbox-service.exe status
```

**4. 服务管理命令**

```bat
toolbox-service.exe start    # 启动
toolbox-service.exe stop     # 停止
toolbox-service.exe restart  # 重启
toolbox-service.exe uninstall  # 卸载服务
```

也可在 Windows"服务"管理器（`services.msc`）中找到"ToolBox 内部工具平台"进行管理。

---

## 六、防火墙配置

如需其他机器访问，需在 Windows 防火墙放行 9090 端口：

打开命令提示符（管理员）：

```bat
netsh advfirewall firewall add rule name="ToolBox" dir=in action=allow protocol=TCP localport=9090
```

或通过"控制面板 → Windows Defender 防火墙 → 高级设置 → 入站规则 → 新建规则"手动添加。

---

## 七、文件检索插件使用说明

文件检索插件在 Windows 环境下支持对本地目录进行文档扫描。

### 使用步骤

1. 登录 ToolBox → 左侧工具树 → **文件工具 → 文件检索**
2. 点击左侧面板的 **+** 按钮，输入要检索的目录路径

   示例路径：
   ```
   D:\工作文档
   \\192.168.1.200\共享文件夹\项目资料
   ```

3. 添加后点击目录右侧的 **↻（刷新）** 按钮，等待扫描完成
4. 在右侧搜索框输入文件名关键字即可搜索
5. 点击文件列表中的 📁 图标，可在资源管理器中定位并选中该文件

### 支持的文件格式

| 格式 | 扩展名 |
|---|---|
| Word | `.doc` `.docx` |
| WPS 文字 | `.wps` |
| Excel | `.xls` `.xlsx` |
| WPS 表格 | `.et` |
| PowerPoint | `.ppt` `.pptx` |
| WPS 演示 | `.dps` |

### 注意事项

- 文件索引存储在服务器本地（`plugins-data\file-search\file_search.db`），多用户共享同一份索引
- 文件变更后需手动点击刷新按钮更新索引，系统不会自动监控文件变化
- 扫描大型目录（数万文件）需要等待 1~5 分钟，扫描期间可以正常使用其他功能
- "在文件管理器中定位"功能需要在**服务器本机**的浏览器中使用，远程访问时此功能不生效

---

## 八、升级说明

1. 停止服务
2. 备份 `config\application.yml` 和 `data\` 目录
3. 用新版 zip 中的 `lib\toolbox-app.jar` 和 `plugins\*.jar` 覆盖旧文件
4. 重新启动服务

> **不要覆盖** `config\`、`data\`、`plugins-data\` 目录，这些是运行时数据。

---

## 九、常见问题

**Q：浏览器提示"无法访问此网站"**  
A：检查服务是否正在运行（任务管理器 → 服务 → ToolBox）；检查防火墙是否放行了 9090 端口；确认访问的 IP 和端口是否正确。

**Q：启动时报"Port 9090 is already in use"**  
A：端口被占用。修改 `config\application.yml` 中的 `server.port` 改为其他端口，如 `8080`。

**Q：提示"java 不是内部或外部命令"**  
A：Java 未安装或未添加到 PATH。重新安装 JDK 21 时勾选"添加到 PATH"，或手动在 `start.bat` 中用绝对路径指定 Java：
```bat
"C:\Program Files\Eclipse Adoptium\jdk-21.0.3.9-hotspot\bin\java.exe" ...
```

**Q：登录提示密码错误，且未曾修改过密码**  
A：检查 `data\toolbox.db` 是否存在（用户数据库）。若为全新安装，数据库应自动初始化，默认密码为 `admin123`。

**Q：文件检索扫描后找不到文件**  
A：确认文件扩展名在支持列表中；确认运行 ToolBox 的 Windows 账户对该目录有读取权限（服务账户默认为 System，对网络共享目录可能无权限）。

**Q：日志在哪里**  
A：`logs\app.log`，按日期自动滚动，最多保留 30 天。插件日志在 `logs\plugin-{id}.log`。

---

## 十、目录权限说明

ToolBox 运行时需要对以下目录有**读写权限**：

| 目录 | 用途 | 权限 |
|---|---|---|
| `config\` | 读取配置 | 只读即可 |
| `lib\` | 加载 jar | 只读即可 |
| `plugins\` | 加载插件 | 只读即可 |
| `data\` | SQLite 数据库、用户数据 | **读写** |
| `plugins-data\` | 插件私有数据（如文件索引） | **读写** |
| `logs\` | 日志文件 | **读写** |
| `temp\` | 上传文件临时目录 | **读写** |

若以 Windows 服务运行，服务账户（默认 Local System）通常对本地目录有完整权限，访问网络共享目录时需配置服务账户为有对应权限的域账户。
