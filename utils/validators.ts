import { AppConfig } from "@/constants/app_config";
import { AppStrings } from "@/constants/app_strings";
import type { WaitlistInput, WaitlistInsert } from "@/models/waitlist.model";
import type { FieldErrors } from "@/types";
import { isRecord } from "@/utils/parsers";

// Pragmatic email check: local@domain.tld, no whitespace. The database layer validates too.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
// Same, but keeps line feeds for multi-line text.
const CONTROL_CHARS_EXCEPT_NEWLINE = /[\u0000-\u0009\u000B-\u001F\u007F]/g;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;
const INSTAGRAM_HANDLE = /^@[A-Za-z0-9._]{1,30}$/;
const WHOLE_NUMBER = /^\d+$/;
const MAX_PAYLOAD_LIST_ITEMS = 20;
const MAX_PHONE_DIGITS = 15;

const { validation: limits } = AppConfig;
const messages = AppStrings.validation;

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; fieldErrors: FieldErrors };

// ---------------------------------------------------------------------------
// Normalizers
// ---------------------------------------------------------------------------

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email);

/** Trims, strips control characters, collapses whitespace. */
export const sanitizeText = (value: string): string =>
  value.replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();

/** Like `sanitizeText` but keeps paragraphs (max one blank line in a row). */
export const sanitizeMultilineText = (value: string): string =>
  value
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS_EXCEPT_NEWLINE, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(phone) && digits >= limits.phoneMinDigits && digits <= MAX_PHONE_DIGITS;
};

/** Accepts an http(s) website (scheme optional) or an Instagram-style @handle. */
const isValidWebsiteOrHandle = (value: string): boolean => {
  if (value.startsWith("@")) return INSTAGRAM_HANDLE.test(value);
  if (/\s/.test(value)) return false;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".");
  } catch {
    return false;
  }
};

// ---------------------------------------------------------------------------
// Untrusted payload coercion (Server Action arguments)
// ---------------------------------------------------------------------------

export const asString = (value: unknown): string => (typeof value === "string" ? value : "");

export const asBoolean = (value: unknown): boolean => value === true;

export const asStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").slice(0, MAX_PAYLOAD_LIST_ITEMS)
    : [];

/** Reads a payload as a record so form-specific parsers can pick known fields. */
export const asPayloadRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

export const isHoneypotFilled = (value: string | undefined): boolean => Boolean(value?.trim());

// ---------------------------------------------------------------------------
// Field validation
// ---------------------------------------------------------------------------

export const validateEmail = (rawEmail: string): string | null => {
  const email = normalizeEmail(rawEmail);
  if (!email) return messages.emailRequired;
  if (email.length > limits.emailMaxLength) return messages.emailTooLong;
  if (!isValidEmail(email)) return messages.emailInvalid;
  return null;
};

/**
 * Collects the first error per field while normalizing values, so each form's validator
 * reads as a flat list of rules. Values returned for invalid fields are placeholders —
 * `result()` discards them whenever any error was recorded.
 */
export const createFieldValidator = () => {
  const errors: FieldErrors = {};
  const fail = (key: string, message: string) => {
    errors[key] ??= message;
  };

  const text = (key: string, raw: string, max: number, required: boolean, multiline: boolean) => {
    const value = multiline ? sanitizeMultilineText(raw) : sanitizeText(raw);
    if (!value && required) fail(key, messages.required);
    else if (value.length > max) fail(key, messages.tooLong(max));
    return value;
  };

  return {
    required: (key: string, raw: string, max: number): string => text(key, raw, max, true, false),

    optional: (key: string, raw: string, max: number): string | null =>
      text(key, raw, max, false, false) || null,

    optionalMultiline: (key: string, raw: string, max: number): string | null =>
      text(key, raw, max, false, true) || null,

    email: (key: string, raw: string): string => {
      const error = validateEmail(raw);
      if (error) fail(key, error);
      return normalizeEmail(raw);
    },

    oneOf: <T extends string>(key: string, raw: string, allowed: readonly T[]): T => {
      const match = allowed.find((option) => option === raw);
      if (!match) fail(key, raw ? messages.invalidChoice : messages.required);
      return match ?? allowed[0];
    },

    manyOf: <T extends string>(key: string, raw: readonly string[], allowed: readonly T[]): T[] => {
      const values = allowed.filter((option) => raw.includes(option));
      if (values.length === 0 || values.length !== new Set(raw).size) {
        fail(key, raw.length === 0 ? messages.selectAtLeastOne : messages.invalidChoice);
      } else if (values.length > limits.maxSelections) {
        fail(key, messages.tooManySelections(limits.maxSelections));
      }
      return values;
    },

    optionalPhone: (key: string, raw: string): string | null => {
      const value = sanitizeText(raw);
      if (!value) return null;
      if (value.length > limits.phoneMaxLength || !isValidPhone(value)) fail(key, messages.phoneInvalid);
      return value;
    },

    optionalWebsiteOrHandle: (key: string, raw: string): string | null => {
      const value = sanitizeText(raw);
      if (!value) return null;
      if (value.length > limits.urlMaxLength || !isValidWebsiteOrHandle(value)) fail(key, messages.urlInvalid);
      return value;
    },

    wholeNumber: (key: string, raw: string, range: { min: number; max: number }): number => {
      const value = raw.trim();
      const number = Number(value);
      if (!value) fail(key, messages.required);
      else if (!WHOLE_NUMBER.test(value) || number < range.min || number > range.max) {
        fail(key, messages.wholeNumberRange(range.min, range.max));
      }
      return number;
    },

    consent: (key: string, raw: boolean): true => {
      if (raw !== true) fail(key, messages.consentRequired);
      return true;
    },

    result: <T>(value: T): ValidationResult<T> =>
      Object.keys(errors).length > 0 ? { ok: false, fieldErrors: errors } : { ok: true, value },
  };
};

/** Flattens a validation result for UI state. */
export const toFieldErrors = <T>(result: ValidationResult<T>): FieldErrors => (result.ok ? {} : result.fieldErrors);

/** One error → show it; several → a short summary (each field shows its own). */
export const summarizeFieldErrors = (errors: FieldErrors): string => {
  const messagesList = Object.values(errors);
  return messagesList.length === 1 ? messagesList[0] : AppStrings.forms.fixErrors;
};

// ---------------------------------------------------------------------------
// Waitlist
// ---------------------------------------------------------------------------

/** Coerces an untrusted payload (e.g. Server Action argument) into a WaitlistInput. */
export const parseWaitlistInput = (value: unknown): WaitlistInput => {
  const record = asPayloadRecord(value);
  return {
    email: asString(record.email),
    name: asString(record.name),
    honeypot: asString(record.honeypot),
  };
};

export const validateWaitlistInput = (input: WaitlistInput): ValidationResult<WaitlistInsert> => {
  const v = createFieldValidator();
  const value: WaitlistInsert = {
    email: v.email("email", input.email),
    name: v.optional("name", input.name ?? "", limits.nameMaxLength),
    source: AppConfig.waitlist.source,
  };
  return v.result(value);
};
