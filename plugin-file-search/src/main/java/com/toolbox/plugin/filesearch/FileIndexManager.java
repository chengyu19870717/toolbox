package com.toolbox.plugin.filesearch;

import com.toolbox.api.exception.ToolBoxException;
import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.handler.ProgressReporter;
import com.toolbox.api.plugin.handler.TaskExecutionContext;
import org.slf4j.Logger;

import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class FileIndexManager {

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // 支持的文档扩展名（Word/WPS-Word、Excel/WPS-Excel、PPT/WPS-PPT）
    private static final Set<String> SUPPORTED_EXTS = Set.of(
        ".doc", ".docx", ".wps",          // Word 格式
        ".xls", ".xlsx", ".et",           // Excel 格式
        ".ppt", ".pptx", ".dps"           // PPT 格式
    );

    private final String jdbcUrl;
    private final Logger log;

    public FileIndexManager(Path dataDir, Logger log) {
        this.jdbcUrl = "jdbc:sqlite:" + dataDir.resolve("file_search.db");
        this.log = log;
        initSchema();
    }

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(jdbcUrl);
    }

    private String now() {
        return LocalDateTime.now().format(FMT);
    }

    private void initSchema() {
        try (Connection conn = connect(); Statement st = conn.createStatement()) {
            st.execute("""
                CREATE TABLE IF NOT EXISTS scan_dirs (
                    id   TEXT PRIMARY KEY,
                    path TEXT NOT NULL UNIQUE,
                    name TEXT,
                    last_scan TEXT
                )""");
            st.execute("""
                CREATE TABLE IF NOT EXISTS file_index (
                    id        TEXT PRIMARY KEY,
                    dir_id    TEXT NOT NULL,
                    name      TEXT NOT NULL,
                    ext       TEXT NOT NULL,
                    full_path TEXT NOT NULL,
                    file_size INTEGER,
                    modified  TEXT,
                    indexed   TEXT NOT NULL
                )""");
            st.execute("CREATE INDEX IF NOT EXISTS idx_file_name ON file_index(name)");
            st.execute("CREATE INDEX IF NOT EXISTS idx_file_dir  ON file_index(dir_id)");
        } catch (SQLException e) {
            throw new ToolBoxException("初始化文件检索数据库失败", e);
        }
    }

    // ── 目录管理 ─────────────────────────────────────────────────────────────

    public List<Map<String, Object>> listDirs() {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT id, path, name, last_scan FROM scan_dirs ORDER BY name")) {
            List<Map<String, Object>> list = new ArrayList<>();
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                row.put("id",       rs.getString("id"));
                row.put("path",     rs.getString("path"));
                row.put("name",     rs.getString("name"));
                row.put("lastScan", rs.getString("last_scan"));
                list.add(row);
            }
            return list;
        } catch (SQLException e) {
            throw new ToolBoxException("查询目录列表失败", e);
        }
    }

    public void addDir(String path, String name) {
        String trimmedPath = path.trim();
        if (trimmedPath.isBlank()) throw new ValidationException("目录路径不能为空");
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(
                 "INSERT OR IGNORE INTO scan_dirs(id, path, name) VALUES(?,?,?)")) {
            ps.setString(1, UUID.randomUUID().toString());
            ps.setString(2, trimmedPath);
            ps.setString(3, name.isBlank() ? trimmedPath : name.trim());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new ToolBoxException("添加目录失败", e);
        }
    }

    public void removeDir(String id) {
        try (Connection conn = connect()) {
            conn.setAutoCommit(false);
            try (PreparedStatement ps1 = conn.prepareStatement(
                     "DELETE FROM file_index WHERE dir_id = ?");
                 PreparedStatement ps2 = conn.prepareStatement(
                     "DELETE FROM scan_dirs WHERE id = ?")) {
                ps1.setString(1, id);
                ps1.executeUpdate();
                ps2.setString(1, id);
                ps2.executeUpdate();
                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            }
        } catch (SQLException e) {
            throw new ToolBoxException("删除目录失败", e);
        }
    }

    // ── 扫描 ─────────────────────────────────────────────────────────────────

    /** TaskHandler 异步扫描入口，支持取消检测和进度上报。 */
    public Map<String, Object> scanDirWithProgress(
            String dirId, ProgressReporter reporter, TaskExecutionContext ctx) throws InterruptedException {

        String dirPath = getDirPath(dirId);
        Path root = Paths.get(dirPath);
        if (!Files.isDirectory(root)) {
            throw new ValidationException("目录不存在或不可访问：" + dirPath);
        }

        reporter.report(5, "正在收集文件列表…");
        List<Path> found = new ArrayList<>();
        try {
            Files.walkFileTree(root, new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                    if (ctx.isCancelled()) return FileVisitResult.TERMINATE;
                    String name = file.getFileName().toString().toLowerCase();
                    int dot = name.lastIndexOf('.');
                    if (dot >= 0 && SUPPORTED_EXTS.contains(name.substring(dot))) {
                        found.add(file);
                    }
                    return FileVisitResult.CONTINUE;
                }
                @Override
                public FileVisitResult visitFileFailed(Path file, IOException exc) {
                    log.warn("无法访问文件: {}", file);
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            throw new ToolBoxException("扫描目录失败", e);
        }

        if (ctx.isCancelled()) throw new InterruptedException("Task cancelled");

        reporter.report(30, "共发现 " + found.size() + " 个文件，正在建立索引…");
        replaceIndex(dirId, found, reporter, ctx);
        updateLastScan(dirId);
        log.info("扫描完成，目录={}，共 {} 个文件", dirPath, found.size());
        return Map.of("count", found.size(), "dirPath", dirPath);
    }

    private void replaceIndex(String dirId, List<Path> files,
                               ProgressReporter reporter, TaskExecutionContext ctx) throws InterruptedException {
        try (Connection conn = connect()) {
            conn.setAutoCommit(false);
            try {
                try (PreparedStatement del = conn.prepareStatement(
                        "DELETE FROM file_index WHERE dir_id = ?")) {
                    del.setString(1, dirId);
                    del.executeUpdate();
                }
                try (PreparedStatement ins = conn.prepareStatement("""
                        INSERT INTO file_index(id, dir_id, name, ext, full_path, file_size, modified, indexed)
                        VALUES(?,?,?,?,?,?,?,?)""")) {
                    String now = now();
                    int total = files.size();
                    for (int i = 0; i < total; i++) {
                        if (ctx != null && ctx.isCancelled()) {
                            conn.rollback();
                            throw new InterruptedException("Task cancelled");
                        }
                        Path f = files.get(i);
                        String fileName = f.getFileName().toString();
                        String ext = getExt(fileName);
                        BasicFileAttributes attrs;
                        try {
                            attrs = Files.readAttributes(f, BasicFileAttributes.class);
                        } catch (IOException e) {
                            log.warn("读取文件属性失败: {}", f);
                            continue;
                        }
                        ins.setString(1, UUID.randomUUID().toString());
                        ins.setString(2, dirId);
                        ins.setString(3, fileName);
                        ins.setString(4, ext);
                        ins.setString(5, f.toAbsolutePath().toString());
                        ins.setLong(6, attrs.size());
                        ins.setString(7, attrs.lastModifiedTime().toString());
                        ins.setString(8, now);
                        ins.addBatch();
                        // 每 200 条汇报一次进度，避免 SSE 刷屏
                        if (reporter != null && total > 0 && (i + 1) % 200 == 0) {
                            int pct = 30 + (int) ((i + 1) * 65.0 / total);
                            reporter.report(pct, "已索引 " + (i + 1) + " / " + total + " 个文件");
                        }
                    }
                    ins.executeBatch();
                }
                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            }
        } catch (SQLException e) {
            throw new ToolBoxException("更新文件索引失败", e);
        }
    }

    private void updateLastScan(String dirId) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(
                 "UPDATE scan_dirs SET last_scan = ? WHERE id = ?")) {
            ps.setString(1, now());
            ps.setString(2, dirId);
            ps.executeUpdate();
        } catch (SQLException e) {
            log.warn("更新扫描时间失败", e);
        }
    }

    private String getDirPath(String dirId) {
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT path FROM scan_dirs WHERE id = ?")) {
            ps.setString(1, dirId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) return rs.getString("path");
            throw new ValidationException("目录不存在: " + dirId);
        } catch (SQLException e) {
            throw new ToolBoxException("查询目录失败", e);
        }
    }

    // ── 搜索 ─────────────────────────────────────────────────────────────────

    public Map<String, Object> search(String keyword, String extFilter, int page, int pageSize) {
        String likePat = "%" + keyword.replace("%", "\\%").replace("_", "\\_") + "%";
        String sql = buildSearchSql(extFilter);

        try (Connection conn = connect();
             PreparedStatement psCount = conn.prepareStatement(
                 "SELECT COUNT(*) FROM (" + sql + ") t");
             PreparedStatement psData = conn.prepareStatement(
                 sql + " ORDER BY fi.name LIMIT ? OFFSET ?")) {

            int paramIdx = bindSearchParams(psCount, likePat, extFilter, 1);
            int total = 0;
            ResultSet rsCount = psCount.executeQuery();
            if (rsCount.next()) total = rsCount.getInt(1);

            paramIdx = bindSearchParams(psData, likePat, extFilter, 1);
            psData.setInt(paramIdx++, pageSize);
            psData.setInt(paramIdx, (page - 1) * pageSize);

            List<Map<String, Object>> rows = new ArrayList<>();
            ResultSet rs = psData.executeQuery();
            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                row.put("id",       rs.getString("id"));
                row.put("name",     rs.getString("name"));
                row.put("ext",      rs.getString("ext"));
                row.put("fullPath", rs.getString("full_path"));
                row.put("fileSize", rs.getLong("file_size"));
                row.put("modified", rs.getString("modified"));
                row.put("dirPath",  rs.getString("dir_path"));
                rows.add(row);
            }
            return Map.of("total", total, "list", rows);
        } catch (SQLException e) {
            throw new ToolBoxException("搜索失败", e);
        }
    }

    private String buildSearchSql(String extFilter) {
        StringBuilder sb = new StringBuilder("""
            SELECT fi.id, fi.name, fi.ext, fi.full_path, fi.file_size, fi.modified,
                   sd.path AS dir_path
            FROM file_index fi
            JOIN scan_dirs sd ON sd.id = fi.dir_id
            WHERE (fi.name LIKE ? ESCAPE '\\')
            """);
        if (extFilter != null && !extFilter.isBlank()) {
            sb.append(" AND fi.ext = ?");
        }
        return sb.toString();
    }

    private int bindSearchParams(PreparedStatement ps, String likePat, String extFilter, int startIdx)
            throws SQLException {
        ps.setString(startIdx++, likePat);
        if (extFilter != null && !extFilter.isBlank()) {
            ps.setString(startIdx++, extFilter.toLowerCase());
        }
        return startIdx;
    }

    // ── 统计 ─────────────────────────────────────────────────────────────────

    public Map<String, Object> stats() {
        try (Connection conn = connect(); Statement st = conn.createStatement()) {
            Map<String, Object> result = new LinkedHashMap<>();
            ResultSet rs = st.executeQuery("SELECT COUNT(*) FROM file_index");
            result.put("totalFiles", rs.next() ? rs.getInt(1) : 0);
            rs = st.executeQuery("SELECT COUNT(*) FROM scan_dirs");
            result.put("totalDirs", rs.next() ? rs.getInt(1) : 0);
            return result;
        } catch (SQLException e) {
            throw new ToolBoxException("获取统计数据失败", e);
        }
    }

    // ── 工具方法 ─────────────────────────────────────────────────────────────

    private String getExt(String fileName) {
        int idx = fileName.lastIndexOf('.');
        return idx >= 0 ? fileName.substring(idx).toLowerCase() : "";
    }
}
