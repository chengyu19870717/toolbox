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
            if (!isProcessNode(node)) continue;
            boolean empty = node.nodeUser == null || node.nodeUser.isBlank();
            if (empty) {
                issues.add(new CheckIssue("ERROR", "R004", "处理人配置检查",
                        node.nid, node.label,
                        "节点「" + node.label + "」未配置任何处理人"));
            }
        }
    }

    // ── 规则：过程节点（非首节点、非终节点）必须将无人员跳过配置为"是" ──────────
    private void checkNoUserJump(FlowData flow, List<CheckIssue> issues) {
        // 首节点：路由线来源为开始节点(S)的目标节点
        Set<String> startIds = flow.nodes.stream()
                .filter(n -> "S".equals(n.nodeType)).map(n -> n.nid).collect(Collectors.toSet());
        Set<String> firstNodeIds = flow.lines.stream()
                .filter(l -> startIds.contains(l.source)).map(l -> l.target).collect(Collectors.toSet());
        // 终节点：路由线目标为结束节点(E)的来源节点
        Set<String> endIds = flow.nodes.stream()
                .filter(n -> "E".equals(n.nodeType)).map(n -> n.nid).collect(Collectors.toSet());
        Set<String> terminalNodeIds = flow.lines.stream()
                .filter(l -> endIds.contains(l.target)).map(l -> l.source).collect(Collectors.toSet());

        for (NodeInfo node : flow.nodes) {
            if (!isProcessNode(node)) continue;
            if (firstNodeIds.contains(node.nid) || terminalNodeIds.contains(node.nid)) continue;
            if (!"1".equals(node.noUserJump)) {
                issues.add(new CheckIssue("ERROR", "R006", "无人跳过配置检查",
                        node.nid, node.label,
                        "节点「" + node.label + "」未将无人员跳过配置为\"是\"（该节点为中间过程节点，非首节点/终节点）"));
            }
        }
    }

    // ── 规则：所有过程节点应配置消息通知，不允许为空 ────────────────────────
    private void checkProcessNodeNotice(FlowData flow, List<CheckIssue> issues) {
        for (NodeInfo node : flow.nodes) {
            if (!isProcessNode(node)) continue;
            boolean empty = node.noticeType == null || node.noticeType.isBlank() || "0".equals(node.noticeType);
            if (empty) {
                issues.add(new CheckIssue("WARN", "R007", "消息通知配置检查",
                        node.nid, node.label,
                        "节点「" + node.label + "」未配置消息通知"));
            }
        }
    }

    private boolean isProcessNode(NodeInfo node) {
        return "0".equals(node.nodeType) || "P".equals(node.nodeType);
    }
}
