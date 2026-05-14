package com.toolbox.framework.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {
        // SSE 连接（EventSource）无法携带自定义 header，从 query param 降级读取
        String header = req.getHeader("Authorization");
        String token = null;
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        } else if (req.getParameter("token") != null) {
            token = req.getParameter("token");
        }
        if (token != null) {
            try {
                Claims claims = jwtUtil.parse(token);
                String username = jwtUtil.getUsername(claims);
                String role = claims.get("role", String.class);
                var auth = new UsernamePasswordAuthenticationToken(
                        username, null,
                        List.of(new SimpleGrantedAuthority("ROLE_" + role)));
                SecurityContextHolder.getContext().setAuthentication(auth);
                // 把 username 放进 request attribute，方便 ThreadLocal 获取
                req.setAttribute("currentUser", username);
            } catch (JwtException ignored) {}
        }
        chain.doFilter(req, res);
    }
}
