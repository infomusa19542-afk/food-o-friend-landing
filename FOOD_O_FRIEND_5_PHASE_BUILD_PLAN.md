# Food O Friend Website — 5-Phase GPT/Codex Build Plan

Use this file as a **step-by-step implementation plan**. Give **one phase at a time** to GPT/Codex. Do not move to the next phase until the current phase is complete and tested.

The website must visually match the supplied Food O Friend reference image as closely as possible while remaining responsive, fast, secure, maintainable, and production-ready.

---

# GLOBAL REQUIREMENTS

These rules apply to **all 5 phases**.

## Main Goal

Recreate the supplied Food O Friend landing page as closely as possible.

The final website should match the screenshot in:

- overall structure
- section order
- black / charcoal / orange / warm white color palette
- typography hierarchy
- spacing
- section heights
- rounded cards
- image placement
- hero composition
- feature strip
- Problem / Solution layout
- How It Works layout
- Safety section
- orange waitlist CTA
- footer
- desktop visual balance

Do not redesign the page into a different style.

Use the screenshot as the primary visual reference.

---

# TECH STACK

Use:

- Next.js 16+
- React
- TypeScript
- Tailwind CSS
- Supabase
- Supabase PostgreSQL
- Supabase Storage
- Vercel
- App Router

Do not add unnecessary dependencies.

---

# EXISTING SUPABASE SETUP

The project already uses Supabase.

Existing tables include:

- `waitlist`
- `site_content`
- `faq_items`

Existing RPC:

```text
get_waitlist_count
```

Existing public Supabase Storage bucket:

```text
site-assets
```

Existing asset paths:

```text
avatars/avatar-01.webp
avatars/avatar-02.webp
avatars/avatar-03.webp
avatars/avatar-04.webp

branding/chef-hat-logo.png
branding/food-o-friend-logo.png

decorations/hero-handwritten-text.png
decorations/orange-food-pattern.png
decorations/safety-handwritten-text.png

hero/hero-friends-dining.webp

safety/friends-sunset.webp

solution/app-phone-mockups.webp
```

Do not duplicate these assets into `/public`.

Create one reusable Supabase Storage URL helper and use it everywhere.

---

# ARCHITECTURE

Use a clean **MVC-inspired architecture** suitable for Next.js.

Recommended structure:

```text
app/
├── page.tsx
├── register/
│   └── page.tsx
├── restaurant-owner/
│   └── page.tsx
├── privacy/
│   └── page.tsx
└── terms/
    └── page.tsx

components/
├── common/
│   ├── AppButton.tsx
│   ├── AppInput.tsx
│   ├── Container.tsx
│   ├── SectionTitle.tsx
│   ├── WaitlistForm.tsx
│   └── LoadingSpinner.tsx
│
├── layout/
│   ├── Header.tsx
│   ├── MobileMenu.tsx
│   └── Footer.tsx
│
├── home/
│   ├── HeroSection.tsx
│   ├── FeatureStrip.tsx
│   ├── ProblemSolutionSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── SafetySection.tsx
│   └── FinalCTASection.tsx
│
├── registration/
│   └── RegistrationForm.tsx
│
└── restaurant-owner/
    └── RestaurantOwnerForm.tsx

controllers/
├── home.controller.ts
├── waitlist.controller.ts
├── registration.controller.ts
└── restaurant-owner.controller.ts

models/
├── site-content.model.ts
├── waitlist.model.ts
├── registration.model.ts
└── restaurant-owner.model.ts

services/
├── content.service.ts
├── waitlist.service.ts
├── registration.service.ts
└── restaurant-owner.service.ts

lib/
├── supabase.ts
└── storage.ts

constants/
├── app_strings.ts
├── app_routes.ts
├── app_assets.ts
├── app_colors.ts
└── app_config.ts

utils/
├── validators.ts
├── formatters.ts
└── errors.ts

types/
└── index.ts
```

The structure may be adjusted where Next.js conventions make sense, but responsibilities must remain separated.

---

# CLEAN CODE RULES

Mandatory:

