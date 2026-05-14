package com.toolbox.api.datasource;

public class ColumnMeta {

    private final String name;
    private final String jdbcType;
    private final int sqlType;
    private final boolean nullable;

    public ColumnMeta(String name, String jdbcType, int sqlType, boolean nullable) {
        this.name = name;
        this.jdbcType = jdbcType;
        this.sqlType = sqlType;
        this.nullable = nullable;
    }

    public String getName() { return name; }
    public String getJdbcType() { return jdbcType; }
    public int getSqlType() { return sqlType; }
    public boolean isNullable() { return nullable; }
}
