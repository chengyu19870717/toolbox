package com.toolbox.plugin.datastandard;

import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DataStandardPlugin extends Plugin {

    private static final Logger log = LoggerFactory.getLogger(DataStandardPlugin.class);

    public DataStandardPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    public void start() {
        log.info("DataStandardPlugin started");
    }

    @Override
    public void stop() {
        log.info("DataStandardPlugin stopped");
    }
}
