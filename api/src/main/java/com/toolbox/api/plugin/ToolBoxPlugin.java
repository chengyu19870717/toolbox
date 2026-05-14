package com.toolbox.api.plugin;

public interface ToolBoxPlugin {

    /**
     * 框架在 PF4J 加载完成后立即调用，早于 Plugin.start()。
     * 插件在此保存 context 引用、初始化业务。
     */
    void init(PluginContext context);
}
