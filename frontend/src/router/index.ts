import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/auth/LoginView.vue') },
    { path: '/change-password', component: () => import('@/views/auth/ChangePasswordView.vue') },
    {
      path: '/',
      component: () => import('@/views/main/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/tools' },
        { path: 'tools', component: () => import('@/views/main/ToolsView.vue') },
        { path: 'datasources', component: () => import('@/views/datasource/DataSourceView.vue') },
        { path: 'tasks', component: () => import('@/views/task/TaskListView.vue') },
        { path: 'users', component: () => import('@/views/user/UserView.vue'), meta: { requiresAdmin: true } },
        { path: 'sys-dashboard', component: () => import('@/views/sys-dashboard/SysDashboardView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) return '/login'

  if (token && !auth.username) {
    try { await auth.fetchMe() } catch { return '/login' }
  }

  if (auth.mustChangePassword && to.path !== '/change-password') {
    return '/change-password'
  }

  if (to.meta.requiresAdmin && auth.role !== 'ADMIN') return '/'
})

export default router
