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
| `components/common/` | Reusable building blocks: layout (`Container`, `PageHero`, `SectionTitle`, `FormCard`), controls (`AppButton`, `SubmitButton`, `AppInput`, `AppSelect`, `AppTextarea`, `AppCheckbox`, `AppChoiceGroup`, `FormField`), feedback (`FormStatusMessage`, `FormSuccess`, `LoadingSpinner`), `HoneypotField`, `Icon`, `IconCircle`, `BrandLogo`, `WaitlistForm`. | Presentational; no data fetching or business rules. |
| `components/layout/` | `Header`, `DesktopNav`, `MobileMenu`, `WaitlistLinkButton`, `Footer` — rendered once in `app/layout.tsx` for every page. | Nav links are absolute (`/#section`) so they work from any route. |
| `components/home/` | One file per homepage section. | Remotely editable copy arrives via props typed by `models/site-content.model.ts`. |
| `components/registration/`, `components/restaurant-owner/`, `components/legal/` | Page-specific forms and sections. | |
| `components/idea/` | `/idea` page: `IdeaJourneySection` (server) + reusable `IdeaCarousel` (client, receives already-fetched screens). | Content comes from `idea_screens` via `controllers/idea.controller.ts`, with `constants/app_idea_content.ts` as fallback. |
| `components/seo/`, `components/brand/` | JSON-LD structured data; the chef-hat mark used by generated icons and the Open Graph image. | |
| `hooks/` | Client hooks: `useServerForm` (shared submit flow for every form), `useActiveNavHref`. | |
| `actions/` | Next.js Server Actions — thin entry points that parse untrusted input and call a controller. | `"use server"`. No business logic or Supabase calls. |
| `controllers/` | `form-submission.ts` holds the shared honeypot → validate → save → error-mapping flow. Orchestrate a use case: validate input, call services, merge fallbacks, map errors to safe `ActionResult`s. | `server-only`. Never return raw Supabase errors. |
| `services/` | The only place that queries Supabase (tables, RPCs). | `server-only`. One function per query; throw on error. |
| `models/` | TypeScript shapes for DB rows and domain data. | Types only. |
| `lib/` | Infrastructure: `supabase.ts` (public anon client), `storage.ts` (`getAssetUrl`), `site.ts` (canonical origin), `metadata.ts` (`buildPageMetadata`). | Server-side only. |
| `constants/` | `app_strings` (all UI copy + fallbacks), `app_routes` (routes + section IDs), `app_navigation` (nav, legal and social link lists), `app_options` (allowed form values, mirrored by SQL CHECK constraints), `app_legal_strings` (Privacy/Terms copy, exposed as `AppStrings.legal`), `app_assets` (Storage paths + sizes), `app_colors`, `app_config` (bucket, table names, limits). | No literals for these anywhere else. |
| `utils/` | Pure helpers: `validators` (shared rules + `createFieldValidator`), `registration.validation`, `restaurant-owner.validation`, `formatters`, `errors`, `parsers`, `options`, `dom`, `classnames`. | No side effects except `logSafeError`. |
| `types/` | Shared cross-layer types (`StorageAsset`, `ActionResult`, `NavItem`). | |

## Conventions

- **Strings**: add copy to `constants/app_strings.ts`. Sections that exist in Supabase `site_content` are merged over these fallbacks by `controllers/home.controller.ts`.
- **Assets**: add the path and intrinsic size to `constants/app_assets.ts`; render with `next/image` and `getAssetUrl(asset)`. Never hardcode Supabase URLs. Assets live in the `site-assets` bucket, not `/public`.
- **Colors**: use Tailwind tokens (`bg-ink`, `bg-charcoal`, `text-brand`, `bg-cream`, `text-muted`, `bg-brand-tint`, …) defined in `app/globals.css` `@theme`. Keep `constants/app_colors.ts` in sync. Use `brand-strong` wherever orange carries text (button fills, orange text on light backgrounds, the CTA band) so contrast stays WCAG AA; vivid `brand` is for accents on dark.
- **Icons**: add inline SVG paths to `components/common/Icon.tsx`; no icon packages.
- **Type scale**: use the fluid `text-display`, `text-heading`, `text-eyebrow` and `section-y` utilities from `globals.css`.
- **Width**: wrap section content in `Container` (`max-w-content` = 1280px); backgrounds stay full-bleed.
- **Client Components**: only for interactivity (forms, mobile menu). Pages and sections stay Server Components.
- **Security**: only `NEXT_PUBLIC_SUPABASE_ANON_KEY` is used in app code. Secret/service keys must never be imported into `app/`, `components/`, `lib/`, `services/` or `controllers/`. The waitlist is insert-only for the public key (RLS); counts come from the `get_waitlist_count` RPC.
- **Errors**: services throw, controllers catch and map to `AppStrings` messages; log with `logSafeError` (no emails or payloads).
- **Forms**: validate on the client for UX and again in the controller via `utils/validators.ts`. Include the hidden honeypot field (`AppConfig.waitlist.honeypotField`) for basic spam protection.
- **Data freshness**: `app/page.tsx` uses `revalidate = 60`; successful waitlist signups call `revalidatePath` and update the client count via `WaitlistCountProvider`.
- **SEO**: new pages export `metadata = buildPageMetadata({ title, description, path })` and are added to `app/sitemap.ts`.
- **Images**: only the LCP hero uses `preload`; other above-the-fold images use `loading="eager"`; everything else stays lazy.
- **SQL**: database scripts live in `supabase/` and are run manually in the Supabase SQL Editor. Keep CHECK constraints in sync with `constants/app_options.ts` and `AppConfig.validation`.
- **New form**: add a model, a `*.validation.ts` (parse + validate), a service, a controller using `submitForm`, a `"use server"` action, and a client form using `useServerForm` + shared controls.
- **Company details**: legal entity and contact email are `null` placeholders in `AppConfig.company` until configured.
