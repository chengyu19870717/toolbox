package com.toolbox.framework.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/", "/index.html", "/assets/**", "/plugins/**").permitAll()
                // SPA 路由由前端 Vue Router 接管，服务端只需放行，鉴权由前端页面自行处理
                .requestMatchers("/tools/**", "/settings/**", "/login").permitAll()
                // 插件前端 bundle 用浏览器原生 import() 加载，无法携带 Authorization header
                .requestMatchers("/api/plugins/*/frontend.js", "/api/plugins/*/style.css").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(e -> e
                .authenticationEntryPoint((req, res, ex) -> res.sendError(401, "Unauthorized"))
                .accessDeniedHandler((req, res, ex) -> res.sendError(403, "Forbidden"))
            );
        return http.build();
    }
}
