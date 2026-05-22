package com.toolbox.framework.plugin;

import com.toolbox.api.datasource.DataSourceManager;
import com.toolbox.api.notification.NotificationService;
import com.toolbox.api.plugin.ToolBoxPlugin;
import com.toolbox.api.plugin.ToolExtension;
import com.toolbox.api.task.TaskManager;
import com.toolbox.framework.config.ToolBoxProperties;
import com.toolbox.framework.file.FileService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.pf4j.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class PluginManagerService {

    private static final Logger log = LoggerFactory.getLogger(PluginManagerService.class);

    private final ToolBoxProperties props;
    private final DataSourceManager dataSourceManager;
    private final TaskManager taskManager;
    private final NotificationService notificationService;
    private final FileService fileService;

    private PluginManager pf4jManager;
    private final Map<String, List<ToolExtension>> extensionsByPlugin = new LinkedHashMap<>();

    public PluginManagerService(ToolBoxProperties props,
                                 DataSourceManager dataSourceManager,
                                 TaskManager taskManager,
                                 NotificationService notificationService,
                                 FileService fileService) {
        this.props = props;
        this.dataSourceManager = dataSourceManager;
        this.taskManager = taskManager;
        this.notificationService = notificationService;
        this.fileService = fileService;
    }

    @PostConstruct
    public void init() throws Exception {
        Path pluginsDir = Path.of(props.getPaths().getPluginsDir());
        Files.createDirectories(pluginsDir);

        deduplicatePlugins(pluginsDir);

        pf4jManager = new DefaultPluginManager(pluginsDir);
        pf4jManager.loadPlugins();
        pf4jManager.startPlugins();

        for (PluginWrapper wrapper : pf4jManager.getStartedPlugins()) {
            String pluginId = wrapper.getPluginId();
            initPluginContext(wrapper, pluginId);
        }

        log.info("PluginManager initialized, {} plugins loaded", pf4jManager.getStartedPlugins().size());
    }

    /**
     * 扫描插件目录，当同一 pluginId 存在多个 jar 时，只保留版本号最新的那个，删除旧版本。
     * 版本号从文件名中按 -{version}.jar 格式解析，无法解析时按 lastModified 时间排序。
     */
    private void deduplicatePlugins(Path pluginsDir) throws IOException {
        Pattern versionPattern = Pattern.compile("^(.+?)-(\\d+\\.\\d+\\.\\d+(?:[._-]\\S+?)?)\\.jar$");
        Map<String, List<Path>> byBaseName = new LinkedHashMap<>();

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(pluginsDir, "*.jar")) {
            for (Path jar : stream) {
                String filename = jar.getFileName().toString();
                Matcher m = versionPattern.matcher(filename);
                String key = m.matches() ? m.group(1) : filename;
                byBaseName.computeIfAbsent(key, k -> new ArrayList<>()).add(jar);
            }
        }

        for (Map.Entry<String, List<Path>> entry : byBaseName.entrySet()) {
            List<Path> jars = entry.getValue();
            if (jars.size() <= 1) continue;

            // 按文件名排序（版本号字典序，对 semver 基本可靠）
            jars.sort(Comparator.comparing(p -> p.getFileName().toString()));
            List<Path> toDelete = jars.subList(0, jars.size() - 1);
            for (Path old : toDelete) {
                log.warn("检测到重复插件，删除旧版本: {}", old.getFileName());
                Files.deleteIfExists(old);
            }
        }
    }

    @PreDestroy
    public void destroy() {
        if (pf4jManager != null) pf4jManager.stopPlugins();
    }

    private void initPluginContext(PluginWrapper wrapper, String pluginId) {
        try {
            Path dataDir = Path.of(props.getPaths().getPluginsDataDir(), pluginId);
            Files.createDirectories(dataDir);

            PluginContextImpl context = new PluginContextImpl(
                    pluginId, dataDir, dataSourceManager, taskManager,
                    notificationService, fileService);

            // 注入 context 到插件入口
            Plugin plugin = wrapper.getPlugin();
            if (plugin instanceof ToolBoxPlugin tbPlugin) {
                tbPlugin.init(context);
            }

            // 初始化所有扩展点
            List<ToolExtension> extensions = pf4jManager.getExtensions(ToolExtension.class, pluginId);
            for (ToolExtension ext : extensions) {
                ext.init(context);
                log.info("  Tool registered: [{}] {} ({})", ext.getCategory(), ext.getName(), ext.getId());
            }
            extensionsByPlugin.put(pluginId, extensions);

        } catch (Exception e) {
            log.error("Failed to initialize plugin {}", pluginId, e);
        }
    }

    public List<PluginDescriptor> listPlugins() {
        return pf4jManager.getStartedPlugins().stream()
                .map(PluginWrapper::getDescriptor)
                .toList();
    }

    public List<ToolExtension> getAllExtensions() {
        return extensionsByPlugin.values().stream()
                .flatMap(Collection::stream)
                .toList();
    }

    public Optional<ToolExtension> findExtension(String toolId) {
        return getAllExtensions().stream()
                .filter(e -> e.getId().equals(toolId))
                .findFirst();
    }

    /** 获取指定工具所属插件的 ClassLoader，用于加载插件 jar 内资源 */
    public Optional<ClassLoader> getPluginClassLoader(String toolId) {
        for (Map.Entry<String, List<ToolExtension>> entry : extensionsByPlugin.entrySet()) {
            boolean hasToolId = entry.getValue().stream().anyMatch(e -> e.getId().equals(toolId));
            if (hasToolId) {
                PluginWrapper wrapper = pf4jManager.getPlugin(entry.getKey());
                if (wrapper != null) return Optional.of(wrapper.getPluginClassLoader());
            }
        }
        return Optional.empty();
    }
}
