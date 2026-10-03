import { createClient } from "@supabase/supabase-js";
import { AppConfig } from "@/constants/app_config";

const { url: supabaseUrl, anonKey: supabaseAnonKey } = AppConfig.supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local.",
  );
}

/** Public (anon/publishable key) client. Never use a secret/service role key here. */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});
