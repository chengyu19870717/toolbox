<template>
  <div>
    <el-card>
      <template #header>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span>任务中心</span>
          <el-button @click="load" :loading="loading">刷新</el-button>
        </div>
      </template>

      <el-table :data="tasks" v-loading="loading" stripe>
        <el-table-column prop="name" label="任务名称" min-width="160" />
        <el-table-column prop="pluginId" label="插件" width="140" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="进度" width="200">
          <template #default="{ row }">
            <template v-if="row.status === 'RUNNING'">
              <el-progress :percentage="row.progressPercent ?? 0" :stroke-width="8" style="width:150px" />
              <div class="progress-msg">{{ row.progressMessage }}</div>
            </template>
            <span v-else class="progress-msg">{{ row.progressMessage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" width="160">
          <template #default="{ row }">{{ fmtTime(row.submittedAt) }}</template>
        </el-table-column>
        <el-table-column label="完成时间" width="160">
          <template #default="{ row }">{{ row.finishedAt ? fmtTime(row.finishedAt) : '-' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button v-if="row.status === 'RUNNING' || row.status === 'PENDING'" size="small"
                       type="warning" @click="cancel(row.id)">取消</el-button>
            <template v-if="row.artifacts?.length">
              <el-button v-for="a in row.artifacts" :key="a.name" size="small" type="success"
                         @click="download(row.id, a.name)">{{ a.name }}</el-button>
            </template>
            <el-button v-if="row.errorMessage" size="small" type="danger"
                       @click="showError(row.errorMessage)">错误</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import http from '@/api/http'

interface Artifact { name: string; size: number }
interface Task {
  id: string; name: string; pluginId: string; taskType: string
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
  progressPercent: number; progressMessage: string | null
  submittedAt: string; finishedAt: string | null
  errorMessage: string | null; artifacts: Artifact[]
}

const auth = useAuthStore()
const tasks = ref<Task[]>([])
const loading = ref(false)
let sseSource: EventSource | null = null

async function load() {
  loading.value = true
  try { tasks.value = await http.get('/tasks') }
  finally { loading.value = false }
}

function statusType(s: string) {
  return ({ PENDING: 'info', RUNNING: 'primary', SUCCESS: 'success', FAILED: 'danger', CANCELLED: 'warning' } as any)[s] ?? 'info'
}
function statusLabel(s: string) {
  return ({ PENDING: '等待中', RUNNING: '运行中', SUCCESS: '成功', FAILED: '失败', CANCELLED: '已取消' } as any)[s] ?? s
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleString('zh-CN', { hour12: false })
}

async function cancel(id: string) {
  await ElMessageBox.confirm('确定取消该任务？', '提示', { type: 'warning' })
  await http.post(`/tasks/${id}/cancel`)
  ElMessage.success('已发送取消请求')
  await load()
}

function download(taskId: string, filename: string) {
  const a = document.createElement('a')
  a.href = `/api/tasks/${taskId}/artifacts/${encodeURIComponent(filename)}?token=${auth.token}`
  a.download = filename
  a.click()
}

function showError(msg: string) {
  ElMessageBox.alert(msg, '错误详情', { type: 'error', confirmButtonText: '关闭' })
}

function applyEvent(taskId: string, patch: Partial<Task>) {
  const idx = tasks.value.findIndex(t => t.id === taskId)
  if (idx >= 0) {
    tasks.value[idx] = { ...tasks.value[idx], ...patch }
  } else {
    load() // 未知任务（别的标签页提交的）刷新一下
  }
}

function connectSSE() {
  sseSource = new EventSource(`/sse/tasks?token=${auth.token}`)

  // 后端推送具名事件，必须用 addEventListener 而非 onmessage
  sseSource.addEventListener('progress', (e: MessageEvent) => {
    const d = JSON.parse(e.data)
    applyEvent(d.taskId, {
      status: 'RUNNING',
      progressPercent: d.percent ?? d.progressPercent ?? 0,
      progressMessage: d.message ?? d.progressMessage ?? null,
    })
  })

  sseSource.addEventListener('completed', (e: MessageEvent) => {
    const d = JSON.parse(e.data)
    applyEvent(d.taskId, {
      status: 'SUCCESS',
      progressPercent: 100,
      progressMessage: '完成',
      artifacts: d.artifacts ?? [],
    })
  })

  sseSource.addEventListener('failed', (e: MessageEvent) => {
    const d = JSON.parse(e.data)
    applyEvent(d.taskId, { status: 'FAILED', errorMessage: d.error })
  })

  sseSource.addEventListener('cancelled', (e: MessageEvent) => {
    const d = JSON.parse(e.data)
    applyEvent(d.taskId, { status: 'CANCELLED' })
  })

  sseSource.onerror = () => {
    sseSource?.close()
    setTimeout(connectSSE, 5000)
  }
}

onMounted(() => { load(); connectSSE() })
onUnmounted(() => sseSource?.close())
</script>

<style scoped>
.progress-msg { font-size: 12px; color: #909399; margin-top: 2px; }
</style>
