import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const http = axios.create({ baseURL: '/api', timeout: 60_000 })

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  res => res.data,
  err => {
    const msg = err.response?.data?.message ?? err.message ?? '请求失败'
    if (err.response?.status === 401) {
      const url: string = (err.config as any)?.url ?? ''
      if (url.includes('/test')) {
        ElMessage.error('连接测试失败，请检查配置')
      } else {
        localStorage.removeItem('token')
        ElMessage.warning('登录已过期，请重新登录')
        router.push('/login')
      }
    } else {
      ElMessage.error(msg)
    }
    return Promise.reject(err)
  }
)

export default http
