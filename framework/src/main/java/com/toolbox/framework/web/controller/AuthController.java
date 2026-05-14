package com.toolbox.framework.web.controller;

import com.toolbox.api.exception.ValidationException;
import com.toolbox.framework.security.JwtUtil;
import com.toolbox.framework.user.User;
import com.toolbox.framework.user.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        if (username == null || password == null) throw new ValidationException("用户名和密码不能为空");

        User user = userService.login(username, password);
        String token = jwtUtil.generate(user);

        return Map.of(
                "token", token,
                "username", user.getUsername(),
                "role", user.getRole().name(),
                "mustChangePassword", user.isMustChangePassword()
        );
    }

    @PostMapping("/change-password")
    public Map<String, String> changePassword(
            @AuthenticationPrincipal String username,
            @RequestBody Map<String, String> body) {
        userService.changePassword(username, body.get("oldPassword"), body.get("newPassword"));
        return Map.of("message", "密码修改成功");
    }

    @GetMapping("/me")
    public Map<String, Object> me(@AuthenticationPrincipal String username) {
        User user = userService.get(username);
        return Map.of(
                "username", user.getUsername(),
                "role", user.getRole().name(),
                "mustChangePassword", user.isMustChangePassword()
        );
    }
}