- No duplicated UI code.
- No duplicated Supabase queries.
- No duplicated validation logic.
- No repeated asset URLs.
- No repeated route strings.
- No repeated UI strings.
- No hardcoded magic values scattered throughout components.
- No huge monolithic `page.tsx`.
- No business logic inside presentational components.
- Avoid `any`.
- Use proper TypeScript types.
- Use reusable helpers.
- Use reusable common components.
- Remove dead code.
- Remove unused imports.
- Keep files focused and reasonably small.
- Use semantic HTML.

---

# STRINGS AND CONSTANTS

All static user-facing website text must live in:

```text
constants/app_strings.ts
```

Example:

```ts
export const AppStrings = {
  brand: {
    name: "Food O Friend",
  },

  hero: {
    eyebrow: "GOOD FOOD BRINGS PEOPLE TOGETHER",
    titlePrimary: "Great Food",
    titleAccent: "Greater Friends",
    description:
      "Food o Friend helps you meet new people and share meals based on your interests, location and vibe.",
    waitlistButton: "Join Waitlist",
  },

  navigation: {
    home: "Home",
    idea: "The Idea",
    howItWorks: "How It Works",
    safety: "Safety",
    faq: "FAQ",
  },
};
```

Use Supabase `site_content` for content that should be remotely customizable.

Use local constants as:

- fallback content
- routes
- labels
- validation messages
- configuration values

Do not scatter strings across components.

---

# ASSET CONSTANTS

Create:

```text
constants/app_assets.ts
```

Example:

```ts
export const AppAssets = {
  hero: {
    background: "hero/hero-friends-dining.webp",
    handwritten: "decorations/hero-handwritten-text.png",
  },

  solution: {
    phones: "solution/app-phone-mockups.webp",
  },

  safety: {
    background: "safety/friends-sunset.webp",
    handwritten: "decorations/safety-handwritten-text.png",
  },

  branding: {
    icon: "branding/chef-hat-logo.png",
    logo: "branding/food-o-friend-logo.png",
  },

  avatars: [
    "avatars/avatar-01.webp",
    "avatars/avatar-02.webp",
    "avatars/avatar-03.webp",
    "avatars/avatar-04.webp",
  ],
};
```

Do not hardcode full Supabase URLs.

Use:

```text
lib/storage.ts
```

to generate public URLs.

---

# RESPONSIVE REQUIREMENTS

The website must work on all practical screen sizes.

Explicitly test:

```text
320px
344px
360px
375px
390px
412px
430px
480px
540px
600px
768px
820px
1024px
1280px
1366px
1440px
1536px
1920px
2560px
```

Also explicitly test:

## Samsung Galaxy Z Fold 5

Cover screen:

```text
approximately 344px wide
```

Inner unfolded screen:

```text
approximately 1812 x 2176 logical/device rendering considerations
```

The site must not:

- horizontally overflow
- cut text
- clip buttons
- overlap sections
- make navigation unusable
- stretch images incorrectly
- create unreadably small typography
- break forms
- break cards

---

# RESPONSIVE BEHAVIOR

## Mobile

On narrow screens:

- use mobile navigation
- stack hero content
- keep hero image visually strong
- avoid placing text over faces
- make waitlist form vertically stack if necessary
- cards become one-column or two-column depending on width
- Problem and Solution become vertical sections
- phone mockup remains visible but scaled correctly
- How It Works becomes vertical
- Safety becomes vertical
- bottom CTA becomes vertical
- footer content wraps cleanly

## Tablet

Use balanced 2-column layouts when practical.

## Desktop

Match the reference screenshot as closely as possible.

## Large Desktop

Do not stretch the layout infinitely.

Use a sensible max content width such as approximately:

```text
1280px - 1440px
```

while allowing background images and full-width sections to span the viewport.

---

# PERFORMANCE REQUIREMENTS

The website must be fast.

Use:

- Server Components where appropriate
- Client Components only when interaction requires them
- optimized image loading
- lazy loading below-the-fold images
- proper image dimensions
- WebP where available
- minimal JavaScript
- avoid unnecessary state
- avoid unnecessary `useEffect`
- avoid unnecessary rerenders
- no giant client-side component for the whole homepage
- font optimization
- avoid layout shift
- skeleton/loading state only where needed

Target good Core Web Vitals.

---

# SECURITY REQUIREMENTS

Mandatory:

