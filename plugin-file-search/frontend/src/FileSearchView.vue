<template>
  <div class="fs-root">
    <!-- 左侧：目录管理面板 -->
    <div class="fs-sidebar">
      <div class="sidebar-header">
        <span class="sidebar-title">检索目录</span>
        <el-tooltip content="添加目录" placement="right">
          <el-button type="primary" size="small" :icon="Plus" @click="showAddDir = true" />
        </el-tooltip>
      </div>

      <div class="dir-list">
        <div v-for="dir in dirs" :key="dir.id" class="dir-item">
          <el-icon class="dir-icon"><Folder /></el-icon>
          <div class="dir-info">
            <div class="dir-name" :title="dir.path">{{ dir.name }}</div>
            <div class="dir-meta">
              {{ dir.lastScan ? '已扫描 ' + fmtScanTime(dir.lastScan) : '尚未扫描' }}
            </div>
          </div>
          <div class="dir-actions" @click.stop>
            <el-tooltip content="更新索引" placement="top">
              <el-button
                size="small" text type="primary" :icon="Refresh"
                :loading="scanningId === dir.id"
                @click="scanDir(dir)"
              />
            </el-tooltip>
            <el-tooltip content="删除目录" placement="top">
              <el-button size="small" text type="danger" :icon="Delete"
                         @click="removeDir(dir)" />
            </el-tooltip>
          </div>
        </div>

        <div v-if="dirs.length === 0" class="dir-empty">
          <el-icon><FolderOpened /></el-icon>
          <p>点击 + 添加检索目录</p>
        </div>
      </div>

      <div v-if="stats" class="sidebar-footer">
        {{ stats.totalDirs }} 个目录 · {{ stats.totalFiles }} 个文件
      </div>
    </div>

    <!-- 右侧：搜索与结果 -->
    <div class="fs-main">
      <div class="search-bar">
        <el-input
          v-model="keyword"
          placeholder="输入文件名关键字模糊搜索，为空则显示全部"
          clearable
          size="large"
          :prefix-icon="Search"
          @input="onKeywordChange"
          @clear="() => { page = 1; doSearch() }"
        />
        <el-select v-model="extFilter" placeholder="全部类型" clearable style="width:150px"
                   @change="() => { page = 1; doSearch() }">
          <el-option label="全部类型" value="" />
          <el-option-group label="Word">
            <el-option label=".docx" value=".docx" />
            <el-option label=".doc"  value=".doc" />
            <el-option label=".wps"  value=".wps" />
          </el-option-group>
          <el-option-group label="Excel">
            <el-option label=".xlsx" value=".xlsx" />
            <el-option label=".xls"  value=".xls" />
            <el-option label=".et"   value=".et" />
          </el-option-group>
          <el-option-group label="PPT">
            <el-option label=".pptx" value=".pptx" />
            <el-option label=".ppt"  value=".ppt" />
            <el-option label=".dps"  value=".dps" />
          </el-option-group>
        </el-select>
        <el-button type="primary" :icon="Search" :loading="searching" @click="() => { page = 1; doSearch() }">
          搜索
        </el-button>
      </div>

      <!-- 扫描任务进度提示 -->
      <div v-if="scanMsg" class="scan-panel">
        <div class="scan-panel__main">
          <div class="scan-panel__text">{{ scanMsg }}</div>
          <el-progress :percentage="scanPercent" :stroke-width="8" />
        </div>
        <el-button
          v-if="activeScanTaskId"
          size="small"
          type="warning"
          @click="cancelScan"
        >
          取消扫描
        </el-button>
      </div>

      <!-- 目录添加警告（路径不存在） -->
      <el-alert
        v-if="addWarn"
        :title="addWarn"
        type="warning"
        show-icon
        :closable="true"
        @close="addWarn = ''"
        style="margin-bottom:0"
      />

      <el-table
        :data="fileList"
        v-loading="searching"
        stripe border
        style="width:100%;flex:1;min-height:0"
        :empty-text="emptyText"
      >
        <el-table-column label="类型" width="64" align="center">
          <template #default="{ row }">
            <span :class="extClass(row.ext)" class="ext-badge">{{ row.ext }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="文件名" min-width="220" show-overflow-tooltip />
        <el-table-column prop="fullPath" label="文件路径" min-width="340" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="path-text">{{ row.fullPath }}</span>
          </template>
        </el-table-column>
        <el-table-column label="大小" width="90" align="right">
          <template #default="{ row }">{{ formatSize(row.fileSize) }}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="160" show-overflow-tooltip>
          <template #default="{ row }">{{ formatDate(row.modified) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center" fixed="right">
          <template #default="{ row }">
            <el-tooltip content="在文件管理器中定位" placement="top">
              <el-button size="small" text type="primary"
                         :icon="FolderOpened" @click="openFile(row)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-bar">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @current-change="doSearch"
          @size-change="() => { page = 1; doSearch() }"
        />
      </div>
    </div>

    <!-- 添加目录对话框 -->
    <el-dialog v-model="showAddDir" title="添加检索目录" width="500px" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="目录路径" required>
          <el-input v-model="addForm.path"
                    placeholder="Windows 示例：D:\工作文档\项目资料" />
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="addForm.name" placeholder="留空则使用路径作为名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDir = false">取消</el-button>
        <el-button type="primary" :loading="addingDir" @click="addDir">添加</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Refresh, Delete, Search, Folder, FolderOpened } from '@element-plus/icons-vue'

