package com.toolbox.plugin.datamodel;

import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DataModelPlugin extends Plugin {

    private static final Logger log = LoggerFactory.getLogger(DataModelPlugin.class);

    public DataModelPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    public void start() {
        log.info("DataModelPlugin started");
    }

    @Override
    public void stop() {
        log.info("DataModelPlugin stopped");
    }
}
