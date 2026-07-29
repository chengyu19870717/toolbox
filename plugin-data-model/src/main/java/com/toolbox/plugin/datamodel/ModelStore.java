package com.toolbox.plugin.datamodel;

import com.toolbox.api.exception.ToolBoxException;
import com.toolbox.api.exception.ValidationException;
import org.slf4j.Logger;

import java.nio.file.Path;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * 表结构模型的 SQLite 存储：表 / 字段 / 表间字段关联三张表。
 */
public class ModelStore {

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final String jdbcUrl;
    private final Logger log;

    public ModelStore(Path dataDir, Logger log) {
        this.jdbcUrl = "jdbc:sqlite:" + dataDir.resolve("data_model.db");
        this.log = log;
        initSchema();
    }

    private Connection connect() throws SQLException {
        Connection conn = DriverManager.getConnection(jdbcUrl);
        conn.createStatement().execute("PRAGMA foreign_keys = ON");
        return conn;
    }

    private String now() {
        return LocalDateTime.now().format(FMT);
    }

    private void initSchema() {
        try (Connection conn = connect(); Statement st = conn.createStatement()) {
            st.execute("""
                CREATE TABLE IF NOT EXISTS model_tables (
                    id TEXT PRIMARY KEY,
                    table_name TEXT NOT NULL UNIQUE,
                    table_comment TEXT,
                    module TEXT,
                    remark TEXT,
                    created_at TEXT, updated_at TEXT
                )""");
            st.execute("""
                CREATE TABLE IF NOT EXISTS model_columns (
                    id TEXT PRIMARY KEY,
                    table_id TEXT NOT NULL REFERENCES model_tables(id) ON DELETE CASCADE,
                    col_name TEXT NOT NULL,
                    col_type TEXT,
                    col_length INTEGER,
                    col_scale INTEGER,
                    nullable INTEGER DEFAULT 1,
                    is_pk INTEGER DEFAULT 0,
                    default_value TEXT,
                    col_comment TEXT,
                    ordinal INTEGER DEFAULT 0,
                    created_at TEXT, updated_at TEXT
                )""");
            st.execute("""
                CREATE TABLE IF NOT EXISTS model_relations (
                    id TEXT PRIMARY KEY,
                    from_table_id TEXT NOT NULL REFERENCES model_tables(id) ON DELETE CASCADE,
                    from_col_id   TEXT NOT NULL REFERENCES model_columns(id) ON DELETE CASCADE,
                    to_table_id   TEXT NOT NULL REFERENCES model_tables(id) ON DELETE CASCADE,
                    to_col_id     TEXT NOT NULL REFERENCES model_columns(id) ON DELETE CASCADE,
                    rel_type TEXT,
                    source TEXT,
                    remark TEXT,
                    created_at TEXT, updated_at TEXT
                )""");
            st.execute("CREATE INDEX IF NOT EXISTS idx_model_columns_table ON model_columns(table_id)");
            st.execute("CREATE UNIQUE INDEX IF NOT EXISTS uk_model_columns_name ON model_columns(table_id, col_name)");
            st.execute("CREATE UNIQUE INDEX IF NOT EXISTS uk_model_relations ON model_relations(from_col_id, to_col_id)");
        } catch (SQLException e) {
            throw new ToolBoxException("数据模型库初始化失败", e);
        }
    }

    // ══════════════════════════════════════════════════════════════════ 表 ════
    public List<Map<String, Object>> listTables() {
        String sql = """
            SELECT t.*,
                   (SELECT COUNT(1) FROM model_columns c WHERE c.table_id = t.id) AS column_count,
                   (SELECT COUNT(1) FROM model_relations r
                     WHERE r.from_table_id = t.id OR r.to_table_id = t.id)        AS relation_count
              FROM model_tables t ORDER BY t.table_name""";
        try (Connection conn = connect(); ResultSet rs = conn.createStatement().executeQuery(sql)) {
            return toList(rs);
        } catch (SQLException e) { throw new ToolBoxException("查询表失败", e); }
    }

