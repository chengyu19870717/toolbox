package com.toolbox.api.datasource;

import java.util.List;

public class QueryRequest {

    private final String dataSourceId;
    private final String sql;
    private final List<Object> params;
    private final int timeoutSeconds;
    private final int maxRows;
    private final FetchMode fetchMode;

    private QueryRequest(Builder builder) {
        this.dataSourceId = builder.dataSourceId;
        this.sql = builder.sql;
        this.params = builder.params == null ? List.of() : List.copyOf(builder.params);
        this.timeoutSeconds = builder.timeoutSeconds;
        this.maxRows = builder.maxRows;
        this.fetchMode = builder.fetchMode;
    }

    public String getDataSourceId() { return dataSourceId; }
    public String getSql() { return sql; }
    public List<Object> getParams() { return params; }
    public int getTimeoutSeconds() { return timeoutSeconds; }
    public int getMaxRows() { return maxRows; }
    public FetchMode getFetchMode() { return fetchMode; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String dataSourceId;
        private String sql;
        private List<Object> params;
        private int timeoutSeconds = 60;
        private int maxRows = 1_000_000;
        private FetchMode fetchMode = FetchMode.ALL;

        public Builder dataSourceId(String v) { this.dataSourceId = v; return this; }
        public Builder sql(String v) { this.sql = v; return this; }
        public Builder params(List<Object> v) { this.params = v; return this; }
        public Builder timeoutSeconds(int v) { this.timeoutSeconds = v; return this; }
        public Builder maxRows(int v) { this.maxRows = v; return this; }
        public Builder fetchMode(FetchMode v) { this.fetchMode = v; return this; }
        public QueryRequest build() { return new QueryRequest(this); }
    }

    public enum FetchMode { ALL, STREAMING }
}
