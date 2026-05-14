<template>
  <el-container style="height: 100vh;">
    <!-- 左侧导航 -->
    <el-aside width="220px" style="background:#001529; overflow:hidden;">
      <div class="logo">ToolBox</div>
      <el-menu :default-active="route.path" router background-color="#001529"
               text-color="#c0c4cc" active-text-color="#409eff">
        <el-menu-item index="/tools">
          <el-icon><Grid /></el-icon>
          <span>工具箱</span>
        </el-menu-item>
        <el-menu-item index="/datasources">
          <el-icon><Connection /></el-icon>
          <span>数据源管理</span>
        </el-menu-item>
        <el-menu-item index="/tasks">
          <el-icon><List /></el-icon>
          <span>任务中心</span>
        </el-menu-item>
        <el-menu-item v-if="auth.role === 'ADMIN'" index="/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶栏 -->
      <el-header style="background:#fff; display:flex; align-items:center; justify-content:flex-end;
                        padding:0 20px; border-bottom:1px solid #ebeef5;">
        <el-dropdown @command="handleCommand">
          <span class="user-info">
            <el-icon><UserFilled /></el-icon>
            {{ auth.username }}
            <el-icon style="margin-left:4px;"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- 主内容 -->
      <el-main style="background:#f0f2f5; padding:20px;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

let notificationSse: EventSource | null = null

function connectNotifications() {
  notificationSse = new EventSource(`/sse/notifications?token=${auth.token}`)
  notificationSse.addEventListener('notification', (e: MessageEvent) => {
    const d = JSON.parse(e.data)
    const level = (d.level ?? 'INFO').toUpperCase()
    const type = level === 'SUCCESS' ? 'success' : level === 'WARNING' ? 'warning' : level === 'ERROR' ? 'error' : 'info'
    ElNotification({ type, message: d.message, duration: 4000 })
  })
  notificationSse.onerror = () => {
    notificationSse?.close()
    setTimeout(connectNotifications, 10_000)
  }
}

onMounted(connectNotifications)
onUnmounted(() => notificationSse?.close())

function handleCommand(cmd: string) {
  if (cmd === 'logout') {
    notificationSse?.close()
    auth.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.logo {
  height: 60px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 20px; font-weight: bold; letter-spacing: 2px;
}
.user-info {
  display: flex; align-items: center; gap: 4px; cursor: pointer; color: #303133;
}
</style>
