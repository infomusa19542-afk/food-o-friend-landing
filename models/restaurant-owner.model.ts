import type { ActionResult } from "@/types";

/** Untrusted form values as submitted by a visitor. */
export interface RestaurantOwnerInput {
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  cuisineType: string;
  websiteOrInstagram: string;
  seatingCapacity: string;
  interestedInHosting: string;
  message: string;
  consent: boolean;
  /** Spam trap — real users leave it empty. */
  honeypot?: string;
}

/** Validated, normalized restaurant submission ready to store. */
export interface RestaurantOwnerData {
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string | null;
  city: string;
  address: string | null;
  cuisineType: string;
  websiteOrInstagram: string | null;
  seatingCapacity: number;
  interestedInHosting: boolean;
  message: string | null;
  consent: true;
}

export type RestaurantOwnerResponse = ActionResult;
