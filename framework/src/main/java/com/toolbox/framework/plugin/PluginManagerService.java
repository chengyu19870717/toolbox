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
import java.io.InputStream;
import java.nio.file.*;
import java.util.*;
import java.util.jar.JarFile;
import java.util.jar.Manifest;

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

        // 读取每个 jar 的 Plugin-Id，为每个 ID 只保留最新修改的 jar 加载
        // 不依赖文件删除（Windows 下旧进程可能锁文件），完全规避重复插件问题
        Collection<Path> toLoad = selectLatestPlugins(pluginsDir);

        pf4jManager = new DefaultPluginManager(pluginsDir) {
            @Override
            public void loadPlugins() {
                // 不自动扫描目录，由外部显式指定要加载的 jar
            }
        };

        for (Path jar : toLoad) {
            try {
                pf4jManager.loadPlugin(jar);
            } catch (Exception e) {
                log.error("加载插件失败，已跳过: {} - {}", jar.getFileName(), e.getMessage());
            }
        }
        pf4jManager.startPlugins();

        for (PluginWrapper wrapper : pf4jManager.getStartedPlugins()) {
            initPluginContext(wrapper, wrapper.getPluginId());
        }

        log.info("PluginManager initialized, {} plugins loaded", pf4jManager.getStartedPlugins().size());
    }

    /**
     * 扫描 pluginsDir 下所有 jar，读取 MANIFEST.MF 里的 Plugin-Id。
     * 同一 Plugin-Id 出现多个 jar 时，只保留 lastModified 最大的那个。
     * 不尝试删除任何文件，对 Windows 文件锁友好。
     */
    private Collection<Path> selectLatestPlugins(Path pluginsDir) throws IOException {
        Map<String, Path> latestByPluginId = new LinkedHashMap<>();
        Map<String, Long> latestModified = new LinkedHashMap<>();

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(pluginsDir, "*.jar")) {
            for (Path jar : stream) {
                String pluginId = readPluginId(jar);
                if (pluginId == null) {
                    // 没有 Plugin-Id 的 jar 直接跳过
                    log.warn("跳过无 Plugin-Id 的 jar: {}", jar.getFileName());
                    continue;
                }
                long modified = Files.getLastModifiedTime(jar).toMillis();
                if (!latestByPluginId.containsKey(pluginId) || modified > latestModified.get(pluginId)) {
                    if (latestByPluginId.containsKey(pluginId)) {
                        log.warn("发现重复插件 [{}]，忽略旧版本: {}，保留: {}",
                                pluginId, latestByPluginId.get(pluginId).getFileName(), jar.getFileName());
                    }
                    latestByPluginId.put(pluginId, jar);
                    latestModified.put(pluginId, modified);
                } else {
                    log.warn("发现重复插件 [{}]，忽略旧版本: {}，保留: {}",
                            pluginId, jar.getFileName(), latestByPluginId.get(pluginId).getFileName());
                }
            }
        }
        return latestByPluginId.values();
    }

    /** 从 jar 的 MANIFEST.MF 读取 Plugin-Id，读取失败返回 null */
    private String readPluginId(Path jar) {
        try (JarFile jf = new JarFile(jar.toFile())) {
            Manifest mf = jf.getManifest();
            if (mf != null) {
                String id = mf.getMainAttributes().getValue("Plugin-Id");
                if (id != null && !id.isBlank()) return id.trim();
            }
            // 兼容 plugin.properties 格式
            var entry = jf.getEntry("plugin.properties");
            if (entry != null) {
                try (InputStream in = jf.getInputStream(entry)) {
                    Properties props = new Properties();
                    props.load(in);
                    String id = props.getProperty("plugin.id");
                    if (id != null && !id.isBlank()) return id.trim();
                }
            }
        } catch (IOException e) {
            log.warn("读取插件元数据失败: {}", jar.getFileName(), e);
        }
        return null;
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

            Plugin plugin = wrapper.getPlugin();
            if (plugin instanceof ToolBoxPlugin tbPlugin) {
                tbPlugin.init(context);
            }

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
