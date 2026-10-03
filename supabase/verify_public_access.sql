-- Read-only checks. Run after the migrations to confirm what public roles can do.

-- 1. RLS must be enabled on every public form table.
select relname as table_name, relrowsecurity as rls_enabled
from pg_class
where relnamespace = 'public'::regnamespace
  and relname in ('waitlist', 'user_registrations', 'restaurant_owners');

-- 2. Policies per table — expect INSERT-only policies for anon/authenticated
--    and no SELECT policy on waitlist, user_registrations or restaurant_owners.
select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename in ('waitlist', 'user_registrations', 'restaurant_owners')
order by tablename, cmd;

-- 3. Table-level privileges held by public roles.
select table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('waitlist', 'user_registrations', 'restaurant_owners')
  and grantee in ('anon', 'authenticated')
order by table_name, grantee, privilege_type;
