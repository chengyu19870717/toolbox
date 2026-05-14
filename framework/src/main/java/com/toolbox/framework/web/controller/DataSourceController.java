package com.toolbox.framework.web.controller;

import com.toolbox.api.datasource.QueryRequest;
import com.toolbox.api.datasource.QueryResult;
import com.toolbox.api.datasource.TestResult;
import com.toolbox.framework.datasource.DataSourceConfig;
import com.toolbox.framework.datasource.DataSourceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/datasources")
public class DataSourceController {

    private final DataSourceService service;

    public DataSourceController(DataSourceService service) {
        this.service = service;
    }

    @GetMapping
    public List<DataSourceConfig> list() {
        return service.listConfigs().stream().map(this::maskPassword).toList();
    }

    @GetMapping("/{id}")
    public DataSourceConfig get(@PathVariable String id) {
        return maskPassword(service.getConfig(id));
    }

    @PostMapping
    public DataSourceConfig create(@RequestBody DataSourceConfig cfg) {
        return maskPassword(service.create(cfg));
    }

    @PutMapping("/{id}")
    public DataSourceConfig update(@PathVariable String id, @RequestBody DataSourceConfig cfg) {
        return maskPassword(service.update(id, cfg));
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable String id) {
        service.delete(id);
        return Map.of("message", "已删除");
    }

    @PostMapping("/{id}/test")
    public TestResult testConnection(@PathVariable String id) {
        return service.testConnection(id);
    }

    /** 用表单原始配置测试（新增/编辑时尚未保存，密码为空则从已保存配置补全） */
    @PostMapping("/test")
    public TestResult testConnectionRaw(@RequestBody DataSourceConfig cfg) {
        if (cfg.getPassword() == null || cfg.getPassword().isBlank()) {
            if (cfg.getId() != null && !cfg.getId().isBlank()) {
                try {
                    DataSourceConfig saved = service.getConfig(cfg.getId());
                    cfg.setPassword(saved.getPassword());
                } catch (Exception ignored) {}
            }
        }
        return service.testConnectionRaw(cfg);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/query")
    public QueryResult queryById(@PathVariable String id, @RequestBody QueryRequest req) {
        QueryRequest actual = QueryRequest.builder()
                .dataSourceId(id)
                .sql(req.getSql())
                .params(req.getParams())
                .timeoutSeconds(req.getTimeoutSeconds())
                .maxRows(req.getMaxRows())
                .fetchMode(req.getFetchMode())
                .build();
        return service.query(actual);
    }

    /** 插件通过 ToolboxAPI 调用此端点，dataSourceId 在请求体中 */
    @PostMapping("/query")
    public QueryResult query(@RequestBody QueryRequest req) {
        return service.query(req);
    }

    private DataSourceConfig maskPassword(DataSourceConfig cfg) {
        DataSourceConfig view = cfg.shallowCopy();
        view.setPassword(null);
        return view;
    }
}
