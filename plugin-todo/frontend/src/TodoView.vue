<template>
  <div class="todo-root">
    <!-- header -->
    <div class="todo-header">
      <span class="todo-header__title">✅ 待办任务</span>
      <div class="todo-header__actions">
        <el-button size="small" @click="showImportExport = true">导出/导入</el-button>
        <el-button size="small" @click="showReport = true">📊 复盘</el-button>
      </div>
    </div>

    <div class="todo-layout">
      <!-- sidebar -->
      <div class="todo-sidebar">
        <div
          v-for="item in navItems"
          :key="item.key"
          class="nav-item"
          :class="{ 'nav-item--active': currentView === item.key, 'nav-divider': item.divider }"
          @click="item.divider ? null : setView(item.key)"
        >
          <template v-if="!item.divider">
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
            <span v-if="badgeCounts[item.key]" class="nav-badge">{{ badgeCounts[item.key] > 99 ? '99+' : badgeCounts[item.key] }}</span>
          </template>
        </div>

        <!-- project list -->
        <div class="nav-section-title">📁 项目</div>
        <div
          v-for="proj in allProjectNames"
          :key="proj"
          class="nav-item nav-item--sub"
          :class="{ 'nav-item--active': currentView === 'project:' + proj }"
          @click="setView('project:' + proj)"
        >
          <span class="nav-dot" :style="{ background: getProjectColor(proj) }"></span>
          <span class="nav-label">{{ proj }}</span>
          <span v-if="badgeCounts['project:' + proj]" class="nav-badge">{{ badgeCounts['project:' + proj] > 99 ? '99+' : badgeCounts['project:' + proj] }}</span>
        </div>
        <div class="nav-item nav-item--sub nav-item--add-project" @click="showAddProject = true">
          + 新建项目
        </div>

        <!-- stakeholder groups -->
        <div class="nav-section-title">
          👥 干系人群组
          <span class="nav-section-action" @click="showGroupMgr = !showGroupMgr">{{ showGroupMgr ? '收起' : '管理' }}</span>
        </div>
        <div v-if="showGroupMgr" class="group-mgr-panel">
          <div v-for="g in groups" :key="g.id" class="group-mgr-item">
            <template v-if="editingGroupId === g.id">
              <el-input v-model="editGroupName" placeholder="群组名" size="small" style="width:100%" />
              <el-input v-model="editGroupMembers" placeholder="成员（逗号分隔，姓名/角色）" size="small" style="width:100%;margin-top:4px" type="textarea" :rows="2" />
              <div style="display:flex;gap:4px;margin-top:4px">
                <el-button size="small" type="primary" @click="saveEditGroup(g.id)">保存</el-button>
                <el-button size="small" @click="editingGroupId = ''">取消</el-button>
              </div>
            </template>
            <template v-else>
              <div class="group-mgr-item__header">
                <span class="group-mgr-item__name">{{ g.name }}</span>
                <span class="group-mgr-item__count">{{ g.members.length }}人</span>
                <span class="group-mgr-item__actions">
                  <span class="group-action-btn" @click="startEditGroup(g)">✏️</span>
                  <span class="group-action-btn" @click="deleteGroup(g.id)">🗑️</span>
                </span>
              </div>
              <div class="group-mgr-item__members">{{ g.members.map(m => m.name).join('、') }}</div>
            </template>
          </div>
          <div v-if="showNewGroup" class="group-mgr-item">
            <el-input v-model="newGroupName" placeholder="群组名" size="small" style="width:100%" />
            <el-input v-model="newGroupMembers" placeholder="成员（逗号分隔，姓名/角色）" size="small" style="width:100%;margin-top:4px" type="textarea" :rows="2" />
            <div style="display:flex;gap:4px;margin-top:4px">
              <el-button size="small" type="primary" @click="saveNewGroup">保存</el-button>
              <el-button size="small" @click="showNewGroup = false">取消</el-button>
            </div>
          </div>
          <div v-if="!showNewGroup" class="nav-item nav-item--sub nav-item--add-project" @click="showNewGroup = true">
            + 新建群组
          </div>
        </div>
      </div>

      <!-- main content -->
      <div class="todo-main">
        <!-- date view header -->
        <div v-if="isDateView || currentView === 'all' || currentView === 'pending' || currentView.startsWith('project:')" class="todo-content-header">
          <div class="todo-content-header__left">
            <template v-if="isDateView">
              <span class="view-title">{{ dateViewTitle }}</span>
              <el-date-picker
                v-if="currentView === 'history'"
                v-model="historyDate"
                type="date"
                value-format="YYYY-MM-DD"
                size="small"
                style="width:160px;margin-left:8px"
                @change="onHistoryDateChange"
              />
              <el-switch
                v-if="isHistoryDate"
                v-model="showCompletedInHistory"
                style="margin-left:12px"
                active-text="显示已完成"
                inactive-text="隐藏已完成"
                size="small"
              />
            </template>
            <template v-else-if="currentView === 'all'">
              <span class="view-title">📋 全部待办</span>
            </template>
            <template v-else-if="currentView === 'pending'">
              <span class="view-title">⏳ 待生效</span>
            </template>
            <template v-else-if="currentView.startsWith('project:')">
              <span class="view-title">📁 {{ currentView.slice(8) }}</span>
            </template>
          </div>
          <el-button
            v-if="!isReadonly"
            type="primary"
            size="small"
            @click="startNewTask"
          >
            + 新任务
          </el-button>
        </div>

        <!-- search view -->
        <div v-else-if="currentView === 'search'" class="search-view">
          <el-input
            v-model="searchQuery"
            placeholder="搜索任务标题或描述..."
            clearable
            prefix-icon="Search"
            ref="searchInputRef"
            @input="doSearch"
          />
        </div>


        <!-- task list -->
        <div class="task-list">
          <template v-if="currentView === 'search'">
            <div v-if="!searchQuery" class="empty-hint">输入关键词搜索任务</div>
            <div v-else-if="searchResults.length === 0" class="empty-hint">未找到匹配的任务</div>
            <task-item
              v-for="t in searchResults"
              :key="t.id"
              :task="t"
              :children="getChildren(t.id)"
              :project-colors="projectColors"
              :readonly="false"
              @toggle="onToggle"
              @toggle-child="onToggleChild"
              @edit="openEdit"
              @split="openSplit"
              @unsplit="doUnsplit"
              @delete="confirmDelete"
            />
          </template>

          <template v-else>
            <div v-if="currentTasks.length === 0" class="empty-hint">
              <template v-if="isReadonly">当天无任务记录</template>
              <template v-else>暂无任务，点击「+ 新任务」开始</template>
            </div>
            <task-item
              v-for="t in currentTasks"
              :key="t.id"
              :task="t"
              :children="getChildren(t.id)"
              :project-colors="projectColors"
              :readonly="isReadonly"
              @toggle="onToggle"
              @toggle-child="onToggleChild"
              @edit="openEdit"
              @split="openSplit"
              @unsplit="doUnsplit"
              @delete="confirmDelete"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- dialogs -->
    <task-edit-dialog
      :visible="showEditDialog"
      :task="editingTask"
      :default-date="currentDateStr"
      :all-projects="allProjectNames"
      :groups="groups"
      @save="handleEditSave"
      @cancel="showEditDialog = false"
      @delete="handleDelete"
    />

    <split-dialog
      :visible="showSplitDialog"
      :task="splittingTask"
      @confirm="handleSplitConfirm"
      @cancel="showSplitDialog = false"
    />

    <weekly-report-dialog
      :visible="showReport"
      :generate-report="generateWeeklyReport"
      @close="showReport = false"
    />

    <!-- import/export dialog -->
    <el-dialog v-model="showImportExport" title="导出 / 导入" width="440px" append-to-body>
      <div class="ie-section">
        <div class="ie-title">导出</div>
        <el-button @click="doExportJson">📄 导出 JSON</el-button>
        <el-button @click="doExportExcel" style="margin-left:8px">📊 导出 Excel</el-button>
      </div>
      <div class="ie-section">
        <div class="ie-title">导入 JSON</div>
        <el-radio-group v-model="importMode" size="small">
          <el-radio value="merge">合并模式（保留现有数据）</el-radio>
          <el-radio value="overwrite">覆盖模式（清空现有数据）</el-radio>
        </el-radio-group>
        <div style="margin-top:8px">
          <input type="file" accept=".json" ref="importFileRef" @change="doImport" style="display:none" />
          <el-button @click="importFileRef?.click()">选择 JSON 文件</el-button>
        </div>
      </div>
      <template #footer>
        <el-button @click="showImportExport = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- add project dialog -->
    <el-dialog v-model="showAddProject" title="新建项目" width="360px" append-to-body>
      <el-form @submit.prevent="submitAddProject">
        <el-form-item label="项目名称">
          <el-input v-model="newProjectName" placeholder="项目名称" @keydown.enter.prevent="submitAddProject" />
        </el-form-item>
        <el-form-item label="颜色">
          <div class="color-picker">
            <span
              v-for="c in projectColorOptions"
              :key="c"
              class="color-dot"
              :class="{ 'color-dot--selected': newProjectColor === c }"
              :style="{ background: c }"
              @click="newProjectColor = c"
            ></span>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddProject = false">取消</el-button>
        <el-button type="primary" @click="submitAddProject" :disabled="!newProjectName.trim()">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import {
  ElButton, ElInput, ElDatePicker, ElSwitch, ElDialog,
  ElForm, ElFormItem, ElRadioGroup, ElRadio, ElMessage, ElMessageBox
} from 'element-plus'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'
import type { Task } from './types'
import { useTodoStore, todayStr, dateOffset } from './useTodoStore'
import TaskItem from './TaskItem.vue'
import TaskEditDialog from './TaskEditDialog.vue'
import SplitDialog from './SplitDialog.vue'
import WeeklyReportDialog from './WeeklyReportDialog.vue'
import * as XLSX from 'xlsx'