- Never expose Supabase secret key/service role key in frontend.
- Frontend may only use the publishable/anon key.
- Keep `.env.local` ignored by Git.
- Use Supabase RLS.
- Validate and sanitize form data.
- Validate email on frontend and backend/database layer.
- Do not allow public users to read the waitlist email list.
- Do not log personal email addresses unnecessarily.
- Handle Supabase errors safely.
- Do not expose raw stack traces to visitors.
- Do not trust client input.
- Prevent duplicate waitlist registration.
- Use accessible forms.
- Add basic spam protection architecture without adding unnecessary complexity.

---

# ACCESSIBILITY REQUIREMENTS

Use:

- semantic headings
- one logical `h1`
- proper button elements
- labels for forms
- useful alt text
- decorative images with empty alt where appropriate
- visible focus states
- keyboard navigation
- sufficient color contrast
- accessible mobile navigation
- `aria-expanded` for menu toggles where needed

---

# PHASE 1 — FOUNDATION, ARCHITECTURE & DESIGN SYSTEM

## Prompt

```text
PHASE 1 ONLY.

Build the architectural foundation for my Food O Friend Next.js website.

Do not build the full website yet.

The final website will recreate the supplied Food O Friend screenshot as closely as possible.

Requirements:

1. Inspect the existing Next.js project before changing anything.

2. Preserve the existing working Supabase connection.

3. Use a clean MVC-inspired architecture suitable for Next.js.

Create/refactor the structure into:

app/
components/common/
components/layout/
components/home/
components/registration/
components/restaurant-owner/
controllers/
models/
services/
lib/
constants/
utils/
types/

4. Do not over-engineer the application.

5. Create:

constants/app_strings.ts
constants/app_routes.ts
constants/app_assets.ts
constants/app_colors.ts
constants/app_config.ts

6. Move all reusable/static UI strings into app_strings.ts.

7. Define the Food O Friend color system based on the screenshot:

- near-black / charcoal backgrounds
- Food O Friend orange
- warm white
- white
- muted gray
- subtle orange tint

Do not introduce purple, blue, or unrelated branding colors.

8. Create a reusable Supabase Storage helper:

lib/storage.ts

It must generate public URLs from the existing public bucket:

site-assets

Do not hardcode full Supabase URLs throughout the application.

9. Add the existing asset paths to app_assets.ts.

10. Create reusable base components:

- Container
- AppButton
- AppInput
- SectionTitle
- LoadingSpinner

11. Create TypeScript models/interfaces for:

- site content
- waitlist response
- FAQ
- registration data
- restaurant owner data

12. Create service/controller separation for Supabase operations.

13. Ensure the application still builds and runs after the refactor.

14. Keep page.tsx very small. It should compose sections rather than contain the entire website.

15. Do not create duplicated helpers or duplicated constants.

16. Maintain strict TypeScript.

17. Do not add unnecessary dependencies.

18. Add a short ARCHITECTURE.md explaining where future code belongs.

At the end:

- run lint
- run TypeScript/build checks
- fix all errors
- show me the files created/changed
- stop after Phase 1
```

---

# PHASE 2 — EXACT RESPONSIVE LANDING PAGE UI

## Prompt

