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
          <div style="margin-top:12px;display:flex;gap:8px;align-items:center;">
            <el-button type="primary" :loading="parsing" @click="doParse">
              <el-icon><Search /></el-icon>&nbsp;解析
            </el-button>
            <el-button @click="resetParse">清空</el-button>
            <el-button @click="openLogDialog" style="margin-left:auto;">
              <el-icon><Document /></el-icon>&nbsp;查看日志
            </el-button>
          </div>
        </el-card>

        <!-- 解析错误面板 -->
        <el-collapse v-if="parseErrors.length" style="margin:12px 0;">
          <el-collapse-item>
            <template #title>
              <el-tag type="warning" size="small" style="margin-right:8px;">{{ parseErrors.length }} 个片段解析失败</el-tag>
              <span style="font-size:13px;color:#e6a23c;">点击展开查看详情</span>
            </template>
            <el-table :data="parseErrors" border size="small" max-height="280">
              <el-table-column label="片段/行" width="75" align="center">
                <template #default="{ row }">{{ row.fragment ?? row.row ?? '-' }}</template>
              </el-table-column>
              <el-table-column prop="error" label="错误原因" min-width="200" show-overflow-tooltip />
              <el-table-column prop="snippet" label="内容预览" min-width="200" show-overflow-tooltip />
            </el-table>
          </el-collapse-item>
        </el-collapse>

        <!-- 日志查看对话框 -->
        <el-dialog v-model="showLogDialog" title="解析日志" width="820px" :close-on-click-modal="false">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="font-size:13px;color:#606266;">显示最近</span>
            <el-input-number v-model="logLines" :min="50" :max="2000" :step="50" size="small" style="width:100px;" />
            <span style="font-size:13px;color:#606266;">行</span>
            <el-button size="small" type="primary" :loading="logLoading" @click="loadLogs">刷新</el-button>
            <el-input v-model="logFilter" placeholder="过滤关键词" clearable size="small" style="width:180px;margin-left:8px;" />
            <span v-if="logContent.length" style="font-size:12px;color:#909399;margin-left:auto;">共 {{ logContent.length }} 行</span>
          </div>
          <div class="fp-log-box">
            <div v-for="(line, i) in filteredLog" :key="i"
                 :class="['fp-log-line', logLineClass(line)]">{{ line }}</div>
            <div v-if="!filteredLog.length" style="color:#c0c4cc;text-align:center;padding:24px;">暂无日志内容</div>
          </div>
        </el-dialog>

        <!-- 多流程页签 -->
        <div v-if="flows.length > 0" class="fp-flow-tab-bar"
             :class="{ dragging: tabDragging }"
             ref="flowTabBarRef"
             @mousedown="onTabBarMouseDown"
             @mousemove="onTabBarMouseMove"
             @mouseup="onTabBarMouseUp"
             @mouseleave="onTabBarMouseUp">
          <div
            v-for="(f, i) in flows"
            :key="i"
            class="fp-flow-tab"
            :class="{ active: activeFlowIndex === i }"
            @click="onTabClick(i)"
          >
            {{ f.workflow?.flowName || f.workflow?.flowId || ('流程' + (i + 1)) }}
          </div>
          <div style="flex:1;min-width:12px;"></div>
          <div class="fp-flow-tab-count">共 {{ flows.length }} 个流程</div>
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
                    <el-icon><Warning /></el-icon>&nbsp;{{ flows.length > 1 ? '检查全部' : '流程检查' }}
                  </el-button>
                  <el-button size="small" type="info" @click="openTerminalNodes">
                    <el-icon><Position /></el-icon>&nbsp;查看终节点
                  </el-button>
                  <el-button size="small" @click="openFlowChart">
                    <el-icon><Share /></el-icon>&nbsp;生成流程图
                  </el-button>
                  <el-button size="small" type="success" @click="exportExcel">
                    <el-icon><Download /></el-icon>&nbsp;下载Excel
                  </el-button>
                  <el-button size="small" type="success" @click="exportAllNodes">
                    <el-icon><Download /></el-icon>&nbsp;下载节点清单
                  </el-button>
                  <el-button size="small" type="success" @click="exportAllLines">
                    <el-icon><Download /></el-icon>&nbsp;下载路由线清单
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
              <el-table-column label="终节点标识" width="86" align="center">
                <template #default="{ row }">
                  <el-tag :type="terminalNodeIds.has(row.nid) ? 'warning' : 'info'" size="small">
                    {{ terminalNodeIds.has(row.nid) ? '是' : '否' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="首节点标识" width="86" align="center">
                <template #default="{ row }">
                  <el-tag :type="firstNodeIds.has(row.nid) ? 'success' : 'info'" size="small">
                    {{ firstNodeIds.has(row.nid) ? '是' : '否' }}
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
              <el-table-column label="条件配置" min-width="180">
                <template #default="{ row }">
                  <div v-if="row.conditions?.length" style="cursor:pointer;" @click="openCondDetail(row)">
                    <div v-for="(c, i) in row.conditions.slice(0, 2)" :key="i" style="font-size:11px;">
                      {{ i > 0 ? (c.logic === '1' ? '或' : '且') : '' }}
                      {{ c.varName }} {{ relationLabel(c.relation) }} {{ c.value }}
                    </div>
                    <el-link v-if="row.conditions.length > 2" type="primary" :underline="false" style="font-size:11px;">
                      …共{{ row.conditions.length }}条，点击查看
                    </el-link>
                    <el-link v-else type="primary" :underline="false" style="font-size:11px;">查看明细</el-link>
                  </div>
                  <div v-else-if="row.routeScriptTxt" style="cursor:pointer;" @click="openCondDetail(row)">
                    <span style="font-size:11px;color:#909399;">{{ row.routeScriptTxt.slice(0, 50) }}…</span>
                    <el-link type="primary" :underline="false" style="font-size:11px;margin-left:4px;">查看明细</el-link>
                  </div>
                  <span v-else style="font-size:11px;color:#c0c4cc;">—</span>
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


        <!-- 流程图对话框 -->
        <el-dialog v-model="showFlowChart" title="流程图" width="95%"
                   style="max-width:1400px;top:2vh;" :close-on-click-modal="false" destroy-on-close>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            <el-tag type="info" size="small">节点 {{ chartData.nodes.length }} / 连线 {{ chartData.edges.length }}</el-tag>
            <el-button size="small" type="success" @click="exportChartSvg">
              <el-icon><Download /></el-icon>&nbsp;导出SVG
            </el-button>
            <span style="font-size:12px;color:#909399;">滚动缩放 · 拖动查看</span>
          </div>
          <div class="fp-chart-wrap" ref="chartWrapRef">
            <svg ref="chartSvgRef" :width="chartData.svgW" :height="chartData.svgH"
                 xmlns="http://www.w3.org/2000/svg" style="display:block;">
              <defs>
                <marker id="fp-arrow" markerWidth="8" markerHeight="6"
                        refX="8" refY="3" orient="auto">
                  <polygon points="0 0,8 3,0 6" fill="#409eff" />
                </marker>
                <marker id="fp-arrow-back" markerWidth="8" markerHeight="6"
                        refX="8" refY="3" orient="auto">
                  <polygon points="0 0,8 3,0 6" fill="#e6a23c" />
                </marker>
              </defs>
              <!-- edges -->
              <g>
                <g v-for="edge in chartData.edges" :key="edge.id">
                  <path :d="edge.path"
                        :stroke="edge.isBack ? '#e6a23c' : '#409eff'"
                        stroke-width="1.5" fill="none"
                        :marker-end="edge.isBack ? 'url(#fp-arrow-back)' : 'url(#fp-arrow)'"
                        :stroke-dasharray="edge.isBack ? '5,3' : 'none'" />
                  <rect v-if="edge.label"
                        :x="edge.lx - edge.label.length * 3.2"
                        :y="edge.ly - 8" :width="edge.label.length * 6.4 + 4" height="14"
                        fill="white" opacity="0.85" rx="2" />
                  <text v-if="edge.label" :x="edge.lx" :y="edge.ly + 1"
                        font-size="10" fill="#606266" text-anchor="middle" dominant-baseline="middle">
                    {{ edge.label }}
                  </text>
                </g>
              </g>
              <!-- nodes -->
              <g v-for="node in chartData.nodes" :key="node.id">
                <template v-if="node.type === 'COND'">
                  <polygon :points="`${node.x + CHART.NW/2},${node.y} ${node.x + CHART.NW},${node.y + CHART.NH/2} ${node.x + CHART.NW/2},${node.y + CHART.NH} ${node.x},${node.y + CHART.NH/2}`"
                           fill="#fff7e6" stroke="#fa8c16" stroke-width="1.5" />
                  <text :x="node.x + CHART.NW/2" :y="node.y + CHART.NH/2"
                        font-size="11" fill="#fa8c16" text-anchor="middle" dominant-baseline="middle" font-weight="600">
                    {{ node.label }}
                  </text>
                </template>
                <template v-else>
                  <rect :x="node.x" :y="node.y" :width="CHART.NW" :height="CHART.NH"
                        rx="6" :fill="chartNodeFill(node.type)" :stroke="chartNodeStroke(node.type)"
                        stroke-width="1.5" />
                  <text :x="node.x + CHART.NW/2" :y="node.y + CHART.NH/2 - 7"
                        font-size="12" fill="#303133" text-anchor="middle" dominant-baseline="middle"
                        :font-weight="node.type==='S'||node.type==='E' ? '600' : 'normal'">
                    {{ truncate(node.label, 16) }}
                  </text>
                  <text :x="node.x + CHART.NW/2" :y="node.y + CHART.NH/2 + 8"
                        font-size="10" fill="#909399" text-anchor="middle">
                    {{ node.nid }}
                  </text>
                </template>
              </g>
            </svg>
          </div>
        </el-dialog>

        <!-- 条件配置明细对话框 -->
        <el-dialog v-model="showCondDetail" title="条件配置明细" width="680px" :close-on-click-modal="false">
          <div v-if="condDetailRow" style="font-size:13px;">
            <el-descriptions :column="2" border size="small" style="margin-bottom:14px;">
              <el-descriptions-item label="路由编号">{{ condDetailRow.nid }}</el-descriptions-item>
              <el-descriptions-item label="路由名称">{{ condDetailRow.label || '—' }}</el-descriptions-item>
              <el-descriptions-item label="起点节点">{{ nodeLabel(condDetailRow.source) }}</el-descriptions-item>
              <el-descriptions-item label="终点节点">{{ nodeLabel(condDetailRow.target) }}</el-descriptions-item>
            </el-descriptions>

            <!-- 结构化条件 -->
            <template v-if="condDetailRow.conditions?.length">
              <div style="font-weight:600;margin-bottom:8px;">条件规则（{{ condDetailRow.conditions.length }} 条）</div>
              <el-table :data="condDetailRow.conditions" border size="small">
                <el-table-column type="index" label="序" width="46" />
                <el-table-column label="逻辑" width="50" align="center">
                  <template #default="{ $index }">
                    <el-tag v-if="$index > 0" :type="condDetailRow.conditions[$index].logic === '1' ? 'warning' : 'primary'" size="small">
                      {{ condDetailRow.conditions[$index].logic === '1' ? 'OR' : 'AND' }}
                    </el-tag>
                    <span v-else style="color:#c0c4cc;">—</span>
                  </template>
                </el-table-column>
                <el-table-column prop="varName"  label="变量名"  min-width="140" show-overflow-tooltip />
                <el-table-column label="关系" width="70" align="center">
                  <template #default="{ row }">{{ relationLabel(row.relation) }}</template>
                </el-table-column>
                <el-table-column prop="value"    label="值"      min-width="100" show-overflow-tooltip />
                <el-table-column prop="varType"  label="变量类型" width="80" show-overflow-tooltip />
              </el-table>
            </template>

            <!-- 原始路由脚本 -->
            <template v-if="condDetailRow.routeScriptTxt">
              <div style="font-weight:600;margin:14px 0 8px;">路由脚本</div>
              <pre class="fp-script-box">{{ condDetailRow.routeScriptTxt }}</pre>
            </template>
          </div>
        </el-dialog>

        <!-- 终节点对话框 -->
        <el-dialog v-model="showTerminal" title="终节点列表" width="860px"
                   :close-on-click-modal="false" destroy-on-close>
          <div style="margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <el-tag type="info" style="margin-right:6px;">
                共 {{ terminalRows.length }} 个终节点
              </el-tag>
              <span style="font-size:12px;color:#909399;">终节点：通过路由线连接了结束类型节点的节点</span>
            </div>
            <el-button size="small" type="success" @click="exportTerminalExcel">
              <el-icon><Download /></el-icon>&nbsp;导出Excel
            </el-button>
          </div>
          <el-table :data="terminalRows" border stripe size="small" max-height="500">
            <el-table-column type="index" label="序" width="46" />
            <el-table-column v-if="flows.length > 1" prop="flowName" label="所属流程" width="160" show-overflow-tooltip />
            <el-table-column prop="nodeSign" label="节点序号" width="80" />
            <el-table-column prop="nid"      label="节点编号" width="70" />
            <el-table-column prop="label"    label="节点名称" min-width="140" show-overflow-tooltip />
            <el-table-column label="节点类型" width="72" align="center">
              <template #default="{ row }">
                <el-tag :type="nodeTypeTag(row.nodeType)" size="small">
                  {{ nodeTypeLabel(row.nodeType) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="roles"          label="配置角色"       min-width="160" show-overflow-tooltip />
            <el-table-column prop="toEndNodeLabel" label="连接的结束节点" min-width="140" show-overflow-tooltip />
            <el-table-column prop="routeLabel"     label="路由线名称"     min-width="120" show-overflow-tooltip />
          </el-table>
          <div v-if="!terminalRows.length" style="text-align:center;padding:32px;color:#909399;font-size:14px;">
            未找到终节点
          </div>
        </el-dialog>

        <el-dialog v-model="showCheck"
                   :title="`流程检查结果${ flows.length > 1 ? '（共 ' + flows.length + ' 个流程）' : '' }`"
                   width="860px"
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
            <el-table-column v-if="checkIssues.some((i: any) => i.flowName)"
                             prop="flowName" label="所属流程" width="160" show-overflow-tooltip />
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
  ElDialog, ElForm, ElFormItem, ElIcon, ElInput, ElOption,
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

// ── 流程页签拖拽滚动 ──────────────────────────────────────────────────────
const flowTabBarRef  = ref<HTMLElement | null>(null)
const tabDragging    = ref(false)
let   tabDragStartX  = 0
let   tabScrollStart = 0
let   tabDragMoved   = false

function onTabBarMouseDown(e: MouseEvent) {
  const el = flowTabBarRef.value
  if (!el) return
  tabDragging.value  = true
  tabDragMoved       = false
  tabDragStartX      = e.clientX
  tabScrollStart     = el.scrollLeft
  e.preventDefault()
}
function onTabBarMouseMove(e: MouseEvent) {
  if (!tabDragging.value || !flowTabBarRef.value) return
  const dx = e.clientX - tabDragStartX
  if (Math.abs(dx) > 3) tabDragMoved = true
  flowTabBarRef.value.scrollLeft = tabScrollStart - dx
}
function onTabBarMouseUp() {
  tabDragging.value = false
}
function onTabClick(i: number) {
  // 拖拽结束后不触发 tab 切换
  if (tabDragMoved) return
  activeFlowIndex.value = i
}
const parseErrors     = ref<any[]>([])
const showLogDialog   = ref(false)
const logLines        = ref(200)
const logFilter       = ref('')
const logLoading      = ref(false)
const logContent      = ref<string[]>([])
const filteredLog     = computed(() =>
  logFilter.value ? logContent.value.filter(l => l.includes(logFilter.value)) : logContent.value
)
function logLineClass(line: string) {
  if (line.includes(' ERROR ') || line.includes(' error ')) return 'fp-log-error'
  if (line.includes(' WARN ') || line.includes('解析失败')) return 'fp-log-warn'
  return ''
}
async function loadLogs() {
  logLoading.value = true
  try {
    const r = await props.api.plugin.callSync('queryLogs', { lines: logLines.value })
    logContent.value = r.lines ?? []
  } finally {
    logLoading.value = false
  }
}
async function openLogDialog() {
  showLogDialog.value = true
  if (!logContent.value.length) await loadLogs()
}
const isCsvFile       = ref(false)
const csvColumns      = ref<string[]>([])
const csvXmlColumn    = ref('')
const csvRows         = ref<string[][]>([])

const currentFlow  = computed(() => flows.value[activeFlowIndex.value] ?? null)

// ══════════════════════════════════════════════════════════════ 流程图 ══
const CHART = { NW: 160, NH: 50, HG: 60, VG: 110 }

interface DiagNode { id: string; label: string; nid: string; type: string; x: number; y: number }
interface DiagEdge { id: string; path: string; label: string; lx: number; ly: number; isBack: boolean }
interface ChartData { nodes: DiagNode[]; edges: DiagEdge[]; svgW: number; svgH: number }

const showFlowChart = ref(false)
const chartData     = ref<ChartData>({ nodes: [], edges: [], svgW: 800, svgH: 400 })
const chartSvgRef   = ref<SVGSVGElement>()
const chartWrapRef  = ref<HTMLElement>()

function truncate(s: string, n: number) { return s && s.length > n ? s.slice(0, n) + '…' : (s ?? '') }

function chartNodeFill(t: string) {
  return t === 'S' ? '#f0fdf4' : t === 'E' ? '#fff1f0' : '#eff6ff'
}
function chartNodeStroke(t: string) {
  return t === 'S' ? '#52c41a' : t === 'E' ? '#ff4d4f' : '#409eff'
}

function buildChartData(flow: any): ChartData {
  const { NW, NH, HG, VG } = CHART
  const COND_PREFIX = '__cond_'
  const allNodes: any[] = [...flow.nodes]
  const allLines: any[] = [...flow.lines]

  const connectedIds = new Set<string>()
  for (const l of allLines) { connectedIds.add(l.source); connectedIds.add(l.target) }
  if (connectedIds.size === 0) return { nodes: [], edges: [], svgW: 400, svgH: 200 }

  function buildAdj(lines: any[]) {
    const a = new Map<string, any[]>()
    const indeg = new Map<string, number>()
    for (const id of connectedIds) indeg.set(id, 0)
    for (const l of lines) {
      if (!connectedIds.has(l.source) || !connectedIds.has(l.target)) continue
      if (!a.has(l.source)) a.set(l.source, [])
      a.get(l.source)!.push(l)
      indeg.set(l.target, (indeg.get(l.target) ?? 0) + 1)
    }
    return { adj: a, indeg }
  }

  function bfs(root: string, adj: Map<string, any[]>): Map<string, number> {
    const lm = new Map<string, number>([[root, 0]])
    const q = [root]
    while (q.length) {
      const cur = q.shift()!
      const lv = lm.get(cur)!
      for (const l of (adj.get(cur) ?? [])) {
        const tgt = l.target
        if (!connectedIds.has(tgt)) continue
        const prev = lm.get(tgt) ?? -1
        if (prev < lv + 1) {
          lm.set(tgt, lv + 1)
          if (prev < 0) q.push(tgt)
        }
      }
    }
    return lm
  }

  let { adj, indeg } = buildAdj(allLines)
  const startNode = allNodes.find((n: any) => n.nodeType === 'S' && connectedIds.has(n.nid))
  const mainRoot = startNode?.nid ?? [...indeg.entries()].sort((a, b) => a[1] - b[1])[0]?.[0]
  if (!mainRoot) return { nodes: [], edges: [], svgW: 400, svgH: 200 }

  const mainLevels = bfs(mainRoot, adj)

  // Find disconnected subgraph roots (in-degree 0, not reachable from main)
  const discRoots: string[] = []
  for (const [id, deg] of indeg) {
    if (!mainLevels.has(id) && deg === 0) discRoots.push(id)
  }
  console.log('[buildChartData] mainRoot:', mainRoot, 'mainLevels size:', mainLevels.size, 'discRoots:', discRoots, 'total connectedIds:', connectedIds.size)

  // Merge disconnected subgraphs via synthetic diamond condition nodes
  if (discRoots.length > 0) {
    const mainSinks = [...mainLevels.keys()].filter(id =>
      !(adj.get(id) ?? []).some(l => connectedIds.has(l.target))
    )
    const condId = `${COND_PREFIX}0`
    connectedIds.add(condId)
    allNodes.push({ nodeType: 'COND', label: '条件路由', nid: condId, synthetic: true })
    for (const s of mainSinks) {
      allLines.push({ source: s, target: condId, nid: `__ci_${s}`, label: '', synthetic: true })
    }
    for (const r of discRoots) {
      allLines.push({ source: condId, target: r, nid: `__co_${r}`, label: '', synthetic: true })
    }
    ;({ adj, indeg } = buildAdj(allLines))
  }

  // BFS from main root for full level assignment
  const levelMap = bfs(mainRoot, adj)

  // Handle any remaining unreachable nodes (cycles etc.)
  for (const id of connectedIds) {
    if (!levelMap.has(id)) {
      const sub = bfs(id, adj)
      const base = Math.max(-1, ...levelMap.values()) + 1
      for (const [nid, lv] of sub) levelMap.set(nid, lv + base)
    }
  }

  // ── 1. Group by level ──────────────────────────────────────────────────
  const byLevel = new Map<number, string[]>()
  for (const [id, lv] of levelMap) {
    if (!byLevel.has(lv)) byLevel.set(lv, [])
    byLevel.get(lv)!.push(id)
  }
  const maxLevel = Math.max(...levelMap.values())

  // ── 2. Barycenter crossing-minimisation (Sugiyama, 3 passes ↓↑↓) ──────
  // Build reverse adjacency for upward pass
  const radj = new Map<string, string[]>()
  for (const l of allLines) {
    if (!radj.has(l.target)) radj.set(l.target, [])
    radj.get(l.target)!.push(l.source)
  }

  // xPos[id] tracks virtual x-order (0-based index within layer)
  const xPos = new Map<string, number>()
  for (const [lv, ids] of byLevel) ids.forEach((id, i) => xPos.set(id, i))

  function sweepDown() {
    for (let lv = 1; lv <= maxLevel; lv++) {
      const ids = byLevel.get(lv) ?? []
      const bc = ids.map(id => {
        const parents = radj.get(id) ?? []
        const ps = parents.filter(p => xPos.has(p))
        if (!ps.length) return xPos.get(id) ?? 0
        return ps.reduce((s, p) => s + (xPos.get(p) ?? 0), 0) / ps.length
      })
      const sorted = ids.map((id, i) => ({ id, bc: bc[i] }))
        .sort((a, b) => a.bc - b.bc)
        .map(x => x.id)
      byLevel.set(lv, sorted)
      sorted.forEach((id, i) => xPos.set(id, i))
    }
  }

  function sweepUp() {
    for (let lv = maxLevel - 1; lv >= 0; lv--) {
      const ids = byLevel.get(lv) ?? []
      const bc = ids.map(id => {
        const children = (adj.get(id) ?? []).map((l: any) => l.target).filter((t: string) => xPos.has(t))
        if (!children.length) return xPos.get(id) ?? 0
        return children.reduce((s: number, c: string) => s + (xPos.get(c) ?? 0), 0) / children.length
      })
      const sorted = ids.map((id, i) => ({ id, bc: bc[i] }))
        .sort((a, b) => a.bc - b.bc)
        .map(x => x.id)
      byLevel.set(lv, sorted)
      sorted.forEach((id, i) => xPos.set(id, i))
    }
  }

  sweepDown(); sweepUp(); sweepDown()

  // ── 3. Compute SVG width and assign pixel positions ────────────────────
  let maxRowW = 0
  for (const ids of byLevel.values()) {
    const w = ids.length * NW + (ids.length - 1) * HG
    if (w > maxRowW) maxRowW = w
  }
  const svgW = maxRowW + 100

  const posMap = new Map<string, DiagNode>()
  for (let lv = 0; lv <= maxLevel; lv++) {
    const ids = byLevel.get(lv) ?? []
    const rowW = ids.length * NW + (ids.length - 1) * HG
    const startX = (svgW - rowW) / 2
    ids.forEach((id, idx) => {
      const raw = allNodes.find((n: any) => n.nid === id)
      posMap.set(id, {
        id, label: raw?.label || id, nid: id, type: raw?.nodeType ?? '',
        x: startX + idx * (NW + HG),
        y: lv * (NH + VG) + 24,
      })
    })
  }

  // ── 4. Build edges with port-offsetting to avoid overlap ───────────────
  // Count how many edges leave/enter each node so we can spread them
  const outCount = new Map<string, number>()
  const inCount  = new Map<string, number>()
  const outIdx   = new Map<string, number>()
  const inIdx    = new Map<string, number>()
  for (const l of allLines) {
    if (!posMap.has(l.source) || !posMap.has(l.target)) continue
    outCount.set(l.source, (outCount.get(l.source) ?? 0) + 1)
    inCount.set(l.target,  (inCount.get(l.target)  ?? 0) + 1)
  }

  const diagEdges: DiagEdge[] = []
  const edgeSeen = new Set<string>()
  for (const l of allLines) {
    const src = posMap.get(l.source)
    const tgt = posMap.get(l.target)
    if (!src || !tgt) continue
    const key = `${l.source}=>${l.target}`
    if (edgeSeen.has(key)) continue
    edgeSeen.add(key)

    // Spread multiple edges leaving/entering the same node
    const oi = outIdx.get(l.source) ?? 0; outIdx.set(l.source, oi + 1)
    const ii = inIdx.get(l.target)  ?? 0; inIdx.set(l.target,  ii + 1)
    const oc = outCount.get(l.source) ?? 1
    const ic = inCount.get(l.target)  ?? 1
    const SPREAD = Math.min(NW * 0.6, (oc - 1) * 14)
    const outOff = oc > 1 ? -SPREAD / 2 + oi * (SPREAD / (oc - 1)) : 0
    const inOff  = ic > 1 ? -Math.min(NW * 0.6, (ic - 1) * 14) / 2 + ii * (Math.min(NW * 0.6, (ic - 1) * 14) / (ic - 1)) : 0

    const x1 = src.x + NW / 2 + outOff
    const y1 = src.y + NH
    const x2 = tgt.x + NW / 2 + inOff
    const y2 = tgt.y
    const isBack = (levelMap.get(l.target) ?? 0) <= (levelMap.get(l.source) ?? 0)

    let path: string
    if (isBack) {
      // Route back-edges to the right side of the diagram to avoid overlapping forward nodes
      const rightEdge = svgW - 20
      path = `M ${x1} ${y1} C ${rightEdge} ${y1} ${rightEdge} ${y2} ${x2} ${y2}`
    } else {
      const cy = (y1 + y2) / 2
      path = `M ${x1} ${y1} C ${x1} ${cy} ${x2} ${cy} ${x2} ${y2}`
    }
    const isSynth = !!(l as any).synthetic
    diagEdges.push({
      id: l.nid || key, path,
      label: isSynth ? '' : (l.label || ''),
      lx: (x1 + x2) / 2, ly: (y1 + y2) / 2,
      isBack,
    })
  }

  return {
    nodes: [...posMap.values()],
    edges: diagEdges,
    svgW,
    svgH: (maxLevel + 1) * (NH + VG) + 40,
  }
}

function openFlowChart() {
  if (!currentFlow.value) return
  chartData.value = buildChartData(currentFlow.value)
  showFlowChart.value = true
}

function exportChartSvg() {
  const svg = chartSvgRef.value
  if (!svg) return
  const serializer = new XMLSerializer()
  const svgStr = '<?xml version="1.0" encoding="UTF-8"?>\n' + serializer.serializeToString(svg)
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url
  a.download = `flow-${currentFlow.value?.workflow?.flowId || 'chart'}.svg`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('流程图已导出')
}

// ══════════════════════════════════════════════════════════════ 终节点 ══
// 返回某个流程中所有终节点的 nid 集合（路由线目标为结束节点的源节点）
function getTerminalNodeIds(flow: any): Set<string> {
  const endIds = new Set<string>(
    (flow.nodes as any[]).filter((n: any) => n.nodeType === 'E').map((n: any) => n.nid)
  )
  return new Set<string>(
    (flow.lines as any[]).filter((l: any) => endIds.has(l.target)).map((l: any) => l.source)
  )
}
// 返回某个流程中所有首节点的 nid 集合（路由线来源为开始节点的目标节点）
function getFirstNodeIds(flow: any): Set<string> {
  const startIds = new Set<string>(
    (flow.nodes as any[]).filter((n: any) => n.nodeType === 'S').map((n: any) => n.nid)
  )
  return new Set<string>(
    (flow.lines as any[]).filter((l: any) => startIds.has(l.source)).map((l: any) => l.target)
  )
}
// 当前选中流程的终节点 / 首节点 ID 集合（供节点列表列使用）
const terminalNodeIds = computed(() => currentFlow.value ? getTerminalNodeIds(currentFlow.value) : new Set<string>())
const firstNodeIds    = computed(() => currentFlow.value ? getFirstNodeIds(currentFlow.value)    : new Set<string>())

// ══════════════════════════════════════════════════════════════ 条件配置明细 ══
const showCondDetail = ref(false)
const condDetailRow  = ref<any>(null)
function openCondDetail(row: any) { condDetailRow.value = row; showCondDetail.value = true }

const showTerminal  = ref(false)
const terminalRows  = ref<any[]>([])

function computeTerminalRows(targetFlows: any[]): any[] {
  const rows: any[] = []
  for (const flow of targetFlows) {
    const flowName = flow.workflow?.flowName || flow.workflow?.flowId || '未知流程'
    const endNodeIds = new Set<string>(
      (flow.nodes as any[]).filter(n => n.nodeType === 'E').map((n: any) => n.nid)
    )
    // 找所有目标是结束节点的路由线
    const terminalLines = (flow.lines as any[]).filter(l => endNodeIds.has(l.target))
    // 按 source 去重（同一节点可能有多条路由连向结束节点）
    const seen = new Map<string, any[]>()
    for (const line of terminalLines) {
      if (!seen.has(line.source)) seen.set(line.source, [])
      seen.get(line.source)!.push(line)
    }
    for (const [sourceId, lines] of seen) {
      const node = (flow.nodes as any[]).find(n => n.nid === sourceId)
      if (!node) continue
      // 连接的结束节点名称（可能多个）
      const toEndLabels = lines.map((l: any) => {
        const endNode = (flow.nodes as any[]).find(n => n.nid === l.target)
        return endNode?.label || l.target
      })
      const routeLabels = lines.map((l: any) => l.label || l.nid || '').filter(Boolean)
      // convertLabel 格式：角色1;角色2; → 转为逗号分隔
      const roles = (node.convertLabel || '')
        .split(';').map((s: string) => s.trim()).filter(Boolean).join('，')
      rows.push({
        flowName,
        nodeSign: node.nodeSign,
        nid: node.nid,
        label: node.label,
        nodeType: node.nodeType,
        roles,
        toEndNodeLabel: [...new Set(toEndLabels)].join('、'),
        routeLabel: [...new Set(routeLabels)].join('、'),
      })
    }
  }
  return rows
}

function openTerminalNodes() {
  terminalRows.value = computeTerminalRows(flows.value)
  showTerminal.value = true
}

function exportTerminalExcel() {
  if (!terminalRows.value.length) { ElMessage.warning('无终节点数据'); return }
  const wb = XLSX.utils.book_new()
  const rows = terminalRows.value.map((r, i) => ({
    '序号': i + 1,
    '所属流程': r.flowName,
    '节点序号': r.nodeSign,
    '节点编号': r.nid,
    '节点名称': r.label,
    '节点类型': nodeTypeLabel(r.nodeType),
    '配置角色': r.roles,
    '连接的结束节点': r.toEndNodeLabel,
    '路由线名称': r.routeLabel,
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), '终节点')
  const flowId = flows.value[0]?.workflow?.flowId || 'flow'
  XLSX.writeFile(wb, `terminal-nodes-${flowId}.xlsx`)
  ElMessage.success('终节点已导出')
}

// ══════════════════════════════════════════════════════════════ 流程检查 ══
const checking    = ref(false)
const showCheck   = ref(false)
const checkIssues = ref<any[]>([])

async function doCheck() {
  if (!flows.value.length) { ElMessage.warning('请先解析流程'); return }
  checking.value = true
  try {
    let res: any
    // SQL/CSV 模式下没有原始 XML，直接把已解析的 flows 发回后端检查
    if (inputMode.value === 'sql' || (inputMode.value === 'file' && isCsvFile.value)) {
      res = await props.api.plugin.callSync('checkAllParsed', { flows: flows.value })
    } else {
      const xmlContent = inputMode.value === 'file' ? fileContent.value : pasteContent.value
      if (!xmlContent) { ElMessage.warning('请先解析流程'); return }
      res = await props.api.plugin.callSync('checkFlow', { xmlContent })
    }
    checkIssues.value = res.issues ?? []
    showCheck.value = true
    if (!checkIssues.value.length) {
      ElMessage.success(`检查完成，共 ${res.flowCount ?? flows.value.length} 个流程，未发现配置问题`)
    } else {
      const errCount = checkIssues.value.filter((i: any) => i.level === 'ERROR').length
      ElMessage[errCount > 0 ? 'error' : 'warning'](
        `检查完成，共 ${res.flowCount ?? flows.value.length} 个流程，发现 ${checkIssues.value.length} 个问题（ERROR: ${errCount}）`
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
  if (!checkIssues.value.length && !flows.value.length) return
  const hasFlowCol = checkIssues.value.some((i: any) => i.flowName)
  const wb  = XLSX.utils.book_new()
  const rows = checkIssues.value.map((i: any) => {
    const row: any = { '级别': i.level }
    if (hasFlowCol) row['所属流程'] = i.flowName ?? ''
    row['规则编号'] = i.ruleCode
    row['规则名称'] = i.ruleName
    row['节点编号'] = i.nodeId ?? ''
    row['关联节点'] = i.nodeName ?? ''
    row['问题描述'] = i.message
    return row
  })
  const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ '结果': '未发现配置问题' }])
  XLSX.utils.book_append_sheet(wb, ws, '流程检查结果')
  const baseName = flows.value.length === 1
    ? (flows.value[0]?.workflow?.flowId ?? 'flow')
    : `batch-${flows.value.length}`
  XLSX.writeFile(wb, `check-${baseName}.xlsx`)
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
  if (!flows.value.length) { ElMessage.warning('暂无已解析的流程'); return }
  const wb = XLSX.utils.book_new()
  const infoRows = flows.value.map((flow: any, idx: number) => ({
    '序号': idx + 1,
    '流程编号': flow.workflow?.flowId, '流程标识': flow.workflow?.flowSign,
    '流程名称': flow.workflow?.flowName, '流程标题': flow.workflow?.title,
    '流程作者': flow.workflow?.flowAdmin, '版本编号': flow.workflow?.flowVersion,
    '所属机构': flow.workflow?.orgId, '系统标识': flow.workflow?.systemId,
    '创建时间': flow.workflow?.startTime, '更新时间': flow.workflow?.updateTime,
    '节点数': flow.nodes?.length ?? 0, '路由线数': flow.lines?.length ?? 0,
  }))
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(infoRows), '流程基本信息')
  const filename = flows.value.length === 1
    ? `flow-${flows.value[0].workflow?.flowId || 'flow'}.xlsx`
    : `flows-${flows.value.length}.xlsx`
  XLSX.writeFile(wb, filename)
  ElMessage.success(`已下载 ${flows.value.length} 个流程的基本信息`)
}

function exportAllNodes() {
  if (!flows.value.length) { ElMessage.warning('暂无已解析的流程'); return }
  const wb = XLSX.utils.book_new()
  const rows: any[] = []
  for (const flow of flows.value) {
    const flowName = flow.workflow?.flowName || flow.workflow?.flowId || '未知流程'
    const termIds  = getTerminalNodeIds(flow)
    const firstIds = getFirstNodeIds(flow)
    flow.nodes.forEach((n: any, idx: number) => {
      rows.push({
        '所属流程': flowName, '流程编号': flow.workflow?.flowId,
        '序号': idx + 1, '节点序号': n.nodeSign, '节点编号': n.nid, '节点名称': n.label,
        '节点类型': nodeTypeLabel(n.nodeType),
        '终节点标识': termIds.has(n.nid)  ? '是' : '否',
        '首节点标识': firstIds.has(n.nid) ? '是' : '否',
        '人员配置编码': n.nodeUser, '人员配置描述': n.convertLabel,
        '角色ID': extractParts(n.nodeUser, 'R'), '人员逻辑': extractParts(n.nodeUser, 'E'),
        '机构层级': extractParts(n.nodeUser, 'A'), '授权规则': n.creditAuth,
        '自动提交': yesNo(n.autoSubmit), '无人员跳过': yesNo(n.noUserJump),
        '退回策略': translateReturnBack(n.returnBack),
        '收回标识': n.tackBack === 'TackBackImpl' ? '是' : yesNo(n.tackBack),
        '撤回标识': yesNo(n.retract), '加签': yesNo(n.addSign), '协助': yesNo(n.assist),
        '催办': yesNo(n.urged), '变更': yesNo(n.change), '拒绝': yesNo(n.refuse),
        '异步执行': yesNo(n.asynDo), '业务逻辑Bean': n.bizBeanId, '消息通知': n.noticeType,
      })
    })
  }
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), '节点清单')
  XLSX.writeFile(wb, `nodes-all-${flows.value.length}flows.xlsx`)
  ElMessage.success(`已下载节点清单，共 ${rows.length} 条`)
}

function exportAllLines() {
  if (!flows.value.length) { ElMessage.warning('暂无已解析的流程'); return }
  const wb = XLSX.utils.book_new()
  const rows: any[] = []
  for (const flow of flows.value) {
    const flowName = flow.workflow?.flowName || flow.workflow?.flowId || '未知流程'
    const nodeMap = new Map((flow.nodes as any[]).map((n: any) => [n.nid, n.label]))
    flow.lines.forEach((l: any, idx: number) => {
      rows.push({
        '所属流程': flowName, '流程编号': flow.workflow?.flowId,
        '序号': idx + 1, '路由编号': l.nid, '路由名称': l.label,
        '起点节点编号': l.source, '起点节点名称': nodeMap.get(l.source) ?? '',
        '终点节点编号': l.target, '终点节点名称': nodeMap.get(l.target) ?? '',
        '条件逻辑': l.isContinueBeanId === '0' ? '无条件' : '条件判断',
        '条件配置': l.conditions?.map((c: any) => `${c.varName} ${relationLabel(c.relation)} ${c.value}`).join(' / ') ?? '',
        '路由脚本': l.routeScriptTxt, '线条颜色': l.customColor,
      })
    })
  }
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), '路由线清单')
  XLSX.writeFile(wb, `lines-all-${flows.value.length}flows.xlsx`)
  ElMessage.success(`已下载路由线清单，共 ${rows.length} 条`)
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

/* 多流程页签 */
.fp-flow-tab-bar {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 10px 0;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 4px;
  cursor: grab;
  user-select: none;
}
.fp-flow-tab-bar::-webkit-scrollbar { display: none; }
.fp-flow-tab-bar.dragging { cursor: grabbing; }

.fp-script-box {
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: 6px;
  padding: 10px 14px;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 320px;
  overflow-y: auto;
  margin: 0;
}

.fp-log-box {
  background: #1e1e1e;
  border-radius: 6px;
  padding: 10px 14px;
  height: 460px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
}
.fp-log-line { color: #d4d4d4; white-space: pre-wrap; word-break: break-all; }
.fp-log-error { color: #f56c6c; font-weight: 600; }
.fp-log-warn  { color: #e6a23c; }
.fp-flow-tab {
  padding: 4px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: #606266;
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid transparent;
  transition: all 0.15s;
}
.fp-flow-tab:hover { background: #ecf5ff; color: #409eff; }
.fp-flow-tab.active {
  background: #fff;
  color: #409eff;
  border-color: #c6e2ff;
  font-weight: 500;
}
.fp-chart-wrap {
  overflow: auto;
  max-height: 78vh;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background: #fafafa;
  padding: 12px;
  cursor: grab;
}
.fp-chart-wrap:active { cursor: grabbing; }

.fp-flow-tab-count {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  padding: 0 4px;
}
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
