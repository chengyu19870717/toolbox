import { defineAsyncComponent } from 'vue'

export interface BuiltinTool {
  id: string
  name: string
  category: string
  description: string
  icon: string
  component: ReturnType<typeof defineAsyncComponent>
}

export const BUILTIN_TOOLS: BuiltinTool[] = [
  {
    id: '__sys-dashboard__',
    name: '系统管理看板',
    category: '系统分析',
    description: '上传用户/角色/菜单/机构/人力数据，分析系统访问权限',
    icon: 'mdi-monitor-dashboard',
    component: defineAsyncComponent(() => import('@/views/sys-dashboard/SysDashboardView.vue')),
  },
]

export const BUILTIN_TOOL_MAP = new Map(BUILTIN_TOOLS.map(t => [t.id, t]))
