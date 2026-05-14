import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') ?? '')
  const username = ref('')
  const role = ref<'USER' | 'ADMIN'>('USER')
  const mustChangePassword = ref(false)

  async function login(u: string, p: string) {
    const res = await authApi.login(u, p)
    token.value = res.token
    username.value = res.username
    role.value = res.role as 'USER' | 'ADMIN'
    mustChangePassword.value = res.mustChangePassword
    localStorage.setItem('token', res.token)
  }

  function logout() {
    token.value = ''
    username.value = ''
    localStorage.removeItem('token')
  }

  async function fetchMe() {
    const res = await authApi.me()
    username.value = res.username
    role.value = res.role as 'USER' | 'ADMIN'
    mustChangePassword.value = res.mustChangePassword
  }

  return { token, username, role, mustChangePassword, login, logout, fetchMe }
})
