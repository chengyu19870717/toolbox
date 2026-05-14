package com.toolbox.framework.datasource;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.toolbox.api.datasource.*;
import com.toolbox.api.exception.DataSourceException;
import com.toolbox.api.exception.ValidationException;
import com.toolbox.framework.config.ToolBoxProperties;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.sql.*;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DataSourceService implements DataSourceManager {

    private static final Logger log = LoggerFactory.getLogger(DataSourceService.class);

    private final Path configFile;
    private final ToolBoxProperties props;
    private final ObjectMapper mapper;

    private List<DataSourceConfig> configs = new ArrayList<>();
    private final Map<String, HikariDataSource> pools = new ConcurrentHashMap<>();

    public DataSourceService(ToolBoxProperties props) {
        this.props = props;
        this.configFile = Path.of(props.getPaths().getConfigDir(), "datasources.json");
        this.mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(configFile.getParent());
        if (Files.exists(configFile)) {
            configs = mapper.readValue(Files.readAllBytes(configFile), new TypeReference<>() {});
            log.info("DataSourceService initialized, {} datasources loaded", configs.size());
        } else {
            flush();
        }
    }

    @PreDestroy
    public void destroy() {
        pools.values().forEach(HikariDataSource::close);
    }

    // ── DataSourceManager 接口实现 ──────────────────────────────────────────

    @Override
    public List<DataSourceInfo> list() {
        return configs.stream().map(DataSourceConfig::toInfo).toList();
    }

    @Override
    public DataSourceInfo get(String id) {
        return findConfig(id).toInfo();
    }

    @Override
    public TestResult testConnection(String id) {
        return testConnectionRaw(findConfig(id));
    }

    public TestResult testConnectionRaw(DataSourceConfig cfg) {
        long start = System.currentTimeMillis();
        try (HikariDataSource ds = buildPool(cfg, 1);
             Connection conn = ds.getConnection()) {
            conn.isValid(5);
            return TestResult.success(System.currentTimeMillis() - start);
        } catch (Exception e) {
            return TestResult.failure(e.getMessage());
        }
    }

    @Override
    public QueryResult query(QueryRequest req) {
        DataSourceConfig cfg = findConfig(req.getDataSourceId());
        HikariDataSource pool = getOrCreatePool(cfg);
        long start = System.currentTimeMillis();

        try (Connection conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement(req.getSql())) {

            ps.setQueryTimeout(req.getTimeoutSeconds());
            ps.setMaxRows(req.getMaxRows() + 1); // 多取 1 行判断是否截断

            List<Object> params = req.getParams();
            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }

            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                int colCount = meta.getColumnCount();

                List<ColumnMeta> columns = new ArrayList<>(colCount);
                for (int i = 1; i <= colCount; i++) {
                    columns.add(new ColumnMeta(
                            meta.getColumnLabel(i),
                            meta.getColumnTypeName(i),
                            meta.getColumnType(i),
                            meta.isNullable(i) != ResultSetMetaData.columnNoNulls
                    ));
                }

                List<Object[]> rows = new ArrayList<>();
                boolean truncated = false;
                while (rs.next()) {
                    if (rows.size() >= req.getMaxRows()) {
                        truncated = true;
                        break;
                    }
                    Object[] row = new Object[colCount];
                    for (int i = 0; i < colCount; i++) row[i] = rs.getObject(i + 1);
                    rows.add(row);
                }

                return new QueryResult(columns, rows, truncated, System.currentTimeMillis() - start);
            }

        } catch (SQLTimeoutException e) {
            throw new DataSourceException("查询超时（" + req.getTimeoutSeconds() + "s）", e);
        } catch (SQLException e) {
            throw new DataSourceException("查询失败: " + e.getMessage(), e);
        }
    }

    @Override
    public <T> T inTransaction(String dataSourceId, TransactionalAction<T> action) {
        HikariDataSource pool = getOrCreatePool(findConfig(dataSourceId));
        try (Connection conn = pool.getConnection()) {
            conn.setAutoCommit(false);
            try {
                T result = action.execute(conn);
                conn.commit();
                return result;
            } catch (Exception e) {
                conn.rollback();
                throw new DataSourceException("事务执行失败", e);
            }
        } catch (DataSourceException e) {
            throw e;
        } catch (SQLException e) {
            throw new DataSourceException("获取连接失败", e);
        }
    }

    @Override
    public Connection getConnection(String dataSourceId) throws SQLException {
        return getOrCreatePool(findConfig(dataSourceId)).getConnection();
    }

    // ── 管理接口（给 Controller 用）────────────────────────────────────────

    public synchronized DataSourceConfig create(DataSourceConfig cfg) {
        if (configs.stream().anyMatch(c -> c.getName().equals(cfg.getName()))) {
            throw new ValidationException("数据源名称已存在: " + cfg.getName());
        }
        cfg.setCreatedAt(Instant.now());
        cfg.setUpdatedAt(Instant.now());
        cfg.setVersion(1);
        configs.add(cfg);
        flush();
        return cfg;
    }

    public synchronized DataSourceConfig update(String id, DataSourceConfig incoming) {
        DataSourceConfig existing = findConfig(id);
        if (incoming.getVersion() != existing.getVersion()) {
            throw new ValidationException("配置已被他人修改，请刷新后重试");
        }
        // 检查名字唯一性（排除自身）
        if (configs.stream().anyMatch(c -> !c.getId().equals(id) && c.getName().equals(incoming.getName()))) {
            throw new ValidationException("数据源名称已存在: " + incoming.getName());
        }
        incoming.setId(id);
        incoming.setVersion(existing.getVersion() + 1);
        incoming.setCreatedAt(existing.getCreatedAt());
        incoming.setUpdatedAt(Instant.now());

        configs.removeIf(c -> c.getId().equals(id));
        configs.add(incoming);
        flush();

        // 连接池失效，下次懒加载重建
        HikariDataSource old = pools.remove(id);
        if (old != null) old.close();

        return incoming;
    }

    public synchronized void delete(String id) {
        findConfig(id); // 确认存在
        configs.removeIf(c -> c.getId().equals(id));
        flush();
        HikariDataSource pool = pools.remove(id);
        if (pool != null) pool.close();
    }

    public DataSourceConfig getConfig(String id) {
        return findConfig(id);
    }

    public List<DataSourceConfig> listConfigs() {
        return List.copyOf(configs);
    }

    // ── 内部方法 ─────────────────────────────────────────────────────────

    private DataSourceConfig findConfig(String id) {
        return configs.stream().filter(c -> c.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ValidationException("数据源不存在: " + id));
    }

    private HikariDataSource getOrCreatePool(DataSourceConfig cfg) {
        return pools.computeIfAbsent(cfg.getId(), k -> buildPool(cfg,
                cfg.getPoolConfig().getMaximumPoolSize()));
    }

    private HikariDataSource buildPool(DataSourceConfig cfg, int maxPoolSize) {
        HikariConfig hk = new HikariConfig();
        hk.setJdbcUrl(buildJdbcUrl(cfg));
        hk.setUsername(cfg.getUsername());
        hk.setPassword(cfg.getPassword());
        hk.setMaximumPoolSize(maxPoolSize);
        hk.setMinimumIdle(Math.min(cfg.getPoolConfig().getMinimumIdle(), maxPoolSize));
        hk.setConnectionTimeout(cfg.getPoolConfig().getConnectionTimeoutMs());
        hk.setIdleTimeout(cfg.getPoolConfig().getIdleTimeoutMs());
        hk.setMaxLifetime(cfg.getPoolConfig().getMaxLifetimeMs());
        hk.setPoolName("tb-" + cfg.getId().substring(0, 8));
        return new HikariDataSource(hk);
    }

    private String buildJdbcUrl(DataSourceConfig cfg) {
        StringBuilder url = new StringBuilder("jdbc:mysql://")
                .append(cfg.getHost()).append(":").append(cfg.getPort())
                .append("/").append(cfg.getDatabase());

        Map<String, String> params = cfg.getParams() != null ? cfg.getParams() : Map.of();
        Map<String, String> merged = new LinkedHashMap<>();
        merged.put("useUnicode", "true");
        merged.put("characterEncoding", "utf8mb4");
        merged.put("useSSL", "false");
        merged.put("serverTimezone", "Asia/Shanghai");
        merged.putAll(params);

        url.append("?");
        merged.forEach((k, v) -> url.append(k).append("=").append(v).append("&"));
        return url.substring(0, url.length() - 1);
    }

    private void flush() {
        try {
            Path tmp = configFile.resolveSibling(configFile.getFileName() + ".tmp");
            mapper.writerWithDefaultPrettyPrinter().writeValue(tmp.toFile(), configs);
            Files.move(tmp, configFile, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Failed to flush datasources.json", e);
        }
    }
}
