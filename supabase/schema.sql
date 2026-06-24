-- 专注小屋 Supabase 数据库结构
-- 在 Supabase Dashboard → SQL Editor 中执行此文件

-- ========== 用户资料 ==========
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '学习者',
  avatar text not null default '🐱',
  email text,
  motto text not null default '每天进步一点点',
  join_date date default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ========== 用户学习进度（JSON 存储复杂状态）==========
create table if not exists public.user_progress (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  total_study_minutes integer not null default 0,
  points integer not null default 20,
  streak integer not null default 0,
  last_study_date date,
  today_minutes integer not null default 0,
  sessions_completed integer not null default 0,
  posts_created integer not null default 0,
  active_wallpaper_id text not null default 'wp1',
  active_floor_id text not null default 'fl1',
  settings jsonb not null default '{}'::jsonb,
  timer_settings jsonb not null default '{}'::jsonb,
  medals jsonb not null default '[]'::jsonb,
  furniture jsonb not null default '[]'::jsonb,
  wallpapers jsonb not null default '[]'::jsonb,
  floors jsonb not null default '[]'::jsonb,
  weekly_records jsonb not null default '[]'::jsonb,
  articles_read jsonb not null default '[]'::jsonb,
  joined_room_ids jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ========== 科普文章（公共内容）==========
create table if not exists public.articles (
  id text primary key,
  title text not null,
  summary text not null default '',
  content text not null default '',
  category text not null default '',
  read_time integer not null default 5,
  cover text not null default '📖',
  author text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ========== 自习室 ==========
create table if not exists public.study_rooms (
  id text primary key,
  name text not null,
  description text not null default '',
  member_count integer not null default 0,
  max_members integer not null default 30,
  tags text[] not null default '{}',
  mood text,
  active_now integer not null default 0,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ========== 论坛帖子 ==========
create table if not exists public.forum_posts (
  id text primary key,
  user_id uuid references public.profiles(id) on delete set null,
  author text not null,
  avatar text not null default '🐱',
  title text not null,
  content text not null,
  likes integer not null default 0,
  views integer not null default 0,
  tags text[] not null default '{}',
  created_at date not null default current_date
);

-- ========== 论坛评论 ==========
create table if not exists public.forum_comments (
  id text primary key,
  post_id text not null references public.forum_posts(id) on delete cascade,
  author text not null,
  content text not null,
  created_at date not null default current_date
);

-- ========== 文章收藏 ==========
create table if not exists public.article_likes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  article_id text not null references public.articles(id) on delete cascade,
  primary key (user_id, article_id)
);

-- ========== 索引 ==========
create index if not exists idx_forum_posts_created on public.forum_posts(created_at desc);
create index if not exists idx_forum_comments_post on public.forum_comments(post_id);
create index if not exists idx_articles_category on public.articles(category);

-- ========== 自动创建 profile ==========
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar, email, join_date)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', '学习者'),
    coalesce(new.raw_user_meta_data->>'avatar', '🐱'),
    new.email,
    current_date
  )
  on conflict (id) do nothing;

  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ========== updated_at 触发器 ==========
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists user_progress_updated_at on public.user_progress;
create trigger user_progress_updated_at
  before update on public.user_progress
  for each row execute function public.set_updated_at();

-- ========== RLS ==========
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.articles enable row level security;
alter table public.study_rooms enable row level security;
alter table public.forum_posts enable row level security;
alter table public.forum_comments enable row level security;
alter table public.article_likes enable row level security;

-- profiles
create policy "profiles_select_all" on public.profiles for select to authenticated using (true);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id);

-- user_progress
create policy "progress_select_own" on public.user_progress for select to authenticated using (auth.uid() = user_id);
create policy "progress_insert_own" on public.user_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "progress_update_own" on public.user_progress for update to authenticated using (auth.uid() = user_id);

-- articles (所有人可读)
create policy "articles_select_all" on public.articles for select to authenticated using (true);

-- study_rooms
create policy "rooms_select_all" on public.study_rooms for select to authenticated using (true);
create policy "rooms_insert_auth" on public.study_rooms for insert to authenticated with check (true);
create policy "rooms_update_all" on public.study_rooms for update to authenticated using (true);

-- forum
create policy "posts_select_all" on public.forum_posts for select to authenticated using (true);
create policy "posts_insert_auth" on public.forum_posts for insert to authenticated with check (true);
create policy "posts_update_all" on public.forum_posts for update to authenticated using (true);

create policy "comments_select_all" on public.forum_comments for select to authenticated using (true);
create policy "comments_insert_auth" on public.forum_comments for insert to authenticated with check (true);

-- article_likes
create policy "likes_select_own" on public.article_likes for select to authenticated using (auth.uid() = user_id);
create policy "likes_insert_own" on public.article_likes for insert to authenticated with check (auth.uid() = user_id);
create policy "likes_delete_own" on public.article_likes for delete to authenticated using (auth.uid() = user_id);

-- 允许 service role 写入公共内容（seed 脚本使用 service role key）
-- 若使用 anon key seed，需在 Dashboard 临时关闭 RLS 或使用 service role
