package com.toolbox.api.datasource;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface DataSourceManager {

    List<DataSourceInfo> list();

    DataSourceInfo get(String dataSourceId);

    TestResult testConnection(String dataSourceId);

    QueryResult query(QueryRequest request);

    <T> T inTransaction(String dataSourceId, TransactionalAction<T> action);

    /** 手动管理生命周期时使用，必须 try-with-resources */
    Connection getConnection(String dataSourceId) throws SQLException;

    @FunctionalInterface
    interface TransactionalAction<T> {
        T execute(Connection conn) throws SQLException;
    }
}
