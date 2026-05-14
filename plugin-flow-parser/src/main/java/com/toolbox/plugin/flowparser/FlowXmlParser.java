package com.toolbox.plugin.flowparser;

import com.toolbox.plugin.flowparser.model.*;
import org.w3c.dom.*;
import org.xml.sax.InputSource;

import javax.xml.parsers.*;
import java.io.StringReader;
import java.util.*;
import java.util.regex.*;

public class FlowXmlParser {

    private static final DocumentBuilderFactory DBF = DocumentBuilderFactory.newInstance();

    static {
        try {
            DBF.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        } catch (Exception ignored) {}
    }

    /** 入口：将原始内容（可能是多流程拼接）拆分解析，返回所有 FlowData */
    public List<FlowData> parse(String xmlContent) throws Exception {
        if (xmlContent == null || xmlContent.isBlank()) return List.of();

        String cleaned = preprocess(xmlContent);

        // 提取所有 <mxGraphModel...>...</mxGraphModel> 片段
        List<String> fragments = splitGraphModels(cleaned);
        if (fragments.isEmpty()) return List.of();

        List<FlowData> results = new ArrayList<>();
        for (String fragment : fragments) {
            FlowData data = parseOne(fragment);
            if (data != null) results.add(data);
        }
        return results;
    }

    private String preprocess(String xml) {
        return xml.strip()
                .replace("\r\n", "\n")
                .replace("\r", "\n");
    }

    private List<String> splitGraphModels(String xml) {
        List<String> list = new ArrayList<>();
        Pattern p = Pattern.compile("<mxGraphModel[^>]*>.*?</mxGraphModel>", Pattern.DOTALL);
        Matcher m = p.matcher(xml);
        while (m.find()) list.add(m.group());
        return list;
    }

    private FlowData parseOne(String xml) throws Exception {
        DocumentBuilder db = DBF.newDocumentBuilder();
        Document doc = db.parse(new InputSource(new StringReader(xml)));
        doc.getDocumentElement().normalize();

        FlowData data = new FlowData();
        data.nodes = new ArrayList<>();
        data.lines = new ArrayList<>();

        Element root = doc.getDocumentElement(); // mxGraphModel
        NodeList rootChildren = root.getChildNodes();

        for (int i = 0; i < rootChildren.getLength(); i++) {
            org.w3c.dom.Node n = rootChildren.item(i);
            if (n.getNodeType() != org.w3c.dom.Node.ELEMENT_NODE) continue;
            Element el = (Element) n;
            if (el.getTagName().equals("root")) {
                parseRoot(el, data);
                break;
            }
        }
        return data.workflow != null ? data : null;
    }

    private void parseRoot(Element rootEl, FlowData data) {
        NodeList children = rootEl.getChildNodes();
        // nid → label 映射，用于路由线节点名称解析
        Map<String, String> nidToLabel = new HashMap<>();

        // 第一遍：收集所有节点名称
        for (int i = 0; i < children.getLength(); i++) {
            org.w3c.dom.Node n = children.item(i);
            if (n.getNodeType() != org.w3c.dom.Node.ELEMENT_NODE) continue;
            Element el = (Element) n;
            if ("mxCell".equals(el.getTagName())) {
                String id = el.getAttribute("id");
                String value = el.getAttribute("value");
                if (!id.isBlank()) nidToLabel.put(id, value);

                // 找子节点 Node
                NodeList sub = el.getChildNodes();
                for (int j = 0; j < sub.getLength(); j++) {
                    org.w3c.dom.Node sn = sub.item(j);
                    if (sn.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE
                            && "Node".equals(((Element) sn).getTagName())) {
                        String nid = ((Element) sn).getAttribute("nid");
                        String label = ((Element) sn).getAttribute("label");
                        if (!nid.isBlank()) nidToLabel.put(nid, label);
                    }
                }
            }
        }

        // 第二遍：解析实体
        for (int i = 0; i < children.getLength(); i++) {
            org.w3c.dom.Node n = children.item(i);
            if (n.getNodeType() != org.w3c.dom.Node.ELEMENT_NODE) continue;
            Element el = (Element) n;
            switch (el.getTagName()) {
                case "Workflow" -> data.workflow = parseWorkflow(el);
                case "mxCell"   -> parseMxCell(el, data, nidToLabel);
            }
        }
    }

    private WorkflowInfo parseWorkflow(Element el) {
        WorkflowInfo w = new WorkflowInfo();
        w.flowId             = attr(el, "flowId");
        w.flowSign           = attr(el, "flowSign");
        w.title              = attr(el, "title");
        w.flowName           = attr(el, "flowName");
        w.flowAdmin          = attr(el, "flowAdmin");
        w.flowVersion        = attr(el, "flowVersion");
        w.orgId              = attr(el, "orgId");
        w.systemId           = attr(el, "systemId");
        w.startTime          = attr(el, "startTime");
        w.updateTime         = attr(el, "updateTime");
        w.startCondition     = attr(el, "startCondition");
        w.hungUp             = attr(el, "hungUp");
        w.cancel             = attr(el, "cancel");
        w.isContinueBeanId   = attr(el, "isContinueBeanId");
        return w;
    }

