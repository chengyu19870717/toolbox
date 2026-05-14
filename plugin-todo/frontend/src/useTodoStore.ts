import { ref, computed } from 'vue'
import type { Task, Project, StakeholderMemory, WeeklyReport, DailyStat } from './types'

// ── storage keys ──────────────────────────────────────────────────────────────
const KEYS = {
  tasks: 'todo_tasks',
  projects: 'todo_projects',
  settings: 'todo_settings',
  memory: 'todo_stakeholder_memory',
  reports: 'todo_weekly_reports',
}

// ── helpers ───────────────────────────────────────────────────────────────────
export function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function nowIso(): string {
  return new Date().toISOString()
}

export function uuid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data))
}

// ── date utilities ────────────────────────────────────────────────────────────
export function dateOffset(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${parseInt(m)}/${parseInt(d)}`
}

export function diffDays(a: string, b: string): number {
  return Math.round((new Date(a).getTime() - new Date(b).getTime()) / 86400000)
}

export function mondayOf(dateStr: string): string {
  const d = new Date(dateStr)
  const day = d.getDay() || 7
  d.setDate(d.getDate() - day + 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function sundayOf(mondayStr: string): string {
  const d = new Date(mondayStr)
  d.setDate(d.getDate() + 6)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Parse quick input syntax: title 📅5/15 #project */
export function parseQuickInput(input: string, defaultDate: string): { title: string; targetDate: string; project: string } {
  let title = input.trim()
  let targetDate = defaultDate
  let project = ''

  // parse #project
  const projMatch = title.match(/#(\S+)/)
  if (projMatch) {
    project = projMatch[1]
    title = title.replace(projMatch[0], '').trim()
  }

  // parse 📅 date
  const dateMatch = title.match(/📅([^\s#]+)/)
  if (dateMatch) {
    const raw = dateMatch[1]
    title = title.replace(dateMatch[0], '').trim()
    const today = new Date()
    const y = today.getFullYear()

    if (/^\d{1,2}\/\d{1,2}$/.test(raw) || /^\d{1,2}-\d{1,2}$/.test(raw)) {
      const [m, d] = raw.split(/[\/\-]/).map(Number)
      targetDate = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    } else if (/^\+\d+$/.test(raw)) {
      targetDate = dateOffset(parseInt(raw.slice(1)))
    } else if (/^-\d+$/.test(raw)) {
      targetDate = dateOffset(-parseInt(raw.slice(1)))
    } else if (raw === '今天') {
      targetDate = todayStr()
    } else if (raw === '明天') {
      targetDate = dateOffset(1)
    } else if (raw === '后天') {
      targetDate = dateOffset(2)
    } else if (/^周[一二三四五六日天]$/.test(raw)) {
      const weekDays: Record<string, number> = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 日: 0, 天: 0 }
      const target = weekDays[raw[1]]
      const cur = today.getDay()
      let diff = target - cur
      if (diff <= 0) diff += 7
      targetDate = dateOffset(diff)
    } else if (/^下周[一二三四五六日天]$/.test(raw)) {
      const weekDays: Record<string, number> = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 日: 0, 天: 0 }
      const target = weekDays[raw[2]]
      const cur = today.getDay()
      let diff = target - cur + 7
      if (diff <= 7) diff += 7
      targetDate = dateOffset(diff)
    }
  }

  return { title, targetDate, project }
}

// ── store ─────────────────────────────────────────────────────────────────────
export function useTodoStore() {
  const tasks = ref<Task[]>(load(KEYS.tasks, []))
  const projects = ref<Project[]>(load(KEYS.projects, []))
  const memory = ref<StakeholderMemory[]>(load(KEYS.memory, []))

  function persistTasks() { save(KEYS.tasks, tasks.value) }
  function persistProjects() { save(KEYS.projects, projects.value) }
  function persistMemory() { save(KEYS.memory, memory.value) }

  // ── rollover ──────────────────────────────────────────────────────────────
  function checkRollover() {
    const today = todayStr()
    let changed = false
    const now = nowIso()

    tasks.value
      .filter(t => t.status === 'todo' && !t.parentId && t.targetDate < today)
      .forEach(task => {
        task.targetDate = today
        task.rolloverCount += 1
        task.updatedAt = now
        changed = true

        if (task.isSplit) {
          tasks.value
            .filter(c => c.parentId === task.id && c.status === 'todo')
            .forEach(child => {
              child.targetDate = today
              child.updatedAt = now
            })
        }
      })

    if (changed) persistTasks()
  }

  // ── task CRUD ─────────────────────────────────────────────────────────────
  function createTask(partial: Partial<Task> & { title: string }): Task {
    const today = todayStr()
    const now = nowIso()
    const task: Task = {
      id: uuid(),
      title: partial.title,
      description: partial.description,
      parentId: partial.parentId,
      status: 'todo',
      isSplit: false,
      targetDate: partial.targetDate ?? today,
      project: partial.project,
      stakeholders: partial.stakeholders ?? [],
      createdAt: now,
      updatedAt: now,
      originalTargetDate: partial.targetDate ?? today,
      rolloverCount: 0,
      sortIndex: partial.sortIndex ?? Date.now(),
    }
    tasks.value.push(task)
    persistTasks()
    return task
  }

  function updateTask(id: string, patch: Partial<Task>) {
    const t = tasks.value.find(x => x.id === id)
    if (!t) return
    Object.assign(t, patch, { updatedAt: nowIso() })
    persistTasks()
  }

  function deleteTask(id: string) {
    // delete task and its children
    const ids = new Set([id, ...tasks.value.filter(t => t.parentId === id).map(t => t.id)])
    tasks.value = tasks.value.filter(t => !ids.has(t.id))

    // if parent, clear isSplit
    const parent = tasks.value.find(t => t.id === tasks.value.find(x => x.id === id)?.parentId)
    if (parent) _syncParentStatus(parent.id)

    persistTasks()
  }

  function completeTask(id: string) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return
    const now = nowIso()

    if (task.isSplit) {
      // complete all children first
      tasks.value.filter(t => t.parentId === id).forEach(c => {
        if (c.status === 'todo') {
          c.status = 'completed'
          c.completedAt = now
          c.updatedAt = now
        }
      })
    }

    task.status = 'completed'
    task.completedAt = now
    task.updatedAt = now
    persistTasks()
  }

  function uncompleteTask(id: string) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return
    const today = todayStr()
    const now = nowIso()

    task.status = 'todo'
    task.completedAt = undefined
    task.updatedAt = now
    // reset targetDate to today if it was in the past
    if (task.targetDate < today) {
      task.targetDate = today
    }

    // if this was auto-completed parent, uncheck parent too
    if (task.parentId) {
      const parent = tasks.value.find(t => t.id === task.parentId)
      if (parent && parent.status === 'completed') {
        parent.status = 'todo'
        parent.completedAt = undefined
        parent.updatedAt = now
        if (parent.targetDate < today) parent.targetDate = today
      }
    }

    persistTasks()
  }

  function completeSubTask(childId: string) {
    const child = tasks.value.find(t => t.id === childId)
    if (!child) return
    const now = nowIso()
    child.status = 'completed'
    child.completedAt = now
    child.updatedAt = now

    if (child.parentId) _syncParentStatus(child.parentId)
    persistTasks()
  }

  function uncompleteSubTask(childId: string) {
    uncompleteTask(childId)
  }

  function _syncParentStatus(parentId: string) {
    const parent = tasks.value.find(t => t.id === parentId)
    if (!parent) return
    const children = tasks.value.filter(t => t.parentId === parentId)
    if (children.length === 0) return

    const now = nowIso()
    const allDone = children.every(c => c.status === 'completed')
    if (allDone && parent.status === 'todo') {
      parent.status = 'completed'
      parent.completedAt = now
      parent.updatedAt = now
    } else if (!allDone && parent.status === 'completed') {
      parent.status = 'todo'
      parent.completedAt = undefined
      parent.updatedAt = now
    }
  }

  // ── split ─────────────────────────────────────────────────────────────────
  function splitTask(parentId: string, childTitles: string[]) {
    const parent = tasks.value.find(t => t.id === parentId)
    if (!parent || parent.parentId) return // no nested split

    const now = nowIso()
    childTitles.filter(t => t.trim()).forEach((title, i) => {
      const child: Task = {
        id: uuid(),
        title: title.trim(),
        parentId,
        status: 'todo',
        isSplit: false,
        targetDate: parent.targetDate,
        project: parent.project,
        stakeholders: parent.stakeholders ? JSON.parse(JSON.stringify(parent.stakeholders)) : [],
        createdAt: now,
        updatedAt: now,
        originalTargetDate: parent.targetDate,
        rolloverCount: 0,
        sortIndex: Date.now() + i,
      }
      tasks.value.push(child)
    })

    parent.isSplit = true
    parent.updatedAt = now
    persistTasks()
  }

  function unsplitTask(parentId: string) {
    const parent = tasks.value.find(t => t.id === parentId)
    if (!parent) return
    const children = tasks.value.filter(t => t.parentId === parentId)
    const now = nowIso()

    // promote children to independent tasks
    children.forEach(c => {
      c.parentId = undefined
      c.updatedAt = now
    })

    parent.isSplit = false
    parent.updatedAt = now
    persistTasks()
  }

  // ── project CRUD ──────────────────────────────────────────────────────────
  function addProject(name: string, color: string = '#4A90D9'): Project {
    const existing = projects.value.find(p => p.name === name)
    if (existing) return existing

    const p: Project = {
      id: uuid(),
      name,
      color,
      sortIndex: projects.value.length,
      createdAt: nowIso(),
    }
    projects.value.push(p)
    persistProjects()
    return p
  }

  function deleteProject(id: string) {
    projects.value = projects.value.filter(p => p.id !== id)
    persistProjects()
  }

  // extract unique project names from tasks
  const allProjectNames = computed(() => {
    const fromTasks = tasks.value.map(t => t.project).filter(Boolean) as string[]
    const fromProjects = projects.value.map(p => p.name)
    return [...new Set([...fromProjects, ...fromTasks])].sort()
  })

  // ── memory ─────────────────────────────────────────────────────────────────
  function rememberStakeholder(name: string, role: string) {
    const existing = memory.value.find(m => m.name === name)
    if (existing) {
      existing.lastRole = role
      existing.usedCount += 1
    } else {
      memory.value.push({ name, lastRole: role, usedCount: 1 })
    }
    persistMemory()
  }

  // ── queries ───────────────────────────────────────────────────────────────
  function getTasksForDate(date: string): Task[] {
    // top-level tasks for this date (todo + completed on this date)
    return tasks.value
      .filter(t => !t.parentId && t.targetDate === date)
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === 'todo' ? -1 : 1
        return a.sortIndex - b.sortIndex
      })
  }

  function getTasksForDateWithCompleted(date: string): Task[] {
    // For history view: show todo tasks targeting this date + tasks completed on this date
    const targetingDate = tasks.value.filter(t => !t.parentId && t.targetDate === date)
    const completedOnDate = tasks.value.filter(t =>
      !t.parentId &&
      t.status === 'completed' &&
      t.completedAt?.startsWith(date) &&
      t.targetDate !== date
    )
    const all = [...new Set([...targetingDate, ...completedOnDate])]
    return all.sort((a, b) => {
      if (a.status !== b.status) return a.status === 'todo' ? -1 : 1
      return a.sortIndex - b.sortIndex
    })
  }

  function getChildren(parentId: string): Task[] {
    return tasks.value
      .filter(t => t.parentId === parentId)
      .sort((a, b) => a.sortIndex - b.sortIndex)
  }

  function getAllPending(): Task[] {
    return tasks.value
      .filter(t => !t.parentId && t.status === 'todo')
      .sort((a, b) => a.targetDate < b.targetDate ? -1 : a.targetDate > b.targetDate ? 1 : a.sortIndex - b.sortIndex)
  }

  function searchTasks(query: string): Task[] {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return tasks.value
      .filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.description?.toLowerCase().includes(q))
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }

  function getTasksByProject(projectName: string): Task[] {
    return tasks.value
      .filter(t => !t.parentId && t.project === projectName)
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === 'todo' ? -1 : 1
        return a.targetDate.localeCompare(b.targetDate)
      })
  }

  // ── weekly report ─────────────────────────────────────────────────────────
  function generateWeeklyReport(weekStart: string): WeeklyReport {
    const weekEnd = sundayOf(weekStart)
    const now = nowIso()

    // tasks created this week
    const created = tasks.value.filter(t =>
      !t.parentId && t.createdAt >= weekStart && t.createdAt <= weekEnd + 'T23:59:59'
    )
    // tasks completed this week
    const completed = tasks.value.filter(t =>
      !t.parentId && t.status === 'completed' && t.completedAt &&
      t.completedAt >= weekStart && t.completedAt <= weekEnd + 'T23:59:59'
    )
    // tasks rolled over this week
    const rolledThisWeek = tasks.value.filter(t =>
      !t.parentId && t.rolloverCount > 0 &&
      t.originalTargetDate >= weekStart && t.originalTargetDate <= weekEnd
    )
    // overdue = todo with targetDate < today
    const today = todayStr()
    const overdue = tasks.value.filter(t =>
      !t.parentId && t.status === 'todo' && t.targetDate < today
    )

    const completionRate = created.length > 0
      ? Math.round((completed.filter(c => created.some(cr => cr.id === c.id)).length / created.length) * 1000) / 10
      : 0

    // daily stats
    const dailyStats: DailyStat[] = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart)
      d.setDate(d.getDate() + i)
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      dailyStats.push({
        date: ds,
        created: tasks.value.filter(t => !t.parentId && t.createdAt.startsWith(ds)).length,
        completed: tasks.value.filter(t => !t.parentId && t.status === 'completed' && t.completedAt?.startsWith(ds)).length,
        rollover: tasks.value.filter(t => !t.parentId && t.status === 'todo' && t.originalTargetDate === ds && t.rolloverCount > 0).length,
      })
    }

    // project stats
    const projectMap = new Map<string, { created: number; completed: number }>()
    created.forEach(t => {
      const name = t.project || '未分类'
      const s = projectMap.get(name) ?? { created: 0, completed: 0 }
      s.created++
      projectMap.set(name, s)
    })
    completed.forEach(t => {
      const name = t.project || '未分类'
      const s = projectMap.get(name) ?? { created: 0, completed: 0 }
      s.completed++
      projectMap.set(name, s)
    })
    const projectStats = [...projectMap.entries()].map(([name, s]) => ({ name, ...s }))

    return {
      weekStart,
      weekEnd,
      generatedAt: now,
      totalCreated: created.length,
      totalCompleted: completed.length,
      totalRollover: rolledThisWeek.length,
      totalOverdue: overdue.length,
      completionRate,
      dailyStats,
      overdueTasks: overdue,
      projectStats,
    }
  }

  // ── import/export ─────────────────────────────────────────────────────────
  function exportJson(): string {
    return JSON.stringify({
      exportVersion: '3.0',
      exportedAt: nowIso(),
      tasks: tasks.value,
      projects: projects.value,
    }, null, 2)
  }

  function importJson(json: string, mode: 'merge' | 'overwrite'): { imported: number; skipped: number } {
    const data = JSON.parse(json)
    if (!data.tasks || !Array.isArray(data.tasks)) throw new Error('无效的备份文件：缺少 tasks 数组')

    // validate
    for (const t of data.tasks) {
      if (!t.id || !t.title || !t.targetDate) throw new Error(`任务数据不完整: ${JSON.stringify(t).slice(0, 100)}`)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(t.targetDate)) throw new Error(`日期格式错误: ${t.targetDate}`)
    }

    let imported = 0, skipped = 0

    if (mode === 'overwrite') {
      tasks.value = data.tasks
      projects.value = data.projects ?? []
      imported = data.tasks.length
    } else {
      const existingIds = new Set(tasks.value.map(t => t.id))
      for (const t of data.tasks) {
        if (existingIds.has(t.id)) { skipped++; continue }
        tasks.value.push(t)
        imported++
      }
      for (const p of (data.projects ?? [])) {
        if (!projects.value.find(x => x.id === p.id)) projects.value.push(p)
      }
    }

    persistTasks()
    persistProjects()
    return { imported, skipped }
  }

  return {
    tasks,
    projects,
    memory,
    allProjectNames,
    checkRollover,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    uncompleteTask,
    completeSubTask,
    uncompleteSubTask,
    splitTask,
    unsplitTask,
    addProject,
    deleteProject,
    rememberStakeholder,
    getTasksForDate,
    getTasksForDateWithCompleted,
    getChildren,
    getAllPending,
    searchTasks,
    getTasksByProject,
    generateWeeklyReport,
    exportJson,
    importJson,
  }
}
