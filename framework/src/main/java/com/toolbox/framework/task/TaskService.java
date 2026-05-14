package com.toolbox.framework.task;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.handler.*;
import com.toolbox.api.task.TaskArtifact;
import com.toolbox.api.task.TaskInfo;
import com.toolbox.api.task.TaskManager;
import com.toolbox.api.task.TaskStatus;
import com.toolbox.framework.config.ToolBoxProperties;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.*;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class TaskService implements TaskManager {

    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    private final ToolBoxProperties props;
    private final ObjectMapper mapper = new ObjectMapper();

    // 每次操作创建新连接，避免单连接争锁；SQLite WAL 支持并发读+单写
    private String dbUrl;

    private final ThreadPoolExecutor executor = new ThreadPoolExecutor(
            10, 50, 60L, TimeUnit.SECONDS, new LinkedBlockingQueue<>(500));

    private final Map<String, Future<?>> futures = new ConcurrentHashMap<>();
    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();
    private final Map<String, List<SseEmitter>> userEmitters = new ConcurrentHashMap<>();
    private final Map<String, AtomicInteger> userRunning = new ConcurrentHashMap<>();
    // 内存缓存，避免每次 SSE 推送都查 DB
    private final Map<String, String> taskUsername = new ConcurrentHashMap<>();

    public TaskService(ToolBoxProperties props) {
        this.props = props;
    }

    @PostConstruct
    public void init() throws Exception {
        Path dataDir = Path.of(props.getPaths().getConfigDir()).getParent();
        if (dataDir == null) dataDir = Path.of(".");
        dataDir = dataDir.resolve("data");
        Files.createDirectories(dataDir);

        dbUrl = "jdbc:sqlite:" + dataDir.resolve("tasks.db").toAbsolutePath();

        try (Connection conn = getConn(); Statement s = conn.createStatement()) {
            s.execute("PRAGMA journal_mode=WAL");
            s.execute("""
                CREATE TABLE IF NOT EXISTS tasks (
                  id TEXT PRIMARY KEY,
                  plugin_id TEXT NOT NULL,
                  task_type TEXT,
                  name TEXT NOT NULL,
                  username TEXT NOT NULL,
                  status TEXT NOT NULL,
                  progress_percent INTEGER DEFAULT 0,
                  progress_message TEXT,
                  payload TEXT,
                  error_message TEXT,
                  artifacts TEXT,
                  submitted_at INTEGER NOT NULL,
                  started_at INTEGER,
                  finished_at INTEGER
                )
            """);
            s.execute("CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(username, submitted_at DESC)");
            s.execute("CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)");
        }

        // 重启后恢复 userRunning 计数（RUNNING 状态的任务重置为 FAILED，因为进程已死）
        recoverRunningTasks();

        log.info("TaskService initialized, dbUrl={}", dbUrl);
    }

    @PreDestroy
    public void destroy() {
        executor.shutdownNow();
    }

    // ── TaskManager 接口 ──────────────────────────────────────────────────

    @Override
    public String submit(String pluginId, String taskType, String name, String username,
                         Map<String, Object> payload, TaskHandler handler) {
        int maxConcurrent = props.getTask().getMaxConcurrentPerUser();
        AtomicInteger running = userRunning.computeIfAbsent(username, k -> new AtomicInteger(0));
        if (running.get() >= maxConcurrent) {
            throw new ValidationException("您已有 " + maxConcurrent + " 个任务在运行，请等待完成后再提交");
        }

        String taskId = UUID.randomUUID().toString();
        TaskInfo info = new TaskInfo();
        info.setId(taskId);
        info.setPluginId(pluginId);
        info.setTaskType(taskType != null ? taskType : "default");
        info.setName(name);
        info.setUsername(username);
        info.setStatus(TaskStatus.PENDING);
        info.setSubmittedAt(Instant.now());
        info.setArtifacts(List.of());

        persistInsert(info, payload);
        taskUsername.put(taskId, username);
        running.incrementAndGet();

        Future<?> future = executor.submit(() -> executeTask(taskId, info, payload, handler, running));
        futures.put(taskId, future);

        return taskId;
    }

    @Override
    public void cancel(String taskId) {
        Future<?> future = futures.get(taskId);
        if (future != null) future.cancel(true);
        persistUpdateStatus(taskId, TaskStatus.CANCELLED, null);
        pushEvent(taskId, "cancelled", Map.of("taskId", taskId));
    }

    @Override
    public TaskInfo get(String taskId) {
        return queryTask(taskId);
    }

    @Override
    public List<TaskInfo> listByUser(String username, int limit) {
        return queryTasksByUser(username, limit);
    }

    // ── SSE ──────────────────────────────────────────────────────────────

    public SseEmitter subscribe(String taskId, String username) {
        SseEmitter emitter = new SseEmitter(300_000L);
        emitters.computeIfAbsent(taskId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeEmitter(taskId, emitter));
        emitter.onTimeout(() -> removeEmitter(taskId, emitter));
        emitter.onError(e -> removeEmitter(taskId, emitter));

        TaskInfo current = queryTask(taskId);
        if (current != null) {
            try { emitter.send(SseEmitter.event().name("status").data(toEventData(current))); }
            catch (IOException ignored) {}
        }
        return emitter;
    }

    public SseEmitter subscribeUser(String username) {
        SseEmitter emitter = new SseEmitter(300_000L);
        userEmitters.computeIfAbsent(username, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitter.onCompletion(() -> removeUserEmitter(username, emitter));
        emitter.onTimeout(() -> removeUserEmitter(username, emitter));
        emitter.onError(e -> removeUserEmitter(username, emitter));
        return emitter;
    }

    // ── 定时清理 ─────────────────────────────────────────────────────────

    @Scheduled(cron = "${toolbox.task.cleanup-cron}")
    public void cleanup() {
        int retentionDays = props.getTask().getRetentionDays();
        long cutoff = System.currentTimeMillis() - (long) retentionDays * 86400_000;
        try (Connection conn = getConn();
             PreparedStatement ps = conn.prepareStatement(
                "DELETE FROM tasks WHERE finished_at < ? AND status IN ('SUCCESS','FAILED','CANCELLED')")) {
            ps.setLong(1, cutoff);
            int deleted = ps.executeUpdate();
            if (deleted > 0) log.info("Cleaned up {} old tasks", deleted);
        } catch (SQLException e) {
            log.error("Task cleanup failed", e);
        }
    }

    // ── 任务执行 ─────────────────────────────────────────────────────────

    private void executeTask(String taskId, TaskInfo info, Map<String, Object> payload,
                             TaskHandler handler, AtomicInteger running) {
        try {
            persistUpdateStatus(taskId, TaskStatus.RUNNING, null);
            persistProgress(taskId, 0, "开始执行");

            ProgressReporter reporter = new ProgressReporter() {
                @Override public void report(int percent, String message) {
                    persistProgress(taskId, percent, message);
                    pushEvent(taskId, "progress", Map.of(
                        "taskId", taskId,
                        "percent", percent,
                        "message", message != null ? message : ""));
                }
                @Override public void message(String message) { report(-1, message); }
                @Override public void log(String line) {
                    pushEvent(taskId, "log", Map.of("line", line));
                }
            };

            TaskExecutionContext ctx = new TaskExecutionContext() {
                @Override public String getTaskId() { return taskId; }
                @Override public String getPluginId() { return info.getPluginId(); }
                @Override public String getTaskType() { return info.getTaskType(); }
                @Override public String getTaskName() { return info.getName(); }
                @Override public String getUsername() { return info.getUsername(); }
                @Override public Map<String, Object> getPayload() { return payload != null ? payload : Map.of(); }
                @Override public ProgressReporter getProgressReporter() { return reporter; }
                @Override public boolean isCancelled() { return Thread.currentThread().isInterrupted(); }
            };

            TaskResult result = handler.execute(ctx);
            List<TaskArtifact> artifacts = result.getArtifacts();
            persistSuccess(taskId, artifacts);
            pushEvent(taskId, "completed", Map.of(
                "taskId", taskId,
                "artifacts", artifacts.stream().map(a ->
                    Map.of("name", a.getName(), "sizeBytes", a.getSizeBytes(),
                           "contentType", a.getContentType() != null ? a.getContentType() : "")
                ).toList()));

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            persistUpdateStatus(taskId, TaskStatus.CANCELLED, "任务已取消");
            pushEvent(taskId, "cancelled", Map.of("taskId", taskId));
        } catch (Exception e) {
            log.error("Task {} failed", taskId, e);
            persistUpdateStatus(taskId, TaskStatus.FAILED, e.getMessage());
            pushEvent(taskId, "failed", Map.of("taskId", taskId, "error", e.getMessage() != null ? e.getMessage() : "未知错误"));
        } finally {
            running.decrementAndGet();
            futures.remove(taskId);
            taskUsername.remove(taskId);
            executor.submit(() -> {
                try { Thread.sleep(2000); } catch (InterruptedException ignored) {}
                closeEmitters(taskId);
            });
        }
    }

    // ── SQLite 操作 ───────────────────────────────────────────────────────

    private Connection getConn() throws SQLException {
        return DriverManager.getConnection(dbUrl);
    }

    private void persistInsert(TaskInfo info, Map<String, Object> payload) {
        try (Connection conn = getConn();
             PreparedStatement ps = conn.prepareStatement(
                "INSERT INTO tasks(id,plugin_id,task_type,name,username,status,progress_percent,payload,artifacts,submitted_at) VALUES(?,?,?,?,?,?,?,?,?,?)")) {
            ps.setString(1, info.getId());
            ps.setString(2, info.getPluginId());
            ps.setString(3, info.getTaskType());
            ps.setString(4, info.getName());
            ps.setString(5, info.getUsername());
            ps.setString(6, TaskStatus.PENDING.name());
            ps.setInt(7, 0);
            ps.setString(8, payload != null ? mapper.writeValueAsString(payload) : "{}");
            ps.setString(9, "[]");
            ps.setLong(10, info.getSubmittedAt().toEpochMilli());
            ps.executeUpdate();
        } catch (Exception e) {
            log.error("Failed to insert task {}", info.getId(), e);
        }
    }

    private void persistUpdateStatus(String taskId, TaskStatus status, String message) {
        String sql = switch (status) {
            case RUNNING  -> "UPDATE tasks SET status=?, started_at=COALESCE(started_at,?) WHERE id=?";
            case SUCCESS, FAILED, CANCELLED ->
                "UPDATE tasks SET status=?, finished_at=?, error_message=COALESCE(?,error_message) WHERE id=?";
            default       -> "UPDATE tasks SET status=? WHERE id=?";
        };
        try (Connection conn = getConn(); PreparedStatement ps = conn.prepareStatement(sql)) {
            long now = System.currentTimeMillis();
            ps.setString(1, status.name());
            if (status == TaskStatus.RUNNING) {
                ps.setLong(2, now);
                ps.setString(3, taskId);
            } else if (status == TaskStatus.SUCCESS || status == TaskStatus.FAILED || status == TaskStatus.CANCELLED) {
                ps.setLong(2, now);
                ps.setString(3, message);
                ps.setString(4, taskId);
            } else {
                ps.setString(2, taskId);
            }
            ps.executeUpdate();
        } catch (SQLException e) {
            log.error("Failed to update status for task {}", taskId, e);
        }
    }

    private void persistProgress(String taskId, int percent, String message) {
        String sql = percent >= 0
            ? "UPDATE tasks SET progress_percent=?, progress_message=? WHERE id=?"
            : "UPDATE tasks SET progress_message=? WHERE id=?";
        try (Connection conn = getConn(); PreparedStatement ps = conn.prepareStatement(sql)) {
            if (percent >= 0) {
                ps.setInt(1, percent);
                ps.setString(2, message);
                ps.setString(3, taskId);
            } else {
                ps.setString(1, message);
                ps.setString(2, taskId);
            }
            ps.executeUpdate();
        } catch (SQLException e) {
            log.error("Failed to update progress for task {}", taskId, e);
        }
    }

    private void persistSuccess(String taskId, List<TaskArtifact> artifacts) {
        try (Connection conn = getConn();
             PreparedStatement ps = conn.prepareStatement(
                "UPDATE tasks SET status=?, progress_percent=100, finished_at=?, artifacts=? WHERE id=?")) {
            ps.setString(1, TaskStatus.SUCCESS.name());
            ps.setLong(2, System.currentTimeMillis());
            ps.setString(3, mapper.writeValueAsString(artifacts));
            ps.setString(4, taskId);
            ps.executeUpdate();
        } catch (Exception e) {
            log.error("Failed to persist success for task {}", taskId, e);
        }
    }

    private void recoverRunningTasks() {
        try (Connection conn = getConn();
             PreparedStatement ps = conn.prepareStatement(
                "UPDATE tasks SET status='FAILED', error_message='进程重启，任务中断', finished_at=? WHERE status IN ('RUNNING','PENDING')")) {
            ps.setLong(1, System.currentTimeMillis());
            int updated = ps.executeUpdate();
            if (updated > 0) log.warn("Recovered {} interrupted tasks on startup", updated);
        } catch (SQLException e) {
            log.error("Failed to recover running tasks", e);
        }
    }

    private TaskInfo queryTask(String taskId) {
        try (Connection conn = getConn();
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM tasks WHERE id=?")) {
            ps.setString(1, taskId);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? mapRow(rs) : null;
            }
        } catch (SQLException e) {
            log.error("Failed to query task {}", taskId, e);
            return null;
        }
    }

    private List<TaskInfo> queryTasksByUser(String username, int limit) {
        try (Connection conn = getConn();
             PreparedStatement ps = conn.prepareStatement(
                "SELECT * FROM tasks WHERE username=? ORDER BY submitted_at DESC LIMIT ?")) {
            ps.setString(1, username);
            ps.setInt(2, limit);
            try (ResultSet rs = ps.executeQuery()) {
                List<TaskInfo> result = new ArrayList<>();
                while (rs.next()) result.add(mapRow(rs));
                return result;
            }
        } catch (SQLException e) {
            log.error("Failed to query tasks for user {}", username, e);
            return List.of();
        }
    }

    @SuppressWarnings("unchecked")
    private TaskInfo mapRow(ResultSet rs) throws SQLException {
        TaskInfo info = new TaskInfo();
        info.setId(rs.getString("id"));
        info.setPluginId(rs.getString("plugin_id"));
        info.setTaskType(rs.getString("task_type"));
        info.setName(rs.getString("name"));
        info.setUsername(rs.getString("username"));
        info.setStatus(TaskStatus.valueOf(rs.getString("status")));
        info.setProgressPercent(rs.getInt("progress_percent"));
        info.setProgressMessage(rs.getString("progress_message"));
        info.setErrorMessage(rs.getString("error_message"));
        info.setSubmittedAt(Instant.ofEpochMilli(rs.getLong("submitted_at")));
        long startedAt = rs.getLong("started_at");
        if (!rs.wasNull()) info.setStartedAt(Instant.ofEpochMilli(startedAt));
        long finishedAt = rs.getLong("finished_at");
        if (!rs.wasNull()) info.setFinishedAt(Instant.ofEpochMilli(finishedAt));
        try {
            String artifactsJson = rs.getString("artifacts");
            if (artifactsJson != null && !artifactsJson.isBlank()) {
                List<Map<String, Object>> raw = mapper.readValue(artifactsJson, List.class);
                info.setArtifacts(raw.stream().map(m -> TaskArtifact.builder()
                        .name((String) m.get("name"))
                        .path((String) m.get("path"))
                        .contentType((String) m.get("contentType"))
                        .sizeBytes(m.get("sizeBytes") instanceof Number n ? n.longValue() : 0)
                        .build()).toList());
            } else {
                info.setArtifacts(List.of());
            }
        } catch (Exception e) {
            info.setArtifacts(List.of());
        }
        return info;
    }

    // ── SSE 工具 ─────────────────────────────────────────────────────────

    private void pushEvent(String taskId, String eventName, Object data) {
        String json;
        try { json = mapper.writeValueAsString(data); } catch (Exception e) { return; }

        List<SseEmitter> list = emitters.get(taskId);
        if (list != null) {
            list.removeIf(emitter -> {
                try { emitter.send(SseEmitter.event().name(eventName).data(json)); return false; }
                catch (Exception ex) { return true; }
            });
        }

        // 用内存缓存查 username，不再查 DB
        String username = taskUsername.get(taskId);
        if (username != null) {
            List<SseEmitter> userList = userEmitters.get(username);
            if (userList != null) {
                userList.removeIf(emitter -> {
                    try { emitter.send(SseEmitter.event().name(eventName).data(json)); return false; }
                    catch (Exception ex) { return true; }
                });
            }
        }
    }

    private void closeEmitters(String taskId) {
        List<SseEmitter> list = emitters.remove(taskId);
        if (list != null) list.forEach(e -> { try { e.complete(); } catch (Exception ignored) {} });
    }

    private void removeEmitter(String taskId, SseEmitter emitter) {
        List<SseEmitter> list = emitters.get(taskId);
        if (list != null) list.remove(emitter);
    }

    private void removeUserEmitter(String username, SseEmitter emitter) {
        List<SseEmitter> list = userEmitters.get(username);
        if (list != null) list.remove(emitter);
    }

    private Map<String, Object> toEventData(TaskInfo info) {
        return Map.of(
                "taskId", info.getId(),
                "status", info.getStatus().name(),
                "progressPercent", info.getProgressPercent(),
                "progressMessage", info.getProgressMessage() != null ? info.getProgressMessage() : ""
        );
    }
}
