import { AppConfig } from "@/constants/app_config";
import { AgeRanges, FoodInterests, MeetupTypes, SocialInterests } from "@/constants/app_options";
import type { RegistrationData, RegistrationInput } from "@/models/registration.model";
import {
  asBoolean,
  asPayloadRecord,
  asString,
  asStringArray,
  createFieldValidator,
  type ValidationResult,
} from "@/utils/validators";

const limits = AppConfig.validation;

export const emptyRegistrationInput: RegistrationInput = {
  fullName: "",
  email: "",
  city: "",
  country: "",
  ageRange: "",
  foodInterests: [],
  socialInterests: [],
  preferredMeetupType: "",
  message: "",
  consent: false,
};

/** Coerces an untrusted Server Action payload into RegistrationInput. */
export const parseRegistrationInput = (payload: unknown): RegistrationInput => {
  const record = asPayloadRecord(payload);
  return {
    fullName: asString(record.fullName),
    email: asString(record.email),
    city: asString(record.city),
    country: asString(record.country),
    ageRange: asString(record.ageRange),
    foodInterests: asStringArray(record.foodInterests),
    socialInterests: asStringArray(record.socialInterests),
    preferredMeetupType: asString(record.preferredMeetupType),
    message: asString(record.message),
    consent: asBoolean(record.consent),
    honeypot: asString(record.honeypot),
  };
};

/** Shared by the form (UX) and the controller (security). Error keys match input keys. */
export const validateRegistration = (input: RegistrationInput): ValidationResult<RegistrationData> => {
  const v = createFieldValidator();
  return v.result<RegistrationData>({
    fullName: v.required("fullName", input.fullName, limits.nameMaxLength),
    email: v.email("email", input.email),
    city: v.required("city", input.city, limits.shortTextMaxLength),
    country: v.required("country", input.country, limits.shortTextMaxLength),
    ageRange: v.oneOf("ageRange", input.ageRange, AgeRanges),
    foodInterests: v.manyOf("foodInterests", input.foodInterests, FoodInterests),
    socialInterests: v.manyOf("socialInterests", input.socialInterests, SocialInterests),
    preferredMeetupType: v.oneOf("preferredMeetupType", input.preferredMeetupType, MeetupTypes),
    message: v.optionalMultiline("message", input.message, limits.messageMaxLength),
    marketingConsent: v.consent("consent", input.consent),
  });
};
