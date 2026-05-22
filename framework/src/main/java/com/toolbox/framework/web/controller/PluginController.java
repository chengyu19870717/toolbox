package com.toolbox.framework.web.controller;

import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.ToolExtension;
import com.toolbox.api.plugin.handler.SyncHandler;
import com.toolbox.framework.plugin.PluginManagerService;
import com.toolbox.framework.task.TaskService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plugins")
public class PluginController {

    private final PluginManagerService pluginManager;
    private final TaskService taskService;

    public PluginController(PluginManagerService pluginManager, TaskService taskService) {
        this.pluginManager = pluginManager;
        this.taskService = taskService;
    }

    /** 工具列表（工具树数据） */
    @GetMapping
    public List<Map<String, String>> listTools() {
        return pluginManager.getAllExtensions().stream().map(ext -> Map.of(
                "id", ext.getId(),
                "name", ext.getName(),
                "description", ext.getDescription(),
                "category", ext.getCategory(),
                "icon", ext.getIcon()
        )).toList();
    }

    /**
     * 提供插件前端 bundle（从插件 jar 内部 frontend/index.js 读取）。
     * 插件构建时应将前端产物打包到 jar 的 frontend/ 目录下。
     */
    @GetMapping(value = "/{toolId}/frontend.js", produces = "application/javascript")
    public void getFrontend(@PathVariable String toolId, HttpServletResponse response) throws Exception {
        ClassLoader cl = pluginManager.getPluginClassLoader(toolId)
                .orElseThrow(() -> new ValidationException("工具不存在: " + toolId));

        InputStream is = cl.getResourceAsStream("frontend/index.js");
        if (is == null) {
            response.setStatus(404);
            response.getWriter().write("// No frontend bundle for " + toolId);
            return;
        }

        response.setContentType("application/javascript");
        response.setCharacterEncoding("UTF-8");
        try (is) { is.transferTo(response.getOutputStream()); }
    }

    /** 插件 CSS（frontend/style.css，无文件时返回空） */
    @GetMapping(value = "/{toolId}/style.css", produces = "text/css")
    public void getStyle(@PathVariable String toolId, HttpServletResponse response) throws Exception {
        ClassLoader cl = pluginManager.getPluginClassLoader(toolId)
                .orElseThrow(() -> new ValidationException("工具不存在: " + toolId));

        InputStream is = cl.getResourceAsStream("frontend/style.css");
        response.setContentType("text/css");
        response.setCharacterEncoding("UTF-8");
        if (is == null) { return; }
        try (is) { is.transferTo(response.getOutputStream()); }
    }

    /** 插件同步调用 */
    @PostMapping("/{toolId}/sync")
    public Object callSync(@PathVariable String toolId,
                           @RequestBody Map<String, Object> body) throws Exception {
        ToolExtension ext = pluginManager.findExtension(toolId)
                .orElseThrow(() -> new ValidationException("工具不存在: " + toolId));
        SyncHandler handler = ext.getSyncHandler();
        if (handler == null) throw new ValidationException("工具不支持同步调用: " + toolId);

        String action = (String) body.get("action");
        @SuppressWarnings("unchecked")
        Map<String, Object> params = (Map<String, Object>) body.getOrDefault("params", Map.of());
        return handler.handle(action, params);
    }

    /** 提交异步任务 */
    @PostMapping("/{toolId}/tasks")
    public Map<String, String> submitTask(@PathVariable String toolId,
                                          @RequestBody Map<String, Object> body,
                                          @AuthenticationPrincipal String username) {
        ToolExtension ext = pluginManager.findExtension(toolId)
                .orElseThrow(() -> new ValidationException("工具不存在: " + toolId));
        if (ext.getTaskHandler() == null) throw new ValidationException("工具不支持后台任务: " + toolId);

        String name = (String) body.getOrDefault("name", ext.getName() + " 任务");
        String taskType = (String) body.getOrDefault("taskType", body.getOrDefault("type", "default"));
        @SuppressWarnings("unchecked")
        Map<String, Object> payload = (Map<String, Object>) body.getOrDefault("payload", Map.of());

        String taskId = taskService.submit(
                toolId, taskType, name, username, payload, ext.getTaskHandler());

        return Map.of("taskId", taskId);
    }
}
