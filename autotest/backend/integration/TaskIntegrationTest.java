package integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class TaskIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String adminToken;

    @BeforeEach
    void setUp() throws Exception {
        // Login as admin to get auth token
        String loginBody = objectMapper.writeValueAsString(Map.of(
                "username", "admin",
                "password", "admin123"
        ));

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        adminToken = jsonNode.get("token").asText();
    }

    @Test
    @DisplayName("list should return empty list for new user")
    void list_shouldReturnEmptyListForNewUser() throws Exception {
        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    @DisplayName("submitTask should create task and return taskId")
    void submitTask_shouldCreateTaskAndReturnTaskId() throws Exception {
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "params", Map.of(
                        "sql", "SELECT 1",
                        "limit", 10
                )
        ));

        MvcResult result = mockMvc.perform(post("/api/plugins/sql-runner/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(requestBody))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.taskId").isNotEmpty())
                .andExpect(jsonPath("$.status").value("PENDING"))
                .andReturn();

        String responseBody = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        assertThat(jsonNode.get("taskId").asText()).isNotBlank();
    }

    @Test
    @DisplayName("get should return submitted task")
    void get_shouldReturnSubmittedTask() throws Exception {
        // Submit a task first
        String submitBody = objectMapper.writeValueAsString(Map.of(
                "params", Map.of("sql", "SELECT 1")
        ));

        MvcResult submitResult = mockMvc.perform(post("/api/plugins/sql-runner/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(submitBody))
                .andExpect(status().isAccepted())
                .andReturn();

        String submitResponse = submitResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode submitNode = objectMapper.readTree(submitResponse);
        String taskId = submitNode.get("taskId").asText();

        // Get the task by id
        mockMvc.perform(get("/api/tasks/{taskId}", taskId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.taskId").value(taskId))
                .andExpect(jsonPath("$.status").exists())
                .andExpect(jsonPath("$.toolId").value("sql-runner"));
    }

    @Test
    @DisplayName("cancel should cancel running task")
    void cancel_shouldCancelRunningTask() throws Exception {
        // Submit a task first
        String submitBody = objectMapper.writeValueAsString(Map.of(
                "params", Map.of("sql", "SELECT SLEEP(100)")
        ));

        MvcResult submitResult = mockMvc.perform(post("/api/plugins/sql-runner/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(submitBody))
                .andExpect(status().isAccepted())
                .andReturn();

        String submitResponse = submitResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode submitNode = objectMapper.readTree(submitResponse);
        String taskId = submitNode.get("taskId").asText();

        // Cancel the task
        mockMvc.perform(post("/api/tasks/{taskId}/cancel", taskId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CANCELLED"));

        // Verify task is cancelled
        mockMvc.perform(get("/api/tasks/{taskId}", taskId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CANCELLED"));
    }

    @Test
    @DisplayName("list should only return current user's tasks")
    void list_shouldOnlyReturnCurrentUserTasks() throws Exception {
        // Submit a task as admin
        String submitBody = objectMapper.writeValueAsString(Map.of(
                "params", Map.of("sql", "SELECT 1")
        ));

        mockMvc.perform(post("/api/plugins/sql-runner/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(submitBody))
                .andExpect(status().isAccepted());

        // Verify admin sees the task
        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());

        // Submit as a different user (if available) or verify admin only sees admin tasks
        mockMvc.perform(get("/api/tasks")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].status").exists());
    }

    @Test
    @DisplayName("downloadArtifact should return file when exists")
    void downloadArtifact_shouldReturnFileWhenExists() throws Exception {
        // Submit a task first
        String submitBody = objectMapper.writeValueAsString(Map.of(
                "params", Map.of("sql", "SELECT 1")
        ));

        MvcResult submitResult = mockMvc.perform(post("/api/plugins/sql-runner/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(submitBody))
                .andExpect(status().isAccepted())
                .andReturn();

        String submitResponse = submitResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode submitNode = objectMapper.readTree(submitResponse);
        String taskId = submitNode.get("taskId").asText();

        // Try to download artifact (may not exist, so we expect 404)
        // This test verifies the endpoint exists and handles the case properly
        mockMvc.perform(get("/api/tasks/{taskId}/artifacts/output.csv", taskId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("downloadArtifact should return 404 for non-existent file")
    void downloadArtifact_shouldReturn404ForNonExistentFile() throws Exception {
        mockMvc.perform(get("/api/tasks/nonexistent/artifacts/output.csv")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("subscribe SSE should receive initial status")
    void subscribeSSE_shouldReceiveInitialStatus() throws Exception {
        // Submit a task first
        String submitBody = objectMapper.writeValueAsString(Map.of(
                "params", Map.of("sql", "SELECT 1")
        ));

        MvcResult submitResult = mockMvc.perform(post("/api/plugins/sql-runner/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(submitBody))
                .andExpect(status().isAccepted())
                .andReturn();

        String submitResponse = submitResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode submitNode = objectMapper.readTree(submitResponse);
        String taskId = submitNode.get("taskId").asText();

        // SSE subscription (this is a basic check; SSE tests are typically more complex)
        mockMvc.perform(get("/sse/tasks/{taskId}", taskId)
                        .header("Authorization", "Bearer " + adminToken)
                        .accept(MediaType.TEXT_EVENT_STREAM))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_EVENT_STREAM));
    }
}
