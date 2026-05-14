package com.toolbox.api.plugin.handler;

import com.toolbox.api.task.TaskArtifact;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TaskResult {

    private final List<TaskArtifact> artifacts;
    private final Map<String, Object> summary;

    private TaskResult(Builder builder) {
        this.artifacts = List.copyOf(builder.artifacts);
        this.summary = Map.copyOf(builder.summary);
    }

    public List<TaskArtifact> getArtifacts() { return artifacts; }
    public Map<String, Object> getSummary() { return summary; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final List<TaskArtifact> artifacts = new ArrayList<>();
        private final Map<String, Object> summary = new HashMap<>();

        public Builder addArtifact(TaskArtifact artifact) {
            artifacts.add(artifact);
            return this;
        }

        public Builder summary(String key, Object value) {
            summary.put(key, value);
            return this;
        }

        public TaskResult build() { return new TaskResult(this); }
    }
}
