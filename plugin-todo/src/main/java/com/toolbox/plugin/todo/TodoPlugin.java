package com.toolbox.plugin.todo;

import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TodoPlugin extends Plugin {

    private static final Logger log = LoggerFactory.getLogger(TodoPlugin.class);

    public TodoPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    public void start() {
        log.info("TodoPlugin started");
    }

    @Override
    public void stop() {
        log.info("TodoPlugin stopped");
    }
}