defineProps<{ api: ToolboxAPI; toolId: string }>()

const store = useTodoStore()
const {
  allProjectNames, checkRollover, createTask, updateTask, deleteTask,
  completeTask, uncompleteTask, completeSubTask, uncompleteSubTask,
  splitTask, unsplitTask, addProject, getTasksForDate, getTasksForDateWithCompleted,
  getChildren, getAllPending, getPendingActivation, searchTasks, getTasksByProject,
  generateWeeklyReport, exportJson, importJson,
  tasks, projects, groups, addGroup, updateGroup, deleteGroup,
} = store

// ── mount ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  checkRollover()
})

// ── nav ───────────────────────────────────────────────────────────────────────
const currentView = ref('today')

const navItems = [
  { key: 'today',     icon: '📅', label: '今天' },
  { key: 'yesterday', icon: '📅', label: '昨天' },
  { key: 'dayBefore', icon: '📅', label: '前天' },
  { key: 'divider1',  divider: true, icon: '', label: '' },
  { key: 'all',       icon: '📋', label: '全部待办' },
  { key: 'pending',   icon: '⏳', label: '待生效' },
  { key: 'search',    icon: '🔍', label: '搜索' },
  { key: 'divider2',  divider: true, icon: '', label: '' },
  { key: 'history',   icon: '🗓️', label: '历史日期' },
]

