package com.toolbox.plugin.datamodel;

import com.toolbox.api.exception.ValidationException;
import com.toolbox.api.plugin.PluginContext;
import com.toolbox.api.plugin.ToolExtension;
import com.toolbox.api.plugin.handler.SyncHandler;
import org.pf4j.Extension;

import java.util.Map;

@Extension
public class DataModelExtension implements ToolExtension {

    private ModelStore store;

    @Override public String getId()          { return "data-model-main"; }
    @Override public String getName()        { return "表结构管理"; }
    @Override public String getDescription() { return "维护数据表、表字段及表间字段关联关系，支持导入 SQL 建表语句"; }
    @Override public String getCategory()    { return "数据管理"; }
    @Override public String getIcon()        { return "mdi-table-cog"; }

    @Override
    public void init(PluginContext context) {
        this.store = new ModelStore(context.getDataDir(), context.getLogger());
    }

    @Override
    public SyncHandler getSyncHandler() {
        return (action, params) -> switch (action) {
            // 表
            case "listTables"     -> Map.of("tables", store.listTables());
            case "saveTable"      -> Map.of("id", store.saveTable(params));
            case "deleteTable"    -> { store.deleteTable(require(params, "id")); yield Map.of("ok", true); }
            // 字段
            case "listColumns"    -> Map.of("columns", store.listColumns(require(params, "table_id")));
            case "saveColumn"     -> Map.of("id", store.saveColumn(params));
            case "deleteColumn"   -> { store.deleteColumn(require(params, "id")); yield Map.of("ok", true); }
            // 关联关系
            case "listRelations"  -> Map.of("relations", store.listRelations(opt(params, "table_id")));
            case "saveRelation"   -> { store.saveRelation(params); yield Map.of("ok", true); }
            case "deleteRelation" -> { store.deleteRelation(require(params, "id")); yield Map.of("ok", true); }
            case "inferRelations" -> store.inferRelations();
            // 导入导出
            case "importSql"      -> store.importSql(require(params, "sql"), truthy(params.get("overwrite")));
            case "exportDdl"      -> Map.of("ddl", store.exportDdl());
            default -> throw new ValidationException("Unknown action: " + action);
        };
    }

    private String require(Map<String, Object> params, String key) {
        Object v = params.get(key);
        if (v == null || v.toString().isBlank()) throw new ValidationException(key + " 不能为空");
        return v.toString().trim();
    }

    private String opt(Map<String, Object> params, String key) {
        Object v = params.get(key);
        return v == null ? null : v.toString().trim();
    }

    private boolean truthy(Object v) {
        return v != null && ("1".equals(v.toString()) || Boolean.parseBoolean(v.toString()));
    }
}
