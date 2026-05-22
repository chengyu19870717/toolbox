package com.toolbox.api.task;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public class TaskInfo {

    private String id;
    private String pluginId;
    private String taskType;
    private String name;
    private String username;
    private TaskStatus status;
    private int progressPercent;
    private String progressMessage;
    private Instant submittedAt;
    private Instant startedAt;
    private Instant finishedAt;
    private String errorMessage;
    private List<TaskArtifact> artifacts;
    private Map<String, Object> summary;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPluginId() { return pluginId; }
    public void setPluginId(String pluginId) { this.pluginId = pluginId; }
    public String getTaskType() { return taskType; }
    public void setTaskType(String taskType) { this.taskType = taskType; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }
    public int getProgressPercent() { return progressPercent; }
    public void setProgressPercent(int progressPercent) { this.progressPercent = progressPercent; }
    public String getProgressMessage() { return progressMessage; }
    public void setProgressMessage(String progressMessage) { this.progressMessage = progressMessage; }
    public Instant getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
    public Instant getStartedAt() { return startedAt; }
    public void setStartedAt(Instant startedAt) { this.startedAt = startedAt; }
    public Instant getFinishedAt() { return finishedAt; }
    public void setFinishedAt(Instant finishedAt) { this.finishedAt = finishedAt; }
    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
    public List<TaskArtifact> getArtifacts() { return artifacts; }
    public void setArtifacts(List<TaskArtifact> artifacts) { this.artifacts = artifacts; }
    public Map<String, Object> getSummary() { return summary; }
    public void setSummary(Map<String, Object> summary) { this.summary = summary; }
}
