import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:9090';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// Helper: login and get token
async function login(page: any, username: string, password: string): Promise<string> {
  await page.goto(`${BASE_URL}/`);
  await page.getByLabel('用户名').fill(username);
  await page.getByLabel('密码').fill(password);
  await page.getByRole('button', { name: '登录' }).click();
  // Get token from network response
  const response = await page.waitForResponse(
    (resp) => resp.url().includes('/api/auth/login') && resp.status() === 200
  );
  const data = await response.json();
  return data.token;
}

test.describe('ToolBox E2E Smoke Tests', () => {
  test('health check endpoint is healthy', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/actuator/health`);
    expect(res.ok()).toBe(true);
    const body = await res.json();
    expect(body.status).toBe('UP');
  });

  test.describe('Authentication', () => {
    test('admin can login with default credentials', async ({ page }) => {
      const token = await login(page, ADMIN_USER, ADMIN_PASS);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    test('login with wrong password shows error', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.getByLabel('用户名').fill(ADMIN_USER);
      await page.getByLabel('密码').fill('wrongpassword');
      await page.getByRole('button', { name: '登录' }).click();
      // Should show error message
      await expect(page.getByText(/用户名或密码错误/)).toBeVisible({ timeout: 5000 });
    });

    test('mustChangePassword is true for first login', async ({ page }) => {
      const token = await login(page, ADMIN_USER, ADMIN_PASS);
      // Verify token contains mustChangePassword: true
      // Decode JWT payload or check /api/auth/me
      const res = await page.request.get(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      expect(data.mustChangePassword).toBe(true);
    });
  });

  test.describe('Data Source Operations', () => {
    let token: string;

    test.beforeEach(async ({ page }) => {
      token = await login(page, ADMIN_USER, ADMIN_PASS);
    });

    test('can list data sources (empty initially)', async ({ page }) => {
      await page.goto(`${BASE_URL}/datasources`);
      // Should show empty state or empty table
      await expect(page.locator('.el-table')).toBeVisible();
    });

    test('can create a data source', async ({ page }) => {
      await page.goto(`${BASE_URL}/datasources`);
      await page.getByRole('button', { name: /新增|添加|create/i }).click();
      await page.getByLabel('名称').fill('Test DB');
      await page.getByLabel('主机').fill('localhost');
      await page.getByLabel('端口').fill('3306');
      await page.getByLabel('数据库').fill('testdb');
      await page.getByLabel('用户名').fill('root');
      await page.getByLabel('密码').fill('root123');
      await page.getByRole('button', { name: /确定|submit/i }).click();
      await expect(page.getByText('数据源创建成功')).toBeVisible({ timeout: 5000 });
    });

    test('can test data source connection', async ({ page }) => {
      // Create datasource first, then test
      await page.goto(`${BASE_URL}/datasources`);
      // Click test button on first datasource
      await page.getByRole('button', { name: /测试连接/i }).first().click();
      // Should show result (success or failure)
      await expect(page.locator('.el-message')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Plugin Operations', () => {
    let token: string;

    test.beforeEach(async ({ page }) => {
      token = await login(page, ADMIN_USER, ADMIN_PASS);
    });

    test('can view plugin tool list', async ({ page }) => {
      await page.goto(`${BASE_URL}/tools`);
      // Should show tool tree/list
      await expect(page.locator('.tool-tree, .tool-list, .el-tree')).toBeVisible({
        timeout: 5000,
      });
    });

    test('can invoke a tool synchronously', async ({ page }) => {
      await page.goto(`${BASE_URL}/tools`);
      // Click on a tool (e.g., sql-runner)
      await page.getByText(/sql-runner|SQL/i).first().click();
      // Tool panel should appear
      await expect(page.locator('.tool-panel, .tool-view')).toBeVisible({
        timeout: 5000,
      });
    });
  });

  test.describe('Task Operations', () => {
    let token: string;

    test.beforeEach(async ({ page }) => {
      token = await login(page, ADMIN_USER, ADMIN_PASS);
    });

    test('can view task list', async ({ page }) => {
      await page.goto(`${BASE_URL}/tasks`);
      await expect(page.locator('.el-table')).toBeVisible({ timeout: 5000 });
    });

    test('can submit a task', async ({ page }) => {
      await page.goto(`${BASE_URL}/tools`);
      // Find and click a tool that supports async tasks
      await page.getByText(/sql-runner/i).first().click();
      // Click submit task button
      await page.getByRole('button', { name: /提交任务|submit/i }).click();
      // Should return taskId
      await expect(page.getByText(/任务提交成功|taskId/)).toBeVisible({
        timeout: 10000,
      });
    });

    test('can view task progress', async ({ page }) => {
      await page.goto(`${BASE_URL}/tasks`);
      // Task list should show progress
      await expect(page.locator('.el-progress')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Admin Operations', () => {
    let token: string;

    test.beforeEach(async ({ page }) => {
      token = await login(page, ADMIN_USER, ADMIN_PASS);
    });

    test('admin can access admin panel', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);
      await expect(page.locator('.el-table')).toBeVisible({ timeout: 5000 });
    });

    test('admin can create new user', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);
      await page.getByRole('button', { name: /新增|添加/i }).click();
      await page.getByLabel('用户名').fill('testuser');
      await page.getByLabel('角色').selectOption('USER');
      await page.getByRole('button', { name: /确定|submit/i }).click();
      await expect(page.getByText(/用户创建成功/)).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Security', () => {
    test('unauthenticated requests are redirected to login', async ({ page }) => {
      await page.goto(`${BASE_URL}/datasources`);
      await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
    });

    test('token is required for API calls', async ({ request }) => {
      const res = await request.get(`${BASE_URL}/api/datasources`);
      expect(res.status()).toBe(401);
    });
  });

  test.describe('Logout', () => {
    test('can logout', async ({ page }) => {
      await login(page, ADMIN_USER, ADMIN_PASS);
      await page.goto(BASE_URL);
      await page.getByRole('button', { name: /logout|退出|logout/i }).click();
      await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
    });
  });
});
