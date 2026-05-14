package com.toolbox.plugin.datastandard;

import com.toolbox.api.exception.ToolBoxException;
import com.toolbox.api.exception.ValidationException;
import org.slf4j.Logger;

import java.nio.file.Path;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * 管理插件自有 SQLite 数据库，存储字根、字段、接口、规则四张表。
 */
public class DatabaseManager {

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final String jdbcUrl;
    private final Logger log;

    public DatabaseManager(Path dataDir, Logger log) {
        this.jdbcUrl = "jdbc:sqlite:" + dataDir.resolve("data_standard.db");
        this.log = log;
        initSchema();
    }

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(jdbcUrl);
    }

    private String now() {
        return LocalDateTime.now().format(FMT);
    }

    // ── Schema 初始化 ─────────────────────────────────────────────────────────
    private void initSchema() {
        try (Connection conn = connect(); Statement st = conn.createStatement()) {
            st.execute("""
                CREATE TABLE IF NOT EXISTS data_roots (
                    id TEXT PRIMARY KEY, name TEXT NOT NULL, meaning TEXT,
                    root_type TEXT, length INTEGER, code_values TEXT,
                    remark TEXT, created_at TEXT, updated_at TEXT
                )""");
            st.execute("""
                CREATE TABLE IF NOT EXISTS data_fields (
                    id TEXT PRIMARY KEY, name_en TEXT NOT NULL, name_cn TEXT,
                    root_id TEXT, root_name TEXT, field_type TEXT, length INTEGER,
                    code_values TEXT, remark TEXT, created_at TEXT, updated_at TEXT
                )""");
            st.execute("""
                CREATE TABLE IF NOT EXISTS interfaces (
                    id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
                    input_json TEXT, output_json TEXT, created_at TEXT, updated_at TEXT
                )""");
            st.execute("""
                CREATE TABLE IF NOT EXISTS rules (
                    id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
                    input_json TEXT, output_json TEXT, created_at TEXT, updated_at TEXT
                )""");
        } catch (SQLException e) {
            throw new ToolBoxException("数据库初始化失败", e);
        }
    }

    // ══════════════════════════════════════════════════════════════ 字根 ══════
    public List<Map<String, Object>> listRoots() {
        try (Connection conn = connect();
             ResultSet rs = conn.createStatement().executeQuery(
                     "SELECT * FROM data_roots ORDER BY updated_at DESC")) {
            return toList(rs);
        } catch (SQLException e) { throw new ToolBoxException("查询字根失败", e); }
    }

    public void saveRoot(Map<String, Object> data, boolean isNew) {
        String id   = str(data, "id");
        String name = str(data, "name");
        if (id.isBlank() || name.isBlank()) throw new ValidationException("字根ID和字根名不能为空");
        try (Connection conn = connect()) {
            if (isNew) {
                PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO data_roots(id,name,meaning,root_type,length,code_values,remark,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?)");
                ps.setString(1, id);
                ps.setString(2, name);
                ps.setString(3, str(data, "meaning"));
                ps.setString(4, str(data, "root_type"));
                ps.setObject(5, intOrNull(data, "length"));
                ps.setString(6, str(data, "code_values"));
                ps.setString(7, str(data, "remark"));
                ps.setString(8, now());
                ps.setString(9, now());
                ps.executeUpdate();
            } else {
                PreparedStatement ps = conn.prepareStatement(
                    "UPDATE data_roots SET name=?,meaning=?,root_type=?,length=?,code_values=?,remark=?,updated_at=? WHERE id=?");
                ps.setString(1, name);
                ps.setString(2, str(data, "meaning"));
                ps.setString(3, str(data, "root_type"));
                ps.setObject(4, intOrNull(data, "length"));
                ps.setString(5, str(data, "code_values"));
                ps.setString(6, str(data, "remark"));
                ps.setString(7, now());
                ps.setString(8, id);
                ps.executeUpdate();
            }
        } catch (SQLException e) { throw new ToolBoxException("保存字根失败", e); }
    }

    public void deleteRoot(String id) {
        try (Connection conn = connect()) {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM data_roots WHERE id=?");
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new ToolBoxException("删除字根失败", e); }
    }

    // ══════════════════════════════════════════════════════════════ 字段 ══════
    public List<Map<String, Object>> listFields() {
        try (Connection conn = connect();
             ResultSet rs = conn.createStatement().executeQuery(
                     "SELECT * FROM data_fields ORDER BY updated_at DESC")) {
            return toList(rs);
        } catch (SQLException e) { throw new ToolBoxException("查询字段失败", e); }
    }

    public void saveField(Map<String, Object> data, boolean isNew) {
        String id     = str(data, "id");
        String nameCn = str(data, "name_cn");
        String nameEn = str(data, "name_en");
        if (id.isBlank() || nameCn.isBlank()) throw new ValidationException("字段ID和字段中文名不能为空");
        try (Connection conn = connect()) {
            if (isNew) {
                PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO data_fields(id,name_en,name_cn,root_id,root_name,field_type,length,code_values,remark,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)");
                ps.setString(1, id);
                ps.setString(2, nameEn.isBlank() ? nameCn : nameEn);
                ps.setString(3, nameCn);
                ps.setString(4, str(data, "root_id"));
                ps.setString(5, str(data, "root_name"));
                ps.setString(6, str(data, "field_type"));
                ps.setObject(7, intOrNull(data, "length"));
                ps.setString(8, str(data, "code_values"));
                ps.setString(9, str(data, "remark"));
                ps.setString(10, now());
                ps.setString(11, now());
                ps.executeUpdate();
            } else {
                PreparedStatement ps = conn.prepareStatement(
                    "UPDATE data_fields SET name_en=?,name_cn=?,root_id=?,root_name=?,field_type=?,length=?,code_values=?,remark=?,updated_at=? WHERE id=?");
                ps.setString(1, nameEn.isBlank() ? nameCn : nameEn);
                ps.setString(2, nameCn);
                ps.setString(3, str(data, "root_id"));
                ps.setString(4, str(data, "root_name"));
                ps.setString(5, str(data, "field_type"));
                ps.setObject(6, intOrNull(data, "length"));
                ps.setString(7, str(data, "code_values"));
                ps.setString(8, str(data, "remark"));
                ps.setString(9, now());
                ps.setString(10, id);
                ps.executeUpdate();
            }
        } catch (SQLException e) { throw new ToolBoxException("保存字段失败", e); }
    }

    public void deleteField(String id) {
        try (Connection conn = connect()) {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM data_fields WHERE id=?");
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new ToolBoxException("删除字段失败", e); }
    }

    // ══════════════════════════════════════════════════════════════ 接口 ══════
    public List<Map<String, Object>> listInterfaces() {
        try (Connection conn = connect();
             ResultSet rs = conn.createStatement().executeQuery(
                     "SELECT * FROM interfaces ORDER BY updated_at DESC")) {
            return toList(rs);
        } catch (SQLException e) { throw new ToolBoxException("查询接口失败", e); }
    }

    public void saveInterface(Map<String, Object> data, boolean isNew) {
        String id   = str(data, "id");
        String name = str(data, "name");
        if (id.isBlank() || name.isBlank()) throw new ValidationException("接口ID和接口名称不能为空");
        try (Connection conn = connect()) {
            if (isNew) {
                PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO interfaces(id,name,description,input_json,output_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?)");
                ps.setString(1, id);
                ps.setString(2, name);
                ps.setString(3, str(data, "description"));
                ps.setString(4, str(data, "input_json"));
                ps.setString(5, str(data, "output_json"));
                ps.setString(6, now());
                ps.setString(7, now());
                ps.executeUpdate();
            } else {
                PreparedStatement ps = conn.prepareStatement(
                    "UPDATE interfaces SET name=?,description=?,input_json=?,output_json=?,updated_at=? WHERE id=?");
                ps.setString(1, name);
                ps.setString(2, str(data, "description"));
                ps.setString(3, str(data, "input_json"));
                ps.setString(4, str(data, "output_json"));
                ps.setString(5, now());
                ps.setString(6, id);
                ps.executeUpdate();
            }
        } catch (SQLException e) { throw new ToolBoxException("保存接口失败", e); }
    }

    public void deleteInterface(String id) {
        try (Connection conn = connect()) {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM interfaces WHERE id=?");
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new ToolBoxException("删除接口失败", e); }
    }

    // ══════════════════════════════════════════════════════════════ 规则 ══════
    public List<Map<String, Object>> listRules() {
        try (Connection conn = connect();
             ResultSet rs = conn.createStatement().executeQuery(
                     "SELECT * FROM rules ORDER BY updated_at DESC")) {
            return toList(rs);
        } catch (SQLException e) { throw new ToolBoxException("查询规则失败", e); }
    }

    public void saveRule(Map<String, Object> data, boolean isNew) {
        String id   = str(data, "id");
        String name = str(data, "name");
        if (id.isBlank() || name.isBlank()) throw new ValidationException("规则ID和规则名称不能为空");
        try (Connection conn = connect()) {
            if (isNew) {
                PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO rules(id,name,description,input_json,output_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?)");
                ps.setString(1, id);
                ps.setString(2, name);
                ps.setString(3, str(data, "description"));
                ps.setString(4, str(data, "input_json"));
                ps.setString(5, str(data, "output_json"));
                ps.setString(6, now());
                ps.setString(7, now());
                ps.executeUpdate();
            } else {
                PreparedStatement ps = conn.prepareStatement(
                    "UPDATE rules SET name=?,description=?,input_json=?,output_json=?,updated_at=? WHERE id=?");
                ps.setString(1, name);
                ps.setString(2, str(data, "description"));
                ps.setString(3, str(data, "input_json"));
                ps.setString(4, str(data, "output_json"));
                ps.setString(5, now());
                ps.setString(6, id);
                ps.executeUpdate();
            }
        } catch (SQLException e) { throw new ToolBoxException("保存规则失败", e); }
    }

    public void deleteRule(String id) {
        try (Connection conn = connect()) {
            PreparedStatement ps = conn.prepareStatement("DELETE FROM rules WHERE id=?");
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { throw new ToolBoxException("删除规则失败", e); }
    }

    // ══════════════════════════════════════════════════════════════ CSV ════════
    public String exportRootsCsv() {
        var sb = new StringBuilder("id,name,meaning,root_type,length,code_values,remark\n");
        for (var r : listRoots()) {
            sb.append(csvRow(r, "id", "name", "meaning", "root_type", "length", "code_values", "remark")).append("\n");
        }
        return sb.toString();
    }

    public Map<String, Integer> importRootsCsv(String csv) {
        int success = 0, errors = 0;
        String[] lines = csv.split("\n");
        for (int i = 1; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;
            try {
                String[] cols = parseCsvLine(line);
                if (cols.length < 2) { errors++; continue; }
                Map<String, Object> data = new LinkedHashMap<>();
                data.put("id",          col(cols, 0));
                data.put("name",        col(cols, 1));
                data.put("meaning",     col(cols, 2));
                data.put("root_type",   col(cols, 3));
                data.put("length",      col(cols, 4));
                data.put("code_values", col(cols, 5));
                data.put("remark",      col(cols, 6));
                boolean exists = existsRoot(str(data, "id"));
                saveRoot(data, !exists);
                success++;
            } catch (Exception e) { errors++; log.warn("字根导入行失败: {}", e.getMessage()); }
        }
        return Map.of("success", success, "errors", errors);
    }

    public String exportFieldsCsv() {
        var sb = new StringBuilder("id,name_en,name_cn,root_id,root_name,field_type,length,code_values,remark\n");
        for (var f : listFields()) {
            sb.append(csvRow(f, "id", "name_en", "name_cn", "root_id", "root_name", "field_type", "length", "code_values", "remark")).append("\n");
        }
        return sb.toString();
    }

    public Map<String, Integer> importFieldsCsv(String csv) {
        int success = 0, errors = 0;
        String[] lines = csv.split("\n");
        for (int i = 1; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;
            try {
                String[] cols = parseCsvLine(line);
                if (cols.length < 3) { errors++; continue; }
                Map<String, Object> data = new LinkedHashMap<>();
                data.put("id",          col(cols, 0));
                data.put("name_en",     col(cols, 1));
                data.put("name_cn",     col(cols, 2));
                data.put("root_id",     col(cols, 3));
                data.put("root_name",   col(cols, 4));
                data.put("field_type",  col(cols, 5));
                data.put("length",      col(cols, 6));
                data.put("code_values", col(cols, 7));
                data.put("remark",      col(cols, 8));
                boolean exists = existsField(str(data, "id"));
                saveField(data, !exists);
                success++;
            } catch (Exception e) { errors++; log.warn("字段导入行失败: {}", e.getMessage()); }
        }
        return Map.of("success", success, "errors", errors);
    }

    // ══════════════════════════════════════════════════════════════ 辅助 ════════
    private boolean existsRoot(String id) {
        try (Connection conn = connect()) {
            PreparedStatement ps = conn.prepareStatement("SELECT 1 FROM data_roots WHERE id=?");
            ps.setString(1, id);
            return ps.executeQuery().next();
        } catch (SQLException e) { return false; }
    }

    private boolean existsField(String id) {
        try (Connection conn = connect()) {
            PreparedStatement ps = conn.prepareStatement("SELECT 1 FROM data_fields WHERE id=?");
            ps.setString(1, id);
            return ps.executeQuery().next();
        } catch (SQLException e) { return false; }
    }

    private List<Map<String, Object>> toList(ResultSet rs) throws SQLException {
        var result = new ArrayList<Map<String, Object>>();
        var meta   = rs.getMetaData();
        int cols   = meta.getColumnCount();
        while (rs.next()) {
            var row = new LinkedHashMap<String, Object>();
            for (int i = 1; i <= cols; i++) {
                row.put(meta.getColumnName(i), rs.getObject(i));
            }
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
        try { return Integer.parseInt(v.toString().trim()); } catch (NumberFormatException e) { return null; }
    }

    private String csvRow(Map<String, Object> row, String... keys) {
        var parts = new ArrayList<String>();
        for (String k : keys) {
            Object v = row.get(k);
            String s = v == null ? "" : v.toString();
            if (s.contains(",") || s.contains("\"") || s.contains("\n")) {
                s = "\"" + s.replace("\"", "\"\"") + "\"";
            }
            parts.add(s);
        }
        return String.join(",", parts);
    }

    private String[] parseCsvLine(String line) {
        var result = new ArrayList<String>();
        var sb = new StringBuilder();
        boolean inQuote = false;
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (inQuote) {
                if (c == '"' && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    sb.append('"'); i++;
                } else if (c == '"') {
                    inQuote = false;
                } else {
                    sb.append(c);
                }
            } else {
                if (c == '"')      { inQuote = true; }
                else if (c == ',') { result.add(sb.toString()); sb.setLength(0); }
                else               { sb.append(c); }
            }
        }
        result.add(sb.toString());
        return result.toArray(new String[0]);
    }

    private String col(String[] cols, int i) {
        return i < cols.length ? cols[i].trim() : "";
    }
}
