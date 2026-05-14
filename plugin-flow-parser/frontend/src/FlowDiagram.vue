<template>
  <div class="fd-wrap">
    <div class="fd-toolbar">
      <el-button-group size="small">
        <el-button @click="fitView">适应窗口</el-button>
        <el-button @click="zoomIn">放大</el-button>
        <el-button @click="zoomOut">缩小</el-button>
      </el-button-group>
      <span style="margin-left:12px;font-size:12px;color:#909399;">
        鼠标移到路由线上查看条件逻辑
      </span>
    </div>

    <div class="fd-canvas" ref="canvasRef">
      <VueFlow
        :nodes="vfNodes"
        :edges="vfEdges"
        :default-viewport="{ zoom: 0.9 }"
        fit-view-on-init
        :nodes-connectable="false"
        :nodes-draggable="true"
        :edges-updatable="false"
        @edge-mouse-enter="onEdgeEnter"
        @edge-mouse-leave="onEdgeLeave"
      >
        <Background pattern-color="#e8e8e8" :gap="20" />
        <MiniMap />
        <Controls />

        <!-- 自定义节点 -->
        <template #node-start="{ data }">
          <div class="vf-node vf-node--start">
            <div class="vf-node__title">{{ data.label }}</div>
            <div class="vf-node__type-badge start">开始</div>
          </div>
        </template>

        <template #node-end="{ data }">
          <div class="vf-node vf-node--end">
            <div class="vf-node__title">{{ data.label }}</div>
            <div class="vf-node__type-badge end">结束</div>
          </div>
        </template>

        <template #node-process="{ data }">
          <div class="vf-node vf-node--process">
            <div class="vf-node__title">{{ data.label }}</div>
            <div v-if="data.nodeSign" class="vf-node__meta">序号：{{ data.nodeSign }}</div>
            <div v-if="data.convertLabel" class="vf-node__meta" :title="data.convertLabel">
              人员：{{ truncate(data.convertLabel, 30) }}
            </div>
            <div v-if="data.autoSubmit === '1'" class="vf-node__badge auto">自动提交</div>
            <div v-if="data.noUserJump === '1'" class="vf-node__badge jump">无人跳过</div>
            <div v-if="data.creditAuth" class="vf-node__meta" :title="data.creditAuth">
              授权：{{ truncate(data.creditAuth, 28) }}
            </div>
          </div>
        </template>
      </VueFlow>

      <!-- 路由线 tooltip -->
      <div v-if="edgeTooltip.visible"
           class="fd-edge-tooltip"
           :style="{ left: edgeTooltip.x + 'px', top: edgeTooltip.y + 'px' }">
        <div class="fd-edge-tooltip__title">路由：{{ edgeTooltip.label || '（无名称）' }}</div>
        <div class="fd-edge-tooltip__row">
          <span class="fd-edge-tooltip__key">条件类型：</span>
          {{ edgeTooltip.condType }}
        </div>
        <template v-if="edgeTooltip.conditions?.length">
          <div class="fd-edge-tooltip__row" v-for="(c, i) in edgeTooltip.conditions" :key="i">
            <span class="fd-edge-tooltip__key">{{ i === 0 ? '条件：' : (c.logic === '1' ? '或：' : '且：') }}</span>
            {{ c.varName }} {{ relationLabel(c.relation) }} {{ c.value }}
          </div>
        </template>
        <template v-if="edgeTooltip.routeScript">
          <div class="fd-edge-tooltip__key" style="margin-top:4px;">路由脚本：</div>
          <pre class="fd-edge-tooltip__script">{{ edgeTooltip.routeScript }}</pre>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElButton, ElButtonGroup } from 'element-plus'
