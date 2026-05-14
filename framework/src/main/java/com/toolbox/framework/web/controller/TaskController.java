package com.toolbox.framework.web.controller;

import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.task.TaskInfo;
import com.toolbox.framework.file.FileService;
import com.toolbox.framework.task.TaskService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
public class TaskController {

    private final TaskService taskService;
    private final FileService fileService;

    public TaskController(TaskService taskService, FileService fileService) {
        this.taskService = taskService;
        this.fileService = fileService;
    }

    @GetMapping("/api/tasks")
    public List<TaskInfo> listMine(@AuthenticationPrincipal String username,
                                   @RequestParam(defaultValue = "50") int limit) {
        return taskService.listByUser(username, limit);
    }

    @GetMapping("/api/tasks/{taskId}")
    public TaskInfo get(@PathVariable String taskId) {
        return taskService.get(taskId);
    }

    @PostMapping("/api/tasks/{taskId}/cancel")
    public Map<String, String> cancel(@PathVariable String taskId,
                                      @AuthenticationPrincipal String username) {
        TaskInfo task = taskService.get(taskId);
        if (task == null) throw new ValidationException("任务不存在");
        if (!username.equals(task.getUsername())) throw new ValidationException("无权取消此任务");
        taskService.cancel(taskId);
        return Map.of("message", "取消请求已发送");
    }

    /** 下载任务产物文件 */
    @GetMapping("/api/tasks/{taskId}/artifacts/{filename}")
    public void downloadArtifact(@PathVariable String taskId,
                                 @PathVariable String filename,
                                 @AuthenticationPrincipal String username,
                                 HttpServletResponse response) throws IOException {
        TaskInfo task = taskService.get(taskId);
        if (!username.equals(task.getUsername())) throw new ValidationException("无权访问此文件");
        Path file = fileService.resolveArtifact(username, taskId, filename);
        if (!Files.exists(file)) throw new ValidationException("文件不存在");

        String contentType = Files.probeContentType(file);
        response.setContentType(contentType != null ? contentType : "application/octet-stream");
        response.setHeader("Content-Disposition",
                "attachment; filename=\"" + file.getFileName() + "\"");
        response.setContentLengthLong(Files.size(file));
        Files.copy(file, response.getOutputStream());
    }

    /** SSE 订阅单个任务进度 */
    @GetMapping("/sse/tasks/{taskId}")
    public SseEmitter subscribe(@PathVariable String taskId,
                                @AuthenticationPrincipal String username) {
        return taskService.subscribe(taskId, username);
    }
}
