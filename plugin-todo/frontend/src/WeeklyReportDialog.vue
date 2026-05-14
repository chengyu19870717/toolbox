<template>
  <el-dialog
    :model-value="visible"
    title="每周复盘"
    width="680px"
    @close="$emit('close')"
    append-to-body
  >
    <!-- week selector -->
    <div class="wr-header">
      <el-button size="small" @click="prevWeek">‹ 上周</el-button>
      <span class="wr-week-label">{{ weekLabel }}</span>
      <el-button size="small" @click="nextWeek" :disabled="!canGoNext">下周 ›</el-button>
    </div>

    <div v-if="report" class="wr-body">
      <!-- stat cards -->
      <div class="wr-stats">
        <div class="wr-stat">
          <div class="wr-stat__num">{{ report.totalCreated }}</div>
          <div class="wr-stat__label">新建任务</div>
        </div>
        <div class="wr-stat wr-stat--green">
          <div class="wr-stat__num">{{ report.totalCompleted }}</div>
          <div class="wr-stat__label">完成任务</div>
        </div>
        <div class="wr-stat wr-stat--orange">
          <div class="wr-stat__num">{{ report.totalRollover }}</div>
          <div class="wr-stat__label">顺延任务</div>
        </div>
        <div class="wr-stat" :class="rateClass">
          <div class="wr-stat__num">{{ report.completionRate.toFixed(1) }}%</div>
          <div class="wr-stat__label">完成率</div>
        </div>
      </div>

      <!-- daily trend -->
      <div class="wr-section">
        <div class="wr-section__title">📈 每日趋势</div>
        <table class="wr-table">
          <thead>
            <tr>
              <th>日期</th>
              <th v-for="d in report.dailyStats" :key="d.date">{{ formatDateShort(d.date) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>新建</td>
              <td v-for="d in report.dailyStats" :key="d.date">{{ d.created || '-' }}</td>
            </tr>
            <tr>
              <td>完成</td>
              <td v-for="d in report.dailyStats" :key="d.date" class="td-green">{{ d.completed || '-' }}</td>
            </tr>
            <tr>
              <td>顺延</td>
              <td v-for="d in report.dailyStats" :key="d.date" class="td-orange">{{ d.rollover || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- project stats -->
      <div v-if="report.projectStats.length > 0" class="wr-section">
        <div class="wr-section__title">📊 按项目统计</div>
        <table class="wr-table">
          <thead>
            <tr><th>项目</th><th>新建</th><th>完成</th><th>完成率</th></tr>
          </thead>
          <tbody>
            <tr v-for="ps in report.projectStats" :key="ps.name">
              <td>{{ ps.name }}</td>
              <td>{{ ps.created }}</td>
              <td class="td-green">{{ ps.completed }}</td>
              <td>{{ ps.created > 0 ? Math.round(ps.completed / ps.created * 100) : 0 }}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- overdue -->
      <div v-if="report.overdueTasks.length > 0" class="wr-section">
        <div class="wr-section__title">⚠️ 当前逾期未完成</div>
        <div class="wr-overdue-list">
          <div v-for="t in report.overdueTasks" :key="t.id" class="wr-overdue-item">
            · {{ t.title }}（原定{{ formatDate(t.originalTargetDate) }}，已顺延{{ t.rolloverCount }}次）
            <span v-if="t.project" class="wr-proj">{{ t.project }}</span>
          </div>
        </div>
      </div>

      <!-- summary -->
      <div class="wr-summary">
        <div class="wr-section__title">💡 本周小结</div>
        <p v-for="(line, i) in summaryLines" :key="i" class="wr-summary-line">{{ line }}</p>
      </div>
    </div>

    <template #footer>
      <el-button @click="exportJson">导出 JSON</el-button>
      <el-button type="primary" @click="exportExcel">导出 Excel</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import type { WeeklyReport } from './types'
import { todayStr, mondayOf, sundayOf, formatDate } from './useTodoStore'
import * as XLSX from 'xlsx'

const props = defineProps<{
  visible: boolean
  generateReport: (weekStart: string) => WeeklyReport
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const currentWeekStart = ref(mondayOf(todayStr()))

watch(() => props.visible, (v) => {
  if (v) currentWeekStart.value = mondayOf(todayStr())
})

const report = computed(() => props.generateReport(currentWeekStart.value))

const weekLabel = computed(() => {
  const ws = currentWeekStart.value
  const we = sundayOf(ws)
  const [y, wm, wd] = ws.split('-').map(Number)
  const [, em, ed] = we.split('-').map(Number)
  const weekNum = getWeekNumber(ws)
  return `${y}年${wm}月${wd}日 — ${em}月${ed}日（第${weekNum}周）`
})

const canGoNext = computed(() => sundayOf(currentWeekStart.value) < todayStr())

function prevWeek() {
  const d = new Date(currentWeekStart.value)
  d.setDate(d.getDate() - 7)
  currentWeekStart.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function nextWeek() {
  if (!canGoNext.value) return
  const d = new Date(currentWeekStart.value)
  d.setDate(d.getDate() + 7)
  currentWeekStart.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getWeekNumber(dateStr: string): number {
  const d = new Date(dateStr)
  const startOfYear = new Date(d.getFullYear(), 0, 1)
  const diff = d.getTime() - startOfYear.getTime()
  return Math.ceil((diff / 86400000 + startOfYear.getDay() + 1) / 7)
}

function formatDateShort(iso: string): string {
  const [, m, d] = iso.split('-').map(Number)
  return `${m}/${d}`
}

const rateClass = computed(() => {
  const rate = report.value?.completionRate ?? 0
  if (rate >= 80) return 'wr-stat--green'
  if (rate >= 50) return 'wr-stat--orange'
  return 'wr-stat--red'
})

const summaryLines = computed(() => {
  if (!report.value) return []
  const r = report.value
  const lines: string[] = []

  if (r.completionRate >= 80) lines.push('本周完成度很高，继续保持！')
  else if (r.completionRate >= 50) lines.push('本周完成了大部分任务，还有提升空间。')
  else if (r.totalCreated > 0) lines.push('本周完成度偏低，建议精简任务优先级。')
  else lines.push('本周暂无任务记录。')

  const repeated = r.overdueTasks.filter(t => t.rolloverCount >= 3)
  if (repeated.length > 0) lines.push(`有${repeated.length}个任务反复顺延超过3次，建议评估是否需要调整优先级。`)

  r.projectStats.forEach(ps => {
    if (ps.created > 0 && ps.completed / ps.created < 0.3) {
      lines.push(`「${ps.name}」任务完成度较低，建议关注进度。`)
    }
  })

  return lines
})

function exportJson() {
  if (!report.value) return
  const json = JSON.stringify(report.value, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `weekly-report-${currentWeekStart.value}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function exportExcel() {
  if (!report.value) return
  const r = report.value
  const wb = XLSX.utils.book_new()

  // Sheet1: 周报概览
  const overview = [
    ['周期', `${r.weekStart} ~ ${r.weekEnd}`],
    ['新建任务', r.totalCreated],
    ['完成任务', r.totalCompleted],
    ['顺延任务', r.totalRollover],
    ['逾期任务', r.totalOverdue],
    ['完成率', `${r.completionRate.toFixed(1)}%`],
  ]
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(overview), '周报概览')

  // Sheet2: 每日明细
  const daily = [['日期', '新建', '完成', '顺延'], ...r.dailyStats.map(d => [d.date, d.created, d.completed, d.rollover])]
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(daily), '每日明细')

  // Sheet3: 逾期任务
  const overdue = [
    ['任务标题', '所属项目', '原定日期', '顺延次数'],
    ...r.overdueTasks.map(t => [t.title, t.project ?? '', t.originalTargetDate, t.rolloverCount])
  ]
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(overdue), '逾期任务')

  XLSX.writeFile(wb, `weekly-report-${r.weekStart}.xlsx`)
}
</script>

<style scoped>
.wr-header { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px; }
.wr-week-label { font-size: 15px; font-weight: 600; color: #303133; }

.wr-stats { display: flex; gap: 12px; margin-bottom: 20px; }
.wr-stat {
  flex: 1; text-align: center; background: #f5f7fa; border-radius: 8px; padding: 12px;
}
.wr-stat--green { background: #f0f9eb; }
.wr-stat--orange { background: #fdf6ec; }
.wr-stat--red { background: #fef0f0; }
.wr-stat__num { font-size: 24px; font-weight: 700; color: #303133; }
.wr-stat--green .wr-stat__num { color: #67c23a; }
.wr-stat--orange .wr-stat__num { color: #e6a23c; }
.wr-stat--red .wr-stat__num { color: #f56c6c; }
.wr-stat__label { font-size: 12px; color: #909399; margin-top: 4px; }

.wr-section { margin-bottom: 16px; }
.wr-section__title { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 8px; }

.wr-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.wr-table th, .wr-table td {
  border: 1px solid #ebeef5; padding: 6px 10px; text-align: center;
}
.wr-table th { background: #f5f7fa; color: #606266; }
.wr-table td:first-child { text-align: left; color: #606266; }
.td-green { color: #67c23a; }
.td-orange { color: #e6a23c; }

.wr-overdue-list { font-size: 13px; color: #606266; }
.wr-overdue-item { padding: 3px 0; }
.wr-proj { font-size: 11px; background: #e8f4fd; color: #409eff; border-radius: 3px; padding: 0 5px; margin-left: 4px; }

.wr-summary { background: #f5f7fa; border-radius: 8px; padding: 12px; }
.wr-summary-line { margin: 4px 0; font-size: 13px; color: #606266; }
</style>
