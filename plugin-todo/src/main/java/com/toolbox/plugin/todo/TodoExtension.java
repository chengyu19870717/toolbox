package com.toolbox.plugin.todo;

import com.toolbox.api.plugin.PluginContext;
import com.toolbox.api.plugin.ToolExtension;
import org.pf4j.Extension;

@Extension
public class TodoExtension implements ToolExtension {

    @Override public String getId()          { return "todo-main"; }
    @Override public String getName()        { return "待办任务"; }
    @Override public String getDescription() { return "按天管理待办，任务拆分追踪，每周自动复盘"; }
    @Override public String getCategory()    { return "效率工具"; }
    @Override public String getIcon()        { return "mdi-checkbox-marked-outline"; }

    @Override
    public void init(PluginContext context) {
        // 纯前端插件，无需后端初始化
    }
}
