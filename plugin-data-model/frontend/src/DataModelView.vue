<template>
  <div class="dm-root">
    <!-- ══════════════════════════════════════════════ 左侧：表清单 ═════ -->
    <aside class="dm-side">
      <div class="dm-side-head">
        <el-input v-model="tableSearch" placeholder="搜索表名/表说明..." clearable size="small" />
        <el-button type="primary" size="small" style="width:100%;margin-top:8px"
                   @click="openTableModal(null)">+ 新增表</el-button>
      </div>
      <div class="dm-table-list">
        <div v-for="t in filteredTables" :key="t.id" class="dm-table-item"
             :class="{ active: currentTableId === t.id }" @click="selectTable(t.id)">
          <div class="dm-table-name">{{ t.table_name }}</div>
          <div class="dm-table-cmt">{{ t.table_comment || '—' }}</div>
          <div class="dm-table-meta">{{ t.column_count }} 字段 · {{ t.relation_count }} 关联</div>
        </div>
        <div v-if="!filteredTables.length" class="dm-empty">暂无表，先导入 SQL 或新增一张表</div>
      </div>
    </aside>

    <!-- ══════════════════════════════════════════════ 右侧：明细 ═══════ -->
    <section class="dm-main">
      <div class="dm-toolbar">
        <template v-if="currentTable">
          <strong class="dm-title">{{ currentTable.table_name }}</strong>
          <span class="dm-subtitle">{{ currentTable.table_comment }}</span>
          <el-button size="small" @click="openTableModal(currentTable)">编辑表</el-button>
          <el-button size="small" type="danger" plain @click="deleteTable(currentTable)">删除表</el-button>
        </template>
        <span v-else class="dm-subtitle">请从左侧选择一张表</span>
        <div class="dm-toolbar-right">
          <el-button size="small" @click="sqlModalVisible = true">导入 SQL</el-button>
          <el-button size="small" @click="inferRelations">推断关联</el-button>
          <el-button size="small" @click="exportDdl">导出 DDL</el-button>
        </div>
      </div>

      <div class="dm-tab-bar">
        <div v-for="t in tabs" :key="t.key" class="dm-tab-item"
             :class="{ active: activeTab === t.key }" @click="activeTab = t.key">{{ t.label }}</div>
      </div>

      <!-- ── 字段 ─────────────────────────────────────────────────────── -->
      <div v-show="activeTab === 'columns'" class="dm-panel">
        <div class="dm-panel-head">
          <el-input v-model="columnSearch" placeholder="搜索字段名/注释..." clearable size="small" style="width:240px" />
          <el-button size="small" type="primary" :disabled="!currentTableId"
                     @click="openColumnModal(null)">+ 新增字段</el-button>
        </div>
        <el-table :data="filteredColumns" border stripe size="small" height="100%" v-loading="loading">
          <el-table-column type="index" label="#" width="48" />
          <el-table-column prop="col_name" label="字段名" min-width="180">
            <template #default="{ row }">
              <strong>{{ row.col_name }}</strong>
              <el-tag v-if="row.is_pk" size="small" type="warning" style="margin-left:6px">PK</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="140">
            <template #default="{ row }">{{ typeText(row) }}</template>
          </el-table-column>
          <el-table-column label="必填" width="64" align="center">
            <template #default="{ row }">{{ row.nullable ? '' : '✔' }}</template>
          </el-table-column>
          <el-table-column prop="default_value" label="默认值" width="100" show-overflow-tooltip />
          <el-table-column prop="col_comment" label="注释" min-width="200" show-overflow-tooltip />
          <el-table-column label="操作" width="130" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="openColumnModal(row)">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteColumn(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- ── 关联关系 ─────────────────────────────────────────────────── -->
      <div v-show="activeTab === 'relations'" class="dm-panel">
        <div class="dm-panel-head">
          <el-checkbox v-model="showAllRelations" @change="loadRelations">显示全部表的关联</el-checkbox>
          <el-button size="small" type="primary" @click="openRelationModal(null)">+ 新增关联</el-button>
        </div>
        <el-table :data="relations" border stripe size="small" height="100%" v-loading="loading">
          <el-table-column label="来源" min-width="220">
            <template #default="{ row }">{{ row.from_table }}.<strong>{{ row.from_column }}</strong></template>
          </el-table-column>
          <el-table-column prop="rel_type" label="关系" width="90" align="center" />
          <el-table-column label="目标" min-width="220">
            <template #default="{ row }">{{ row.to_table }}.<strong>{{ row.to_column }}</strong></template>
          </el-table-column>
          <el-table-column label="来源方式" width="90" align="center">
            <template #default="{ row }">
              <el-tag size="small" :type="sourceTag(row.source)">{{ sourceText(row.source) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="160" show-overflow-tooltip />
          <el-table-column label="操作" width="130" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="openRelationModal(row)">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteRelation(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════ 弹窗：表 ════════ -->
    <el-dialog v-model="tableModalVisible" :title="tableForm.id ? '编辑表' : '新增表'" width="560px"
               :close-on-click-modal="false" destroy-on-close>
      <el-form :model="tableForm" label-width="80px" size="small">
        <el-form-item label="表名 *"><el-input v-model="tableForm.table_name" placeholder="如 admin_sm_user" /></el-form-item>
        <el-form-item label="表说明"><el-input v-model="tableForm.table_comment" /></el-form-item>
        <el-form-item label="所属模块"><el-input v-model="tableForm.module" placeholder="如 权限管理" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="tableForm.remark" type="textarea" :rows="2" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="tableModalVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="saveTable">保存</el-button>
      </template>
    </el-dialog>

    <!-- ══════════════════════════════════════════════ 弹窗：字段 ══════ -->
    <el-dialog v-model="columnModalVisible" :title="columnForm.id ? '编辑字段' : '新增字段'" width="620px"
               :close-on-click-modal="false" destroy-on-close>
      <el-form :model="columnForm" label-width="80px" size="small">
        <el-row :gutter="16">
          <el-col :span="12"><el-form-item label="字段名 *"><el-input v-model="columnForm.col_name" /></el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select v-model="columnForm.col_type" filterable allow-create default-first-option style="width:100%">
                <el-option v-for="t in commonTypes" :key="t" :label="t" :value="t" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"><el-form-item label="长度"><el-input v-model="columnForm.col_length" type="number" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="小数位"><el-input v-model="columnForm.col_scale" type="number" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="默认值"><el-input v-model="columnForm.default_value" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="排序号"><el-input v-model="columnForm.ordinal" type="number" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="主键"><el-switch v-model="columnForm.is_pk" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="允许空"><el-switch v-model="columnForm.nullable" /></el-form-item></el-col>
          <el-col :span="24"><el-form-item label="注释"><el-input v-model="columnForm.col_comment" /></el-form-item></el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="columnModalVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="saveColumn">保存</el-button>
      </template>
    </el-dialog>

    <!-- ══════════════════════════════════════════════ 弹窗：关联 ══════ -->
    <el-dialog v-model="relationModalVisible" :title="relationForm.id ? '编辑关联' : '新增关联'" width="620px"
               :close-on-click-modal="false" destroy-on-close>
      <el-form :model="relationForm" label-width="90px" size="small">
        <el-form-item label="来源表">
          <el-select v-model="relationForm.from_table_id" filterable style="width:100%"
                     @change="onRelTableChange('from')">
            <el-option v-for="t in tables" :key="t.id" :label="labelOf(t)" :value="t.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="来源字段 *">
          <el-select v-model="relationForm.from_col_id" filterable style="width:100%">
            <el-option v-for="c in fromColumns" :key="c.id" :label="colLabel(c)" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="关系类型">
          <el-select v-model="relationForm.rel_type" style="width:100%">
            <el-option v-for="t in relTypes" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标表">
          <el-select v-model="relationForm.to_table_id" filterable style="width:100%"
                     @change="onRelTableChange('to')">
            <el-option v-for="t in tables" :key="t.id" :label="labelOf(t)" :value="t.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标字段 *">
          <el-select v-model="relationForm.to_col_id" filterable style="width:100%">
            <el-option v-for="c in toColumns" :key="c.id" :label="colLabel(c)" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注"><el-input v-model="relationForm.remark" type="textarea" :rows="2" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="relationModalVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="saveRelation">保存</el-button>
      </template>
    </el-dialog>

    <!-- ══════════════════════════════════════════════ 弹窗：导入 SQL ══ -->
    <el-dialog v-model="sqlModalVisible" title="导入 SQL 建表语句" width="760px"
               :close-on-click-modal="false" destroy-on-close>
      <div class="dm-panel-head" style="padding:0 0 8px">
        <el-button size="small" @click="sqlFileRef?.click()">选择 .sql 文件</el-button>
        <input ref="sqlFileRef" type="file" accept=".sql,.txt" style="display:none" @change="readSqlFile" />
        <el-checkbox v-model="sqlOverwrite">覆盖同名表（取消勾选则跳过已存在的表）</el-checkbox>
      </div>
      <el-input v-model="sqlText" type="textarea" :rows="16" spellcheck="false"
                placeholder="粘贴 CREATE TABLE 语句，或选择 .sql 文件（RTF 富文本会自动转换）" />
      <template #footer>
        <el-button @click="sqlModalVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="importSql">开始解析导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'

const props = defineProps<{ api: ToolboxAPI; toolId: string }>()

type Row = Record<string, any>

const tabs = [
  { key: 'columns',   label: '字段结构' },
  { key: 'relations', label: '关联关系' },
]
const commonTypes = ['varchar', 'char', 'int', 'bigint', 'decimal', 'datetime', 'timestamp', 'date', 'text', 'longtext', 'blob']
const relTypes = ['一对一', '一对多', '多对一', '多对多']

const loading = ref(false)
const saving  = ref(false)
const activeTab = ref('columns')

const tables   = ref<Row[]>([])
const columns  = ref<Row[]>([])
const relations = ref<Row[]>([])
const currentTableId = ref<string | null>(null)

const tableSearch  = ref('')
const columnSearch = ref('')
const showAllRelations = ref(false)

const currentTable = computed(() => tables.value.find(t => t.id === currentTableId.value) || null)

const filteredTables = computed(() => {
  const kw = tableSearch.value.trim().toLowerCase()
  if (!kw) return tables.value
  return tables.value.filter(t =>
    String(t.table_name || '').toLowerCase().includes(kw) ||
    String(t.table_comment || '').toLowerCase().includes(kw))
})

const filteredColumns = computed(() => {
  const kw = columnSearch.value.trim().toLowerCase()
  if (!kw) return columns.value
  return columns.value.filter(c =>
    String(c.col_name || '').toLowerCase().includes(kw) ||
    String(c.col_comment || '').toLowerCase().includes(kw))
})

function typeText(row: Row) {
  if (!row.col_type) return '—'
  if (row.col_length == null) return row.col_type
  return row.col_scale != null
    ? `${row.col_type}(${row.col_length},${row.col_scale})`
    : `${row.col_type}(${row.col_length})`
}
const labelOf = (t: Row) => t.table_comment ? `${t.table_name} — ${t.table_comment}` : t.table_name
const colLabel = (c: Row) => c.col_comment ? `${c.col_name} — ${c.col_comment}` : c.col_name
const sourceText = (s: string) => ({ 'sql-fk': '外键', infer: '推断', manual: '手工' } as Row)[s] || '手工'
const sourceTag  = (s: string) => ({ 'sql-fk': 'success', infer: 'info', manual: '' } as Row)[s] || ''

// ── 数据加载 ────────────────────────────────────────────────────────────
async function loadTables(keepSelection = true) {
  const res = await props.api.plugin.callSync('listTables', {})
  tables.value = res.tables || []
  if (!keepSelection || !tables.value.some(t => t.id === currentTableId.value)) {
    currentTableId.value = tables.value.length ? tables.value[0].id : null
  }
  await loadDetail()
}

async function loadDetail() {
  await Promise.all([loadColumns(), loadRelations()])
}

async function loadColumns() {
  if (!currentTableId.value) { columns.value = []; return }
  const res = await props.api.plugin.callSync('listColumns', { table_id: currentTableId.value })
  columns.value = res.columns || []
}

async function loadRelations() {
  const params = showAllRelations.value || !currentTableId.value ? {} : { table_id: currentTableId.value }
  const res = await props.api.plugin.callSync('listRelations', params)
  relations.value = res.relations || []
}

async function selectTable(id: string) {
  currentTableId.value = id
  columnSearch.value = ''
  loading.value = true
  try { await loadDetail() } finally { loading.value = false }
}

onMounted(async () => {
  loading.value = true
  try { await loadTables(false) } finally { loading.value = false }
})

// ── 表维护 ──────────────────────────────────────────────────────────────
const tableModalVisible = ref(false)
const tableForm = ref<Row>({})

function openTableModal(row: Row | null) {
  tableForm.value = row
    ? { ...row }
    : { id: '', table_name: '', table_comment: '', module: '', remark: '' }
  tableModalVisible.value = true
}

async function saveTable() {
  if (!String(tableForm.value.table_name || '').trim()) { ElMessage.warning('表名不能为空'); return }
  saving.value = true
  try {
    const res = await props.api.plugin.callSync('saveTable', tableForm.value)
    tableModalVisible.value = false
    ElMessage.success('保存成功')
    currentTableId.value = res.id || currentTableId.value
    await loadTables()
  } catch (e) {
    // 框架已弹错误提示，这里只保持弹窗打开供修改
  } finally { saving.value = false }
}

async function deleteTable(row: Row) {
  try {
    await ElMessageBox.confirm(
      `删除表 ${row.table_name} 会同时删除它的全部字段和关联关系，确认？`, '删除确认', { type: 'warning' })
  } catch { return }
  await props.api.plugin.callSync('deleteTable', { id: row.id })
  ElMessage.success('已删除')
  await loadTables(false)
}

// ── 字段维护 ────────────────────────────────────────────────────────────
const columnModalVisible = ref(false)
const columnForm = ref<Row>({})

function openColumnModal(row: Row | null) {
  if (!currentTableId.value) { ElMessage.warning('请先选择一张表'); return }
  columnForm.value = row
    ? { ...row, is_pk: !!row.is_pk, nullable: !!row.nullable }
    : { id: '', table_id: currentTableId.value, col_name: '', col_type: 'varchar',
        col_length: '', col_scale: '', default_value: '', col_comment: '',
        ordinal: columns.value.length + 1, is_pk: false, nullable: true }
  columnModalVisible.value = true
}

async function saveColumn() {
  if (!String(columnForm.value.col_name || '').trim()) { ElMessage.warning('字段名不能为空'); return }
  saving.value = true
  try {
    await props.api.plugin.callSync('saveColumn', {
      ...columnForm.value,
      table_id: currentTableId.value,
      is_pk: columnForm.value.is_pk ? 1 : 0,
      nullable: columnForm.value.nullable ? 1 : 0,
    })
    columnModalVisible.value = false
    ElMessage.success('保存成功')
    await Promise.all([loadColumns(), loadTables()])
  } catch (e) {
    // 框架已弹错误提示
  } finally { saving.value = false }
}

async function deleteColumn(row: Row) {
  try {
    await ElMessageBox.confirm(
      `删除字段 ${row.col_name}？涉及该字段的关联关系会一并删除。`, '删除确认', { type: 'warning' })
  } catch { return }
  await props.api.plugin.callSync('deleteColumn', { id: row.id })
  ElMessage.success('已删除')
  await Promise.all([loadColumns(), loadRelations(), loadTables()])
}

// ── 关联维护 ────────────────────────────────────────────────────────────
const relationModalVisible = ref(false)
const relationForm = ref<Row>({})
const fromColumns = ref<Row[]>([])
const toColumns = ref<Row[]>([])

async function fetchColumns(tableId: string): Promise<Row[]> {
  if (!tableId) return []
  const res = await props.api.plugin.callSync('listColumns', { table_id: tableId })
  return res.columns || []
}

async function onRelTableChange(side: 'from' | 'to') {
  if (side === 'from') {
    relationForm.value.from_col_id = ''
    fromColumns.value = await fetchColumns(relationForm.value.from_table_id)
  } else {
    relationForm.value.to_col_id = ''
    toColumns.value = await fetchColumns(relationForm.value.to_table_id)
  }
}

async function openRelationModal(row: Row | null) {
  relationForm.value = row
    ? { ...row }
    : { id: '', from_table_id: currentTableId.value || '', from_col_id: '',
        to_table_id: '', to_col_id: '', rel_type: '多对一', remark: '' }
  const [f, t] = await Promise.all([
    fetchColumns(relationForm.value.from_table_id),
    fetchColumns(relationForm.value.to_table_id),
  ])
  fromColumns.value = f
  toColumns.value = t
  relationModalVisible.value = true
}

async function saveRelation() {
  if (!relationForm.value.from_col_id || !relationForm.value.to_col_id) {
    ElMessage.warning('来源字段和目标字段都必须选择'); return
  }
  saving.value = true
  try {
    await props.api.plugin.callSync('saveRelation', relationForm.value)
    relationModalVisible.value = false
    ElMessage.success('保存成功')
    await Promise.all([loadRelations(), loadTables()])
  } catch (e) {
    // 框架已弹错误提示
  } finally { saving.value = false }
}

async function deleteRelation(row: Row) {
  try {
    await ElMessageBox.confirm(
      `删除关联 ${row.from_table}.${row.from_column} → ${row.to_table}.${row.to_column}？`,
      '删除确认', { type: 'warning' })
  } catch { return }
  await props.api.plugin.callSync('deleteRelation', { id: row.id })
  ElMessage.success('已删除')
  await Promise.all([loadRelations(), loadTables()])
}

async function inferRelations() {
  try {
    await ElMessageBox.confirm(
      '将按「本表普通字段 ↔ 他表同名主键字段」自动补充关联关系，已有关联不会被覆盖。继续？',
      '推断关联', { type: 'info' })
  } catch { return }
  loading.value = true
  try {
    const res = await props.api.plugin.callSync('inferRelations', {})
    ElMessage.success(`推断完成，新增 ${res.added} 条关联`)
    await Promise.all([loadRelations(), loadTables()])
  } finally { loading.value = false }
}

// ── SQL 导入 / DDL 导出 ─────────────────────────────────────────────────
const sqlModalVisible = ref(false)
const sqlText = ref('')
const sqlOverwrite = ref(true)
const sqlFileRef = ref<HTMLInputElement>()

async function readSqlFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  sqlText.value = await file.text()
  ;(e.target as HTMLInputElement).value = ''
  ElMessage.success(`已读取 ${file.name}`)
}

async function importSql() {
  if (!sqlText.value.trim()) { ElMessage.warning('请先粘贴或选择 SQL 内容'); return }
  saving.value = true
  try {
    const res = await props.api.plugin.callSync('importSql', {
      sql: sqlText.value, overwrite: sqlOverwrite.value,
    })
    sqlModalVisible.value = false
    sqlText.value = ''
    ElMessage.success(
      (res.fromRtf ? '已识别为 RTF 富文本并自动转换。' : '') +
      `导入完成：新增 ${res.created} 张表，覆盖 ${res.updated} 张，跳过 ${res.skipped} 张，` +
      `共 ${res.columns} 个字段、${res.relations} 条外键关联`)
    await loadTables(false)
  } catch (e) {
    // 框架已弹错误提示
  } finally { saving.value = false }
}

async function exportDdl() {
  const res = await props.api.plugin.callSync('exportDdl', {})
  const blob = new Blob([res.ddl || ''], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `data-model-${new Date().toISOString().slice(0, 10)}.sql`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已导出 DDL')
}
</script>

<style scoped>
.dm-root { display: flex; height: 100%; min-height: 0; background: #f5f7fa; }

/* 左侧表清单 */
.dm-side { width: 260px; flex: none; display: flex; flex-direction: column;
           background: #fff; border-right: 1px solid #e4e7ed; }
.dm-side-head { padding: 10px; border-bottom: 1px solid #f0f2f5; }
.dm-table-list { flex: 1; overflow-y: auto; }
.dm-table-item { padding: 8px 12px; border-bottom: 1px solid #f5f7fa; cursor: pointer; }
.dm-table-item:hover { background: #f5f7fa; }
.dm-table-item.active { background: #ecf5ff; border-left: 3px solid #409eff; padding-left: 9px; }
.dm-table-name { font-size: 13px; font-weight: 600; color: #303133; word-break: break-all; }
.dm-table-cmt  { font-size: 12px; color: #909399; margin-top: 2px;
                 overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dm-table-meta { font-size: 11px; color: #c0c4cc; margin-top: 2px; }
.dm-empty { padding: 24px 12px; text-align: center; color: #c0c4cc; font-size: 12px; }

/* 右侧主区 */
.dm-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.dm-toolbar { display: flex; align-items: center; gap: 10px; padding: 10px 12px;
              background: #fff; border-bottom: 1px solid #e4e7ed; }
.dm-title { font-size: 14px; color: #303133; }
.dm-subtitle { font-size: 12px; color: #909399; }
.dm-toolbar-right { margin-left: auto; display: flex; gap: 8px; }

.dm-tab-bar { display: flex; background: #fff; border-bottom: 1px solid #e4e7ed; padding: 0 12px; }
.dm-tab-item { padding: 8px 16px; font-size: 13px; color: #606266; cursor: pointer;
               border-bottom: 2px solid transparent; }
.dm-tab-item.active { color: #409eff; border-bottom-color: #409eff; font-weight: 600; }

.dm-panel { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 10px 12px; }
.dm-panel-head { display: flex; align-items: center; gap: 10px; padding-bottom: 8px; }
.dm-panel-head > :last-child { margin-left: auto; }
</style>
