-- ============================================================
-- Peply: make the suggestion feed private
-- Migration: 20260414030000_private_suggestion_feed
--
-- Drops the public SELECT policy on suggestions. The public
-- /feedback page no longer shows a community feed; submitters
-- can still INSERT, and admins read via the Supabase Table
-- Editor (service_role).
--
-- Authenticated users keep read access to their OWN rows so the
-- /account page can count their submitted suggestions.
-- ============================================================

drop policy if exists "Anyone can read visible suggestions" on public.suggestions;

create policy "Users can read own suggestions"
  on public.suggestions
  for select
  to authenticated
  using (user_id is not null and auth.uid() = user_id);