    public String saveTable(Map<String, Object> data) {
        String id   = str(data, "id");
        String name = str(data, "table_name");
        if (name.isBlank()) throw new ValidationException("表名不能为空");
        try (Connection conn = connect()) {
            if (id.isBlank()) {
                id = UUID.randomUUID().toString();
                if (findTableIdByName(conn, name) != null) throw new ValidationException("表 " + name + " 已存在");
                try (PreparedStatement ps = conn.prepareStatement(
                        "INSERT INTO model_tables(id,table_name,table_comment,module,remark,created_at,updated_at) VALUES(?,?,?,?,?,?,?)")) {
                    ps.setString(1, id);
                    ps.setString(2, name);
                    ps.setString(3, str(data, "table_comment"));
                    ps.setString(4, str(data, "module"));
                    ps.setString(5, str(data, "remark"));
                    ps.setString(6, now());
                    ps.setString(7, now());
                    ps.executeUpdate();
                }
            } else {
                String dup = findTableIdByName(conn, name);
                if (dup != null && !dup.equals(id)) throw new ValidationException("表 " + name + " 已存在");
                try (PreparedStatement ps = conn.prepareStatement(
                        "UPDATE model_tables SET table_name=?,table_comment=?,module=?,remark=?,updated_at=? WHERE id=?")) {
                    ps.setString(1, name);
                    ps.setString(2, str(data, "table_comment"));
                    ps.setString(3, str(data, "module"));
                    ps.setString(4, str(data, "remark"));
                    ps.setString(5, now());
                    ps.setString(6, id);
                    ps.executeUpdate();
                }
            }
            return id;
        } catch (SQLException e) { throw new ToolBoxException("保存表失败", e); }
    }

