-- ============================================================
-- Peply Feedback Board
-- Migration: 20260414020000_create_feedback_tables
--
-- Structured one-way suggestion box. NOT a forum:
--   * no user-to-user replies
--   * no comments or threads
--   * attribution is opt-in, defaults to anonymous even for
--     authenticated submitters
-- ============================================================

-- ------------------------------------------------------------
-- Table: suggestions
-- ------------------------------------------------------------
create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  show_attribution boolean not null default false,
  category text not null check (category in (
    'feature_request', 'compound_request', 'bug_report', 'general_feedback'
  )),
  title text not null check (char_length(title) between 3 and 200),
  description text check (description is null or char_length(description) <= 1000),
  upvotes integer not null default 0,
  hidden boolean not null default false,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists suggestions_visible_recent_idx
  on public.suggestions (hidden, created_at desc);
create index if not exists suggestions_visible_popular_idx
  on public.suggestions (hidden, upvotes desc, created_at desc);
create index if not exists suggestions_category_idx
  on public.suggestions (category) where hidden = false;

-- ------------------------------------------------------------
-- Table: suggestion_votes
-- ------------------------------------------------------------
create table if not exists public.suggestion_votes (
  suggestion_id uuid not null references public.suggestions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (suggestion_id, user_id)
);

create index if not exists suggestion_votes_user_idx
  on public.suggestion_votes (user_id);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.suggestions enable row level security;
alter table public.suggestion_votes enable row level security;

-- suggestions: public read of visible rows; anyone can insert; no
-- updates or deletes from the API surface (only service_role via RPCs)
create policy "Anyone can read visible suggestions"
  on public.suggestions
  for select
  to anon, authenticated
  using (hidden = false);

create policy "Anyone can insert a suggestion"
  on public.suggestions
  for insert
  to anon, authenticated
  with check (
    -- enforce the shape the server action will submit
    hidden = false
    and upvotes = 0
  );

-- suggestion_votes: authenticated users CRUD only their own rows
create policy "Users can read own votes"
  on public.suggestion_votes
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own votes"
  on public.suggestion_votes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete own votes"
  on public.suggestion_votes
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Upvote count maintenance
-- ------------------------------------------------------------
create or replace function public.suggestion_votes_after_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.suggestions
    set upvotes = upvotes + 1
  where id = new.suggestion_id;
  return new;
end;
$$;

create or replace function public.suggestion_votes_after_delete()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.suggestions
    set upvotes = greatest(upvotes - 1, 0)
  where id = old.suggestion_id;
  return old;
end;
$$;

drop trigger if exists suggestion_votes_insert_count on public.suggestion_votes;
create trigger suggestion_votes_insert_count
  after insert on public.suggestion_votes
  for each row
  execute function public.suggestion_votes_after_insert();

drop trigger if exists suggestion_votes_delete_count on public.suggestion_votes;
create trigger suggestion_votes_delete_count
  after delete on public.suggestion_votes
  for each row
  execute function public.suggestion_votes_after_delete();

-- ------------------------------------------------------------
-- Rate limit helper (reuses the same strategy as user_submissions)
-- ------------------------------------------------------------
create or replace function public.check_suggestion_rate_limit(
  p_ip_hash text,
  p_max_per_hour int default 5
)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select count(*) < p_max_per_hour
  from public.suggestions
  where ip_hash = p_ip_hash
    and created_at > now() - interval '1 hour';
$$;

revoke all on function public.check_suggestion_rate_limit(text, int) from public;
grant execute on function public.check_suggestion_rate_limit(text, int) to anon, authenticated;

-- ------------------------------------------------------------
-- Admin hide/unhide (server-role only)
-- ------------------------------------------------------------
create or replace function public.set_suggestion_hidden(
  p_id uuid,
  p_hidden boolean
)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.suggestions set hidden = p_hidden where id = p_id;
$$;

-- Only service_role can call this; revoke from everyone else.
revoke all on function public.set_suggestion_hidden(uuid, boolean) from public;
