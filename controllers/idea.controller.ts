import "server-only";

import { IdeaJourneys, IdeaScreensFallback, type IdeaJourneyKey } from "@/constants/app_idea_content";
import { getIdeaImageUrl, isIdeaImageUrl } from "@/lib/storage";
import type { IdeaJourney, IdeaScreen, IdeaScreenRow } from "@/models/idea-screen.model";
import { fetchActiveIdeaScreens } from "@/services/idea.service";
import { logSafeError } from "@/utils/errors";

const JOURNEY_KEYS = IdeaJourneys.map((journey) => journey.key);

const isText = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const isJourneyKey = (value: unknown): value is IdeaJourneyKey =>
  JOURNEY_KEYS.some((key) => key === value);

const toActions = (value: unknown): string[] => (Array.isArray(value) ? value.filter(isText) : []);

/** Validates one untrusted row; returns null for malformed rows so they are skipped. */
const toIdeaScreen = (row: IdeaScreenRow): { screen: IdeaScreen; journeyTitle: string } | null => {
  const { journey_key, journey_title, screen_number, screen_key, title, description, image_path } = row;
  if (
    !isJourneyKey(journey_key) ||
    !isText(screen_key) ||
    !isText(title) ||
    !isText(description) ||
    !isText(image_path) ||
    typeof screen_number !== "number" ||
    !Number.isInteger(screen_number)
  ) {
    return null;
  }

  // Prefer the stored URL, but only if it points at our idea bucket; otherwise rebuild it.
  const imageUrl = isText(row.image_url) && isIdeaImageUrl(row.image_url) ? row.image_url : getIdeaImageUrl(image_path);

  return {
    journeyTitle: isText(journey_title) ? journey_title : "",
    screen: {
      id: row.id,
      journeyKey: journey_key,
      screenNumber: screen_number,
      screenKey: screen_key,
      title,
      description,
      imagePath: image_path,
      imageUrl,
      imageAlt: isText(row.image_alt) ? row.image_alt : title,
      actions: toActions(row.actions),
      note: isText(row.note) ? row.note : null,
    },
  };
};

const fallbackScreens = (): IdeaScreen[] =>
  IdeaScreensFallback.map((copy) => ({ ...copy, id: copy.screenKey, imageUrl: getIdeaImageUrl(copy.imagePath) }));

/** Groups screens (already in global order) into the page's carousel order. */
const groupByJourney = (screens: readonly IdeaScreen[], titles: Map<IdeaJourneyKey, string>): IdeaJourney[] =>
  IdeaJourneys.map(({ key, title }) => ({
    key,
    title: titles.get(key) || title,
    screens: screens.filter((screen) => screen.journeyKey === key),
  })).filter((journey) => journey.screens.length > 0);

/**
 * Loads /idea content from Supabase (one query). Never throws: if Supabase is
 * unavailable or returns no usable rows, the local fallback copy is used.
 */
export const getIdeaJourneys = async (): Promise<IdeaJourney[]> => {
  try {
    const parsed = (await fetchActiveIdeaScreens()).map(toIdeaScreen).filter((item) => item !== null);
    if (parsed.length > 0) {
      const titles = new Map<IdeaJourneyKey, string>();
      for (const { screen, journeyTitle } of parsed) {
        if (journeyTitle && !titles.has(screen.journeyKey)) titles.set(screen.journeyKey, journeyTitle);
      }
      return groupByJourney(
        parsed.map(({ screen }) => screen).sort((a, b) => a.screenNumber - b.screenNumber),
        titles,
      );
    }
  } catch (error) {
    logSafeError("idea.screens", error);
  }
  return groupByJourney(fallbackScreens(), new Map());
};
