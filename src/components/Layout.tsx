import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BookOpen, Clock, Home, MessageSquare, Settings, Users } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const navItems = [
  { to: '/', icon: Home, label: '主页' },
  { to: '/timer', icon: Clock, label: '计时' },
  { to: '/study-room', icon: Users, label: '自习室' },
  { to: '/forum', icon: MessageSquare, label: '论坛' },
  { to: '/knowledge', icon: BookOpen, label: '科普' },
  { to: '/settings', icon: Settings, label: '设置' },
]

export default function Layout() {
  const points = useAppStore((s) => s.points)
  const user = useAppStore((s) => s.user)
  const settings = useAppStore((s) => s.settings)
  const timerRunning = useAppStore((s) => s.timerRunning)

  useEffect(() => {
    document.body.className = settings.theme === 'pink' ? '' : `theme-${settings.theme}`
  }, [settings.theme])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#db2777] to-[#f472b6] flex items-center justify-center shadow-md">
              <span className="text-lg">🌸</span>
            </div>
            <div>
              <h1 className="text-base font-bold gradient-text leading-tight">专注小屋</h1>
              {timerRunning && (
                <p className="text-[10px] text-[#f472b6] animate-pulse">⏱ 专注中...</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-[#fbcfe8]/60 shadow-sm">
              <span className="text-xs">✨</span>
              <span className="text-xs font-bold text-[#db2777]">{points}</span>
            </div>
            <NavLink
              to="/settings"
              className="w-8 h-8 rounded-full bg-[#fce7f3] flex items-center justify-center text-lg hover:ring-2 hover:ring-[#f472b6]/50 transition-all"
            >
              {user.avatar}
            </NavLink>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-5 pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-t border-white/50 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto flex justify-around py-1.5 px-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#db2777] bg-gradient-to-t from-[#fce7f3] to-transparent scale-105'
                    : 'text-[#f9a8d4] hover:text-[#db2777]'
                }`
              }
            >
              <Icon size={20} strokeWidth={2} />
              <span className="text-[10px] font-semibold">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
