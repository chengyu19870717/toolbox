# ToolBox Automated Test Suite

> Complete automated testing framework for the ToolBox project (Spring Boot 3.3 + PF4J + Vue 3)

## Directory Structure

```
autotest/
├── README.md                    # This file
├── backend/
│   ├── unit/                    # Unit tests (JUnit 5 + Mockito)
│   │   ├── user/
│   │   │   ├── UserStoreTest.java
│   │   │   └── UserServiceTest.java
│   │   ├── security/
│   │   │   └── JwtUtilTest.java
│   │   └── datasource/
│   │       └── DataSourceServiceTest.java
│   └── integration/             # Integration tests (Testcontainers + MySQL)
│       ├── AuthIntegrationTest.java
│       ├── DataSourceIntegrationTest.java
│       ├── TaskIntegrationTest.java
│       └── PluginIntegrationTest.java
├── frontend/
│   ├── unit/                    # Frontend unit tests (Vitest + Vue Test Utils)
│   │   ├── LoginView.test.ts
│   │   ├── DataSourceView.test.ts
│   │   └── TaskListView.test.ts
│   └── e2e/                     # E2E tests (Playwright)
│       ├── smoke.spec.ts
│       └── playwright.config.ts
├── scripts/
│   ├── run-backend-tests.sh     # Backend test runner
│   ├── run-frontend-tests.sh    # Frontend test runner
│   └── run-e2e-tests.sh         # E2E test runner
└── run-all-tests.sh             # Master test runner
```

## Test Levels

### Level 1: Unit Tests
- **Framework**: JUnit 5 + Mockito + AssertJ (Java), Vitest + Vue Test Utils (Vue)
- **Scope**: Individual classes in isolation
- **Dependencies**: Mocked (UserStore, DataSourceService, etc.)
- **Speed**: Fast (< 5 seconds)
- **Run**: `./scripts/run-backend-tests.sh --unit` or `./scripts/run-frontend-tests.sh`

### Level 2: Integration Tests
- **Framework**: Spring Boot Test + Testcontainers (MySQL)
- **Scope**: Controllers + Services working together
- **Dependencies**: Real database via Testcontainers
- **Speed**: Medium (10-30 seconds)
- **Run**: `./scripts/run-backend-tests.sh --integration`

### Level 3: E2E Smoke Tests
- **Framework**: Playwright
- **Scope**: Full user flows from browser
- **Dependencies**: Running ToolBox application
- **Speed**: Slow (1-2 minutes)
- **Run**: `./scripts/run-e2e-tests.sh`

## Prerequisites

1. **Java 21+** and **Gradle 8.x** for backend tests
2. **Node.js 18+** for frontend and E2E tests
3. **Docker** for Testcontainers (integration tests)
4. **ToolBox application running** on `http://localhost:9090` for E2E tests

## Quick Start

```bash
# Run all tests
cd /Users/chengyu/project/toolbox
./autotest/run-all-tests.sh

# Run only backend unit tests
./autotest/scripts/run-backend-tests.sh --unit

# Run only backend integration tests
./autotest/scripts/run-backend-tests.sh --integration

# Run frontend tests
./autotest/scripts/run-frontend-tests.sh

# Run E2E smoke tests (requires running app)
./autotest/scripts/run-e2e-tests.sh
```

## Test Coverage Goals

| Area | Unit Tests | Integration Tests | E2E Tests |
|------|-----------|-------------------|-----------|
| User Management | ✅ | ✅ | ✅ |
| Authentication (JWT) | ✅ | ✅ | ✅ |
| Password Change | ✅ | ✅ | ✅ |
| Data Source CRUD | | ✅ | ✅ |
| Data Source Test Connection | ✅ | ✅ | |
| SQL Query Execution | | ✅ | |
| Task Submission | | ✅ | ✅ |
| Task Progress (SSE) | | ✅ | |
| Task Cancellation | | ✅ | |
| Plugin Tool Listing | | ✅ | ✅ |
| Plugin Sync Call | | ✅ | |
| Plugin Async Task | | ✅ | ✅ |
| File Upload/Download | | ✅ | |
| Admin Operations | | ✅ | ✅ |
| Frontend UI Components | ✅ | | ✅ |

## Smoke Test Checklist (from 部署运维指南)

The E2E tests cover the following critical paths from the 80-item smoke test checklist:

1. ✅ Application starts and health check passes
2. ✅ Admin login with default credentials
3. ✅ Forced password change on first login
4. ✅ Data source CRUD operations
5. ✅ Data source connection test
6. ✅ SQL query execution
7. ✅ Plugin tool listing
8. ✅ Tool sync invocation
9. ✅ Async task submission and progress tracking
10. ✅ Task cancellation
11. ✅ Artifact download
12. ✅ Admin user management
13. ✅ Logout

## Configuration

### Backend Test Properties

Override test defaults in `backend/src/test/resources/application-test.yml`:

```yaml
toolbox:
  paths:
    config-dir: /tmp/toolbox-test-config
    data-dir: /tmp/toolbox-test-data
    temp-dir: /tmp/toolbox-test-temp
    plugins-dir: /tmp/toolbox-test-plugins
  task:
    max-concurrent-per-user: 5
    retention-days: 30
  file:
    temp-retention-hours: 24
    max-size-mb: 100
  jwt:
    secret: test-secret-key-must-be-at-least-256-bits-long-for-hs256
    expiration-seconds: 28800
```

### E2E Test Configuration

Edit `frontend/e2e/playwright.config.ts` to adjust:
- `BASE_URL`: ToolBox application URL (default: `http://localhost:9090`)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD`: Default admin credentials
- `TIMEOUT`: Test timeout in milliseconds

## CI/CD Integration

GitHub Actions configuration is provided in `.github/workflows/test.yml`.

To enable:
1. Copy `.github/workflows/test.yml` to the project root
2. Ensure Docker is available in the CI environment
3. Tests run on every push and PR

## Troubleshooting

### Testcontainers fails to start
- Ensure Docker is running: `docker info`
- Check Docker Desktop logs on macOS
- Verify port 3306 is not already in use

### Frontend tests fail with module resolution errors
- Run `npm install` in the frontend directory first
- Ensure `@toolbox/frontend-sdk` is built: `cd frontend-sdk && npm run build`

### E2E tests fail with connection refused
- Ensure ToolBox application is running on port 9090
- Check: `curl http://localhost:9090/actuator/health`

### JWT token issues in tests
- Verify the test JWT secret is at least 256 bits (32 bytes) for HS256
- Check `application-test.yml` for correct secret value

## Adding New Tests

### Backend Unit Test Template

```java
package com.toolbox.framework.user;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*