```text
PHASE 2 ONLY.

Now build the Food O Friend landing page.

Use the supplied screenshot as the visual source of truth.

Do NOT redesign it.

Goal:
Recreate the desktop screenshot as closely as possible while producing a fully responsive implementation.

Use the architecture created in Phase 1.

Build these sections in this exact order:

1. Header / navigation
2. Hero section
3. Four-item feature strip
4. Problem + Solution section
5. How It Works section
6. Safety section
7. Orange waitlist CTA
8. Footer

HEADER

Match the screenshot:

- Food O Friend logo on left
- centered/desktop navigation
- Home active with orange styling
- The Idea
- How It Works
- Safety
- FAQ
- orange Join Waitlist button on right

Mobile:
- replace desktop nav with an accessible hamburger menu
- no overflow
- logo remains visible
- Join Waitlist CTA remains easy to access

HERO

Match the screenshot closely:

Left content:
- eyebrow
- large white "Great Food"
- large orange "Greater Friends"
- supporting paragraph
- email waitlist form
- avatar group
- dynamic real waitlist count

Right/background:
Use Supabase Storage asset:

hero/hero-friends-dining.webp

Use decorative asset:

decorations/hero-handwritten-text.png

The hero should feel visually similar to the screenshot:
dark cinematic image, orange warmth, text readable on left.

FEATURE STRIP

Create four features:

- Meet Real People
- Share Amazing Meals
- Discover Your City
- Build Meaningful Connections

Use reusable feature item components.

PROBLEM / SOLUTION

Left:
"The Problem"
"Great food is better when shared, but..."

Three reusable cards:

1. It's hard to find people with similar taste and vibe.
2. Many people eat alone even though they want company.
3. Existing platforms are not focused on food meetups.

Right:
"Our Solution"
"A community built around good food."

Use:

solution/app-phone-mockups.webp

HOW IT WORKS

Match the light section from the screenshot.

Heading:
"Simple Steps to Meet Food Friends"

Steps:

1. Create Your Profile
2. Find or Create a Meetup
3. Dine, Connect, Repeat

Use arrows/flow indication on desktop.

On mobile/foldables, change this into a vertical progression.

SAFETY

Use:

safety/friends-sunset.webp
decorations/safety-handwritten-text.png

Heading:

"YOUR SAFETY COMES FIRST"
"A Safe and Respectful Community"

Safety items:

- Your personal info is always private
- Meetups are based on age group and interests
- You control what you share and when
- We promote a respectful and healthy environment

BOTTOM CTA

Orange full-width section.

Heading:

"Join the Food o Friend Waitlist"

Text:

"Get early access, exclusive updates and be part of our launch community."

Reuse the exact same WaitlistForm component used in the hero.

Do not duplicate the waitlist logic.

FOOTER

Include:

- logo
- navigation
- social placeholders/links
- Privacy Policy
- Terms of Service
- copyright

RESPONSIVENESS

Explicitly test:

320
344
360
375
390
412
430
480
540
600
768
820
1024
1280
1366
1440
1536
1920
2560

Explicitly support Samsung Galaxy Z Fold 5 narrow cover screen and unfolded screen.

Requirements:

- zero horizontal overflow
- no clipped text
- no overlapping content
- no distorted images
- no broken navbar
- no tiny tap targets
- no giant whitespace
- readable content at every breakpoint

Desktop should remain visually close to the screenshot.

Use sensible fluid CSS/clamp values where appropriate instead of dozens of arbitrary breakpoint hacks.

Do not duplicate layouts unnecessarily.

At the end:

- run lint
- run build
- fix responsive problems
- inspect all major sections
- stop after Phase 2
```

---

# PHASE 3 — SUPABASE CONTENT + WAITLIST INTEGRATION

## Prompt

```text
PHASE 3 ONLY.

Connect the finished Food O Friend landing page to the existing Supabase backend.

Do not redesign any section.

Existing database:

waitlist
site_content
faq_items

Existing RPC:

get_waitlist_count

Existing bucket:

site-assets

Requirements:

1. Load customizable website text from `site_content`.

2. Keep local values from constants/app_strings.ts as safe fallbacks if Supabase content cannot load.

3. Do not block the entire homepage if Supabase content fails.

4. Use server-side data fetching where appropriate.

5. Do not make the whole landing page a Client Component.

6. Load FAQ entries from faq_items.

7. Implement waitlist registration using the existing waitlist table.

8. Reuse one WaitlistForm component in:
- hero
- bottom CTA

9. After successful registration:
- clear the field
- display a friendly success message
- refresh/update the waitlist count without full page reload

10. Duplicate email:
Display a friendly message such as:
"You're already on the waitlist."

11. Never display raw Supabase database errors to users.

12. Validate:
- required email
- trim whitespace
- lowercase email
- valid email format

13. Disable submit button while submitting.

14. Prevent accidental double submission.

15. Use the existing RPC `get_waitlist_count`.

16. Do not fetch the full waitlist just to count users.

17. Do not expose waitlist email addresses publicly.

18. Use RLS-compatible frontend operations.

19. Images must come from Supabase Storage using app_assets.ts + storage helper.

20. Add graceful fallback behavior for missing images.

21. Add FAQ accordion UI while preserving the visual design.

22. Navigation links must scroll to the appropriate homepage sections:

- Home
- The Idea
- How It Works
- Safety
- FAQ

23. Join Waitlist navigation buttons should focus or navigate to the waitlist form.

At the end:

- test valid signup
- test duplicate signup
- test invalid email
- test Supabase failure handling
- test count refresh
- run lint
- run build
- stop after Phase 3
```

