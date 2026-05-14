# ToolBox 前端组件 API 参考

> 版本：v1.0
> 文档定位：框架提供的所有通用前端组件和 ToolboxAPI 的完整接口参考。
> 前置阅读：`02-插件开发指南.md`

---

## 1. 总览

所有组件和 API 通过 `@toolbox/frontend-sdk` 包提供：

```typescript
import {
  // 组件
  DataSourceSelector,
  SqlPanel,
  ResultTable,
  ExcelImportWizard,
  ExcelExportButton,
  FlowChart,
  ProgressPanel,
  TaskList,
  JsonViewer,
  XmlViewer,
  FilePicker,
  DiffView,

  // 类型
  type ToolboxAPI,
  type DataSource,
  type QueryRequest,
  type QueryResult,
  type Task,
  type TaskStatus,
  type FlowNode,
  type FlowEdge,
} from '@toolbox/frontend-sdk';
```

**SDK 是 peer dependency**——插件构建时不打包它，运行时由框架注入。

---

## 2. ToolboxAPI

插件入口函数收到的全局对象。是插件访问框架能力的唯一入口。

### 2.1 完整类型签名

```typescript
interface ToolboxAPI {
  plugin: PluginAPI;
  dataSource: DataSourceAPI;
  task: TaskAPI;
  file: FileAPI;
  notification: NotificationAPI;
  tab: TabAPI;
  user: UserInfo;
}
```

### 2.2 plugin

调用本插件后端的 SyncHandler。

```typescript
interface PluginAPI {
  /**
   * 调用本插件后端的 SyncHandler
   * @param action 后端 SyncHandler.handle() 里 switch 的 action 字符串
   * @param params 参数对象，会序列化为 JSON 传给后端
   * @returns 后端返回值（已反序列化）
   * @throws 后端抛异常时这里会 reject，框架会自动弹错误对话框
   */
  callSync<T = any>(action: string, params?: Record<string, any>): Promise<T>;
}
```

**示例**：

```typescript
const result = await api.plugin.callSync<{ message: string }>('greet', {
  name: 'Alice',
});
console.log(result.message);  // "Hello, Alice!"
```

### 2.3 dataSource

数据源管理。

```typescript
interface DataSourceAPI {
  /** 列出所有数据源（不含密码） */
  list(): Promise<DataSource[]>;

  /** 立即建立连接（用于工具进入时） */
  connect(dataSourceId: string): Promise<void>;

  /** 释放本 Tab 对该数据源的占用（Tab 关闭时调用） */
  release(dataSourceId: string): Promise<void>;

  /** 执行查询 */
  query(req: QueryRequest): Promise<QueryResult>;

  /** 测试连接（不影响连接池） */
  testConnection(dataSourceId: string): Promise<{ ok: boolean; message?: string }>;
}

interface DataSource {
  id: string;
  name: string;
  type: 'MYSQL' | 'OCEANBASE';
  host: string;
  port: number;
  database: string;
  username: string;
  // 注意：list() 不返回 password
}

interface QueryRequest {
  dataSourceId: string;
  sql: string;
  params?: any[];                 // PreparedStatement 参数
  timeoutSeconds?: number;        // 默认 60
  maxRows?: number;               // 默认 100 万
}

interface QueryResult {
  columns: ColumnMeta[];
  rows: any[][];                  // 每行是值数组
  rowCount: number;
  truncated: boolean;             // 是否被 maxRows 截断
  durationMs: number;
}

interface ColumnMeta {
  name: string;
  jdbcType: string;               // "VARCHAR" / "INTEGER" / ...
}
```

**示例**：

```typescript
const sources = await api.dataSource.list();
const result = await api.dataSource.query({
  dataSourceId: 'ds1',
  sql: 'SELECT id, name FROM users WHERE age > ?',
  params: [18],
  timeoutSeconds: 30,
});

if (result.truncated) {
  api.notification.warning(`结果超过限制，仅返回前 ${result.rowCount} 行`);
}
```

### 2.4 task

后台任务管理。

