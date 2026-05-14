<template>
  <div class="ds-root">
    <!-- ── Tab 栏（v-show 保证 DOM 不销毁） ──────────────────────────────── -->
    <div class="ds-tab-bar">
      <div v-for="t in tabs" :key="t.key" class="ds-tab-item"
           :class="{ active: activeTab === t.key }" @click="activeTab = t.key">
        {{ t.label }}
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════ 字根维护 ══════ -->
    <div v-show="activeTab === 'roots'" class="ds-panel">
      <div class="ds-panel-header">
        <el-input v-model="rootSearch" placeholder="搜索字根..." clearable style="width:240px" />
        <el-button @click="exportRoots"><el-icon><Download /></el-icon> 导出CSV</el-button>
        <el-button @click="triggerImport('root')"><el-icon><Upload /></el-icon> 导入CSV</el-button>
        <el-button @click="openRootGraph" :disabled="!selectedRootId">📊 关联图谱</el-button>
        <el-button type="primary" @click="openRootModal(null)">+ 新增字根</el-button>
      </div>
      <el-table :data="filteredRoots" border stripe size="small" max-height="560"
                highlight-current-row @current-change="(r:any) => selectedRootId = r?.id ?? null">
        <el-table-column prop="id" label="字根ID" width="140" />
        <el-table-column prop="name" label="字根名" width="140">
          <template #default="{ row }"><strong>{{ row.name }}</strong></template>
        </el-table-column>
        <el-table-column prop="meaning" label="字根含义" min-width="140" show-overflow-tooltip />
        <el-table-column prop="root_type" label="字根类型" width="100" />
        <el-table-column prop="length" label="长度" width="60" />
        <el-table-column label="码值数" width="70" align="center">
          <template #default="{ row }">
            {{ parseCodeValues(row.code_values).length || '—' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click.stop="openRootModal(row)">编辑</el-button>
            <el-button size="small" type="danger" @click.stop="deleteRoot(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ══════════════════════════════════════════════════ 标准字段维护 ══ -->
    <div v-show="activeTab === 'fields'" class="ds-panel">
      <div class="ds-panel-header">
        <el-input v-model="fieldSearch" placeholder="搜索字段..." clearable style="width:240px" />
        <el-button @click="exportFields"><el-icon><Download /></el-icon> 导出CSV</el-button>
        <el-button @click="triggerImport('field')"><el-icon><Upload /></el-icon> 导入CSV</el-button>
        <el-button @click="openFieldGraph" :disabled="!selectedFieldId">📊 关联图谱</el-button>
        <el-button type="primary" @click="openFieldModal(null)">+ 新增字段</el-button>
      </div>
      <el-table :data="filteredFields" border stripe size="small" max-height="560"
                highlight-current-row @current-change="(r:any) => selectedFieldId = r?.id ?? null">
        <el-table-column prop="id" label="字段ID" width="140" />
        <el-table-column prop="name_en" label="字段英文名" width="160">
          <template #default="{ row }"><strong>{{ row.name_en }}</strong></template>
        </el-table-column>
        <el-table-column prop="name_cn" label="字段中文名" min-width="130" show-overflow-tooltip />
        <el-table-column prop="field_type" label="字段类型" width="100" />
        <el-table-column prop="length" label="长度" width="60" />
        <el-table-column prop="root_name" label="引用字根" width="120" show-overflow-tooltip />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click.stop="openFieldModal(row)">编辑</el-button>
            <el-button size="small" type="danger" @click.stop="deleteField(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ══════════════════════════════════════════════════ 接口维护 ══════ -->
    <div v-show="activeTab === 'interfaces'" class="ds-panel">
      <div class="ds-panel-header">
        <el-input v-model="ifaceSearch" placeholder="搜索接口..." clearable style="width:240px" />
        <el-button type="primary" @click="openIfaceModal(null)">+ 新增接口</el-button>
      </div>
      <el-table :data="filteredIfaces" border stripe size="small" max-height="560">
        <el-table-column prop="id" label="接口ID" width="160" />
        <el-table-column prop="name" label="接口名称" width="180">
          <template #default="{ row }"><strong>{{ row.name }}</strong></template>
        </el-table-column>
        <el-table-column prop="description" label="接口描述" min-width="180" show-overflow-tooltip />
        <el-table-column label="输入字段数" width="90" align="center">
          <template #default="{ row }">{{ parseJSON(row.input_json).length }}</template>
        </el-table-column>
        <el-table-column label="输出字段数" width="90" align="center">
          <template #default="{ row }">{{ parseJSON(row.output_json).length }}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="openIfaceModal(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteIface(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ══════════════════════════════════════════════════ 规则维护 ════════ -->
    <div v-show="activeTab === 'rules'" class="ds-panel">
      <div class="ds-panel-header">
        <el-input v-model="ruleSearch" placeholder="搜索规则..." clearable style="width:240px" />
        <el-button type="primary" @click="openRuleModal(null)">+ 新增规则</el-button>
      </div>
      <el-table :data="filteredRules" border stripe size="small" max-height="560">
        <el-table-column prop="id" label="规则ID" width="160" />
        <el-table-column prop="name" label="规则名称" width="180">
          <template #default="{ row }"><strong>{{ row.name }}</strong></template>
        </el-table-column>
        <el-table-column prop="description" label="规则描述" min-width="180" show-overflow-tooltip />
        <el-table-column label="输入字段数" width="90" align="center">
          <template #default="{ row }">{{ parseJSON(row.input_json).length }}</template>
        </el-table-column>
        <el-table-column label="输出字段数" width="90" align="center">
          <template #default="{ row }">{{ parseJSON(row.output_json).length }}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="openRuleModal(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteRule(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ══════════════════════════════════════════════ 弹窗：字根编辑 ═════ -->
    <el-dialog v-model="rootModalVisible" :title="rootForm.id && !rootIsNew ? '编辑字根' : '新增字根'"
               width="680px" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="rootForm" label-width="90px" size="small">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="字根ID *">
              <el-input v-model="rootForm.id" :disabled="!rootIsNew" placeholder="如 ROOT_001" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字根名 *">
              <el-input v-model="rootForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字根含义">
              <el-input v-model="rootForm.meaning" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字根类型 *">
              <el-select v-model="rootForm.root_type" style="width:100%">
                <el-option v-for="t in rootTypes" :key="t" :label="t" :value="t" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字根长度">
              <el-input v-model="rootForm.length" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="字根备注">
              <el-input v-model="rootForm.remark" type="textarea" :rows="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 码值编辑器（仅字符型） -->
        <div v-if="rootForm.root_type === '字符型'" style="margin-top:8px;">
          <div style="font-size:12px;font-weight:600;color:#909399;margin-bottom:8px;">码值序列</div>
          <div class="cv-editor">
            <div class="cv-header">
              <span>码值编码</span><span>码值含义</span><span></span>
            </div>
            <div v-for="(row, i) in codeRows" :key="i" class="cv-row">
              <el-input v-model="row.code" placeholder="码值" size="small" style="border-radius:0;border-right:1px solid #e4e7ed;" />
              <el-input v-model="row.label" placeholder="含义" size="small" style="border-radius:0;" />
              <button class="cv-del-btn" @click="codeRows.splice(i,1)">×</button>
            </div>
            <button class="cv-add-btn" @click="codeRows.push({code:'',label:''})">+ 添加码值</button>
          </div>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="rootModalVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRoot" :loading="saving">保存</el-button>
      </template>
    </el-dialog>

    <!-- ══════════════════════════════════════════════ 弹窗：字段编辑 ═════ -->
    <el-dialog v-model="fieldModalVisible" :title="fieldIsNew ? '新增字段' : '编辑字段'"
               width="680px" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="fieldForm" label-width="110px" size="small">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="字段ID *">
              <el-input v-model="fieldForm.id" :disabled="!fieldIsNew" placeholder="如 FIELD_001" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段中文名 *">
              <el-input v-model="fieldForm.name_cn" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段英文名">
              <el-input v-model="fieldForm.name_en" placeholder="可手动填写" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="引用字根">
              <el-select v-model="fieldForm.root_id" clearable filterable style="width:100%"
                         @change="onFieldRootChange">
                <el-option v-for="r in roots" :key="r.id"
                           :label="r.name + ' (' + r.id + ')'" :value="r.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段类型">
              <el-input v-model="fieldForm.field_type" :disabled="!!fieldForm.root_id"
                        placeholder="引用字根后自动填充" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段长度">
              <el-input v-model="fieldForm.length" :disabled="!!fieldForm.root_id"
                        placeholder="引用字根后自动填充" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="字段备注">
              <el-input v-model="fieldForm.remark" type="textarea" :rows="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 码值子集（当字根有码值时显示） -->
        <div v-if="fieldCodeOptions.length" style="margin-top:8px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <span style="font-size:12px;font-weight:600;color:#909399;">字段码值（勾选需要保留的）</span>
            <span>
              <el-button size="small" @click="fieldCodeOptions.forEach(o => o.checked = true)">全选</el-button>
              <el-button size="small" @click="fieldCodeOptions.forEach(o => o.checked = false)">全不选</el-button>
            </span>
          </div>
          <div class="cv-check-list">
            <label v-for="opt in fieldCodeOptions" :key="opt.value" class="cv-check-item">
              <input type="checkbox" v-model="opt.checked" />
              <span class="cv-check-code">{{ opt.code }}</span>
              <span v-if="opt.label" class="cv-check-label">{{ opt.label }}</span>
            </label>
          </div>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="fieldModalVisible = false">取消</el-button>
        <el-button type="primary" @click="saveField" :loading="saving">保存</el-button>
      </template>
    </el-dialog>

    <!-- ══════════════════════════════════════════════ 弹窗：接口编辑 ═════ -->
    <el-dialog v-model="ifaceModalVisible" :title="ifaceIsNew ? '新增接口' : '编辑接口'"
               width="900px" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="ifaceForm" label-width="90px" size="small">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="接口ID *">
              <el-input v-model="ifaceForm.id" :disabled="!ifaceIsNew" placeholder="如 IFACE_001" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接口名称 *">
              <el-input v-model="ifaceForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="接口描述">
              <el-input v-model="ifaceForm.description" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 拖拽布局 -->
      <FieldDragLayout
        :all-fields="fields"
        v-model:input-items="ifaceInputItems"
        v-model:output-items="ifaceOutputItems"
      />
      <template #footer>
        <el-button @click="ifaceModalVisible = false">取消</el-button>
        <el-button type="primary" @click="saveIface" :loading="saving">保存</el-button>
      </template>
    </el-dialog>

    <!-- ══════════════════════════════════════════════ 弹窗：规则编辑 ═════ -->
    <el-dialog v-model="ruleModalVisible" :title="ruleIsNew ? '新增规则' : '编辑规则'"
               width="900px" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="ruleForm" label-width="90px" size="small">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="规则ID *">
              <el-input v-model="ruleForm.id" :disabled="!ruleIsNew" placeholder="如 RULE_001" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规则名称 *">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="规则描述">
              <el-input v-model="ruleForm.description" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <FieldDragLayout
        :all-fields="fields"
        v-model:input-items="ruleInputItems"
        v-model:output-items="ruleOutputItems"
      />
      <template #footer>
        <el-button @click="ruleModalVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRule" :loading="saving">保存</el-button>
      </template>
    </el-dialog>

    <!-- ══════════════════════════════════════════════ 弹窗：关联图谱 ═════ -->
    <el-dialog v-model="graphModalVisible" :title="graphTitle" width="760px" destroy-on-close>
      <div v-if="graphData">
        <div v-if="graphData.usedFields?.length" class="graph-section">
          <div class="graph-section-title">📋 引用字段（{{ graphData.usedFields.length }}）</div>
          <el-table :data="graphData.usedFields" size="small" border>
            <el-table-column prop="id" label="字段ID" width="140" />
            <el-table-column prop="name_en" label="英文名" width="140" />
            <el-table-column prop="name_cn" label="中文名" />
          </el-table>
        </div>
        <div class="graph-section">
          <div class="graph-section-title">🔗 被接口引用（{{ graphData.usedByIfaces?.length ?? 0 }}）</div>
          <el-table v-if="graphData.usedByIfaces?.length" :data="graphData.usedByIfaces" size="small" border>
            <el-table-column prop="id" label="接口ID" width="160" />
            <el-table-column prop="name" label="接口名称" width="160" />
            <el-table-column prop="description" label="描述" />
          </el-table>
          <div v-else class="graph-empty">无接口引用</div>
        </div>
        <div class="graph-section">
          <div class="graph-section-title">⚙️ 被规则引用（{{ graphData.usedByRules?.length ?? 0 }}）</div>
          <el-table v-if="graphData.usedByRules?.length" :data="graphData.usedByRules" size="small" border>
            <el-table-column prop="id" label="规则ID" width="160" />
            <el-table-column prop="name" label="规则名称" width="160" />
            <el-table-column prop="description" label="描述" />
          </el-table>
          <div v-else class="graph-empty">无规则引用</div>
        </div>
      </div>
      <template #footer>
        <el-button @click="graphModalVisible = false">关闭</el-button>
        <el-button type="success" @click="exportGraphExcel">📥 导出Excel</el-button>
      </template>
    </el-dialog>

    <!-- 隐藏文件输入 -->
    <input type="file" ref="importFileRef" accept=".csv" style="display:none" @change="onImportFile" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineComponent, h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as XLSX from 'xlsx'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'

const props = defineProps<{ api: ToolboxAPI; toolId: string }>()

// ── 顶层 Tab ─────────────────────────────────────────────────────────────────
const tabs = [
  { key: 'roots',      label: '📐 字根维护' },
  { key: 'fields',     label: '📋 标准字段维护' },
  { key: 'interfaces', label: '🔗 接口维护' },
  { key: 'rules',      label: '⚙️ 规则维护' },
]
const activeTab = ref('roots')

// ── 数据 ──────────────────────────────────────────────────────────────────────
const roots  = ref<any[]>([])
const fields = ref<any[]>([])
const ifaces = ref<any[]>([])
const rules  = ref<any[]>([])
const saving = ref(false)

async function loadAll() {
  const [r, f, i, ru] = await Promise.all([
    props.api.plugin.callSync('listRoots', {}),
    props.api.plugin.callSync('listFields', {}),
    props.api.plugin.callSync('listInterfaces', {}),
    props.api.plugin.callSync('listRules', {}),
  ])
  roots.value  = r.roots  ?? []
  fields.value = f.fields ?? []
  ifaces.value = i.interfaces ?? []
  rules.value  = ru.rules ?? []
}

onMounted(loadAll)

// ── 搜索过滤 ──────────────────────────────────────────────────────────────────
const rootSearch  = ref(''); const fieldSearch = ref('')
const ifaceSearch = ref(''); const ruleSearch  = ref('')

const filteredRoots  = computed(() => filter(roots.value,  rootSearch.value,  ['id','name','meaning']))
const filteredFields = computed(() => filter(fields.value, fieldSearch.value, ['id','name_en','name_cn']))
const filteredIfaces = computed(() => filter(ifaces.value, ifaceSearch.value, ['id','name','description']))
const filteredRules  = computed(() => filter(rules.value,  ruleSearch.value,  ['id','name','description']))

function filter(list: any[], q: string, keys: string[]) {
  if (!q) return list
  const lq = q.toLowerCase()
  return list.filter(r => keys.some(k => (r[k] ?? '').toLowerCase().includes(lq)))
}

// ══════════════════════════════════════════════════════════════ 字根 ══════════
const rootModalVisible = ref(false)
const rootIsNew        = ref(true)
const selectedRootId   = ref<string|null>(null)
const codeRows         = ref<{code:string, label:string}[]>([])
const rootTypes        = ['字符型','数字型','金额类型','日期类型','时间戳']
const rootForm         = ref<any>({})

function openRootModal(row: any) {
  rootIsNew.value = !row
  if (row) {
    rootForm.value = { ...row }
    const vals = parseCodeValues(row.code_values)
    codeRows.value = vals.map((v: string) => {
      const idx = v.indexOf('=')
      return idx >= 0 ? { code: v.slice(0, idx), label: v.slice(idx+1) } : { code: v, label: '' }
    })
  } else {
    rootForm.value = { id: genId('ROOT'), name: '', meaning: '', root_type: '字符型', length: '', remark: '' }
    codeRows.value = []
  }
  rootModalVisible.value = true
}

async function saveRoot() {
  if (!rootForm.value.id?.trim() || !rootForm.value.name?.trim()) {
    ElMessage.warning('字根ID和字根名不能为空'); return
  }
  saving.value = true
  try {
    const codeValues = codeRows.value.filter(r => r.code.trim())
      .map(r => r.label ? `${r.code}=${r.label}` : r.code)
    await props.api.plugin.callSync('saveRoot', {
      ...rootForm.value,
      code_values: codeValues.length ? JSON.stringify(codeValues) : null,
      _isNew: rootIsNew.value,
    })
    rootModalVisible.value = false
    await loadAll()
    ElMessage.success('保存成功')
  } finally { saving.value = false }
}

async function deleteRoot(id: string) {
  await ElMessageBox.confirm('确认删除字根 ' + id + '？', '删除确认', { type: 'warning' })
  await props.api.plugin.callSync('deleteRoot', { id })
  if (selectedRootId.value === id) selectedRootId.value = null
  await loadAll()
  ElMessage.success('已删除')
}

// ══════════════════════════════════════════════════════════════ 字段 ══════════
const fieldModalVisible = ref(false)
const fieldIsNew        = ref(true)
const selectedFieldId   = ref<string|null>(null)
const fieldCodeOptions  = ref<{value:string, code:string, label:string, checked:boolean}[]>([])
const fieldForm         = ref<any>({})

function openFieldModal(row: any) {
  fieldIsNew.value = !row
  if (row) {
    fieldForm.value = { ...row }
    initFieldCodeOptions(row.root_id, row.code_values)
  } else {
    fieldForm.value = { id: genId('FIELD'), name_en: '', name_cn: '', root_id: '', root_name: '', field_type: '', length: '', remark: '' }
    fieldCodeOptions.value = []
  }
  fieldModalVisible.value = true
}

function onFieldRootChange(rootId: string) {
  const root = roots.value.find((r: any) => r.id === rootId)
  if (root) {
    fieldForm.value.root_name  = root.name
    fieldForm.value.field_type = root.root_type ?? ''
    fieldForm.value.length     = root.length ?? ''
    initFieldCodeOptions(rootId, null)
  } else {
    fieldForm.value.root_name = ''; fieldForm.value.field_type = ''; fieldForm.value.length = ''
    fieldCodeOptions.value = []
  }
}

function initFieldCodeOptions(rootId: string, existingCsv: string | null) {
  const root = roots.value.find((r: any) => r.id === rootId)
  if (!root || root.root_type !== '字符型' || !root.code_values) {
    fieldCodeOptions.value = []; return
  }
  const allVals = parseCodeValues(root.code_values)
  let checkedSet: Set<string> | null = null
  if (existingCsv) {
    try { checkedSet = new Set(JSON.parse(existingCsv)) } catch (_) {}
  }
  fieldCodeOptions.value = allVals.map((v: string) => {
    const idx = v.indexOf('=')
    return {
      value: v,
      code:  idx >= 0 ? v.slice(0, idx) : v,
      label: idx >= 0 ? v.slice(idx+1) : '',
      checked: checkedSet ? checkedSet.has(v) : true,
    }
  })
}

async function saveField() {
  if (!fieldForm.value.id?.trim() || !fieldForm.value.name_cn?.trim()) {
    ElMessage.warning('字段ID和字段中文名不能为空'); return
  }
  saving.value = true
  try {
    const codeValues = fieldCodeOptions.value.filter(o => o.checked).map(o => o.value)
    await props.api.plugin.callSync('saveField', {
      ...fieldForm.value,
      code_values: codeValues.length ? JSON.stringify(codeValues) : null,
      _isNew: fieldIsNew.value,
    })
    fieldModalVisible.value = false
    await loadAll()
    ElMessage.success('保存成功')
  } finally { saving.value = false }
}

async function deleteField(id: string) {
  await ElMessageBox.confirm('确认删除字段 ' + id + '？', '删除确认', { type: 'warning' })
  await props.api.plugin.callSync('deleteField', { id })
  if (selectedFieldId.value === id) selectedFieldId.value = null
  await loadAll()
  ElMessage.success('已删除')
}

// ══════════════════════════════════════════════════════════════ 接口 ══════════
const ifaceModalVisible = ref(false)
const ifaceIsNew        = ref(true)
const ifaceForm         = ref<any>({})
const ifaceInputItems   = ref<any[]>([])
const ifaceOutputItems  = ref<any[]>([])

function openIfaceModal(row: any) {
  ifaceIsNew.value = !row
  if (row) {
    ifaceForm.value = { ...row }
    ifaceInputItems.value  = parseJSON(row.input_json)
    ifaceOutputItems.value = parseJSON(row.output_json)
  } else {
    ifaceForm.value = { id: genId('IFACE'), name: '', description: '' }
    ifaceInputItems.value  = []
    ifaceOutputItems.value = []
  }
  ifaceModalVisible.value = true
}

async function saveIface() {
  if (!ifaceForm.value.id?.trim() || !ifaceForm.value.name?.trim()) {
    ElMessage.warning('接口ID和接口名称不能为空'); return
  }
  saving.value = true
  try {
    await props.api.plugin.callSync('saveInterface', {
      ...ifaceForm.value,
      input_json:  JSON.stringify(ifaceInputItems.value),
      output_json: JSON.stringify(ifaceOutputItems.value),
      _isNew: ifaceIsNew.value,
    })
    ifaceModalVisible.value = false
    await loadAll()
    ElMessage.success('保存成功')
  } finally { saving.value = false }
}

async function deleteIface(id: string) {
  await ElMessageBox.confirm('确认删除接口 ' + id + '？', '删除确认', { type: 'warning' })
  await props.api.plugin.callSync('deleteInterface', { id })
  await loadAll()
  ElMessage.success('已删除')
}

// ══════════════════════════════════════════════════════════════ 规则 ══════════
const ruleModalVisible = ref(false)
const ruleIsNew        = ref(true)
const ruleForm         = ref<any>({})
const ruleInputItems   = ref<any[]>([])
const ruleOutputItems  = ref<any[]>([])

function openRuleModal(row: any) {
  ruleIsNew.value = !row
  if (row) {
    ruleForm.value = { ...row }
    ruleInputItems.value  = parseJSON(row.input_json)
    ruleOutputItems.value = parseJSON(row.output_json)
  } else {
    ruleForm.value = { id: genId('RULE'), name: '', description: '' }
    ruleInputItems.value  = []
    ruleOutputItems.value = []
  }
  ruleModalVisible.value = true
}

async function saveRule() {
  if (!ruleForm.value.id?.trim() || !ruleForm.value.name?.trim()) {
    ElMessage.warning('规则ID和规则名称不能为空'); return
  }
  saving.value = true
  try {
    await props.api.plugin.callSync('saveRule', {
      ...ruleForm.value,
      input_json:  JSON.stringify(ruleInputItems.value),
      output_json: JSON.stringify(ruleOutputItems.value),
      _isNew: ruleIsNew.value,
    })
    ruleModalVisible.value = false
    await loadAll()
    ElMessage.success('保存成功')
  } finally { saving.value = false }
}

async function deleteRule(id: string) {
  await ElMessageBox.confirm('确认删除规则 ' + id + '？', '删除确认', { type: 'warning' })
  await props.api.plugin.callSync('deleteRule', { id })
  await loadAll()
  ElMessage.success('已删除')
}

// ══════════════════════════════════════════════════════════════ 关联图谱 ══════
const graphModalVisible = ref(false)
const graphTitle        = ref('')
const graphData         = ref<any>(null)

function openRootGraph() {
  if (!selectedRootId.value) { ElMessage.warning('请先选中一条字根记录'); return }
  const root = roots.value.find((r: any) => r.id === selectedRootId.value)
  if (!root) return
  const usedFields   = fields.value.filter((f: any) => f.root_id === root.id)
  const fieldIds     = new Set(usedFields.map((f: any) => f.id))
  const usedByIfaces = ifaces.value.filter((ifc: any) =>
    [...parseJSON(ifc.input_json), ...parseJSON(ifc.output_json)].some((x: any) => fieldIds.has(x.field_id)))
  const usedByRules  = rules.value.filter((ru: any) =>
    [...parseJSON(ru.input_json), ...parseJSON(ru.output_json)].some((x: any) => fieldIds.has(x.field_id)))
  graphTitle.value = `字根「${root.name}」关联图谱`
  graphData.value  = { type:'字根', name: root.name, usedFields, usedByIfaces, usedByRules }
  graphModalVisible.value = true
}

function openFieldGraph() {
  if (!selectedFieldId.value) { ElMessage.warning('请先选中一条字段记录'); return }
  const field = fields.value.find((f: any) => f.id === selectedFieldId.value)
  if (!field) return
  const usedByIfaces = ifaces.value.filter((ifc: any) =>
    [...parseJSON(ifc.input_json), ...parseJSON(ifc.output_json)].some((x: any) => x.field_id === field.id))
  const usedByRules  = rules.value.filter((ru: any) =>
    [...parseJSON(ru.input_json), ...parseJSON(ru.output_json)].some((x: any) => x.field_id === field.id))
  graphTitle.value = `字段「${field.name_en}」关联图谱`
  graphData.value  = { type:'字段', name: field.name_en, usedFields: [], usedByIfaces, usedByRules }
  graphModalVisible.value = true
}

function exportGraphExcel() {
  if (!graphData.value) return
  const wb = XLSX.utils.book_new()
  if (graphData.value.usedFields?.length) {
    XLSX.utils.book_append_sheet(wb,
      XLSX.utils.json_to_sheet(graphData.value.usedFields.map((f: any) =>
        ({ '字段ID': f.id, '英文名': f.name_en, '中文名': f.name_cn ?? '' }))),
      '关联字段')
  }
  if (graphData.value.usedByIfaces?.length) {
    XLSX.utils.book_append_sheet(wb,
      XLSX.utils.json_to_sheet(graphData.value.usedByIfaces.map((i: any) =>
        ({ '接口ID': i.id, '接口名称': i.name, '描述': i.description ?? '' }))),
      '被接口引用')
  }
  if (graphData.value.usedByRules?.length) {
    XLSX.utils.book_append_sheet(wb,
      XLSX.utils.json_to_sheet(graphData.value.usedByRules.map((r: any) =>
        ({ '规则ID': r.id, '规则名称': r.name, '描述': r.description ?? '' }))),
      '被规则引用')
  }
  if (wb.SheetNames.length === 0) {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([{ '结果': '暂无关联' }]), '关联图谱')
  }
  XLSX.writeFile(wb, `关联图谱_${graphData.value.name}.xlsx`)
  ElMessage.success('已导出')
}

// ══════════════════════════════════════════════════════════════ CSV 导入导出 ══
async function exportRoots() {
  const res = await props.api.plugin.callSync('exportRootsCsv', {})
  downloadText(res.csv, '字根数据.csv', 'text/csv;charset=utf-8')
}

async function exportFields() {
  const res = await props.api.plugin.callSync('exportFieldsCsv', {})
  downloadText(res.csv, '字段数据.csv', 'text/csv;charset=utf-8')
}

const importFileRef  = ref<HTMLInputElement|null>(null)
let   importTarget   = ''

function triggerImport(type: string) {
  importTarget = type
  importFileRef.value?.click()
}

async function onImportFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const text = await file.text()
  ;(e.target as HTMLInputElement).value = ''
  try {
    let res: any
    if (importTarget === 'root') {
      res = await props.api.plugin.callSync('importRootsCsv', { csv: text })
    } else {
      res = await props.api.plugin.callSync('importFieldsCsv', { csv: text })
    }
    await loadAll()
    ElMessage.success(`导入完成：成功 ${res.success} 条，失败 ${res.errors} 条`)
  } catch (e: any) {
    ElMessage.error('导入失败：' + e.message)
  }
}

