# Food O Friend - Idea Page Implementation Prompt for Codex

You are working inside the existing **Food O Friend** Next.js project.

Your task is to build a new **Idea / Product Journey** subpage that visually explains how Food O Friend works using the already-created mobile app screenshots stored in Supabase.

Do not redesign the rest of the website.
Do not break existing routes, forms, Supabase integration, SEO, responsiveness, or styling.
Preserve the existing Food O Friend visual direction: dark charcoal / black, warm cream, and orange.

---

## Primary Goal

Create a new page that makes the Food O Friend product idea understandable at a glance.

The page should tell the story through **three separate horizontal carousels**:

1. **Account & Onboarding**
2. **Home / Profile / Discovery**
3. **Meetup Journey**

Each carousel should contain the relevant phone screenshots in user-journey order.

Every screenshot must have supporting text under or beside it that explains what the screen is doing.

The experience should feel like a polished startup product walkthrough, not a raw gallery.

---

# Route

Create:

```text
/idea
```

Also connect the existing **The Idea** navigation item to `/idea` if it currently points only to a homepage anchor.

Do not remove existing homepage sections.

---

# Source of Image URLs

The screenshots are already uploaded to Supabase Storage.

Read their URLs from:

```text
idea_uploaded_urls.json
```

Do not hardcode the full Supabase URLs manually throughout components.

Create a clean data/config layer that loads or maps the screenshot URLs from `idea_uploaded_urls.json`.

If direct JSON import is suitable in this Next.js project, use it.

Otherwise create a small helper/model layer that safely exposes the image URLs.

The source paths in the JSON correspond to:

```text
auth_onboarding/*
meetup/*
profile_home/*
```

Do not move the images to `/public`.
Do not duplicate the images.
Continue serving them from Supabase Storage.

Use `next/image` where appropriate.

Use proper `sizes`, width/height or aspect-ratio handling to avoid CLS.

Screenshots must remain crisp and preserve their phone-screen proportions.

---

# Page Structure

The page should have the following sections.

## 1. Hero Section

Create a compact but premium hero section at the top of `/idea`.

Suggested content:

```text
Eyebrow: THE IDEA

Heading:
From strangers to shared tables.

Description:
Food O Friend is designed around one simple journey: discover a meal, meet the right people, coordinate safely, enjoy dinner together, and stay connected afterwards.
```

Add a short supporting line such as:

```text
Explore the product journey below.
```

Do not make this hero excessively tall.

Use the existing Food O Friend design system and shared layout components.

---

# Carousel 1 - Account & Onboarding

Section title:

```text
01 - Account & Onboarding
```

Section description:

```text
A simple onboarding flow introduces the idea, gives users control over privacy and location, and gets them ready to discover nearby group meals.
```

Screens in order:

### 1. Welcome

Image:

```text
auth_onboarding/get_started.png
```

Title:

```text
Welcome
```

Description:

FoodFriend brings people together through shared meals. Discover nearby restaurants, meet people with similar interests, and turn a meal into a new connection.

Actions represented by the screen:

- Get Started - begin onboarding.
- Sign In - access an existing account.

---

### 2. Expand Your Circle

Image:

```text
auth_onboarding/onbording1_auth.png
```

Description:

Step outside your usual circle and meet people who share your taste in food. Join a group meal and start a conversation in a welcoming restaurant.

---

### 3. Privacy & Control

Image:

```text
auth_onboarding/onbording2_auth.png
```

Description:

Choose what you share. Your contact details and live location are shared with other members only when you allow it. Meetup suggestions consider your interests and age preferences.

Supporting points:

- Review the privacy policy.
- Continue without sharing live location.

---

### 4. Build New Connections

Image:

```text
auth_onboarding/onbording3_auth.png
```

Description:

Meet nearby people, exchange ideas, and discover different perspectives. Keep the conversation going after dinner to build friendships beyond the table.

---

### 5. Choose Your Location

Image:

```text
auth_onboarding/onbording4_auth.png
```

Description:

Set your location to discover nearby restaurants and group meals.

Supporting points:

- Use My Location - allow location access.
- Choose City Manually - explore without granting location access.
- Users can change their selected city later.

---

### 6. Create Your Account

Image:

```text
auth_onboarding/create_account.png
```

Description:

Create an account with your name, email address, and password. The account lets users reserve seats, join group conversations, and manage meetups.

Supporting points:

- Create a new account.
- Switch to Sign In when an account already exists.

---

# Carousel 2 - Discover, Home & Profile

Section title:

```text
02 - Discover & Manage
```

Section description:

```text
Users discover nearby meals, explore restaurants, track upcoming and past meetups, receive relevant updates, and learn more about the people they meet.
```

