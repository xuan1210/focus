import { useState } from 'react'
import {
  Bell,
  ChevronRight,
  Clock,
  Home,
  Info,
  LogOut,
  Palette,
  Shield,
  Target,
  User,
} from 'lucide-react'
import MyRoom from './MyRoom'
import { AVATAR_OPTIONS, THEME_OPTIONS } from '../data/initialData'
import { useAppStore } from '../store/useAppStore'

type SettingView =
  | 'main'
  | 'profile'
  | 'my-room'
  | 'notifications'
  | 'appearance'
  | 'timer'
  | 'goal'
  | 'privacy'
  | 'about'

const MENU_ITEMS: { id: SettingView; icon: typeof User; label: string; desc: string; color: string }[] = [
  { id: 'profile', icon: User, label: '个人资料', desc: '昵称、头像、个性签名', color: '#db2777' },
  { id: 'my-room', icon: Home, label: '我的小屋', desc: '家具装扮与积分兑换', color: '#f472b6' },
  { id: 'notifications', icon: Bell, label: '通知设置', desc: '学习提醒与消息推送', color: '#e8a87c' },
  { id: 'appearance', icon: Palette, label: '外观主题', desc: '切换应用配色风格', color: '#b8a9c9' },
  { id: 'timer', icon: Clock, label: '计时偏好', desc: '番茄钟默认时长设置', color: '#95d5b2' },
  { id: 'goal', icon: Target, label: '学习目标', desc: '每日学习时长目标', color: '#a8c5d9' },
  { id: 'privacy', icon: Shield, label: '隐私与安全', desc: '排行榜与数据管理', color: '#7c9a82' },
  { id: 'about', icon: Info, label: '关于我们', desc: '版本信息与使用帮助', color: '#d4a5a5' },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        checked ? 'bg-[#db2777]' : 'bg-[#d4c4b0]'
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-xl bg-white border border-[#fbcfe8] flex items-center justify-center hover:bg-[#fce7f3] transition-colors shadow-sm"
      >
        ←
      </button>
      <h2 className="text-lg font-bold text-[#3d3428]">{title}</h2>
    </div>
  )
}

