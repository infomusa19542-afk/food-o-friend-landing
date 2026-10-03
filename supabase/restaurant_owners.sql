-- Food O Friend — restaurant partnership interest submitted from /restaurant-owner.
-- Safe to re-run: creates objects only if missing and never deletes data.
-- Run in the Supabase SQL Editor.

create table if not exists public.restaurant_owners (
  id uuid primary key default gen_random_uuid(),
  restaurant_name text not null
    check (char_length(btrim(restaurant_name)) between 1 and 120),
  contact_name text not null
    check (char_length(btrim(contact_name)) between 1 and 80),
  email text not null
    check (
      char_length(email) <= 254
      and email = lower(btrim(email))
      and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
    ),
  phone text
    check (phone is null or (char_length(phone) <= 20 and phone ~ '^\+?[0-9\s().-]+$')),
  city text not null
    check (char_length(btrim(city)) between 1 and 120),
  address text
    check (address is null or char_length(address) <= 200),
  cuisine_type text not null
    check (char_length(btrim(cuisine_type)) between 1 and 120),
  website_or_instagram text
    check (website_or_instagram is null or char_length(website_or_instagram) <= 200),
  seating_capacity integer not null
    check (seating_capacity between 1 and 2000),
  interested_in_hosting boolean not null,
  message text
    check (message is null or char_length(message) <= 1000),
  consent boolean not null
    check (consent),
  created_at timestamptz not null default now()
);

-- One submission per restaurant per email (an owner may register several restaurants).
create unique index if not exists restaurant_owners_email_restaurant_key
  on public.restaurant_owners (email, lower(restaurant_name));

alter table public.restaurant_owners enable row level security;

-- Public roles may only INSERT the form's columns. No SELECT/UPDATE/DELETE.
revoke all on table public.restaurant_owners from anon, authenticated;
grant insert (
  restaurant_name, contact_name, email, phone, city, address, cuisine_type,
  website_or_instagram, seating_capacity, interested_in_hosting, message, consent
) on table public.restaurant_owners to anon, authenticated;

drop policy if exists "Public can submit restaurant interest" on public.restaurant_owners;
create policy "Public can submit restaurant interest"
  on public.restaurant_owners
  for insert
  to anon, authenticated
  with check (true); -- column CHECK constraints above enforce valid data

-- No SELECT policy exists, so public visitors can never read submissions.
