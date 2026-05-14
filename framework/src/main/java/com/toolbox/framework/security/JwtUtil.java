package com.toolbox.framework.security;

import com.toolbox.framework.config.ToolBoxProperties;
import com.toolbox.framework.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String CLAIM_ROLE = "role";

    private final SecretKey key;
    private final long expireMs;

    public JwtUtil(ToolBoxProperties props) {
        String secret = props.getSecurity().getJwtSecret();
        if (secret == null || secret.length() < 32) {
            throw new IllegalStateException(
                "JWT_SECRET 未配置或不安全，请设置环境变量 JWT_SECRET（至少32位随机字符串）");
        }
        if (secret.startsWith("dev-only")) {
            LoggerFactory.getLogger(JwtUtil.class).warn(
                "警告：正在使用开发用默认 JWT_SECRET，请在生产环境设置 JWT_SECRET 环境变量");
        }
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expireMs = props.getSecurity().getJwtExpireHours() * 3600_000L;
    }

    public String generate(User user) {
        return Jwts.builder()
                .subject(user.getUsername())
                .claim(CLAIM_ROLE, user.getRole().name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expireMs))
                .signWith(key)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload();
    }

    public String getUsername(Claims claims) {
        return claims.getSubject();
    }

    public User.Role getRole(Claims claims) {
        return User.Role.valueOf(claims.get(CLAIM_ROLE, String.class));
    }
}
