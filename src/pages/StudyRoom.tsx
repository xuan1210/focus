import { useState } from 'react'
import { Plus, Search, UserMinus, UserPlus, Users, Zap } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function StudyRoom() {
  const { studyRooms, joinRoom, leaveRoom, createRoom } = useAppStore()
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [search, setSearch] = useState('')

  const joinedRooms = studyRooms.filter((r) => r.isJoined)
  const availableRooms = studyRooms.filter((r) => !r.isJoined)
  const totalActive = studyRooms.reduce((s, r) => s + (r.activeNow ?? 0), 0)

  const filterFn = (r: typeof studyRooms[0]) =>
    !search || r.name.includes(search) || r.description.includes(search) || r.tags.some((t) => t.includes(search))

  const handleCreate = () => {
    if (!name.trim()) return
    createRoom(
      name.trim(),
      description.trim() || '一个安静的学习空间',
      tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
    )
    setName('')
    setDescription('')
    setTags('')
    setShowCreate(false)
  }

  return (
    <div className="page-enter space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#3d3428] flex items-center gap-2">
            <Users size={22} className="text-[#8b6914]" />
            自习室
          </h2>
          <p className="text-xs text-[#8b7d6b] mt-0.5">
            <Zap size={10} className="inline text-[#c4a35a]" /> {totalActive} 人正在专注
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b6914] to-[#c4a35a] text-white text-sm font-semibold shadow-md"
        >
          <Plus size={16} />
          创建
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4b5a0]" />
        <input
          placeholder="搜索自习室..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8dfd0] bg-white/70 focus:outline-none focus:border-[#c4a35a]"
        />
      </div>

      {showCreate && (
        <div className="glass-card rounded-2xl p-5 shadow-md space-y-3 animate-scale-in">
          <input
            placeholder="自习室名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#e8dfd0] focus:outline-none focus:border-[#c4a35a]"
          />
          <textarea
            placeholder="描述（可选）"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl border border-[#e8dfd0] focus:outline-none focus:border-[#c4a35a] resize-none"
          />
          <input
            placeholder="标签，用逗号分隔"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#e8dfd0] focus:outline-none focus:border-[#c4a35a]"
          />
          <button onClick={handleCreate} className="w-full py-2.5 rounded-xl bg-[#8b6914] text-white font-medium">
            创建自习室
          </button>
        </div>
      )}

      {joinedRooms.filter(filterFn).length > 0 && (
        <section>
          <h3 className="text-xs font-bold text-[#8b6914] mb-2 uppercase tracking-wider">已加入</h3>
          <div className="space-y-3">
            {joinedRooms.filter(filterFn).map((room) => (
              <RoomCard key={room.id} room={room} onAction={() => leaveRoom(room.id)} actionLabel="退出" joined />
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-xs font-bold text-[#8b7d6b] mb-2 uppercase tracking-wider">发现自习室</h3>
        <div className="space-y-3">
          {availableRooms.filter(filterFn).map((room) => (
            <RoomCard key={room.id} room={room} onAction={() => joinRoom(room.id)} actionLabel="加入" joined={false} />
          ))}
        </div>
      </section>
    </div>
  )
}

function RoomCard({
  room,
  onAction,
  actionLabel,
  joined,
}: {
  room: {
    id: string
    name: string
    description: string
    memberCount: number
    maxMembers: number
    tags: string[]
    mood?: string
    activeNow?: number
  }
  onAction: () => void
  actionLabel: string
  joined: boolean
}) {
  const fillPercent = (room.memberCount / room.maxMembers) * 100
  const isFull = room.memberCount >= room.maxMembers

  return (
    <div className="glass-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#c4a35a]/20">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#3d3428]">{room.name}</h4>
            {room.mood && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5ebe0] text-[#8b6914]">{room.mood}</span>
            )}
          </div>
          <p className="text-xs text-[#8b7d6b] mt-0.5 line-clamp-2">{room.description}</p>
        </div>
        <button
          onClick={onAction}
          disabled={!joined && isFull}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ml-2 ${
            joined
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : isFull
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#8b6914] to-[#c4a35a] text-white shadow-sm'
          }`}
        >
          {joined ? <UserMinus size={12} /> : <UserPlus size={12} />}
          {isFull && !joined ? '已满' : actionLabel}
        </button>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Users size={12} className="text-[#8b7d6b]" />
        <span className="text-[10px] text-[#8b7d6b]">
          {room.memberCount}/{room.maxMembers} 人
        </span>
        {room.activeNow !== undefined && (
          <span className="text-[10px] text-[#c4a35a] font-medium">
            · {room.activeNow} 人专注中
          </span>
        )}
        <div className="flex-1 h-1.5 bg-[#f5ebe0] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#c4a35a] to-[#e8a87c] rounded-full transition-all"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
      </div>
      <div className="flex gap-1 flex-wrap">
        {room.tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5ebe0] text-[#8b6914]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
