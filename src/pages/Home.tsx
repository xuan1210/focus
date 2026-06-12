import { Link } from 'react-router-dom'
import { BookOpen, Clock, Flame, MessageSquare, Settings, Sparkles, Target, Trophy, Users } from 'lucide-react'
import MedalCard from '../components/MedalCard'
import { useAppStore } from '../store/useAppStore'

export default function Home() {
  const {
    user,
    totalStudyMinutes,
    todayMinutes,
    points,
    streak,
    sessionsCompleted,
    medals,
    furniture,
    weeklyRecords,
    settings,
    studyRooms,
  } = useAppStore()

  const earnedMedals = medals.filter((m) => m.earned)
  const ownedFurniture = furniture.filter((f) => f.owned).length
  const joinedRooms = studyRooms.filter((r) => r.isJoined).length
  const goalProgress = Math.min(100, (todayMinutes / settings.dailyGoalMinutes) * 100)
  const maxWeekly = Math.max(...weeklyRecords.map((r) => r.minutes), 1)

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return h > 0 ? `${h}小时${m}分` : `${m}分钟`
  }

  const quickLinks = [
    { to: '/timer', icon: Clock, label: '开始计时', desc: '番茄钟专注学习', color: '#db2777', emoji: '⏱️' },
    { to: '/study-room', icon: Users, label: '自习室', desc: `${joinedRooms} 间已加入`, color: '#95d5b2', emoji: '👥' },
    { to: '/forum', icon: MessageSquare, label: '学习论坛', desc: '交流分享心得', color: '#a8c5d9', emoji: '💬' },
    { to: '/knowledge', icon: BookOpen, label: '知识科普', desc: '10 篇精选文章', color: '#b8a9c9', emoji: '📚' },
    { to: '/settings', icon: Settings, label: '我的小屋', desc: `${ownedFurniture} 件家具`, color: '#e8a87c', emoji: '🏠' },
  ]

  return (
    <div className="space-y-6 page-enter">
      {/* 欢迎横幅 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#db2777] via-[#ec4899] to-[#f472b6] p-6 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-4 right-4 text-4xl opacity-20 animate-drift">{user.avatar}</div>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-0.5">你好，{user.name} 👋</h2>
          <p className="text-white/70 text-sm mb-4 italic">"{user.motto}"</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <p className="text-xs text-white/60">今日学习</p>
              <p className="text-xl font-bold">{formatTime(todayMinutes)}</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <p className="text-xs text-white/60">累计学习</p>
              <p className="text-xl font-bold">{formatTime(totalStudyMinutes)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 每日目标 */}
      <section className="glass-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-[#8b6914]" />
            <span className="font-semibold text-sm">今日目标</span>
          </div>
          <span className="text-xs text-[#8b7d6b]">
            {todayMinutes}/{settings.dailyGoalMinutes} 分钟
          </span>
        </div>
        <div className="h-3 bg-[#f5ebe0] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#8b6914] to-[#c4a35a] transition-all duration-700"
            style={{ width: `${goalProgress}%` }}
          />
        </div>
        {goalProgress >= 100 && (
          <p className="text-xs text-[#c4a35a] mt-2 font-medium">🎉 恭喜完成今日目标！</p>
        )}
      </section>

      {/* 统计卡片 */}
      <section className="grid grid-cols-3 gap-3">
        {[
          { icon: Flame, label: '连续天数', value: `${streak}天`, color: '#e8a87c', bg: '#fff8f0' },
          { icon: Sparkles, label: '积分', value: `${points}`, color: '#95d5b2', bg: '#f0faf4' },
          { icon: Trophy, label: '番茄钟', value: `${sessionsCompleted}`, color: '#a8c5d9', bg: '#f0f5fa' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl p-3.5 border border-[#e8dfd0]/50 shadow-sm text-center"
            style={{ backgroundColor: bg }}
          >
            <Icon size={18} style={{ color }} className="mx-auto mb-1" />
            <p className="text-lg font-bold text-[#3d3428]">{value}</p>
            <p className="text-[10px] text-[#8b7d6b]">{label}</p>
          </div>
        ))}
      </section>

      {/* 本周学习 */}
      <section className="glass-card rounded-2xl p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#3d3428] mb-3">本周学习</h3>
        <div className="flex items-end justify-between gap-1.5 h-24">
          {weeklyRecords.map((r, i) => (
            <div key={r.day} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#c4a35a] to-[#e8a87c] bar-chart-bar min-h-[4px]"
                style={{
                  height: `${Math.max(4, (r.minutes / maxWeekly) * 100)}%`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
              <span className="text-[10px] text-[#8b7d6b]">{r.day.slice(1)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 快捷入口 */}
      <section>
        <h3 className="text-sm font-bold text-[#3d3428] mb-3">快捷入口</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {quickLinks.map(({ to, label, desc, color, emoji }) => (
            <Link
              key={to}
              to={to}
              className="glass-card rounded-2xl p-3.5 flex items-center gap-3 hover:shadow-md hover:scale-[1.02] transition-all group border border-transparent hover:border-[#c4a35a]/30"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm"
                style={{ backgroundColor: `${color}18` }}
              >
                {emoji}
              </div>
              <div>
                <p className="font-bold text-sm text-[#3d3428]">{label}</p>
                <p className="text-[10px] text-[#8b7d6b]">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 勋章墙 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Trophy size={18} className="text-[#c4a35a]" />
            勋章墙
            <span className="text-xs font-normal text-[#8b7d6b]">
              {earnedMedals.length}/{medals.length}
            </span>
          </h3>
          <div className="h-1.5 flex-1 mx-3 bg-[#f5ebe0] rounded-full overflow-hidden max-w-[100px]">
            <div
              className="h-full bg-[#c4a35a] rounded-full"
              style={{ width: `${(earnedMedals.length / medals.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {medals.map((medal) => (
            <MedalCard key={medal.id} medal={medal} compact />
          ))}
        </div>
      </section>
    </div>
  )
}
