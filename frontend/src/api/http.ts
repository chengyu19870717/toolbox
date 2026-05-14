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
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      ElMessage.error(msg)
    }
    return Promise.reject(err)
  }
)

export default http
