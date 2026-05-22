<template>
  <div class="fp-root">
    <!-- 顶部 Tab 栏：用 v-show 切换，保证两个面板 DOM 始终存在不被销毁 -->
    <div class="fp-tab-bar">
      <div class="fp-tab-item" :class="{ active: mainTab === 'parse' }" @click="mainTab = 'parse'">流程解析</div>
      <div class="fp-tab-item" :class="{ active: mainTab === 'format' }" @click="mainTab = 'format'">XML格式化</div>
    </div>

    <!-- ═══════════════════════════════════════════════════ 流程解析 面板 -->
    <div v-show="mainTab === 'parse'">
        <el-card class="fp-input-card">
          <el-tabs v-model="inputMode">
            <el-tab-pane label="上传文件" name="file">
              <el-upload drag accept=".xml,.txt,.csv" :auto-upload="false" :on-change="onFileChange"
                         :show-file-list="false" style="margin-top:8px;">
                <el-icon style="font-size:40px;color:#409eff;"><UploadFilled /></el-icon>
                <div style="margin-top:8px;">拖拽或点击上传文件（支持 XML / TXT / CSV）</div>
              </el-upload>
              <div v-if="fileName" style="margin-top:8px;color:#67c23a;">
                <el-icon><Document /></el-icon> {{ fileName }}
              </div>
              <!-- CSV 列选择 -->
              <el-form v-if="isCsvFile" label-width="90px" style="margin-top:12px;">
                <el-form-item label="XML列名">
                  <el-select v-model="csvXmlColumn" placeholder="选择包含XML内容的列" style="width:260px">
                    <el-option v-for="col in csvColumns" :key="col" :label="col" :value="col" />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="粘贴XML内容" name="paste">
              <el-input v-model="pasteContent" type="textarea" :rows="8"
                        placeholder="粘贴 XML 内容，支持多个 mxGraphModel 直接拼接"
                        style="font-family:monospace;font-size:12px;margin-top:8px;" />
            </el-tab-pane>
            <el-tab-pane label="SQL查询" name="sql">
              <el-form label-width="90px" style="margin-top:8px;">
                <el-form-item label="数据源">
                  <el-select v-model="sqlForm.dataSourceId" placeholder="选择数据源"
                             style="width:260px" :loading="loadingDs">
                    <el-option v-for="ds in dataSources" :key="ds.id" :label="ds.name" :value="ds.id" />
                  </el-select>
                </el-form-item>
                <el-form-item label="SQL语句">
                  <el-input v-model="sqlForm.sql" type="textarea" :rows="4"
                            placeholder="SELECT flow_content FROM t_flow WHERE flow_id = ?"
                            style="font-family:monospace;font-size:12px;" />
                </el-form-item>
                <el-form-item label="XML字段名">
                  <el-input v-model="sqlForm.xmlField" placeholder="包含XML内容的列名，如 flow_content"
                            style="width:260px;" />
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div style="margin-top:12px;">
            <el-button type="primary" :loading="parsing" @click="doParse">
              <el-icon><Search /></el-icon>&nbsp;解析
            </el-button>
            <el-button @click="resetParse">清空</el-button>
          </div>
        </el-card>

        <!-- 解析错误日志 -->
        <el-collapse v-if="parseErrors.length" style="margin:12px 0;">
          <el-collapse-item>
            <template #title>
              <el-tag type="warning" size="small" style="margin-right:8px;">{{ parseErrors.length }} 行解析失败</el-tag>
              <span style="font-size:13px;color:#e6a23c;">点击展开查看详情</span>
            </template>
            <el-table :data="parseErrors" border size="small" max-height="280">
              <el-table-column prop="row" label="行号" width="70" align="center" />
              <el-table-column prop="error" label="错误信息" show-overflow-tooltip />
            </el-table>
          </el-collapse-item>
        </el-collapse>

        <!-- 多流程切换 -->
        <div v-if="flows.length > 1" style="margin:12px 0;">
          <el-tag size="small" style="margin-right:8px;">共 {{ flows.length }} 个流程</el-tag>
          <el-radio-group v-model="activeFlowIndex" size="small">
            <el-radio-button v-for="(f, i) in flows" :key="i" :value="i">
              {{ f.workflow?.flowName || f.workflow?.flowId || ('流程' + (i+1)) }}
            </el-radio-button>
          </el-radio-group>
        </div>

        <!-- 结果区 -->
        <template v-if="currentFlow">
          <el-card class="fp-info-card">
            <template #header>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="font-weight:600;">
                  {{ currentFlow.workflow.flowName || currentFlow.workflow.title }}
                </span>
                <div>
                  <el-button size="small" type="warning" @click="doCheck" :loading="checking">
                    <el-icon><Warning /></el-icon>&nbsp;流程检查
                  </el-button>
                  <el-button size="small" type="success" @click="exportExcel">
                    <el-icon><Download /></el-icon>&nbsp;下载Excel
                  </el-button>
                </div>
              </div>
            </template>
            <el-descriptions :column="4" size="small" border>
              <el-descriptions-item label="流程编号">{{ currentFlow.workflow.flowId }}</el-descriptions-item>
              <el-descriptions-item label="流程标识">{{ currentFlow.workflow.flowSign }}</el-descriptions-item>
              <el-descriptions-item label="流程名称">{{ currentFlow.workflow.flowName }}</el-descriptions-item>
              <el-descriptions-item label="流程标题">{{ currentFlow.workflow.title }}</el-descriptions-item>
              <el-descriptions-item label="流程作者">{{ currentFlow.workflow.flowAdmin }}</el-descriptions-item>
              <el-descriptions-item label="版本编号">{{ currentFlow.workflow.flowVersion }}</el-descriptions-item>
              <el-descriptions-item label="所属机构">{{ currentFlow.workflow.orgId }}</el-descriptions-item>
              <el-descriptions-item label="系统标识">{{ currentFlow.workflow.systemId }}</el-descriptions-item>
              <el-descriptions-item label="创建时间" :span="2">{{ currentFlow.workflow.startTime }}</el-descriptions-item>
              <el-descriptions-item label="更新时间" :span="2">{{ currentFlow.workflow.updateTime }}</el-descriptions-item>
            </el-descriptions>
          </el-card>

          <el-card style="margin-top:12px;">
            <template #header>
              <span style="font-weight:600;">节点列表（{{ currentFlow.nodes.length }} 个）</span>
            </template>
            <el-table :data="currentFlow.nodes" border stripe size="small" max-height="420">
              <el-table-column type="index" label="序" width="46" />
              <el-table-column prop="nodeSign" label="节点序号" width="80" />
              <el-table-column prop="nid" label="编号" width="60" />
              <el-table-column prop="label" label="节点名称" min-width="120" show-overflow-tooltip />
              <el-table-column label="类型" width="64">
                <template #default="{ row }">
                  <el-tag :type="nodeTypeTag(row.nodeType)" size="small">
                    {{ nodeTypeLabel(row.nodeType) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="人员配置" min-width="150" show-overflow-tooltip>
                <template #default="{ row }">
                  <div v-if="row.convertLabel" style="font-size:12px;">{{ row.convertLabel }}</div>
                  <div v-if="row.nodeUser" style="font-size:11px;color:#909399;">{{ row.nodeUser }}</div>
                </template>
              </el-table-column>
              <el-table-column label="授权规则" min-width="120" show-overflow-tooltip>
                <template #default="{ row }">{{ row.creditAuth }}</template>
              </el-table-column>
              <el-table-column label="自动提交" width="72" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.autoSubmit === '1' ? 'success' : 'info'" size="small">
                    {{ row.autoSubmit === '1' ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="无人跳过" width="72" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.noUserJump === '1' ? 'warning' : 'info'" size="small">
                    {{ row.noUserJump === '1' ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="退回策略" min-width="100" show-overflow-tooltip>
                <template #default="{ row }">{{ translateReturnBack(row.returnBack) }}</template>
              </el-table-column>
              <el-table-column label="消息通知" min-width="100" show-overflow-tooltip>
                <template #default="{ row }">{{ row.noticeType }}</template>
              </el-table-column>
            </el-table>
          </el-card>

          <el-card style="margin-top:12px;">
            <template #header>
              <span style="font-weight:600;">路由线（{{ currentFlow.lines.length }} 条）</span>
            </template>
            <el-table :data="currentFlow.lines" border stripe size="small" max-height="380">
              <el-table-column type="index" label="序" width="46" />
              <el-table-column prop="nid" label="编号" width="60" />
              <el-table-column prop="label" label="路由名称" width="100" show-overflow-tooltip />
              <el-table-column label="起点" width="120" show-overflow-tooltip>
                <template #default="{ row }">{{ nodeLabel(row.source) }}</template>
              </el-table-column>
              <el-table-column label="终点" width="120" show-overflow-tooltip>
                <template #default="{ row }">{{ nodeLabel(row.target) }}</template>
              </el-table-column>
              <el-table-column label="条件逻辑" width="90">
                <template #default="{ row }">
                  <el-tag :type="row.isContinueBeanId === '0' ? 'info' : 'warning'" size="small">
                    {{ row.isContinueBeanId === '0' ? '无条件' : '条件判断' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="条件配置" min-width="180" show-overflow-tooltip>
                <template #default="{ row }">
                  <div v-for="(c, i) in row.conditions" :key="i" style="font-size:11px;">
                    {{ i > 0 ? (c.logic === '1' ? '或' : '且') : '' }}
                    {{ c.varName }} {{ relationLabel(c.relation) }} {{ c.value }}
                  </div>
                  <div v-if="!row.conditions?.length && row.routeScriptTxt"
                       style="font-size:11px;color:#909399;">{{ row.routeScriptTxt.slice(0, 60) }}…</div>
                </template>
              </el-table-column>
              <el-table-column label="线条颜色" width="80" align="center">
                <template #default="{ row }">
                  <span v-if="row.customColor" :style="{ color: row.customColor, fontWeight: 'bold' }">■</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </template>


        <el-dialog v-model="showCheck" title="流程检查结果" width="820px"
                   :close-on-click-modal="false" destroy-on-close>
          <div style="margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <el-tag type="danger"  style="margin-right:6px;">
                ERROR {{ checkIssues.filter(i => i.level === 'ERROR').length }}
              </el-tag>
              <el-tag type="warning" style="margin-right:6px;">
                WARN {{ checkIssues.filter(i => i.level === 'WARN').length }}
              </el-tag>
              <el-tag type="info">
                INFO {{ checkIssues.filter(i => i.level === 'INFO').length }}
              </el-tag>
            </div>
            <el-button size="small" type="success" @click="exportCheckExcel">
              <el-icon><Download /></el-icon>&nbsp;导出Excel
            </el-button>
          </div>
          <el-table :data="checkIssues" border stripe size="small" max-height="480">
            <el-table-column label="级别" width="74" align="center">
              <template #default="{ row }">
                <el-tag :type="checkLevelTag(row.level)" size="small">{{ row.level }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ruleCode" label="规则编号" width="80" />
            <el-table-column prop="ruleName" label="规则名称" width="120" />
            <el-table-column prop="nodeId"   label="节点编号" width="100" show-overflow-tooltip />
            <el-table-column prop="nodeName" label="关联节点" width="120" show-overflow-tooltip />
            <el-table-column prop="message"  label="问题描述" min-width="200" show-overflow-tooltip />
          </el-table>
          <div v-if="!checkIssues.length" style="text-align:center;padding:32px;color:#67c23a;font-size:15px;">
            ✓ 未发现配置问题
          </div>
        </el-dialog>
    </div>

    <!-- ═══════════════════════════════════════════════════ XML格式化 面板 -->
    <div v-show="mainTab === 'format'">
        <el-card class="fp-input-card">
          <el-tabs v-model="fmtInputMode">
            <!-- 上传文件 -->
            <el-tab-pane label="上传XML文件" name="file">
              <el-upload drag accept=".xml,.txt" :auto-upload="false" :on-change="onFmtFileChange"
                         :show-file-list="false" style="margin-top:8px;">
                <el-icon style="font-size:40px;color:#409eff;"><UploadFilled /></el-icon>
                <div style="margin-top:8px;">拖拽或点击上传 XML 文件</div>
              </el-upload>
              <div v-if="fmtFileName" style="margin-top:8px;color:#67c23a;">
                <el-icon><Document /></el-icon> {{ fmtFileName }}
              </div>
            </el-tab-pane>

            <!-- 粘贴内容 -->
            <el-tab-pane label="粘贴XML内容" name="paste">
              <el-input v-model="fmtPasteContent" type="textarea" :rows="8"
                        placeholder="粘贴 XML 内容"
                        style="font-family:monospace;font-size:12px;margin-top:8px;" />
            </el-tab-pane>

            <!-- SQL查询 -->
            <el-tab-pane label="SQL查询" name="sql">
              <el-form label-width="90px" style="margin-top:8px;">
                <el-form-item label="数据源">
                  <el-select v-model="fmtSqlForm.dataSourceId" placeholder="选择数据源"
                             style="width:260px" :loading="loadingDs">
                    <el-option v-for="ds in dataSources" :key="ds.id" :label="ds.name" :value="ds.id" />
                  </el-select>
                </el-form-item>
                <el-form-item label="SQL语句">
                  <el-input v-model="fmtSqlForm.sql" type="textarea" :rows="4"
                            placeholder="SELECT flow_content FROM t_flow WHERE flow_id = ?"
                            style="font-family:monospace;font-size:12px;" />
                </el-form-item>
                <el-form-item label="XML字段名">
                  <el-input v-model="fmtSqlForm.xmlField" placeholder="包含XML内容的列名"
                            style="width:260px;" />
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

          <div style="margin-top:12px;">
            <el-button type="primary" :loading="formatting" @click="doFormat">
              <el-icon><MagicStick /></el-icon>&nbsp;格式化
            </el-button>
            <el-button @click="resetFormat">清空</el-button>
          </div>
        </el-card>

        <!-- 格式化结果 -->
        <template v-if="fmtResults.length">
          <!-- 多条结果切换 -->
          <div v-if="fmtResults.length > 1" style="margin:12px 0;">
            <el-tag size="small" style="margin-right:8px;">共 {{ fmtResults.length }} 条</el-tag>
            <el-radio-group v-model="fmtActiveIndex" size="small">
              <el-radio-button v-for="(_, i) in fmtResults" :key="i" :value="i">
                第 {{ i + 1 }} 条
              </el-radio-button>
            </el-radio-group>
          </div>

          <el-card style="margin-top:12px;">
            <template #header>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <span style="font-weight:600;">格式化结果</span>
                <div style="display:flex;gap:8px;">
                  <el-button size="small" @click="copyFormatted">
                    <el-icon><CopyDocument /></el-icon>&nbsp;复制
                  </el-button>
                  <el-button size="small" type="success" @click="downloadFormatted">
                    <el-icon><Download /></el-icon>&nbsp;下载XML
                  </el-button>
                  <el-button v-if="fmtResults.length > 1" size="small" type="warning"
                             @click="downloadAllFormatted">
                    <el-icon><Download /></el-icon>&nbsp;下载全部
                  </el-button>
                </div>
              </div>
            </template>
            <pre class="fp-xml-output">{{ fmtResults[fmtActiveIndex] }}</pre>
          </el-card>
        </template>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  ElMessage, ElButton, ElCard, ElCollapse, ElCollapseItem, ElDescriptions, ElDescriptionsItem,
  ElDialog, ElForm, ElFormItem, ElIcon, ElInput, ElOption, ElRadioButton, ElRadioGroup,
  ElSelect, ElTabPane, ElTable, ElTableColumn, ElTabs, ElTag, ElUpload
} from 'element-plus'
import * as XLSX from 'xlsx'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'

const props = defineProps<{ api: ToolboxAPI; toolId: string }>()

// ── 顶级 Tab ──────────────────────────────────────────────────────────────
const mainTab = ref<'parse' | 'format'>('parse')

// ── 共享：数据源列表 ──────────────────────────────────────────────────────
const dataSources = ref<{ id: string; name: string }[]>([])
const loadingDs   = ref(false)

onMounted(async () => {
  loadingDs.value = true
  try { dataSources.value = await props.api.dataSource.list() }
  finally { loadingDs.value = false }
})

// ══════════════════════════════════════════════════════════════ 流程解析 ══
const inputMode       = ref<'file' | 'paste' | 'sql'>('paste')
const fileName        = ref('')
const fileContent     = ref('')
const pasteContent    = ref('')
const sqlForm         = ref({ dataSourceId: '', sql: '', xmlField: '' })
const parsing         = ref(false)
const flows           = ref<any[]>([])
const activeFlowIndex = ref(0)
const parseErrors     = ref<{ row: number; error: string }[]>([])
const isCsvFile       = ref(false)
const csvColumns      = ref<string[]>([])
const csvXmlColumn    = ref('')
const csvRows         = ref<string[][]>([])

const currentFlow  = computed(() => flows.value[activeFlowIndex.value] ?? null)

// ══════════════════════════════════════════════════════════════ 流程检查 ══
const checking    = ref(false)
const showCheck   = ref(false)
const checkIssues = ref<any[]>([])

async function doCheck() {
  if (!currentFlow.value) return
  // 把当前流程的原始 XML 重新传给后端做检查
  const xmlContent = inputMode.value === 'file' ? fileContent.value : pasteContent.value
  if (!xmlContent) { ElMessage.warning('请先解析流程'); return }
  checking.value = true
  try {
    const res = await props.api.plugin.callSync('checkFlow', { xmlContent })
    checkIssues.value = res.issues ?? []
    showCheck.value = true
    if (!checkIssues.value.length) {
      ElMessage.success('检查完成，未发现配置问题')
    } else {
      const errCount = checkIssues.value.filter((i: any) => i.level === 'ERROR').length
      ElMessage[errCount > 0 ? 'error' : 'warning'](
        `检查完成，发现 ${checkIssues.value.length} 个问题（ERROR: ${errCount}）`
      )
    }
  } finally {
    checking.value = false
  }
}

function checkLevelTag(level: string): 'danger' | 'warning' | 'info' | '' {
  return level === 'ERROR' ? 'danger' : level === 'WARN' ? 'warning' : 'info'
}

function exportCheckExcel() {
  const flow = currentFlow.value
  if (!checkIssues.value.length && !flow) return
  const wb  = XLSX.utils.book_new()
  const rows = checkIssues.value.map((i: any) => ({
    '级别': i.level, '规则编号': i.ruleCode, '规则名称': i.ruleName,
    '节点编号': i.nodeId ?? '', '关联节点': i.nodeName ?? '', '问题描述': i.message,
  }))
  const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ '结果': '未发现配置问题' }])
  XLSX.utils.book_append_sheet(wb, ws, '流程检查结果')
  XLSX.writeFile(wb, `check-${flow?.workflow?.flowId ?? 'flow'}.xlsx`)
  ElMessage.success('检查结果已导出')
}

function onFileChange(file: any) {
  fileName.value = file.name
  isCsvFile.value = file.name.toLowerCase().endsWith('.csv')
  const reader = new FileReader()
  reader.onload = e => {
    const text = e.target?.result as string ?? ''
    if (isCsvFile.value) {
      const wb = XLSX.read(text, { type: 'string' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })
      csvColumns.value = (data[0] ?? []).map(String)
      csvRows.value = data.slice(1).map(row => (row as any[]).map(v => v == null ? '' : String(v)))
      csvXmlColumn.value = csvColumns.value[0] ?? ''
    } else {
      fileContent.value = text
    }
  }
  reader.readAsText(file.raw, 'UTF-8')
}

async function doParse() {
  parsing.value = true
  flows.value = []
  activeFlowIndex.value = 0
  try {
    let result: any
    if (inputMode.value === 'file') {
      if (isCsvFile.value) {
        if (!csvXmlColumn.value) { ElMessage.warning('请选择包含XML内容的列'); return }
        const colIdx = csvColumns.value.indexOf(csvXmlColumn.value)
        const xmlList = csvRows.value.map(r => r[colIdx] ?? '').filter(v => v.trim())
        if (!xmlList.length) { ElMessage.warning('所选列无有效数据'); return }
        result = await props.api.plugin.callSync('parseXmlList', { xmlList })
      } else {
        if (!fileContent.value) { ElMessage.warning('请先上传文件'); return }
        result = await props.api.plugin.callSync('parseXml', { xmlContent: fileContent.value })
      }
    } else if (inputMode.value === 'paste') {
      if (!pasteContent.value.trim()) { ElMessage.warning('请粘贴XML内容'); return }
      result = await props.api.plugin.callSync('parseXml', { xmlContent: pasteContent.value })
    } else {
      if (!sqlForm.value.dataSourceId) { ElMessage.warning('请选择数据源'); return }
      if (!sqlForm.value.sql.trim())   { ElMessage.warning('请输入SQL语句'); return }
      if (!sqlForm.value.xmlField)     { ElMessage.warning('请输入XML字段名'); return }
      result = await props.api.plugin.callSync('parseSql', sqlForm.value)
    }
    flows.value = result.flows ?? []
    parseErrors.value = result.parseErrors ?? []
    const errTip = parseErrors.value.length ? `，${parseErrors.value.length} 行解析失败` : ''
    ElMessage[parseErrors.value.length ? 'warning' : 'success'](`解析完成，共 ${flows.value.length} 个流程${errTip}`)
  } finally {
    parsing.value = false
  }
}

function resetParse() {
  flows.value = []; parseErrors.value = []; fileContent.value = ''; fileName.value = ''
  pasteContent.value = ''; activeFlowIndex.value = 0
  isCsvFile.value = false; csvColumns.value = []; csvXmlColumn.value = ''; csvRows.value = []
}

// ══════════════════════════════════════════════════════════════ XML格式化 ══
const fmtInputMode    = ref<'file' | 'paste' | 'sql'>('paste')
const fmtFileName     = ref('')
const fmtFileContent  = ref('')
const fmtPasteContent = ref('')
const fmtSqlForm      = ref({ dataSourceId: '', sql: '', xmlField: '' })
const formatting      = ref(false)
const fmtResults      = ref<string[]>([])
const fmtActiveIndex  = ref(0)

function onFmtFileChange(file: any) {
  fmtFileName.value = file.name
  const reader = new FileReader()
  reader.onload = e => { fmtFileContent.value = e.target?.result as string ?? '' }
  reader.readAsText(file.raw, 'UTF-8')
}

function formatXml(raw: string): string {
  const INDENT = '  '
  // 统一行尾，然后在标签之间插入换行
  let str = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/(>)\s*(<)/g, '$1\n$2').trim()
  let pad = 0
  return str.split('\n').map(line => {
    const trimmed = line.trim()
    let padding = ''
    // 闭合标签先减缩进
    if (trimmed.startsWith('</') || trimmed.startsWith('?>')) {
      pad = Math.max(0, pad - 1)
    }
    padding = INDENT.repeat(pad)
    // 开标签（非自闭合）增加缩进
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') &&
        !trimmed.startsWith('<?') && !trimmed.endsWith('/>') &&
        !trimmed.includes('</')) {
      pad++
    }
    return padding + trimmed
  }).join('\n')
}

async function doFormat() {
  formatting.value = true
  fmtResults.value = []
  fmtActiveIndex.value = 0
  try {
    let rawList: string[] = []

    if (fmtInputMode.value === 'file') {
      if (!fmtFileContent.value) { ElMessage.warning('请先上传XML文件'); return }
      rawList = [fmtFileContent.value]
    } else if (fmtInputMode.value === 'paste') {
      if (!fmtPasteContent.value.trim()) { ElMessage.warning('请粘贴XML内容'); return }
      rawList = [fmtPasteContent.value]
    } else {
      if (!fmtSqlForm.value.dataSourceId) { ElMessage.warning('请选择数据源'); return }
      if (!fmtSqlForm.value.sql.trim())   { ElMessage.warning('请输入SQL语句'); return }
      if (!fmtSqlForm.value.xmlField)     { ElMessage.warning('请输入XML字段名'); return }
      const res = await props.api.plugin.callSync('queryRawXml', fmtSqlForm.value)
      rawList = res.xmlList ?? []
    }

    const results: string[] = []
    for (const raw of rawList) {
      try {
        results.push(formatXml(raw))
      } catch (e: any) {
        results.push(`<!-- 格式化失败: ${e.message} -->\n${raw}`)
      }
    }
    fmtResults.value = results
    ElMessage.success(`格式化完成，共 ${results.length} 条`)
  } finally {
    formatting.value = false
  }
}

function resetFormat() {
  fmtResults.value = []; fmtFileContent.value = ''; fmtFileName.value = ''
  fmtPasteContent.value = ''; fmtActiveIndex.value = 0
}

async function copyFormatted() {
  await navigator.clipboard.writeText(fmtResults.value[fmtActiveIndex.value] ?? '')
  ElMessage.success('已复制到剪贴板')
}

function downloadFormatted() {
  const content = fmtResults.value[fmtActiveIndex.value]
  if (!content) return
  const blob = new Blob([content], { type: 'application/xml;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url
  a.download = `formatted-${fmtActiveIndex.value + 1}.xml`
  a.click()
  URL.revokeObjectURL(url)
}

function downloadAllFormatted() {
  fmtResults.value.forEach((content, i) => {
    const blob = new Blob([content], { type: 'application/xml;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `formatted-${i + 1}.xml`
    setTimeout(() => { a.click(); URL.revokeObjectURL(url) }, i * 200)
  })
}

// ══════════════════════════════════════════════════════════════ 翻译辅助 ══
function nodeLabel(nid: string) {
  if (!currentFlow.value) return nid
  const node = currentFlow.value.nodes.find((n: any) => n.nid === nid)
  return node ? node.label || nid : nid
}
function nodeTypeLabel(t: string) {
  return t === 'S' ? '开始' : t === 'E' ? '结束' : '过程'
}
function nodeTypeTag(t: string): '' | 'success' | 'danger' {
  return t === 'S' ? 'success' : t === 'E' ? 'danger' : ''
}
function relationLabel(r: string) {
  return ({ '5': '等于', '6': '不等于', '7': '大于', '8': '小于' } as any)[r] ?? r
}
function translateReturnBack(v: string) {
  if (!v || v === '0') return ''
  return ({ ReturnBackToFirstImpl: '退回发起人', ReturnBackToPrevImpl: '退回上一节点', ReturnBackImpl: '自定义退回' } as any)[v] ?? v
}
function yesNo(v: string) { return v === '1' ? '是' : '否' }

// ══════════════════════════════════════════════════════════════ Excel导出 ══
function exportExcel() {
  const flow = currentFlow.value
  if (!flow) return
  const wb = XLSX.utils.book_new()
  const ws1 = XLSX.utils.json_to_sheet([{
    '流程编号': flow.workflow.flowId, '流程标识': flow.workflow.flowSign,
    '流程名称': flow.workflow.flowName, '流程标题': flow.workflow.title,
    '流程作者': flow.workflow.flowAdmin, '版本编号': flow.workflow.flowVersion,
    '所属机构': flow.workflow.orgId, '系统标识': flow.workflow.systemId,
    '创建时间': flow.workflow.startTime, '更新时间': flow.workflow.updateTime,
  }])
  XLSX.utils.book_append_sheet(wb, ws1, '流程信息')
  const nodeRows = flow.nodes.map((n: any, idx: number) => ({
    '序号': idx + 1, '节点序号': n.nodeSign, '节点编号': n.nid, '节点名称': n.label,
    '节点类型': nodeTypeLabel(n.nodeType), '人员配置编码': n.nodeUser, '人员配置描述': n.convertLabel,
    '角色ID': extractParts(n.nodeUser, 'R'), '人员逻辑': extractParts(n.nodeUser, 'E'),
    '机构层级': extractParts(n.nodeUser, 'A'), '授权规则': n.creditAuth,
    '自动提交': yesNo(n.autoSubmit), '无人员跳过': yesNo(n.noUserJump),
    '退回策略': translateReturnBack(n.returnBack),
    '收回标识': n.tackBack === 'TackBackImpl' ? '是' : yesNo(n.tackBack),
    '撤回标识': yesNo(n.retract), '加签': yesNo(n.addSign), '协助': yesNo(n.assist),
    '催办': yesNo(n.urged), '变更': yesNo(n.change), '拒绝': yesNo(n.refuse),
    '异步执行': yesNo(n.asynDo), '业务逻辑Bean': n.bizBeanId, '消息通知': n.noticeType,
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(nodeRows), '节点明细')
  const lineRows = flow.lines.map((l: any, idx: number) => ({
    '序号': idx + 1, '路由编号': l.nid, '路由名称': l.label,
    '起点节点': nodeLabel(l.source), '终点节点': nodeLabel(l.target),
    '条件逻辑': l.isContinueBeanId === '0' ? '无条件' : '条件判断',
    '条件配置': l.conditions?.map((c: any) => `${c.varName} ${relationLabel(c.relation)} ${c.value}`).join(' / ') ?? '',
    '路由脚本': l.routeScriptTxt, '线条颜色': l.customColor,
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(lineRows), '路由线')
  XLSX.writeFile(wb, `flow-${flow.workflow.flowId || 'flow'}.xlsx`)
  ElMessage.success('Excel 已下载')
}

function extractParts(nodeUser: string, prefix: string): string {
  if (!nodeUser) return ''
  return nodeUser.split(';').filter(p => p.startsWith(prefix + '.')).map(p => p.slice(prefix.length + 1)).join(';')
}
</script>

<style scoped>
.fp-root { padding: 4px; }
.fp-tab-bar {
  display: flex;
  border-bottom: 2px solid #e4e7ed;
  margin-bottom: 12px;
}
.fp-tab-item {
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color .2s;
}
.fp-tab-item:hover  { color: #409eff; }
.fp-tab-item.active { color: #409eff; border-bottom-color: #409eff; font-weight: 500; }
.fp-input-card { margin-bottom: 4px; }
.fp-info-card  { margin-top: 12px; }
.fp-xml-output {
  margin: 0;
  padding: 12px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  line-height: 1.6;
  border-radius: 4px;
  overflow: auto;
  max-height: 600px;
  white-space: pre;
}
</style>
