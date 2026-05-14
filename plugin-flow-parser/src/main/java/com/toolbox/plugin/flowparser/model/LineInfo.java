package com.toolbox.plugin.flowparser.model;

import java.util.List;
import java.util.Map;

public class LineInfo {
    public String nid, source, target, label;
    public String isContinueBeanId, routeScriptTxt, customColor;
    // 解析后的可视化条件配置
    public List<Map<String, String>> conditions;
}
