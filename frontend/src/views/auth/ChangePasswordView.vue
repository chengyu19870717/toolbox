<template>
  <div class="change-pwd-page">
    <el-card class="change-pwd-card">
      <h2>修改密码</h2>
      <p class="tip">首次登录，请修改密码后继续使用</p>
      <el-form :model="form" @submit.prevent="submit" label-position="top">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirm" type="password" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" style="width:100%">
          确认修改
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/api/auth'

const router = useRouter()
const auth = useAuthStore()
const form = reactive({ oldPassword: '', newPassword: '', confirm: '' })
const loading = ref(false)

async function submit() {
  if (form.newPassword !== form.confirm) { ElMessage.error('两次输入的密码不一致'); return }
  if (form.newPassword.length < 6) { ElMessage.error('密码至少 6 位'); return }
  loading.value = true
  try {
    await authApi.changePassword(form.oldPassword, form.newPassword)
    ElMessage.success('密码修改成功')
    auth.mustChangePassword = false
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.change-pwd-page {
  display: flex; align-items: center; justify-content: center;
  height: 100vh; background: #f0f2f5;
}
.change-pwd-card { width: 400px; }
.change-pwd-card h2 { text-align: center; margin-bottom: 8px; }
.tip { text-align: center; color: #909399; margin-bottom: 20px; font-size: 13px; }
</style>
