<template>
  <el-container style="height: 100vh;">
    <!-- 左侧导航 -->
    <el-aside width="220px" style="background:#001529; overflow:hidden;">
      <div class="logo">ToolBox</div>
      <el-menu :default-active="activeIndex" background-color="#001529"
               text-color="#c0c4cc" active-text-color="#409eff">

        <!-- 工具箱：可展开子菜单 -->
        <el-sub-menu index="tools">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>工具箱</span>
          </template>
          <el-menu-item
            v-for="tool in tools" :key="tool.id"
            :index="`tool-${tool.id}`"
            @click="openTool(tool)"
            style="padding-left:36px;"
          >
            <el-tooltip
              :content="tool.description"
              placement="right"
              effect="light"
              :show-after="400"
              :hide-after="0"
            >
              <span style="display:flex; align-items:center; gap:8px; width:100%; overflow:hidden;">
                <el-icon style="flex-shrink:0;"><component :is="iconMap[tool.icon] ?? 'Tools'" /></el-icon>
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">{{ tool.name }}</span>
              </span>
            </el-tooltip>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/datasources" @click="navigate('/datasources')">
          <el-icon><Connection /></el-icon>
          <span>数据源管理</span>
        </el-menu-item>
        <el-menu-item index="/tasks" @click="navigate('/tasks')">
          <el-icon><List /></el-icon>
          <span>任务中心</span>
        </el-menu-item>
        <el-menu-item index="/sys-dashboard" @click="navigate('/sys-dashboard')">
          <el-icon><DataBoard /></el-icon>
          <span>系统管理看板</span>
        </el-menu-item>
        <el-menu-item v-if="auth.role === 'ADMIN'" index="/users" @click="navigate('/users')">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="flex-direction:column; overflow:hidden;">
      <!-- 顶栏 -->
      <el-header style="background:#fff; display:flex; align-items:center; justify-content:flex-end;
                        padding:0 20px; border-bottom:1px solid #ebeef5; flex-shrink:0;">
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

      <!-- 页签栏 -->
      <div v-if="tabStore.tabs.length > 0" class="tab-bar">
        <div
          v-for="tab in tabStore.tabs" :key="tab.toolId"
          :class="['tab-item', { active: tabStore.activeToolId === tab.toolId }]"
          @click="tabStore.activate(tab.toolId)"
        >
          <span class="tab-name">{{ tab.name }}</span>
          <el-icon class="tab-close" @click.stop="tabStore.close(tab.toolId)"><Close /></el-icon>
        </div>
      </div>

      <!-- 主内容 -->
      <div class="main-content" :style="tabStore.activeToolId ? 'padding:0;' : 'padding:20px; overflow:auto;'">
        <!-- 工具页签面板（v-show 保持挂载，切换不重载） -->
        <div
          v-for="tab in tabStore.tabs" :key="tab.toolId"
          v-show="tabStore.activeToolId === tab.toolId"
          style="height:100%;"
        >
          <ToolTabPanel :toolId="tab.toolId" />
        </div>

        <!-- 普通路由视图 -->
        <div v-show="!tabStore.activeToolId" style="height:100%;">
          <router-view />
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useTabStore } from '@/stores/tabs'
import ToolTabPanel from './ToolTabPanel.vue'
import http from '@/api/http'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const tabStore = useTabStore()

interface Tool { id: string; name: string; category: string; description: string; icon: string }
const tools = ref<Tool[]>([])
const iconMap: Record<string, string> = {
  'mdi-database': 'DataBase',
  'mdi-file-excel': 'Document',
  'mdi-sitemap': 'Share',
  'mdi-checkbox-marked-outline': 'Finished',
  'mdi-folder-search': 'FolderOpened',
}

// 侧边栏高亮：tab 激活时高亮对应工具项，否则高亮当前路由
const activeIndex = computed(() =>
  tabStore.activeToolId ? `tool-${tabStore.activeToolId}` : route.path
)

function openTool(tool: Tool) {
  tabStore.open(tool.id, tool.name)
}

function navigate(path: string) {
  tabStore.activate(null)
  router.push(path)
}

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

onMounted(async () => {
  connectNotifications()
  try {
    tools.value = await http.get('/plugins')
  } catch { /* 插件列表加载失败时侧边栏不展示工具子项 */ }
})
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

/* 页签栏 */
.tab-bar {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 8px;
  height: 36px;
  flex-shrink: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.tab-bar::-webkit-scrollbar { display: none; }

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px 0 14px;
  height: 28px;
  margin-right: 4px;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  font-size: 13px;
  color: #606266;
  background: #e8eaed;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  white-space: nowrap;
  transition: background 0.15s;
  flex-shrink: 0;
}
.tab-item:hover { background: #ecf5ff; color: #409eff; }
.tab-item.active {
  background: #fff;
  color: #303133;
  border-color: #e4e7ed;
  font-weight: 500;
}
.tab-name { max-width: 120px; overflow: hidden; text-overflow: ellipsis; }
.tab-close {
  font-size: 12px;
  color: #909399;
  border-radius: 50%;
  padding: 1px;
}
.tab-close:hover { background: #c0c4cc; color: #fff; }

/* 主内容区 */
.main-content {
  flex: 1;
  overflow: hidden;
  background: #f0f2f5;
}
</style>
