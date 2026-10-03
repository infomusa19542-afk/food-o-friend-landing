# Environment Setup

How to configure Food O Friend locally and on Vercel.

## Required (local and Vercel)

| Variable | Example | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` | Supabase project URL. Used for data, Storage image URLs and the `next/image` allow-list (`next.config.ts`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ…` / `sb_publishable_…` | Public (anon/publishable) key. Safe in the browser **only because** RLS restricts the public role to inserts. |

Both are read at **build time** (Next.js inlines `NEXT_PUBLIC_*`), so redeploy after changing them.

## Recommended (production)

| Variable | Example | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://foodofriend.com` | Canonical origin for metadata, Open Graph URLs, `sitemap.xml`, `robots.txt` and structured data. If unset, Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`, set automatically by Vercel) is used; locally it falls back to `http://localhost:3000`. Set it explicitly once the real domain is known. |

## Never expose publicly

| Variable | Where it may live |
| --- | --- |
| `SUPABASE_SECRET_KEY` (service-role / secret key) | Only in your local `.env.local` for admin scripts such as `upload_site_assets.py`. **Do not add it to Vercel.** The application never reads it, and anything prefixed `NEXT_PUBLIC_` would be shipped to browsers. |

Other rules:

- Never prefix a secret with `NEXT_PUBLIC_`.
- `.env`, `.env.local` and `.env.*.local` are git-ignored — keep it that way.
- If a secret key is ever committed or shared, rotate it in Supabase → Project Settings → API.

## Local development

```bash
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

Minimal `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<public anon/publishable key>
# Optional, only for local admin scripts — never deploy:
# SUPABASE_SECRET_KEY=<secret key>
```

## Vercel

1. Project → Settings → Environment Variables.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for **Production** and **Preview** (and Development if you use `vercel env pull`).
3. Add `NEXT_PUBLIC_SITE_URL` for **Production** once the domain is final.
4. Do **not** add `SUPABASE_SECRET_KEY`.
5. Redeploy.

## Supabase prerequisites

Run once in the Supabase SQL Editor (all scripts are idempotent):

1. `supabase/user_registrations.sql`
2. `supabase/restaurant_owners.sql`
3. `supabase/faq_items_seed.sql` (optional — local FAQ fallbacks show until rows exist)
4. `supabase/idea_screens.sql`, then `supabase/idea_screens_seed.sql` (content for `/idea`; the page uses local fallback copy until these exist)
5. `supabase/verify_public_access.sql` and `supabase/idea_screens_verify.sql` (read-only checks)

The `waitlist`, `site_content` and `faq_items` tables, the `get_waitlist_count` RPC and the public `site-assets` Storage bucket already exist in the project.
