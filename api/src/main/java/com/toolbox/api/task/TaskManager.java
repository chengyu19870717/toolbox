package com.toolbox.api.task;

import com.toolbox.api.plugin.handler.TaskHandler;

import java.util.List;
import java.util.Map;

public interface TaskManager {

    /** 插件主动提交任务（无前端交互场景）*/
    String submit(String pluginId, String taskType, String name, String username,
                  Map<String, Object> payload, TaskHandler handler);

    void cancel(String taskId);

    TaskInfo get(String taskId);

    List<TaskInfo> listByUser(String username, int limit);
}
