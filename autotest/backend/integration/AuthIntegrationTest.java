package integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import com.toolbox.framework.user.UserService;
import com.toolbox.framework.user.UserStore;

import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private UserStore userStore;

    private String adminToken;

    @BeforeEach
    void setUp() {
        // Spring creates fresh beans per test with RANDOM_PORT, no reset needed
    }

    @Test
    @DisplayName("login with valid admin credentials should return token")
    void loginWithValidAdminCredentials_shouldReturnToken() throws Exception {
        String requestBody = objectMapper.writeValueAsString(
                new LoginRequest("admin", "admin123"));

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.username").value("admin"))
                .andExpect(jsonPath("$.role").value("ADMIN"))
                .andReturn();

        String responseBody = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        adminToken = jsonNode.get("token").asText();
    }

    @Test
    @DisplayName("login with invalid credentials should return 400")
    void loginWithInvalidCredentials_shouldReturn400() throws Exception {
        String requestBody = objectMapper.writeValueAsString(
                new LoginRequest("admin", "wrongpassword"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("login with missing fields should return 400")
    void loginWithMissingFields_shouldReturn400() throws Exception {
        String requestBody = objectMapper.writeValueAsString(new LoginRequest());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @DisplayName("changePassword should succeed with correct old password")
    void changePassword_shouldSucceedWithCorrectOldPassword() throws Exception {
        // Step 1: login to get token
        String loginBody = objectMapper.writeValueAsString(
                new LoginRequest("admin", "admin123"));

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String token = jsonNode.get("token").asText();

        // Step 2: change password
        String changePasswordBody = objectMapper.writeValueAsString(
                new ChangePasswordRequest("admin123", "newPassword123"));

        mockMvc.perform(post("/api/auth/change-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + token)
                        .content(changePasswordBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("changePassword should fail with wrong old password")
    void changePassword_shouldFailWithWrongOldPassword() throws Exception {
        // Step 1: login to get token
        String loginBody = objectMapper.writeValueAsString(
                new LoginRequest("admin", "admin123"));

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String token = jsonNode.get("token").asText();

        // Step 2: change password with wrong old password
        String changePasswordBody = objectMapper.writeValueAsString(
                new ChangePasswordRequest("wrongpassword", "newPassword123"));

        mockMvc.perform(post("/api/auth/change-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + token)
                        .content(changePasswordBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @DisplayName("me should return current user info")
    void me_shouldReturnCurrentUserInfo() throws Exception {
        // Step 1: login to get token
        String loginBody = objectMapper.writeValueAsString(
                new LoginRequest("admin", "admin123"));

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String token = jsonNode.get("token").asText();

        // Step 2: get current user info
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("admin"))
                .andExpect(jsonPath("$.role").value("ADMIN"));
    }

    @Test
    @DisplayName("me should return 401 without token")
    void me_shouldReturn401WithoutToken() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("login should return mustChangePassword=true for first login")
    void loginShouldReturnMustChangePasswordForFirstLogin() throws Exception {
        String requestBody = objectMapper.writeValueAsString(
                new LoginRequest("admin", "admin123"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mustChangePassword").value(true));
    }

    // --- Request/Response DTOs ---

    static class LoginRequest {
        public String username;
        public String password;

        public LoginRequest() {}

        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }

    static class ChangePasswordRequest {
        public String oldPassword;
        public String newPassword;

        public ChangePasswordRequest() {}

        public ChangePasswordRequest(String oldPassword, String newPassword) {
            this.oldPassword = oldPassword;
            this.newPassword = newPassword;
        }
    }
}
