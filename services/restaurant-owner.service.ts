import "server-only";

import { AppConfig } from "@/constants/app_config";
import { supabase } from "@/lib/supabase";
import type { RestaurantOwnerData } from "@/models/restaurant-owner.model";

const { tables, timeoutMs } = AppConfig.database;

/** Insert only — RLS prevents the public key from reading submissions back. */
export const insertRestaurantOwner = async (data: RestaurantOwnerData): Promise<void> => {
  const { error } = await supabase
    .from(tables.restaurantOwners)
    .insert({
      restaurant_name: data.restaurantName,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      address: data.address,
      cuisine_type: data.cuisineType,
      website_or_instagram: data.websiteOrInstagram,
      seating_capacity: data.seatingCapacity,
      interested_in_hosting: data.interestedInHosting,
      message: data.message,
      consent: data.consent,
    })
    .abortSignal(AbortSignal.timeout(timeoutMs));

  if (error) throw error;
};
