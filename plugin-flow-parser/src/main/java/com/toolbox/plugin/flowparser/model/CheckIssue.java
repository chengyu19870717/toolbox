package com.toolbox.plugin.flowparser.model;

public class CheckIssue {
    /** ERROR / WARN / INFO */
    public String level;
    public String ruleCode;
    public String ruleName;
    /** 关联节点编号，流程级问题为空 */
    public String nodeId;
    /** 关联节点名称 */
    public String nodeName;
    public String message;

    public CheckIssue(String level, String ruleCode, String ruleName,
                      String nodeId, String nodeName, String message) {
        this.level    = level;
        this.ruleCode = ruleCode;
        this.ruleName = ruleName;
        this.nodeId   = nodeId;
        this.nodeName = nodeName;
        this.message  = message;
    }
}
