<template>
  <div class="dashboard-root">
    <!-- 文件上传区 -->
    <el-card class="upload-card" shadow="never">
      <template #header>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span style="font-weight:600;">数据文件上传</span>
          <el-button size="small" type="danger" plain :disabled="!store.allLoaded" @click="store.clearAll()">
            清空所有数据
          </el-button>
        </div>
      </template>
      <el-row :gutter="12">
        <el-col v-for="def in FILE_DEFS" :key="def.key" :span="Math.floor(24 / FILE_DEFS.length)">
          <div class="file-slot" :class="{ loaded: !!store.data[def.key] }">
            <div class="file-slot-label">
              <el-icon v-if="store.data[def.key]" color="#67c23a"><CircleCheckFilled /></el-icon>
              <el-icon v-else color="#c0c4cc"><Document /></el-icon>
              {{ def.label }}
            </div>
            <div v-if="store.fileNames[def.key]" class="file-name">
              {{ store.fileNames[def.key] }}
            </div>
            <div v-else class="file-hint">支持 .xlsx / .xls / .csv / .txt</div>
            <div style="margin-top:8px; display:flex; gap:6px; justify-content:center;">
              <el-upload
                :show-file-list="false"
                accept=".xlsx,.xls,.csv,.txt"
                :before-upload="(file: any) => handleUpload(def.key, file)"
                action="#"
                :auto-upload="false"
                :on-change="(f: any) => handleUpload(def.key, f.raw)"
              >
                <el-button size="small" :loading="!!store.loading[def.key]">
                  {{ store.data[def.key] ? '重新上传' : '选择文件' }}
                </el-button>
              </el-upload>
              <el-button v-if="store.data[def.key]" size="small" plain type="danger"
                         @click="store.clearFile(def.key)">清除</el-button>
            </div>
            <div v-if="store.data[def.key]" class="file-rows">
              {{ store.data[def.key]!.length }} 行数据
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 分析看板（文件未就绪时禁用） -->
    <el-card shadow="never" style="margin-top:16px; flex:1; overflow:hidden; display:flex; flex-direction:column;">
      <template #header>
        <span style="font-weight:600;">分析看板</span>
        <el-tag v-if="!store.allLoaded" type="warning" size="small" style="margin-left:8px;">
          请先上传全部数据文件
        </el-tag>
      </template>

      <div v-if="!store.allLoaded" class="empty-placeholder">
        <el-empty description="请上传全部数据文件后开始分析" />
      </div>

      <el-tabs v-else v-model="activeTab" class="analysis-tabs">
        <el-tab-pane
          v-for="panel in panels"
          :key="panel.key"
          :label="panel.label"
          :name="panel.key"
          lazy
        >
          <component :is="panel.component" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { CircleCheckFilled, Document } from '@element-plus/icons-vue'
import { useSysDashboardStore, FILE_DEFS, type DataKey } from '@/stores/sysDashboard'

const store = useSysDashboardStore()
const activeTab = ref('userAnalysis')

// 扩展新板块只需在此数组追加一项
const panels = [
  {
    key: 'userAnalysis',
    label: '用户分析',
    component: defineAsyncComponent(() => import('./UserAnalysisPanel.vue')),
  },
  {
    key: 'roleMenuAnalysis',
    label: '角色访问菜单权限分析',
    component: defineAsyncComponent(() => import('./RoleMenuAnalysisPanel.vue')),
  },
]

async function handleUpload(key: DataKey, file: File) {
  await store.loadFile(key, file)
  return false // 阻止 el-upload 默认上传行为
}
</script>

<style scoped>
.dashboard-root {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: auto;
  padding: 16px;
  box-sizing: border-box;
}
.upload-card { flex-shrink: 0; }

.file-slot {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  padding: 12px 8px;
  text-align: center;
  background: #fafafa;
  transition: border-color 0.2s, background 0.2s;
}
.file-slot.loaded {
  border-color: #67c23a;
  background: #f0f9eb;
}
.file-slot-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
}
.file-name {
  font-size: 11px;
  color: #67c23a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.file-hint { font-size: 11px; color: #c0c4cc; }
.file-rows { font-size: 11px; color: #909399; margin-top: 4px; }

.empty-placeholder { padding: 40px 0; }

.analysis-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.analysis-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow: auto;
}
</style>
