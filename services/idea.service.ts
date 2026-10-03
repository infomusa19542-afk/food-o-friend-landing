import "server-only";

import { AppConfig } from "@/constants/app_config";
import { supabase } from "@/lib/supabase";
import type { IdeaScreenRow } from "@/models/idea-screen.model";

const { tables, timeoutMs } = AppConfig.database;

/** One query for every active screen, in global journey order. */
export const fetchActiveIdeaScreens = async (): Promise<IdeaScreenRow[]> => {
  const { data, error } = await supabase
    .from(tables.ideaScreens)
    .select(
      "id, journey_key, journey_title, screen_number, screen_key, title, description, image_path, image_url, image_alt, actions, note",
    )
    .eq("is_active", true)
    .order("screen_number", { ascending: true })
    .abortSignal(AbortSignal.timeout(timeoutMs));

  if (error) throw error;
  return data ?? [];
};
