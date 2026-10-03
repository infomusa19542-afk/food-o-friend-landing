# Architecture

MVC-inspired layering on top of the Next.js App Router. Data flows one way:

```
app/ (routes)  →  components/ (view)  ←  controllers/  →  services/  →  lib/supabase.ts
                                              ↑               ↑
                                           models/ (types)  constants/ + utils/
```

## Where code belongs

| Folder | Responsibility | Rules |
| --- | --- | --- |
| `app/` | Routes, layouts, metadata. | Keep `page.tsx` tiny — compose sections only. |
| `components/common/` | Reusable building blocks (`Container`, `AppButton`, `AppInput`, `SectionTitle`, `LoadingSpinner`, later `WaitlistForm`). | Presentational; no data fetching or business rules. |
| `components/layout/` | `Header`, `MobileMenu`, `Footer`. | |
| `components/home/` | One file per homepage section. | Receive content via props once Phase 3 wires data. |
| `components/registration/`, `components/restaurant-owner/` | Phase 4 forms. | |
| `controllers/` | Orchestrate a use case: validate input, call services, merge fallbacks, map errors to safe `ActionResult`s. | `server-only`. Never return raw Supabase errors. |
| `services/` | The only place that queries Supabase (tables, RPCs). | `server-only`. One function per query; throw on error. |
| `models/` | TypeScript shapes for DB rows and domain data. | Types only. |
| `lib/` | Infrastructure: `supabase.ts` (public anon client), `storage.ts` (`getAssetUrl`). | |
| `constants/` | `app_strings` (all UI copy + fallbacks), `app_routes` (routes + section IDs), `app_assets` (Storage paths + sizes), `app_colors`, `app_config` (bucket, table names, limits). | No literals for these anywhere else. |
| `utils/` | Pure helpers: `validators`, `formatters`, `errors`, `parsers`, `classnames`. | No side effects except `logSafeError`. |
| `types/` | Shared cross-layer types (`StorageAsset`, `ActionResult`, `NavItem`). | |

## Conventions

- **Strings**: add copy to `constants/app_strings.ts`. Sections that exist in Supabase `site_content` are merged over these fallbacks by `controllers/home.controller.ts`.
- **Assets**: add the path and intrinsic size to `constants/app_assets.ts`; render with `next/image` and `getAssetUrl(asset)`. Never hardcode Supabase URLs. Assets live in the `site-assets` bucket, not `/public`.
- **Colors**: use Tailwind tokens (`bg-ink`, `bg-charcoal`, `text-brand`, `bg-cream`, `text-muted`, `bg-brand-tint`, …) defined in `app/globals.css` `@theme`. Keep `constants/app_colors.ts` in sync.
- **Width**: wrap section content in `Container` (`max-w-content` = 1280px); backgrounds stay full-bleed.
- **Client Components**: only for interactivity (forms, mobile menu). Pages and sections stay Server Components.
- **Security**: only `NEXT_PUBLIC_SUPABASE_ANON_KEY` is used in app code. Secret/service keys must never be imported into `app/`, `components/`, `lib/`, `services/` or `controllers/`. The waitlist is insert-only for the public key (RLS); counts come from the `get_waitlist_count` RPC.
- **Errors**: services throw, controllers catch and map to `AppStrings` messages; log with `logSafeError` (no emails or payloads).
- **Forms**: validate on the client for UX and again in the controller via `utils/validators.ts`. Include the honeypot `website` field for basic spam protection.
