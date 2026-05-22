package com.toolbox.plugin.filesearch;

import com.toolbox.api.exception.ToolBoxException;
import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.PluginContext;
import com.toolbox.api.plugin.ToolExtension;
import com.toolbox.api.plugin.handler.SyncHandler;
import com.toolbox.api.plugin.handler.TaskHandler;
import com.toolbox.api.plugin.handler.TaskResult;
import org.pf4j.Extension;

import java.nio.file.InvalidPathException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Extension
public class FileSearchExtension implements ToolExtension {

    private PluginContext ctx;
    private FileIndexManager manager;

    @Override public String getId()          { return "file-search-main"; }
    @Override public String getName()        { return "文件检索"; }
    @Override public String getDescription() { return "检索指定目录下的 Word、Excel、PPT 文档"; }
    @Override public String getCategory()    { return "文件工具"; }
    @Override public String getIcon()        { return "mdi-file-search"; }

    @Override
    public void init(PluginContext context) {
        this.ctx     = context;
        this.manager = new FileIndexManager(context.getDataDir(), context.getLogger());
    }

    @Override
    public SyncHandler getSyncHandler() {
        return (action, params) -> switch (action) {
            case "listDirs"      -> Map.of("dirs", manager.listDirs());
            case "addDir"        -> addDirWithValidation(
                                       require(params, "path"), str(params, "name", ""));
            case "removeDir"     -> { manager.removeDir(require(params, "id"));
                                     yield Map.of("ok", true); }
            case "search"        -> manager.search(
                                       str(params, "keyword", ""),
                                       str(params, "ext", ""),
                                       intVal(params, "page", 1),
                                       intVal(params, "pageSize", 50));
            case "stats"         -> manager.stats();
            case "openFile"      -> openFile(require(params, "path"));
            default -> throw new ValidationException("Unknown action: " + action);
        };
    }

    /**
     * 扫描目录改为 TaskHandler 异步执行，避免阻塞 SyncHandler 线程。
     * 前端通过 api.task.submit({taskType:'file-search-scan', payload:{id}}) 提交。
     */
    @Override
    public TaskHandler getTaskHandler() {
        return (taskCtx) -> {
            var payload  = taskCtx.getPayload();
            String type  = taskCtx.getTaskType();
            if (!"file-search-scan".equals(type)) {
                throw new ValidationException("Unknown task type: " + type);
            }

            String dirId = require(payload, "id");
            var reporter = taskCtx.getProgressReporter();

            reporter.report(0, "开始扫描…");
            reporter.log("正在扫描目录，请稍候…");

            Map<String, Object> result = manager.scanDirWithProgress(dirId, reporter, taskCtx);

            reporter.report(100, "扫描完成");
            return TaskResult.builder()
                .summary("count",   result.get("count"))
                .summary("dirPath", result.get("dirPath"))
                .build();
        };
    }

    // ── 带校验的目录添加 ──────────────────────────────────────────────────────

    private Map<String, Object> addDirWithValidation(String path, String name) {
        Path p;
        try {
            p = Paths.get(path);
        } catch (InvalidPathException e) {
            throw new ValidationException("目录路径格式不正确：" + path);
        }
        if (!Files.exists(p)) {
            manager.addDir(path, name);
            return Map.of("ok", false, "warn", "目录不存在，已添加但请确认路径是否正确：" + path);
        }
        if (!Files.isDirectory(p)) {
            throw new ValidationException("路径不是目录：" + path);
        }
        manager.addDir(path, name);
        return Map.of("ok", true, "warn", "");
    }

    // ── 打开文件所在位置 ──────────────────────────────────────────────────────

    /**
     * 在系统文件管理器中定位文件。
     * Windows: explorer /select,<path>（注意：/select, 和路径必须合并为单个参数）
     */
    private Map<String, Object> openFile(String filePath) {
        String os = System.getProperty("os.name", "").toLowerCase();
        try {
            List<String> cmd;
            if (os.contains("win")) {
                // /select, 与路径必须拼接为同一参数，否则 explorer 忽略选中效果
                cmd = List.of("explorer.exe", "/select," + filePath);
            } else if (os.contains("mac")) {
                cmd = List.of("open", "-R", filePath);
            } else {
                String parentDir = Paths.get(filePath).getParent().toString();
                cmd = List.of("xdg-open", parentDir);
            }
            new ProcessBuilder(cmd).start();
            return Map.of("ok", true);
        } catch (Exception e) {
            throw new ToolBoxException("无法打开文件位置", e);
        }
    }

    // ── 工具方法 ─────────────────────────────────────────────────────────────

    private String require(Map<String, Object> params, String key) {
        Object v = params.get(key);
        if (v == null || v.toString().isBlank()) throw new ValidationException(key + " 不能为空");
        return v.toString().trim();
    }

    private String str(Map<String, Object> params, String key, String def) {
        Object v = params.get(key);
        return v == null ? def : v.toString().trim();
    }

    private int intVal(Map<String, Object> params, String key, int def) {
        Object v = params.get(key);
        if (v == null) return def;
        try { return Integer.parseInt(v.toString()); } catch (NumberFormatException e) { return def; }
    }
}
