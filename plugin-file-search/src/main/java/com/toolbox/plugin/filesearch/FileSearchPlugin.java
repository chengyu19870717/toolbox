package com.toolbox.plugin.filesearch;

import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileSearchPlugin extends Plugin {

    private static final Logger log = LoggerFactory.getLogger(FileSearchPlugin.class);

    public FileSearchPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Override
    public void start() {
        log.info("FileSearchPlugin started");
    }

    @Override
    public void stop() {
        log.info("FileSearchPlugin stopped");
    }
}
