<template>
  <div>
    <el-card>
      <template #header>工具箱</template>
      <el-empty v-if="!tools.length" description="暂无可用工具，请在 plugins/ 目录放入插件 jar 并重启" />
      <div v-else class="tool-grid">
        <el-card v-for="tool in tools" :key="tool.id" class="tool-card" shadow="hover"
                 @click="tabStore.open(tool.id, tool.name)">
          <div class="tool-icon">
            <el-icon size="32"><component :is="iconMap[tool.icon] ?? 'Tools'" /></el-icon>
          </div>
          <div class="tool-name">{{ tool.name }}</div>
          <div class="tool-category">{{ tool.category }}</div>
          <div class="tool-desc">{{ tool.description }}</div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/api/http'
import { useTabStore } from '@/stores/tabs'
import { BUILTIN_TOOLS } from '@/builtinTools'

const tabStore = useTabStore()

interface Tool { id: string; name: string; category: string; description: string; icon: string }

const tools = ref<Tool[]>([])
const iconMap: Record<string, string> = {
  'mdi-database': 'DataBase',
  'mdi-file-excel': 'Document',
  'mdi-sitemap': 'Share',
  'mdi-monitor-dashboard': 'DataBoard',
}

onMounted(async () => {
  const pluginTools: Tool[] = await http.get('/plugins')
  tools.value = [...BUILTIN_TOOLS, ...pluginTools]
})
</script>

<style scoped>
.tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
.tool-card { cursor: pointer; text-align: center; padding: 16px 8px; }
.tool-icon { color: #409eff; margin-bottom: 8px; }
.tool-name { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
.tool-category { font-size: 12px; color: #909399; margin-bottom: 4px; }
.tool-desc { font-size: 12px; color: #606266; }
</style>
