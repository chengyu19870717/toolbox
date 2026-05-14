package com.toolbox.api.plugin.handler;

import java.util.Map;

public interface TaskExecutionContext {

    String getTaskId();
    String getPluginId();
    String getTaskType();
    String getTaskName();
    String getUsername();
    Map<String, Object> getPayload();
    ProgressReporter getProgressReporter();

    /** 推荐用此方法替代 Thread.currentThread().isInterrupted() */
    boolean isCancelled();
}
