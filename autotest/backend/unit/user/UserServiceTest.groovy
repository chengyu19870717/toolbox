// ============================================================
// 2. UserService Unit Tests
// ============================================================
import spock.lang.Specification
import org.junit.jupiter.api.Tag
import java.time.Instant
import com.toolbox.framework.user.User
import com.toolbox.framework.user.UserStore
import com.toolbox.framework.user.UserService
import com.toolbox.api.exception.ValidationException
@Tag("unit")
@Tag("user")
class UserServiceTest extends Specification {

    private UserStore store
    private UserService service


    def setup() {
        store = Mock(UserStore)
        service = new UserService(store)
    }

    // --- login ---

    void "login should return user when credentials are correct"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        user.setCreatedAt(Instant.now())

        store.findByUsername("alice") >> Optional.of(user)
        store.checkPassword(user, "password123") >> true

        when:
        def result = service.login("alice", "password123")

        then:
        result != null
        result.getUsername() == "alice"
    }

    void "login should throw ValidationException for wrong password"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        store.findByUsername("alice") >> Optional.of(user)
        store.checkPassword(user, "wrongpass") >> false

        when:
        service.login("alice", "wrongpass")

        then:
        thrown(ValidationException)
    }

    void "login should throw ValidationException for disabled user"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(false)
        store.findByUsername("alice") >> Optional.of(user)

        when:
        service.login("alice", "password123")

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("disabled")
    }

    void "login should throw ValidationException for non-existent user"() {
        given:
        store.findByUsername("nobody") >> Optional.empty()

        when:
        service.login("nobody", "password123")

        then:
        thrown(ValidationException)
    }

    // --- changePassword ---

    void "changePassword should succeed with valid old and new password"() {
        given:
        def user = new User("alice", "\$2a\$10\$oldhash", User.Role.USER)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        store.findByUsername("alice") >> Optional.of(user)
        store.checkPassword(user, "oldpass") >> true
        store.save(_) >> null

        when:
        service.changePassword("alice", "oldpass", "newpass123")

        then:
        1 * store.save({ it.getPasswordHash() != "oldhash" })
    }

    void "changePassword should throw for short new password"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        store.findByUsername("alice") >> Optional.of(user)
        store.checkPassword(user, "oldpass") >> true

        when:
        service.changePassword("alice", "oldpass", "short")

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("6")
    }

    void "changePassword should throw for wrong old password"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        store.findByUsername("alice") >> Optional.of(user)
        store.checkPassword(user, "wrongold") >> false

        when:
        service.changePassword("alice", "wrongold", "newpass123")

        then:
        thrown(ValidationException)
    }

    // --- resetPassword ---

    void "resetPassword should set mustChangePassword to true"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        store.findByUsername("alice") >> Optional.of(user)
        store.save(_) >> null

        when:
        service.resetPassword("alice", "resetpass123")

        then:
        1 * store.save({ it.isMustChangePassword() == true })
    }

    // --- createUser ---

    void "createUser should create new user with mustChangePassword true"() {
        given:
        store.findByUsername("bob") >> Optional.empty()
        store.save(_) >> null

        when:
        def result = service.createUser("bob", "pass123", User.Role.USER)

        then:
        result != null
        result.getUsername() == "bob"
        result.isMustChangePassword()
        1 * store.save({ it.getUsername() == "bob" && it.isMustChangePassword() })
    }

    void "createUser should throw for duplicate username"() {
        given:
        store.findByUsername("bob") >> Optional.of(new User("bob", "\$2a\$10\$hash", User.Role.USER))

        when:
        service.createUser("bob", "pass123", User.Role.USER)

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("already exists")
    }

    void "createUser should throw for short password"() {
        given:
        store.findByUsername("bob") >> Optional.empty()

        when:
        service.createUser("bob", "short", User.Role.USER)

        then:
        thrown(ValidationException)
    }

    // --- delete ---

    void "delete should throw when trying to delete self"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        store.findByUsername("alice") >> Optional.of(user)

        when:
        service.delete("alice", "alice")

        then:
        def ex = thrown(ValidationException)
        ex.getMessage().contains("self")
    }

    void "delete should call store.delete for other user"() {
        given:
        def user = new User("bob", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        store.findByUsername("bob") >> Optional.of(user)

        when:
        service.delete("bob", "alice")

        then:
        1 * store.delete("bob")
    }

    // --- get ---

    void "get should return user when exists"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        store.findByUsername("alice") >> Optional.of(user)

        when:
        def result = service.get("alice")

        then:
        result != null
        result.getUsername() == "alice"
    }

    void "get should throw for non-existent user"() {
        given:
        store.findByUsername("nobody") >> Optional.empty()

        when:
        service.get("nobody")

        then:
        thrown(ValidationException)
    }

    // --- listAll ---

    void "listAll should return all users"() {
        given:
        def alice = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        alice.setEnabled(true)
        def bob = new User("bob", "\$2a\$10\$hash", User.Role.ADMIN)
        bob.setEnabled(true)
        store.findAll() >> [alice, bob]

        when:
        def result = service.listAll()

        then:
        result.size() == 2
        result*.getUsername() == ["alice", "bob"]
    }

    // --- setEnabled ---

    void "setEnabled should toggle user enabled state"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        store.findByUsername("alice") >> Optional.of(user)
        store.save(_) >> null

        when:
        service.setEnabled("alice", false)

        then:
        1 * store.save({ !it.isEnabled() })
    }
}
