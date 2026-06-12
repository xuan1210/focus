import type { FloorItem, FurnitureColor, FurnitureItem, ForumPost, KnowledgeArticle, Medal, StudyRoom, WallpaperItem } from '../types'

export const FURNITURE_COLORS: FurnitureColor[] = [
  { id: 'oak', name: '橡木色', hex: '#c4a35a' },
  { id: 'walnut', name: '胡桃木', hex: '#5c4033' },
  { id: 'white', name: '雪白', hex: '#f5f5f0' },
  { id: 'mint', name: '薄荷绿', hex: '#95d5b2' },
  { id: 'sky', name: '天空蓝', hex: '#a8c5d9' },
  { id: 'rose', name: '玫瑰粉', hex: '#d4a5a5' },
  { id: 'lavender', name: '薰衣草', hex: '#b8a9c9' },
  { id: 'coral', name: '珊瑚橙', hex: '#e8a87c' },
]

export const INITIAL_MEDALS: Medal[] = [
  { id: 'm1', name: '初露锋芒', description: '累计学习 30 分钟', icon: '🌱', requiredMinutes: 30, earned: false },
  { id: 'm2', name: '专注新手', description: '累计学习 1 小时', icon: '📚', requiredMinutes: 60, earned: false },
  { id: 'm3', name: '学习达人', description: '累计学习 3 小时', icon: '⭐', requiredMinutes: 180, earned: false },
  { id: 'm4', name: '专注大师', description: '累计学习 6 小时', icon: '🏆', requiredMinutes: 360, earned: false },
  { id: 'm5', name: '学霸传说', description: '累计学习 12 小时', icon: '👑', requiredMinutes: 720, earned: false },
  { id: 'm6', name: '七日坚持', description: '连续学习 7 天', icon: '🔥', requiredMinutes: 0, earned: false },
  { id: 'm7', name: '夜猫子', description: '在 22:00 后完成一次学习', icon: '🌙', requiredMinutes: 0, earned: false },
  { id: 'm8', name: '早起鸟', description: '在 7:00 前完成一次学习', icon: '🌅', requiredMinutes: 0, earned: false },
  { id: 'm9', name: '百炼成钢', description: '累计学习 24 小时', icon: '💎', requiredMinutes: 1440, earned: false },
  { id: 'm10', name: '家具收藏家', description: '拥有全部家具', icon: '🏡', requiredMinutes: 0, earned: false },
  { id: 'm11', name: '论坛达人', description: '发布 3 篇帖子', icon: '✍️', requiredMinutes: 0, earned: false },
  { id: 'm12', name: '博览群书', description: '阅读 5 篇科普文章', icon: '📖', requiredMinutes: 0, earned: false },
]

export const INITIAL_FURNITURE: FurnitureItem[] = [
  { type: 'desk', name: '书桌', icon: '🪑', price: 0, owned: true, color: '#f472b6' },
  { type: 'window', name: '窗户', icon: '🪟', price: 30, owned: false, color: '#a8c5d9' },
  { type: 'wardrobe', name: '衣柜', icon: '🚪', price: 50, owned: false, color: '#be185d' },
  { type: 'bed', name: '小床', icon: '🛏️', price: 80, owned: false, color: '#fbcfe8' },
  { type: 'lamp', name: '台灯', icon: '💡', price: 25, owned: false, color: '#fbbf24' },
  { type: 'plant', name: '绿植', icon: '🪴', price: 20, owned: false, color: '#95d5b2' },
  { type: 'rug', name: '地毯', icon: '🧶', price: 35, owned: false, color: '#f9a8d4' },
  { type: 'bookshelf', name: '书架', icon: '📚', price: 60, owned: false, color: '#be185d' },
  { type: 'ceiling_lamp', name: '吊灯', icon: '🔆', price: 45, owned: false, color: '#fde68a' },
  { type: 'sofa', name: '沙发', icon: '🛋️', price: 90, owned: false, color: '#f472b6' },
  { type: 'chair', name: '扶手椅', icon: '💺', price: 40, owned: false, color: '#ec4899' },
  { type: 'clock', name: '挂钟', icon: '🕰️', price: 30, owned: false, color: '#fcd34d' },
  { type: 'painting', name: '挂画', icon: '🖼️', price: 35, owned: false, color: '#c084fc' },
  { type: 'mirror', name: '镜子', icon: '🪞', price: 28, owned: false, color: '#e0e7ff' },
  { type: 'cushion', name: '抱枕', icon: '🛋️', price: 15, owned: false, color: '#fda4af' },
  { type: 'candle', name: '香薰蜡烛', icon: '🕯️', price: 18, owned: false, color: '#fef3c7' },
  { type: 'fishbowl', name: '鱼缸', icon: '🐠', price: 55, owned: false, color: '#67e8f9' },
  { type: 'guitar', name: '吉他', icon: '🎸', price: 70, owned: false, color: '#d97706' },
  { type: 'floor_lamp', name: '落地灯', icon: '🏮', price: 38, owned: false, color: '#fb923c' },
  { type: 'curtain', name: '窗帘', icon: '🪭', price: 32, owned: false, color: '#f9a8d4' },
  { type: 'teddy', name: '泰迪熊', icon: '🧸', price: 22, owned: false, color: '#d4a574' },
  { type: 'poster', name: '励志海报', icon: '📋', price: 12, owned: false, color: '#a78bfa' },
  { type: 'shelf', name: '置物架', icon: '🗄️', price: 42, owned: false, color: '#f472b6' },
]

