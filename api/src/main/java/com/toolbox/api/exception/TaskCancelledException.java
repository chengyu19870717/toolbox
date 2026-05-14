package com.toolbox.api.exception;

public class TaskCancelledException extends ToolBoxException {
    public TaskCancelledException() { super("任务已被取消"); }
    public TaskCancelledException(String message) { super(message); }
}
