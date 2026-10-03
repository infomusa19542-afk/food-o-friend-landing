"use server";

import { revalidatePath } from "next/cache";
import { AppRoutes } from "@/constants/app_routes";
import { joinWaitlist } from "@/controllers/waitlist.controller";
import type { WaitlistResponse } from "@/models/waitlist.model";
import { parseWaitlistInput } from "@/utils/validators";

/** Server Action entry point for both waitlist forms. Input is untrusted. */
export async function joinWaitlistAction(payload: unknown): Promise<WaitlistResponse> {
  const result = await joinWaitlist(parseWaitlistInput(payload));
  // Refresh the cached homepage so new visitors see the updated count.
  if (result.status === "success" && result.data?.count !== null) revalidatePath(AppRoutes.home);
  return result;
}
