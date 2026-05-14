package com.toolbox.framework.plugin;

import com.toolbox.api.datasource.DataSourceManager;
import com.toolbox.api.notification.NotificationService;
import com.toolbox.api.plugin.PluginContext;
import com.toolbox.api.task.TaskManager;
import com.toolbox.framework.file.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Path;

public class PluginContextImpl implements PluginContext {

    private final String pluginId;
    private final Path dataDir;
    private final DataSourceManager dataSourceManager;
    private final TaskManager taskManager;
    private final NotificationService notificationService;
    private final FileService fileService;
    private final Logger logger;

    public PluginContextImpl(String pluginId, Path dataDir,
                              DataSourceManager dataSourceManager,
                              TaskManager taskManager,
                              NotificationService notificationService,
                              FileService fileService) {
        this.pluginId = pluginId;
        this.dataDir = dataDir;
        this.dataSourceManager = dataSourceManager;
        this.taskManager = taskManager;
        this.notificationService = notificationService;
        this.fileService = fileService;
        this.logger = LoggerFactory.getLogger("plugin." + pluginId);
    }

    @Override public String getPluginId() { return pluginId; }

    @Override
    public String getCurrentUser() {
        // 从 Spring Security 上下文取（HTTP 请求线程内有效）
        var auth = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        return auth != null ? (String) auth.getPrincipal() : null;
    }

    @Override public DataSourceManager getDataSourceManager() { return dataSourceManager; }
    @Override public TaskManager getTaskManager() { return taskManager; }
    @Override public NotificationService getNotificationService() { return notificationService; }
    @Override public Logger getLogger() { return logger; }
    @Override public Path getDataDir() { return dataDir; }

    @Override
    public Path resolveUploadedFile(String fileId) {
        return fileService.resolveUploadedFile(fileId);
    }

    @Override
    public Path getArtifactDir(String username, String taskId) {
        try {
            return fileService.getArtifactDir(username, taskId);
        } catch (IOException e) {
            throw new RuntimeException("Failed to create artifact dir", e);
        }
    }

    @Override
    public String getFrameworkVersion() { return "1.0.0"; }
}
