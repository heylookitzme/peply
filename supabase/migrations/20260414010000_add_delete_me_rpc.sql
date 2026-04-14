-- ============================================================
-- Peply: self-service account deletion
-- Migration: 20260414010000_add_delete_me_rpc
--
-- Adds a SECURITY DEFINER RPC so an authenticated user can delete
-- their own auth.users row. ON DELETE CASCADE on user_profiles and
-- calculator_presets removes all associated preferences.
-- ============================================================

create or replace function public.delete_me()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_me() from public;
grant execute on function public.delete_me() to authenticated;
