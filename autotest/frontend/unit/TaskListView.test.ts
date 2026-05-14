import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ElementPlus from 'element-plus';
import TaskListView from '@/views/TaskListView.vue';

// Mock task store
const mockFetchTasks = vi.fn();
const mockCancelTask = vi.fn();
const mockDownloadArtifact = vi.fn();

const mockStore = {
  fetchTasks: mockFetchTasks,
  cancelTask: mockCancelTask,
  downloadArtifact: mockDownloadArtifact,
  tasks: [],
  loading: false,
};

vi.mock('@/stores/task', () => ({
  useTaskStore: () => mockStore,
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
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { ElMessage } from 'element-plus';

// Mock SSE
const mockSSEEventSource = vi.fn();
const mockAddEventListener = vi.fn();
const mockClose = vi.fn();

vi.mock('event-source-polyfill', () => ({
  EventSourcePolyfill: vi.fn().mockImplementation(() => ({
    addEventListener: mockAddEventListener,
    close: mockClose,
  })),
}));

vi.mock('event-source-polyfill', () => ({
  EventSourcePolyfill: vi.fn().mockImplementation(() => ({
    addEventListener: mockAddEventListener,
    close: mockClose,
  })),
}));

describe('TaskListView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchTasks.mockReset();
    mockCancelTask.mockReset();
    mockDownloadArtifact.mockReset();
    mockStore.tasks = [];
    mockStore.loading = false;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders task list table', async () => {
    mockFetchTasks.mockResolvedValue([]);

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const table = wrapper.find('.el-table');
    expect(table.exists()).toBe(true);
  });

  it('loads tasks on mount', async () => {
    mockFetchTasks.mockResolvedValue([
      { id: 1, name: 'Test Task', status: 'RUNNING', progress: 50 },
    ]);

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    expect(mockFetchTasks).toHaveBeenCalled();
    expect(mockStore.tasks.length).toBeGreaterThan(0);
  });

  it('shows progress bar for running tasks', async () => {
    mockFetchTasks.mockResolvedValue([
      { id: 1, name: 'Test Task', status: 'RUNNING', progress: 50, message: 'Processing...' },
    ]);

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const progressBar = wrapper.find('.el-progress');
    expect(progressBar.exists()).toBe(true);
  });

  it('shows cancel button for running tasks', async () => {
    mockFetchTasks.mockResolvedValue([
      { id: 1, name: 'Test Task', status: 'RUNNING', progress: 50, message: 'Processing...' },
    ]);

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const cancelButton = wrapper.find('button:has-text("取消"), button:has-text("Cancel")');
    expect(cancelButton.exists()).toBe(true);
  });

  it('cancels task when button clicked', async () => {
    mockFetchTasks.mockResolvedValue([
      { id: 1, name: 'Test Task', status: 'RUNNING', progress: 50, message: 'Processing...' },
    ]);
    mockCancelTask.mockResolvedValue(undefined);

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const cancelButton = wrapper.find('button:has-text("取消"), button:has-text("Cancel")');
    await cancelButton.trigger('click');
    await nextTick();

    expect(mockCancelTask).toHaveBeenCalledWith(1);
  });

  it('shows download button for completed tasks with artifacts', async () => {
    mockFetchTasks.mockResolvedValue([
      {
        id: 2,
        name: 'Completed Task',
        status: 'COMPLETED',
        progress: 100,
        message: 'Done',
        artifacts: [{ name: 'report.csv', url: '/api/tasks/2/artifacts/report.csv' }],
      },
    ]);

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const downloadButton = wrapper.find('button:has-text("下载"), button:has-text("Download")');
    expect(downloadButton.exists()).toBe(true);
  });

  it('updates progress via SSE', async () => {
    mockFetchTasks.mockResolvedValue([
      { id: 1, name: 'Test Task', status: 'RUNNING', progress: 50, message: 'Processing...' },
    ]);

    const mockCallback = vi.fn();
    mockAddEventListener.mockImplementation((event, callback) => {
      if (event === 'message') {
        mockCallback.mockImplementation((data) => {
          // Simulate SSE message update
          const task = mockStore.tasks.find((t) => t.id === 1);
          if (task) {
            task.progress = data.progress;
            task.message = data.message;
          }
        });
      }
    });

    const wrapper = mount(TaskListView, {
      global: {
        plugins: [ElementPlus],
      },
    });

    await nextTick();

    const progressBar = wrapper.find('.el-progress');
    expect(progressBar.exists()).toBe(true);

    // Simulate SSE update
    const sseCallback = mockAddEventListener.mock.calls.find((call) => call[0] === 'message')?.[1];
    if (sseCallback) {
      sseCallback({ data: JSON.stringify({ taskId: 1, progress: 75, message: 'Almost done' }) });
      await nextTick();

      const updatedTask = mockStore.tasks.find((t) => t.id === 1);
      expect(updatedTask?.progress).toBe(75);
      expect(updatedTask?.message).toBe('Almost done');
    }
  });
});