function setView(key: string) {
  currentView.value = key
  if (key === 'search') {
    nextTick(() => searchInputRef.value?.focus())
  }
}

// ── badge counts ──────────────────────────────────────────────────────────
const badgeCounts = computed(() => {
  const today = todayStr()
  const active = tasks.value.filter(t => t.status === 'todo' && !t.parentId && !(t.startDate && t.startDate > today))
  const inactive = tasks.value.filter(t => t.status === 'todo' && !t.parentId && t.startDate && t.startDate > today)
  const counts: Record<string, number> = {
    today: active.filter(t => t.targetDate === today).length,
    all: active.length,
    pending: inactive.length,
  }
  for (const name of allProjectNames.value) {
    counts[`project:${name}`] = active.filter(t => t.project === name).length
  }
  return counts
})

// ── date logic ─────────────────────────────────────────────────────────────
const historyDate = ref(todayStr())

const currentDateStr = computed(() => {
  if (currentView.value === 'today') return todayStr()
  if (currentView.value === 'yesterday') return dateOffset(-1)
  if (currentView.value === 'dayBefore') return dateOffset(-2)
  if (currentView.value === 'history') return historyDate.value
  return todayStr()
})

const isDateView = computed(() =>
  ['today', 'yesterday', 'dayBefore', 'history'].includes(currentView.value)
)

