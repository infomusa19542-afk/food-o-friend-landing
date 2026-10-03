/**
 * Allowed values for form choices. These are stored in the database and mirrored by
 * CHECK constraints in supabase/*.sql — change both together. Labels live in AppStrings.
 */
export const AgeRanges = ["18-24", "25-34", "35-44", "45-54", "55+"] as const;

export const FoodInterests = [
  "italian",
  "asian",
  "middle_eastern",
  "street_food",
  "vegetarian_vegan",
  "fine_dining",
  "coffee_brunch",
  "desserts",
] as const;

export const SocialInterests = [
  "new_friends",
  "networking",
  "language_exchange",
  "travel",
  "sports_fitness",
  "arts_culture",
  "music",
  "gaming",
] as const;

export const MeetupTypes = ["small_group", "large_group", "either"] as const;

export const YesNo = ["yes", "no"] as const;

export type AgeRange = (typeof AgeRanges)[number];
export type FoodInterest = (typeof FoodInterests)[number];
export type SocialInterest = (typeof SocialInterests)[number];
export type MeetupType = (typeof MeetupTypes)[number];
export type YesNoValue = (typeof YesNo)[number];
