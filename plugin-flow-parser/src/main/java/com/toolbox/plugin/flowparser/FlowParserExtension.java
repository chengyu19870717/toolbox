package com.toolbox.plugin.flowparser;

import com.toolbox.api.datasource.QueryRequest;
import com.toolbox.api.datasource.QueryResult;
import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.PluginContext;
import com.toolbox.api.plugin.ToolExtension;
import com.toolbox.api.plugin.handler.SyncHandler;
import com.toolbox.plugin.flowparser.model.FlowData;
import org.pf4j.Extension;

import java.util.List;
import java.util.Map;

@Extension
public class FlowParserExtension implements ToolExtension {

    private PluginContext ctx;
    private final FlowXmlParser    parser  = new FlowXmlParser();
    private final FlowCheckService checker = new FlowCheckService();

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
            case "parseXml"    -> handleParseXml(params);
            case "parseSql"    -> handleParseSql(params);
            case "queryRawXml" -> handleQueryRawXml(params);
            case "checkFlow"   -> handleCheckFlow(params);
            default -> throw new ValidationException("Unknown action: " + action);
        };
    }

    // ── actions ──────────────────────────────────────────────────────────

    private Object handleParseXml(Map<String, Object> params) throws Exception {
        String xmlContent = requireString(params, "xmlContent");
        List<FlowData> flows = parser.parse(xmlContent);
        if (flows.isEmpty()) throw new ValidationException("未解析到有效的流程定义，请检查XML格式");
        return Map.of("flows", flows);
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

        // 每行 XML 单独解析，合并为流程列表
        final int finalColIdx = colIdx;
        List<FlowData> flows = new java.util.ArrayList<>();
        for (Object[] row : result.getRows()) {
            Object val = row[finalColIdx];
            if (val == null || val.toString().isBlank()) continue;
            try {
                flows.addAll(parser.parse(val.toString()));
            } catch (Exception e) {
                ctx.getLogger().warn("行解析失败，跳过: {}", e.getMessage());
            }
        }

        if (flows.isEmpty()) throw new ValidationException("SQL执行成功但未解析到有效流程，请确认XML字段内容");
        return Map.of("flows", flows);
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
            if (val != null && !val.toString().isBlank()) xmlList.add(val.toString());
        }
        if (xmlList.isEmpty()) throw new ValidationException("SQL执行成功但未查询到XML内容");
        return Map.of("xmlList", xmlList);
    }

    private Object handleCheckFlow(Map<String, Object> params) throws Exception {
        String xmlContent = requireString(params, "xmlContent");
        List<FlowData> flows = parser.parse(xmlContent);
        if (flows.isEmpty()) throw new ValidationException("未解析到有效的流程定义");
        // 对每个流程分别检查，汇总结果
        var allIssues = new java.util.ArrayList<>();
        for (FlowData flow : flows) {
            var issues = checker.check(flow);
            String flowName = flow.workflow != null
                    ? (flow.workflow.flowName != null ? flow.workflow.flowName : flow.workflow.flowId)
                    : "未知流程";
            for (var issue : issues) {
                issue.message = flows.size() > 1 ? "[" + flowName + "] " + issue.message : issue.message;
            }
            allIssues.addAll(issues);
        }
        return Map.of("issues", allIssues, "total", allIssues.size());
    }

    // ── utils ─────────────────────────────────────────────────────────────

    private String requireString(Map<String, Object> params, String key) {
        Object v = params.get(key);
        if (v == null || v.toString().isBlank()) throw new ValidationException(key + " 不能为空");
        return v.toString().trim();
    }
}
