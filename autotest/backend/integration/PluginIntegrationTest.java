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
class PluginIntegrationTest {

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
    @DisplayName("list should return all registered tools")
    void list_shouldReturnAllRegisteredTools() throws Exception {
        mockMvc.perform(get("/api/plugins")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[*].id").value(org.hamcrest.Matchers.hasItem("sql-runner")));
    }

    @Test
    @DisplayName("list should return tool metadata")
    void list_shouldReturnToolMetadata() throws Exception {
        mockMvc.perform(get("/api/plugins")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").isNotEmpty())
                .andExpect(jsonPath("$[0].name").isNotEmpty())
                .andExpect(jsonPath("$[0].description").isNotEmpty())
                .andExpect(jsonPath("$[0].category").isNotEmpty())
                .andExpect(jsonPath("$[0].icon").isNotEmpty());
    }

    @Test
    @DisplayName("callSync should invoke plugin handler")
    void callSync_shouldInvokePluginHandler() throws Exception {
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "action", "execute",
                "params", Map.of(
                        "sql", "SELECT 1 AS result",
                        "limit", 10
                )
        ));

        mockMvc.perform(post("/api/plugins/sql-runner/sync")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.results").isArray());
    }

    @Test
    @DisplayName("callSync should throw for non-existent tool")
    void callSync_shouldThrowForNonExistentTool() throws Exception {
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "action", "execute",
                "params", Map.of("sql", "SELECT 1")
        ));

        mockMvc.perform(post("/api/plugins/non-existent-tool/sync")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("TOOL_NOT_FOUND"));
    }

    @Test
    @DisplayName("callSync should throw for tool without SyncHandler")
    void callSync_shouldThrowForToolWithoutSyncHandler() throws Exception {
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "action", "execute",
                "params", Map.of()
        ));

        mockMvc.perform(post("/api/plugins/flow-viewer/sync")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("SYNC_HANDLER_NOT_FOUND"));
    }

    @Test
    @DisplayName("submitTask should create async task")
    void submitTask_shouldCreateAsyncTask() throws Exception {
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
    @DisplayName("submitTask should throw for tool without TaskHandler")
    void submitTask_shouldThrowForToolWithoutTaskHandler() throws Exception {
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "params", Map.of()
        ));

        mockMvc.perform(post("/api/plugins/flow-viewer/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("TASK_HANDLER_NOT_FOUND"));
    }

    @Test
    @DisplayName("getFrontend should return JavaScript for existing tool")
    void getFrontend_shouldReturnJavaScriptForExistingTool() throws Exception {
        mockMvc.perform(get("/api/plugins/sql-runner/frontend.js")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.parseMediaType("application/javascript")))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("function")));
    }

    @Test
    @DisplayName("getFrontend should return 404 for non-existent tool")
    void getFrontend_shouldReturn404ForNonExistentTool() throws Exception {
        mockMvc.perform(get("/api/plugins/non-existent-tool/frontend.js")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNotFound());
    }
}
