import { AppConfig } from "@/constants/app_config";
import { AppStrings } from "@/constants/app_strings";
import type { WaitlistInput, WaitlistInsert } from "@/models/waitlist.model";
import { isRecord } from "@/utils/parsers";

// Pragmatic email check: local@domain.tld, no whitespace. The database layer validates too.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; fieldErrors: Record<string, string> };

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email);

/** Trims, strips control characters, collapses whitespace. */
export const sanitizeText = (value: string): string =>
  value.replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();

export const validateEmail = (rawEmail: string): string | null => {
  const email = normalizeEmail(rawEmail);
  if (!email) return AppStrings.validation.emailRequired;
  if (email.length > AppConfig.validation.emailMaxLength) return AppStrings.validation.emailTooLong;
  if (!isValidEmail(email)) return AppStrings.validation.emailInvalid;
  return null;
};

const asString = (value: unknown): string => (typeof value === "string" ? value : "");

/** Coerces an untrusted payload (e.g. Server Action argument) into a WaitlistInput. */
export const parseWaitlistInput = (value: unknown): WaitlistInput => {
  const record = isRecord(value) ? value : {};
  return {
    email: asString(record.email),
    name: asString(record.name),
    website: asString(record.website),
  };
};

export const isHoneypotFilled = (value: string | undefined): boolean => Boolean(value?.trim());

export const validateWaitlistInput = (input: WaitlistInput): ValidationResult<WaitlistInsert> => {
  const fieldErrors: Record<string, string> = {};

  const emailError = validateEmail(input.email);
  if (emailError) fieldErrors.email = emailError;

  const name = sanitizeText(input.name ?? "");
  if (name.length > AppConfig.validation.nameMaxLength) {
    fieldErrors.name = AppStrings.validation.nameTooLong;
  }

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };

  return {
    ok: true,
    value: {
      email: normalizeEmail(input.email),
      name: name || null,
      source: AppConfig.waitlist.source,
    },
  };
};
