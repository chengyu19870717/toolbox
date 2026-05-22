<template>
  <div>
    <el-card>
      <template #header>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span>数据源管理</span>
          <el-button type="primary" @click="openCreate">新增数据源</el-button>
        </div>
      </template>

      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column prop="name" label="名称" width="160" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag size="small">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="host" label="主机" />
        <el-table-column prop="port" label="端口" width="80" />
        <el-table-column prop="database" label="数据库" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="testConn(row.id)" :loading="testingId === row.id">测试</el-button>
            <el-button size="small" type="primary" @click="openEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑数据源' : '新增数据源'" width="500px"
               :close-on-click-modal="false" @closed="resetForm">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" style="width:100%">
            <el-option label="MySQL" value="MYSQL" />
            <el-option label="OceanBase" value="OCEANBASE" />
          </el-select>
        </el-form-item>
        <el-form-item label="主机" prop="host">
          <el-input v-model="form.host" />
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input-number v-model="form.port" :min="1" :max="65535" style="width:100%" />
        </el-form-item>
        <el-form-item label="数据库" prop="database">
          <el-input v-model="form.database" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" :prop="isEdit ? undefined : 'password'">
          <el-input v-model="form.password" type="password" show-password
                    :placeholder="isEdit ? '留空则不修改' : ''" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <el-button @click="testConnForm" :loading="testing">测试连接</el-button>
            <el-tag v-if="testResult" :type="testResult.ok ? 'success' : 'danger'" size="small">
              {{ testResult.ok ? `连接成功 (${testResult.durationMs}ms)` : testResult.message }}
            </el-tag>
          </div>
          <div>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submit" :loading="submitting">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import http from '@/api/http'

interface DataSource {
  id: string; name: string; type: string; host: string; port: number
  database: string; username: string; remark: string; version: number
}

const list = ref<DataSource[]>([])
const loading = ref(false)
const testingId = ref<string | null>(null)
const dialogVisible = ref(false)
const isEdit = ref(false)
const submitting = ref(false)
const testing = ref(false)
const testResult = ref<{ ok: boolean; message: string; durationMs: number } | null>(null)
const formRef = ref<FormInstance>()

const defaultForm = () => ({
  id: '', name: '', type: 'MYSQL', host: '', port: 3306,
  database: '', username: '', password: '', remark: '', version: 0
})
const form = ref(defaultForm())

const rules: FormRules = {
  name: [{ required: true, message: '请输入名称' }],
  type: [{ required: true, message: '请选择类型' }],
  host: [{ required: true, message: '请输入主机地址' }],
  port: [{ required: true, message: '请输入端口' }],
  database: [{ required: true, message: '请输入数据库名' }],
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
}

async function load() {
  loading.value = true
  try { list.value = await http.get('/datasources') }
  finally { loading.value = false }
}

function openCreate() {
  isEdit.value = false
  form.value = defaultForm()
  dialogVisible.value = true
}

async function openEdit(row: DataSource) {
  isEdit.value = true
  form.value = { ...row, password: '' }
  dialogVisible.value = true
  try {
    const full: any = await http.get(`/datasources/${row.id}`)
    form.value = { ...full }
  } catch {
    // 加载失败时保留已有信息，密码留空（用户可手动输入）
  }
}

function resetForm() {
  formRef.value?.clearValidate()
  testResult.value = null
}

async function testConnForm() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  testing.value = true
  testResult.value = null
  try {
    testResult.value = await http.post('/datasources/test', form.value)
  } finally {
    testing.value = false
  }
}

async function submit() {
  await formRef.value?.validate()
  submitting.value = true
  try {
    if (isEdit.value) {
      await http.put(`/datasources/${form.value.id}`, form.value)
      ElMessage.success('更新成功')
    } else {
      await http.post('/datasources', form.value)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    await load()
  } finally {
    submitting.value = false
  }
}

async function testConn(id: string) {
  testingId.value = id
  try {
    const res: any = await http.post(`/datasources/${id}/test`)
    if (res.ok) ElMessage.success('连接成功')
    else ElMessage.error(`连接失败：${res.message}`)
  } catch {
    // 错误已由 http 拦截器统一处理
  } finally {
    testingId.value = null
  }
}

async function remove(id: string) {
  await ElMessageBox.confirm('确定删除该数据源？', '提示', { type: 'warning' })
  await http.delete(`/datasources/${id}`)
  ElMessage.success('已删除')
  await load()
}

onMounted(load)
</script>
