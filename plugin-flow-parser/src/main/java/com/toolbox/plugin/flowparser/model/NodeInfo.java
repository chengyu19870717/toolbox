package com.toolbox.plugin.flowparser.model;

public class NodeInfo {
    public String nid, label, nodeType, nodeSign, nodeLevel;
    // 人员
    public String nodeUser, convertLabel, opUsersType, computeType, strategyBeanId;
    // 审批操作
    public String autoSubmit, noUserJump, returnBack, tackBack, retract;
    public String change, assist, addSign, jump, urged, refuse, gather, conditionSelect;
    // 消息 & 业务
    public String noticeType, bizBeanId, asynDo, beforeSubmit;
    public String nodeScript, nodeScriptTxt;
    // 授权
    public String creditAuth, creditAuthAboutData;
    // 其他
    public String subFlow, handleType;
}
