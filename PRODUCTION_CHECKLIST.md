# Production Checklist

Status as of the Phase 5 audit (4 October 2026). `[x]` = verified, `[ ]` = still to do before/at launch.

## Pages

- [x] `/` — landing page (hero, feature strip, problem/solution, how it works, safety, FAQ, waitlist CTA)
- [x] `/register` — early access profile form
- [x] `/restaurant-owner` — restaurant partnership page and form
- [x] `/privacy` — Privacy Policy
- [x] `/terms` — Terms of Service
- [x] Branded 404 (`app/not-found.tsx`, returns HTTP 404, `noindex`)
- [x] Friendly error state (`app/error.tsx`, no error details shown)
- [x] One `h1` per page, no skipped heading levels, no browser console errors

## Responsive Tests

Automated headless-Chrome sweep of every route (including 404) — **zero horizontal overflow** at:
320, 344, 360, 375, 390, 412, 430, 480, 540, 600, 690, 768, 820, 884, 1024, 1280, 1312, 1366, 1440, 1536, 1812, 1920, 2560.

- [x] Galaxy Z Fold 5 cover (≈344 px) and unfolded (≈690–884 px, 1812 px rendering)
- [x] All validation errors visible on both forms — no overflow
- [x] Success panels and long input (80-char names) — no overflow
- [x] FAQ answers expanded — no overflow
- [x] Mobile menu at 344 × 882, 390 × 844 and landscape 844 × 390 fits; panel scrolls if the viewport is very short
- [ ] Spot-check on real devices (iOS Safari, Android Chrome, a Fold if available)

## Supabase Tables

- [x] `waitlist` (existing) — unique email
- [x] `site_content` (existing) — publicly readable copy, local fallbacks in `constants/app_strings.ts`
- [x] `faq_items` (existing) — active rows ordered by `sort_order`, local fallbacks
- [x] `user_registrations` — `supabase/user_registrations.sql`, unique email, CHECK constraints mirror app validation
- [x] `restaurant_owners` — `supabase/restaurant_owners.sql`, unique (email, lower(restaurant_name))
- [x] `get_waitlist_count` RPC
- [ ] Optional: run `supabase/faq_items_seed.sql` (or add FAQs in the dashboard) so FAQs come from Supabase

## RLS

Verified with the **public key only**:

| Table | INSERT | SELECT | UPDATE | DELETE |
| --- | --- | --- | --- | --- |
| `waitlist` | ✅ allowed | ✅ returns nothing | ✅ affects nothing | ✅ affects nothing |
| `user_registrations` | ✅ allowed | ✅ permission denied | ✅ permission denied | ✅ permission denied |
| `restaurant_owners` | ✅ allowed | ✅ permission denied | ✅ permission denied | ✅ permission denied |

- [x] Duplicate inserts rejected by unique constraints (HTTP 409 / `23505`)
- [x] Run `supabase/verify_public_access.sql` after any schema change

## Forms

All three forms (waitlist ×2, registration, restaurant owner) share `useServerForm` → Server Action → controller (`submitForm`) → service.

- [x] Required fields, invalid email, missing fields → inline messages, **no request sent**, focus moves to first invalid field
- [x] Long input capped (`maxLength`) and re-validated server-side
- [x] Double-click → exactly one request; button disabled with “Joining…/Sending…”
- [x] Duplicate → friendly message, no extra row
- [x] Honeypot filled → friendly success, nothing stored
- [x] Supabase failure → friendly error, input preserved, no database details shown
- [x] Forged Server Action payloads rejected by server-side validation
- [x] Success → waitlist count updates in place; registration/restaurant forms show a focused confirmation
- [ ] Consider rate limiting (e.g. Vercel Firewall rules) if spam appears — no CAPTCHA yet by design

## Storage Assets

- [x] All images come from the public `site-assets` bucket via `constants/app_assets.ts` + `lib/storage.ts` (no copies in `/public`)
- [x] `next/image` with intrinsic sizes → CLS 0 on every page
- [x] Hero image preloaded; other images lazy; header logo eager
- [x] `sizes` tuned per image; CTA pattern tile reduced from ~509 KB to ~102 KB
- [x] `next.config.ts` allows only `/storage/v1/object/public/site-assets/**` on the project host

## Performance

Lighthouse 12 (local production build):