import { VueFlow, useVueFlow, Position, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'

const props = defineProps<{
  nodes: any[]
  lines: any[]
}>()

const { fitView, zoomIn, zoomOut } = useVueFlow()
const canvasRef = ref<HTMLElement>()

// ── 布局计算 ──────────────────────────────────────────────────────────────
const NODE_W = 200, NODE_H = 110, X_GAP = 60, Y_GAP = 50

function autoLayout(nodes: any[], lines: any[]) {
  const ids = nodes.map(n => n.nid)

  // 入度 & 出边
  const inCount: Record<string, number>    = {}
  const outEdges: Record<string, string[]> = {}
  ids.forEach(id => { inCount[id] = 0; outEdges[id] = [] })
  lines.forEach(l => {
    if (outEdges[l.source] !== undefined) outEdges[l.source].push(l.target)
    if (inCount[l.target]  !== undefined) inCount[l.target]++
  })

  // Kahn 拓扑层次（处理环路：未访问节点分配最大层+1）
  const level: Record<string, number> = {}
  const queue = ids.filter(id => inCount[id] === 0)
  queue.forEach(id => { level[id] = 0 })

  const visited = new Set<string>()
  const bfsQueue = [...queue]
  while (bfsQueue.length) {
    const id = bfsQueue.shift()!
    if (visited.has(id)) continue
    visited.add(id)
    outEdges[id].forEach(tid => {
      level[tid] = Math.max(level[tid] ?? 0, (level[id] ?? 0) + 1)
      if (!visited.has(tid)) bfsQueue.push(tid)
    })
  }
  // 孤立节点 / 环路节点
  ids.filter(id => level[id] === undefined).forEach((id, i) => {
    const maxL = Math.max(0, ...Object.values(level))
    level[id] = maxL + 1 + i
  })

  // 按层分组
  const byLevel: Record<number, string[]> = {}
  ids.forEach(id => {
    const l = level[id]
    if (!byLevel[l]) byLevel[l] = []
    byLevel[l].push(id)
  })

  // 分配坐标
  const pos: Record<string, { x: number; y: number }> = {}
  Object.entries(byLevel).forEach(([lStr, layerIds]) => {
    const l = Number(lStr)
    const totalW = layerIds.length * NODE_W + (layerIds.length - 1) * X_GAP
    const startX = -totalW / 2
    layerIds.forEach((id, i) => {
      pos[id] = {
        x: startX + i * (NODE_W + X_GAP),
        y: l * (NODE_H + Y_GAP),
      }
    })
  })
  return pos
}

// ── Vue Flow 数据 ─────────────────────────────────────────────────────────
const vfNodes = computed(() => {
  const positions = autoLayout(props.nodes, props.lines)
  return props.nodes.map(n => {
    const type = n.nodeType === 'S' ? 'start' : n.nodeType === 'E' ? 'end' : 'process'
    return {
      id:       n.nid,
      type,
      position: positions[n.nid] ?? { x: 0, y: 0 },
      data:     { ...n, label: n.label || n.nid },
      style:    { width: NODE_W + 'px', minHeight: NODE_H + 'px' },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }
  })
})

const vfEdges = computed(() =>
  props.lines.map(l => ({
    id:         `e-${l.nid}`,
    source:     l.source,
    target:     l.target,
    label:      l.label || '',
    type:       'smoothstep',
    animated:   false,
    markerEnd:  MarkerType.ArrowClosed,
    style:      { stroke: l.customColor || '#409eff', strokeWidth: 2 },
    labelStyle: { fill: '#606266', fontSize: 11 },
    data:       l,
  }))
)

// ── 边 hover tooltip ──────────────────────────────────────────────────────
const edgeTooltip = ref({
  visible: false, x: 0, y: 0,
  label: '', condType: '', conditions: [] as any[], routeScript: '',
})

function onEdgeEnter({ edge, event }: any) {
  const d = edge.data
  const rect = canvasRef.value?.getBoundingClientRect() ?? { left: 0, top: 0 }
  edgeTooltip.value = {
    visible:    true,
    x:          event.clientX - rect.left + 12,
    y:          event.clientY - rect.top  - 10,
    label:      d.label || '',
    condType:   d.isContinueBeanId === '0' ? '无条件' : '条件判断',
    conditions: d.conditions ?? [],
    routeScript: d.routeScriptTxt || '',
  }
}
function onEdgeLeave() {
  edgeTooltip.value.visible = false
}

// ── 翻译工具 ─────────────────────────────────────────────────────────────
function relationLabel(r: string) {
  return ({ '5': '等于', '6': '不等于', '7': '大于', '8': '小于' } as any)[r] ?? r
}
function truncate(s: string, n: number) {
  return s && s.length > n ? s.slice(0, n) + '…' : s
}
</script>

<style>
/* Vue Flow 全局样式覆盖 */
.vue-flow__node { border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,.12); }
</style>

<style scoped>
.fd-wrap    { display:flex; flex-direction:column; height:70vh; }
.fd-toolbar { padding:8px 0 8px 0; flex-shrink:0; }
.fd-canvas  { flex:1; position:relative; border:1px solid #ebeef5; border-radius:6px; overflow:hidden; }

/* 节点样式 */
.vf-node { padding:8px 10px; font-size:12px; min-width:180px; }
.vf-node__title {
  font-weight:600; font-size:13px; text-align:center;
  margin-bottom:4px; color:#303133;
  border-bottom:1px solid rgba(0,0,0,.06); padding-bottom:4px;
}
.vf-node__meta  { color:#606266; margin-top:2px; line-height:1.4; word-break:break-all; }
.vf-node__type-badge {
  display:inline-block; font-size:10px; padding:1px 6px;
  border-radius:10px; margin-top:4px;
}
.vf-node__type-badge.start { background:#f0f9eb; color:#67c23a; border:1px solid #b3e19d; }
.vf-node__type-badge.end   { background:#fef0f0; color:#f56c6c; border:1px solid #fbc4c4; }
.vf-node__badge {
  display:inline-block; font-size:10px; padding:1px 5px;
  border-radius:4px; margin:2px 2px 0 0;
}
.vf-node__badge.auto { background:#ecf5ff; color:#409eff; }
.vf-node__badge.jump { background:#fdf6ec; color:#e6a23c; }

.vf-node--start  { background:#f0f9eb; border:2px solid #67c23a; }
.vf-node--end    { background:#fef0f0; border:2px solid #f56c6c; }
.vf-node--process{ background:#fff;    border:2px solid #409eff; }

/* 路由线 tooltip */
.fd-edge-tooltip {
  position:absolute; z-index:100;
  background:rgba(0,0,0,.82); color:#fff;
  border-radius:6px; padding:8px 12px;
  font-size:12px; max-width:360px;
  pointer-events:none;
  line-height:1.6;
}
.fd-edge-tooltip__title { font-weight:600; margin-bottom:4px; font-size:13px; }
.fd-edge-tooltip__key   { color:#aaa; }
.fd-edge-tooltip__script{
  margin:4px 0 0; padding:4px; background:rgba(255,255,255,.1);
  border-radius:4px; font-size:11px; font-family:monospace;
  white-space:pre-wrap; word-break:break-all; max-height:120px; overflow-y:auto;
}
</style>
