import type { IdeaJourneyKey } from "@/constants/app_idea_content";

/** Raw row shape of `idea_screens`. Fields are re-validated before use. */
export interface IdeaScreenRow {
  id: string;
  journey_key: unknown;
  journey_title: unknown;
  screen_number: unknown;
  screen_key: unknown;
  title: unknown;
  description: unknown;
  image_path: unknown;
  image_url: unknown;
  image_alt: unknown;
  actions: unknown;
  note: unknown;
}

export interface IdeaScreen {
  id: string;
  journeyKey: IdeaJourneyKey;
  screenNumber: number;
  screenKey: string;
  title: string;
  description: string;
  imagePath: string;
  imageUrl: string;
  imageAlt: string;
  actions: readonly string[];
  note: string | null;
}

export interface IdeaJourney {
  key: IdeaJourneyKey;
  title: string;
  screens: readonly IdeaScreen[];
}
