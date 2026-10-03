import type { AgeRange, FoodInterest, MeetupType, SocialInterest } from "@/constants/app_options";
import type { ActionResult } from "@/types";

/** Untrusted form values as submitted by a visitor. */
export interface RegistrationInput {
  fullName: string;
  email: string;
  city: string;
  country: string;
  ageRange: string;
  foodInterests: string[];
  socialInterests: string[];
  preferredMeetupType: string;
  message: string;
  consent: boolean;
  /** Spam trap — real users leave it empty. */
  honeypot?: string;
}

/** Validated, normalized registration ready to store. */
export interface RegistrationData {
  fullName: string;
  email: string;
  city: string;
  country: string;
  ageRange: AgeRange;
  foodInterests: FoodInterest[];
  socialInterests: SocialInterest[];
  preferredMeetupType: MeetupType;
  message: string | null;
  marketingConsent: true;
}

export type RegistrationResponse = ActionResult;