Screens in this carousel:

### 7. Discover Nearby Meals

Image:

```text
profile_home/Home_page.png
```

Description:

Explore restaurants and available group meals nearby. See offers, new arrivals, meal prices, times, and remaining seats.

Supporting points:

- Search or filter available meals.
- Open a restaurant or meetup.
- Save a place to favourites.

---

### 8. Restaurant & Meetup Details

Image:

```text
profile_home/detail page.png
```

Description:

Review the restaurant, food photos, location, and group meal details before joining. Check the price per person, meetup time, and available seats.

Supporting points:

- Join an available group meal.
- Save the restaurant.
- Continue to reservation confirmation.

---

### 21. Upcoming Meetups

Image:

```text
profile_home/meetups_incoming.png
```

Description:

Track future reservations and their current status.

Supporting states:

- Awaiting confirmation.
- Waiting for more members.
- Confirmed and ready to attend.
- Cancelled or expired, with refund status shown.

---

### 22. Past Meetups

Image:

```text
profile_home/your meetups past.png
```

Description:

Review previous meals with the restaurant, date, members, and amount paid.

Supporting points:

- Return to group chat.
- View payment details and receipts.
- Save the restaurant to favourites.

---

### 23. Notifications

Image:

```text
profile_home/notifications.png
```

Description:

Stay updated on nearby meetups and changes to groups. Notifications can highlight someone from a previous meal, an available seat, a member leaving, or a refund.

Supporting points:

- Open the related meetup or profile.
- Respond to updates that need attention.

---

### 24. Member Profile

Image:

```text
profile_home/profile.png
```

Description:

Get to know another member before or after a meetup. View their photo, name, age, work, interests, and favourite sports.

Supporting points:

- Discover shared interests.
- View shared meetup history where available.
- Connect through the group conversation.

Important:

If the supplied screenshot is clearly the signed-in user's own profile, label this card **My Profile** instead and describe editing personal details, preferences, and privacy settings.

---

# Carousel 3 - Meetup Journey

Section title:

```text
03 - The Meetup Journey
```

Section description:

```text
From reserving a seat to meeting the group, coordinating arrival, settling the bill, and completing the evening - the meetup flow keeps the whole experience connected.
```

Screens in order:

### 9. Confirm Your Seat

Image:

```text
meetup/1 confirmation.png
```

Description:

Review the selected meetup, total amount, and payment method. Read the cancellation terms before confirming the reservation.

Supporting points:

- Check restaurant, date, time, and price.
- Open the cancellation policy.
- Confirm and pay to reserve a seat.

---

### 10. Cancellation Policy

Image:

```text
meetup/2cancellation policy.png
```

Description:

Understand the cancellation and refund rules before committing. Cancellation depends on whether the group is still forming or already confirmed.

Supporting points:

- Review cancellation deadlines and refund eligibility.
- Return to the reservation.

Important:

The final product policy must later define exact deadlines and exceptions. Do not invent them on this page.

---

### 11. Seat Reserved

Image:

```text
meetup/3seat reserved.png
```

Description:

The reservation is successful. Users can see booking details and the current group status.

Supporting points:

- Check reserved seat and payment status.
- Open the group waiting room.

---

### 12. Group Awaiting Members

Image:

```text
meetup/4group_info awaiting.png
```

Description:

The seat is reserved while the group waits for more members. Users can see who joined, how many seats remain, and the confirmation deadline.

Supporting points:

- View member profiles.
- Open the group conversation.
- Track progress toward a confirmed meetup.

---

### 13. Group Confirmed

Image:

```text
meetup/5group_info full.png
```

Description:

The group is full and the meetup is confirmed. Review final members, restaurant, meal time, and meeting instructions.

Supporting points:

- Open group chat.
- Use voice or video calling.
- Check meeting point and directions.

---

### 14. Meeting Point

Image:

```text
meetup/6map_locaition decided.png
```

Description:

View the agreed meeting location on the map. The group can meet at the restaurant entrance or agree on another pickup point.

Supporting points:

- Check meeting time and location.
- Open directions.
- Share the meeting point in group chat.

---

### 15. Pickup Points & Member Locations

Image:

```text
meetup/7map_pickup points.png
```

Description:

Coordinate an optional shared ride using pickup points and member locations. Only members who allow location sharing should appear with a live position.

Supporting points:

- View shared pickup points.
- Request location access when a member's position is unknown.
- Continue coordination if a member declines.

---

### 16. Arrival & Waiting

Image:

```text
meetup/8arrival_page.png
```

Description:

Let the group know when you arrive at the restaurant. See who has arrived, who is on the way, and who has not checked in.

Supporting points:

- Tap I've Arrived.
- Contact the group through chat or calling.
- Wait for remaining members before dining.