---

# PHASE 4 — REGISTRATION + RESTAURANT OWNER PAGES

## Prompt

```text
PHASE 4 ONLY.

Add two new pages while preserving the existing Food O Friend brand and architecture.

Do not change the landing page design unless required for navigation.

Create:

/register

and

/restaurant-owner

----------------------------------------
PAGE 1: /register
----------------------------------------

Purpose:
Allow interested users to register more information after joining the waitlist.

The page should visually belong to the same website:

- black / charcoal
- orange
- warm white
- same typography
- same header/footer
- same buttons/forms
- responsive
- clean

Registration fields:

- Full name
- Email
- City
- Country
- Age range
- Food interests
- Social interests
- Preferred meetup type
- Optional message
- Agreement checkbox for privacy/updates

Do not request unnecessary sensitive information.

Validate all fields appropriately.

Use reusable form components.

Create the required model, controller, service, validation helper, and Supabase integration.

If a new Supabase table is required, provide the exact SQL migration in a separate file such as:

supabase/registration.sql

Do not embed admin credentials.

----------------------------------------
PAGE 2: /restaurant-owner
----------------------------------------

Purpose:
Create a separate conversion page for restaurant owners.

Core message:

"Are you a restaurant owner?"

"Find your next group of friends."

Explain that Food O Friend creates opportunities for restaurants to host groups of people who want to meet, eat, and connect.

Communicate the idea:

People do not need to be completely different to connect.
Shared food tastes, interests, locations, and experiences can bring people together.

Suggested copy direction:

"Are you a restaurant owner?
Turn empty tables into new connections."

"Food O Friend helps people discover new friends through shared dining experiences — and helps restaurants welcome new groups of customers."

Include clear benefits:

- attract new groups
- increase dine-in discovery
- host community meetups
- reach people looking for new dining experiences
- build repeat customers
- become a Food O Friend meetup location

Create a restaurant interest form with:

- Restaurant name
- Owner/contact name
- Email
- Phone optional
- City
- Restaurant address optional
- Cuisine type
- Website/Instagram optional
- Estimated seating capacity
- Interested in hosting meetups? yes/no
- Message

CTA examples:

"Register Your Restaurant"
"Become a Meetup Location"

Use the same brand system and reusable components.

If a new Supabase table is required, provide migration SQL in:

supabase/restaurant_owners.sql

Security:

- enable RLS
- allow public insert only for allowed fields
- no public select of submissions
- validate input
- never expose secret/service keys

Responsive:

Both new pages must work properly on:

320px through 2560px

and explicitly on Samsung Galaxy Z Fold 5.

At the end:

- test both forms
- test validation
- test mobile layouts
- test Z Fold-sized layout
- run lint
- run build
- stop after Phase 4
```

---

# PHASE 5 — FINAL RESPONSIVENESS, PERFORMANCE, SECURITY & PRODUCTION QA

## Prompt

