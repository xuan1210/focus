import { useState } from 'react'
import { BookOpen, Clock, Heart, Search, TrendingUp } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const CATEGORIES = ['全部', '学习方法', '健康科普', '记忆科学', '环境设计', '心理学']

export default function Knowledge() {
  const { articles, toggleArticleLike, readArticle } = useAppStore()
  const [category, setCategory] = useState('全部')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = articles.filter((a) => {
    const matchCat = category === '全部' || a.category === category
    const matchSearch =
      !search ||
      a.title.includes(search) ||
      a.summary.includes(search) ||
      a.category.includes(search)
    return matchCat && matchSearch
  })

  const selected = articles.find((a) => a.id === selectedId)
  const likedCount = articles.filter((a) => a.liked).length

  if (selected) {
    return (
      <div className="page-enter space-y-4">
        <button
          onClick={() => setSelectedId(null)}
          className="text-sm text-[#8b6914] hover:underline flex items-center gap-1"
        >
          ← 返回列表
        </button>
        <article className="glass-card rounded-2xl p-6 shadow-md">
          <span className="text-5xl block mb-3">{selected.cover}</span>
          <h2 className="text-xl font-bold text-[#3d3428]">{selected.title}</h2>
          <div className="flex items-center gap-3 mt-2 text-sm text-[#8b7d6b] flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#f5ebe0] text-[#8b6914] text-xs font-medium">
              {selected.category}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Clock size={13} />
              {selected.readTime} 分钟
            </span>
            {selected.author && (
              <span className="text-xs">✍️ {selected.author}</span>
            )}
          </div>
          <div className="mt-5 text-[#5a4f42] leading-relaxed whitespace-pre-line text-sm">
            {selected.content}
          </div>
          <button
            onClick={() => toggleArticleLike(selected.id)}
            className={`mt-5 flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl transition-colors ${
              selected.liked
                ? 'bg-red-50 text-red-400'
                : 'bg-[#f5ebe0] text-[#8b7d6b] hover:text-red-400'
            }`}
          >
            <Heart size={16} fill={selected.liked ? 'currentColor' : 'none'} />
            {selected.liked ? '已收藏' : '收藏文章'}
          </button>
        </article>
      </div>
    )
  }

  return (
    <div className="page-enter space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#3d3428] flex items-center gap-2">
          <BookOpen size={22} className="text-[#8b6914]" />
          知识科普
        </h2>
        <span className="text-xs text-[#8b7d6b] bg-[#f5ebe0] px-2 py-1 rounded-full">
          已收藏 {likedCount}
        </span>
      </div>

      {/* 搜索 */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4b5a0]" />
        <input
          placeholder="搜索文章..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8dfd0] bg-white/70 focus:outline-none focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20"
        />
      </div>

      {/* 分类 */}
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-gradient-to-r from-[#8b6914] to-[#c4a35a] text-white shadow-md'
                : 'glass-card text-[#8b7d6b] hover:text-[#8b6914]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 推荐 */}
      {!search && category === '全部' && (
        <div className="glass-card rounded-2xl p-4 border border-[#c4a35a]/20 bg-gradient-to-r from-[#fff8e7]/80 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-[#c4a35a]" />
            <span className="text-sm font-semibold text-[#8b6914]">今日推荐</span>
          </div>
          <button
            onClick={() => {
              setSelectedId('a1')
              readArticle('a1')
            }}
            className="text-left w-full"
          >
            <p className="font-bold text-sm text-[#3d3428]">🍅 番茄工作法：25 分钟改变你的学习效率</p>
            <p className="text-xs text-[#8b7d6b] mt-0.5">最适合新手入门的专注学习方法</p>
          </button>
        </div>
      )}

      {/* 文章列表 */}
      <div className="space-y-3">
        {filtered.map((article, i) => (
          <button
            key={article.id}
            onClick={() => {
              setSelectedId(article.id)
              readArticle(article.id)
            }}
            className="w-full text-left glass-card rounded-2xl p-4 hover:shadow-md hover:scale-[1.01] transition-all border border-transparent hover:border-[#c4a35a]/20 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f5ebe0] flex items-center justify-center text-2xl shrink-0">
                {article.cover}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#3d3428] line-clamp-1">{article.title}</h3>
                <p className="text-xs text-[#8b7d6b] mt-0.5 line-clamp-2 leading-relaxed">{article.summary}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5ebe0] text-[#8b6914] font-medium">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-[#8b7d6b] flex items-center gap-0.5">
                    <Clock size={10} />
                    {article.readTime}min
                  </span>
                  {article.liked && <Heart size={10} className="text-red-400" fill="currentColor" />}
                </div>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-[#8b7d6b] py-8">没有找到相关文章</p>
        )}
      </div>
    </div>
  )
}
