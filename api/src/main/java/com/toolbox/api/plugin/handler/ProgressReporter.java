package com.toolbox.api.plugin.handler;

public interface ProgressReporter {

    /** @param percent 0-100 */
    void report(int percent, String message);

    void message(String message);

    /** 输出一行日志到前端 ProgressPanel */
    void log(String line);
}
