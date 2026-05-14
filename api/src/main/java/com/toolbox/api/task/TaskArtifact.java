package com.toolbox.api.task;

public class TaskArtifact {

    private final String name;
    private final String path;
    private final String contentType;
    private final long sizeBytes;

    private TaskArtifact(Builder builder) {
        this.name = builder.name;
        this.path = builder.path;
        this.contentType = builder.contentType;
        this.sizeBytes = builder.sizeBytes;
    }

    public String getName() { return name; }
    public String getPath() { return path; }
    public String getContentType() { return contentType; }
    public long getSizeBytes() { return sizeBytes; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private String path;
        private String contentType;
        private long sizeBytes;

        public Builder name(String v) { this.name = v; return this; }
        public Builder path(String v) { this.path = v; return this; }
        public Builder contentType(String v) { this.contentType = v; return this; }
        public Builder sizeBytes(long v) { this.sizeBytes = v; return this; }
        public TaskArtifact build() { return new TaskArtifact(this); }
    }
}