export const INITIAL_WALLPAPERS: WallpaperItem[] = [
  { id: 'wp1', name: '樱花粉', icon: '🌸', price: 0, owned: true, css: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)' },
  { id: 'wp2', name: '条纹粉', icon: '🎀', price: 20, owned: false, css: 'repeating-linear-gradient(90deg, #fce7f3 0px, #fce7f3 20px, #fbcfe8 20px, #fbcfe8 40px)' },
  { id: 'wp3', name: '波点甜', icon: '💗', price: 25, owned: false, css: 'radial-gradient(circle, #f9a8d4 3px, transparent 3px), linear-gradient(180deg, #fdf2f8, #fce7f3)' },
  { id: 'wp4', name: '格子学院', icon: '📐', price: 30, owned: false, css: 'linear-gradient(90deg, #fbcfe8 1px, transparent 1px), linear-gradient(#fbcfe8 1px, transparent 1px), #fce7f3' },
  { id: 'wp5', name: '薰衣草', icon: '💜', price: 28, owned: false, css: 'linear-gradient(180deg, #f5f0f8 0%, #e9d5ff 100%)' },
  { id: 'wp6', name: '天空蓝', icon: '☁️', price: 28, owned: false, css: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)' },
  { id: 'wp7', name: '薄荷清新', icon: '🍃', price: 25, owned: false, css: 'linear-gradient(180deg, #ecfdf5 0%, #a7f3d0 100%)' },
  { id: 'wp8', name: '暖黄夕照', icon: '🌅', price: 30, owned: false, css: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)' },
  { id: 'wp9', name: '星空紫', icon: '✨', price: 35, owned: false, css: 'radial-gradient(circle at 20% 30%, #c084fc33 2px, transparent 2px), radial-gradient(circle at 70% 60%, #a78bfa33 2px, transparent 2px), linear-gradient(180deg, #1e1b4b, #312e81)' },
  { id: 'wp10', name: '几何现代', icon: '🔷', price: 32, owned: false, css: 'linear-gradient(135deg, #fce7f3 25%, transparent 25%), linear-gradient(225deg, #fce7f3 25%, transparent 25%), linear-gradient(45deg, #fce7f3 25%, transparent 25%), linear-gradient(315deg, #fce7f3 25%, #fdf2f8 25%)' },
]

