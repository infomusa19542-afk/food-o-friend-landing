import "server-only";

import { AppStrings } from "@/constants/app_strings";
import type { WaitlistInput, WaitlistResponse } from "@/models/waitlist.model";
import { fetchWaitlistCount, insertWaitlistEntry } from "@/services/waitlist.service";
import { isUniqueViolation, logSafeError } from "@/utils/errors";
import { isHoneypotFilled, validateWaitlistInput } from "@/utils/validators";

const SUCCESS: WaitlistResponse = { status: "success", message: AppStrings.waitlist.success };

/** Validates untrusted input and adds it to the waitlist. Never exposes raw DB errors. */
export const joinWaitlist = async (input: WaitlistInput): Promise<WaitlistResponse> => {
  // Bots that fill the hidden field get a silent "success" and nothing is stored.
  if (isHoneypotFilled(input.website)) return SUCCESS;

  const validation = validateWaitlistInput(input);
  if (!validation.ok) {
    const message = Object.values(validation.fieldErrors)[0] ?? AppStrings.errors.generic;
    return { status: "invalid", message, fieldErrors: validation.fieldErrors };
  }

  try {
    await insertWaitlistEntry(validation.value);
    return SUCCESS;
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { status: "duplicate", message: AppStrings.waitlist.duplicate };
    }
    logSafeError("waitlist.join", error);
    return { status: "error", message: AppStrings.errors.generic };
  }
};

/** Returns null when the count is unavailable so the UI can hide social proof. */
export const getWaitlistCount = async (): Promise<number | null> => {
  try {
    return await fetchWaitlistCount();
  } catch (error) {
    logSafeError("waitlist.count", error);
    return null;
  }
};
