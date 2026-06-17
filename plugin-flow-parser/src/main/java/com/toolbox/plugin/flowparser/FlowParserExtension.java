package com.toolbox.plugin.flowparser;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toolbox.api.datasource.QueryRequest;
import com.toolbox.api.datasource.QueryResult;
import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.PluginContext;
import com.toolbox.api.plugin.ToolExtension;
import com.toolbox.api.plugin.handler.SyncHandler;
import com.toolbox.plugin.flowparser.model.FlowData;
import org.pf4j.Extension;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@Extension
public class FlowParserExtension implements ToolExtension {

    private PluginContext ctx;
    private final FlowXmlParser    parser  = new FlowXmlParser();
    private final FlowCheckService checker = new FlowCheckService();
    private final ObjectMapper     mapper  = new ObjectMapper();

    @Override public String getId()          { return "flow-parser-main"; }
    @Override public String getName()        { return "流程解析工具"; }
    @Override public String getDescription() { return "解析审批流程XML，格式化展示节点、路由及流程图"; }
    @Override public String getCategory()    { return "运维工具"; }
    @Override public String getIcon()        { return "mdi-file-tree"; }

    @Override
    public void init(PluginContext context) {
        this.ctx = context;
    }

    @Override
    public SyncHandler getSyncHandler() {
        return (action, params) -> switch (action) {
            case "parseXml"     -> handleParseXml(params);
            case "parseXmlList" -> handleParseXmlList(params);
            case "parseSql"     -> handleParseSql(params);
            case "queryRawXml"  -> handleQueryRawXml(params);
            case "checkFlow"        -> handleCheckFlow(params);
            case "checkAllParsed"   -> handleCheckAllParsed(params);
            case "queryLogs"    -> handleQueryLogs(params);
            default -> throw new ValidationException("Unknown action: " + action);
        };
    }

    // ── actions ──────────────────────────────────────────────────────────

    private Object handleParseXml(Map<String, Object> params) throws Exception {
        String xmlContent = requireString(params, "xmlContent");
        FlowXmlParser.ParseResult result = parser.parseWithLog(xmlContent);
        result.errors().forEach(e -> ctx.getLogger().warn("片段#{} 解析失败: {}", e.fragmentIndex(), e.reason()));
        List<Map<String, Object>> parseErrors = result.errors().stream()
            .map(e -> Map.<String, Object>of("fragment", e.fragmentIndex(), "error", e.reason(), "snippet", e.snippet()))
            .toList();
        return Map.of("flows", result.flows(), "parseErrors", parseErrors, "fragmentCount", result.fragmentCount());
    }

    @SuppressWarnings("unchecked")
    private Object handleParseXmlList(Map<String, Object> params) throws Exception {
        List<String> xmlList = (List<String>) params.get("xmlList");
        if (xmlList == null || xmlList.isEmpty()) throw new ValidationException("xmlList 不能为空");

        List<FlowData> flows = new java.util.ArrayList<>();
        List<Map<String, Object>> parseErrors = new java.util.ArrayList<>();
        for (int i = 0; i < xmlList.size(); i++) {
            String xml = xmlList.get(i);
            if (xml == null || xml.isBlank()) continue;
            try {
                List<FlowData> parsed = parser.parse(xml);
                if (parsed.isEmpty()) {
                    parseErrors.add(Map.of("row", i + 1, "error", "未从该行数据中解析到有效的 mxGraphModel 节点"));
                } else {
                    flows.addAll(parsed);
                }
            } catch (Exception e) {
                ctx.getLogger().warn("第 {} 行解析失败: {}", i + 1, e.getMessage());
                parseErrors.add(Map.of("row", i + 1, "error", e.getMessage()));
            }
        }
        if (flows.isEmpty()) {
            String detail = parseErrors.isEmpty() ? "请确认XML列内容"
                : "首条错误：" + parseErrors.get(0).get("error");
            throw new ValidationException("CSV解析完成但未找到有效流程，" + detail);
        }
        return Map.of("flows", flows, "parseErrors", parseErrors);
    }

