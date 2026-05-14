package com.toolbox.plugin.flowparser;

import com.toolbox.api.plugin.PluginContext;
import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FlowParserPlugin extends Plugin {

    private static final Logger log = LoggerFactory.getLogger(FlowParserPlugin.class);

    public FlowParserPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    public void start() {
        log.info("FlowParserPlugin started");
    }

    @Override
    public void stop() {
        log.info("FlowParserPlugin stopped");
    }
}
