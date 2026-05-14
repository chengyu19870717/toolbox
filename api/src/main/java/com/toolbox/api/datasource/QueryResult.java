package com.toolbox.api.datasource;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class QueryResult {

    private final List<ColumnMeta> columns;
    private final List<Object[]> rows;
    private final boolean truncated;
    private final long durationMs;

    public QueryResult(List<ColumnMeta> columns, List<Object[]> rows, boolean truncated, long durationMs) {
        this.columns = List.copyOf(columns);
        this.rows = List.copyOf(rows);
        this.truncated = truncated;
        this.durationMs = durationMs;
    }

    public List<ColumnMeta> getColumns() { return columns; }
    public List<Object[]> getRows() { return rows; }
    public int getRowCount() { return rows.size(); }
    public boolean isTruncated() { return truncated; }
    public long getDurationMs() { return durationMs; }

    public List<Map<String, Object>> toMapList() {
        List<Map<String, Object>> result = new ArrayList<>(rows.size());
        for (Object[] row : rows) {
            Map<String, Object> map = new LinkedHashMap<>();
            for (int i = 0; i < columns.size(); i++) {
                map.put(columns.get(i).getName(), i < row.length ? row[i] : null);
            }
            result.add(map);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public <T> List<T> column(String name) {
        int idx = -1;
        for (int i = 0; i < columns.size(); i++) {
            if (columns.get(i).getName().equalsIgnoreCase(name)) { idx = i; break; }
        }
        if (idx < 0) return List.of();
        List<T> result = new ArrayList<>(rows.size());
        for (Object[] row : rows) result.add((T) (idx < row.length ? row[idx] : null));
        return result;
    }

    @SuppressWarnings("unchecked")
    public <T> T scalar() {
        if (rows.isEmpty() || rows.get(0).length == 0) return null;
        return (T) rows.get(0)[0];
    }

    public Map<String, Object> firstRow() {
        return rows.isEmpty() ? null : toMapList().get(0);
    }

    public static QueryResult empty() {
        return new QueryResult(List.of(), List.of(), false, 0);
    }
}
