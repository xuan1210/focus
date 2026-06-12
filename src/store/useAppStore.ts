import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  INITIAL_ARTICLES,
  INITIAL_FLOORS,
  INITIAL_FORUM_POSTS,
  INITIAL_FURNITURE,
  INITIAL_MEDALS,
  INITIAL_STUDY_ROOMS,
  INITIAL_WALLPAPERS,
} from '../data/initialData'
import type {
  AppSettings,
  FloorItem,
  ForumPost,
  FurnitureItem,
  FurnitureType,
  KnowledgeArticle,
  Medal,
  StudyRoom,
  TimerMode,
  TimerSettings,
  UserProfile,
  WallpaperItem,
  WeeklyRecord,
} from '../types'

type AppState = {
  isLoggedIn: boolean
  user: UserProfile
  settings: AppSettings
  totalStudyMinutes: number
  points: number
  streak: number
  lastStudyDate: string
  medals: Medal[]
  furniture: FurnitureItem[]
  wallpapers: WallpaperItem[]
  floors: FloorItem[]
  activeWallpaperId: string
  activeFloorId: string
  studyRooms: StudyRoom[]
  forumPosts: ForumPost[]
  articles: KnowledgeArticle[]
  timerSettings: TimerSettings
  timerMode: TimerMode
  timerSecondsLeft: number
  timerRunning: boolean
  todayMinutes: number
  sessionsCompleted: number
  weeklyRecords: WeeklyRecord[]
  postsCreated: number
  articlesRead: string[]
  readArticle: (id: string) => void

  login: (name: string, email: string, avatar: string) => void
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  updateSettings: (updates: Partial<AppSettings>) => void
  addStudyMinutes: (minutes: number) => void
  checkMedals: () => void
  buyFurniture: (type: FurnitureType) => boolean
  setFurnitureColor: (type: FurnitureType, color: string) => void
  buyWallpaper: (id: string) => boolean
  setActiveWallpaper: (id: string) => void
  buyFloor: (id: string) => boolean
  setActiveFloor: (id: string) => void
  joinRoom: (id: string) => void
  leaveRoom: (id: string) => void
  createRoom: (name: string, description: string, tags: string[]) => void
  likePost: (id: string) => void
  addComment: (postId: string, author: string, content: string) => void
  createPost: (author: string, avatar: string, title: string, content: string, tags: string[]) => void
  toggleArticleLike: (id: string) => void
  setTimerSettings: (settings: Partial<TimerSettings>) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  tickTimer: () => void
  completeTimerSession: () => void
}

const DAY_LABELS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function getDefaultWeekly(): WeeklyRecord[] {
  return DAY_LABELS.map((day) => ({ day, minutes: 0 }))
}

function updateWeeklyRecords(records: WeeklyRecord[], minutes: number): WeeklyRecord[] {
  const todayIdx = new Date().getDay()
  return records.map((r, i) =>
    i === todayIdx ? { ...r, minutes: r.minutes + minutes } : r
  )
}

function checkSpecialMedals(
  medals: Medal[],
  hour: number,
  streak: number,
  furniture: FurnitureItem[],
  postsCreated: number,
  articlesRead: string[]
): Medal[] {
  return medals.map((m) => {
    if (m.earned) return m
    if (m.id === 'm6' && streak >= 7) return { ...m, earned: true, earnedAt: getToday() }
    if (m.id === 'm7' && hour >= 22) return { ...m, earned: true, earnedAt: getToday() }
    if (m.id === 'm8' && hour < 7) return { ...m, earned: true, earnedAt: getToday() }
    if (m.id === 'm10' && furniture.every((f) => f.owned)) return { ...m, earned: true, earnedAt: getToday() }
    if (m.id === 'm11' && postsCreated >= 3) return { ...m, earned: true, earnedAt: getToday() }
    if (m.id === 'm12' && articlesRead.length >= 5) return { ...m, earned: true, earnedAt: getToday() }
    return m
  })
}

const DEFAULT_SETTINGS: AppSettings = {
  notifications: true,
  studyReminder: true,
  reminderTime: '09:00',
  soundEnabled: true,
  theme: 'pink',
  dailyGoalMinutes: 120,
  showOnLeaderboard: true,
  autoStartBreak: false,
}

function mergeFurniture(existing: FurnitureItem[] | undefined): FurnitureItem[] {
  if (!existing?.length) return INITIAL_FURNITURE
  const map = new Map(existing.map((f) => [f.type, f]))
  return INITIAL_FURNITURE.map((item) => {
    const saved = map.get(item.type)
    return saved ? { ...item, owned: saved.owned, color: saved.color } : item
  })
}

