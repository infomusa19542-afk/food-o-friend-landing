import "server-only";

import { AppStrings } from "@/constants/app_strings";
import { submitForm } from "@/controllers/form-submission";
import type { RegistrationInput, RegistrationResponse } from "@/models/registration.model";
import { insertRegistration } from "@/services/registration.service";
import { validateRegistration } from "@/utils/registration.validation";

export const submitRegistration = (input: RegistrationInput): Promise<RegistrationResponse> =>
  submitForm({
    context: "registration.submit",
    input,
    validate: validateRegistration,
    save: insertRegistration,
    messages: { success: AppStrings.registration.success, duplicate: AppStrings.registration.duplicate },
  });