```typescript
interface TaskAPI {
  /** 提交一个后台任务 */
  submit(req: TaskSubmitRequest): Promise<{ taskId: string }>;

  /** 取消任务（强制中断） */
  cancel(taskId: string): Promise<void>;

  /** 列出当前用户的所有任务（含已完成、失败、取消） */
  listMine(filter?: TaskListFilter): Promise<Task[]>;

  /** 获取任务详情 */
  get(taskId: string): Promise<Task>;

  /** 订阅任务进度（基于 SSE） */
  subscribe(taskId: string, handlers: ProgressHandlers): () => void;
}

interface TaskSubmitRequest {
  name: string;                   // 显示名
  payload?: Record<string, any>;  // 传给后端 TaskHandler 的载荷
  taskType?: string;              // 后端区分任务类型用（可空，由插件后端处理）
}

interface TaskListFilter {
  status?: TaskStatus[];
  pluginId?: string;
  limit?: number;                 // 默认 50
}

interface Task {
  id: string;
  pluginId: string;
  taskType: string;
  name: string;
  username: string;
  status: TaskStatus;
  progressPercent: number;
  progressMessage?: string;
  submittedAt: string;            // ISO timestamp
  startedAt?: string;
  finishedAt?: string;
  errorMessage?: string;
  artifacts: TaskArtifact[];
}

type TaskStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

interface TaskArtifact {
  name: string;                   // 文件名
  sizeBytes: number;
  contentType: string;
  // 注意：要拿到下载 URL 用 api.file.downloadUrl(taskId, name)
}

interface ProgressHandlers {
  onProgress?: (data: { percent: number; message?: string }) => void;
  onCompleted?: (artifacts: TaskArtifact[]) => void;
  onFailed?: (error: string) => void;
  onCancelled?: () => void;
}
```

**`subscribe` 返回值**是一个**取消订阅**的函数。组件销毁时一定要调用，否则 SSE 连接会泄漏：

```typescript
const unsubscribe = api.task.subscribe(taskId, {
  onProgress: ({ percent, message }) => {
    console.log(`${percent}%: ${message}`);
  },
  onCompleted: (artifacts) => {
    api.notification.success('完成');
  },
  onFailed: (error) => {
    api.notification.error(`失败：${error}`);
  },
});

// 组件 unmount 时
onBeforeUnmount(() => {
  unsubscribe();
});
```

### 2.5 file

文件上传下载。

```typescript
interface FileAPI {
  /**
   * 上传文件（multipart/form-data）
   * @param onProgress 上传进度回调，0-100
   */
  upload(file: File, onProgress?: (percent: number) => void): Promise<UploadedFile>;

  /**
   * 拿到任务产物的下载 URL，可直接给 <a href> 用
   */
  downloadUrl(taskId: string, artifactName: string): string;

  /**
   * 直接触发浏览器下载
   */
  download(taskId: string, artifactName: string): void;
}

interface UploadedFile {
  fileId: string;                 // 用于后续传给 TaskHandler 的 payload
  originalName: string;
  sizeBytes: number;
  contentType: string;
  uploadedAt: string;
}
```

**示例**：

```typescript
// 上传
const uploaded = await api.file.upload(file, (percent) => {
  uploadProgress.value = percent;
});

// 提交任务，把 fileId 传给后端
await api.task.submit({
  name: '导入 Excel',
  payload: { fileId: uploaded.fileId },
});

// 下载产物
api.file.download(taskId, 'output.xlsx');
```

### 2.6 notification

弹出通知（右上角 Toast 风格）。

```typescript
interface NotificationAPI {
  success(message: string, options?: NotifyOptions): void;
  info(message: string, options?: NotifyOptions): void;
  warning(message: string, options?: NotifyOptions): void;
  error(message: string, options?: NotifyOptions): void;
}

interface NotifyOptions {
  title?: string;
  duration?: number;              // 毫秒，0 = 不自动关闭，默认 4500
}
```

### 2.7 tab

控制当前 Tab。

```typescript
interface TabAPI {
  /** 修改当前 Tab 的标题 */
  setTitle(title: string): void;

  /** 关闭当前 Tab（如果有运行中任务，会弹确认） */
  close(): void;

  /** 监听 Tab 即将关闭事件 */
  onBeforeClose(handler: () => boolean | Promise<boolean>): () => void;
}
```

`onBeforeClose` 的 handler 返回 `false` 可以阻止关闭（用户确认对话框等场景）：

