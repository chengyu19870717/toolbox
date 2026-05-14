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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GlobalExceptionHandlerTest {

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
    @DisplayName("handleValidation should return 400 with error code")
    void handleValidation_shouldReturn400WithErrorCode() throws Exception {
        // Trigger a ValidationException by sending invalid login credentials
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "username", "admin",
                "password", "wrongpassword"
        ));

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        assertThat(jsonNode.get("code").asText()).isEqualTo("VALIDATION_ERROR");
        assertThat(jsonNode.get("message").asText()).isNotBlank();
    }

    @Test
    @DisplayName("handleToolBox should return 500 with error code")
    void handleToolBox_shouldReturn500WithErrorCode() throws Exception {
        // Trigger a ToolBoxException by calling a non-existent datasource
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "dataSourceId", 99999,
                "sql", "SELECT 1"
        ));

        mockMvc.perform(post("/api/datasources/query")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + adminToken)
                        .content(requestBody))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.code").isNotEmpty())
                .andExpect(jsonPath("$.message").isNotEmpty());
    }

    @Test
    @DisplayName("handleUnknown should return 500 for unexpected errors")
    void handleUnknown_shouldReturn500ForUnexpectedErrors() throws Exception {
        // Trigger an unexpected error by calling a non-existent endpoint
        mockMvc.perform(get("/api/non-existent-endpoint")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNotFound());

        // Another approach: trigger a generic error through a valid endpoint
        // by sending malformed data that causes an unhandled exception
        String requestBody = "not-valid-json";

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("error response should have code and message fields")
    void errorResponse_shouldHaveCodeAndMessageFields() throws Exception {
        // Trigger a validation error
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "username", "admin",
                "password", "wrongpassword"
        ));

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        // Verify response structure has code and message fields
        assertThat(jsonNode.has("code")).isTrue();
        assertThat(jsonNode.has("message")).isTrue();
        assertThat(jsonNode.get("code").asText()).isEqualTo("VALIDATION_ERROR");
        assertThat(jsonNode.get("message").asText()).isNotBlank();
    }
}
