import "server-only";

import { AppStrings } from "@/constants/app_strings";
import type { ActionResult } from "@/types";
import { isUniqueViolation, logSafeError } from "@/utils/errors";
import { isHoneypotFilled, summarizeFieldErrors, type ValidationResult } from "@/utils/validators";

interface SubmissionOptions<TInput extends { honeypot?: string }, TData> {
  /** Log label — never include personal data. */
  context: string;
  input: TInput;
  validate: (input: TInput) => ValidationResult<TData>;
  save: (data: TData) => Promise<void>;
  messages: { success: string; duplicate: string };
}

/**
 * Shared controller flow for public forms: spam trap → validation → insert →
 * safe error mapping. Never returns raw database errors.
 */
export const submitForm = async <TInput extends { honeypot?: string }, TData>({
  context,
  input,
  validate,
  save,
  messages,
}: SubmissionOptions<TInput, TData>): Promise<ActionResult> => {
  // Bots that fill the hidden field get a friendly response and nothing is stored.
  if (isHoneypotFilled(input.honeypot)) return { status: "success", message: messages.success };

  const validation = validate(input);
  if (!validation.ok) {
    const { fieldErrors } = validation;
    return { status: "invalid", message: summarizeFieldErrors(fieldErrors), fieldErrors };
  }

  try {
    await save(validation.value);
    return { status: "success", message: messages.success };
  } catch (error) {
    if (isUniqueViolation(error)) return { status: "duplicate", message: messages.duplicate };
    logSafeError(context, error);
    return { status: "error", message: AppStrings.errors.generic };
  }
};
