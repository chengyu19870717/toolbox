package com.toolbox.framework.web.controller;

import com.toolbox.framework.notification.NotificationServiceImpl;
import com.toolbox.framework.task.TaskService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
public class SseController {

    private final NotificationServiceImpl notificationService;
    private final TaskService taskService;

    public SseController(NotificationServiceImpl notificationService, TaskService taskService) {
        this.notificationService = notificationService;
        this.taskService = taskService;
    }

    @GetMapping("/notifications")
    public SseEmitter notifications(@AuthenticationPrincipal String username) {
        return notificationService.subscribeNotifications(username);
    }

    /** TaskListView 使用：订阅当前用户所有任务的进度推送 */
    @GetMapping("/tasks")
    public SseEmitter tasks(@AuthenticationPrincipal String username) {
        return taskService.subscribeUser(username);
    }
}