export default function Settings() {
  const {
    user,
    settings,
    timerSettings,
    updateProfile,
    updateSettings,
    setTimerSettings,
    logout,
  } = useAppStore()
  const [view, setView] = useState<SettingView>('main')
  const [showLogout, setShowLogout] = useState(false)

  if (view === 'my-room') {
    return (
      <div className="page-enter">
        <SubHeader title="我的小屋" onBack={() => setView('main')} />
        <MyRoom embedded />
      </div>
    )
  }

  if (view === 'profile') {
    return (
      <div className="page-enter space-y-4">
        <SubHeader title="个人资料" onBack={() => setView('main')} />
        <div className="glass-card rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <label className="text-xs text-[#8b7d6b] mb-2 block">头像</label>
            <div className="flex gap-2 flex-wrap">
              {AVATAR_OPTIONS.map((a) => (
                <button
                  key={a}
                  onClick={() => updateProfile({ avatar: a })}
                  className={`text-2xl w-10 h-10 rounded-xl transition-all ${
                    user.avatar === a ? 'bg-[#fce7f3] ring-2 ring-[#f472b6] scale-110' : 'hover:bg-[#faf6f0]'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-[#8b7d6b] mb-1 block">昵称</label>
            <input
              value={user.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6]"
            />
          </div>
          <div>
            <label className="text-xs text-[#8b7d6b] mb-1 block">邮箱</label>
            <input
              value={user.email}
              onChange={(e) => updateProfile({ email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6]"
            />
          </div>
          <div>
            <label className="text-xs text-[#8b7d6b] mb-1 block">个性签名</label>
            <textarea
              value={user.motto}
              onChange={(e) => updateProfile({ motto: e.target.value })}
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6] resize-none"
            />
          </div>
          {user.joinDate && (
            <p className="text-xs text-[#a09080]">加入时间：{user.joinDate}</p>
          )}
        </div>
      </div>
    )
  }

  if (view === 'notifications') {
    return (
      <div className="page-enter space-y-3">
        <SubHeader title="通知设置" onBack={() => setView('main')} />
        {[
          { key: 'notifications' as const, label: '推送通知', desc: '接收应用消息推送' },
          { key: 'studyReminder' as const, label: '学习提醒', desc: '每日定时提醒开始学习' },
          { key: 'soundEnabled' as const, label: '提示音效', desc: '计时完成时播放提示音' },
        ].map((item) => (
          <div key={item.key} className="glass-card rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="font-medium text-[#3d3428]">{item.label}</p>
              <p className="text-xs text-[#8b7d6b]">{item.desc}</p>
            </div>
            <Toggle
              checked={settings[item.key]}
              onChange={(v) => updateSettings({ [item.key]: v })}
            />
          </div>
        ))}
        {settings.studyReminder && (
          <div className="glass-card rounded-2xl p-4 shadow-sm">
            <label className="text-xs text-[#8b7d6b] mb-2 block">提醒时间</label>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => updateSettings({ reminderTime: e.target.value })}
              className="px-3 py-2 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6]"
            />
          </div>
        )}
      </div>
    )
  }

  if (view === 'appearance') {
    return (
      <div className="page-enter space-y-4">
        <SubHeader title="外观主题" onBack={() => setView('main')} />
        <div className="grid grid-cols-2 gap-3">
          {THEME_OPTIONS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                updateSettings({ theme: t.id })
                document.body.className = t.id === 'pink' ? '' : `theme-${t.id}`
              }}
              className={`rounded-2xl p-4 border-2 transition-all text-left ${
                settings.theme === t.id
                  ? 'border-[#f472b6] shadow-md scale-[1.02]'
                  : 'border-[#fbcfe8] hover:border-[#f472b6]/50'
              }`}
            >
              <div
                className="w-full h-16 rounded-xl mb-2"
                style={{ background: t.preview }}
              />
              <p className="font-medium text-sm" style={{ color: t.accent }}>{t.name}</p>
              {settings.theme === t.id && (
                <span className="text-xs text-[#f472b6]">✓ 当前使用</span>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (view === 'timer') {
    return (
      <div className="page-enter space-y-4">
        <SubHeader title="计时偏好" onBack={() => setView('main')} />
        <div className="glass-card rounded-2xl p-5 space-y-4 shadow-sm">
          {[
            { key: 'focusMinutes' as const, label: '专注时长', min: 5, max: 120 },
            { key: 'breakMinutes' as const, label: '短休息', min: 1, max: 30 },
            { key: 'longBreakMinutes' as const, label: '长休息', min: 5, max: 45 },
            { key: 'sessionsBeforeLongBreak' as const, label: '长休息间隔（番茄钟数）', min: 2, max: 8 },
          ].map((item) => (
            <div key={item.key}>
              <label className="text-xs text-[#8b7d6b] mb-1 block">{item.label}</label>
              <input
                type="number"
                min={item.min}
                max={item.max}
                value={timerSettings[item.key]}
                onChange={(e) =>
                  setTimerSettings({ [item.key]: Number(e.target.value) })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6]"
              />
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-medium text-sm">自动开始休息</p>
              <p className="text-xs text-[#8b7d6b]">专注结束后自动进入休息</p>
            </div>
            <Toggle
              checked={settings.autoStartBreak}
              onChange={(v) => updateSettings({ autoStartBreak: v })}
            />
          </div>
        </div>
      </div>
    )
  }

  if (view === 'goal') {
    const presets = [60, 90, 120, 180, 240]
    return (
      <div className="page-enter space-y-4">
        <SubHeader title="学习目标" onBack={() => setView('main')} />
        <div className="glass-card rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#8b7d6b] mb-4">设置每日学习时长目标，完成后获得额外成就感</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {presets.map((m) => (
              <button
                key={m}
                onClick={() => updateSettings({ dailyGoalMinutes: m })}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  settings.dailyGoalMinutes === m
                    ? 'bg-[#db2777] text-white shadow-md'
                    : 'bg-[#fce7f3] text-[#db2777] hover:bg-[#fbcfe8]'
                }`}
              >
                {m >= 60 ? `${m / 60}小时` : `${m}分钟`}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs text-[#8b7d6b] mb-1 block">自定义（分钟）</label>
            <input
              type="number"
              min={15}
              max={480}
              value={settings.dailyGoalMinutes}
              onChange={(e) => updateSettings({ dailyGoalMinutes: Number(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6]"
            />
          </div>
        </div>
      </div>
    )
  }

  if (view === 'privacy') {
    return (
      <div className="page-enter space-y-3">
        <SubHeader title="隐私与安全" onBack={() => setView('main')} />
        <div className="glass-card rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="font-medium text-[#3d3428]">显示在排行榜</p>
            <p className="text-xs text-[#8b7d6b]">允许其他用户看到你的学习排名</p>
          </div>
          <Toggle
            checked={settings.showOnLeaderboard}
            onChange={(v) => updateSettings({ showOnLeaderboard: v })}
          />
        </div>
        <div className="glass-card rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[#8b7d6b] mb-3">所有数据保存在本地浏览器中，不会上传到服务器。</p>
          <button
            onClick={() => {
              if (confirm('确定要清除所有学习数据吗？此操作不可恢复。')) {
                localStorage.removeItem('focus-app-storage')
                window.location.reload()
              }
            }}
            className="w-full py-2.5 rounded-xl border-2 border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            清除所有数据
          </button>
        </div>
      </div>
    )
  }

  if (view === 'about') {
    return (
      <div className="page-enter space-y-4">
        <SubHeader title="关于我们" onBack={() => setView('main')} />
        <div className="glass-card rounded-2xl p-6 text-center shadow-sm">
          <span className="text-5xl block mb-3 animate-float">📖</span>
          <h3 className="text-xl font-bold gradient-text">专注小屋</h3>
          <p className="text-sm text-[#8b7d6b] mt-1">版本 1.0.0</p>
        </div>
        <div className="glass-card rounded-2xl p-5 space-y-3 shadow-sm text-sm text-[#5a4f42]">
          <p>专注小屋是一款帮助您养成专注学习习惯的应用。通过番茄钟计时、自习室陪伴、论坛交流和知识科普，让学习变得有趣而有动力。</p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {['⏱️ 番茄钟计时', '🏆 勋章奖励', '🏠 小屋装扮', '🐱 可爱小猫', '📚 知识科普', '💬 学习论坛'].map((f) => (
              <div key={f} className="bg-[#faf6f0] rounded-xl px-3 py-2 text-xs">{f}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter space-y-5">
      {/* 用户卡片 */}
      <button
        onClick={() => setView('profile')}
        className="w-full glass-card rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all setting-item"
      >
        <span className="text-4xl w-16 h-16 rounded-2xl bg-[#fce7f3] flex items-center justify-center shadow-inner">
          {user.avatar}
        </span>
        <div className="flex-1 text-left">
          <p className="font-bold text-lg text-[#3d3428]">{user.name || '学习者'}</p>
          <p className="text-sm text-[#8b7d6b]">{user.motto}</p>
        </div>
        <ChevronRight size={20} className="text-[#c4b5a0]" />
      </button>

      {/* 设置列表 */}
      <div className="space-y-2">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 shadow-sm setting-item"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${item.color}22` }}
            >
              <item.icon size={20} style={{ color: item.color }} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-[#3d3428]">{item.label}</p>
              <p className="text-xs text-[#8b7d6b]">{item.desc}</p>
            </div>
            <ChevronRight size={18} className="text-[#c4b5a0]" />
          </button>
        ))}
      </div>

      {/* 退出登录 */}
      <button
        onClick={() => setShowLogout(true)}
        className="w-full py-3 rounded-2xl border-2 border-red-100 text-red-400 font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
      >
        <LogOut size={18} />
        退出登录
      </button>

      {showLogout && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scale-in">
            <p className="font-bold text-[#3d3428] mb-2">确认退出？</p>
            <p className="text-sm text-[#8b7d6b] mb-5">退出后需要重新登录，学习数据会保留在本地。</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#fbcfe8] text-[#8b7d6b]"
              >
                取消
              </button>
              <button
                onClick={() => logout()}
                className="flex-1 py-2.5 rounded-xl bg-red-400 text-white font-medium"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
