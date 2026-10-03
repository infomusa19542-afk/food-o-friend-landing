"use server";

import { submitRegistration } from "@/controllers/registration.controller";
import type { RegistrationResponse } from "@/models/registration.model";
import { parseRegistrationInput } from "@/utils/registration.validation";

/** Server Action for /register. Input is untrusted and re-validated by the controller. */
export async function submitRegistrationAction(payload: unknown): Promise<RegistrationResponse> {
  return submitRegistration(parseRegistrationInput(payload));
}
