-- ============================================================
-- Contact Submissions
-- Migration: 20260413010000_create_contact_submissions
-- ============================================================

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  category text not null check (category in ('general', 'vendor_partnership', 'data_request', 'bug_report', 'other')),
  message text not null check (char_length(message) <= 1000),
  ip_hash text,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- INSERT only, no SELECT/UPDATE/DELETE
create policy "Anyone can insert contact submissions"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Rate limiting function for contact form (5 per hour)
create or replace function public.check_contact_rate_limit(p_ip_hash text, p_max_per_hour int default 5)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select count(*) < p_max_per_hour
  from public.contact_submissions
  where ip_hash = p_ip_hash
    and created_at > now() - interval '1 hour';
$$;
