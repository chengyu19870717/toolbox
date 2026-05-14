package com.toolbox.framework.datasource;

import com.toolbox.api.datasource.DataSourceInfo;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

public class DataSourceConfig {

    private String id = UUID.randomUUID().toString();
    private String name;
    private DataSourceInfo.DbType type;
    private String host;
    private int port = 3306;
    private String database;
    private String username;
    private String password;
    private String remark;
    private Map<String, String> params;
    private PoolConfig poolConfig = new PoolConfig();
    private long version = 1;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public DataSourceInfo.DbType getType() { return type; }
    public void setType(DataSourceInfo.DbType type) { this.type = type; }
    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }
    public int getPort() { return port; }
    public void setPort(int port) { this.port = port; }
    public String getDatabase() { return database; }
    public void setDatabase(String database) { this.database = database; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }
    public Map<String, String> getParams() { return params; }
    public void setParams(Map<String, String> params) { this.params = params; }
    public PoolConfig getPoolConfig() { return poolConfig; }
    public void setPoolConfig(PoolConfig poolConfig) { this.poolConfig = poolConfig; }
    public long getVersion() { return version; }
    public void setVersion(long version) { this.version = version; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public DataSourceInfo toInfo() {
        return new DataSourceInfo(id, name, type, host, port, database, username);
    }

    public DataSourceConfig shallowCopy() {
        DataSourceConfig c = new DataSourceConfig();
        c.id = this.id; c.name = this.name; c.type = this.type;
        c.host = this.host; c.port = this.port; c.database = this.database;
        c.username = this.username; c.password = this.password; c.remark = this.remark;
        c.params = this.params; c.poolConfig = this.poolConfig;
        c.version = this.version; c.createdAt = this.createdAt; c.updatedAt = this.updatedAt;
        return c;
    }

    public static class PoolConfig {
        private int maximumPoolSize = 10;
        private int minimumIdle = 2;
        private long connectionTimeoutMs = 30_000;
        private long idleTimeoutMs = 600_000;
        private long maxLifetimeMs = 1_800_000;

        public int getMaximumPoolSize() { return maximumPoolSize; }
        public void setMaximumPoolSize(int v) { this.maximumPoolSize = v; }
        public int getMinimumIdle() { return minimumIdle; }
        public void setMinimumIdle(int v) { this.minimumIdle = v; }
        public long getConnectionTimeoutMs() { return connectionTimeoutMs; }
        public void setConnectionTimeoutMs(long v) { this.connectionTimeoutMs = v; }
        public long getIdleTimeoutMs() { return idleTimeoutMs; }
        public void setIdleTimeoutMs(long v) { this.idleTimeoutMs = v; }
        public long getMaxLifetimeMs() { return maxLifetimeMs; }
        public void setMaxLifetimeMs(long v) { this.maxLifetimeMs = v; }
    }
}