export const INITIAL_FLOORS: FloorItem[] = [
  { id: 'fl1', name: '原木色', icon: '🪵', price: 0, owned: true, css: 'repeating-linear-gradient(90deg, #f9a8d4 0px, #f9a8d4 40px, #f472b6 40px, #f472b6 80px)' },
  { id: 'fl2', name: '深胡桃', icon: '🟫', price: 20, owned: false, css: 'repeating-linear-gradient(90deg, #be185d 0px, #be185d 40px, #9d174d 40px, #9d174d 80px)' },
  { id: 'fl3', name: '浅色橡木', icon: '🪵', price: 18, owned: false, css: 'repeating-linear-gradient(90deg, #fbcfe8 0px, #fbcfe8 40px, #f9a8d4 40px, #f9a8d4 80px)' },
  { id: 'fl4', name: '大理石白', icon: '⬜', price: 35, owned: false, css: 'linear-gradient(135deg, #fdf2f8 25%, #fce7f3 25%, #fce7f3 50%, #fdf2f8 50%, #fdf2f8 75%, #fce7f3 75%)' },
  { id: 'fl5', name: '棋盘格', icon: '♟️', price: 25, owned: false, css: 'repeating-conic-gradient(#fbcfe8 0% 25%, #f9a8d4 0% 50%) 0 0 / 24px 24px' },
  { id: 'fl6', name: '瓷砖蓝', icon: '🔲', price: 28, owned: false, css: 'repeating-linear-gradient(0deg, #bae6fd 0px, #bae6fd 20px, #7dd3fc 20px, #7dd3fc 40px), repeating-linear-gradient(90deg, #bae6fd 0px, #bae6fd 20px, #7dd3fc 20px, #7dd3fc 40px)' },
  { id: 'fl7', name: '软绒地毯', icon: '🧶', price: 30, owned: false, css: 'repeating-linear-gradient(45deg, #fda4af 0px, #fda4af 8px, #fb7185 8px, #fb7185 16px)' },
  { id: 'fl8', name: '复古花砖', icon: '🌺', price: 32, owned: false, css: 'radial-gradient(circle, #f472b6 4px, transparent 4px), linear-gradient(90deg, #fce7f3 50%, #fbcfe8 50%)' },
]