const isHistoryDate = computed(() =>
  ['yesterday', 'dayBefore', 'history'].includes(currentView.value)
)

const isReadonly = computed(() =>
  isHistoryDate.value
)

const showCompletedInHistory = ref(true)

const dateViewTitle = computed(() => {
  const d = currentDateStr.value
  const today = todayStr()
  const [y, m, day] = d.split('-').map(Number)
  const weekNames = ['日', '一', '二', '三', '四', '五', '六']
  const date = new Date(d)
  const weekName = weekNames[date.getDay()]
  const base = `${y}年${m}月${day}日 周${weekName}`
  if (d === today) return `📅 ${base} (今天)`
  if (currentView.value === 'yesterday') return `📅 ${base} (昨天)`
  if (currentView.value === 'dayBefore') return `📅 ${base} (前天)`
  return `📅 ${base}`
})

function onHistoryDateChange() {
  // view updates via computed
}

// ── current task list ──────────────────────────────────────────────────────
const currentTasks = computed(() => {
  if (currentView.value === 'all') return getAllPending()
  if (currentView.value === 'pending') return getPendingActivation()
  if (currentView.value.startsWith('project:')) {
    return getTasksByProject(currentView.value.slice(8))
  }
  if (isDateView.value) {
    if (isHistoryDate.value && showCompletedInHistory.value) {
      return getTasksForDateWithCompleted(currentDateStr.value)
    }
    return getTasksForDate(currentDateStr.value)
  }
  return []
})

// ── search ─────────────────────────────────────────────────────────────────
const searchQuery = ref('')
const searchResults = ref<Task[]>([])
const searchInputRef = ref<InstanceType<typeof ElInput>>()

function doSearch() {
  searchResults.value = searchTasks(searchQuery.value)
}

// ── new task ──────────────────────────────────────────────────────────────
function startNewTask() {
  editingTask.value = null
  showEditDialog.value = true
}

// ── edit dialog ───────────────────────────────────────────────────────────
const showEditDialog = ref(false)
const editingTask = ref<Task | null>(null)

function openEdit(task: Task) {
  editingTask.value = task
  showEditDialog.value = true
}

function handleEditSave(data: Partial<Task>) {
  if (editingTask.value) {
    updateTask(editingTask.value.id, data)
    // remember stakeholders
    data.stakeholders?.forEach(s => {
      if (s.name) store.rememberStakeholder(s.name, s.role ?? '')
    })
  } else {
    if (data.title) createTask({ title: data.title, targetDate: data.targetDate ?? currentDateStr.value, ...data })
  }
  showEditDialog.value = false
  editingTask.value = null
}

function handleDelete(task: Task) {
  showEditDialog.value = false
  confirmDelete(task)
}

// ── toggle ────────────────────────────────────────────────────────────────
function onToggle(task: Task) {
  if (task.status === 'completed') {
    uncompleteTask(task.id)
  } else {
    completeTask(task.id)
  }
}

function onToggleChild(child: Task) {
  if (child.status === 'completed') {
    uncompleteSubTask(child.id)
  } else {
    completeSubTask(child.id)
  }
}

// ── split ─────────────────────────────────────────────────────────────────
const showSplitDialog = ref(false)
const splittingTask = ref<Task | null>(null)

function openSplit(task: Task) {
  splittingTask.value = task
  showSplitDialog.value = true
}

function handleSplitConfirm(parentId: string, childTitles: string[]) {
  splitTask(parentId, childTitles)
  showSplitDialog.value = false
  splittingTask.value = null
}

function doUnsplit(task: Task) {
  ElMessageBox.confirm(`取消拆分后，子任务将变为独立任务。确认？`, '取消拆分', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => unsplitTask(task.id)).catch(() => {})
}

