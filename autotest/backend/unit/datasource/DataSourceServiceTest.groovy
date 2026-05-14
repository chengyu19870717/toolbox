// ============================================================
// 4. DataSourceService Unit Tests
// ============================================================
import spock.lang.Specification
import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.io.TempDir
import java.nio.file.Path
import com.toolbox.framework.config.ToolBoxProperties
import com.toolbox.framework.datasource.DataSourceService
import com.toolbox.framework.datasource.DataSourceConfig
import com.toolbox.api.exception.ValidationException
@Tag("unit")
@Tag("datasource")
class DataSourceServiceTest extends Specification {

    private DataSourceService service
    private ToolBoxProperties props
    @TempDir Path tempDir


    def setup() {
        props = Mock(ToolBoxProperties)
        props.getDataSourceConfigPath() >> tempDir.resolve("datasources.json").toString()
        service = new DataSourceService(props)
    }

    // --- create ---

    void "create should add new datasource"() {
        given:
        service.init()
        def cfg = new DataSourceConfig()
        cfg.setName("test-db")
        cfg.setType("MYSQL")
        cfg.setHost("localhost")
        cfg.setPort(3306)
        cfg.setDatabase("testdb")
        cfg.setUsername("root")
        cfg.setPassword("secret")

        when:
        def result = service.create(cfg)

        then:
        result != null
        result.getName() == "test-db"
        result.getId() != null
        result.getVersion() == 1

        and:
        def all = service.listConfigs()
        all.size() == 1
        all[0].getName() == "test-db"
    }

    void "create should throw for duplicate name"() {
        given:
        service.init()
        def cfg1 = new DataSourceConfig()
        cfg1.setName("test-db")
        cfg1.setType("MYSQL")
        cfg1.setHost("localhost")
        cfg1.setPort(3306)
        cfg1.setDatabase("testdb")
        cfg1.setUsername("root")
        cfg1.setPassword("secret")
        service.create(cfg1)

        def cfg2 = new DataSourceConfig()
        cfg2.setName("test-db")
        cfg2.setType("POSTGRESQL")
        cfg2.setHost("localhost")
        cfg2.setPort(5432)
        cfg2.setDatabase("olddb")
        cfg2.setUsername("postgres")
        cfg2.setPassword("secret")

        when:
        service.create(cfg2)

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("already exists")
    }

    // --- update ---

    void "update should update existing datasource"() {
        given:
        service.init()
        def cfg = new DataSourceConfig()
        cfg.setName("test-db")
        cfg.setType("MYSQL")
        cfg.setHost("localhost")
        cfg.setPort(3306)
        cfg.setDatabase("testdb")
        cfg.setUsername("root")
        cfg.setPassword("secret")
        def created = service.create(cfg)
        def id = created.getId()
        def version = created.getVersion()

        def incoming = new DataSourceConfig()
        incoming.setName("test-db-updated")
        incoming.setType("MYSQL")
        incoming.setHost("127.0.0.1")
        incoming.setPort(3307)
        incoming.setDatabase("updatedb")
        incoming.setUsername("admin")
        incoming.setPassword("newsecret")
        incoming.setVersion(version)

        when:
        def result = service.update(id, incoming)

        then:
        result != null
        result.getName() == "test-db-updated"
        result.getHost() == "127.0.0.1"
        result.getPort() == 3307
        result.getVersion() == version + 1
    }

    void "update should throw for version conflict"() {
        given:
        service.init()
        def cfg = new DataSourceConfig()
        cfg.setName("test-db")
        cfg.setType("MYSQL")
        cfg.setHost("localhost")
        cfg.setPort(3306)
        cfg.setDatabase("testdb")
        cfg.setUsername("root")
        cfg.setPassword("secret")
        def created = service.create(cfg)
        def id = created.getId()
        def staleVersion = created.getVersion()

        // Simulate another update changing the version
        def firstUpdate = new DataSourceConfig()
        firstUpdate.setName("test-db")
        firstUpdate.setType("MYSQL")
        firstUpdate.setHost("localhost")
        firstUpdate.setPort(3306)
        firstUpdate.setDatabase("testdb")
        firstUpdate.setUsername("root")
        firstUpdate.setPassword("secret")
        firstUpdate.setVersion(staleVersion)
        service.update(id, firstUpdate)

        def incoming = new DataSourceConfig()
        incoming.setName("test-db")
        incoming.setType("MYSQL")
        incoming.setHost("newhost")
        incoming.setPort(3306)
        incoming.setDatabase("testdb")
        incoming.setUsername("root")
        incoming.setPassword("secret")
        incoming.setVersion(staleVersion) // stale version

        when:
        service.update(id, incoming)

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("version")
    }

