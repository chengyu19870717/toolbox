<template>
  <div class="panel">
    <!-- 汇总卡片 -->
    <el-row :gutter="16" class="summary-row">
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.totalRows }}</div>
          <div class="stat-label">授权记录总数</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.uniqueUsers }}</div>
          <div class="stat-label">用户人数</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.orgCount }}</div>
          <div class="stat-label">涉及机构数</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.roleCount }}</div>
          <div class="stat-label">角色种类</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.multiOrgUsers }}</div>
          <div class="stat-label">跨机构用户</div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.multiRoleUsers }}</div>
          <div class="stat-label">多角色用户</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top:16px;">
      <!-- 机构用户分布 -->
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>机构用户数分布（Top 20）</template>
          <el-table :data="orgDist" size="small" max-height="320" stripe>
            <el-table-column prop="name" label="机构" show-overflow-tooltip />
            <el-table-column prop="userCount" label="用户数" width="80" sortable />
            <el-table-column prop="recordCount" label="授权数" width="80" sortable />
            <el-table-column label="占比" width="120">
              <template #default="{ row }">
                <el-progress :percentage="row.pct" :stroke-width="10"
                             :format="(p: number) => p.toFixed(1) + '%'" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 角色分布 -->
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>角色授权分布（Top 20）</template>
          <el-table :data="roleDist" size="small" max-height="320" stripe>
            <el-table-column prop="name" label="角色" show-overflow-tooltip />
            <el-table-column prop="count" label="授权次数" width="90" sortable />
            <el-table-column label="占比" width="120">
              <template #default="{ row }">
                <el-progress :percentage="row.pct" :stroke-width="10"
                             :format="(p: number) => p.toFixed(1) + '%'" status="success" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 跨机构用户明细 -->
    <el-card shadow="never" style="margin-top:16px;">
      <template #header>跨机构用户明细（同一工号在多机构有账号）</template>
      <el-table :data="multiOrgDetail" size="small" max-height="260" stripe>
        <el-table-column prop="name" label="用户名称" width="100" />
        <el-table-column prop="empId" label="员工工号" width="100" />
        <el-table-column prop="orgCount" label="机构数" width="80" sortable />
        <el-table-column prop="orgs" label="所属机构" show-overflow-tooltip />
        <el-table-column prop="roles" label="角色汇总" show-overflow-tooltip />
      </el-table>
    </el-card>

    <!-- 原始数据 -->
    <el-card shadow="never" style="margin-top:16px;">
      <template #header>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span>用户授权明细（{{ filteredUsers.length }} 条）</span>
          <div style="display:flex; gap:8px;">
            <el-select v-model="filterStatus" clearable placeholder="用户状态" size="small" style="width:110px;">
              <el-option v-for="s in statusOptions" :key="s" :label="s" :value="s" />
            </el-select>
            <el-input v-model="search" placeholder="搜索姓名/工号/机构..." clearable style="width:200px;" size="small" />
          </div>
        </div>
      </template>
      <el-table :data="filteredUsers.slice(0, 300)" size="small" max-height="360" stripe>
        <el-table-column prop="用户名称" label="用户名称" width="100" />
        <el-table-column prop="员工工号" label="员工工号" width="100" />
        <el-table-column prop="所属机构" label="所属机构" show-overflow-tooltip min-width="160" />
        <el-table-column prop="人力主岗位" label="主岗位" width="130" show-overflow-tooltip />
        <el-table-column prop="人力员工状态" label="员工状态" width="80" />
        <el-table-column prop="用户状态" label="用户状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row['用户状态'] === '启用' ? 'success' : 'danger'" size="small">
              {{ row['用户状态'] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="用户角色" label="用户角色" show-overflow-tooltip min-width="200" />
      </el-table>
      <div v-if="filteredUsers.length > 300" style="text-align:center; color:#909399; font-size:12px; padding:8px;">
        仅展示前 300 条，共 {{ filteredUsers.length }} 条
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSysDashboardStore } from '@/stores/sysDashboard'

const store = useSysDashboardStore()
const search = ref('')
const filterStatus = ref('')

type Row = Record<string, unknown>

const users = computed(() => store.data.users ?? [])

// 拆分角色字段（单元格内逗号分隔）
function splitRoles(roleStr: unknown): string[] {
  const s = String(roleStr ?? '').trim()
  if (!s) return []
  return s.split(',').map(r => r.trim()).filter(Boolean)
}

// 各机构的用户数（去重）和授权记录数
const orgDist = computed(() => {
  const orgUsers: Record<string, Set<string>> = {}
  const orgRecords: Record<string, number> = {}
  for (const row of users.value) {
    const org = String(row['所属机构'] ?? '未知')
    const empId = String(row['员工工号'] ?? '')
    if (!orgUsers[org]) orgUsers[org] = new Set()
    orgUsers[org].add(empId)
    orgRecords[org] = (orgRecords[org] ?? 0) + 1
  }
  const maxUser = Math.max(...Object.values(orgUsers).map(s => s.size), 1)
  return Object.entries(orgUsers)
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 20)
    .map(([name, userSet]) => ({
      name,
      userCount: userSet.size,
      recordCount: orgRecords[name],
      pct: Math.round(userSet.size / maxUser * 1000) / 10,
    }))
})