function mergeDecorItems<T extends { id: string; owned: boolean }>(
  initial: T[],
  existing: T[] | undefined
): T[] {
  if (!existing?.length) return initial
  const map = new Map(existing.map((item) => [item.id, item]))
  return initial.map((item) => {
    const saved = map.get(item.id)
    return saved ? { ...item, owned: saved.owned } : item
  })
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: { name: '', avatar: '🐱', email: '', motto: '每天进步一点点', joinDate: '' },
      settings: DEFAULT_SETTINGS,
      totalStudyMinutes: 0,
      points: 20,
      streak: 0,
      lastStudyDate: '',
      medals: INITIAL_MEDALS,
      furniture: INITIAL_FURNITURE,
      wallpapers: INITIAL_WALLPAPERS,
      floors: INITIAL_FLOORS,
      activeWallpaperId: 'wp1',
      activeFloorId: 'fl1',
      studyRooms: INITIAL_STUDY_ROOMS,
      forumPosts: INITIAL_FORUM_POSTS,
      articles: INITIAL_ARTICLES,
      timerSettings: { focusMinutes: 25, breakMinutes: 5, longBreakMinutes: 15, sessionsBeforeLongBreak: 4 },
      timerMode: 'focus',
      timerSecondsLeft: 25 * 60,
      timerRunning: false,
      todayMinutes: 0,
      sessionsCompleted: 0,
      weeklyRecords: getDefaultWeekly(),
      postsCreated: 0,
      articlesRead: [],

      login: (name, email, avatar) => {
        set({
          isLoggedIn: true,
          user: {
            name,
            email,
            avatar,
            motto: '每天进步一点点',
            joinDate: getToday(),
          },
        })
      },

      logout: () => set({ isLoggedIn: false }),

      updateProfile: (updates) => {
        set((s) => ({ user: { ...s.user, ...updates } }))
      },

      updateSettings: (updates) => {
        set((s) => ({ settings: { ...s.settings, ...updates } }))
      },

      readArticle: (id) => {
        const { articlesRead } = get()
        if (!articlesRead.includes(id)) {
          set({ articlesRead: [...articlesRead, id] })
          get().checkMedals()
        }
      },

      addStudyMinutes: (minutes) => {
        const today = getToday()
        const { lastStudyDate, streak, weeklyRecords } = get()
        let newStreak = streak
        if (lastStudyDate !== today) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]
          newStreak = lastStudyDate === yesterdayStr ? streak + 1 : 1
        }
        const earnedPoints = minutes * 2
        set((s) => ({
          totalStudyMinutes: s.totalStudyMinutes + minutes,
          todayMinutes: s.lastStudyDate === today ? s.todayMinutes + minutes : minutes,
          points: s.points + earnedPoints,
          streak: newStreak,
          lastStudyDate: today,
          sessionsCompleted: s.sessionsCompleted + 1,
          weeklyRecords: updateWeeklyRecords(weeklyRecords, minutes),
        }))
        get().checkMedals()
      },

      checkMedals: () => {
        const { totalStudyMinutes, medals, streak, furniture, postsCreated, articlesRead } = get()
        const hour = new Date().getHours()
        let updated = medals.map((m) => {
          if (m.earned || m.requiredMinutes === 0) return m
          if (totalStudyMinutes >= m.requiredMinutes) {
            return { ...m, earned: true, earnedAt: getToday() }
          }
          return m
        })
        updated = checkSpecialMedals(updated, hour, streak, furniture, postsCreated, articlesRead)
        set({ medals: updated })
      },

      buyFurniture: (type) => {
        const { furniture, points } = get()
        const item = furniture.find((f) => f.type === type)
        if (!item || item.owned || points < item.price) return false
        const newFurniture = furniture.map((f) =>
          f.type === type ? { ...f, owned: true } : f
        )
        set({ points: points - item.price, furniture: newFurniture })
        get().checkMedals()
        return true
      },

      setFurnitureColor: (type, color) => {
        set((s) => ({
          furniture: s.furniture.map((f) =>
            f.type === type ? { ...f, color } : f
          ),
        }))
      },

      buyWallpaper: (id) => {
        const { wallpapers, points } = get()
        const item = wallpapers.find((w) => w.id === id)
        if (!item || item.owned || points < item.price) return false
        const newWallpapers = wallpapers.map((w) =>
          w.id === id ? { ...w, owned: true } : w
        )
        set({ points: points - item.price, wallpapers: newWallpapers, activeWallpaperId: id })
        return true
      },

      setActiveWallpaper: (id) => {
        const item = get().wallpapers.find((w) => w.id === id)
        if (!item?.owned) return
        set({ activeWallpaperId: id })
      },

      buyFloor: (id) => {
        const { floors, points } = get()
        const item = floors.find((f) => f.id === id)
        if (!item || item.owned || points < item.price) return false
        const newFloors = floors.map((f) =>
          f.id === id ? { ...f, owned: true } : f
        )
        set({ points: points - item.price, floors: newFloors, activeFloorId: id })
        return true
      },

      setActiveFloor: (id) => {
        const item = get().floors.find((f) => f.id === id)
        if (!item?.owned) return
        set({ activeFloorId: id })
      },

      joinRoom: (id) => {
        set((s) => ({
          studyRooms: s.studyRooms.map((r) =>
            r.id === id && r.memberCount < r.maxMembers
              ? { ...r, isJoined: true, memberCount: r.memberCount + 1 }
              : r
          ),
        }))
      },

      leaveRoom: (id) => {
        set((s) => ({
          studyRooms: s.studyRooms.map((r) =>
            r.id === id && r.isJoined
              ? { ...r, isJoined: false, memberCount: Math.max(0, r.memberCount - 1) }
              : r
          ),
        }))
      },

      createRoom: (name, description, tags) => {
        const newRoom: StudyRoom = {
          id: `r-${Date.now()}`,
          name,
          description,
          memberCount: 1,
          maxMembers: 30,
          tags,
          isJoined: true,
          mood: '✨ 新建',
          activeNow: 1,
        }
        set((s) => ({ studyRooms: [newRoom, ...s.studyRooms] }))
      },

      likePost: (id) => {
        set((s) => ({
          forumPosts: s.forumPosts.map((p) =>
            p.id === id ? { ...p, likes: p.likes + 1 } : p
          ),
        }))
      },

      addComment: (postId, author, content) => {
        set((s) => ({
          forumPosts: s.forumPosts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  comments: [
                    ...p.comments,
                    { id: `c-${Date.now()}`, author, content, createdAt: getToday() },
                  ],
                }
              : p
          ),
        }))
      },

      createPost: (author, avatar, title, content, tags) => {
        const post: ForumPost = {
          id: `p-${Date.now()}`,
          author,
          avatar,
          title,
          content,
          likes: 0,
          views: 0,
          comments: [],
          createdAt: getToday(),
          tags,
        }
        set((s) => ({
          forumPosts: [post, ...s.forumPosts],
          postsCreated: s.postsCreated + 1,
        }))
        get().checkMedals()
      },

      toggleArticleLike: (id) => {
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === id ? { ...a, liked: !a.liked } : a
          ),
        }))
      },

      setTimerSettings: (settings) => {
        const merged = { ...get().timerSettings, ...settings }
        set({
          timerSettings: merged,
          timerSecondsLeft: merged.focusMinutes * 60,
          timerMode: 'focus',
          timerRunning: false,
        })
      },

      startTimer: () => set({ timerRunning: true }),
      pauseTimer: () => set({ timerRunning: false }),

      resetTimer: () => {
        const { timerSettings, timerMode } = get()
        const seconds =
          timerMode === 'focus'
            ? timerSettings.focusMinutes * 60
            : timerSettings.breakMinutes * 60
        set({ timerSecondsLeft: seconds, timerRunning: false })
      },

      tickTimer: () => {
        const { timerSecondsLeft, timerRunning } = get()
        if (!timerRunning || timerSecondsLeft <= 0) return
        set({ timerSecondsLeft: timerSecondsLeft - 1 })
        if (timerSecondsLeft - 1 <= 0) {
          get().completeTimerSession()
        }
      },

      completeTimerSession: () => {
        const { timerMode, timerSettings, sessionsCompleted } = get()
        if (timerMode === 'focus') {
          get().addStudyMinutes(timerSettings.focusMinutes)
          const nextSessions = sessionsCompleted + 1
          const isLongBreak =
            nextSessions % timerSettings.sessionsBeforeLongBreak === 0
          set({
            timerMode: 'break',
            timerSecondsLeft: isLongBreak
              ? timerSettings.longBreakMinutes * 60
              : timerSettings.breakMinutes * 60,
            timerRunning: get().settings.autoStartBreak,
          })
        } else {
          set({
            timerMode: 'focus',
            timerSecondsLeft: timerSettings.focusMinutes * 60,
            timerRunning: false,
          })
        }
      },
    }),
    {
      name: 'focus-app-storage',
      version: 3,
      migrate: (persisted, version) => {
        const s = persisted as Partial<AppState>
        if (version < 2) {
          return {
            ...s,
            isLoggedIn: s.isLoggedIn ?? false,
            user: { name: '', avatar: '🐱', email: '', motto: '每天进步一点点', joinDate: '', ...s.user },
            settings: { ...DEFAULT_SETTINGS, ...s.settings, theme: ((s.settings?.theme as string) === 'warm' ? 'pink' : s.settings?.theme) ?? 'pink' },
            weeklyRecords: s.weeklyRecords ?? getDefaultWeekly(),
            postsCreated: s.postsCreated ?? 0,
            articlesRead: s.articlesRead ?? [],
            timerSettings: {
              focusMinutes: 25,
              breakMinutes: 5,
              longBreakMinutes: 15,
              sessionsBeforeLongBreak: 4,
              ...s.timerSettings,
            },
          }
        }
        if (version < 3) {
          const settings = { ...DEFAULT_SETTINGS, ...s.settings }
          if ((settings.theme as string) === 'warm') settings.theme = 'pink'
          return {
            ...s,
            settings,
            furniture: mergeFurniture(s.furniture),
            wallpapers: mergeDecorItems(INITIAL_WALLPAPERS, s.wallpapers),
            floors: mergeDecorItems(INITIAL_FLOORS, s.floors),
            activeWallpaperId: s.activeWallpaperId ?? 'wp1',
            activeFloorId: s.activeFloorId ?? 'fl1',
          }
        }
        return persisted as AppState
      },
    }
  )
)