// ── delete ────────────────────────────────────────────────────────────────
function confirmDelete(task: Task) {
  const msg = task.isSplit ? `删除「${task.title}」及其所有子任务？` : `删除「${task.title}」？`
  ElMessageBox.confirm(msg, '删除任务', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteTask(task.id)
    ElMessage.success('已删除')
  }).catch(() => {})
}

// ── projects ──────────────────────────────────────────────────────────────
const showAddProject = ref(false)
const newProjectName = ref('')
const newProjectColor = ref('#4A90D9')
const projectColorOptions = ['#4A90D9', '#67c23a', '#e6a23c', '#f56c6c', '#909399', '#409eff', '#7b5ea7', '#00bcd4']

function getProjectColor(name: string): string {
  return projects.value.find(p => p.name === name)?.color ?? '#909399'
}

const projectColors = computed(() => {
  const map: Record<string, string> = {}
  projects.value.forEach(p => { map[p.name] = p.color })
  return map
})

function submitAddProject() {
  if (!newProjectName.value.trim()) return
  addProject(newProjectName.value.trim(), newProjectColor.value)
  newProjectName.value = ''
  newProjectColor.value = '#4A90D9'
  showAddProject.value = false
}

// ── group management (sidebar) ────────────────────────────────────────────
const showGroupMgr = ref(false)
const showNewGroup = ref(false)
const newGroupName = ref('')
const newGroupMembers = ref('')
const editingGroupId = ref('')
const editGroupName = ref('')
const editGroupMembers = ref('')

function parseMembersStr(str: string) {
  return str.split(/[,，]/).map(s => s.trim()).filter(Boolean).map(s => {
    const [name, role] = s.split(/[/／]/).map(p => p.trim())
    return { name, role: role ?? '' }
  })
}

function saveNewGroup() {
  if (!newGroupName.value.trim()) return
  addGroup(newGroupName.value.trim(), parseMembersStr(newGroupMembers.value))
  newGroupName.value = ''
  newGroupMembers.value = ''
  showNewGroup.value = false
}

function startEditGroup(g: { id: string; name: string; members: { name: string; role?: string }[] }) {
  editingGroupId.value = g.id
  editGroupName.value = g.name
  editGroupMembers.value = g.members.map(m => m.role ? `${m.name}/${m.role}` : m.name).join('，')
}

function saveEditGroup(id: string) {
  if (!editGroupName.value.trim()) return
  updateGroup(id, editGroupName.value.trim(), parseMembersStr(editGroupMembers.value))
  editingGroupId.value = ''
}

// ── weekly report ──────────────────────────────────────────────────────────
const showReport = ref(false)

// ── import/export ──────────────────────────────────────────────────────────
const showImportExport = ref(false)
const importMode = ref<'merge' | 'overwrite'>('merge')
const importFileRef = ref<HTMLInputElement>()