```typescript
const off = api.tab.onBeforeClose(async () => {
  if (hasUnsavedChanges.value) {
    const confirmed = await ElMessageBox.confirm('有未保存的修改，确定关闭？');
    return confirmed;
  }
  return true;
});

onBeforeUnmount(() => off());
```

### 2.8 user

当前登录用户信息。

```typescript
interface UserInfo {
  username: string;
  role: 'USER' | 'ADMIN';
}
```

只读，不能修改。

---

## 3. 通用组件

所有组件遵循 Vue 3 Composition API 风格，使用 TypeScript 类型完备。

### 3.1 DataSourceSelector

数据源选择器。下拉选 + "管理数据源"快捷入口。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | `string \| null` | - | v-model 绑定，选中的数据源 ID |
| filter | `(ds: DataSource) => boolean` | - | 过滤函数，例如只显示 MySQL |
| disabled | `boolean` | false | |
| placeholder | `string` | '请选择数据源' | |
| autoConnect | `boolean` | true | 选中后自动调用 connect() |
| width | `string \| number` | 280 | |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| update:modelValue | `string \| null` | v-model |
| change | `DataSource \| null` | 选择变化时（包含完整数据源对象） |
| connect-success | `DataSource` | 连接成功 |
| connect-failed | `{ ds, error }` | 连接失败（框架已弹错误，组件向外抛事件供插件参考） |

#### 示例

```vue
<template>
  <DataSourceSelector
    v-model="dsId"
    :filter="(ds) => ds.type === 'MYSQL'"
    @change="onDsChange"
    @connect-success="onConnected"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DataSourceSelector, type DataSource } from '@toolbox/frontend-sdk';

const dsId = ref<string | null>(null);

function onDsChange(ds: DataSource | null) {
  if (ds) {
    api.tab.setTitle(`SQL 查询器 - ${ds.name}`);
  }
}

function onConnected(ds: DataSource) {
  api.notification.success(`已连接到 ${ds.name}`);
}
</script>
```

### 3.2 SqlPanel

SQL 编辑器 + 执行按钮 + 参数表单。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| modelValue | `string` | '' | v-model：SQL 文本 |
| dataSourceId | `string \| null` | - | 关联的数据源 ID |
| height | `string \| number` | 200 | 编辑器高度 |
| placeholder | `string` | '在此输入 SQL...' | |
| showParamsForm | `boolean` | true | 是否显示参数表单（自动从 SQL 里提取 `?` 或命名占位符） |
| readonly | `boolean` | false | |
| timeoutSeconds | `number` | 60 | 默认超时 |
| maxRows | `number` | 1000000 | |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| update:modelValue | `string` | SQL 内容变化 |
| execute | `QueryResult` | 执行成功，返回结果 |
| error | `Error` | 执行失败 |

#### Slots

| 插槽 | 说明 |
|---|---|
| toolbar | 工具栏右侧追加按钮（默认有"执行"按钮） |

#### 示例

```vue
<template>
  <SqlPanel
    v-model="sql"
    :data-source-id="dsId"
    @execute="onResult"
  >
    <template #toolbar>
      <el-button @click="loadTemplate">载入模板</el-button>
    </template>
  </SqlPanel>
  <ResultTable v-if="result" :data="result" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SqlPanel, ResultTable, type QueryResult } from '@toolbox/frontend-sdk';

const sql = ref('SELECT * FROM users LIMIT 10');
const dsId = ref<string | null>(null);
const result = ref<QueryResult | null>(null);

function onResult(r: QueryResult) {
  result.value = r;
}
</script>
```

### 3.3 ResultTable

通用结果表格。展示 QueryResult 或自定义数据。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| data | `QueryResult \| TableData` | - | 数据（QueryResult 或 `{ columns, rows }`） |
| height | `string \| number` | 'auto' | |
| pagination | `boolean \| PaginationConfig` | true | |
| sortable | `boolean` | true | 列排序 |
| resizable | `boolean` | true | 列宽拖拽 |
| selectable | `boolean` | false | 行选择 |
| exportEnabled | `boolean` | true | 显示"导出"按钮 |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| select | `any[][]` | 选中行变化（rows 数组） |
| cell-click | `{ row, col, value }` | 单元格点击 |
| export | `'csv' \| 'xlsx'` | 用户点了导出，组件会内部处理 |

