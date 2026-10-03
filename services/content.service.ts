import "server-only";

import { AppConfig } from "@/constants/app_config";
import { supabase } from "@/lib/supabase";
import type { FaqItemRow, SiteContentRow } from "@/models/site-content.model";

const { tables, timeoutMs } = AppConfig.database;

export const fetchSiteContentRows = async (): Promise<SiteContentRow[]> => {
  const { data, error } = await supabase
    .from(tables.siteContent)
    .select("id, section, content")
    .abortSignal(AbortSignal.timeout(timeoutMs));

  if (error) throw error;
  return data ?? [];
};

export const fetchActiveFaqItems = async (): Promise<FaqItemRow[]> => {
  const { data, error } = await supabase
    .from(tables.faqItems)
    .select("id, question, answer, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true, nullsFirst: false })
    .abortSignal(AbortSignal.timeout(timeoutMs));

  if (error) throw error;
  return data ?? [];
};
