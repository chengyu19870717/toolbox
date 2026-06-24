<template>
  <div class="panel">
    <el-row :gutter="16" class="summary-row">
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.roleCount }}</div>
          <div class="stat-label">角色总数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.menuCount }}</div>
          <div class="stat-label">菜单总数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.avgMenuPerRole }}</div>
          <div class="stat-label">平均每角色菜单数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.sharedMenuCount }}</div>
          <div class="stat-label">多角色共享菜单</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top:16px;">
      <!-- 角色菜单数量排行 -->
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>各角色菜单权限数量</template>
          <el-table :data="roleMenuCount" size="small" max-height="320" stripe>
            <el-table-column prop="role" label="角色" show-overflow-tooltip />
            <el-table-column prop="count" label="菜单数" width="90" sortable />
            <el-table-column label="权限广度" width="130">
              <template #default="{ row }">
                <el-progress :percentage="row.pct" :stroke-width="10"
                             :format="(p: number) => p.toFixed(1) + '%'" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 高频菜单 -->
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>菜单被授权角色数量（Top 20）</template>
          <el-table :data="menuRoleCount" size="small" max-height="320" stripe>
            <el-table-column prop="menu" label="菜单" show-overflow-tooltip />
            <el-table-column prop="count" label="授权角色数" width="100" sortable />
            <el-table-column label="覆盖率" width="120">
              <template #default="{ row }">
                <el-progress :percentage="row.pct" :stroke-width="10"
                             :format="(p: number) => p.toFixed(1) + '%'" status="success" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 角色-菜单矩阵（小规模时展示） -->
    <el-card shadow="never" style="margin-top:16px;">
      <template #header>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span>角色菜单明细</span>
          <div style="display:flex; gap:8px;">
            <el-select v-model="selectedRole" clearable placeholder="筛选角色" size="small" style="width:160px;">
              <el-option v-for="r in allRoles" :key="r" :label="r" :value="r" />
            </el-select>
            <el-input v-model="menuSearch" placeholder="搜索菜单..." clearable size="small" style="width:160px;" />
          </div>
        </div>
      </template>
      <el-table :data="filteredRoleMenus.slice(0, 300)" size="small" max-height="360" stripe>
        <el-table-column v-for="col in roleMenuColumns" :key="col" :prop="col" :label="col"
                         show-overflow-tooltip min-width="120" />
      </el-table>
      <div v-if="filteredRoleMenus.length > 300" style="text-align:center; color:#909399; font-size:12px; padding:8px;">
        仅展示前 300 条，共 {{ filteredRoleMenus.length }} 条
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSysDashboardStore } from '@/stores/sysDashboard'

const store = useSysDashboardStore()
const selectedRole = ref('')
const menuSearch = ref('')

const roleMenus = computed(() => store.data.roleMenus ?? [])
const roleMenuColumns = computed(() => roleMenus.value.length ? Object.keys(roleMenus.value[0]) : [])

function findCol(row: Record<string, unknown>, keywords: string[]): string | undefined {
  return Object.keys(row).find(k => keywords.some(kw => k.includes(kw)))
}

const roleCol = computed(() => roleMenus.value.length ? findCol(roleMenus.value[0], ['角色', 'role']) : undefined)
const menuCol = computed(() => roleMenus.value.length ? findCol(roleMenus.value[0], ['菜单', 'menu', '功能', '权限']) : undefined)

const allRoles = computed(() => {
  if (!roleCol.value) return []
  return [...new Set(roleMenus.value.map(r => String(r[roleCol.value!] ?? '')))]
    .filter(Boolean).sort()
})

const roleMenuCount = computed(() => {
  if (!roleCol.value) return []
  const map: Record<string, number> = {}
  for (const r of roleMenus.value) {
    const role = String(r[roleCol.value!] ?? '未知')
    map[role] = (map[role] ?? 0) + 1
  }
  const max = Math.max(...Object.values(map))
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([role, count]) => ({ role, count, pct: Math.round(count / max * 1000) / 10 }))
})

const menuRoleCount = computed(() => {
  if (!menuCol.value) return []
  const map: Record<string, Set<string>> = {}
  for (const r of roleMenus.value) {
    const menu = String(r[menuCol.value!] ?? '未知')
    const role = roleCol.value ? String(r[roleCol.value] ?? '') : ''
    if (!map[menu]) map[menu] = new Set()
    map[menu].add(role)
  }
  const max = Math.max(...Object.values(map).map(s => s.size))
  return Object.entries(map)
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 20)
    .map(([menu, roles]) => ({
      menu,
      count: roles.size,
      pct: Math.round(roles.size / max * 1000) / 10,
    }))
})

const stats = computed(() => {
  const roleCount = allRoles.value.length
  const menuCount = menuCol.value ? new Set(roleMenus.value.map(r => r[menuCol.value!])).size : 0
  const avgMenuPerRole = roleCount > 0 ? Math.round(roleMenus.value.length / roleCount) : 0
  // 被超过1个角色授权的菜单数
  const sharedMenuCount = menuCol.value && roleCol.value
    ? Object.values(
        roleMenus.value.reduce<Record<string, Set<string>>>((acc, r) => {
          const menu = String(r[menuCol.value!] ?? '')
          const role = String(r[roleCol.value!] ?? '')
          if (!acc[menu]) acc[menu] = new Set()
          acc[menu].add(role)
          return acc
        }, {})
      ).filter(s => s.size > 1).length
    : 0
  return { roleCount, menuCount, avgMenuPerRole, sharedMenuCount }
})

const filteredRoleMenus = computed(() => {
  let rows = roleMenus.value
  if (selectedRole.value && roleCol.value) {
    rows = rows.filter(r => String(r[roleCol.value!]) === selectedRole.value)
  }
  if (menuSearch.value && menuCol.value) {
    const kw = menuSearch.value.toLowerCase()
    rows = rows.filter(r => String(r[menuCol.value!]).toLowerCase().includes(kw))
  }
  return rows
})
</script>

<style scoped>
.panel { padding: 4px; }
.summary-row { margin-bottom: 4px; }
.stat-card { text-align: center; }
.stat-value { font-size: 32px; font-weight: 700; color: #67c23a; line-height: 1.2; }
.stat-label { font-size: 13px; color: #909399; margin-top: 4px; }
</style>
