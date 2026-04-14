-- ============================================================
-- Peply User Accounts
-- Migration: 20260414000000_create_user_accounts
--
-- Introduces minimal user account tables:
--   - public.user_profiles     (1:1 with auth.users)
--   - public.calculator_presets (user-owned saved calculator inputs)
--
-- Privacy scope (see CLAUDE.md, Content Language Guidelines):
--   Accounts store only preferences (display name, favorite compound
--   slugs, favorite stack slugs, calculator presets). Peply does NOT
--   store health data, dosing history, lab results, or any personal
--   medical information.
-- ============================================================

-- ------------------------------------------------------------
-- Table: user_profiles
-- ------------------------------------------------------------
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(display_name) <= 80),
  favorite_compounds text[] not null default '{}',
  favorite_stacks text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Table: calculator_presets
-- ------------------------------------------------------------
create table if not exists public.calculator_presets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  compound_slug text,
  vial_strength numeric not null check (vial_strength > 0 and vial_strength <= 100000),
  vial_unit text not null check (vial_unit in ('mg', 'mcg', 'iu')),
  diluent_volume numeric not null check (diluent_volume > 0 and diluent_volume <= 100),
  target_dose numeric not null check (target_dose > 0 and target_dose <= 100000),
  dose_unit text not null check (dose_unit in ('mg', 'mcg', 'iu')),
  syringe_type text,
  created_at timestamptz not null default now()
);

create index if not exists calculator_presets_user_id_idx
  on public.calculator_presets (user_id, created_at desc);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.user_profiles enable row level security;
alter table public.calculator_presets enable row level security;

-- user_profiles: each user reads/writes only their own row
create policy "Users can read own profile"
  on public.user_profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.user_profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.user_profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete own profile"
  on public.user_profiles
  for delete
  to authenticated
  using (auth.uid() = id);

-- calculator_presets: users can CRUD only their own presets
create policy "Users can read own presets"
  on public.calculator_presets
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own presets"
  on public.calculator_presets
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own presets"
  on public.calculator_presets
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own presets"
  on public.calculator_presets
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Triggers
-- ------------------------------------------------------------

-- Keep user_profiles.updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_profiles_set_updated_at on public.user_profiles;
create trigger user_profiles_set_updated_at
  before update on public.user_profiles
  for each row
  execute function public.set_updated_at();

-- Auto-create a user_profiles row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