function doExportJson() {
  const json = exportJson()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `todo-backup-${todayStr()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function doExportExcel() {
  const allTasks = tasks.value.filter(t => !t.parentId)
  const rows = allTasks.map((t, i) => {
    const parent = t.parentId ? tasks.value.find(x => x.id === t.parentId) : null
    const shs = t.stakeholders ?? []
    return [
      i + 1,
      t.title,
      parent?.title ?? '',
      t.status === 'completed' ? '已完成' : '待办',
      t.project ?? '',
      t.targetDate,
      t.originalTargetDate,
      t.rolloverCount,
      shs.map(s => `${s.name}${s.role ? `(${s.role})` : ''}`).join('; '),
      shs.map(s => s.remark ?? '').join('; '),
      t.createdAt,
      t.completedAt ?? '',
      t.description ?? '',
    ]
  })

  const ws = XLSX.utils.aoa_to_sheet([
    ['序号', '任务标题', '父任务', '状态', '所属项目', '目标日期', '原始日期', '顺延次数', '干系人', '干系人备注', '创建时间', '完成时间', '描述'],
    ...rows,
  ])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '任务明细')
  XLSX.writeFile(wb, `todo-export-${todayStr()}.xlsx`)
}

function doImport(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    try {
      const result = importJson(ev.target?.result as string, importMode.value)
      ElMessage.success(`导入完成：新增 ${result.imported} 条，跳过 ${result.skipped} 条`)
      showImportExport.value = false
    } catch (err: any) {
      ElMessage.error('导入失败：' + err.message)
    }
    ;(e.target as HTMLInputElement).value = ''
  }
  reader.readAsText(file, 'UTF-8')
}

// ── keyboard ──────────────────────────────────────────────────────────────
function onKeydown(e: KeyboardEvent) {
  const tag = (e.target as HTMLElement).tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  if (e.key === 'n' || e.key === 'N') {
    if (currentView.value !== 'search') startNewTask()
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault()
    setView('search')
  }
}

onMounted(() => { document.addEventListener('keydown', onKeydown) })
</script>

<style scoped>
.todo-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.todo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #e8eaf0;
  flex-shrink: 0;
}
.todo-header__title { font-size: 18px; font-weight: 700; color: #303133; }
.todo-header__actions { display: flex; gap: 8px; }

.todo-layout { display: flex; flex: 1; overflow: hidden; }

/* sidebar */
.todo-sidebar {
  width: 180px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e8eaf0;
  padding: 8px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 0;
  font-size: 13px;
  color: #606266;
  transition: background 0.1s;
}
.nav-item:hover { background: #f5f7fa; }
.nav-item--active { background: #ecf5ff; color: #409eff; font-weight: 600; }
.nav-item--sub { padding-left: 24px; }
.nav-item--add-project { color: #909399; font-size: 12px; }
.nav-divider { height: 1px; background: #f0f2f5; margin: 4px 0; padding: 0; pointer-events: none; }

.nav-icon { font-size: 14px; flex-shrink: 0; }
.nav-label { flex: 1; }
.nav-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.nav-badge {
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: #909399;
  border-radius: 10px;
  padding: 0 6px;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  flex-shrink: 0;
}
.nav-item--active .nav-badge { background: #409eff; }
.nav-section-title { padding: 10px 16px 4px; font-size: 11px; color: #c0c4cc; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: space-between; }
.nav-section-action { font-size: 11px; color: #909399; cursor: pointer; text-transform: none; letter-spacing: 0; padding-right: 4px; }
.nav-section-action:hover { color: #409eff; }

.group-mgr-panel { padding: 4px 12px 8px; }
.group-mgr-item { background: #f7f8fa; border-radius: 6px; padding: 8px; margin-bottom: 6px; }
.group-mgr-item__header { display: flex; align-items: center; gap: 4px; }
.group-mgr-item__name { font-size: 13px; font-weight: 500; color: #303133; flex: 1; }
.group-mgr-item__count { font-size: 11px; color: #909399; }
.group-mgr-item__actions { display: flex; gap: 2px; opacity: 0; transition: opacity 0.15s; }
.group-mgr-item:hover .group-mgr-item__actions { opacity: 1; }
.group-action-btn { cursor: pointer; padding: 2px 3px; border-radius: 3px; font-size: 12px; }
.group-action-btn:hover { background: #e4e7ed; }
.group-mgr-item__members { font-size: 11px; color: #909399; margin-top: 3px; word-break: break-all; }

/* main */
.todo-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}

.todo-content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px 10px;
  flex-shrink: 0;
}
.view-title { font-size: 16px; font-weight: 600; color: #303133; }

.search-view { padding: 14px 20px 10px; flex-shrink: 0; }

.quick-add {
  padding: 0 20px 10px;
  flex-shrink: 0;
}
.quick-add-hint { font-size: 11px; color: #c0c4cc; margin-top: 4px; }

.task-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px 20px;
}

.empty-hint {
  text-align: center;
  color: #c0c4cc;
  font-size: 14px;
  padding: 40px 0;
}

/* import/export dialog */
.ie-section { margin-bottom: 20px; }
.ie-title { font-size: 13px; font-weight: 600; color: #606266; margin-bottom: 10px; }

/* color picker */
.color-picker { display: flex; gap: 8px; flex-wrap: wrap; }
.color-dot {
  width: 24px; height: 24px; border-radius: 50%; cursor: pointer;
  border: 2px solid transparent; transition: border-color 0.15s;
}
.color-dot--selected { border-color: #303133; }
</style>
