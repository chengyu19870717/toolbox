<template>
  <div>
    <el-card>
      <template #header>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span>用户管理</span>
          <el-button type="primary" @click="openCreate">新增用户</el-button>
        </div>
      </template>

      <el-table :data="users" v-loading="loading" stripe>
        <el-table-column prop="username" label="用户名" width="160" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === 'ADMIN' ? 'danger' : 'info'" size="small">{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.enabled ? 'success' : 'danger'" size="small">
              {{ row.enabled ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最近登录" width="170">
          <template #default="{ row }">{{ row.lastLoginAt ? fmtTime(row.lastLoginAt) : '-' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="resetPwd(row.username)">重置密码</el-button>
            <el-button v-if="row.enabled" size="small" type="warning"
                       :disabled="row.username === auth.username"
                       @click="toggleEnabled(row.username, false)">禁用</el-button>
            <el-button v-else size="small" type="success"
                       @click="toggleEnabled(row.username, true)">启用</el-button>
            <el-button size="small" type="danger" @click="remove(row.username)"
                       :disabled="row.username === auth.username">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="新增用户" width="420px" @closed="resetForm">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" style="width:100%">
            <el-option label="普通用户" value="USER" />
            <el-option label="管理员" value="ADMIN" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit" :loading="submitting">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import http from '@/api/http'

interface User { username: string; role: string; enabled: boolean; lastLoginAt: string | null }

const auth = useAuthStore()
const users = ref<User[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const submitting = ref(false)
const formRef = ref<FormInstance>()
const form = ref({ username: '', password: '', role: 'USER' })

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }, { min: 6, message: '密码至少 6 位' }],
  role: [{ required: true }],
}

async function load() {
  loading.value = true
  try { users.value = await http.get('/admin/users') }
  finally { loading.value = false }
}

function openCreate() {
  form.value = { username: '', password: '', role: 'USER' }
  dialogVisible.value = true
}

function resetForm() { formRef.value?.clearValidate() }

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString('zh-CN', { hour12: false })
}

async function submit() {
  await formRef.value?.validate()
  submitting.value = true
  try {
    await http.post('/admin/users', form.value)
    ElMessage.success('用户创建成功')
    dialogVisible.value = false
    await load()
  } finally {
    submitting.value = false
  }
}

async function resetPwd(username: string) {
  const { value: newPwd } = await ElMessageBox.prompt(`重置 ${username} 的密码`, '重置密码', {
    inputType: 'password',
    inputValidator: (v) => v && v.length >= 6 ? true : '密码至少 6 位',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
  await http.post(`/admin/users/${username}/reset-password`, { newPassword: newPwd })
  ElMessage.success('密码已重置')
}

async function toggleEnabled(username: string, enable: boolean) {
  const action = enable ? 'enable' : 'disable'
  await http.post(`/admin/users/${username}/${action}`)
  ElMessage.success(enable ? '已启用' : '已禁用')
  await load()
}

async function remove(username: string) {
  await ElMessageBox.confirm(`确定删除用户 ${username}？`, '提示', { type: 'warning' })
  await http.delete(`/admin/users/${username}`)
  ElMessage.success('已删除')
  await load()
}

onMounted(load)
</script>
