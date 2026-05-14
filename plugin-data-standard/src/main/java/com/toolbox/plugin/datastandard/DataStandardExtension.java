package com.toolbox.plugin.datastandard;

import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.PluginContext;
import com.toolbox.api.plugin.ToolExtension;
import com.toolbox.api.plugin.handler.SyncHandler;
import org.pf4j.Extension;

import java.util.Map;

@Extension
public class DataStandardExtension implements ToolExtension {

    private PluginContext ctx;
    private DatabaseManager db;

    @Override public String getId()          { return "data-standard-main"; }
    @Override public String getName()        { return "数据标准"; }
    @Override public String getDescription() { return "管理字根、标准字段、接口和规则的数据标准体系"; }
    @Override public String getCategory()    { return "数据管理"; }
    @Override public String getIcon()        { return "mdi-database-cog"; }

    @Override
    public void init(PluginContext context) {
        this.ctx = context;
        this.db  = new DatabaseManager(context.getDataDir(), context.getLogger());
    }

    @Override
    public SyncHandler getSyncHandler() {
        return (action, params) -> switch (action) {
            // 字根
            case "listRoots"       -> Map.of("roots", db.listRoots());
            case "saveRoot"        -> { db.saveRoot(params, isNew(params)); yield Map.of("ok", true); }
            case "deleteRoot"      -> { db.deleteRoot(require(params, "id")); yield Map.of("ok", true); }
            case "exportRootsCsv"  -> Map.of("csv", db.exportRootsCsv());
            case "importRootsCsv"  -> db.importRootsCsv(require(params, "csv"));
            // 字段
            case "listFields"      -> Map.of("fields", db.listFields());
            case "saveField"       -> { db.saveField(params, isNew(params)); yield Map.of("ok", true); }
            case "deleteField"     -> { db.deleteField(require(params, "id")); yield Map.of("ok", true); }
            case "exportFieldsCsv" -> Map.of("csv", db.exportFieldsCsv());
            case "importFieldsCsv" -> db.importFieldsCsv(require(params, "csv"));
            // 接口
            case "listInterfaces"  -> Map.of("interfaces", db.listInterfaces());
            case "saveInterface"   -> { db.saveInterface(params, isNew(params)); yield Map.of("ok", true); }
            case "deleteInterface" -> { db.deleteInterface(require(params, "id")); yield Map.of("ok", true); }
            // 规则
            case "listRules"       -> Map.of("rules", db.listRules());
            case "saveRule"        -> { db.saveRule(params, isNew(params)); yield Map.of("ok", true); }
            case "deleteRule"      -> { db.deleteRule(require(params, "id")); yield Map.of("ok", true); }
            default -> throw new ValidationException("Unknown action: " + action);
        };
    }

    private boolean isNew(Map<String, Object> params) {
        Object v = params.get("_isNew");
        return v != null && Boolean.parseBoolean(v.toString());
    }

    private String require(Map<String, Object> params, String key) {
        Object v = params.get(key);
        if (v == null || v.toString().isBlank()) throw new ValidationException(key + " 不能为空");
        return v.toString().trim();
    }
}
