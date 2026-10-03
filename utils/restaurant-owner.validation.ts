import { AppConfig } from "@/constants/app_config";
import { YesNo } from "@/constants/app_options";
import type { RestaurantOwnerData, RestaurantOwnerInput } from "@/models/restaurant-owner.model";
import {
  asBoolean,
  asPayloadRecord,
  asString,
  createFieldValidator,
  type ValidationResult,
} from "@/utils/validators";

const limits = AppConfig.validation;

export const emptyRestaurantOwnerInput: RestaurantOwnerInput = {
  restaurantName: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  cuisineType: "",
  websiteOrInstagram: "",
  seatingCapacity: "",
  interestedInHosting: "",
  message: "",
  consent: false,
};

/** Coerces an untrusted Server Action payload into RestaurantOwnerInput. */
export const parseRestaurantOwnerInput = (payload: unknown): RestaurantOwnerInput => {
  const record = asPayloadRecord(payload);
  return {
    restaurantName: asString(record.restaurantName),
    contactName: asString(record.contactName),
    email: asString(record.email),
    phone: asString(record.phone),
    city: asString(record.city),
    address: asString(record.address),
    cuisineType: asString(record.cuisineType),
    websiteOrInstagram: asString(record.websiteOrInstagram),
    seatingCapacity: asString(record.seatingCapacity),
    interestedInHosting: asString(record.interestedInHosting),
    message: asString(record.message),
    consent: asBoolean(record.consent),
    honeypot: asString(record.honeypot),
  };
};

/** Shared by the form (UX) and the controller (security). Error keys match input keys. */
export const validateRestaurantOwner = (input: RestaurantOwnerInput): ValidationResult<RestaurantOwnerData> => {
  const v = createFieldValidator();
  return v.result<RestaurantOwnerData>({
    restaurantName: v.required("restaurantName", input.restaurantName, limits.shortTextMaxLength),
    contactName: v.required("contactName", input.contactName, limits.nameMaxLength),
    email: v.email("email", input.email),
    phone: v.optionalPhone("phone", input.phone),
    city: v.required("city", input.city, limits.shortTextMaxLength),
    address: v.optional("address", input.address, limits.addressMaxLength),
    cuisineType: v.required("cuisineType", input.cuisineType, limits.shortTextMaxLength),
    websiteOrInstagram: v.optionalWebsiteOrHandle("websiteOrInstagram", input.websiteOrInstagram),
    seatingCapacity: v.wholeNumber("seatingCapacity", input.seatingCapacity, limits.seatingCapacity),
    interestedInHosting: v.oneOf("interestedInHosting", input.interestedInHosting, YesNo) === "yes",
    message: v.optionalMultiline("message", input.message, limits.messageMaxLength),
    consent: v.consent("consent", input.consent),
  });
};
