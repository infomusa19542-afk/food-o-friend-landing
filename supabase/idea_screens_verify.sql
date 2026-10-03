-- Read-only checks for the /idea content. Run after idea_screens.sql + idea_screens_seed.sql.

-- Expected: account_onboarding = 6, discover_profile = 6, meetup = 12
select journey_key, count(*) as screens
from public.idea_screens
where is_active = true
group by journey_key
order by journey_key;

-- Expected: 24
select count(*) as active_screens
from public.idea_screens
where is_active = true;

-- Expected: screen numbers 1 through 24 with no gaps
select screen_number, screen_key, title, image_path
from public.idea_screens
where is_active = true
order by screen_number;

-- Expected: no rows (every number 1–24 present)
select n as missing_screen_number
from generate_series(1, 24) as n
where not exists (
  select 1 from public.idea_screens s where s.screen_number = n and s.is_active
);

-- Expected: one SELECT policy for anon/authenticated, nothing else
select policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename = 'idea_screens';