#### 示例

```vue
<template>
  <ResultTable
    :data="result"
    selectable
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ResultTable } from '@toolbox/frontend-sdk';
const result = ref(/* ... */);
function onSelect(rows: any[][]) {
  console.log('选中', rows);
}
</script>
```

### 3.4 ExcelImportWizard

Excel 导入向导（多步：选文件 → 预览 → 字段映射 → 执行 → 结果）。

#### Props

| 属性 | 类型 | 必填 | 说明 |
|---|---|---|---|
| fields | `FieldMapping[]` | ✓ | 目标字段列表 |
| sheetName | `string` | | 指定 sheet（不指定时让用户选） |
| previewRows | `number` | | 预览行数，默认 5 |
| onImport | `(rows: Record<string, any>[]) => Promise<ImportResult>` | ✓ | 导入回调，通常调用 api.task.submit 返回任务结果 |

#### 类型

```typescript
interface FieldMapping {
  key: string;                    // 目标字段
  label: string;                  // 显示名
  required?: boolean;
  type?: 'string' | 'number' | 'date' | 'boolean';
  defaultValue?: any;
}

interface ImportResult {
  successCount: number;
  failedCount: number;
  errors?: { row: number; message: string }[];
}
```

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| complete | `ImportResult` | 导入完成 |
| cancel | - | 用户取消 |

#### 示例

```vue
<template>
  <ExcelImportWizard
    :fields="fields"
    :on-import="handleImport"
    @complete="onComplete"
  />
</template>

<script setup lang="ts">
import { ExcelImportWizard, type FieldMapping } from '@toolbox/frontend-sdk';

const fields: FieldMapping[] = [
  { key: 'name', label: '姓名', required: true },
  { key: 'age', label: '年龄', type: 'number' },
  { key: 'email', label: '邮箱', required: true },
];

async function handleImport(rows: Record<string, any>[]) {
  const uploaded = await api.file.upload(/* 实际场景：内置组件已经处理了上传 */);
  const { taskId } = await api.task.submit({
    name: '导入用户',
    payload: { rows },
  });
  // 等待任务结果……
  return { successCount: rows.length, failedCount: 0 };
}
</script>
```

### 3.5 ExcelExportButton

Excel 导出按钮。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| data | `TableData \| (() => Promise<TableData>)` | - | 数据（同步或异步） |
| filename | `string` | 'export.xlsx' | |
| sheetName | `string` | 'Sheet1' | |
| label | `string` | '导出 Excel' | 按钮文字 |
| disabled | `boolean` | false | |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| exported | `{ filename, rowCount }` | 导出完成 |

#### 示例

```vue
<ExcelExportButton
  :data="loadData"
  filename="用户列表.xlsx"
/>

<script setup>
async function loadData() {
  const result = await api.dataSource.query({ ... });
  return result;
}
</script>
```

### 3.6 FlowChart

静态流程图组件（基于 AntV X6 封装）。

#### Props

| 属性 | 类型 | 必填 | 说明 |
|---|---|---|---|
| nodes | `FlowNode[]` | ✓ | 节点 |
| edges | `FlowEdge[]` | ✓ | 边 |
| layout | `'dagre' \| 'grid' \| 'circular' \| 'force'` | | 自动布局，默认 dagre |
| direction | `'TB' \| 'LR' \| 'BT' \| 'RL'` | | dagre 方向，默认 TB |
| height | `string \| number` | 'auto' | |
| zoomable | `boolean` | true | 滚轮缩放 |
| draggable | `boolean` | true | 拖动视图 |
| exportable | `boolean` | true | 显示"导出图片"按钮 |
| nodeStyleResolver | `(node: FlowNode) => NodeStyle` | | 自定义节点样式 |
| edgeStyleResolver | `(edge: FlowEdge) => EdgeStyle` | | 自定义边样式 |

#### 类型

