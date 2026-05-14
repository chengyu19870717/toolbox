package com.toolbox.api.datasource;

public class DataSourceInfo {

    private final String id;
    private final String name;
    private final DbType type;
    private final String host;
    private final int port;
    private final String database;
    private final String username;

    public DataSourceInfo(String id, String name, DbType type, String host, int port, String database, String username) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.host = host;
        this.port = port;
        this.database = database;
        this.username = username;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public DbType getType() { return type; }
    public String getHost() { return host; }
    public int getPort() { return port; }
    public String getDatabase() { return database; }
    public String getUsername() { return username; }

    public enum DbType { MYSQL, OCEANBASE }
}
