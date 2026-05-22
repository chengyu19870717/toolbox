/** 数据源信息 */
export interface DataSourceInfo {
  id: string
  name: string
  type: string
  host: string
  port: number
  database: string
  username: string
  remark: string
}

/** 查询请求 */
export interface QueryRequest {
  dataSourceId: string
  sql: string
  params?: unknown[]
  timeoutSeconds?: number
  maxRows?: number
}

/** 列元数据 */
export interface ColumnMeta {
  name: string
  jdbcType: string
  nullable: boolean
}

/** 查询结果（后端原始格式，使用前需转换） */
export interface QueryResult {
  columns: ColumnMeta[]
  rows: unknown[][]
  rowCount: number
  truncated: boolean
  durationMs: number
}

/** 任务信息 */
export interface TaskInfo {
  id: string
  name: string
  pluginId: string
  taskType: string
  username: string
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
  progressPercent: number | null
  progressMessage: string | null
  submittedAt: string
  startedAt: string | null
  finishedAt: string | null
  errorMessage: string | null
  artifacts: Artifact[]
  summary: Record<string, unknown>
}

export interface Artifact {
  name: string
  contentType: string
  sizeBytes: number
}

export interface TaskSubmitRequest {
  name?: string
  taskType?: string
  /** @deprecated use taskType */
  type?: string
  payload: Record<string, unknown>
}

export interface ProgressEvent {
  percent: number
  message?: string
}

/** 数据源 API */
export interface DataSourceAPI {
  list(): Promise<DataSourceInfo[]>
  query(req: QueryRequest): Promise<QueryResult>
  testConnection(dataSourceId: string): Promise<{ ok: boolean; message?: string; durationMs: number }>
}

/** 任务 API */
export interface TaskAPI {
  /** toolId 由框架注入，插件无需传递 */
  submit(req: TaskSubmitRequest): Promise<{ taskId: string }>
  get(taskId: string): Promise<TaskInfo>
  cancel(taskId: string): Promise<void>
  /** 订阅任务进度，返回取消函数 */
  subscribe(
    taskId: string,
    handlers: {
      onProgress?: (evt: ProgressEvent) => void
      onCompleted?: (artifacts: Artifact[], summary?: Record<string, unknown>) => void
      onFailed?: (error: string) => void
      onCancelled?: () => void
    }
  ): () => void
}

/** 插件同步调用 API */
export interface PluginAPI {
  callSync(action: string, params?: Record<string, unknown>): Promise<unknown>
}

/** 文件 API */
export interface FileAPI {
  upload(file: File, onProgress?: (percent: number) => void): Promise<{
    fileId: string
    originalName: string
    path: string
    sizeBytes: number
    contentType: string
    uploadedAt: string
  }>
  downloadUrl(taskId: string, name: string): string
  download(taskId: string, name: string): void
}

/** 标签页 API */
export interface TabAPI {
  setTitle(title: string): void
  close(): void
  /** 注册关闭前回调（当前路由模式下不支持拦截，注册无效），返回注销函数 */
  onBeforeClose(handler: () => boolean | Promise<boolean>): () => void
}

/** 当前登录用户信息 */
export interface UserInfo {
  username: string
  role: 'USER' | 'ADMIN'
}

/** 通知 API */
export interface NotificationAPI {
  success(message: string): void
  warning(message: string): void
  error(message: string): void
  info(message: string): void
}

/** SDK 根接口，由框架注入到插件 createView 工厂函数 */
export interface ToolboxAPI {
  toolId: string
  dataSource: DataSourceAPI
  task: TaskAPI
  plugin: PluginAPI
  file: FileAPI
  tab: TabAPI
  user: UserInfo
  notification: NotificationAPI
}
