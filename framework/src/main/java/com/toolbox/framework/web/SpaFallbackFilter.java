package com.toolbox.framework.web;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * SPA fallback: 非 /api 且非静态资源的请求一律转发到 index.html，由 Vue Router 接管。
 * 静态资源（有扩展名）和 /api/** 不受影响。
 */
@Component
@Order(1)
public class SpaFallbackFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // 已经是 forward 请求，直接放行，避免循环
        if (request.getAttribute("javax.servlet.forward.request_uri") != null
                || request.getAttribute("jakarta.servlet.forward.request_uri") != null) {
            chain.doFilter(req, res);
            return;
        }

        String uri = request.getRequestURI();
        String ctx = request.getContextPath();
        String path = ctx.isEmpty() ? uri : uri.startsWith(ctx) ? uri.substring(ctx.length()) : uri;

        boolean isApi = path.startsWith("/api/") || path.equals("/api");
        boolean isSse = path.startsWith("/sse/") || path.equals("/sse");
        boolean hasExtension = path.lastIndexOf('.') > path.lastIndexOf('/');

        if (!isApi && !isSse && !hasExtension) {
            request.getRequestDispatcher("/index.html").forward(request, response);
            return;
        }

        chain.doFilter(req, res);
    }
}
