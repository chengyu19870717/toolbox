<template>
  <div style="height:100%; overflow:auto;">
    <!-- 内置工具直接渲染 -->
    <component v-if="builtinTool" :is="builtinTool.component" style="height:100%;" />
    <template v-else>
      <el-card v-if="error" style="margin:20px; color:#f56c6c;">{{ error }}</el-card>
      <el-skeleton v-else-if="loading" :rows="6" animated style="padding:20px;" />
      <component v-else-if="pluginComponent" :is="pluginComponent" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, onMounted, onUnmounted } from 'vue'
import { BUILTIN_TOOL_MAP } from '@/builtinTools'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useTabStore } from '@/stores/tabs'
import http from '@/api/http'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'

const props = defineProps<{ toolId: string }>()

const auth = useAuthStore()
const tabStore = useTabStore()

const builtinTool = computed(() => BUILTIN_TOOL_MAP.get(props.toolId) ?? null)

const loading = ref(true)
const error = ref('')
const pluginComponent = shallowRef<object | null>(null)
let injectedStyle: HTMLStyleElement | null = null

onMounted(async () => {
  if (builtinTool.value) return  // 内置工具不走插件加载流程
  try {
    const tools: any[] = await http.get('/plugins')
    const tool = tools.find((t: any) => t.id === props.toolId)
    if (!tool) { error.value = `工具 "${props.toolId}" 不存在`; return }

    tabStore.setName(props.toolId, tool.name)

    const mod = await import(/* @vite-ignore */ `/api/plugins/${props.toolId}/frontend.js`)
    injectedStyle = await injectPluginCss(`/api/plugins/${props.toolId}/style.css`)

    pluginComponent.value = await mod.createView(buildApi(props.toolId), props.toolId)
  } catch (e: any) {
    error.value = e?.message ?? '加载插件失败'
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  injectedStyle?.remove()
})

async function injectPluginCss(url: string): Promise<HTMLStyleElement | null> {
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${auth.token}` } })
    if (!res.ok) return null
    const css = await res.text()
    if (!css.trim()) return null
    const style = document.createElement('style')
    style.setAttribute('data-plugin', props.toolId)
    style.textContent = css
    document.head.appendChild(style)
    return style
  } catch { return null }
}

function buildApi(id: string): ToolboxAPI {
  const token = () => auth.token
  const headers = () => ({ Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' })
  const apiFetch = async (path: string, init?: RequestInit) => {
    const res = await fetch(path, { ...init, headers: { ...headers(), ...(init?.headers ?? {}) } })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message ?? res.statusText)
    return data
  }

  return {
    toolId: id,

    dataSource: {
      list: () => apiFetch('/api/datasources'),
      query: (req) => apiFetch('/api/datasources/query', { method: 'POST', body: JSON.stringify(req) }),
      testConnection: (dataSourceId) => apiFetch(`/api/datasources/${dataSourceId}/test`, { method: 'POST' }),
    },

    task: {
      submit: (req) => apiFetch(`/api/plugins/${id}/tasks`, { method: 'POST', body: JSON.stringify(req) }),
      get: (taskId) => apiFetch(`/api/tasks/${taskId}`),
      cancel: (taskId) => apiFetch(`/api/tasks/${taskId}/cancel`, { method: 'POST' }),
      subscribe(taskId, handlers) {
        const es = new EventSource(`/sse/tasks/${taskId}?token=${token()}`)
        es.addEventListener('progress', (e: any) => {
          const d = JSON.parse(e.data)
          handlers.onProgress?.({ percent: d.percent ?? d.progressPercent ?? 0, message: d.message ?? d.progressMessage })
        })
        es.addEventListener('completed', (e: any) => {
          const d = JSON.parse(e.data)
          handlers.onCompleted?.(d.artifacts ?? [], d.summary ?? {})
          es.close()
        })
        es.addEventListener('failed', (e: any) => {
          handlers.onFailed?.(JSON.parse(e.data).error ?? '任务失败')
          es.close()
        })
        es.addEventListener('cancelled', () => { handlers.onCancelled?.(); es.close() })
        es.addEventListener('status', (e: any) => {
          const d = JSON.parse(e.data)
          handlers.onProgress?.({ percent: d.progressPercent ?? 0, message: d.progressMessage })
        })
        return () => es.close()
      },
    },

    plugin: {
      callSync: (action, params) =>
        apiFetch(`/api/plugins/${id}/sync`, { method: 'POST', body: JSON.stringify({ action, params }) }),
    },

    file: {
      upload: async (file, onProgress) => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/files/upload')
        xhr.setRequestHeader('Authorization', `Bearer ${token()}`)
        xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress?.(Math.round(e.loaded / e.total * 100)) }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText))
          else reject(new Error(JSON.parse(xhr.responseText).message ?? '上传失败'))
        }
        xhr.onerror = () => reject(new Error('网络错误'))
        const form = new FormData()
        form.append('file', file)
        xhr.send(form)
      }),
      downloadUrl: (taskId, name) => `/api/tasks/${taskId}/artifacts/${encodeURIComponent(name)}?token=${token()}`,
      download: (taskId, name) => {
        const a = document.createElement('a')
        a.href = `/api/tasks/${taskId}/artifacts/${encodeURIComponent(name)}?token=${token()}`
        a.download = name; a.click()
      },
    },

    tab: {
      setTitle: (title) => tabStore.setName(id, title),
      close: () => tabStore.close(id),
      onBeforeClose: (_handler) => () => {},
    },

    notification: {
      success: (msg) => ElMessage.success(msg),
      warning: (msg) => ElMessage.warning(msg),
      error:   (msg) => ElMessage.error(msg),
      info:    (msg) => ElMessage.info(msg),
    },

    user: {
      username: auth.username,
      role: auth.role as 'USER' | 'ADMIN',
    },
  }
}
</script>
