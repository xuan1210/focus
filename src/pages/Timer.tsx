import { useEffect, useState } from 'react'
import { Coffee, Pause, Play, RotateCcw, Settings, Target, Zap } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const PRESETS = [
  { label: '经典', focus: 25, break: 5 },
  { label: '深度', focus: 45, break: 10 },
  { label: '短时', focus: 15, break: 3 },
  { label: '超长', focus: 60, break: 15 },
]

export default function Timer() {
  const {
    timerSettings,
    timerMode,
    timerSecondsLeft,
    timerRunning,
    setTimerSettings,
    startTimer,
    pauseTimer,
    resetTimer,
    tickTimer,
    sessionsCompleted,
    todayMinutes,
    settings,
  } = useAppStore()

  const [showSettings, setShowSettings] = useState(false)
  const [focusInput, setFocusInput] = useState(timerSettings.focusMinutes)
  const [breakInput, setBreakInput] = useState(timerSettings.breakMinutes)
  const [taskName, setTaskName] = useState('')

  useEffect(() => {
    if (!timerRunning) return
    const id = setInterval(tickTimer, 1000)
    return () => clearInterval(id)
  }, [timerRunning, tickTimer])

  const minutes = Math.floor(timerSecondsLeft / 60)
  const seconds = timerSecondsLeft % 60
  const totalSeconds =
    timerMode === 'focus'
      ? timerSettings.focusMinutes * 60
      : timerSettings.breakMinutes * 60
  const progress = ((totalSeconds - timerSecondsLeft) / totalSeconds) * 100
  const goalLeft = Math.max(0, settings.dailyGoalMinutes - todayMinutes)

  const handleSaveSettings = () => {
    setTimerSettings({
      focusMinutes: Math.max(1, Math.min(120, focusInput)),
      breakMinutes: Math.max(1, Math.min(30, breakInput)),
    })
    setShowSettings(false)
  }

  return (
    <div className="page-enter space-y-6">
      {/* 模式标签 */}
      <div className="text-center">
        <span
          className={`inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
            timerMode === 'focus'
              ? 'bg-gradient-to-r from-[#fce7f3] to-[#fff8e7] text-[#db2777] border border-[#f472b6]/30'
              : 'bg-gradient-to-r from-[#e8f5e9] to-[#f0faf4] text-[#4a7c59] border border-[#95d5b2]/30'
          }`}
        >
          {timerMode === 'focus' ? <><Zap size={14} /> 专注模式</> : <><Coffee size={14} /> 休息模式</>}
        </span>
      </div>

      {/* 任务名 */}
      <div className="text-center">
        <input
          placeholder="今天要完成什么？"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="text-center text-sm text-[#8b7d6b] bg-transparent border-b border-dashed border-[#fbcfe8] focus:outline-none focus:border-[#f472b6] pb-1 w-48"
        />
      </div>

      {/* 计时环 */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-72 h-72 rounded-full bg-[#f472b6]/5 animate-pulse-ring" />
        <svg className="w-72 h-72 -rotate-90 relative" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="88" fill="none" stroke="#fce7f3" strokeWidth="6" />
          <circle
            cx="100" cy="100" r="88" fill="none"
            stroke={timerMode === 'focus' ? 'url(#grad)' : '#95d5b2'}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#e8a87c" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <p className="text-6xl font-bold text-[#3d3428] tabular-nums tracking-tight">
            {String(minutes).padStart(2, '0')}
            <span className="text-[#c4b5a0]">:</span>
            {String(seconds).padStart(2, '0')}
          </p>
          <p className="text-xs text-[#8b7d6b] mt-2">
            {timerMode === 'focus'
              ? `专注 ${timerSettings.focusMinutes} 分钟`
              : `休息 ${timerSettings.breakMinutes} 分钟`}
          </p>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-5">
        <button
          onClick={resetTimer}
          className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center hover:shadow-md transition-all"
        >
          <RotateCcw size={20} className="text-[#8b7d6b]" />
        </button>
        <button
          onClick={timerRunning ? pauseTimer : startTimer}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#db2777] via-[#a67c2a] to-[#f472b6] flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-white animate-glow"
        >
          {timerRunning ? <Pause size={36} /> : <Play size={36} className="ml-1" />}
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center hover:shadow-md transition-all"
        >
          <Settings size={20} className="text-[#8b7d6b]" />
        </button>
      </div>

      {/* 快捷预设 */}
      <div className="flex gap-2 justify-center flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setTimerSettings({ focusMinutes: p.focus, breakMinutes: p.break })}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              timerSettings.focusMinutes === p.focus
                ? 'bg-[#db2777] text-white shadow-md'
                : 'glass-card text-[#8b7d6b] hover:text-[#db2777]'
            }`}
          >
            {p.label} {p.focus}min
          </button>
        ))}
      </div>

      {showSettings && (
        <div className="glass-card rounded-2xl p-5 shadow-md space-y-4 animate-scale-in">
          <h3 className="font-bold text-[#3d3428]">计时设置</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#8b7d6b] block mb-1">专注（分钟）</label>
              <input type="number" min={1} max={120} value={focusInput}
                onChange={(e) => setFocusInput(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6]"
              />
            </div>
            <div>
              <label className="text-xs text-[#8b7d6b] block mb-1">休息（分钟）</label>
              <input type="number" min={1} max={30} value={breakInput}
                onChange={(e) => setBreakInput(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#fbcfe8] focus:outline-none focus:border-[#f472b6]"
              />
            </div>
          </div>
          <button onClick={handleSaveSettings} className="w-full py-2.5 rounded-xl bg-[#db2777] text-white font-medium">
            保存设置
          </button>
        </div>
      )}

      {/* 统计 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="glass-card rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-[#db2777]">{sessionsCompleted}</p>
          <p className="text-[10px] text-[#8b7d6b]">完成番茄钟</p>
        </div>
        <div className="glass-card rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-[#db2777]">{todayMinutes}</p>
          <p className="text-[10px] text-[#8b7d6b]">今日分钟</p>
        </div>
        <div className="glass-card rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-[#db2777]">{goalLeft}</p>
          <p className="text-[10px] text-[#8b7d6b] flex items-center justify-center gap-0.5">
            <Target size={10} /> 距目标
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#fff8e7] to-[#fce7f3] rounded-2xl p-4 border border-[#f0e0b0]">
        <p className="text-xs text-[#db2777] leading-relaxed">
          💡 每完成一次专注获得 <strong>{timerSettings.focusMinutes * 2}</strong> 积分。
          每 {timerSettings.sessionsBeforeLongBreak} 个番茄钟后享受 {timerSettings.longBreakMinutes} 分钟长休息。
        </p>
      </div>
    </div>
  )
}