| Page | Mobile perf | Desktop perf | CLS | TBT (mobile) |
| --- | --- | --- | --- | --- |
| `/` | 93 | 100 | 0 | 20 ms |
| `/register` | 95 | 100 | 0 | 20 ms |
| `/restaurant-owner` | 95 | 100 | 0 | 50 ms |
| `/privacy` | 99 | 100 | 0 | 20 ms |

- [x] All pages statically prerendered; homepage revalidates every 60 s (one `site_content`, one `faq_items` and one count request per revalidation)
- [x] Supabase client library is **not** shipped to the browser
- [x] Client Components limited to interactive pieces (forms, accordion, menus, count label)
- [x] Fonts self-hosted via `next/font` (Outfit + one Caveat weight)
- [ ] Re-run Lighthouse / check Vercel Speed Insights on the deployed domain (simulated mobile LCP ≈ 3 s locally is dominated by throttled hero image download)

## Security

- [x] `SUPABASE_SECRET_KEY` / service role never referenced by app code and absent from client bundles
- [x] `.env.local` git-ignored; no secret in tracked files; `.env.example` contains placeholders only
- [x] Server Actions treat input as `unknown`, coerce and re-validate it
- [x] No `innerHTML`; the only `dangerouslySetInnerHTML` is JSON-LD with `<` escaped
- [x] External links use `rel="noopener noreferrer"`; no user-controlled redirects
- [x] Logs record error code/message only — never emails, names, phones or addresses
- [x] Headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`; `X-Powered-By` removed
- [ ] Optional hardening: a nonce-based Content-Security-Policy (needs dynamic rendering for Next's inline scripts — deliberately not enabled to keep pages static)

## Accessibility

- [x] Lighthouse accessibility 100 on all audited pages
- [x] Skip-to-content link; visible focus rings on all controls
- [x] Labels for every field; selects, checkboxes and choice groups use native controls inside labelled fieldsets
- [x] Mobile menu: `aria-expanded`, `aria-controls`, Escape closes and returns focus, links close the menu
- [x] FAQ accordion: real buttons, `aria-expanded`/`aria-controls`, labelled regions
- [x] Live regions for form status and the waitlist count
- [x] Text contrast meets WCAG AA — `--color-brand-strong` (#c24a0b) used for orange text on light backgrounds, button fills and the CTA band
- [x] Decorative images use empty `alt`; content images have descriptive `alt`

## SEO

- [x] Per-page titles/descriptions, canonical URLs, Open Graph + Twitter cards (shared generated image `/opengraph-image`)
- [x] `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, generated favicon + Apple icon, `application-name`, `theme-color`
- [x] Basic WebSite + Organization JSON-LD on the homepage (no ratings, addresses or registrations)
- [ ] Set `NEXT_PUBLIC_SITE_URL` — until then canonical/OG/sitemap URLs use the Vercel production domain (or localhost locally)
- [ ] Submit the sitemap in Google Search Console after launch

## Environment Variables

See `ENVIRONMENT_SETUP.md`.

- [ ] Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Production + Preview)
- [ ] Vercel: `NEXT_PUBLIC_SITE_URL` (Production)
- [x] `SUPABASE_SECRET_KEY` not required at runtime — do not add it to Vercel

## Vercel Deployment

- [ ] Import the repository into Vercel (framework preset: Next.js, default build command `next build`)
- [ ] Add environment variables (above) and deploy
- [ ] Attach the production domain; confirm HTTPS
- [ ] Smoke-test on the deployed URL: join waitlist, register, restaurant form, 404, `/robots.txt`, `/sitemap.xml`
- [ ] Delete any test rows created during smoke tests

## Remaining Manual Setup

- [ ] `AppConfig.company.contactEmail` — legal pages show a “not yet published” notice until set (users currently have no channel for deletion requests)
- [ ] `AppConfig.company.legalEntityName` — pages name “Food O Friend” until set
- [ ] `AppConfig.company.legalLastUpdated` — update whenever legal copy changes
- [ ] Real social profile URLs in `AppConfig.social` (currently platform home pages)
- [ ] Production domain → `NEXT_PUBLIC_SITE_URL`
- [ ] Logo artwork in Storage spells “Food o **Freind**” — upload a corrected `branding/food-o-friend-logo.png`
- [ ] Have the Privacy Policy and Terms reviewed against how the team actually handles data (access, retention, deletion)
- [ ] Optional: analytics — none installed; if added, update the Privacy Policy’s cookies section first
- [ ] Optional: FAQ rows in Supabase (`supabase/faq_items_seed.sql`)