---

### 17. Start Billing

Image:

```text
meetup/9start_billing.png
```

Description:

After the meal, review the bill and each member's share. Identify the person who paid the restaurant and attach the restaurant bill.

Supporting points:

- Review total and individual amounts.
- Confirm the bill payer, such as Alice.
- Continue to member confirmation.

---

### 18. Billing Confirmation

Image:

```text
meetup/10billing_confirmation.png
```

Description:

Each member reviews their share and confirms that the amount is correct. The screen shows who has confirmed and who is still pending.

Supporting points:

- Confirm personal amount.
- Raise a billing issue before settlement.
- Track group confirmation progress.

Important:

The proposed 80% confirmation threshold is not final. Do not present it as finalized product policy.

---

### 19. Dinner Wrap-Up

Image:

```text
meetup/11dinner wrap up.png
```

Description:

Review the completed meetup and final payment summary. See personal share, bill payer, and settlement status.

Supporting points:

- Check final amount.
- Continue to transfer result and receipts.
- Keep in touch through group chat.

---

### 20. Transfer Complete

Image:

```text
meetup/12transfer complete.png
```

Description:

The member's share has been transferred from their FoodFriend wallet to the person who paid the restaurant. For example, Jack's $24 is transferred to Alice's wallet because Alice paid the bill.

Supporting points:

- Download the wallet transfer receipt.
- Download the restaurant bill paid by Alice.
- Return to meetup history.

---

# Carousel UX Requirements

All three sections must use reusable carousel components.

Do NOT create three unrelated implementations.

Create something along the lines of:

```text
components/idea/
  IdeaHero.tsx
  IdeaCarousel.tsx
  IdeaScreenCard.tsx
  IdeaCarouselControls.tsx

models/
  idea.model.ts

constants/
  idea_content.ts

app/idea/page.tsx
```

Adapt the names to the existing project architecture if necessary.

---

## Desktop Behaviour

On large desktop widths:

- Show roughly 3 cards/screens at once where space allows.
- The center or active card should feel visually emphasized.
- Adjacent cards should remain visible enough to suggest horizontal movement.
- Add left/right arrow controls.
- Add progress dots or a subtle progress indicator.
- Users should be able to drag/swipe horizontally.
- Keep screenshot proportions consistent.

A card can use a structure similar to:

```text
[ phone screenshot ]

Step 09
Confirm Your Seat
Short explanation...

• supporting point
• supporting point
```

Do not make the text area excessively tall.

---

## Tablet Behaviour

- Show approximately 1.5 to 2 cards where appropriate.
- Keep arrows usable.
- Keep drag/swipe interaction.
- Do not squeeze text into narrow columns.

---

## Mobile Behaviour

- Show one primary card at a time.
- Allow native-feeling horizontal swipe.
- Use scroll snapping or the project's chosen carousel library.
- Make sure the next card slightly peeks in when visually appropriate.
- Keep controls touch-friendly.
- Avoid horizontal page overflow outside the carousel itself.

---

# Carousel Technology

First inspect the existing `package.json`.

Do not install a large carousel library unnecessarily.

Preferred order:

1. Reuse an existing carousel/swiper dependency if already installed.
2. Otherwise use a lightweight implementation with CSS scroll snap + React controls.
3. If a dependency is genuinely necessary, prefer a small well-maintained solution such as Embla Carousel.

Do not use a Flutter package such as `cached_network_image` because this project is Next.js.

For image caching/performance, use the existing Next.js image pipeline and browser/CDN caching.

The Supabase hostname should already be configured in `next.config.ts`; verify it rather than duplicating configuration.

---

# Visual Direction

Use the existing Food O Friend design system.

The page should feel like a continuation of the current site, not a different website.

Use:

- near-black / charcoal backgrounds
- warm cream/light sections where useful
- Food O Friend orange accents
- large, confident typography
- rounded phone/screenshot cards
- subtle borders
- soft shadows where appropriate
- generous spacing

Avoid:

- generic SaaS blue/purple gradients
- excessive glassmorphism
- excessive animation
- autoplay carousels that move before users can read
- tiny body text
- huge blank areas

The screenshot itself must remain the visual focus.

---

# Suggested Section Alternation

For visual rhythm, use something like:

```text
Hero               -> dark
Account carousel   -> cream/light
Discover carousel  -> dark
Meetup carousel    -> cream/light OR dark with orange accents
Final CTA           -> orange/deep-orange
```

Keep this consistent with the existing site.

---

# Final CTA

After the three carousels, add a concise CTA section.

Suggested copy:

```text
Great food is only the beginning.

Food O Friend is designed to make discovering people, meeting safely, sharing a meal, and staying connected feel like one simple journey.
```

