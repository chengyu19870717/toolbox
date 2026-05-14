<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>ToolBox</h2>
      <el-form :model="form" @submit.prevent="submit" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="form.username" prefix-icon="User" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" prefix-icon="Lock"
                    autocomplete="current-password" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" style="width:100%">
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ username: '', password: '' })
const loading = ref(false)

async function submit() {
  if (!form.username || !form.password) return
  loading.value = true
  try {
    await auth.login(form.username, form.password)
    router.push(auth.mustChangePassword ? '/change-password' : '/')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
}
.login-card {
  width: 380px;
}
.login-card h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #409eff;
}
</style>
