package com.toolbox.framework.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "toolbox")
public class ToolBoxProperties {

    private Paths paths = new Paths();
    private Security security = new Security();
    private Task task = new Task();
    private FileConfig file = new FileConfig();
    private DatasourceConfig datasource = new DatasourceConfig();

    public Paths getPaths() { return paths; }
    public Security getSecurity() { return security; }
    public Task getTask() { return task; }
    public FileConfig getFile() { return file; }
    public DatasourceConfig getDatasource() { return datasource; }

    public static class Paths {
        private String configDir = "config";
        private String pluginsDir = "plugins";
        private String pluginsDataDir = "plugins-data";
        private String tempDir = "temp";
        private String logsDir = "logs";

        public String getConfigDir() { return configDir; }
        public void setConfigDir(String v) { this.configDir = v; }
        public String getPluginsDir() { return pluginsDir; }
        public void setPluginsDir(String v) { this.pluginsDir = v; }
        public String getPluginsDataDir() { return pluginsDataDir; }
        public void setPluginsDataDir(String v) { this.pluginsDataDir = v; }
        public String getTempDir() { return tempDir; }
        public void setTempDir(String v) { this.tempDir = v; }
        public String getLogsDir() { return logsDir; }
        public void setLogsDir(String v) { this.logsDir = v; }
    }

    public static class Security {
        private String jwtSecret = "changeme-please-set-in-production-32chars";
        private int jwtExpireHours = 8;

        public String getJwtSecret() { return jwtSecret; }
        public void setJwtSecret(String v) { this.jwtSecret = v; }
        public int getJwtExpireHours() { return jwtExpireHours; }
        public void setJwtExpireHours(int v) { this.jwtExpireHours = v; }
    }

    public static class Task {
        private int maxConcurrentPerUser = 5;
        private int retentionDays = 30;
        private String cleanupCron = "0 0 3 * * *";

        public int getMaxConcurrentPerUser() { return maxConcurrentPerUser; }
        public void setMaxConcurrentPerUser(int v) { this.maxConcurrentPerUser = v; }
        public int getRetentionDays() { return retentionDays; }
        public void setRetentionDays(int v) { this.retentionDays = v; }
        public String getCleanupCron() { return cleanupCron; }
        public void setCleanupCron(String v) { this.cleanupCron = v; }
    }

    public static class FileConfig {
        private String uploadMaxSize = "100MB";
        private int tempRetentionHours = 24;

        public String getUploadMaxSize() { return uploadMaxSize; }
        public void setUploadMaxSize(String v) { this.uploadMaxSize = v; }
        public int getTempRetentionHours() { return tempRetentionHours; }
        public void setTempRetentionHours(int v) { this.tempRetentionHours = v; }
    }

    public static class DatasourceConfig {
        private int defaultQueryTimeoutSeconds = 60;
        private int defaultMaxRows = 1_000_000;

        public int getDefaultQueryTimeoutSeconds() { return defaultQueryTimeoutSeconds; }
        public void setDefaultQueryTimeoutSeconds(int v) { this.defaultQueryTimeoutSeconds = v; }
        public int getDefaultMaxRows() { return defaultMaxRows; }
        public void setDefaultMaxRows(int v) { this.defaultMaxRows = v; }
    }
}
