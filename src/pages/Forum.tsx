import { useState } from 'react'
import { Eye, Heart, MessageCircle, Plus, Search, Send, TrendingUp } from 'lucide-react'
import { AVATAR_OPTIONS } from '../data/initialData'
import { useAppStore } from '../store/useAppStore'

const HOT_TAGS = ['学习方法', '考研', '编程', '番茄钟', '自律', '效率']

export default function Forum() {
  const { forumPosts, likePost, addComment, createPost, user } = useAppStore()
  const [showCreate, setShowCreate] = useState(false)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [commentText, setCommentText] = useState<Record<string, string>>({})
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [avatar, setAvatar] = useState(user.avatar)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('')

  const filtered = forumPosts.filter((p) => {
    const matchSearch =
      !search || p.title.includes(search) || p.content.includes(search) || p.author.includes(search)
    const matchTag = !activeTag || p.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  const hotPost = [...forumPosts].sort((a, b) => b.likes - a.likes)[0]

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return
    createPost(
      user.name || '我',
      avatar,
      title.trim(),
      content.trim(),
      tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
    )
    setTitle('')
    setContent('')
    setTags('')
    setShowCreate(false)
  }

  const handleComment = (postId: string) => {
    const text = commentText[postId]?.trim()
    if (!text) return
    addComment(postId, user.name || '我', text)
    setCommentText((prev) => ({ ...prev, [postId]: '' }))
  }

  return (
    <div className="page-enter space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#3d3428]">学习论坛</h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b6914] to-[#c4a35a] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={16} />
          发帖
        </button>
      </div>

      {/* 搜索 */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4b5a0]" />
        <input
          placeholder="搜索帖子..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8dfd0] bg-white/70 focus:outline-none focus:border-[#c4a35a]"
        />
      </div>

      {/* 热门标签 */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-1">
        <button
          onClick={() => setActiveTag('')}
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            !activeTag ? 'bg-[#8b6914] text-white' : 'glass-card text-[#8b7d6b]'
          }`}
        >
          全部
        </button>
        {HOT_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeTag === tag ? 'bg-[#8b6914] text-white' : 'glass-card text-[#8b7d6b] hover:text-[#8b6914]'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* 热帖 */}
      {!search && !activeTag && hotPost && (
        <div className="glass-card rounded-2xl p-4 border border-[#c4a35a]/20 bg-gradient-to-r from-[#fff8e7]/60 to-transparent">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={14} className="text-[#c4a35a]" />
            <span className="text-xs font-semibold text-[#8b6914]">热门帖子</span>
          </div>
          <button onClick={() => setExpandedPost(hotPost.id)} className="text-left w-full">
            <p className="font-bold text-sm">{hotPost.avatar} {hotPost.title}</p>
            <p className="text-xs text-[#8b7d6b] mt-0.5">❤️ {hotPost.likes} · 💬 {hotPost.comments.length}</p>
          </button>
        </div>
      )}

      {showCreate && (
        <div className="glass-card rounded-2xl p-5 shadow-md space-y-3 animate-scale-in">
          <div className="flex gap-1.5 flex-wrap">
            {AVATAR_OPTIONS.slice(0, 8).map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-xl w-9 h-9 rounded-lg transition-all ${
                  avatar === a ? 'bg-[#f5ebe0] ring-2 ring-[#c4a35a]' : 'hover:bg-white/50'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <input
            placeholder="标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#e8dfd0] focus:outline-none focus:border-[#c4a35a]"
          />
          <textarea
            placeholder="分享你的学习心得..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 rounded-xl border border-[#e8dfd0] focus:outline-none focus:border-[#c4a35a] resize-none"
          />
          <input
            placeholder="标签，用逗号分隔"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#e8dfd0] focus:outline-none focus:border-[#c4a35a]"
          />
          <button onClick={handleCreate} className="w-full py-2.5 rounded-xl bg-[#8b6914] text-white font-medium">
            发布
          </button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((post) => (
          <article key={post.id} className="glass-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl w-10 h-10 rounded-xl bg-[#f5ebe0] flex items-center justify-center">
                {post.avatar}
              </span>
              <div>
                <p className="font-semibold text-sm text-[#3d3428]">{post.author}</p>
                <p className="text-[10px] text-[#8b7d6b]">{post.createdAt}</p>
              </div>
            </div>
            <h3 className="font-bold text-[#3d3428] mb-1">{post.title}</h3>
            <p className="text-sm text-[#5a4f42] leading-relaxed line-clamp-3">{post.content}</p>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5ebe0] text-[#8b6914] font-medium">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#f5ebe0]">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center gap-1 text-xs text-[#8b7d6b] hover:text-red-400 transition-colors"
              >
                <Heart size={14} />
                {post.likes}
              </button>
              <button
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                className="flex items-center gap-1 text-xs text-[#8b7d6b] hover:text-[#8b6914] transition-colors"
              >
                <MessageCircle size={14} />
                {post.comments.length}
              </button>
              {post.views !== undefined && (
                <span className="flex items-center gap-1 text-xs text-[#c4b5a0]">
                  <Eye size={14} />
                  {post.views}
                </span>
              )}
            </div>

            {expandedPost === post.id && (
              <div className="mt-3 space-y-2 animate-fade-in">
                {post.comments.map((c) => (
                  <div key={c.id} className="bg-[#faf6f0] rounded-xl p-3">
                    <p className="text-xs font-semibold text-[#8b6914]">{c.author}</p>
                    <p className="text-sm text-[#5a4f42]">{c.content}</p>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    placeholder="写评论..."
                    value={commentText[post.id] || ''}
                    onChange={(e) =>
                      setCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-[#e8dfd0] text-sm focus:outline-none focus:border-[#c4a35a]"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="px-3 py-2 rounded-xl bg-[#8b6914] text-white"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
