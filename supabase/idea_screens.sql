-- Food O Friend — content for the /idea page carousels.
-- Safe to re-run: creates objects only if missing and never deletes data.
-- Run in the Supabase SQL Editor, then run supabase/idea_screens_seed.sql.

create table if not exists public.idea_screens (
  id uuid primary key default gen_random_uuid(),

  journey_key text not null
    check (journey_key in ('account_onboarding', 'discover_profile', 'meetup')),
  journey_title text not null
    check (char_length(btrim(journey_title)) between 1 and 80),

  screen_number integer not null,
  screen_key text not null
    check (screen_key ~ '^[a-z0-9_]+$'),

  title text not null
    check (char_length(btrim(title)) between 1 and 120),
  description text not null
    check (char_length(btrim(description)) between 1 and 1000),

  image_path text not null
    check (char_length(image_path) between 1 and 300),
  image_url text not null
    check (image_url like 'https://%/storage/v1/object/public/idea-assets/%'),
  image_alt text not null default ''
    check (char_length(image_alt) <= 300),

  actions jsonb not null default '[]'::jsonb
    check (jsonb_typeof(actions) = 'array'),
  note text null
    check (note is null or char_length(note) <= 500),

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint idea_screens_screen_number_positive
    check (screen_number > 0),

  constraint idea_screens_unique_screen
    unique (screen_key)
);

create index if not exists idea_screens_journey_key_idx
  on public.idea_screens (journey_key);

create index if not exists idea_screens_screen_number_idx
  on public.idea_screens (screen_number);

create index if not exists idea_screens_active_idx
  on public.idea_screens (is_active);

-- Keep updated_at current on edits made from the dashboard.
create or replace function public.idea_screens_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists idea_screens_set_updated_at on public.idea_screens;
create trigger idea_screens_set_updated_at
  before update on public.idea_screens
  for each row execute function public.idea_screens_set_updated_at();

alter table public.idea_screens enable row level security;

-- Public website content: read-only for public roles. No INSERT/UPDATE/DELETE.
revoke all on table public.idea_screens from anon, authenticated;
grant select on table public.idea_screens to anon, authenticated;

drop policy if exists "Public can read active idea screens" on public.idea_screens;
create policy "Public can read active idea screens"
  on public.idea_screens
  for select
  to anon, authenticated
  using (is_active = true);

-- Edit rows from the Supabase dashboard (or with the service role) — never from the browser.
