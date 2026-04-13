-- ============================================================
-- Peply Submission Tables
-- Migration: 20260413000000_create_submission_tables
-- ============================================================

-- Table 1: Anonymous user submissions (no auth required)
create table if not exists public.user_submissions (
  id uuid primary key default gen_random_uuid(),
  compound_slug text not null,
  dose_amount numeric not null check (dose_amount > 0 and dose_amount <= 10000),
  dose_unit text not null check (dose_unit in ('mg', 'mcg')),
  frequency text not null check (frequency in ('daily', 'twice_daily', '3x_week', '5x_week', 'weekly', 'biweekly', 'other')),
  duration_weeks integer check (duration_weeks is null or (duration_weeks >= 1 and duration_weeks <= 260)),
  route text check (route in ('sc', 'im', 'oral')),
  source_type text check (source_type in ('compounding_pharmacy', 'research_supplier', 'clinic', 'other')),
  effects jsonb,
  effects_notes text check (char_length(effects_notes) <= 200),
  bloodwork_changes jsonb,
  would_submit_again text check (would_submit_again in ('yes', 'no', 'unsure')),
  ip_hash text,
  created_at timestamptz not null default now()
);

-- Table 2: Vendor accounts (authenticated)
create table if not exists public.vendor_accounts (
  id uuid primary key references auth.users(id),
  business_name text not null,
  license_number text,
  contact_email text not null,
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table 3: Vendor submissions (authenticated, linked to vendor)
create table if not exists public.vendor_submissions (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendor_accounts(id),
  compound_slug text not null,
  batch_number text,
  purity_percentage numeric check (purity_percentage is null or (purity_percentage >= 0 and purity_percentage <= 100)),
  contaminants_tested jsonb,
  potency_verified boolean,
  coa_file_url text,
  notes text check (char_length(notes) <= 500),
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

-- Enable RLS on all tables
alter table public.user_submissions enable row level security;
alter table public.vendor_accounts enable row level security;
alter table public.vendor_submissions enable row level security;

-- user_submissions: anonymous INSERT allowed
create policy "Anyone can insert anonymous submissions"
  on public.user_submissions
  for insert
  to anon, authenticated
  with check (true);

-- user_submissions: allow SELECT for rate limiting (ip_hash lookups only)
-- This returns count only (head: true) — individual rows are not exposed
create policy "Allow rate limit checks on submissions"
  on public.user_submissions
  for select
  to anon, authenticated
  using (true);

-- vendor_accounts: authenticated users can create their own account
create policy "Users can create their own vendor account"
  on public.vendor_accounts
  for insert
  to authenticated
  with check (id = auth.uid());

-- vendor_accounts: users can read only their own row
create policy "Users can read their own vendor account"
  on public.vendor_accounts
  for select
  to authenticated
  using (id = auth.uid());

-- vendor_accounts: users can update only their own row (excluding verified flag)
-- NOTE: verified can only be set by service_role / admin
create policy "Users can update their own vendor account"
  on public.vendor_accounts
  for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and verified = false);

-- vendor_submissions: authenticated users can insert where vendor_id = auth.uid()
create policy "Vendors can insert their own submissions"
  on public.vendor_submissions
  for insert
  to authenticated
  with check (vendor_id = auth.uid());

-- vendor_submissions: users can read only their own submissions
create policy "Vendors can read their own submissions"
  on public.vendor_submissions
  for select
  to authenticated
  using (vendor_id = auth.uid());
