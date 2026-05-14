package com.toolbox.api.datasource;

public class TestResult {

    private final boolean ok;
    private final String message;
    private final long durationMs;

    private TestResult(boolean ok, String message, long durationMs) {
        this.ok = ok;
        this.message = message;
        this.durationMs = durationMs;
    }

    public static TestResult success(long durationMs) {
        return new TestResult(true, null, durationMs);
    }

    public static TestResult failure(String message) {
        return new TestResult(false, message, 0);
    }

    public boolean isOk() { return ok; }
    public String getMessage() { return message; }
    public long getDurationMs() { return durationMs; }
}
