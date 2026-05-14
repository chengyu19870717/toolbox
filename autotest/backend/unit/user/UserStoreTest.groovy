// ============================================================
// 1. UserStore Unit Tests
// ============================================================
import spock.lang.Specification
import spock.lang.Unroll
import spock.lang.Stepwise
import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.io.TempDir
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.nio.file.Path
import java.nio.file.Paths
import java.time.Instant
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.toolbox.framework.config.ToolBoxProperties
import com.toolbox.framework.user.User
import com.toolbox.framework.user.UserStore
import com.toolbox.framework.user.UserService
import com.toolbox.framework.security.JwtUtil
import com.toolbox.framework.datasource.DataSourceService
import com.toolbox.framework.datasource.DataSourceConfig
import com.toolbox.framework.web.advice.GlobalExceptionHandler
import com.toolbox.api.exception.ValidationException
import javax.crypto.SecretKey
import javax.crypto.spec.SecretKeySpec
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.Claims
@Tag("unit")
@Tag("user")
class UserStoreTest extends Specification {

    private Path tempDir
    private UserStore store

    @TempDir Path tempDir


    def setup() {
        def props = Mock(ToolBoxProperties) {
            getPaths() >> Mock(ToolBoxProperties.Paths) {
                getConfigDir() >> tempDir.toString()
            }
        }
        store = new UserStore(props)
    }


    def cleanup() {
        store = null
    }

    void "init should create default admin when users.json does not exist"() {
        def usersFile = Paths.get(tempDir.toString(), "users.json")
        assert !usersFile.exists()

        store.init()

        assert usersFile.exists()
        def users = store.findAll()
        assert users.size() == 1
        def admin = users[0]
        assert admin.getUsername() == "admin"
        assert admin.getRole() == User.Role.ADMIN
        assert admin.isEnabled()
        assert admin.isMustChangePassword()
        assert admin.getCreatedAt() != null
    }

    void "init should load existing users from file"() {
        def usersFile = Paths.get(tempDir.toString(), "users.json")
        def mapper = new ObjectMapper().registerModule(new JavaTimeModule())
        def admin = new User()
        admin.setUsername("admin")
        admin.setPasswordHash(new BCryptPasswordEncoder().encode("admin123"))
        admin.setRole(User.Role.ADMIN)
        admin.setEnabled(true)
        admin.setMustChangePassword(false)
        admin.setCreatedAt(Instant.now())
        mapper.writerWithDefaultPrettyPrinter().writeValue(usersFile.toFile(), [admin])

        store.init()

        def users = store.findAll()
        assert users.size() == 1
        assert users[0].getUsername() == "admin"
    }

    void "findByUsername should return user when exists"() {
        store.init()
        def result = store.findByUsername("admin")
        assert result.isPresent()
        assert result.get().getUsername() == "admin"
    }

    void "findByUsername should return empty when not exists"() {
        store.init()
        def result = store.findByUsername("nonexistent")
        assert !result.isPresent()
    }

    void "save should update existing user"() {
        store.init()
        def user = store.findByUsername("admin").get()
        user.setUsername("newadmin")
        store.save(user)
        def updated = store.findByUsername("newadmin")
        assert updated.isPresent()
        assert !store.findByUsername("admin").isPresent()
    }

    void "delete should remove user"() {
        store.init()
        store.delete("admin")
        assert !store.findByUsername("admin").isPresent()
        assert store.findAll().isEmpty()
    }

    void "checkPassword should return true for correct password"() {
        store.init()
        def user = store.findByUsername("admin").get()
        assert store.checkPassword(user, "admin123") == true
    }

    void "checkPassword should return false for wrong password"() {
        store.init()
        def user = store.findByUsername("admin").get()
        assert store.checkPassword(user, "wrongpassword") == false
    }

    void "encodePassword should return non-null hash"() {
        def hash = store.encodePassword("test123")
        assert hash != null
        assert hash.length() > 20
    }
}
