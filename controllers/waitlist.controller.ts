import "server-only";

import { AppStrings } from "@/constants/app_strings";
import { submitForm } from "@/controllers/form-submission";
import type { WaitlistInput, WaitlistResponse } from "@/models/waitlist.model";
import { fetchWaitlistCount, insertWaitlistEntry } from "@/services/waitlist.service";
import { logSafeError } from "@/utils/errors";
import { isHoneypotFilled, validateWaitlistInput } from "@/utils/validators";

/** Returns null when the count is unavailable so the UI can show neutral copy. */
export const getWaitlistCount = async (): Promise<number | null> => {
  try {
    return await fetchWaitlistCount();
  } catch (error) {
    logSafeError("waitlist.count", error);
    return null;
  }
};

/** Adds a visitor to the waitlist and, on a real signup, returns the fresh count. */
export const joinWaitlist = async (input: WaitlistInput): Promise<WaitlistResponse> => {
  const result = await submitForm({
    context: "waitlist.join",
    input,
    validate: validateWaitlistInput,
    save: insertWaitlistEntry,
    messages: { success: AppStrings.waitlist.success, duplicate: AppStrings.waitlist.duplicate },
  });

  if (result.status !== "success" || isHoneypotFilled(input.honeypot)) {
    return { ...result, data: { count: null } };
  }
  return { ...result, data: { count: await getWaitlistCount() } };
};
