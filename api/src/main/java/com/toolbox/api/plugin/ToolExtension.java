package com.toolbox.api.plugin;

import com.toolbox.api.plugin.handler.SyncHandler;
import com.toolbox.api.plugin.handler.TaskHandler;
import org.pf4j.ExtensionPoint;

public interface ToolExtension extends ExtensionPoint {

    /** 工具唯一 ID，建议格式：{plugin-id}-{tool-name} */
    String getId();

    String getName();

    default String getDescription() { return ""; }

    default String getCategory() { return "其他"; }

    /** Material Design Icon 名，如 mdi-database */
    default String getIcon() { return "mdi-wrench"; }

    /** 同步请求处理器（<1秒），可空 */
    default SyncHandler getSyncHandler() { return null; }

    /** 异步长任务处理器，可空 */
    default TaskHandler getTaskHandler() { return null; }

    void init(PluginContext context);
}