// 角色分布（展开逗号分隔）
const roleDist = computed(() => {
  const map: Record<string, number> = {}
  for (const row of users.value) {
    for (const role of splitRoles(row['用户角色'])) {
      map[role] = (map[role] ?? 0) + 1
    }
  }
  const max = Math.max(...Object.values(map), 1)
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count, pct: Math.round(count / max * 1000) / 10 }))
})

// 跨机构用户（同一工号出现在多个机构）
const multiOrgDetail = computed(() => {
  const empMap: Record<string, { name: string; orgs: Set<string>; roles: Set<string> }> = {}
  for (const row of users.value) {
    const empId = String(row['员工工号'] ?? '')
    if (!empId) continue
    if (!empMap[empId]) empMap[empId] = { name: String(row['用户名称'] ?? ''), orgs: new Set(), roles: new Set() }
    empMap[empId].orgs.add(String(row['所属机构'] ?? ''))
    for (const r of splitRoles(row['用户角色'])) empMap[empId].roles.add(r)
  }
  return Object.entries(empMap)
    .filter(([, v]) => v.orgs.size > 1)
    .sort((a, b) => b[1].orgs.size - a[1].orgs.size)
    .map(([empId, v]) => ({
      empId,
      name: v.name,
      orgCount: v.orgs.size,
      orgs: [...v.orgs].join('、'),
      roles: [...v.roles].join('、'),
    }))
})

const stats = computed(() => {
  const totalRows = users.value.length
  const empIds = new Set(users.value.map(r => String(r['员工工号'] ?? '')).filter(Boolean))
  const uniqueUsers = empIds.size
  const orgCount = new Set(users.value.map(r => r['所属机构'])).size
  // 展开所有角色后去重
  const allRoles = new Set<string>()
  for (const row of users.value) splitRoles(row['用户角色']).forEach(r => allRoles.add(r))
  const roleCount = allRoles.size
  // 跨机构用户数
  const multiOrgUsers = multiOrgDetail.value.length
  // 多角色用户：单条记录角色数>1 或 同一工号跨行角色种类>1
  const empRoles: Record<string, Set<string>> = {}
  for (const row of users.value) {
    const empId = String(row['员工工号'] ?? '')
    if (!empId) continue
    if (!empRoles[empId]) empRoles[empId] = new Set()
    splitRoles(row['用户角色']).forEach(r => empRoles[empId].add(r))
  }
  const multiRoleUsers = Object.values(empRoles).filter(s => s.size > 1).length
  return { totalRows, uniqueUsers, orgCount, roleCount, multiOrgUsers, multiRoleUsers }
})

const statusOptions = computed(() =>
  [...new Set(users.value.map(r => String(r['用户状态'] ?? '')).filter(Boolean))]
)

const filteredUsers = computed(() => {
  let rows = users.value
  if (filterStatus.value) rows = rows.filter(r => r['用户状态'] === filterStatus.value)
  if (search.value) {
    const kw = search.value.toLowerCase()
    rows = rows.filter(r =>
      ['用户名称', '员工工号', '所属机构'].some(col => String(r[col] ?? '').toLowerCase().includes(kw))
    )
  }
  return rows
})
</script>

<style scoped>
.panel { padding: 4px; }
.summary-row { margin-bottom: 4px; }
.stat-card { text-align: center; padding: 4px 0; }
.stat-value { font-size: 28px; font-weight: 700; color: #409eff; line-height: 1.2; }
.stat-label { font-size: 12px; color: #909399; margin-top: 4px; }
</style>
