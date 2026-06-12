import { useState } from 'react'
import { Check, Paintbrush, ShoppingBag, Sparkles, Square } from 'lucide-react'
import RoomScene from '../components/RoomScene'
import { FURNITURE_COLORS } from '../data/initialData'
import { useAppStore } from '../store/useAppStore'
import type { FurnitureType } from '../types'

type Props = { embedded?: boolean }
type Tab = 'furniture' | 'wallpaper' | 'floor'

export default function MyRoom({ embedded }: Props) {
  const {
    furniture,
    wallpapers,
    floors,
    activeWallpaperId,
    activeFloorId,
    points,
    buyFurniture,
    setFurnitureColor,
    buyWallpaper,
    setActiveWallpaper,
    buyFloor,
    setActiveFloor,
  } = useAppStore()

  const [tab, setTab] = useState<Tab>('furniture')
  const [selectedItem, setSelectedItem] = useState<FurnitureType | null>(null)
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(null)
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const previewWallpaper = wallpapers.find((w) => w.id === (selectedWallpaper ?? activeWallpaperId))
  const previewFloor = floors.find((f) => f.id === (selectedFloor ?? activeFloorId))
  const activeItem = furniture.find((f) => f.type === selectedItem)
  const ownedCount = furniture.filter((f) => f.owned).length

  const tabs: { id: Tab; label: string; icon: typeof ShoppingBag }[] = [
    { id: 'furniture', label: '家具', icon: ShoppingBag },
    { id: 'wallpaper', label: '墙纸', icon: Paintbrush },
    { id: 'floor', label: '地板', icon: Square },
  ]

  return (
    <div className="space-y-5">
      {!embedded && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#831843] flex items-center gap-2">
            <Sparkles size={22} className="text-[#db2777]" />
            我的小屋
          </h2>
          <div className="flex items-center gap-1 text-sm font-semibold text-[#db2777] bg-[#fce7f3] px-3 py-1 rounded-full">
            ✨ {points} 积分
          </div>
        </div>
      )}

      <RoomScene furniture={furniture} wallpaper={previewWallpaper} floor={previewFloor} />

      {embedded && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#9d174d]">已拥有 {ownedCount}/{furniture.length} 件家具</span>
          <span className="font-semibold text-[#db2777]">✨ {points} 积分</span>
        </div>
      )}

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#831843] text-white px-4 py-2 rounded-xl text-sm shadow-lg animate-float">
          {toast}
        </div>
      )}

      <div className="flex gap-2 p-1 bg-[#fce7f3]/60 rounded-2xl">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === id ? 'bg-white text-[#db2777] shadow-sm' : 'text-[#9d174d] hover:bg-white/50'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'furniture' && (
        <>
          <section>
            <h3 className="text-sm font-semibold text-[#9d174d] mb-3 flex items-center gap-1">
              <ShoppingBag size={16} />
              家具商店（{furniture.length} 种）
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {furniture.map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedItem(item.type)}
                  className={`text-left glass-card rounded-2xl p-3 border-2 transition-all ${
                    selectedItem === item.type ? 'border-[#f472b6] shadow-md scale-[1.02]' : 'border-transparent hover:border-[#f472b6]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{item.icon}</span>
                    {item.owned ? (
                      <span className="text-[10px] bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Check size={8} /> 已有
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#db2777]">
                        {item.price === 0 ? '免费' : `${item.price}分`}
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-sm text-[#831843]">{item.name}</p>
                  <div className="w-5 h-5 rounded-full mt-1.5 border border-white shadow-sm" style={{ backgroundColor: item.color }} />
                </button>
              ))}
            </div>
          </section>

          {selectedItem && activeItem && (
            <section className="glass-card rounded-2xl p-5 shadow-sm space-y-4 animate-scale-in">
              <h3 className="font-bold text-[#831843]">{activeItem.icon} {activeItem.name}</h3>
              {!activeItem.owned ? (
                <button
                  onClick={() => {
                    const ok = buyFurniture(activeItem.type)
                    showToast(ok ? '购买成功！' : '积分不足')
                    if (ok) setSelectedItem(activeItem.type)
                  }}
                  disabled={points < activeItem.price}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#db2777] to-[#f472b6] text-white font-medium disabled:opacity-40 hover:shadow-md transition-all"
                >
                  购买（{activeItem.price} 积分）
                </button>
              ) : (
                <>
                  <p className="text-sm text-[#9d174d]">选择颜色：</p>
                  <div className="grid grid-cols-4 gap-2">
                    {FURNITURE_COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setFurnitureColor(activeItem.type, c.hex); showToast('颜色已更换') }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                          activeItem.color === c.hex ? 'bg-[#fce7f3] ring-2 ring-[#f472b6]' : 'hover:bg-[#fdf2f8]'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full border-2 border-white shadow" style={{ backgroundColor: c.hex }} />
                        <span className="text-[10px] text-[#9d174d]">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}
        </>
      )}

      {tab === 'wallpaper' && (
        <>
          <section>
            <h3 className="text-sm font-semibold text-[#9d174d] mb-3 flex items-center gap-1">
              <Paintbrush size={16} />
              墙纸花色（{wallpapers.length} 种）
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setSelectedWallpaper(wp.id)}
                  className={`text-left rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedWallpaper === wp.id || activeWallpaperId === wp.id
                      ? 'border-[#f472b6] shadow-md scale-[1.02]'
                      : 'border-transparent hover:border-[#f472b6]/30'
                  }`}
                >
                  <div
                    className="h-16 w-full"
                    style={{
                      background: wp.css,
                      backgroundSize: wp.id === 'wp4' ? '20px 20px' : wp.id === 'wp3' ? '24px 24px, 100% 100%' : wp.id === 'wp10' ? '20px 20px' : undefined,
                    }}
                  />
                  <div className="p-2 bg-white/80">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{wp.icon}</span>
                      {wp.owned ? (
                        activeWallpaperId === wp.id ? (
                          <span className="text-[10px] text-[#db2777] font-semibold">使用中</span>
                        ) : (
                          <span className="text-[10px] text-green-600">已有</span>
                        )
                      ) : (
                        <span className="text-[10px] font-semibold text-[#db2777]">{wp.price === 0 ? '免费' : `${wp.price}分`}</span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#831843] mt-0.5">{wp.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {selectedWallpaper && (() => {
            const wp = wallpapers.find((w) => w.id === selectedWallpaper)
            if (!wp) return null
            return (
              <section className="glass-card rounded-2xl p-5 shadow-sm space-y-3 animate-scale-in">
                <h3 className="font-bold text-[#831843]">{wp.icon} {wp.name}</h3>
                {!wp.owned ? (
                  <button
                    onClick={() => {
                      const ok = buyWallpaper(wp.id)
                      showToast(ok ? '墙纸购买成功！' : '积分不足')
                      if (ok) setSelectedWallpaper(wp.id)
                    }}
                    disabled={points < wp.price}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#db2777] to-[#f472b6] text-white font-medium disabled:opacity-40"
                  >
                    购买（{wp.price} 积分）
                  </button>
                ) : (
                  <button
                    onClick={() => { setActiveWallpaper(wp.id); showToast('墙纸已更换') }}
                    disabled={activeWallpaperId === wp.id}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#db2777] to-[#f472b6] text-white font-medium disabled:opacity-40"
                  >
                    {activeWallpaperId === wp.id ? '当前使用中' : '使用此墙纸'}
                  </button>
                )}
              </section>
            )
          })()}
        </>
      )}

      {tab === 'floor' && (
        <>
          <section>
            <h3 className="text-sm font-semibold text-[#9d174d] mb-3 flex items-center gap-1">
              <Square size={16} />
              地板花色（{floors.length} 种）
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {floors.map((fl) => (
                <button
                  key={fl.id}
                  onClick={() => setSelectedFloor(fl.id)}
                  className={`text-left rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedFloor === fl.id || activeFloorId === fl.id
                      ? 'border-[#f472b6] shadow-md scale-[1.02]'
                      : 'border-transparent hover:border-[#f472b6]/30'
                  }`}
                >
                  <div
                    className="h-14 w-full"
                    style={{
                      background: fl.css,
                      backgroundSize: fl.id === 'fl4' ? '40px 40px' : fl.id === 'fl6' ? '40px 40px, 40px 40px' : fl.id === 'fl8' ? '16px 16px, 100% 100%' : undefined,
                    }}
                  />
                  <div className="p-2 bg-white/80">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{fl.icon}</span>
                      {fl.owned ? (
                        activeFloorId === fl.id ? (
                          <span className="text-[10px] text-[#db2777] font-semibold">使用中</span>
                        ) : (
                          <span className="text-[10px] text-green-600">已有</span>
                        )
                      ) : (
                        <span className="text-[10px] font-semibold text-[#db2777]">{fl.price === 0 ? '免费' : `${fl.price}分`}</span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#831843] mt-0.5">{fl.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {selectedFloor && (() => {
            const fl = floors.find((f) => f.id === selectedFloor)
            if (!fl) return null
            return (
              <section className="glass-card rounded-2xl p-5 shadow-sm space-y-3 animate-scale-in">
                <h3 className="font-bold text-[#831843]">{fl.icon} {fl.name}</h3>
                {!fl.owned ? (
                  <button
                    onClick={() => {
                      const ok = buyFloor(fl.id)
                      showToast(ok ? '地板购买成功！' : '积分不足')
                      if (ok) setSelectedFloor(fl.id)
                    }}
                    disabled={points < fl.price}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#db2777] to-[#f472b6] text-white font-medium disabled:opacity-40"
                  >
                    购买（{fl.price} 积分）
                  </button>
                ) : (
                  <button
                    onClick={() => { setActiveFloor(fl.id); showToast('地板已更换') }}
                    disabled={activeFloorId === fl.id}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#db2777] to-[#f472b6] text-white font-medium disabled:opacity-40"
                  >
                    {activeFloorId === fl.id ? '当前使用中' : '使用此地板'}
                  </button>
                )}
              </section>
            )
          })()}
        </>
      )}

      <div className="bg-gradient-to-r from-[#fdf2f8] to-[#fce7f3] rounded-2xl p-4 border border-[#fbcfe8]">
        <p className="text-sm text-[#db2777]">
          🐱 小猫会在房间里慢慢走动 · 完成学习赚积分 · 自由搭配墙纸、地板和 {furniture.length} 种家具
        </p>
      </div>
    </div>
  )
}
