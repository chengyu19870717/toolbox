package com.toolbox.framework.web.controller;

import com.toolbox.api.exception.ValidationException;
import com.toolbox.framework.user.User;
import com.toolbox.framework.user.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<Map<String, Object>> list() {
        return userService.listAll().stream().map(this::toVO).toList();
    }

    @PostMapping
    public Map<String, Object> create(@RequestBody Map<String, String> body) {
        String role = body.getOrDefault("role", "USER");
        User user = userService.createUser(body.get("username"), body.get("password"),
                User.Role.valueOf(role));
        return toVO(user);
    }

    @PostMapping("/{username}/reset-password")
    public Map<String, String> resetPassword(@PathVariable String username,
                                              @RequestBody Map<String, String> body) {
        String newPwd = body.get("newPassword");
        if (newPwd == null || newPwd.length() < 6) throw new ValidationException("新密码至少 6 位");
        userService.resetPassword(username, newPwd);
        return Map.of("message", "密码已重置");
    }

    @PostMapping("/{username}/enable")
    public Map<String, String> enable(@PathVariable String username) {
        userService.setEnabled(username, true);
        return Map.of("message", "已启用");
    }

    @PostMapping("/{username}/disable")
    public Map<String, String> disable(@PathVariable String username) {
        userService.setEnabled(username, false);
        return Map.of("message", "已禁用");
    }

    @DeleteMapping("/{username}")
    public Map<String, String> delete(@PathVariable String username,
                                      @AuthenticationPrincipal String operator) {
        userService.delete(username, operator);
        return Map.of("message", "已删除");
    }

    private Map<String, Object> toVO(User u) {
        return Map.of(
                "username", u.getUsername(),
                "role", u.getRole().name(),
                "enabled", u.isEnabled(),
                "mustChangePassword", u.isMustChangePassword(),
                "createdAt", u.getCreatedAt() != null ? u.getCreatedAt().toString() : "",
                "lastLoginAt", u.getLastLoginAt() != null ? u.getLastLoginAt().toString() : ""
        );
    }
}