    /** 删除表，其字段与相关关联由外键 ON DELETE CASCADE 一并清除。 */
    public void deleteTable(String id) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement("DELETE FROM model_tables WHERE id=?")) {
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new ToolBoxException("删除表失败", e); }
    }

    // ══════════════════════════════════════════════════════════════ 字段 ══════
    public List<Map<String, Object>> listColumns(String tableId) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(
                     "SELECT * FROM model_columns WHERE table_id=? ORDER BY ordinal, col_name")) {
            ps.setString(1, tableId);
            try (ResultSet rs = ps.executeQuery()) { return toList(rs); }
        } catch (SQLException e) { throw new ToolBoxException("查询字段失败", e); }
    }

    public String saveColumn(Map<String, Object> data) {
        String id      = str(data, "id");
        String tableId = str(data, "table_id");
        String name    = str(data, "col_name");
        if (tableId.isBlank()) throw new ValidationException("请先选择所属表");
        if (name.isBlank())    throw new ValidationException("字段名不能为空");
        try (Connection conn = connect()) {
            if (id.isBlank()) {
                id = UUID.randomUUID().toString();
                try (PreparedStatement ps = conn.prepareStatement(
                        "INSERT INTO model_columns(id,table_id,col_name,col_type,col_length,col_scale,nullable,is_pk,default_value,col_comment,ordinal,created_at,updated_at)"
                        + " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
                    ps.setString(1, id);
                    ps.setString(2, tableId);
                    bindColumn(ps, 3, data, name);
                    ps.setInt(11, data.get("ordinal") != null ? orZero(data, "ordinal") : nextOrdinal(conn, tableId));
                    ps.setString(12, now());
                    ps.setString(13, now());
                    ps.executeUpdate();
                }
            } else {
                try (PreparedStatement ps = conn.prepareStatement(
                        "UPDATE model_columns SET col_name=?,col_type=?,col_length=?,col_scale=?,nullable=?,is_pk=?,default_value=?,col_comment=?,ordinal=?,updated_at=? WHERE id=?")) {
                    bindColumn(ps, 1, data, name);
                    ps.setInt(9, orZero(data, "ordinal"));
                    ps.setString(10, now());
                    ps.setString(11, id);
                    ps.executeUpdate();
                }
            }
            return id;
        } catch (SQLException e) {
            if (String.valueOf(e.getMessage()).contains("model_columns.col_name")) {
                throw new ValidationException("该表下已存在字段 " + name);
            }
            throw new ToolBoxException("保存字段失败", e);
        }
    }

    /** 绑定字段公共列，从 idx 起连续 8 个占位符：name,type,length,scale,nullable,is_pk,default,comment */
    private void bindColumn(PreparedStatement ps, int idx, Map<String, Object> data, String name) throws SQLException {
        ps.setString(idx,     name);
        ps.setString(idx + 1, str(data, "col_type"));
        ps.setObject(idx + 2, intOrNull(data, "col_length"));
        ps.setObject(idx + 3, intOrNull(data, "col_scale"));
        ps.setInt(idx + 4,    bool(data, "nullable", true) ? 1 : 0);
        ps.setInt(idx + 5,    bool(data, "is_pk", false) ? 1 : 0);
        ps.setString(idx + 6, str(data, "default_value"));
        ps.setString(idx + 7, str(data, "col_comment"));
    }

    public void deleteColumn(String id) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement("DELETE FROM model_columns WHERE id=?")) {
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new ToolBoxException("删除字段失败", e); }
    }

    // ══════════════════════════════════════════════════════════════ 关联 ══════
    public List<Map<String, Object>> listRelations(String tableId) {
        String sql = """
            SELECT r.*,
                   ft.table_name AS from_table, fc.col_name AS from_column,
                   tt.table_name AS to_table,   tc.col_name AS to_column
              FROM model_relations r
              JOIN model_tables  ft ON ft.id = r.from_table_id
              JOIN model_columns fc ON fc.id = r.from_col_id
              JOIN model_tables  tt ON tt.id = r.to_table_id
              JOIN model_columns tc ON tc.id = r.to_col_id
             WHERE (? IS NULL OR r.from_table_id = ? OR r.to_table_id = ?)
             ORDER BY ft.table_name, fc.col_name""";
        try (Connection conn = connect(); PreparedStatement ps = conn.prepareStatement(sql)) {
            String t = tableId == null || tableId.isBlank() ? null : tableId;
            ps.setString(1, t);
            ps.setString(2, t);
            ps.setString(3, t);
            try (ResultSet rs = ps.executeQuery()) { return toList(rs); }
        } catch (SQLException e) { throw new ToolBoxException("查询关联关系失败", e); }
    }

    public void saveRelation(Map<String, Object> data) {
        String id       = str(data, "id");
        String fromCol  = str(data, "from_col_id");
        String toCol    = str(data, "to_col_id");
        if (fromCol.isBlank() || toCol.isBlank()) throw new ValidationException("来源字段和目标字段都必须选择");
        if (fromCol.equals(toCol)) throw new ValidationException("不能把字段关联到它自己");
        try (Connection conn = connect()) {
            String fromTable = tableIdOfColumn(conn, fromCol);
            String toTable   = tableIdOfColumn(conn, toCol);
            if (fromTable == null || toTable == null) throw new ValidationException("字段不存在，请刷新后重试");
            if (id.isBlank()) {
                try (PreparedStatement ps = conn.prepareStatement(
                        "INSERT INTO model_relations(id,from_table_id,from_col_id,to_table_id,to_col_id,rel_type,source,remark,created_at,updated_at)"
                        + " VALUES(?,?,?,?,?,?,?,?,?,?)")) {
                    ps.setString(1, UUID.randomUUID().toString());
                    ps.setString(2, fromTable);
                    ps.setString(3, fromCol);
                    ps.setString(4, toTable);
                    ps.setString(5, toCol);
                    ps.setString(6, relType(data));
                    ps.setString(7, str(data, "source").isBlank() ? "manual" : str(data, "source"));
                    ps.setString(8, str(data, "remark"));
                    ps.setString(9, now());
                    ps.setString(10, now());
                    ps.executeUpdate();
                }
            } else {
                try (PreparedStatement ps = conn.prepareStatement(
                        "UPDATE model_relations SET from_table_id=?,from_col_id=?,to_table_id=?,to_col_id=?,rel_type=?,remark=?,updated_at=? WHERE id=?")) {
                    ps.setString(1, fromTable);
                    ps.setString(2, fromCol);
                    ps.setString(3, toTable);
                    ps.setString(4, toCol);
                    ps.setString(5, relType(data));
                    ps.setString(6, str(data, "remark"));
                    ps.setString(7, now());
                    ps.setString(8, id);
                    ps.executeUpdate();
                }
            }
        } catch (SQLException e) {
            if (String.valueOf(e.getMessage()).contains("model_relations.to_col_id")) {
                throw new ValidationException("这两个字段之间的关联已存在");
            }
            throw new ToolBoxException("保存关联关系失败", e);
        }
    }

    public void deleteRelation(String id) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement("DELETE FROM model_relations WHERE id=?")) {
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new ToolBoxException("删除关联关系失败", e); }
    }

    // ══════════════════════════════════════════════════════════════ SQL 导入 ══
    /**
     * 导入 SQL 脚本中的建表语句。
     *
     * @param overwrite true=同名表先清空字段再重建；false=同名表整表跳过
     */
    public Map<String, Object> importSql(String sql, boolean overwrite) {
        List<SqlSchemaParser.Table> parsed = SqlSchemaParser.parse(sql);
        if (parsed.isEmpty()) throw new ValidationException("未在 SQL 中解析到任何 CREATE TABLE 语句");

        int created = 0, updated = 0, skipped = 0, columns = 0, relations = 0;
        List<String> names = new ArrayList<>();

        try (Connection conn = connect()) {
            conn.setAutoCommit(false);
            try {
                for (SqlSchemaParser.Table t : parsed) {
                    String tableId = findTableIdByName(conn, t.name);
                    if (tableId != null && !overwrite) { skipped++; continue; }

                    if (tableId == null) {
                        tableId = UUID.randomUUID().toString();
                        try (PreparedStatement ps = conn.prepareStatement(
                                "INSERT INTO model_tables(id,table_name,table_comment,module,remark,created_at,updated_at) VALUES(?,?,?,'','',?,?)")) {
                            ps.setString(1, tableId);
                            ps.setString(2, t.name);
                            ps.setString(3, t.comment);
                            ps.setString(4, now());
                            ps.setString(5, now());
                            ps.executeUpdate();
                        }
                        created++;
                    } else {
                        try (PreparedStatement ps = conn.prepareStatement(
                                "UPDATE model_tables SET table_comment=?,updated_at=? WHERE id=?")) {
                            ps.setString(1, t.comment);
                            ps.setString(2, now());
                            ps.setString(3, tableId);
                            ps.executeUpdate();
                        }
                        try (PreparedStatement ps = conn.prepareStatement("DELETE FROM model_columns WHERE table_id=?")) {
                            ps.setString(1, tableId);
                            ps.executeUpdate();
                        }
                        updated++;
                    }

                    try (PreparedStatement ps = conn.prepareStatement(
                            "INSERT INTO model_columns(id,table_id,col_name,col_type,col_length,col_scale,nullable,is_pk,default_value,col_comment,ordinal,created_at,updated_at)"
                            + " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
                        for (SqlSchemaParser.Column c : t.columns) {
                            ps.setString(1, UUID.randomUUID().toString());
                            ps.setString(2, tableId);
                            ps.setString(3, c.name);
                            ps.setString(4, c.type);
                            ps.setObject(5, c.length);
                            ps.setObject(6, c.scale);
                            ps.setInt(7, c.nullable ? 1 : 0);
                            ps.setInt(8, c.primaryKey ? 1 : 0);
                            ps.setString(9, c.defaultValue);
                            ps.setString(10, c.comment);
                            ps.setInt(11, c.ordinal);
                            ps.setString(12, now());
                            ps.setString(13, now());
                            ps.addBatch();
                            columns++;
                        }
                        ps.executeBatch();
                    }
                    names.add(t.name);
                }

                // 建表语句里显式声明的外键，直接落成关联关系
                for (SqlSchemaParser.Table t : parsed) {
                    for (SqlSchemaParser.ForeignKey fk : t.foreignKeys) {
                        String fromCol = findColumnId(conn, t.name, fk.column);
                        String toCol   = findColumnId(conn, fk.refTable, fk.refColumn);
                        if (fromCol == null || toCol == null) continue;
                        if (insertRelationIfAbsent(conn, fromCol, toCol, "多对一", "sql-fk")) relations++;
                    }
                }
                conn.commit();
            } catch (SQLException | RuntimeException e) {
                conn.rollback();
                throw e;
            }
        } catch (SQLException e) {
            throw new ToolBoxException("导入 SQL 失败", e);
        }

        log.info("SQL 导入完成：新增 {} 张表，覆盖 {} 张，跳过 {} 张，共 {} 个字段", created, updated, skipped, columns);
        return Map.of("created", created, "updated", updated, "skipped", skipped,
                      "columns", columns, "relations", relations, "tables", names);
    }

    /**
     * 推断关联关系：把某表的非主键字段，连到「同名字段是<b>单字段主键</b>」的另一张表上。
     * 例如 admin_sm_user_role_rel.USER_ID → admin_sm_user.USER_ID。
     *
     * <p>「单字段主键」这个限制是必要的：DATA_TENANT_ID 之类的公共字段常出现在复合主键里
     * （如 n_wf_node_done 的 PK 是 INSTANCE_ID+NODE_ID+DATA_TENANT_ID），若不限制，
     * 所有带租户字段的表都会互相连一条毫无意义的关联，把真正的业务关联淹掉。
     *
     * <p>已存在的关联不会重复插入，推断结果 source=infer，可在界面上逐条删改。
     */
    public Map<String, Object> inferRelations() {
        int added = 0;
        try (Connection conn = connect()) {
            conn.setAutoCommit(false);
            try {
                String sql = """
                    SELECT c.id AS from_col, p.id AS to_col
                      FROM model_columns c
                      JOIN model_columns p ON UPPER(p.col_name) = UPPER(c.col_name)
                                          AND p.table_id <> c.table_id
                                          AND p.is_pk = 1
                     WHERE c.is_pk = 0
                       AND (SELECT COUNT(1) FROM model_columns k
                             WHERE k.table_id = p.table_id AND k.is_pk = 1) = 1""";
                List<String[]> pairs = new ArrayList<>();
                try (ResultSet rs = conn.createStatement().executeQuery(sql)) {
                    while (rs.next()) pairs.add(new String[]{rs.getString("from_col"), rs.getString("to_col")});
                }
                for (String[] p : pairs) {
                    if (insertRelationIfAbsent(conn, p[0], p[1], "多对一", "infer")) added++;
                }
                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            }
        } catch (SQLException e) { throw new ToolBoxException("推断关联关系失败", e); }
        return Map.of("added", added);
    }

    /** 导出全量模型为 DDL，便于把手工维护结果同步回数据库。 */
    public String exportDdl() {
        StringBuilder sb = new StringBuilder();
        for (Map<String, Object> t : listTables()) {
            String tableName = String.valueOf(t.get("table_name"));
            List<Map<String, Object>> cols = listColumns(String.valueOf(t.get("id")));
            if (cols.isEmpty()) continue;
            sb.append("-- ").append(tableName);
            String comment = String.valueOf(t.getOrDefault("table_comment", ""));
            if (!comment.isBlank() && !"null".equals(comment)) sb.append("  ").append(comment);
            sb.append("\nCREATE TABLE ").append(tableName).append(" (\n");
            List<String> pk = new ArrayList<>();
            List<String> lines = new ArrayList<>();
            for (Map<String, Object> c : cols) {
                StringBuilder line = new StringBuilder("  " + c.get("col_name") + " " + nvl(c.get("col_type")));
                Object len = c.get("col_length");
                if (len != null) {
                    line.append("(").append(len);
                    if (c.get("col_scale") != null) line.append(",").append(c.get("col_scale"));
                    line.append(")");
                }
                if (num(c.get("nullable")) == 0) line.append(" NOT NULL");
                String def = nvl(c.get("default_value"));
                if (!def.isBlank()) line.append(" DEFAULT '").append(def.replace("'", "''")).append("'");
                String cc = nvl(c.get("col_comment"));
                if (!cc.isBlank()) line.append(" COMMENT '").append(cc.replace("'", "''")).append("'");
                lines.add(line.toString());
                if (num(c.get("is_pk")) == 1) pk.add(String.valueOf(c.get("col_name")));
            }
            if (!pk.isEmpty()) lines.add("  PRIMARY KEY (" + String.join(", ", pk) + ")");
            sb.append(String.join(",\n", lines)).append("\n)");
            if (!comment.isBlank() && !"null".equals(comment)) {
                sb.append(" COMMENT = '").append(comment.replace("'", "''")).append("'");
            }
            sb.append(";\n\n");
        }
        return sb.toString();
    }

    // ══════════════════════════════════════════════════════════════ 辅助 ══════
    private boolean insertRelationIfAbsent(Connection conn, String fromCol, String toCol,
                                           String relType, String source) throws SQLException {
        try (PreparedStatement chk = conn.prepareStatement(
                "SELECT 1 FROM model_relations WHERE from_col_id=? AND to_col_id=?")) {
            chk.setString(1, fromCol);
            chk.setString(2, toCol);
            if (chk.executeQuery().next()) return false;
        }
        String fromTable = tableIdOfColumn(conn, fromCol);
        String toTable   = tableIdOfColumn(conn, toCol);
        if (fromTable == null || toTable == null) return false;
        try (PreparedStatement ps = conn.prepareStatement(
                "INSERT INTO model_relations(id,from_table_id,from_col_id,to_table_id,to_col_id,rel_type,source,remark,created_at,updated_at)"
                + " VALUES(?,?,?,?,?,?,?,'',?,?)")) {
            ps.setString(1, UUID.randomUUID().toString());
            ps.setString(2, fromTable);
            ps.setString(3, fromCol);
            ps.setString(4, toTable);
            ps.setString(5, toCol);
            ps.setString(6, relType);
            ps.setString(7, source);
            ps.setString(8, now());
            ps.setString(9, now());
            ps.executeUpdate();
        }
        return true;
    }

    private String findTableIdByName(Connection conn, String name) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement("SELECT id FROM model_tables WHERE table_name=? COLLATE NOCASE")) {
            ps.setString(1, name);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? rs.getString(1) : null; }
        }
    }

    private String findColumnId(Connection conn, String tableName, String colName) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT c.id FROM model_columns c JOIN model_tables t ON t.id = c.table_id"
                + " WHERE t.table_name=? COLLATE NOCASE AND c.col_name=? COLLATE NOCASE")) {
            ps.setString(1, tableName);
            ps.setString(2, colName);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? rs.getString(1) : null; }
        }
    }

    private String tableIdOfColumn(Connection conn, String colId) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement("SELECT table_id FROM model_columns WHERE id=?")) {
            ps.setString(1, colId);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? rs.getString(1) : null; }
        }
    }

    private int nextOrdinal(Connection conn, String tableId) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT COALESCE(MAX(ordinal),0)+1 FROM model_columns WHERE table_id=?")) {
            ps.setString(1, tableId);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? rs.getInt(1) : 1; }
        }
    }

    private String relType(Map<String, Object> data) {
        String v = str(data, "rel_type");
        return v.isBlank() ? "多对一" : v;
    }

    private List<Map<String, Object>> toList(ResultSet rs) throws SQLException {
        var result = new ArrayList<Map<String, Object>>();
        var meta = rs.getMetaData();
        int cols = meta.getColumnCount();
        while (rs.next()) {
            var row = new LinkedHashMap<String, Object>();
            for (int i = 1; i <= cols; i++) row.put(meta.getColumnLabel(i), rs.getObject(i));
            result.add(row);
        }
        return result;
    }

    private String str(Map<String, Object> m, String k) {
        Object v = m.get(k);
        return v == null ? "" : v.toString().trim();
    }

    private Integer intOrNull(Map<String, Object> m, String k) {
        Object v = m.get(k);
        if (v == null || v.toString().isBlank()) return null;
        try { return (int) Double.parseDouble(v.toString().trim()); } catch (NumberFormatException e) { return null; }
    }

    private int orZero(Map<String, Object> m, String k) {
        Integer v = intOrNull(m, k);
        return v == null ? 0 : v;
    }

    private boolean bool(Map<String, Object> m, String k, boolean dft) {
        Object v = m.get(k);
        if (v == null) return dft;
        if (v instanceof Boolean b) return b;
        String s = v.toString().trim();
        return "1".equals(s) || "true".equalsIgnoreCase(s);
    }

    private String nvl(Object v) {
        return v == null ? "" : v.toString();
    }

    private int num(Object v) {
        if (v == null) return 0;
        try { return (int) Double.parseDouble(v.toString()); } catch (NumberFormatException e) { return 0; }
    }
}
