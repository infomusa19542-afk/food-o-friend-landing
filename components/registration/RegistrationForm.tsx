"use client";

import Link from "next/link";
import { submitRegistrationAction } from "@/actions/registration.action";
import AppCheckbox from "@/components/common/AppCheckbox";
import AppChoiceGroup from "@/components/common/AppChoiceGroup";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";
import AppTextarea from "@/components/common/AppTextarea";
import FormStatusMessage from "@/components/common/FormStatusMessage";
import FormSuccess from "@/components/common/FormSuccess";
import HoneypotField from "@/components/common/HoneypotField";
import SubmitButton from "@/components/common/SubmitButton";
import { AppConfig } from "@/constants/app_config";
import { AgeRanges, FoodInterests, MeetupTypes, SocialInterests } from "@/constants/app_options";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { useServerForm } from "@/hooks/useServerForm";
import { toOptions } from "@/utils/options";
import { emptyRegistrationInput, validateRegistration } from "@/utils/registration.validation";
import { toFieldErrors } from "@/utils/validators";

const FORM_ID = "registration";
const { registration: copy, legal } = AppStrings;
const { fields, options } = copy;
const limits = AppConfig.validation;

const AGE_OPTIONS = toOptions(AgeRanges, options.ageRange);
const FOOD_OPTIONS = toOptions(FoodInterests, options.foodInterests);
const SOCIAL_OPTIONS = toOptions(SocialInterests, options.socialInterests);
const MEETUP_OPTIONS = toOptions(MeetupTypes, options.preferredMeetupType);

export default function RegistrationForm() {
  const { values, setValue, fieldErrors, feedback, clearFeedback, isPending, handleSubmit, fieldId, textField } =
    useServerForm({
      idPrefix: FORM_ID,
      initialValues: emptyRegistrationInput,
      validate: (formValues) => toFieldErrors(validateRegistration(formValues)),
      submit: submitRegistrationAction,
    });

  if (feedback?.status === "success") return <FormSuccess message={feedback.message} onReset={clearFeedback} />;

  return (
    <form noValidate onSubmit={handleSubmit} className="relative grid gap-5 sm:grid-cols-2 sm:gap-6">
      <AppInput {...textField("fullName")} label={fields.fullName} autoComplete="name" maxLength={limits.nameMaxLength} required />
      <AppInput {...textField("email")} label={fields.email} type="email" inputMode="email" autoComplete="email" required />
      <AppInput {...textField("city")} label={fields.city} autoComplete="address-level2" required />
      <AppInput {...textField("country")} label={fields.country} autoComplete="country-name" required />
      <AppSelect {...textField("ageRange")} label={fields.ageRange} options={AGE_OPTIONS} required />
      <AppSelect
        {...textField("preferredMeetupType")}
        label={fields.preferredMeetupType}
        options={MEETUP_OPTIONS}
        required
      />

      <AppChoiceGroup
        type="checkbox"
        id={fieldId("foodInterests")}
        name="foodInterests"
        legend={fields.foodInterests}
        hint={copy.hints.multiSelect}
        options={FOOD_OPTIONS}
        value={values.foodInterests}
        onChange={(selected) => setValue("foodInterests", selected)}
        error={fieldErrors.foodInterests}
        className="sm:col-span-2"
      />
      <AppChoiceGroup
        type="checkbox"
        id={fieldId("socialInterests")}
        name="socialInterests"
        legend={fields.socialInterests}
        hint={copy.hints.multiSelect}
        options={SOCIAL_OPTIONS}
        value={values.socialInterests}
        onChange={(selected) => setValue("socialInterests", selected)}
        error={fieldErrors.socialInterests}
        className="sm:col-span-2"
      />

      <div className="sm:col-span-2">
        <AppTextarea {...textField("message")} label={fields.message} optional maxLength={limits.messageMaxLength} />
      </div>

      <AppCheckbox
        id={fieldId("consent")}
        name="consent"
        checked={values.consent}
        onChange={(event) => setValue("consent", event.target.checked)}
        error={fieldErrors.consent}
        className="sm:col-span-2"
        label={
          <>
            {fields.consent}{" "}
            <Link href={AppRoutes.privacy} className="font-semibold text-brand-strong underline underline-offset-2">
              {legal.privacy.title}
            </Link>
            .
          </>
        }
      />

      <HoneypotField idPrefix={FORM_ID} />

      <div className="flex flex-col gap-3 sm:col-span-2">
        <SubmitButton isPending={isPending} size="lg" className="w-full sm:w-auto sm:self-start">
          {copy.submit}
        </SubmitButton>
        <FormStatusMessage
          id={`${FORM_ID}-status`}
          feedback={feedback}
          tones={{ success: "text-green-700", error: "text-red-600" }}
        />
      </div>
    </form>
  );
}
