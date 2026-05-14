package com.toolbox.api.plugin.handler;

public interface TaskHandler {

    /**
     * 执行任务。
     * @throws InterruptedException 任务被取消时抛出
     * @throws Exception 业务错误，框架标记任务为 FAILED
     */
    TaskResult execute(TaskExecutionContext ctx) throws Exception;
}
