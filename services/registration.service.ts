import "server-only";

import { AppConfig } from "@/constants/app_config";
import { supabase } from "@/lib/supabase";
import type { RegistrationData } from "@/models/registration.model";

const { tables, timeoutMs } = AppConfig.database;

/** Insert only — RLS prevents the public key from reading registrations back. */
export const insertRegistration = async (data: RegistrationData): Promise<void> => {
  const { error } = await supabase
    .from(tables.userRegistrations)
    .insert({
      full_name: data.fullName,
      email: data.email,
      city: data.city,
      country: data.country,
      age_range: data.ageRange,
      food_interests: data.foodInterests,
      social_interests: data.socialInterests,
      preferred_meetup_type: data.preferredMeetupType,
      message: data.message,
      marketing_consent: data.marketingConsent,
    })
    .abortSignal(AbortSignal.timeout(timeoutMs));

  if (error) throw error;
};