export const INITIAL_STUDY_ROOMS: StudyRoom[] = [
  { id: 'r1', name: '清晨自习室', description: '适合早起学习，氛围安静温馨，窗外鸟鸣相伴', memberCount: 12, maxMembers: 30, tags: ['安静', '早起'], isJoined: false, mood: '🌅 宁静', activeNow: 8 },
  { id: 'r2', name: '深夜奋斗营', description: '夜猫子的专属空间，台灯微光，一起加油', memberCount: 28, maxMembers: 50, tags: ['夜猫', '考研'], isJoined: false, mood: '🌙 专注', activeNow: 22 },
  { id: 'r3', name: '编程专注间', description: '程序员聚集地，键盘声是最好的白噪音', memberCount: 15, maxMembers: 25, tags: ['编程', '技术'], isJoined: false, mood: '💻 高效', activeNow: 11 },
  { id: 'r4', name: '语言学习角', description: '多语言爱好者交流学习心得，每日口语打卡', memberCount: 8, maxMembers: 20, tags: ['语言', '口语'], isJoined: false, mood: '🗣️ 活跃', activeNow: 5 },
  { id: 'r5', name: '考研冲刺班', description: '考研路上不孤单，互相监督，共同进步', memberCount: 42, maxMembers: 60, tags: ['考研', '冲刺'], isJoined: true, mood: '📕 紧张', activeNow: 35 },
  { id: 'r6', name: '文学静读阁', description: '阅读与写作爱好者的静谧天地', memberCount: 6, maxMembers: 15, tags: ['阅读', '写作'], isJoined: false, mood: '📜 悠然', activeNow: 4 },
  { id: 'r7', name: '设计创意坊', description: '设计师与创意工作者的灵感空间', memberCount: 10, maxMembers: 20, tags: ['设计', '创意'], isJoined: false, mood: '🎨 灵感', activeNow: 7 },
  { id: 'r8', name: '考证联盟', description: '各类资格证考试备考，资源共享', memberCount: 33, maxMembers: 45, tags: ['考证', '刷题'], isJoined: false, mood: '📝 奋斗', activeNow: 28 },
]

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'p1', author: '学习小达人', avatar: '🦊', title: '分享我的番茄钟学习法，一个月效率翻倍',
    content: '每天设定 25 分钟专注 + 5 分钟休息，效率提升了很多！关键是休息时候不要刷手机，站起来走走或者喝水。坚持一个月，日均学习从 2 小时提升到 4 小时。',
    likes: 124, views: 890, createdAt: '2026-06-10', tags: ['学习方法', '番茄钟'],
    comments: [
      { id: 'c1', author: '夜猫子', content: '我也在用这个，确实有效！', createdAt: '2026-06-10' },
      { id: 'c2', author: '考研人', content: '请问休息时候做什么比较好？', createdAt: '2026-06-11' },
      { id: 'c3', author: '学习小达人', content: '推荐做拉伸、喝水、看看窗外，避免接触屏幕', createdAt: '2026-06-11' },
    ],
  },
  {
    id: 'p2', author: '考研战士', avatar: '🐻', title: '考研倒计时 180 天，我的每日作息表',
    content: '距离考试还有半年，分享我的作息：6:30 起床 → 7:00-12:00 专业课 → 午休 → 14:00-18:00 政治英语 → 19:00-22:00 刷题复盘。创建了自习室欢迎大家加入！',
    likes: 256, views: 1520, createdAt: '2026-06-09', tags: ['考研', '打卡'],
    comments: [
      { id: 'c4', author: '小书虫', content: '加油！我也在备考', createdAt: '2026-06-09' },
      { id: 'c5', author: '努力鸭', content: '作息好规律，向你学习', createdAt: '2026-06-10' },
    ],
  },
  {
    id: 'p3', author: '代码萌新', avatar: '🐱', title: '自学编程三个月的心得与踩坑记录',
    content: '从零基础到能写小项目，最重要的是每天坚持。推荐先学基础再动手做项目。我走过的弯路：不要一上来就追最新框架，把 JS/Python 基础打牢更重要。',
    likes: 189, views: 2100, createdAt: '2026-06-08', tags: ['编程', '自学'],
    comments: [
      { id: 'c6', author: '全栈选手', content: '说得对，基础最重要', createdAt: '2026-06-08' },
    ],
  },
  {
    id: 'p4', author: '日语爱好者', avatar: '🐰', title: 'N2 备考经验：听力满分技巧分享',
    content: '听力是从 N3 到 N2 最大的坎。我的方法：每天精听 1 段 5 分钟材料，反复听写直到完全听懂。坚持 3 个月听力从 30 分提到 55 分。',
    likes: 98, views: 670, createdAt: '2026-06-07', tags: ['语言', '日语'],
    comments: [],
  },
  {
    id: 'p5', author: '设计师小白', avatar: '🎨', title: '如何打造不分散注意力的学习桌面',
    content: '桌面只放当前学习需要的东西，手机放远处。一盏暖色台灯 + 一杯水 + 计时器，就是全部。整洁的环境让专注力提升 20% 以上。',
    likes: 167, views: 980, createdAt: '2026-06-06', tags: ['环境', '效率'],
    comments: [
      { id: 'c7', author: '极简主义', content: '少即是多！', createdAt: '2026-06-06' },
    ],
  },
  {
    id: 'p6', author: '医学生', avatar: '🩺', title: '医学生如何高效记忆大量知识点',
    content: '解剖和药理需要大量记忆。我的方法：思维导图 + 间隔重复 + 费曼讲解。把知识点讲给室友听，讲不清楚的就是没掌握的部分。',
    likes: 203, views: 1340, createdAt: '2026-06-05', tags: ['医学', '记忆'],
    comments: [],
  },
]

