-- Food O Friend — early access profiles submitted from /register.
-- Safe to re-run: creates objects only if missing and never deletes data.
-- Run in the Supabase SQL Editor.

create table if not exists public.user_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null
    check (char_length(btrim(full_name)) between 1 and 80),
  email text not null
    check (
      char_length(email) <= 254
      and email = lower(btrim(email))
      and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
    ),
  city text not null
    check (char_length(btrim(city)) between 1 and 120),
  country text not null
    check (char_length(btrim(country)) between 1 and 120),
  age_range text not null
    check (age_range in ('18-24', '25-34', '35-44', '45-54', '55+')),
  food_interests text[] not null
    check (
      cardinality(food_interests) between 1 and 8
      and food_interests <@ array[
        'italian', 'asian', 'middle_eastern', 'street_food',
        'vegetarian_vegan', 'fine_dining', 'coffee_brunch', 'desserts'
      ]::text[]
    ),
  social_interests text[] not null
    check (
      cardinality(social_interests) between 1 and 8
      and social_interests <@ array[
        'new_friends', 'networking', 'language_exchange', 'travel',
        'sports_fitness', 'arts_culture', 'music', 'gaming'
      ]::text[]
    ),
  preferred_meetup_type text not null
    check (preferred_meetup_type in ('small_group', 'large_group', 'either')),
  message text
    check (message is null or char_length(message) <= 1000),
  marketing_consent boolean not null
    check (marketing_consent),
  created_at timestamptz not null default now(),
  -- One profile per (already lower-cased) email address.
  constraint user_registrations_email_key unique (email)
);

alter table public.user_registrations enable row level security;

-- Public roles may only INSERT the form's columns. No SELECT/UPDATE/DELETE.
revoke all on table public.user_registrations from anon, authenticated;
grant insert (
  full_name, email, city, country, age_range, food_interests,
  social_interests, preferred_meetup_type, message, marketing_consent
) on table public.user_registrations to anon, authenticated;

drop policy if exists "Public can submit registrations" on public.user_registrations;
create policy "Public can submit registrations"
  on public.user_registrations
  for insert
  to anon, authenticated
  with check (true); -- column CHECK constraints above enforce valid data

-- No SELECT policy exists, so public visitors can never read registrations.