    void "update should throw for duplicate name (excluding self)"() {
        given:
        service.init()

        def cfg1 = new DataSourceConfig()
        cfg1.setName("db-alpha")
        cfg1.setType("MYSQL")
        cfg1.setHost("host1")
        cfg1.setPort(3306)
        cfg1.setDatabase("db1")
        cfg1.setUsername("root")
        cfg1.setPassword("secret")
        def created1 = service.create(cfg1)
        def id1 = created1.getId()
        def ver1 = created1.getVersion()

        def cfg2 = new DataSourceConfig()
        cfg2.setName("db-beta")
        cfg2.setType("POSTGRESQL")
        cfg2.setHost("host2")
        cfg2.setPort(5432)
        cfg2.setDatabase("db2")
        cfg2.setUsername("postgres")
        cfg2.setPassword("secret")
        def created2 = service.create(cfg2)
        def id2 = created2.getId()
        def ver2 = created2.getVersion()

        // Try to rename db-beta to db-alpha (which already exists)
        def incoming = new DataSourceConfig()
        incoming.setName("db-alpha")
        incoming.setType("POSTGRESQL")
        incoming.setHost("host2")
        incoming.setPort(5432)
        incoming.setDatabase("db2")
        incoming.setUsername("postgres")
        incoming.setPassword("secret")
        incoming.setVersion(ver2)

        when:
        service.update(id2, incoming)

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("already exists")
    }

    // --- delete ---

    void "delete should remove datasource"() {
        given:
        service.init()
        def cfg = new DataSourceConfig()
        cfg.setName("test-db")
        cfg.setType("MYSQL")
        cfg.setHost("localhost")
        cfg.setPort(3306)
        cfg.setDatabase("testdb")
        cfg.setUsername("root")
        cfg.setPassword("secret")
        def created = service.create(cfg)
        def id = created.getId()

        when:
        service.delete(id)

        then:
        def all = service.listConfigs()
        all.size() == 0
    }

    void "delete should throw for non-existent datasource"() {
        given:
        service.init()

        when:
        service.delete("non-existent-id")

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("not found")
    }

    // --- getConfig ---

    void "getConfig should return config when exists"() {
        given:
        service.init()
        def cfg = new DataSourceConfig()
        cfg.setName("test-db")
        cfg.setType("MYSQL")
        cfg.setHost("localhost")
        cfg.setPort(3306)
        cfg.setDatabase("testdb")
        cfg.setUsername("root")
        cfg.setPassword("secret")
        def created = service.create(cfg)
        def id = created.getId()

        when:
        def result = service.getConfig(id)

        then:
        result != null
        result.getName() == "test-db"
        result.getId() == id
    }

    void "getConfig should throw for non-existent config"() {
        given:
        service.init()

        when:
        service.getConfig("non-existent-id")

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("not found")
    }

    // --- listConfigs ---

    void "listConfigs should return all configs"() {
        given:
        service.init()

        def cfg1 = new DataSourceConfig()
        cfg1.setName("db-mysql")
        cfg1.setType("MYSQL")
        cfg1.setHost("localhost")
        cfg1.setPort(3306)
        cfg1.setDatabase("mydb")
        cfg1.setUsername("root")
        cfg1.setPassword("secret")

        def cfg2 = new DataSourceConfig()
        cfg2.setName("db-postgres")
        cfg2.setType("POSTGRESQL")
        cfg2.setHost("localhost")
        cfg2.setPort(5432)
        cfg2.setDatabase("pgdb")
        cfg2.setUsername("postgres")
        cfg2.setPassword("secret")

        service.create(cfg1)
        service.create(cfg2)

        when:
        def result = service.listConfigs()

        then:
        result.size() == 2
        def names = result*.getName()
        assert names.contains("db-mysql")
        assert names.contains("db-postgres")
    }
}
