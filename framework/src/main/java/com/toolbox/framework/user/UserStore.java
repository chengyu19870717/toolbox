package com.toolbox.framework.user;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.toolbox.framework.config.ToolBoxProperties;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserStore {

    private static final Logger log = LoggerFactory.getLogger(UserStore.class);

    private final Path usersFile;
    private final ObjectMapper mapper;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private List<User> users = new ArrayList<>();

    public UserStore(ToolBoxProperties props) {
        this.usersFile = Path.of(props.getPaths().getConfigDir(), "users.json");
        this.mapper = new ObjectMapper()
                .registerModule(new JavaTimeModule());
    }

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(usersFile.getParent());
        if (!Files.exists(usersFile)) {
            createDefaultAdmin();
        } else {
            load();
        }
        log.info("UserStore initialized, {} users loaded", users.size());
    }

    public synchronized Optional<User> findByUsername(String username) {
        return users.stream().filter(u -> u.getUsername().equals(username)).findFirst();
    }

    public synchronized List<User> findAll() {
        return List.copyOf(users);
    }

    public synchronized void save(User user) {
        users.removeIf(u -> u.getUsername().equals(user.getUsername()));
        users.add(user);
        flush();
    }

    public synchronized void delete(String username) {
        users.removeIf(u -> u.getUsername().equals(username));
        flush();
    }

    public boolean checkPassword(User user, String rawPassword) {
        return encoder.matches(rawPassword, user.getPasswordHash());
    }

    public String encodePassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    private void createDefaultAdmin() throws IOException {
        User admin = new User();
        admin.setUsername("admin");
        admin.setPasswordHash(encoder.encode("admin123"));
        admin.setRole(User.Role.ADMIN);
        admin.setEnabled(true);
        admin.setMustChangePassword(true);
        admin.setCreatedAt(Instant.now());
        users.add(admin);
        flush();
        log.info("Created default admin user (admin/admin123)");
    }

    private void load() throws IOException {
        users = mapper.readValue(Files.readAllBytes(usersFile), new TypeReference<>() {});
    }

    private void flush() {
        try {
            Path tmp = usersFile.resolveSibling(usersFile.getFileName() + ".tmp");
            mapper.writerWithDefaultPrettyPrinter().writeValue(tmp.toFile(), users);
            Files.move(tmp, usersFile, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Failed to flush users.json", e);
        }
    }
}