```typescript
interface FlowNode {
  id: string;
  label: string;
  type?: 'rect' | 'circle' | 'diamond';   // 默认 rect
  data?: Record<string, any>;              // 自定义业务数据
}

interface FlowEdge {
  id?: string;                             // 不写自动生成
  source: string;                          // 起点节点 id
  target: string;                          // 终点节点 id
  label?: string;
  data?: Record<string, any>;
}

interface NodeStyle {
  fill?: string;
  stroke?: string;
  fontSize?: number;
  fontColor?: string;
  width?: number;
  height?: number;
}

interface EdgeStyle {
  stroke?: string;
  strokeWidth?: number;
  arrowSize?: number;
  dashed?: boolean;
}
```

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| node-click | `FlowNode` | 节点点击 |
| edge-click | `FlowEdge` | 边点击 |
| export | `Blob` | 导出图片，可保存到本地 |

#### 示例

```vue
<template>
  <FlowChart
    :nodes="nodes"
    :edges="edges"
    direction="LR"
    @node-click="onNodeClick"
  />
</template>

<script setup lang="ts">
import { FlowChart, type FlowNode, type FlowEdge } from '@toolbox/frontend-sdk';

const nodes: FlowNode[] = [
  { id: 'A', label: '开始', type: 'circle' },
  { id: 'B', label: '审核中' },
  { id: 'C', label: '审核通过', type: 'rect' },
  { id: 'D', label: '审核驳回', type: 'rect' },
  { id: 'E', label: '完成', type: 'circle' },
];

const edges: FlowEdge[] = [
  { source: 'A', target: 'B' },
  { source: 'B', target: 'C', label: '通过' },
  { source: 'B', target: 'D', label: '驳回' },
  { source: 'C', target: 'E' },
  { source: 'D', target: 'B', label: '重新提交' },
];

function onNodeClick(node: FlowNode) {
  api.notification.info(`点击了节点: ${node.label}`);
}
</script>
```

### 3.7 ProgressPanel

进度面板（进度条 + 当前步骤 + 取消按钮 + 日志输出）。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| taskId | `string` | - | 任务 ID（订阅其进度） |
| showLog | `boolean` | true | 显示日志输出区 |
| showCancel | `boolean` | true | 显示取消按钮 |
| autoSubscribe | `boolean` | true | 自动 subscribe，组件卸载自动 unsubscribe |
| logMaxLines | `number` | 500 | 日志最大行数 |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| completed | `TaskArtifact[]` | 任务完成 |
| failed | `string` | 任务失败 |
| cancelled | - | 任务被取消 |
| cancel | - | 用户点击取消按钮（组件已自动调用 cancel API） |

#### 示例

```vue
<ProgressPanel
  :task-id="taskId"
  @completed="onCompleted"
  @failed="onFailed"
/>

<script setup>
function onCompleted(artifacts) {
  if (artifacts.length > 0) {
    api.file.download(taskId.value, artifacts[0].name);
  }
}
</script>
```

### 3.8 TaskList

任务列表。展示当前用户的任务历史。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| filter | `TaskListFilter` | - | 同 api.task.listMine 的 filter |
| autoRefresh | `boolean \| number` | 5000 | 自动刷新间隔（毫秒），false 关闭 |
| showActions | `boolean` | true | 显示操作列（取消、删除、下载） |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| select | `Task` | 点击行 |

#### 示例

```vue
<TaskList :filter="{ pluginId: 'sql-runner' }" />
```

### 3.9 JsonViewer

JSON 格式化查看器（折叠树形）。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| data | `any` | - | JSON 对象或字符串 |
| expandLevel | `number` | 2 | 默认展开层级 |
| copyable | `boolean` | true | 显示复制按钮 |
| editable | `boolean` | false | 是否可编辑 |
| height | `string \| number` | 'auto' | |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| update | `any` | editable=true 时数据变化 |

#### 示例

```vue
<JsonViewer :data="response" :expand-level="3" />
```

### 3.10 XmlViewer

XML 格式化查看器。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| data | `string` | - | XML 字符串 |
| height | `string \| number` | 'auto' | |
| copyable | `boolean` | true | |
| collapsible | `boolean` | true | |

#### 示例

```vue
<XmlViewer :data="xmlString" />
```

### 3.11 FilePicker

文件选择器（含上传集成）。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| accept | `string` | - | 文件类型，如 `.xlsx,.xls` |
| multiple | `boolean` | false | |
| maxSize | `number` | 100 * 1024 * 1024 | 字节 |
| autoUpload | `boolean` | true | 选中后自动上传 |
| dragdrop | `boolean` | true | 拖拽支持 |
| showFileList | `boolean` | true | |

