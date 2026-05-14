<template>
  <el-dialog
    :model-value="visible"
    :title="isNew ? '新建任务' : '编辑任务'"
    width="540px"
    @close="$emit('cancel')"
    append-to-body
  >
    <el-form :model="form" label-position="top" size="default">
      <el-form-item label="标题" required>
        <el-input
          v-model="form.title"
          placeholder="任务标题（可用 📅5/15 #项目 语法）"
          clearable
          ref="titleRef"
          @keydown.enter.prevent="handleSave"
        />
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="2"
          placeholder="补充说明（选填）"
        />
      </el-form-item>

      <div style="display:flex;gap:12px;">
        <el-form-item label="截止日期" style="flex:1">
          <el-date-picker
            v-model="form.targetDate"
            type="date"
            value-format="YYYY-MM-DD"
            format="YYYY年M月D日"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item label="所属项目" style="flex:1">
          <el-select
            v-model="form.project"
            clearable
            filterable
            allow-create
            placeholder="选择或新建项目"
            style="width:100%"
          >
            <el-option v-for="p in allProjects" :key="p" :label="p" :value="p" />
          </el-select>
        </el-form-item>
      </div>

      <!-- stakeholders -->
      <el-form-item label="干系人">
        <div style="width:100%">
          <div v-for="(sh, idx) in form.stakeholders" :key="sh.id" class="sh-row">
            <template v-if="editingShIdx === idx">
              <el-input v-model="sh.name" placeholder="姓名" style="width:100px" size="small" />
              <el-select v-model="sh.role" placeholder="角色" style="width:100px" size="small" clearable filterable allow-create>
                <el-option v-for="r in roles" :key="r" :label="r" :value="r" />
              </el-select>
              <el-input v-model="sh.remark" placeholder="备注（选填）" style="flex:1" size="small" />
              <el-button size="small" @click="editingShIdx = -1">✓</el-button>
            </template>
            <template v-else>
              <span class="sh-name" @click="editingShIdx = idx">👤 {{ sh.name }}</span>
              <span v-if="sh.role" class="sh-role">{{ sh.role }}</span>
              <span v-if="sh.remark" class="sh-remark">{{ sh.remark }}</span>
              <el-button size="small" type="danger" text @click="removeStakeholder(idx)">×</el-button>
            </template>
          </div>
          <el-button size="small" @click="addStakeholder" style="margin-top:4px;">
            + 添加干系人
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button v-if="!isNew" type="danger" plain @click="$emit('delete', task)">删除</el-button>
      <el-button type="primary" @click="handleSave" :disabled="!form.title.trim()">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import type { Task, Stakeholder } from './types'
import { todayStr, uuid } from './useTodoStore'

const props = defineProps<{
  visible: boolean
  task?: Task | null
  defaultDate?: string
  allProjects: string[]
}>()

const emit = defineEmits<{
  (e: 'save', data: Partial<Task>): void
  (e: 'cancel'): void
  (e: 'delete', task: Task): void
}>()

const titleRef = ref<InstanceType<typeof ElInput>>()
const isNew = ref(true)
const editingShIdx = ref(-1)

const roles = ['需求方', '开发', '测试', '审批人', '协作人', '知会人', '其他']

const form = reactive({
  title: '',
  description: '',
  targetDate: todayStr(),
  project: '',
  stakeholders: [] as Stakeholder[],
})

watch(() => props.visible, async (v) => {
  if (!v) return
  editingShIdx.value = -1
  if (props.task) {
    isNew.value = false
    form.title = props.task.title
    form.description = props.task.description ?? ''
    form.targetDate = props.task.targetDate
    form.project = props.task.project ?? ''
    form.stakeholders = props.task.stakeholders ? JSON.parse(JSON.stringify(props.task.stakeholders)) : []
  } else {
    isNew.value = true
    form.title = ''
    form.description = ''
    form.targetDate = props.defaultDate ?? todayStr()
    form.project = ''
    form.stakeholders = []
  }
  await nextTick()
  titleRef.value?.focus()
})

function addStakeholder() {
  form.stakeholders.push({ id: uuid(), name: '', role: '', remark: '', addedAt: new Date().toISOString() })
  editingShIdx.value = form.stakeholders.length - 1
}

function removeStakeholder(idx: number) {
  form.stakeholders.splice(idx, 1)
  if (editingShIdx.value >= form.stakeholders.length) editingShIdx.value = -1
}

function handleSave() {
  if (!form.title.trim()) return
  emit('save', {
    title: form.title.trim(),
    description: form.description.trim() || undefined,
    targetDate: form.targetDate,
    project: form.project || undefined,
    stakeholders: form.stakeholders.filter(s => s.name.trim()),
  })
}
</script>

<style scoped>
.sh-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  border-bottom: 1px solid #f0f2f5;
  flex-wrap: wrap;
}
.sh-name { font-size: 13px; cursor: pointer; color: #303133; }
.sh-name:hover { text-decoration: underline; }
.sh-role { font-size: 12px; color: #909399; background: #f0f2f5; border-radius: 3px; padding: 0 6px; }
.sh-remark { font-size: 12px; color: #c0c4cc; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
