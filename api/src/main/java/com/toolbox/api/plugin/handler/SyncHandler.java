package com.toolbox.api.plugin.handler;

import java.util.Map;

public interface SyncHandler {

    /**
     * @param action 前端 callSync 的第一个参数
     * @param params 前端 callSync 的第二个参数（已反序列化为 Map）
     * @return 任意可序列化为 JSON 的对象
     */
    Object handle(String action, Map<String, Object> params) throws Exception;
}
