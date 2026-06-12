import type { FloorItem, FurnitureItem, WallpaperItem } from '../types'

type Props = {
  furniture: FurnitureItem[]
  wallpaper?: WallpaperItem
  floor?: FloorItem
}

export default function RoomScene({ furniture, wallpaper, floor }: Props) {
  const get = (type: string) => furniture.find((f) => f.type === type)

  const desk = get('desk')
  const wardrobe = get('wardrobe')
  const bed = get('bed')
  const windowItem = get('window')
  const lamp = get('lamp')
  const plant = get('plant')
  const rug = get('rug')
  const bookshelf = get('bookshelf')
  const ceilingLamp = get('ceiling_lamp')
  const sofa = get('sofa')
  const chair = get('chair')
  const clock = get('clock')
  const painting = get('painting')
  const mirror = get('mirror')
  const cushion = get('cushion')
  const candle = get('candle')
  const fishbowl = get('fishbowl')
  const guitar = get('guitar')
  const floorLamp = get('floor_lamp')
  const curtain = get('curtain')
  const teddy = get('teddy')
  const poster = get('poster')
  const shelf = get('shelf')

  const wallCss = wallpaper?.css ?? 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)'
  const floorCss = floor?.css ?? 'repeating-linear-gradient(90deg, #f9a8d4 0px, #f9a8d4 40px, #f472b6 40px, #f472b6 80px)'
  const isDarkWall = wallpaper?.id === 'wp9'

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[#f472b6] shadow-lg">
      <div
        className="absolute inset-0"
        style={{
          background: wallCss,
          backgroundSize: wallpaper?.id === 'wp4' ? '20px 20px' : wallpaper?.id === 'wp3' ? '24px 24px, 100% 100%' : wallpaper?.id === 'wp10' ? '20px 20px' : undefined,
        }}
      />

      {curtain?.owned && (
        <>
          <div className="absolute top-0 left-[2%] w-[12%] h-[55%] rounded-b-lg opacity-90" style={{ backgroundColor: curtain.color }} />
          <div className="absolute top-0 right-[2%] w-[12%] h-[55%] rounded-b-lg opacity-90" style={{ backgroundColor: curtain.color }} />
        </>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          background: floorCss,
          backgroundSize: floor?.id === 'fl4' ? '40px 40px' : floor?.id === 'fl6' ? '40px 40px, 40px 40px' : floor?.id === 'fl8' ? '16px 16px, 100% 100%' : undefined,
        }}
      />

      {rug?.owned && (
        <div className="absolute bottom-[26%] left-[28%] w-[44%] h-[8%] rounded-[50%] opacity-60" style={{ backgroundColor: rug.color }} />
      )}

      {ceilingLamp?.owned && (
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-20">
          <div className="w-0.5 h-4 bg-[#9ca3af] mx-auto" />
          <div className="w-6 h-4 rounded-b-full mx-auto shadow-md" style={{ backgroundColor: ceilingLamp.color }} />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-10 rounded-full blur-lg opacity-50" style={{ backgroundColor: ceilingLamp.color }} />
        </div>
      )}

      {clock?.owned && (
        <div className="absolute top-[8%] left-[8%] w-[8%] aspect-square z-10">
          <div className="w-full h-full rounded-full border-2 shadow-md flex items-center justify-center" style={{ backgroundColor: clock.color, borderColor: '#be185d' }}>
            <span className="text-[8px]">12</span>
          </div>
        </div>
      )}

      {painting?.owned && (
        <div className="absolute top-[12%] left-[22%] w-[10%] h-[18%] z-10">
          <div className="w-full h-full rounded-sm border-2 border-[#be185d] shadow-md overflow-hidden" style={{ backgroundColor: painting.color }}>
            <div className="w-full h-[70%] bg-gradient-to-br from-[#fbcfe8] to-[#f472b6]" />
          </div>
        </div>
      )}

      {poster?.owned && (
        <div className="absolute top-[14%] left-[34%] w-[8%] h-[14%] z-10">
          <div className="w-full h-full rounded-sm border border-[#ec4899] shadow-sm flex items-center justify-center text-[6px] text-[#be185d] font-bold" style={{ backgroundColor: poster.color }}>
            加油
          </div>
        </div>
      )}

      {mirror?.owned && (
        <div className="absolute top-[10%] right-[34%] w-[6%] h-[16%] z-10">
          <div className="w-full h-full rounded-lg border-2 border-[#f472b6] shadow-inner" style={{ background: `linear-gradient(135deg, ${mirror.color}, #fff)` }} />
        </div>
      )}

      {windowItem?.owned && (
        <div className="absolute top-[6%] right-[8%] w-[24%] h-[30%]">
          <div className="w-full h-full rounded-lg border-4 shadow-inner relative overflow-hidden" style={{ borderColor: windowItem.color, backgroundColor: `${windowItem.color}33` }}>
            <div className="absolute inset-2 grid grid-cols-2 grid-rows-2 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-sm" style={{ background: `linear-gradient(135deg, ${windowItem.color}88, #87ceeb66)` }} />
              ))}
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2" style={{ backgroundColor: windowItem.color }} />
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2" style={{ backgroundColor: windowItem.color }} />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-8 bg-yellow-200/25 blur-xl rounded-full" />
        </div>
      )}

      {bookshelf?.owned && (
        <div className="absolute bottom-[28%] left-[3%] w-[12%] h-[48%]">
          <div className="w-full h-full rounded-sm shadow-md relative" style={{ backgroundColor: bookshelf.color }}>
            {[20, 40, 60, 78].map((top) => (
              <div key={top} className="absolute left-[8%] right-[8%] h-[3%] bg-black/10" style={{ top: `${top}%` }} />
            ))}
            <span className="absolute text-[8px]" style={{ top: '8%', left: '15%' }}>📕</span>
            <span className="absolute text-[8px]" style={{ top: '25%', left: '40%' }}>📗</span>
            <span className="absolute text-[8px]" style={{ top: '45%', left: '20%' }}>📘</span>
            <span className="absolute text-[8px]" style={{ top: '65%', left: '50%' }}>📙</span>
          </div>
        </div>
      )}

      {shelf?.owned && (
        <div className="absolute bottom-[28%] left-[15%] w-[8%] h-[25%]">
          <div className="w-full h-full relative" style={{ backgroundColor: shelf.color }}>
            {[30, 55, 80].map((top) => (
              <div key={top} className="absolute left-0 right-0 h-[4%] bg-black/15" style={{ top: `${top}%` }} />
            ))}
            <span className="absolute text-[7px]" style={{ top: '10%', left: '20%' }}>🏆</span>
            <span className="absolute text-[7px]" style={{ top: '40%', left: '50%' }}>🌸</span>
          </div>
        </div>
      )}

      {wardrobe?.owned && (
        <div className="absolute bottom-[28%] left-[24%] w-[12%] h-[40%]">
          <div className="w-full h-full rounded-t-lg shadow-md relative" style={{ backgroundColor: wardrobe.color }}>
            <div className="absolute top-1/2 left-[20%] w-1.5 h-1.5 rounded-full bg-[#f472b6] -translate-y-1/2" />
            <div className="absolute top-1/2 right-[20%] w-1.5 h-1.5 rounded-full bg-[#f472b6] -translate-y-1/2" />
          </div>
        </div>
      )}

      {desk?.owned && (
        <div className="absolute bottom-[28%] left-[38%] w-[24%] h-[28%]">
          <div className="absolute bottom-0 w-full h-[12%] rounded-sm shadow" style={{ backgroundColor: desk.color }} />
          <div className="absolute bottom-[12%] left-[5%] w-[8%] h-[88%] rounded-sm" style={{ backgroundColor: desk.color, filter: 'brightness(0.85)' }} />
          <div className="absolute bottom-[12%] right-[5%] w-[8%] h-[88%] rounded-sm" style={{ backgroundColor: desk.color, filter: 'brightness(0.85)' }} />
          <span className="absolute bottom-[58%] left-[15%] text-sm">📖</span>
          <span className="absolute bottom-[58%] left-[35%] text-xs">☕</span>
          {candle?.owned && (
            <div className="absolute bottom-[55%] left-[50%]">
              <span className="text-xs">🕯️</span>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full blur-sm bg-orange-200/60" />
            </div>
          )}
          {lamp?.owned && (
            <div className="absolute bottom-[55%] right-[12%]">
              <span className="text-sm">💡</span>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full blur-md" style={{ backgroundColor: `${lamp.color}66` }} />
            </div>
          )}
          {fishbowl?.owned && <div className="absolute bottom-[52%] right-[35%]"><span className="text-xs">🐠</span></div>}
        </div>
      )}

      {guitar?.owned && (
        <div className="absolute bottom-[28%] left-[62%] w-[6%] h-[35%]">
          <span className="text-lg block text-center rotate-12">🎸</span>
        </div>
      )}

      {plant?.owned && (
        <div className="absolute bottom-[28%] left-[68%] w-[7%] h-[15%]">
          <span className="text-lg block text-center">🪴</span>
          <div className="w-full h-2 rounded-sm mt-0.5" style={{ backgroundColor: plant.color }} />
        </div>
      )}

      {floorLamp?.owned && (
        <div className="absolute bottom-[28%] left-[75%] w-[6%] h-[38%]">
          <div className="w-1 h-[70%] mx-auto rounded-full" style={{ backgroundColor: floorLamp.color }} />
          <div className="w-4 h-3 rounded-b-full mx-auto -mt-1" style={{ backgroundColor: floorLamp.color }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-8 rounded-full blur-md opacity-40" style={{ backgroundColor: floorLamp.color }} />
        </div>
      )}

      {sofa?.owned && (
        <div className="absolute bottom-[28%] right-[18%] w-[18%] h-[18%]">
          <div className="absolute bottom-0 w-full h-[70%] rounded-t-xl shadow-md" style={{ backgroundColor: sofa.color }} />
          <div className="absolute bottom-[50%] left-0 w-[15%] h-[50%] rounded-tl-xl" style={{ backgroundColor: sofa.color, filter: 'brightness(0.9)' }} />
          <div className="absolute bottom-[50%] right-0 w-[15%] h-[50%] rounded-tr-xl" style={{ backgroundColor: sofa.color, filter: 'brightness(0.9)' }} />
          {cushion?.owned && <div className="absolute bottom-[55%] left-[30%] w-[25%] h-[20%] rounded-lg shadow-sm" style={{ backgroundColor: cushion.color }} />}
          {teddy?.owned && <span className="absolute bottom-[60%] right-[25%] text-sm">🧸</span>}
        </div>
      )}

      {chair?.owned && (
        <div className="absolute bottom-[28%] right-[38%] w-[10%] h-[16%]">
          <div className="absolute bottom-0 w-full h-[60%] rounded-lg shadow-md" style={{ backgroundColor: chair.color }} />
          <div className="absolute bottom-[45%] left-0 w-full h-[55%] rounded-t-lg" style={{ backgroundColor: chair.color, filter: 'brightness(0.92)' }} />
        </div>
      )}

      {bed?.owned && (
        <div className="absolute bottom-[28%] right-[3%] w-[20%] h-[20%]">
          <div className="absolute bottom-0 w-full h-[60%] rounded-lg shadow-md" style={{ backgroundColor: bed.color }} />
          <div className="absolute bottom-[55%] left-[5%] right-[5%] h-[25%] bg-white rounded-lg shadow-sm border border-[#fbcfe8]" />
          <div className="absolute bottom-[72%] left-[8%] w-[30%] h-[18%] bg-white rounded-full shadow-sm" />
        </div>
      )}

      <div className={`absolute bottom-[30%] left-[22%] animate-cat-walk z-10 ${isDarkWall ? 'drop-shadow-[0_0_4px_white]' : ''}`}>
        <span className="text-2xl block drop-shadow-sm">🐱</span>
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-1 bg-black/10 rounded-full blur-sm" />
      </div>
    </div>
  )
}