const props = defineProps<{ api: any; toolId: string }>()

// ── 状态 ─────────────────────────────────────────────────────────────────────

const dirs       = ref<any[]>([])
const stats      = ref<any>(null)
const scanningId = ref('')
const scanMsg    = ref('')
const scanPercent = ref(0)
const activeScanTaskId = ref('')
const addWarn    = ref('')

const keyword    = ref('')
const extFilter  = ref('')
const fileList   = ref<any[]>([])
const total      = ref(0)
const page       = ref(1)
const pageSize   = ref(50)
const searching  = ref(false)
const initialized = ref(false)   // 首次搜索完成前不渲染"未找到"

const showAddDir = ref(false)
const addingDir  = ref(false)
const addForm    = ref({ path: '', name: '' })

let debounceTimer: ReturnType<typeof setTimeout> | null = null
let scanUnsubscribe: (() => void) | null = null

const emptyText = computed(() => {
  if (!initialized.value) return '正在加载…'
  if (dirs.value.length === 0) return '请先点击左侧 + 添加检索目录'
  return keyword.value || extFilter.value ? '未找到匹配文件' : '暂无已索引文件，请点击目录右侧刷新按钮更新索引'
})

// ── 生命周期 ─────────────────────────────────────────────────────────────────

onMounted(async () => {
  await Promise.all([loadDirs(), loadStats()])
  await doSearch()          // 初始展示全量文件
  initialized.value = true
})

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
  scanUnsubscribe?.()
})

// ── 目录操作 ─────────────────────────────────────────────────────────────────

async function loadDirs() {
  try {
    const res = await call('listDirs', {})
    dirs.value = res.dirs ?? []
  } catch { /* 框架已弹错误 */ }
}

async function loadStats() {
  try {
    stats.value = await call('stats', {})
  } catch { /* ignore */ }
}

async function addDir() {
  if (!addForm.value.path.trim()) {
    ElMessage.warning('请输入目录路径')
    return
  }
  addingDir.value = true
  try {
    const res = await call('addDir', { path: addForm.value.path, name: addForm.value.name })
    showAddDir.value = false
    addForm.value = { path: '', name: '' }
    await loadDirs()
    await loadStats()
    if (res.warn) {
      addWarn.value = res.warn
    } else {
      ElMessage.success('目录已添加，请点击目录右侧刷新按钮更新索引')
    }
  } catch { /* 框架已弹错误 */ } finally {
    addingDir.value = false
  }
}

