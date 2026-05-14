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
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import com.toolbox.framework.datasource.DataSourceService;
import com.toolbox.framework.datasource.DataSourceConfig;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Testcontainers
class DataSourceIntegrationTest {

    @Container
    static MySQLContainer<?> mysql = new MySQLContainer<>("mysql:8.0")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test123");

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DataSourceService dataSourceService;

    private String authToken;

    @BeforeEach
    void setUp() throws Exception {
        // Login to get auth token for protected endpoints
        String loginBody = """
                {"username":"admin","password":"admin123"}
                """;
        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn();
        String token = objectMapper.readTree(loginResult.getResponse().getContentAsString(StandardCharsets.UTF_8))
                .get("token").asText();
        authToken = token;
    }

    @Test
    @DisplayName("list should return empty list initially")
    void list_shouldReturnEmptyListInitially() throws Exception {
        mockMvc.perform(get("/api/datasources")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    @DisplayName("create should add new datasource")
    void create_shouldAddNewDatasource() throws Exception {
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "name", "test-mysql",
                "type", "mysql",
                "host", "localhost",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "test123"
        ));

        MvcResult result = mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("test-mysql"))
                .andExpect(jsonPath("$.type").value("mysql"))
                .andExpect(jsonPath("$.id").exists())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        assertThat(jsonNode.get("password")).isNull();
    }

    @Test
    @DisplayName("create should reject duplicate name")
    void create_shouldRejectDuplicateName() throws Exception {
        String requestBody = objectMapper.writeValueAsString(Map.of(
                "name", "duplicate-ds",
                "type", "mysql",
                "host", "localhost",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "test123"
        ));

        // First create
        mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(requestBody))
                .andExpect(status().isCreated());

        // Second create with same name should fail
        mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @DisplayName("get should return datasource by id")
    void get_shouldReturnDatasourceById() throws Exception {
        // Create a datasource first
        String createBody = objectMapper.writeValueAsString(Map.of(
                "name", "get-test-ds",
                "type", "mysql",
                "host", "localhost",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "test123"
        ));

        MvcResult createResult = mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn();

        String responseBody = createResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        Long id = jsonNode.get("id").asLong();

        // Get by id
        mockMvc.perform(get("/api/datasources/{id}", id)
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value("get-test-ds"))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    @DisplayName("update should modify existing datasource")
    void update_shouldModifyExistingDatasource() throws Exception {
        // Create a datasource first
        String createBody = objectMapper.writeValueAsString(Map.of(
                "name", "update-test-ds",
                "type", "mysql",
                "host", "localhost",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "test123"
        ));

        MvcResult createResult = mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn();

        String responseBody = createResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        Long id = jsonNode.get("id").asLong();

        // Update the datasource
        String updateBody = objectMapper.writeValueAsString(Map.of(
                "name", "updated-ds",
                "type", "mysql",
                "host", "updated-host",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "newpassword"
        ));

        mockMvc.perform(put("/api/datasources/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("updated-ds"))
                .andExpect(jsonPath("$.host").value("updated-host"))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    @DisplayName("delete should remove datasource")
    void delete_shouldRemoveDatasource() throws Exception {
        // Create a datasource first
        String createBody = objectMapper.writeValueAsString(Map.of(
                "name", "delete-test-ds",
                "type", "mysql",
                "host", "localhost",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "test123"
        ));

        MvcResult createResult = mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn();

        String responseBody = createResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        Long id = jsonNode.get("id").asLong();

        // Delete the datasource
        mockMvc.perform(delete("/api/datasources/{id}", id)
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk());

        // Verify it's gone
        mockMvc.perform(get("/api/datasources/{id}", id)
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("testConnection should return success or failure")
    void testConnection_shouldReturnSuccessOrFailure() throws Exception {
        // Test with valid connection params (using Testcontainer MySQL)
        String testBody = objectMapper.writeValueAsString(Map.of(
                "host", mysql.getHost(),
                "port", mysql.getMappedPort(3306),
                "database", "testdb",
                "username", "test",
                "password", "test123",
                "type", "mysql"
        ));

        mockMvc.perform(post("/api/datasources/test")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(testBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").exists());

        // Test with invalid connection params
        String invalidTestBody = objectMapper.writeValueAsString(Map.of(
                "host", "invalid-host",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "wrongpassword",
                "type", "mysql"
        ));

        mockMvc.perform(post("/api/datasources/test")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(invalidTestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("query should execute SQL and return results")
    void query_shouldExecuteSQLAndReturnResults() throws Exception {
        // First, create a datasource pointing to the Testcontainer MySQL
        String createBody = objectMapper.writeValueAsString(Map.of(
                "name", "query-test-ds",
                "type", "mysql",
                "host", mysql.getHost(),
                "port", mysql.getMappedPort(3306),
                "database", "testdb",
                "username", "test",
                "password", "test123"
        ));

        MvcResult createResult = mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn();

        String responseBody = createResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        Long id = jsonNode.get("id").asLong();

        // Execute a SQL query by id
        String queryBody = objectMapper.writeValueAsString(Map.of(
                "sql", "SELECT 1 AS result"
        ));

        mockMvc.perform(post("/api/datasources/{id}/query", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(queryBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.results").isArray())
                .andExpect(jsonPath("$.results[0].result").value(1));

        // Test plugin-style query (dataSourceId in body)
        String pluginQueryBody = objectMapper.writeValueAsString(Map.of(
                "dataSourceId", id,
                "sql", "SELECT 42 AS answer"
        ));

        mockMvc.perform(post("/api/datasources/query")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(pluginQueryBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.results[0].answer").value(42));
    }

    @Test
    @DisplayName("list should not return password")
    void list_shouldNotReturnPassword() throws Exception {
        // Create a datasource
        String createBody = objectMapper.writeValueAsString(Map.of(
                "name", "no-password-ds",
                "type", "mysql",
                "host", "localhost",
                "port", 3306,
                "database", "testdb",
                "username", "test",
                "password", "secret123"
        ));

        mockMvc.perform(post("/api/datasources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + authToken)
                        .content(createBody))
                .andExpect(status().isCreated());

        // List all datasources and verify password is not returned
        mockMvc.perform(get("/api/datasources")
                        .header("Authorization", "Bearer " + authToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].password").doesNotExist())
                .andExpect(jsonPath("$[0].name").value("no-password-ds"));
    }
}
