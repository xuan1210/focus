import { useEffect, useState } from 'react'
import { AVATAR_OPTIONS } from '../data/initialData'
import { useAppStore } from '../store/useAppStore'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  emoji: ['📖', '✨', '⭐', '🌸', '☕', '📝', '🎯', '💡'][i % 8],
  left: `${(i * 5.5 + 3) % 95}%`,
  delay: `${i * 0.7}s`,
  duration: `${8 + (i % 5) * 2}s`,
  size: `${18 + (i % 4) * 6}px`,
}))

const TAGLINES = [
  '专注学习，遇见更好的自己',
  '每一分钟，都值得被记录',
  '和小猫一起，开启专注之旅',
]

type AuthMode = 'login' | 'register'
type LoginStep = 'splash' | 'auth'

function LoginBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#831843] via-[#9d174d] to-[#db2777]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,114,182,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,207,232,0.15),transparent_60%)]" />
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="login-particle opacity-40"
          style={{ left: p.left, fontSize: p.size, animationDuration: p.duration, animationDelay: p.delay }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  )
}

export default function Login() {
  const login = useAppStore((s) => s.login)
  const [step, setStep] = useState<LoginStep>('splash')
  const [mode, setMode] = useState<AuthMode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('🐱')
  const [taglineIdx, setTaglineIdx] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (step !== 'auth') return
    const t = setTimeout(() => setShowForm(true), 300)
    return () => clearTimeout(t)
  }, [step])

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % TAGLINES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const isRegister = mode === 'register'
  const canSubmit = name.trim() && (!isRegister || email.trim())

  const handleSubmit = () => {
    if (!canSubmit) return
    setExiting(true)
    setTimeout(() => {
      login(name.trim(), email.trim(), avatar)
    }, 600)
  }

  if (step === 'splash') {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        <LoginBackground />
        <div className="relative z-10 text-center px-6 max-w-lg animate-fade-in-up">
          <div className="inline-block animate-float animate-glow rounded-3xl bg-white/10 backdrop-blur-md p-8 mb-6 border border-white/20">
            <span className="text-7xl block">🌸</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-wide drop-shadow">专注小屋</h1>
          <p key={taglineIdx} className="text-white/70 text-sm mb-12 h-5 animate-fade-in">
            {TAGLINES[taglineIdx]}
          </p>

          <button
            onClick={() => setStep('auth')}
            className="px-14 py-4 rounded-2xl bg-white text-[#db2777] font-bold text-xl shadow-2xl hover:bg-[#fce7f3] hover:scale-105 active:scale-95 transition-all duration-300 animate-glow border-2 border-white/80"
          >
            点击进入
          </button>
          <p className="text-white/50 text-xs mt-5">轻触按钮，进入登录页面</p>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-white/35 text-sm z-10">
          <span>⏱️ 计时</span>
          <span>🏆 勋章</span>
          <span>🐱 小屋</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <LoginBackground />

      <div className={`relative z-10 w-full max-w-md transition-all duration-600 ${exiting ? 'animate-[login-success_0.6s_ease-out_forwards]' : ''}`}>
        <div className="text-center mb-6">
          <button
            onClick={() => { setStep('splash'); setShowForm(false) }}
            className="text-white/60 text-xs mb-4 hover:text-white transition-colors"
          >
            ← 返回
          </button>
          <div className="inline-block animate-float rounded-3xl bg-white/10 backdrop-blur-md p-5 mb-3 border border-white/20">
            <span className="text-5xl block">🌸</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 tracking-wide">专注小屋</h1>
          <p className="text-white/60 text-sm">{isRegister ? '创建你的账号' : '登录继续学习'}</p>
        </div>

        {showForm && (
          <div className="glass-card rounded-3xl p-6 shadow-2xl space-y-5 animate-fade-in-up">
            <div className="flex p-1 bg-[#fce7f3]/80 rounded-2xl">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  mode === 'login' ? 'bg-white text-[#db2777] shadow-sm' : 'text-[#9d174d] hover:text-[#db2777]'
                }`}
              >
                登录
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  mode === 'register' ? 'bg-white text-[#db2777] shadow-sm' : 'text-[#9d174d] hover:text-[#db2777]'
                }`}
              >
                注册
              </button>
            </div>

            <p className="text-center text-xs text-[#9d174d] -mt-2">
              {isRegister ? '创建账号，开启你的专注之旅' : '欢迎回来，继续你的学习'}
            </p>

            <div>
              <label className="text-xs font-medium text-[#9d174d] mb-2 block">选择头像</label>
              <div className="flex gap-2 flex-wrap justify-center">
                {AVATAR_OPTIONS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAvatar(a)}
                    className={`text-2xl w-10 h-10 rounded-xl transition-all duration-200 ${
                      avatar === a ? 'bg-[#fce7f3] ring-2 ring-[#f472b6] scale-110 shadow-md' : 'hover:bg-white/50 hover:scale-105'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#9d174d] mb-1.5 block">昵称</label>
              <input
                type="text"
                placeholder={isRegister ? '给自己起个名字吧' : '输入你的昵称'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-3 rounded-xl border border-[#fbcfe8] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#f472b6]/50 focus:border-[#f472b6] transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#9d174d] mb-1.5 block">
                邮箱 {isRegister ? '' : <span className="text-[#f9a8d4]">（可选）</span>}
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#fbcfe8] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#f472b6]/50 focus:border-[#f472b6] transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#9d174d] mb-1.5 block">密码</label>
              <input
                type="password"
                placeholder={isRegister ? '设置登录密码' : '输入密码'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-3 rounded-xl border border-[#fbcfe8] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#f472b6]/50 focus:border-[#f472b6] transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || exiting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#db2777] via-[#ec4899] to-[#f472b6] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-glow"
            >
              {exiting ? '正在进入小屋...' : isRegister ? '注册并进入 →' : '登录进入 →'}
            </button>

            <p className="text-center text-xs text-[#f9a8d4]">
              {isRegister ? '注册即表示同意专注小屋的使用条款 🏠' : '还没有账号？点击上方「注册」立即创建'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