function downloadText(text: string, filename: string, mime: string) {
  const blob = new Blob(['﻿' + text], { type: mime })
  const url  = URL.createObjectURL(blob)
  const a    = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

// ══════════════════════════════════════════════════════════════ 工具函数 ══════
function genId(prefix: string) {
  return prefix + '_' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase()
}

function parseCodeValues(cv: string | null): string[] {
  if (!cv) return []
  try { return JSON.parse(cv) } catch (_) { return [] }
}

function parseJSON(s: string | null): any[] {
  if (!s) return []
  try { return JSON.parse(s) ?? [] } catch (_) { return [] }
}
</script>

<!-- ── FieldDragLayout 子组件（内联定义） ──────────────────────────────────── -->
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export const FieldDragLayout = defineComponent({
  name: 'FieldDragLayout',
  props: {
    allFields:   { type: Array, default: () => [] },
    inputItems:  { type: Array, default: () => [] },
    outputItems: { type: Array, default: () => [] },
  },
  emits: ['update:inputItems', 'update:outputItems'],
  setup(props, { emit }) {
    const poolSearch = ref('')
    const filteredPool = computed(() => {
      const q = poolSearch.value.toLowerCase()
      return (props.allFields as any[]).filter(f =>
        !q || (f.name_en ?? '').toLowerCase().includes(q) ||
               (f.name_cn ?? '').toLowerCase().includes(q) ||
               (f.id ?? '').toLowerCase().includes(q)
      )
    })

    let dragSource: { type: string; fieldId?: string; list: string; index?: number } | null = null

    function onPoolDragStart(e: DragEvent, field: any) {
      dragSource = { type: 'pool', fieldId: field.id, list: '' }
      e.dataTransfer!.effectAllowed = 'copy'
    }

    function addFieldToList(list: string, field: any) {
      const items = list === 'input' ? (props.inputItems as any[]) : (props.outputItems as any[])
      if (items.some((x: any) => x.field_id === field.id)) return
      const next = [...items, { field_id: field.id, field_name: field.name_en || field.id }]
      emit(list === 'input' ? 'update:inputItems' : 'update:outputItems', next)
    }

    function onItemDragStart(e: DragEvent, list: string, index: number) {
      dragSource = { type: 'item', list, index }
      e.dataTransfer!.effectAllowed = 'move'
    }

    function onDrop(e: DragEvent, list: string) {
      e.preventDefault()
      if (!dragSource) return
      const items = list === 'input' ? [...(props.inputItems as any[])] : [...(props.outputItems as any[])]
      if (dragSource.type === 'pool') {
        const field = (props.allFields as any[]).find((f: any) => f.id === dragSource!.fieldId)
        if (field && !items.some((x: any) => x.field_id === field.id)) {
          items.push({ field_id: field.id, field_name: field.name_en || field.id })
          emit(list === 'input' ? 'update:inputItems' : 'update:outputItems', items)
        }
      } else if (dragSource.type === 'item' && dragSource.list === list && dragSource.index !== undefined) {
        const [moved] = items.splice(dragSource.index, 1)
        const target  = (e.target as HTMLElement).closest('[data-index]')
        const toIdx   = target ? parseInt(target.getAttribute('data-index') ?? '99') : items.length
        items.splice(toIdx, 0, moved)
        emit(list === 'input' ? 'update:inputItems' : 'update:outputItems', items)
      }
      dragSource = null
    }

    function removeItem(list: string, index: number) {
      const items = list === 'input' ? [...(props.inputItems as any[])] : [...(props.outputItems as any[])]
      items.splice(index, 1)
      emit(list === 'input' ? 'update:inputItems' : 'update:outputItems', items)
    }

    return { poolSearch, filteredPool, onPoolDragStart, addFieldToList, onItemDragStart, onDrop, removeItem }
  },
  template: `
    <div class="drag-layout">
      <div class="field-pool">
        <div class="pool-header">
          <span>📋 可用字段</span>
          <el-input v-model="poolSearch" placeholder="搜索..." size="small" style="width:100px;" />
        </div>
        <div class="pool-list">
          <div v-for="f in filteredPool" :key="f.id" class="pool-item"
               draggable="true" @dragstart="onPoolDragStart($event, f)"
               @dblclick="addFieldToList('input', f)">
            <span class="pool-item-text">{{ f.name_en }}<span v-if="f.name_cn" style="color:#909399;font-size:11px;"> ({{ f.name_cn }})</span></span>
            <span style="color:#409eff;font-weight:bold;">+</span>
          </div>
          <div v-if="!filteredPool.length" style="text-align:center;color:#909399;padding:16px;font-size:12px;">无可用字段</div>
        </div>
      </div>
      <div class="drag-sections">
        <div class="drag-section">
          <div class="drag-section-header">
            📥 输入字段
            <span class="count-badge">{{ inputItems.length }}</span>
          </div>
          <div class="drag-drop-zone" @dragover.prevent @drop="onDrop($event, 'input')">
            <div v-if="!inputItems.length" class="drop-hint">从左侧拖入或双击字段</div>
            <div v-for="(item, i) in inputItems" :key="item.field_id" class="drag-item"
                 draggable="true" :data-index="i" @dragstart="onItemDragStart($event, 'input', i)">
              <span class="drag-handle">☰</span>
              <span class="drag-item-text">{{ item.field_name || item.field_id }}</span>
              <button class="drag-remove" @click="removeItem('input', i)">×</button>
            </div>
          </div>
        </div>
        <div class="drag-section">
          <div class="drag-section-header">
            📤 输出字段
            <span class="count-badge">{{ outputItems.length }}</span>
          </div>
          <div class="drag-drop-zone" @dragover.prevent @drop="onDrop($event, 'output')">
            <div v-if="!outputItems.length" class="drop-hint">从左侧拖入或双击字段</div>
            <div v-for="(item, i) in outputItems" :key="item.field_id" class="drag-item"
                 draggable="true" :data-index="i" @dragstart="onItemDragStart($event, 'output', i)">
              <span class="drag-handle">☰</span>
              <span class="drag-item-text">{{ item.field_name || item.field_id }}</span>
              <button class="drag-remove" @click="removeItem('output', i)">×</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
</script>

<style scoped>
.ds-root { padding: 4px; }

/* Tab 栏 */
.ds-tab-bar {
  display: flex;
  border-bottom: 2px solid #e4e7ed;
  margin-bottom: 12px;
}
.ds-tab-item {
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color .2s;
}
.ds-tab-item:hover  { color: #409eff; }
.ds-tab-item.active { color: #409eff; border-bottom-color: #409eff; font-weight: 500; }

/* 面板 */
.ds-panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

/* 码值编辑器 */
.cv-editor { border: 1px solid #e4e7ed; border-radius: 6px; overflow: hidden; }
.cv-header {
  display: grid;
  grid-template-columns: 1fr 1fr 36px;
  padding: 6px 10px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  font-size: 12px; font-weight: 600; color: #909399;
}
.cv-row {
  display: grid;
  grid-template-columns: 1fr 1fr 36px;
  border-bottom: 1px solid #e4e7ed;
  align-items: stretch;
}
.cv-row :deep(.el-input__wrapper) {
  border-radius: 0;
  box-shadow: none;
  border-right: 1px solid #e4e7ed;
}
.cv-row :deep(.el-input__wrapper):last-of-type { border-right: none; }
.cv-del-btn {
  border: none; background: none; color: #909399;
  cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.cv-del-btn:hover { color: #f56c6c; }
.cv-add-btn {
  display: block; width: 100%; padding: 7px;
  border: none; border-top: 1px solid #e4e7ed;
  background: #fafafa; color: #409eff; font-size: 13px;
  font-weight: 500; cursor: pointer; text-align: left;
}
.cv-add-btn:hover { background: #ecf5ff; }

/* 码值 checkbox 列表 */
.cv-check-list {
  display: flex; flex-wrap: wrap; gap: 8px;
  max-height: 180px; overflow-y: auto;
  padding: 10px; border: 1px solid #e4e7ed;
  border-radius: 6px;
}
.cv-check-item {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 10px; border: 1px solid #e4e7ed;
  border-radius: 6px; cursor: pointer; font-size: 13px;
  background: #fff; transition: border-color .15s;
}
.cv-check-item:hover { border-color: #409eff; }
.cv-check-code { font-weight: 600; }
.cv-check-label { color: #909399; font-size: 12px; }

/* 拖拽布局 */
.drag-layout {
  display: flex; gap: 16px; margin-top: 16px; min-height: 300px;
}
.field-pool {
  width: 220px; flex-shrink: 0;
  background: #f5f7fa; border-radius: 6px; padding: 12px;
  display: flex; flex-direction: column; gap: 8px;
}
.pool-header {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 13px; font-weight: 600;
}
.pool-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
.pool-item {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 8px; background: #fff;
  border: 1px solid #e4e7ed; border-radius: 6px;
  font-size: 12px; cursor: grab; transition: border-color .15s;
}
.pool-item:hover { border-color: #409eff; }
.pool-item-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.drag-sections { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.drag-section { background: #f5f7fa; border-radius: 6px; padding: 12px; min-height: 120px; }
.drag-section-header {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 600; margin-bottom: 8px;
}
.count-badge {
  background: #409eff; color: #fff;
  font-size: 11px; font-weight: 600;
  padding: 1px 7px; border-radius: 10px;
}
.drag-drop-zone {
  min-height: 60px;
  border: 2px dashed #e4e7ed;
  border-radius: 6px; padding: 6px;
  display: flex; flex-direction: column; gap: 4px;
  transition: border-color .2s;
}
.drag-drop-zone:hover { border-color: #409eff; }
.drop-hint { text-align: center; color: #c0c4cc; font-size: 12px; padding: 12px; }
.drag-item {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 10px; background: #fff;
  border: 1px solid #e4e7ed; border-radius: 6px;
  font-size: 12px; cursor: grab;
}
.drag-handle { color: #c0c4cc; }
.drag-item-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.drag-remove {
  border: none; background: none;
  color: #c0c4cc; cursor: pointer; font-size: 15px; padding: 2px;
  border-radius: 4px;
}
.drag-remove:hover { color: #f56c6c; background: #fef0f0; }

/* 关联图谱 */
.graph-section { margin-bottom: 16px; }
.graph-section-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #606266; }
.graph-empty { color: #c0c4cc; font-size: 13px; padding: 8px 0; }
</style>
