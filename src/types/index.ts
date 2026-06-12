export type FurnitureType =
  | 'desk'
  | 'wardrobe'
  | 'bed'
  | 'window'
  | 'lamp'
  | 'plant'
  | 'rug'
  | 'bookshelf'
  | 'ceiling_lamp'
  | 'sofa'
  | 'chair'
  | 'clock'
  | 'painting'
  | 'mirror'
  | 'cushion'
  | 'candle'
  | 'fishbowl'
  | 'guitar'
  | 'floor_lamp'
  | 'curtain'
  | 'teddy'
  | 'poster'
  | 'shelf'

export type FurnitureColor = {
  id: string
  name: string
  hex: string
}

export type FurnitureItem = {
  type: FurnitureType
  name: string
  icon: string
  price: number
  owned: boolean
  color: string
}

export type WallpaperItem = {
  id: string
  name: string
  icon: string
  price: number
  owned: boolean
  css: string
}

export type FloorItem = {
  id: string
  name: string
  icon: string
  price: number
  owned: boolean
  css: string
}

export type Medal = {
  id: string
  name: string
  description: string
  icon: string
  requiredMinutes: number
  earned: boolean
  earnedAt?: string
}

export type StudyRoom = {
  id: string
  name: string
  description: string
  memberCount: number
  maxMembers: number
  tags: string[]
  isJoined: boolean
  mood?: string
  activeNow?: number
}

export type ForumPost = {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  likes: number
  comments: ForumComment[]
  createdAt: string
  tags: string[]
  views?: number
}

export type ForumComment = {
  id: string
  author: string
  content: string
  createdAt: string
}

export type KnowledgeArticle = {
  id: string
  title: string
  summary: string
  content: string
  category: string
  readTime: number
  cover: string
  liked: boolean
  author?: string
}

export type TimerMode = 'focus' | 'break'

export type TimerSettings = {
  focusMinutes: number
  breakMinutes: number
  longBreakMinutes: number
  sessionsBeforeLongBreak: number
}

export type UserProfile = {
  name: string
  avatar: string
  email: string
  motto: string
  joinDate: string
}

export type AppSettings = {
  notifications: boolean
  studyReminder: boolean
  reminderTime: string
  soundEnabled: boolean
  theme: 'pink' | 'forest' | 'ocean' | 'lavender'
  dailyGoalMinutes: number
  showOnLeaderboard: boolean
  autoStartBreak: boolean
}

export type WeeklyRecord = {
  day: string
  minutes: number
}