    private Object handleParseSql(Map<String, Object> params) throws Exception {
        String dataSourceId = requireString(params, "dataSourceId");
        String sql          = requireString(params, "sql");
        String xmlField     = requireString(params, "xmlField");

        QueryRequest req = QueryRequest.builder()
                .dataSourceId(dataSourceId)
                .sql(sql)
                .maxRows(1000)
                .timeoutSeconds(30)
                .build();

        QueryResult result = ctx.getDataSourceManager().query(req);

        // 找目标列索引
        int colIdx = -1;
        for (int i = 0; i < result.getColumns().size(); i++) {
            if (result.getColumns().get(i).getName().equalsIgnoreCase(xmlField)) {
                colIdx = i;
                break;
            }
        }
        if (colIdx < 0) {
            throw new ValidationException("查询结果中未找到列：" + xmlField
                    + "，可用列：" + result.getColumns().stream()
                        .map(c -> c.getName()).toList());
        }

        // 每行 XML 单独解析，合并为流程列表，收集失败行信息
        final int finalColIdx = colIdx;
        List<FlowData> flows = new java.util.ArrayList<>();
        List<Map<String, Object>> parseErrors = new java.util.ArrayList<>();
        List<Object[]> rows = result.getRows();
        for (int rowIdx = 0; rowIdx < rows.size(); rowIdx++) {
            Object val = rows.get(rowIdx)[finalColIdx];
            if (val == null || val.toString().isBlank()) continue;
            try {
                List<FlowData> parsed = parser.parse(val.toString());
                if (parsed.isEmpty()) {
                    parseErrors.add(Map.of(
                        "row", rowIdx + 1,
                        "error", "未从该行数据中解析到有效的 mxGraphModel 节点，请确认 XML 字段内容是否完整"
                    ));
                } else {
                    flows.addAll(parsed);
                }
            } catch (Exception e) {
                ctx.getLogger().warn("第 {} 行解析失败: {}", rowIdx + 1, e.getMessage());
                parseErrors.add(Map.of("row", rowIdx + 1, "error", e.getMessage()));
            }
        }

        if (flows.isEmpty()) {
            String detail = parseErrors.isEmpty() ? "请确认XML字段内容"
                : "首条错误：" + parseErrors.get(0).get("error");
            throw new ValidationException("SQL执行成功但未解析到有效流程，" + detail);
        }
        return Map.of("flows", flows, "parseErrors", parseErrors);
    }

    private Object handleQueryRawXml(Map<String, Object> params) throws Exception {
        String dataSourceId = requireString(params, "dataSourceId");
        String sql          = requireString(params, "sql");
        String xmlField     = requireString(params, "xmlField");

        QueryRequest req = QueryRequest.builder()
                .dataSourceId(dataSourceId).sql(sql).maxRows(1000).timeoutSeconds(30).build();

        QueryResult result = ctx.getDataSourceManager().query(req);

        int colIdx = -1;
        for (int i = 0; i < result.getColumns().size(); i++) {
            if (result.getColumns().get(i).getName().equalsIgnoreCase(xmlField)) { colIdx = i; break; }
        }
        if (colIdx < 0) {
            throw new ValidationException("查询结果中未找到列：" + xmlField
                    + "，可用列：" + result.getColumns().stream().map(c -> c.getName()).toList());
        }

        final int finalColIdx = colIdx;
        List<String> xmlList = new java.util.ArrayList<>();
        for (Object[] row : result.getRows()) {
            Object val = row[finalColIdx];
            if (val != null && !val.toString().isBlank()) {
                xmlList.add(val.toString().replace("\r\n", "\n").replace("\r", "\n"));
            }
        }
        if (xmlList.isEmpty()) throw new ValidationException("SQL执行成功但未查询到XML内容");
        return Map.of("xmlList", xmlList);
    }

    private Object handleCheckFlow(Map<String, Object> params) throws Exception {
        String xmlContent = requireString(params, "xmlContent");
        List<FlowData> flows = parser.parse(xmlContent);
        if (flows.isEmpty()) throw new ValidationException("未解析到有效的流程定义");
        return buildCheckResult(flows);
    }

    @SuppressWarnings("unchecked")
    private Object handleCheckAllParsed(Map<String, Object> params) throws Exception {
        Object raw = params.get("flows");
        if (raw == null) throw new ValidationException("flows 不能为空");
        List<FlowData> flows = mapper.convertValue(raw, new TypeReference<List<FlowData>>() {});
        if (flows.isEmpty()) throw new ValidationException("未找到有效的流程定义");
        return buildCheckResult(flows);
    }

    private Map<String, Object> buildCheckResult(List<FlowData> flows) {
        var allIssues = new java.util.ArrayList<>();
        for (FlowData flow : flows) {
            String fId   = flow.workflow != null && flow.workflow.flowId   != null ? flow.workflow.flowId   : "";
            String fName = flow.workflow != null && flow.workflow.flowName != null ? flow.workflow.flowName : fId;
            var issues = checker.check(flow);
            for (var issue : issues) {
                issue.flowId   = fId;
                issue.flowName = fName;
            }
            allIssues.addAll(issues);
        }
        return Map.of("issues", allIssues, "total", allIssues.size(), "flowCount", flows.size());
    }

    private Object handleQueryLogs(Map<String, Object> params) throws IOException {
        int lines = params.containsKey("lines") ? Integer.parseInt(params.get("lines").toString()) : 200;
        Path logFile = Path.of("logs", "app.log");
        if (!Files.exists(logFile)) return Map.of("lines", List.of(), "file", logFile.toString());
        List<String> all = Files.readAllLines(logFile, StandardCharsets.UTF_8);
        int from = Math.max(0, all.size() - lines);
        return Map.of("lines", all.subList(from, all.size()), "file", logFile.toString(), "total", all.size());
    }

    // ── utils ─────────────────────────────────────────────────────────────

    private String requireString(Map<String, Object> params, String key) {
        Object v = params.get(key);
        if (v == null || v.toString().isBlank()) throw new ValidationException(key + " 不能为空");
        return v.toString().trim();
    }
}