    private void parseMxCell(Element el, FlowData data, Map<String, String> nidToLabel) {
        NodeList sub = el.getChildNodes();
        for (int i = 0; i < sub.getLength(); i++) {
            org.w3c.dom.Node n = sub.item(i);
            if (n.getNodeType() != org.w3c.dom.Node.ELEMENT_NODE) continue;
            Element child = (Element) n;
            switch (child.getTagName()) {
                case "Node" -> data.nodes.add(parseNode(child));
                case "Line" -> data.lines.add(parseLine(child, el, nidToLabel));
            }
        }
    }

    private NodeInfo parseNode(Element el) {
        NodeInfo node = new NodeInfo();
        node.nid              = attr(el, "nid");
        node.label            = attr(el, "label");
        node.nodeType         = attr(el, "nodeType");
        node.nodeSign         = attr(el, "nodeSign");
        node.nodeLevel        = attr(el, "nodeLevel");
        node.nodeUser         = attr(el, "nodeUser");
        node.convertLabel     = attr(el, "convertLabel");
        node.opUsersType      = attr(el, "opUsersType");
        node.computeType      = attr(el, "computeType");
        node.strategyBeanId   = attr(el, "strategyBeanId");
        node.autoSubmit       = attr(el, "autoSubmit");
        node.noUserJump       = attr(el, "noUserJump");
        node.returnBack       = attr(el, "returnBack");
        node.tackBack         = attr(el, "tackBack");
        node.retract          = attr(el, "retract");
        node.change           = attr(el, "change");
        node.assist           = attr(el, "assist");
        node.addSign          = attr(el, "addSign");
        node.jump             = attr(el, "jump");
        node.urged            = attr(el, "urged");
        node.refuse           = attr(el, "refuse");
        node.gather           = attr(el, "gather");
        node.conditionSelect  = attr(el, "conditionSelect");
        node.noticeType       = attr(el, "noticeType");
        node.bizBeanId        = attr(el, "bizBeanId");
        node.asynDo           = attr(el, "asynDo");
        node.beforeSubmit     = attr(el, "beforeSubmit");
        node.nodeScript       = attr(el, "nodeScript");
        node.nodeScriptTxt    = attr(el, "nodeScriptTxt");
        node.creditAuth       = attr(el, "creditAuth");
        node.creditAuthAboutData = attr(el, "creditAuthAboutData");
        node.subFlow          = attr(el, "subFlow");
        node.handleType       = attr(el, "handleType");
        return node;
    }

    private LineInfo parseLine(Element lineEl, Element mxCellEl, Map<String, String> nidToLabel) {
        LineInfo line = new LineInfo();
        line.nid                = attr(lineEl, "nid");
        line.label              = attr(lineEl, "label");
        line.isContinueBeanId   = attr(lineEl, "isContinueBeanId");
        line.routeScriptTxt     = attr(lineEl, "routeScriptTxt");
        line.customColor        = attr(lineEl, "customColor");

        // source/target 优先从 Line 元素读，fallback mxCell
        String src = attr(lineEl, "source");
        String tgt = attr(lineEl, "target");
        if (src.isBlank()) src = attr(mxCellEl, "source");
        if (tgt.isBlank()) tgt = attr(mxCellEl, "target");
        line.source = src;
        line.target = tgt;

        // 解析 Array[nodeScriptConfig] 子节点
        line.conditions = parseConditions(lineEl);

        return line;
    }

    private List<Map<String, String>> parseConditions(Element lineEl) {
        List<Map<String, String>> list = new ArrayList<>();
        NodeList arrays = lineEl.getElementsByTagName("Array");
        for (int i = 0; i < arrays.getLength(); i++) {
            Element arr = (Element) arrays.item(i);
            if (!"nodeScriptConfig".equals(arr.getAttribute("as"))) continue;
            NodeList objects = arr.getElementsByTagName("Object");
            for (int j = 0; j < objects.getLength(); j++) {
                Element obj = (Element) objects.item(j);
                Map<String, String> cond = new LinkedHashMap<>();
                cond.put("logic",    attr(obj, "logic"));
                cond.put("varName",  attr(obj, "varName"));
                cond.put("relation", attr(obj, "relation"));
                cond.put("value",    attr(obj, "value"));
                cond.put("varType",  attr(obj, "varType"));
                cond.put("varId",    attr(obj, "varId"));
                list.add(cond);
            }
        }
        return list;
    }

    private String attr(Element el, String name) {
        String v = el.getAttribute(name);
        return v == null ? "" : v;
    }
}
