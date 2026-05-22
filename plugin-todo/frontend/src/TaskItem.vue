<template>
  <div class="task-item" :class="[`task-item--${task.status}`, { 'task-item--overdue': isOverdue, 'task-item--warning': isWarning, 'task-item--inactive': isInactive }]">
    <div class="task-item__main">
      <!-- checkbox -->
      <span class="task-item__check" @click.stop="onToggle">
        <svg v-if="task.status === 'completed'" viewBox="0 0 16 16" class="check-icon check-icon--done">
          <path d="M13 3L6 11L3 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else viewBox="0 0 16 16" class="check-icon">
          <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
      </span>

      <!-- title -->
      <span class="task-item__title" @dblclick="$emit('edit', task)">{{ task.title }}</span>

      <!-- meta row -->
      <div class="task-item__meta">
        <!-- inactive badge -->
        <span v-if="isInactive" class="task-item__inactive-badge">⏳ 待生效 {{ task.startDate }}</span>
        <!-- date badge -->
        <span v-else-if="task.status === 'todo'" class="task-item__date" :class="dateBadgeClass">
          📅 {{ dateLabel }}
        </span>
        <span v-else class="task-item__completed-badge">✅</span>

        <!-- project -->
        <span v-if="task.project" class="task-item__project" :style="{ background: projectColor }">
          {{ task.project }}
        </span>

        <!-- stakeholder count -->
        <span v-if="stakeholders.length >= 3" class="task-item__stakeholders" @click.stop="showStakeholders = !showStakeholders">
          👤 {{ stakeholders.length }}人
        </span>

        <!-- actions -->
        <span class="task-item__actions">
          <button class="task-btn" @click.stop="$emit('edit', task)" title="编辑">✏️</button>
          <button class="task-btn" @click.stop="$emit('split', task)" title="拆分" v-if="!task.parentId && !task.isSplit && readonly === false">✂️</button>
          <button class="task-btn" @click.stop="$emit('unsplit', task)" title="取消拆分" v-if="task.isSplit && readonly === false">🔀</button>
          <button class="task-btn" @click.stop="$emit('delete', task)" title="删除">🗑️</button>
        </span>
      </div>
    </div>

    <!-- stakeholders 1-2: inline -->
    <div v-if="stakeholders.length > 0 && stakeholders.length <= 2" class="task-item__sh-list">
      <div v-for="s in stakeholders" :key="s.id" class="task-item__sh">
        👤 {{ s.name }}<span v-if="s.role">（{{ s.role }}）</span><span v-if="s.remark" class="task-item__sh-remark"> {{ s.remark }}</span>
      </div>
    </div>
    <!-- stakeholders >=3: expandable -->
    <div v-if="stakeholders.length >= 3 && showStakeholders" class="task-item__sh-list">
      <div v-for="s in stakeholders" :key="s.id" class="task-item__sh">
        👤 {{ s.name }}<span v-if="s.role">（{{ s.role }}）</span><span v-if="s.remark" class="task-item__sh-remark"> {{ s.remark }}</span>
      </div>
    </div>

    <!-- children -->
    <div v-if="task.isSplit && children.length > 0" class="task-item__children">
      <div
        v-for="(child, ci) in children"
        :key="child.id"
        class="task-item__child"
        :class="{ 'task-item__child--done': child.status === 'completed' }"
      >
        <span class="child-connector">{{ ci === children.length - 1 ? '└' : '├' }}</span>
        <span class="task-item__check task-item__check--sm" @click.stop="onToggleChild(child)">
          <svg v-if="child.status === 'completed'" viewBox="0 0 16 16" class="check-icon check-icon--done check-icon--sm">
            <path d="M13 3L6 11L3 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else viewBox="0 0 16 16" class="check-icon check-icon--sm">
            <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
        </span>
        <span class="child-title" :class="{ 'child-title--done': child.status === 'completed' }">{{ child.title }}</span>
        <span v-if="child.status === 'completed'" class="task-item__completed-badge" style="font-size:12px;">✅</span>
        <span class="task-item__actions" style="opacity:0.6;">
          <button class="task-btn" @click.stop="$emit('edit', child)" title="编辑子任务">✏️</button>
          <button class="task-btn" @click.stop="$emit('delete', child)" title="删除子任务">🗑️</button>
        </span>
      </div>
    </div>

    <!-- rollover indicator -->
    <div v-if="task.rolloverCount > 0 && task.status === 'todo'" class="task-item__rollover">
      原定{{ formatDate(task.originalTargetDate) }}，已顺延{{ task.rolloverCount }}次
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Task } from './types'
import { todayStr, formatDate, diffDays, dateOffset } from './useTodoStore'