async function removeDir(dir: any) {
  try {
    await ElMessageBox.confirm(
      `确认删除目录"${dir.name}"及其文件索引？此操作不可撤销。`,
      '删除确认', { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' }
    )
  } catch { return }  // 用户取消
  try {
    await call('removeDir', { id: dir.id })
    await loadDirs()
    await loadStats()
    doSearch()
    ElMessage.success('已删除')
  } catch { /* 框架已弹错误 */ }
}

async function scanDir(dir: any) {
  scanningId.value = dir.id
  scanMsg.value = `正在扫描"${dir.name}"，请稍候…`
  scanPercent.value = 0
  activeScanTaskId.value = ''
  try {
    // 通过 TaskHandler 异步扫描
    const taskRes = await props.api.task.submit({
      taskType: 'file-search-scan',
      name:     '扫描目录：' + dir.name,
      payload:  { id: dir.id }
    })
    activeScanTaskId.value = taskRes.taskId
    // 等待任务完成
    await waitTask(taskRes.taskId)
    scanMsg.value = ''
    await loadDirs()
    await loadStats()
    doSearch()
  } catch { /* 框架已弹错误 */ } finally {
    scanningId.value = ''
    scanMsg.value = ''
    scanPercent.value = 0
    activeScanTaskId.value = ''
    scanUnsubscribe?.()
    scanUnsubscribe = null
  }
}

/** 通过 SSE 等待任务完成，保留轻量快照轮询兜底，避免极快任务错过 completed 事件。 */
async function waitTask(taskId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let settled = false
    let snapshotTimer: ReturnType<typeof setInterval> | null = null
    let timeoutTimer: ReturnType<typeof setTimeout> | null = null

    const cleanup = () => {
      scanUnsubscribe?.()
      scanUnsubscribe = null
      if (snapshotTimer) clearInterval(snapshotTimer)
      if (timeoutTimer) clearTimeout(timeoutTimer)
    }

    const finish = (ok: boolean, error?: Error) => {
      if (settled) return
      settled = true
      cleanup()
      ok ? resolve() : reject(error ?? new Error('扫描失败'))
    }

    const applySnapshot = (task: any) => {
      if (task.progressPercent != null) {
        scanPercent.value = Math.max(0, Math.min(100, task.progressPercent))
        scanMsg.value = task.progressMessage || `正在扫描（${scanPercent.value}%）…`
      }
      if (task.status === 'SUCCESS') {
        ElMessage.success(`扫描完成，共发现 ${task.summary?.count ?? 0} 个文件`)
        finish(true)
      } else if (task.status === 'FAILED') {
        ElMessage.error('扫描失败：' + (task.errorMessage || '未知错误'))
        finish(false, new Error(task.errorMessage || '扫描失败'))
      } else if (task.status === 'CANCELLED') {
        ElMessage.warning('扫描已取消')
        finish(false, new Error('扫描已取消'))
      }
    }

    scanUnsubscribe?.()
    scanUnsubscribe = props.api.task.subscribe(taskId, {
      onProgress: (evt: any) => {
        scanPercent.value = Math.max(0, Math.min(100, evt.percent ?? 0))
        scanMsg.value = evt.message || `正在扫描（${scanPercent.value}%）…`
      },
      onCompleted: (_artifacts: any[], summary?: Record<string, any>) => {
        scanPercent.value = 100
        ElMessage.success(`扫描完成，共发现 ${summary?.count ?? 0} 个文件`)
        finish(true)
      },
      onFailed: (error: string) => {
        ElMessage.error('扫描失败：' + (error || '未知错误'))
        finish(false, new Error(error || '扫描失败'))
      },
      onCancelled: () => {
        ElMessage.warning('扫描已取消')
        finish(false, new Error('扫描已取消'))
      },
    })

    const refreshSnapshot = async () => {
      try { applySnapshot(await props.api.task.get(taskId)) }
      catch { /* 等待 SSE 或下一次快照 */ }
    }
    refreshSnapshot()
    snapshotTimer = setInterval(refreshSnapshot, 3000)
    timeoutTimer = setTimeout(() => {
      ElMessage.warning('扫描超时，请稍后手动刷新')
      finish(false, new Error('扫描超时'))
    }, 5 * 60 * 1000)
  })
}

