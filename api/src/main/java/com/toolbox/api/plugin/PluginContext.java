package com.toolbox.api.plugin;

import com.toolbox.api.datasource.DataSourceManager;
import com.toolbox.api.notification.NotificationService;
import com.toolbox.api.task.TaskManager;
import org.slf4j.Logger;

import java.nio.file.Path;

public interface PluginContext {

    String getPluginId();

    /** 当前操作用户名（ThreadLocal，仅在 HTTP 请求线程有值；TaskHandler 内用 TaskExecutionContext.getUsername()） */
    String getCurrentUser();

    DataSourceManager getDataSourceManager();

    TaskManager getTaskManager();

    NotificationService getNotificationService();

    /** 输出到 logs/plugin-{pluginId}.log */
    Logger getLogger();

    /** plugins-data/{pluginId}/，框架保证目录存在 */
    Path getDataDir();

    /** 上传临时文件路径解析 */
    Path resolveUploadedFile(String fileId);

    /** 任务产物输出目录：temp/downloads/{username}/{taskId}/ */
    Path getArtifactDir(String username, String taskId);

    String getFrameworkVersion();
}
