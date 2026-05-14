import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ElementPlus from 'element-plus';
import LoginView from '@/views/LoginView.vue';
import * as ElMessageModules from 'element-plus/es/components/message';

// Mock auth store
const mockLogin = vi.fn();
const mockResetPassword = vi.fn();
const mockStore = {
  login: mockLogin,
  resetPassword: mockResetPassword,
  token: '',
  user: null,
};

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => mockStore,
}));

// Mock Vue Router
const mockPush = vi.fn();
const mockReplace = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  useRoute: () => ({ query: {} }),
}));

// Mock ElMessage
vi.mock('element-plus/es/components/message', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Re-import after mocks are set up
import { ElMessage } from 'element-plus';

describe('LoginView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLogin.mockReset();
    mockResetPassword.mockReset();
    mockStore.token = '';
    mockStore.user = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders login form with username and password fields', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const usernameInput = wrapper.find('input[type="text"], input[placeholder*="用户名"], input[name="username"]');
    const passwordInput = wrapper.find('input[type="password"], input[placeholder*="密码"], input[name="password"]');

    expect(usernameInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
  });

  it('login button is disabled when form is invalid', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const loginButton = wrapper.find('button[type="submit"], button:has-text("登录")');
    expect(loginButton.attributes('disabled')).toBeDefined();
  });

  it('calls authStore.login on valid form submit', async () => {
    mockLogin.mockResolvedValue({ token: 'mock-jwt-token', mustChangePassword: false });

    const wrapper = mount(LoginView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const usernameInput = wrapper.find('input[type="text"], input[placeholder*="用户名"], input[name="username"]');
    const passwordInput = wrapper.find('input[type="password"], input[placeholder*="密码"], input[name="password"]');
    const loginButton = wrapper.find('button[type="submit"]');

    await usernameInput.setValue('admin');
    await passwordInput.setValue('admin123');
    await nextTick();

    await loginButton.trigger('click');
    await nextTick();

    expect(mockLogin).toHaveBeenCalledWith('admin', 'admin123');
  });

  it('shows error message on login failure', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    const wrapper = mount(LoginView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const usernameInput = wrapper.find('input[type="text"], input[placeholder*="用户名"], input[name="username"]');
    const passwordInput = wrapper.find('input[type="password"], input[placeholder*="密码"], input[name="password"]');
    const loginButton = wrapper.find('button[type="submit"]');

    await usernameInput.setValue('admin');
    await passwordInput.setValue('wrongpassword');
    await nextTick();

    await loginButton.trigger('click');
    await nextTick();

    expect(ElMessage.error).toHaveBeenCalled();
  });

  it('redirects on successful login', async () => {
    mockLogin.mockResolvedValue({ token: 'mock-jwt-token', mustChangePassword: false });

    const wrapper = mount(LoginView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const usernameInput = wrapper.find('input[type="text"], input[placeholder*="用户名"], input[name="username"]');
    const passwordInput = wrapper.find('input[type="password"], input[placeholder*="密码"], input[name="password"]');
    const loginButton = wrapper.find('button[type="submit"]');

    await usernameInput.setValue('admin');
    await passwordInput.setValue('admin123');
    await nextTick();

    await loginButton.trigger('click');
    await nextTick();

    expect(mockPush).toHaveBeenCalled();
  });

  it('shows password change prompt when mustChangePassword is true', async () => {
    mockLogin.mockResolvedValue({
      token: 'mock-jwt-token',
      mustChangePassword: true,
    });

    const wrapper = mount(LoginView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const usernameInput = wrapper.find('input[type="text"], input[placeholder*="用户名"], input[name="username"]');
    const passwordInput = wrapper.find('input[type="password"], input[placeholder*="密码"], input[name="password"]');
    const loginButton = wrapper.find('button[type="submit"]');

    await usernameInput.setValue('admin');
    await passwordInput.setValue('admin123');
    await nextTick();

    await loginButton.trigger('click');
    await nextTick();

    // Verify mustChangePassword flag is set in store
    expect(mockStore.token).toBe('mock-jwt-token');
    // The component should show a password change prompt/dialog
    const passwordChangePrompt = wrapper.find('.password-change-prompt, .el-dialog:has-text("修改密码"), [data-testid="password-change"]');
    expect(passwordChangePrompt.exists()).toBe(true);
  });
});
