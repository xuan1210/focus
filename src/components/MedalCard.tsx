import type { Medal } from '../types'

type Props = { medal: Medal; compact?: boolean }

export default function MedalCard({ medal, compact }: Props) {
  const earned = medal.earned

  return (
    <div
      className={`relative rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
        earned
          ? 'border-[#c4a35a]/60 bg-gradient-to-br from-[#fff8e7] via-white to-[#f5ebe0] shadow-md'
          : 'border-[#e8dfd0]/80 bg-white/50 opacity-50'
      } ${compact ? 'p-2.5' : 'p-4'} ${earned ? '' : 'grayscale'}`}
    >
      {earned && (
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#c4a35a] rounded-full animate-pulse-ring" />
      )}
      <div className={`text-center ${compact ? 'text-xl' : 'text-4xl'} mb-0.5`}>
        {medal.icon}
      </div>
      <h4 className={`font-bold text-center ${compact ? 'text-[10px]' : 'text-sm'} text-[#3d3428] leading-tight`}>
        {medal.name}
      </h4>
      {!compact && (
        <>
          <p className="text-xs text-[#8b7d6b] text-center mt-1">{medal.description}</p>
          {earned && medal.earnedAt && (
            <p className="text-[10px] text-[#c4a35a] text-center mt-2">获得于 {medal.earnedAt}</p>
          )}
        </>
      )}
    </div>
  )
}