const props = defineProps<{
  task: Task
  children: Task[]
  projectColors: Record<string, string>
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', task: Task): void
  (e: 'toggleChild', child: Task): void
  (e: 'edit', task: Task): void
  (e: 'split', task: Task): void
  (e: 'unsplit', task: Task): void
  (e: 'delete', task: Task): void
}>()

const showStakeholders = ref(false)
const stakeholders = computed(() => props.task.stakeholders ?? [])
const today = todayStr()

const isInactive = computed(() =>
  !!props.task.startDate && props.task.startDate > today
)
const isOverdue = computed(() =>
  props.task.status === 'todo' && props.task.targetDate < today && !isInactive.value
)
const isWarning = computed(() => {
  if (props.task.status !== 'todo') return false
  const diff = diffDays(props.task.targetDate, today)
  return diff >= 0 && diff <= 2
})

const dateLabel = computed(() => {
  if (!props.task.targetDate) return ''
  const fd = formatDate(props.task.targetDate)
  const diff = diffDays(props.task.targetDate, today)
  if (props.task.targetDate === today) return `${fd} 今日`
  if (diff < 0) return `${fd} 逾期${-diff}天`
  if (diff === 1) return `${fd} 明天`
  return `${fd} 剩${diff}天`
})

const dateBadgeClass = computed(() => {
  if (isOverdue.value) return 'date-badge--overdue'
  if (isWarning.value) return 'date-badge--warning'
  return ''
})

const projectColor = computed(() => props.projectColors[props.task.project ?? ''] ?? '#e8f0fe')

function onToggle() {
  emit('toggle', props.task)
}

function onToggleChild(child: Task) {
  emit('toggleChild', child)
}
</script>

<style scoped>
.task-item {
  background: #fff;
  border: 1px solid #e8eaf0;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 10px 12px;
  transition: box-shadow 0.15s;
}
.task-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.task-item--completed { opacity: 0.65; }
.task-item--overdue { border-left: 3px solid #f56c6c; }
.task-item--warning { border-left: 3px solid #e6a23c; }
.task-item--inactive { border-left: 3px solid #909399; opacity: 0.75; }

.task-item__main { display: flex; align-items: flex-start; gap: 8px; flex-wrap: wrap; }

.task-item__check {
  cursor: pointer;
  flex-shrink: 0;
  padding-top: 2px;
  color: #909399;
}
.task-item__check--sm { padding-top: 1px; }
.task-item__check:hover { color: #409eff; }

.check-icon { width: 16px; height: 16px; display: block; }
.check-icon--sm { width: 14px; height: 14px; }
.check-icon--done { color: #67c23a; }

.task-item__title {
  flex: 1;
  font-size: 14px;
  color: #303133;
  line-height: 1.5;
  cursor: pointer;
  word-break: break-all;
}
.task-item--completed .task-item__title { text-decoration: line-through; color: #909399; }

.task-item__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 4px;
  padding-left: 24px;
}

.task-item__date {
  font-size: 12px;
  color: #606266;
  background: #f0f2f5;
  border-radius: 4px;
  padding: 1px 6px;
}
.date-badge--overdue { background: #fef0f0; color: #f56c6c; }
.date-badge--warning { background: #fdf6ec; color: #e6a23c; }
.task-item__inactive-badge { font-size: 12px; color: #909399; background: #f4f4f5; border-radius: 4px; padding: 1px 6px; }

.task-item__completed-badge { font-size: 12px; }

.task-item__project {
  font-size: 11px;
  color: #fff;
  border-radius: 10px;
  padding: 1px 8px;
  background: #409eff;
}

.task-item__stakeholders {
  font-size: 12px;
  color: #606266;
  cursor: pointer;
  text-decoration: underline dotted;
}

.task-item__actions {
  display: flex;
  gap: 2px;
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.15s;
}
.task-item:hover .task-item__actions { opacity: 1; }

.task-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  font-size: 13px;
  border-radius: 4px;
  line-height: 1;
}
.task-btn:hover { background: #f0f2f5; }

.task-item__sh-list { padding: 4px 0 0 24px; }
.task-item__sh { font-size: 12px; color: #606266; padding: 1px 0; }
.task-item__sh-remark { color: #909399; }

.task-item__children { padding: 6px 0 0 12px; }
.task-item__child {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
  font-size: 13px;
}
.task-item__child--done { opacity: 0.65; }
.child-connector { color: #c0c4cc; font-size: 12px; flex-shrink: 0; }
.child-title { flex: 1; color: #606266; }
.child-title--done { text-decoration: line-through; color: #909399; }

.task-item__rollover {
  font-size: 11px;
  color: #909399;
  padding-left: 24px;
  margin-top: 4px;
  font-style: italic;
}
</style>
