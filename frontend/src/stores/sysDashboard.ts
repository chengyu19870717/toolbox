import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'

export interface DashboardFileKey {
  key: 'users' | 'roles' | 'roleMenus' | 'orgs' | 'hr'
  label: string
  required: boolean
}

export const FILE_DEFS: DashboardFileKey[] = [
  { key: 'users',     label: '用户清单',           required: true },
  { key: 'roles',     label: '角色清单',           required: true },
  { key: 'roleMenus', label: '角色访问菜单清单',    required: true },
  { key: 'orgs',      label: '机构清单',           required: true },
  { key: 'hr',        label: '人力基础数据清单',    required: true },
]

export type DataKey = DashboardFileKey['key']

function parseCsvOrTxt(text: string): Record<string, unknown>[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim())
  if (lines.length < 2) return []
  // 自动检测分隔符：制表符优先，否则逗号
  const sep = lines[0].includes('\t') ? '\t' : ','
  const headers = splitLine(lines[0], sep)
  return lines.slice(1).map(line => {
    const vals = splitLine(line, sep)
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']))
  })
}

// 处理字段内含分隔符的 CSV 引号转义
function splitLine(line: string, sep: string): string[] {
  if (sep !== ',') return line.split(sep).map(s => s.trim())
  const result: string[] = []
  let cur = ''
  let inQuote = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuote && line[i + 1] === '"') { cur += '"'; i++ }
      else inQuote = !inQuote
    } else if (ch === ',' && !inQuote) {
      result.push(cur.trim()); cur = ''
    } else {
      cur += ch
    }
  }
  result.push(cur.trim())
  return result
}

function parseFile(file: File): Promise<Record<string, unknown>[]> {
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (ext === 'csv' || ext === 'txt') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try { resolve(parseCsvOrTxt(e.target!.result as string)) }
        catch (err) { reject(err) }
      }
      reader.onerror = reject
      reader.readAsText(file, 'UTF-8')
    })
  }
  // xlsx / xls
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer)
        const wb = XLSX.read(data, { type: 'array' })
        const sheet = wb.Sheets[wb.SheetNames[0]]
        resolve(XLSX.utils.sheet_to_json(sheet, { defval: '' }))
      } catch (err) { reject(err) }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export const useSysDashboardStore = defineStore('sysDashboard', () => {
  const fileNames = ref<Partial<Record<DataKey, string>>>({})
  const data = ref<Partial<Record<DataKey, Record<string, unknown>[]>>>({})
  const loading = ref<Partial<Record<DataKey, boolean>>>({})

  const allLoaded = computed(() =>
    FILE_DEFS.filter(f => f.required).every(f => !!data.value[f.key])
  )

  async function loadFile(key: DataKey, file: File) {
    loading.value = { ...loading.value, [key]: true }
    try {
      const rows = await parseFile(file)
      data.value = { ...data.value, [key]: rows }
      fileNames.value = { ...fileNames.value, [key]: file.name }
    } finally {
      loading.value = { ...loading.value, [key]: false }
    }
  }

  function clearFile(key: DataKey) {
    const d = { ...data.value }
    const fn = { ...fileNames.value }
    delete d[key]
    delete fn[key]
    data.value = d
    fileNames.value = fn
  }

  function clearAll() {
    data.value = {}
    fileNames.value = {}
    loading.value = {}
  }

  return { fileNames, data, loading, allLoaded, loadFile, clearFile, clearAll }
})
