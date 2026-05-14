// ============================================================
// 3. JwtUtil Unit Tests
// ============================================================
import spock.lang.Specification
import org.junit.jupiter.api.Tag
import java.nio.charset.StandardCharsets
import java.time.Instant
import java.util.Date
import com.toolbox.framework.config.ToolBoxProperties
import com.toolbox.framework.user.User
import com.toolbox.framework.security.JwtUtil
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.Claims
@Tag("unit")
@Tag("security")
class JwtUtilTest extends Specification {

    private JwtUtil jwtUtil
    private ToolBoxProperties props


    def setup() {
        props = Mock(ToolBoxProperties)
        props.getJwtSecret() >> "this-is-a-very-long-secret-key-for-jwt-signing-must-be-256bits"
        props.getJwtExpirationSeconds() >> 3600

        jwtUtil = new JwtUtil(props)
    }

    void "generate should create valid JWT token"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        user.setCreatedAt(Instant.now())

        when:
        def token = jwtUtil.generate(user)

        then:
        token != null
        token.length() > 0
        // JWT has 3 parts separated by dots
        def parts = token.split("\\.")
        assert parts.length == 3
    }

    void "parse should extract username from token"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        user.setCreatedAt(Instant.now())

        when:
        def token = jwtUtil.generate(user)
        def claims = jwtUtil.parse(token)

        then:
        claims != null
        claims.getSubject() == "alice"
        claims.get("username", String) == "alice"
    }

    void "parse should extract role from token"() {
        given:
        def user = new User("bob", "\$2a\$10\$hash", User.Role.ADMIN)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        user.setCreatedAt(Instant.now())

        when:
        def token = jwtUtil.generate(user)
        def claims = jwtUtil.parse(token)

        then:
        claims != null
        claims.get("role", String) == "ADMIN"
    }

    void "isTokenExpired should return false for new token"() {
        given:
        def user = new User("alice", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        user.setCreatedAt(Instant.now())

        when:
        def token = jwtUtil.generate(user)
        def claims = jwtUtil.parse(token)
        def expired = jwtUtil.isTokenExpired(claims)

        then:
        expired == false
    }

    void "parse should throw JwtException for invalid token"() {
        given:
        def invalidToken = "not.a.valid.jwt.token"

        when:
        jwtUtil.parse(invalidToken)

        then:
        def ex = thrown(JwtException)
        ex.getMessage() != null
    }

    void "parse should throw JwtException for expired token"() {
        given:
        // Create a token that is already expired
        def secretKey = Keys.hmacShaKeyFor("this-is-a-very-long-secret-key-for-jwt-signing-must-be-256bits".getBytes(StandardCharsets.UTF_8))
        def expiredTime = Date.from(Instant.now().minusSeconds(7200))

        def expiredToken = Jwts.builder()
            .setSubject("alice")
            .claim("username", "alice")
            .claim("role", "USER")
            .setExpiration(expiredTime)
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact()

        when:
        jwtUtil.parse(expiredToken)

        then:
        def ex = thrown(JwtException)
        ex.getMessage().contains("expired")
    }

    void "generate should include role claim"() {
        given:
        def user = new User("charlie", "\$2a\$10\$hash", User.Role.USER)
        user.setEnabled(true)
        user.setMustChangePassword(false)
        user.setCreatedAt(Instant.now())

        when:
        def token = jwtUtil.generate(user)
        def claims = jwtUtil.parse(token)

        then:
        claims != null
        claims.get("role", String) == "USER"
    }
}
