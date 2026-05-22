<template>
  <div>
    <el-page-header @back="router.back()" :content="currentTitle" style="margin-bottom:16px;" />
    <el-card v-if="error" style="color:#f56c6c; padding:8px;">{{ error }}</el-card>
    <el-skeleton v-else-if="loading" :rows="6" animated />
    <component v-else-if="pluginComponent" :is="pluginComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import http from '@/api/http'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const toolId = route.params.toolId as string

const loading = ref(true)
const error = ref('')
const currentTitle = ref(toolId)
const pluginComponent = shallowRef<object | null>(null)

// 插件注入的 CSS 节点，卸载时移除
let injectedStyle: HTMLStyleElement | null = null

onMounted(async () => {
  try {
    const tools: any[] = await http.get('/plugins')
    const tool = tools.find((t: any) => t.id === toolId)
    if (!tool) { error.value = `工具 "${toolId}" 不存在`; return }
    currentTitle.value = tool.name

    // 加载插件前端 bundle（ES module）
    const bundleUrl = `/api/plugins/${toolId}/frontend.js`
    const mod = await import(/* @vite-ignore */ bundleUrl)

    // 注入插件 CSS（bundle 同目录下的 style.css）
    await injectPluginCss(`/api/plugins/${toolId}/style.css`)

    const api = buildApi(toolId)
    pluginComponent.value = await mod.createView(api, toolId)
  } catch (e: any) {
    error.value = e?.message ?? '加载插件失败'
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  injectedStyle?.remove()
})

async function injectPluginCss(url: string) {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    if (!res.ok) return
    const css = await res.text()
    if (!css.trim()) return
    const style = document.createElement('style')
    style.setAttribute('data-plugin', toolId)
    style.textContent = css
    document.head.appendChild(style)
    injectedStyle = style
  } catch { /* 没有 CSS 文件时忽略 */ }
}

function buildApi(id: string): ToolboxAPI {
  // 从 store 读，保证 token 刷新后下一次请求能取到新值
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

    // submit 签名：submit(req)，toolId 从注入上下文取
    task: {
      submit: (req) => apiFetch(`/api/plugins/${id}/tasks`, { method: 'POST', body: JSON.stringify(req) }),
      get: (taskId) => apiFetch(`/api/tasks/${taskId}`),
      cancel: (taskId) => apiFetch(`/api/tasks/${taskId}/cancel`, { method: 'POST' }),
      subscribe(taskId, handlers) {
        const es = new EventSource(`/sse/tasks/${taskId}?token=${token()}`)

        // 后端事件名：progress / completed / failed / cancelled / log
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
        es.addEventListener('cancelled', () => {
          handlers.onCancelled?.()
          es.close()
        })
        // status 事件（单任务 subscribe 的初始推送）
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
      upload: async (file, onProgress) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('POST', '/api/files/upload')
          xhr.setRequestHeader('Authorization', `Bearer ${token()}`)
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) onProgress?.(Math.round(e.loaded / e.total * 100))
          }
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText))
            else reject(new Error(JSON.parse(xhr.responseText).message ?? '上传失败'))
          }
          xhr.onerror = () => reject(new Error('网络错误'))
          const form = new FormData()
          form.append('file', file)
          xhr.send(form)
        })
      },
      downloadUrl: (taskId, name) => `/api/tasks/${taskId}/artifacts/${encodeURIComponent(name)}?token=${token()}`,
      download: (taskId, name) => {
        const a = document.createElement('a')
        a.href = `/api/tasks/${taskId}/artifacts/${encodeURIComponent(name)}?token=${token()}`
        a.download = name
        a.click()
      },
    },

    tab: {
      setTitle: (title) => { currentTitle.value = title },
      close: () => router.back(),
      onBeforeClose: (_handler) => () => {},  // 当前单页路由模式下不支持拦截
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