```text
PHASE 5 ONLY.

Perform final production hardening for the Food O Friend website.

Do not redesign the website.

The desktop homepage must remain visually close to the supplied reference screenshot.

Audit and improve:

1. RESPONSIVENESS

Test at:

320
344
360
375
390
412
430
480
540
600
768
820
1024
1280
1366
1440
1536
1920
2560

Also specifically test:

Samsung Galaxy Z Fold 5 cover display
Samsung Galaxy Z Fold 5 unfolded display

Check every page:

/
 /register
 /restaurant-owner
 /privacy
 /terms

Fix:

- horizontal scrolling
- clipped text
- image overflow
- broken menus
- awkward wrapping
- oversized headings
- tiny tap targets
- excessive blank space
- cards overflowing
- form controls leaving viewport
- phone mockups overlapping text

2. VISUAL MATCH

Compare homepage carefully to the supplied screenshot.

Keep:

- black/orange aesthetic
- hero proportions
- feature strip
- Problem/Solution contrast
- light How It Works section
- dark Safety section
- bright orange final CTA
- dark footer

Do not drift into a generic SaaS template.

3. PERFORMANCE

Audit:

- unnecessary Client Components
- unnecessary JavaScript
- rerenders
- Supabase requests
- duplicate network requests
- image dimensions
- lazy loading
- image formats
- font loading
- layout shifts
- unused packages
- unused CSS
- oversized components

Optimize without changing visual output.

4. SECURITY

Audit:

- no secret/service Supabase key in client bundle
- `.env.local` ignored
- correct RLS assumptions
- public forms only perform inserts they need
- waitlist cannot be publicly selected
- registration submissions cannot be publicly selected
- restaurant-owner submissions cannot be publicly selected
- validation exists
- duplicate submissions handled
- no raw stack traces shown
- no unsafe HTML rendering
- external links use appropriate security attributes

5. CODE QUALITY

Audit for:

- duplicated strings
- duplicated JSX
- duplicated styles
- duplicated Supabase calls
- magic values
- huge components
- unused functions
- unused imports
- `any`
- inconsistent naming

Refactor where needed without changing behavior.

6. ACCESSIBILITY

Check:

- keyboard navigation
- focus indicators
- semantic headings
- form labels
- image alt text
- mobile menu accessibility
- ARIA only where appropriate
- contrast
- touch targets

7. SEO

Add:

- title
- meta description
- Open Graph data
- favicon/logo usage
- canonical configuration where appropriate
- sitemap if appropriate
- robots configuration
- structured metadata only if it is accurate

Suggested homepage positioning:

Food O Friend — Great Food, Greater Friends

Description:
Meet new people through shared food experiences, discover dining meetups, and build meaningful connections around great food.

8. PRODUCTION

Prepare for Vercel.

Verify required public environment variables:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

Never add:

SUPABASE_SECRET_KEY

to client-side code or Vercel public environment variables.

9. FINAL CHECKS

Run:

npm run lint
npm run build

Fix all errors.

Also check the browser console for avoidable errors/warnings.

10. FINAL REPORT

Create:

PRODUCTION_CHECKLIST.md

Include:

- completed pages
- responsive breakpoints tested
- Supabase integrations
- database tables used
- Storage assets used
- security checks
- performance checks
- remaining optional improvements

Do not add new unnecessary features.

Finish with a production-ready site that closely matches the supplied Food O Friend reference.
```

---

# FINAL WEBSITE ROUTES

The finished application should contain at least:

```text
/                   Landing page
/register           User registration / early access profile
/restaurant-owner   Restaurant partnership registration
/privacy            Privacy Policy
/terms              Terms of Service
```

---

# HOMEPAGE SECTION IDS

Use predictable IDs:

```text
#home
#idea
#how-it-works
#safety
#faq
#waitlist
```

Navigation should use these consistently.

---

# WAITLIST FLOW

The waitlist experience should be:

```text
Visitor
   ↓
Enter email
   ↓
Validate
   ↓
Submit once
   ↓
Supabase waitlist table
   ↓
Success message
   ↓
Refresh get_waitlist_count RPC
   ↓
Updated social proof
```

Do not duplicate this flow between Hero and Final CTA.

Both forms must share the same controller/service logic.

---

# CONTENT MANAGEMENT

The website should use:

```text
site_content
```

for remotely customizable landing-page text where practical.

Examples:

```text
hero
social_proof
problem
solution
how_it_works
safety
cta
```

Use `app_strings.ts` as fallback values.

This ensures the homepage can still render if remote content is temporarily unavailable.

---

# DESIGN DIRECTION

The design must stay close to the reference:

```text
Premium social food community
Dark cinematic photography
Warm restaurant atmosphere
Orange highlights
Near-black backgrounds
Warm white content areas
Bold rounded typography
Friendly people
Food-first visuals
Modern but not overly futuristic
Western / international visual direction
```

Avoid:

```text
purple gradients
generic blue SaaS styling
glassmorphism everywhere
random neon effects
over-animation
Asian-inspired ornamental styling
generic dashboard design
```

---

# IMPORTANT FINAL RULE

Each phase must preserve everything successfully completed in previous phases.

Do not solve a new phase by rewriting unrelated working code.

Before changing code:

1. inspect existing implementation
2. understand reusable code
3. reuse it
4. change only what the phase requires

The result should be clean, maintainable, fast, secure, responsive, and visually faithful to the supplied Food O Friend screenshot.