export const INITIAL_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'a1', title: '番茄工作法：25 分钟改变你的学习效率', category: '学习方法', author: '效率研究所',
    summary: '了解番茄工作法的原理与实践技巧，让专注成为习惯。',
    content: '番茄工作法由 Francesco Cirillo 于 1980 年代发明。核心是将工作划分为 25 分钟的专注时段，每个时段后休息 5 分钟。\n\n研究表明，人的注意力集中时间约为 20-45 分钟。番茄工作法恰好利用了这一规律。\n\n实践建议：\n1. 选择一个待完成的任务\n2. 设置 25 分钟计时器\n3. 专注工作直到计时器响起\n4. 短暂休息 5 分钟\n5. 每 4 个番茄钟后休息 15-30 分钟\n\n进阶技巧：记录每日完成的番茄钟数量，观察自己的效率曲线，逐步调整专注时长。',
    readTime: 5, cover: '🍅', liked: false,
  },
  {
    id: 'a2', title: '费曼学习法：以教代学的神奇效果', category: '学习方法', author: '认知科学周刊',
    summary: '用简单语言向他人解释复杂概念，是检验理解程度的最佳方式。',
    content: '费曼学习法由诺贝尔物理学奖得主 Richard Feynman 提出，包含四个步骤：\n\n1. 选择概念：确定你想学习的主题\n2. 教授他人：用简单语言向"学生"解释\n3. 发现漏洞：在解释过程中找出不理解的部分\n4. 回顾简化：回到原材料，重新学习薄弱环节\n\n这种方法强迫你深度思考，而不是表面记忆。费曼曾说："如果你不能简单地解释它，说明你还没有真正理解它。"',
    readTime: 6, cover: '🎓', liked: false,
  },
  {
    id: 'a3', title: '睡眠与学习：为什么熬夜反而降低效率', category: '健康科普', author: '神经科学前沿',
    summary: '科学解释睡眠如何影响记忆巩固和学习效果。',
    content: '睡眠期间，大脑会进行记忆巩固——将短期记忆转化为长期记忆。研究表明，学习后充足的睡眠能显著提升记忆保持率。\n\n熬夜学习的代价：\n- 注意力下降 30-50%\n- 记忆力减退\n- 创造力降低\n- 情绪不稳定\n\n建议：保证 7-8 小时睡眠，睡前 1 小时避免使用电子设备。如果必须晚上学习，建议在 23:00 前结束，给大脑留出整理记忆的时间。',
    readTime: 4, cover: '😴', liked: false,
  },
  {
    id: 'a4', title: '间隔重复：科学记忆的黄金法则', category: '记忆科学', author: '记忆实验室',
    summary: '利用遗忘曲线规律，在最佳时间点复习，事半功倍。',
    content: '德国心理学家艾宾浩斯发现，遗忘在学习之后立即开始。间隔重复法利用这一规律，在即将遗忘时进行复习。\n\n推荐间隔：\n- 第 1 次复习：学习后 1 天\n- 第 2 次复习：学习后 3 天\n- 第 3 次复习：学习后 7 天\n- 第 4 次复习：学习后 14 天\n- 第 5 次复习：学习后 30 天\n\n使用闪卡应用可以自动安排复习计划。关键是信任系统，不要在还没到期时就反复复习。',
    readTime: 5, cover: '🧠', liked: false,
  },
  {
    id: 'a5', title: '环境心理学：打造你的理想学习空间', category: '环境设计', author: '空间设计志',
    summary: '光线、温度、噪音如何影响专注力，以及如何优化。',
    content: '研究表明，学习环境对效率有显著影响：\n\n光线：自然光最佳，色温 4000-5000K 的暖白光次之。避免过暗或过亮。\n\n温度：20-24°C 为最佳学习温度。过热或过冷都会分散注意力。\n\n噪音：45 分贝以下为宜。白噪音或轻音乐可以帮助部分人集中。\n\n整洁度：桌面整洁能减少视觉干扰，提升专注力 15-20%。\n\n植物：桌面放置绿植可以降低压力激素水平，提升幸福感。',
    readTime: 4, cover: '🏠', liked: false,
  },
  {
    id: 'a6', title: '多巴胺与学习：如何建立正向反馈循环', category: '心理学', author: '行为科学',
    summary: '理解大脑奖励机制，让学习本身变得令人期待。',
    content: '多巴胺不是"快乐分子"，而是"动机分子"——它驱动我们去追求奖励。\n\n学习中的多巴胺陷阱：刷短视频能获得即时多巴胺，而学习回报是延迟的。\n\n建立正向循环的方法：\n1. 设定小目标，每完成一个就给自己即时奖励\n2. 记录进步，可视化成长曲线\n3. 社交学习，加入学习小组获得归属感\n4. 游戏化，用积分、勋章增加趣味性\n\n专注小屋的积分和勋章系统正是基于这一原理设计。',
    readTime: 6, cover: '🎯', liked: false,
  },
  {
    id: 'a7', title: '刻意练习：从普通到卓越的路径', category: '学习方法', author: '成长思维',
    summary: '安德斯·艾利克森的研究揭示，天赋不如练习方式重要。',
    content: '刻意练习不同于简单重复，它有四个要素：\n\n1. 明确目标：每次练习聚焦一个具体技能点\n2. 即时反馈：知道自己哪里做对了、做错了\n3. 走出舒适区：练习略高于当前水平的任务\n4. 高度专注：练习时全神贯注，而非心不在焉\n\n每天 1 小时的刻意练习，胜过 3 小时的漫无目的学习。配合番茄钟，在专注时段内进行刻意练习，效果最佳。',
    readTime: 7, cover: '🏋️', liked: false,
  },
  {
    id: 'a8', title: '正念冥想：5 分钟恢复专注力', category: '健康科普', author: '身心健康',
    summary: '学习间隙的简单冥想练习，快速恢复注意力。',
    content: '当感到注意力涣散时，尝试这个 5 分钟冥想：\n\n1. 坐直，双脚平放地面（30 秒）\n2. 闭眼，关注呼吸，吸气数 4 拍，呼气数 6 拍（2 分钟）\n3. 如果走神，温和地把注意力拉回呼吸（1 分钟）\n4. 感受身体放松，慢慢睁眼（1 分钟）\n\n研究表明，8 周的正念练习可以增厚大脑前额叶皮层，提升专注力和情绪调节能力。不需要特殊场地，书桌前就能完成。',
    readTime: 3, cover: '🧘', liked: false,
  },
  {
    id: 'a9', title: '康奈尔笔记法：课堂与自学的最佳伴侣', category: '学习方法', author: '笔记达人',
    summary: '将笔记页面三分，让复习效率提升一倍。',
    content: '康奈尔笔记法将页面分为三个区域：\n\n笔记区（右侧 70%）：记录课堂或阅读内容\n线索区（左侧 30%）：写关键词和问题\n总结区（底部）：用 2-3 句话概括整页内容\n\n复习时遮住笔记区，根据线索区的问题回忆内容——这正是主动回忆的最佳实践。\n\n建议配合间隔重复：第一次复习在 24 小时内，之后按 3-7-14-30 天间隔进行。',
    readTime: 5, cover: '📝', liked: false,
  },
  {
    id: 'a10', title: '运动与学习：身体活动如何促进大脑功能', category: '健康科普', author: '运动科学',
    summary: '适度的有氧运动能提升记忆力、创造力和学习效率。',
    content: '运动时大脑分泌 BDNF（脑源性神经营养因子），促进神经元生长和突触连接。\n\n研究数据：\n- 20 分钟中等强度运动可提升注意力 2 小时\n- 每周 3 次有氧运动，记忆力提升 15-20%\n- 学习前运动比学习后运动效果更好\n\n建议：每完成 2 个番茄钟，做 5 分钟拉伸或原地踏步。久坐不仅影响身体，也会降低大脑供氧量。',
    readTime: 4, cover: '🏃', liked: false,
  },
]

export const AVATAR_OPTIONS = ['🦊', '🐻', '🐱', '🐰', '🐼', '🦉', '🐸', '🐧', '🦁', '🐶', '🐨', '🦄']

export const THEME_OPTIONS = [
  { id: 'pink' as const, name: '樱花粉梦', preview: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', accent: '#db2777' },
  { id: 'forest' as const, name: '森林绿意', preview: 'linear-gradient(135deg, #f0f5f0, #d4e4d4)', accent: '#4a7c59' },
  { id: 'ocean' as const, name: '海洋清风', preview: 'linear-gradient(135deg, #f0f4f8, #d4e4f0)', accent: '#3d6b8e' },
  { id: 'lavender' as const, name: '薰衣草梦', preview: 'linear-gradient(135deg, #f5f0f8, #e4d8f0)', accent: '#7c5c9a' },
]
