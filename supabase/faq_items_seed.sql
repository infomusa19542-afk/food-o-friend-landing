-- Seed the homepage FAQ. Run once in the Supabase SQL editor.
-- The site shows local fallback FAQs (constants/app_strings.ts) until active rows exist.
insert into public.faq_items (question, answer, sort_order, is_active) values
  ('What is Food O Friend?',
   'Food o Friend helps you meet new people and share meals based on your interests, location and vibe.',
   1, true),
  ('When will Food O Friend launch?',
   'We''re preparing for launch now. Join the waitlist and you''ll be among the first to know when meetups open in your city.',
   2, true),
  ('Does it cost anything to join the waitlist?',
   'No. Joining the waitlist is free and only needs your email address.',
   3, true),
  ('How do you keep meetups safe?',
   'Your personal info stays private, meetups are based on age group and interests, and you control what you share and when.',
   4, true);
