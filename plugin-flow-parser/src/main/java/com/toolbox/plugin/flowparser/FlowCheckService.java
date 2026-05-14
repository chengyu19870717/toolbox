package com.toolbox.plugin.flowparser;

import com.toolbox.plugin.flowparser.model.CheckIssue;
import com.toolbox.plugin.flowparser.model.FlowData;
import com.toolbox.plugin.flowparser.model.NodeInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 流程配置检查服务。
 * 每条规则是一个独立的私有方法，统一在 check() 中编排，
 * 后续新增规则只需添加方法并在 check() 末尾注册。
 */
public class FlowCheckService {

    public List<CheckIssue> check(FlowData flow) {
        List<CheckIssue> issues = new ArrayList<>();
        checkStartNode(flow, issues);
        checkOrphanNodes(flow, issues);
        checkProcessNodeUser(flow, issues);
        checkNoUserJump(flow, issues);
        checkProcessNodeNotice(flow, issues);
        // TODO: 后续在此追加新规则方法
        return issues;
    }

    // ── 规则：必须有且仅有一个开始节点 ──────────────────────────────────────
    private void checkStartNode(FlowData flow, List<CheckIssue> issues) {
        long count = flow.nodes.stream().filter(n -> "S".equals(n.nodeType)).count();
        if (count == 0) {
            issues.add(new CheckIssue("ERROR", "R001", "开始节点检查",
                    null, null, "流程缺少开始节点"));
        } else if (count > 1) {
            issues.add(new CheckIssue("ERROR", "R001", "开始节点检查",
                    null, null, "流程存在多个开始节点（共 " + count + " 个）"));
        }
    }

    // ── 规则：不允许存在孤立节点（没有任何路由连接） ────────────────────────
    private void checkOrphanNodes(FlowData flow, List<CheckIssue> issues) {
        Set<String> connected = flow.lines.stream()
                .flatMap(l -> Set.of(l.source, l.target).stream())
                .collect(Collectors.toSet());
        for (NodeInfo node : flow.nodes) {
            if (!connected.contains(node.nid)) {
                issues.add(new CheckIssue("WARN", "R003", "孤立节点检查",
                        node.nid, node.label,
                        "节点「" + node.label + "」未连接任何路由线，可能是多余节点"));
            }
        }
    }

    // ── 规则：过程节点必须配置处理人 ────────────────────────────────────────
    private void checkProcessNodeUser(FlowData flow, List<CheckIssue> issues) {
        for (NodeInfo node : flow.nodes) {
            if (!"P".equals(node.nodeType)) continue;
            boolean empty = node.nodeUser == null || node.nodeUser.isBlank();
            if (empty) {
                issues.add(new CheckIssue("ERROR", "R004", "处理人配置检查",
                        node.nid, node.label,
                        "节点「" + node.label + "」未配置任何处理人"));
            }
        }
    }

    // ── 规则：只有开始节点、结束节点、人员为"流程发起者"的节点允许 noUserJump="0" ──
    private void checkNoUserJump(FlowData flow, List<CheckIssue> issues) {
        for (NodeInfo node : flow.nodes) {
            if (!"0".equals(node.noUserJump)) continue;
            boolean isStartOrEnd = "S".equals(node.nodeType) || "E".equals(node.nodeType);
            boolean isInitiator  = node.convertLabel != null && node.convertLabel.contains("流程发起者");
            if (!isStartOrEnd && !isInitiator) {
                issues.add(new CheckIssue("ERROR", "R006", "无人跳过配置检查",
                        node.nid, node.label,
                        "节点「" + node.label + "」的无人跳过配置不合规，仅开始/结束节点或流程发起者节点允许此配置"));
            }
        }
    }

    // ── 规则：所有过程节点应配置消息通知，不允许为空 ────────────────────────
    private void checkProcessNodeNotice(FlowData flow, List<CheckIssue> issues) {
        for (NodeInfo node : flow.nodes) {
            if (!"P".equals(node.nodeType)) continue;
            boolean empty = node.noticeType == null || node.noticeType.isBlank();
            if (empty) {
                issues.add(new CheckIssue("WARN", "R007", "消息通知配置检查",
                        node.nid, node.label,
                        "节点「" + node.label + "」未配置消息通知"));
            }
        }
    }
}
