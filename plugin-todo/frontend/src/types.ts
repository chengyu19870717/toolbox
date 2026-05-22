export type TaskStatus = 'todo' | 'completed'

export interface Stakeholder {
  id: string
  name: string
  role?: string
  remark?: string
  addedAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  parentId?: string
  status: TaskStatus
  isSplit: boolean
  startDate?: string        // YYYY-MM-DD, task is inactive before this date
  targetDate: string        // YYYY-MM-DD
  project?: string
  stakeholders?: Stakeholder[]
  createdAt: string
  updatedAt: string
  completedAt?: string
  originalTargetDate: string
  rolloverCount: number
  sortIndex: number
}

export interface Project {
  id: string
  name: string
  color: string
  sortIndex: number
  createdAt: string
}

export interface GroupMember {
  name: string
  role?: string
  remark?: string
}

export interface StakeholderGroup {
  id: string
  name: string
  members: GroupMember[]
  createdAt: string
}

export interface StakeholderMemory {
  name: string
  lastRole: string
  usedCount: number
}

export interface DailyStat {
  date: string
  created: number
  completed: number
  rollover: number
}

export interface WeeklyReport {
  weekStart: string
  weekEnd: string
  generatedAt: string
  totalCreated: number
  totalCompleted: number
  totalRollover: number
  totalOverdue: number
  completionRate: number
  dailyStats: DailyStat[]
  overdueTasks: Task[]
  projectStats: { name: string; created: number; completed: number }[]
}
