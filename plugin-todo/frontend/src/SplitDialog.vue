<template>
  <el-dialog
    :model-value="visible"
    title="拆分任务"
    width="480px"
    @close="$emit('cancel')"
    append-to-body
  >
    <div v-if="task">
      <div class="split-parent">原任务：{{ task.title }}</div>

      <div class="split-children">
        <div v-for="(item, idx) in childTitles" :key="idx" class="split-child-row">
          <span class="split-index">{{ idx + 1 }}</span>
          <el-input
            v-model="childTitles[idx]"
            placeholder="子任务标题"
            size="small"
            @keydown.enter.prevent="idx === childTitles.length - 1 ? addChild() : focusNext(idx)"
          />
          <el-button type="danger" text size="small" @click="removeChild(idx)" v-if="childTitles.length > 1">×</el-button>
        </div>
      </div>

      <el-button size="small" @click="addChild" style="margin-top:8px;">+ 添加子任务</el-button>
    </div>

    <template #footer>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :disabled="validChildren.length === 0">确认拆分</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElDialog, ElInput, ElButton } from 'element-plus'
import type { Task } from './types'

const props = defineProps<{
  visible: boolean
  task?: Task | null
}>()

const emit = defineEmits<{
  (e: 'confirm', parentId: string, childTitles: string[]): void
  (e: 'cancel'): void
}>()

const childTitles = ref<string[]>(['', ''])

watch(() => props.visible, (v) => {
  if (v) childTitles.value = ['', '']
})

const validChildren = computed(() => childTitles.value.filter(t => t.trim()))

function addChild() {
  childTitles.value.push('')
}

function removeChild(idx: number) {
  childTitles.value.splice(idx, 1)
}

function focusNext(idx: number) {
  // handled by template refs if needed
}

function handleConfirm() {
  if (!props.task || validChildren.value.length === 0) return
  emit('confirm', props.task.id, childTitles.value)
}
</script>

<style scoped>
.split-parent {
  font-size: 14px;
  color: #606266;
  background: #f5f7fa;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 12px;
}
.split-children { display: flex; flex-direction: column; gap: 8px; }
.split-child-row { display: flex; align-items: center; gap: 8px; }
.split-index { color: #c0c4cc; font-size: 13px; width: 16px; flex-shrink: 0; }
</style>
