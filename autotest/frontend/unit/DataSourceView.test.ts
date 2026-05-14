import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ElementPlus from 'element-plus';
import DataSourceView from '@/views/DataSourceView.vue';
import * as ElMessageModules from 'element-plus/es/components/message';

// Mock data source store
const mockFetchDataSources = vi.fn();
const mockCreateDataSource = vi.fn();
const mockDeleteDataSource = vi.fn();
const mockTestConnection = vi.fn();

const mockStore = {
  fetchDataSources: mockFetchDataSources,
  createDataSource: mockCreateDataSource,
  deleteDataSource: mockDeleteDataSource,
  testConnection: mockTestConnection,
  dataSources: [],
  loading: false,
};

vi.mock('@/stores/dataSource', () => ({
  useDataSourceStore: () => mockStore,
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

// Mock ElMessage and ElMessageBox
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ElMessageBox: {
    confirm: vi.fn(),
  },
}));

import { ElMessage, ElMessageBox } from 'element-plus';

describe('DataSourceView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchDataSources.mockReset();
    mockCreateDataSource.mockReset();
    mockDeleteDataSource.mockReset();
    mockTestConnection.mockReset();
    mockStore.dataSources = [];
    mockStore.loading = false;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders data source list table', async () => {
    mockFetchDataSources.mockResolvedValue([]);

    const wrapper = mount(DataSourceView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const table = wrapper.find('.el-table');
    expect(table.exists()).toBe(true);
  });

  it('loads data sources on mount', async () => {
    mockFetchDataSources.mockResolvedValue([
      { id: 1, name: 'Test DB', host: 'localhost', port: 3306 },
    ]);

    const wrapper = mount(DataSourceView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    expect(mockFetchDataSources).toHaveBeenCalled();
    expect(mockStore.dataSources.length).toBeGreaterThan(0);
  });

  it('shows create dialog when add button clicked', async () => {
    mockFetchDataSources.mockResolvedValue([]);

    const wrapper = mount(DataSourceView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const addButton = wrapper.find('button:has-text("新增"), button:has-text("添加"), button:has-text("Create"), button:has-text("Add")');
    expect(addButton.exists()).toBe(true);

    await addButton.trigger('click');
    await nextTick();

    const dialog = wrapper.find('.el-dialog');
    expect(dialog.classes()).toContain('el-dialog--open');
  });

  it('creates new data source on form submit', async () => {
    mockFetchDataSources.mockResolvedValue([]);
    mockCreateDataSource.mockResolvedValue({ id: 2, name: 'New DB', host: 'newhost', port: 3307 });

    const wrapper = mount(DataSourceView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const addButton = wrapper.find('button:has-text("新增"), button:has-text("添加"), button:has-text("Create"), button:has-text("Add")');
    await addButton.trigger('click');
    await nextTick();

    const nameInput = wrapper.find('input[name="name"], input[placeholder*="名称"]');
    const hostInput = wrapper.find('input[name="host"], input[placeholder*="主机"]');
    const portInput = wrapper.find('input[name="port"], input[placeholder*="端口"]');
    const dbInput = wrapper.find('input[name="database"], input[placeholder*="数据库"]');
    const userInput = wrapper.find('input[name="username"], input[placeholder*="用户名"]');
    const passInput = wrapper.find('input[name="password"], input[placeholder*="密码"]');

    await nameInput.setValue('Test DB');
    await hostInput.setValue('localhost');
    await portInput.setValue('3306');
    await dbInput.setValue('testdb');
    await userInput.setValue('root');
    await passInput.setValue('root123');
    await nextTick();

    const submitButton = wrapper.find('.el-dialog .el-button:has-text("确定"), .el-dialog button:has-text("提交")');
    await submitButton.trigger('click');
    await nextTick();

    expect(mockCreateDataSource).toHaveBeenCalledWith({
      name: 'Test DB',
      host: 'localhost',
      port: '3306',
      database: 'testdb',
      username: 'root',
      password: 'root123',
    });
  });

  it('deletes data source with confirmation', async () => {
    mockFetchDataSources.mockResolvedValue([
      { id: 1, name: 'Test DB', host: 'localhost', port: 3306 },
    ]);
    mockDeleteDataSource.mockResolvedValue(undefined);
    ElMessageBox.confirm.mockResolvedValue('confirm');

    const wrapper = mount(DataSourceView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const deleteButton = wrapper.find('button:has-text("删除"), button:has-text("Delete")');
    expect(deleteButton.exists()).toBe(true);

    await deleteButton.trigger('click');
    await nextTick();

    expect(ElMessageBox.confirm).toHaveBeenCalled();
    expect(mockDeleteDataSource).toHaveBeenCalledWith(1);
  });

  it('tests data source connection', async () => {
    mockFetchDataSources.mockResolvedValue([
      { id: 1, name: 'Test DB', host: 'localhost', port: 3306 },
    ]);
    mockTestConnection.mockResolvedValue({ success: true, message: 'Connection successful' });

    const wrapper = mount(DataSourceView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const testButton = wrapper.find('button:has-text("测试连接"), button:has-text("Test Connection")');
    expect(testButton.exists()).toBe(true);

    await testButton.trigger('click');
    await nextTick();

    expect(mockTestConnection).toHaveBeenCalledWith(1);
  });

  it('shows error when test connection fails', async () => {
    mockFetchDataSources.mockResolvedValue([
      { id: 1, name: 'Test DB', host: 'localhost', port: 3306 },
    ]);
    mockTestConnection.mockRejectedValue(new Error('Connection failed'));

    const wrapper = mount(DataSourceView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const testButton = wrapper.find('button:has-text("测试连接"), button:has-text("Test Connection")');
    await testButton.trigger('click');
    await nextTick();

    expect(ElMessage.error).toHaveBeenCalled();
  });
});
