export type AgeRange = "18-24" | "25-34" | "35-44" | "45-54" | "55+";

export type MeetupType = "small_group" | "large_group" | "one_on_one" | "any";

export interface RegistrationData {
  fullName: string;
  email: string;
  city: string;
  country: string;
  ageRange: AgeRange;
  foodInterests: string[];
  socialInterests: string[];
  preferredMeetupType: MeetupType;
  message?: string;
  agreedToTerms: boolean;
}