Buttons:

```text
Join the Waitlist
For Restaurants
```

Use existing routes/components rather than creating duplicate CTA logic.

---

# Data Architecture

Do not hardcode card JSX repeatedly in `page.tsx`.

Create typed data models.

Suggested model:

```ts
export interface IdeaScreen {
  id: number;
  title: string;
  imageKey: string;
  description: string;
  points?: string[];
  note?: string;
}

export interface IdeaJourneySection {
  id: string;
  index: string;
  title: string;
  description: string;
  screens: IdeaScreen[];
}
```

Keep all user-facing strings centralized, consistent with the architecture already used by this project.

Do not scatter text literals across components.

---

# Image URL Mapping

Read `idea_uploaded_urls.json` and map each `imageKey` to its URL.

Example conceptual mapping:

```ts
const imageUrl = ideaUploadedUrls[screen.imageKey];
```

Handle missing entries gracefully.

If an image URL is missing:

- do not crash the page
- show a tasteful placeholder
- log only a safe development warning

Do not expose secret keys.

`idea_uploaded_urls.json` contains public Storage URLs only.

---

# Accessibility

Each screenshot must have meaningful alt text such as:

```text
Food O Friend confirmation screen showing meetup reservation details
```

Do not use filenames as alt text.

Carousel controls must have labels such as:

```text
Previous onboarding screen
Next onboarding screen
```

Requirements:

- keyboard-accessible controls
- visible focus states
- touch targets at least ~44px
- carousel region labelled with `aria-label`
- do not trap keyboard focus
- respect `prefers-reduced-motion`
- no autoplay

---

# Performance

There are 24 screenshots, so do not load all full-resolution images eagerly.

Requirements:

- only above-the-fold / first visible carousel images may load eagerly when necessary
- all other screenshots should lazy-load
- use accurate `sizes`
- prevent layout shifts
- do not request desktop-size images on small phones
- avoid rendering unnecessary duplicate screenshots
- avoid shipping Supabase JS to the client just to read public static image URLs

Since `idea_uploaded_urls.json` is static build data, prefer using it directly rather than making a Supabase API request on every page load.

---

# Responsive QA

Test `/idea` at least at:

```text
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
690
768
820
884
1024
1280
1312
1366
1440
1536
1812
1920
2560
```

Explicitly check:

- Galaxy Z Fold cover width
- Galaxy Z Fold unfolded width
- mobile landscape

Verify:

- no page-level horizontal overflow
- carousel horizontal scrolling stays contained
- screenshots are not clipped
- text does not overlap
- controls remain reachable
- cards do not become excessively tall
- section headings wrap naturally
- active card remains understandable at every size

---

# Navigation

Update navigation carefully.

If the current **The Idea** header item links to `/#idea`, update it to:

```text
/idea
```

Do not break the other homepage anchors:

```text
/#home
/#how-it-works
/#safety
/#faq
/#waitlist
```

Add an appropriate active state when `/idea` is open.

---

# SEO

Add metadata for `/idea`.

Suggested title:

```text
How Food O Friend Works | Food O Friend
```

Suggested description:

```text
Explore the Food O Friend product journey, from onboarding and discovering group meals to meetup coordination, billing, and staying connected afterwards.
```

Use the project's existing metadata helper.

Add `/idea` to the sitemap.

Do not invent production URLs.

---

# Security

- Do not use `SUPABASE_SECRET_KEY`.
- Do not make authenticated Storage calls for these public screenshots.
- Do not add secrets to client code.
- Do not dynamically render arbitrary HTML from JSON.
- Treat JSON data as plain typed content.

---

# Code Quality

Before coding, inspect the existing architecture and reuse:

- shared `Container`
- typography components
- buttons
- icons
- route constants
- color tokens
- metadata utilities
- image/Supabase helpers where appropriate

Do not duplicate existing abstractions.

Keep components focused and reusable.

Avoid `any`.

Do not place the entire page in one huge file.

---

# Verification

After implementation run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Then test `/idea` in the browser.

Verify all 24 screenshots resolve from `idea_uploaded_urls.json`.

Check browser console for errors.

Check that no screenshot returns 404.

---

# Final Report

When finished, report:

1. Files created
2. Files modified
3. `/idea` route implementation
4. Carousel implementation approach
5. How `idea_uploaded_urls.json` is consumed
6. Number of screenshots successfully mapped
7. Responsive test results
8. Accessibility checks
9. Performance decisions
10. Navigation changes
11. SEO changes
12. Lint / TypeScript / build results
13. Any missing URL/image mapping

Do not start unrelated work.
Do not redesign the rest of the website.
Do not create new product functionality beyond this product-idea walkthrough page.
