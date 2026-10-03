import "server-only";

import { AppConfig } from "@/constants/app_config";
import { supabase } from "@/lib/supabase";
import type { WaitlistInsert } from "@/models/waitlist.model";

const { tables, rpc } = AppConfig.database;

/** Insert only — RLS prevents the public key from reading waitlist rows back. */
export const insertWaitlistEntry = async (entry: WaitlistInsert): Promise<void> => {
  const { error } = await supabase.from(tables.waitlist).insert(entry);
  if (error) throw error;
};

export const fetchWaitlistCount = async (): Promise<number> => {
  const { data, error } = await supabase.rpc(rpc.waitlistCount);
  if (error) throw error;
  return typeof data === "number" ? data : Number(data) || 0;
};