#### Events

| 事件 | 参数 | 说明 |
|---|---|---|
| selected | `File[]` | 文件选中（autoUpload=false 时使用） |
| uploaded | `UploadedFile[]` | 上传完成（autoUpload=true 时使用） |
| upload-progress | `{ file: File, percent: number }` | 上传进度 |
| upload-failed | `{ file: File, error: Error }` | 上传失败 |

#### 示例

```vue
<FilePicker
  accept=".xlsx,.xls"
  @uploaded="onUploaded"
/>

<script setup>
function onUploaded(files) {
  const uploaded = files[0];
  api.task.submit({ name: '导入', payload: { fileId: uploaded.fileId } });
}
</script>
```

### 3.12 DiffView

文本/JSON 对比视图。

#### Props

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| left | `string` | - | 左侧内容 |
| right | `string` | - | 右侧内容 |
| mode | `'text' \| 'json' \| 'sql'` | 'text' | 对比模式 |
| splitView | `boolean` | true | 分屏 vs 行内 |
| height | `string \| number` | 400 | |
| leftLabel | `string` | '左侧' | |
| rightLabel | `string` | '右侧' | |

#### Events

无（只读组件）。

#### 示例

```vue
<DiffView
  :left="oldVersion"
  :right="newVersion"
  mode="json"
  left-label="昨日"
  right-label="今日"
/>
```

---

## 4. 组件主题与样式

### 4.1 CSS 变量

框架基于 Element Plus，所有组件遵循 Element Plus 的 CSS 变量体系：

```css
/* 主色 */
--el-color-primary
--el-color-success
--el-color-warning
--el-color-danger

/* 背景 */
--el-bg-color
--el-bg-color-page
--el-fill-color

/* 文字 */
--el-text-color-primary
--el-text-color-regular
--el-text-color-secondary

/* 边框 */
--el-border-color
--el-border-radius-base
```

插件自定义样式建议都用这些变量，保持视觉一致性。

### 4.2 暗色模式

第一版**不支持**暗色模式。只用浅色主题。

---

## 5. 国际化

第一版**所有文字硬编码中文**，组件不暴露 i18n 配置。

---

## 6. 错误处理

所有 API 调用如果后端报错，框架会**自动弹出错误对话框**。插件代码：

- **不需要** try-catch 来弹错误（重复弹）
- **需要** try-catch 来做业务回滚（撤销 UI 状态等）

```typescript
// 推荐写法
try {
  loading.value = true;
  await api.dataSource.query({ ... });
} catch (e) {
  // 框架已经弹错误对话框了，这里只做 UI 回滚
} finally {
  loading.value = false;
}
```

如果想阻止框架弹默认错误对话框，调用时传 `silent: true` 标志（Phase 2 待实现）。

---

## 7. 性能建议

### 7.1 大表格

`ResultTable` 内部用虚拟滚动，10 万行无压力。但避免一次返回 100 万行——后端用 `maxRows` 限制。

### 7.2 流程图节点数

`FlowChart` 在 1000 节点 / 5000 边以内体验流畅。超过这个量级建议分页或聚合。

### 7.3 频繁更新

避免在 `setInterval` 里高频调用 API（>1Hz）。订阅模式优于轮询。

### 7.4 内存泄漏

- SSE 订阅一定要 unsubscribe
- 大对象 `ref` 在 unmount 时置 null
- 事件监听器卸载时移除

---

## 8. 调试建议

### 8.1 浏览器开发者工具

打开 F12，切到 Console，所有 ToolboxAPI 调用会在 DEBUG 级别打日志：

```
[ToolboxAPI] dataSource.query { dataSourceId: "ds1", sql: "..." }
[ToolboxAPI] task.submit { name: "导入" }
```

### 8.2 Network 面板

所有 HTTP 请求都打到 `/api/**`，可以直接看请求/响应。SSE 流可以看 EventStream 标签页。

### 8.3 Vue Devtools

装 Vue Devtools 浏览器插件，能看到插件的组件树和响应式状态。

---

**文档结束**

*接下来：`04-后端 API 参考.md`*
