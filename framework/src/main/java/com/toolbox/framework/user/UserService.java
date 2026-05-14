package com.toolbox.framework.user;

import com.toolbox.api.exception.ValidationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserService {

    private final UserStore store;

    public UserService(UserStore store) {
        this.store = store;
    }

    public User login(String username, String password) {
        User user = store.findByUsername(username)
                .orElseThrow(() -> new ValidationException("用户名或密码错误"));
        if (!user.isEnabled()) throw new ValidationException("账号已被禁用");
        if (!store.checkPassword(user, password)) throw new ValidationException("用户名或密码错误");

        user.setLastLoginAt(Instant.now());
        store.save(user);
        return user;
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = store.findByUsername(username)
                .orElseThrow(() -> new ValidationException("用户不存在"));
        if (!store.checkPassword(user, oldPassword)) throw new ValidationException("原密码不正确");
        if (newPassword.length() < 6) throw new ValidationException("新密码至少 6 位");

        user.setPasswordHash(store.encodePassword(newPassword));
        user.setMustChangePassword(false);
        store.save(user);
    }

    public void resetPassword(String username, String newPassword) {
        User user = store.findByUsername(username)
                .orElseThrow(() -> new ValidationException("用户不存在"));
        user.setPasswordHash(store.encodePassword(newPassword));
        user.setMustChangePassword(true);
        store.save(user);
    }

    public User createUser(String username, String password, User.Role role) {
        if (store.findByUsername(username).isPresent()) throw new ValidationException("用户名已存在");
        if (password.length() < 6) throw new ValidationException("密码至少 6 位");

        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(store.encodePassword(password));
        user.setRole(role);
        user.setEnabled(true);
        user.setMustChangePassword(true);
        user.setCreatedAt(Instant.now());
        store.save(user);
        return user;
    }

    public void setEnabled(String username, boolean enabled) {
        User user = store.findByUsername(username)
                .orElseThrow(() -> new ValidationException("用户不存在"));
        user.setEnabled(enabled);
        store.save(user);
    }

    public void delete(String username, String operatorUsername) {
        if (username.equals(operatorUsername)) throw new ValidationException("不能删除自己");
        store.delete(username);
    }

    public List<User> listAll() {
        return store.findAll();
    }

    public User get(String username) {
        return store.findByUsername(username)
                .orElseThrow(() -> new ValidationException("用户不存在"));
    }
}