async function cancelScan() {
  if (!activeScanTaskId.value) return
  await props.api.task.cancel(activeScanTaskId.value)
  scanMsg.value = '正在取消扫描…'
}

// ── 搜索 ─────────────────────────────────────────────────────────────────────

function onKeywordChange() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    page.value = 1
    doSearch()
  }, 300)
}

async function doSearch() {
  searching.value = true
  try {
    const res = await call('search', {
      keyword:  keyword.value,
      ext:      extFilter.value,
      page:     page.value,
      pageSize: pageSize.value,
    })
    fileList.value = res.list ?? []
    total.value    = res.total ?? 0
  } catch { /* 框架已弹错误 */ } finally {
    searching.value = false
  }
}

async function openFile(row: any) {
  try {
    await call('openFile', { path: row.fullPath })
  } catch { /* 框架已弹错误 */ }
}

// ── 工具函数 ─────────────────────────────────────────────────────────────────

function call(action: string, params: Record<string, any>) {
  return props.api.plugin.callSync(action, params)
}

function formatSize(bytes: number): string {
  if (!bytes) return '-'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

function formatDate(str: string): string {
  if (!str) return '-'
  // ISO 格式：2024-03-01T12:30:00.000Z → 2024-03-01 12:30
  return str.replace('T', ' ').replace(/\.\d+Z$/, '').substring(0, 16)
}

function fmtScanTime(str: string): string {
  return str ? str.substring(0, 16) : ''
}

function extClass(ext: string): string {
  const e = (ext || '').toLowerCase()
  if (['.doc', '.docx', '.wps'].includes(e))  return 'ext-word'
  if (['.xls', '.xlsx', '.et'].includes(e))   return 'ext-excel'
  if (['.ppt', '.pptx', '.dps'].includes(e))  return 'ext-ppt'
  return 'ext-other'
}
</script>

<style scoped>
.fs-root {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* ── 左侧目录面板 ─────────────────────────────────────────────── */
.fs-sidebar {
  width: 240px;
  min-width: 200px;
  border-right: 1px solid var(--el-border-color-light, #ebeef5);
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color-page, #f5f7fa);
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 8px;
  border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
}

.sidebar-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.dir-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px 0;
}

.dir-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  margin: 2px 6px;
  transition: background 0.15s;
}
.dir-item:hover { background: var(--el-fill-color, #f0f2f5); }

.dir-icon { color: #e6a23c; font-size: 18px; flex-shrink: 0; }

.dir-info { flex: 1; min-width: 0; }
.dir-name {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dir-meta { font-size: 11px; color: var(--el-text-color-secondary); margin-top: 2px; }

.dir-actions { display: flex; align-items: center; }

.dir-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: var(--el-text-color-placeholder);
  font-size: 13px;
  gap: 8px;
}
.dir-empty .el-icon { font-size: 32px; }

.sidebar-footer {
  padding: 8px 12px;
  font-size: 11px;
  color: var(--el-text-color-secondary);
  border-top: 1px solid var(--el-border-color-light, #ebeef5);
  text-align: center;
}

/* ── 右侧主区域 ─────────────────────────────────────────────── */
.fs-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 12px;
  gap: 10px;
}

.search-bar {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.scan-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--el-color-primary-light-7, #a0cfff);
  border-radius: 6px;
  background: var(--el-color-primary-light-9, #ecf5ff);
}

.scan-panel__main {
  flex: 1;
  min-width: 0;
}

.scan-panel__text {
  margin-bottom: 6px;
  font-size: 13px;
  color: var(--el-text-color-primary);
}

.path-text {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.pagination-bar {
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  padding-top: 2px;
}

/* ── 文件类型徽章 ─────────────────────────────────────────────── */
.ext-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 3px;
}
.ext-word  { background: #dbeafe; color: #1d4ed8; }
.ext-excel { background: #dcfce7; color: #15803d; }
.ext-ppt   { background: #ffedd5; color: #c2410c; }
.ext-other { background: #f3f4f6; color: #6b7280; }
</style>
