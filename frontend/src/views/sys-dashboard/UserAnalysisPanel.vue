<template>
  <div class="panel">
    <!-- 汇总卡片 -->
    <el-row :gutter="16" class="summary-row">
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">用户总数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.orgCount }}</div>
          <div class="stat-label">涉及机构数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.roleCount }}</div>
          <div class="stat-label">角色种类</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-value">{{ stats.multiRoleUsers }}</div>
          <div class="stat-label">多角色用户</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top:16px;">
      <!-- 用户/机构分布 -->
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>用户机构分布（Top 20）</template>
          <el-table :data="orgDist" size="small" max-height="320" stripe>
            <el-table-column prop="name" label="机构" show-overflow-tooltip />
            <el-table-column prop="count" label="用户数" width="90" sortable />
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
          <template #header>角色分配分布</template>
          <el-table :data="roleDist" size="small" max-height="320" stripe>
            <el-table-column prop="name" label="角色" show-overflow-tooltip />
            <el-table-column prop="count" label="用户数" width="90" sortable />
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

    <!-- 原始数据 -->
    <el-card shadow="never" style="margin-top:16px;">
      <template #header>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span>用户明细（{{ filteredUsers.length }} 条）</span>
          <el-input v-model="search" placeholder="搜索..." clearable style="width:200px;" size="small" />
        </div>
      </template>
      <el-table :data="filteredUsers.slice(0, 200)" size="small" max-height="360" stripe>
        <el-table-column v-for="col in userColumns" :key="col" :prop="col" :label="col"
                         show-overflow-tooltip min-width="120" />
      </el-table>
      <div v-if="filteredUsers.length > 200" style="text-align:center; color:#909399; font-size:12px; padding:8px;">
        仅展示前 200 条，共 {{ filteredUsers.length }} 条
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSysDashboardStore } from '@/stores/sysDashboard'

const store = useSysDashboardStore()
const search = ref('')

const users = computed(() => store.data.users ?? [])
const userColumns = computed(() => users.value.length ? Object.keys(users.value[0]) : [])

// 推断关键字段列名
function findCol(row: Record<string, unknown>, keywords: string[]): string | undefined {
  return Object.keys(row).find(k => keywords.some(kw => k.includes(kw)))
}

const orgCol = computed(() => users.value.length ? findCol(users.value[0], ['机构', '部门', 'org', 'dept']) : undefined)
const roleCol = computed(() => users.value.length ? findCol(users.value[0], ['角色', 'role']) : undefined)

function groupBy(rows: Record<string, unknown>[], col: string) {
  const map: Record<string, number> = {}
  for (const row of rows) {
    const key = String(row[col] ?? '未知')
    map[key] = (map[key] ?? 0) + 1
  }
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count, pct: Math.round(count / rows.length * 1000) / 10 }))
}

const orgDist = computed(() => orgCol.value ? groupBy(users.value, orgCol.value) : [])
const roleDist = computed(() => roleCol.value ? groupBy(users.value, roleCol.value) : [])

// 多角色用户：同一用户出现多次（按姓名/账号去重后 count>1）
const stats = computed(() => {
  const total = users.value.length
  const orgCount = orgCol.value ? new Set(users.value.map(r => r[orgCol.value!])).size : 0
  const roleCount = roleCol.value ? new Set(users.value.map(r => r[roleCol.value!])).size : 0
  // 找用户名列
  const nameCol = users.value.length ? findCol(users.value[0], ['用户名', '账号', '姓名', 'username', 'name']) : undefined
  let multiRoleUsers = 0
  if (nameCol) {
    const nameCount: Record<string, number> = {}
    for (const r of users.value) {
      const n = String(r[nameCol] ?? '')
      nameCount[n] = (nameCount[n] ?? 0) + 1
    }
    multiRoleUsers = Object.values(nameCount).filter(c => c > 1).length
  }
  return { total, orgCount, roleCount, multiRoleUsers }
})

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  const kw = search.value.toLowerCase()
  return users.value.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(kw)))
})
</script>

<style scoped>
.panel { padding: 4px; }
.summary-row { margin-bottom: 4px; }
.stat-card { text-align: center; }
.stat-value { font-size: 32px; font-weight: 700; color: #409eff; line-height: 1.2; }
.stat-label { font-size: 13px; color: #909399; margin-top: 4px; }
</style>
