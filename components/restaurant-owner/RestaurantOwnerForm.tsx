"use client";

import Link from "next/link";
import { submitRestaurantOwnerAction } from "@/actions/restaurant-owner.action";
import AppCheckbox from "@/components/common/AppCheckbox";
import AppChoiceGroup from "@/components/common/AppChoiceGroup";
import AppInput from "@/components/common/AppInput";
import AppTextarea from "@/components/common/AppTextarea";
import FormStatusMessage from "@/components/common/FormStatusMessage";
import FormSuccess from "@/components/common/FormSuccess";
import HoneypotField from "@/components/common/HoneypotField";
import SubmitButton from "@/components/common/SubmitButton";
import { AppConfig } from "@/constants/app_config";
import { YesNo } from "@/constants/app_options";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";
import { useServerForm } from "@/hooks/useServerForm";
import { toOptions } from "@/utils/options";
import { emptyRestaurantOwnerInput, validateRestaurantOwner } from "@/utils/restaurant-owner.validation";
import { toFieldErrors } from "@/utils/validators";

const FORM_ID = "restaurant";
const { restaurantOwner: copy, legal } = AppStrings;
const { fields, placeholders } = copy;
const limits = AppConfig.validation;

const HOSTING_OPTIONS = toOptions(YesNo, copy.options.interestedInHosting);

export default function RestaurantOwnerForm() {
  const { values, setValue, fieldErrors, feedback, clearFeedback, isPending, handleSubmit, fieldId, textField } =
    useServerForm({
      idPrefix: FORM_ID,
      initialValues: emptyRestaurantOwnerInput,
      validate: (formValues) => toFieldErrors(validateRestaurantOwner(formValues)),
      submit: submitRestaurantOwnerAction,
    });

  if (feedback?.status === "success") return <FormSuccess message={feedback.message} onReset={clearFeedback} />;

  return (
    <form noValidate onSubmit={handleSubmit} className="relative grid gap-5 sm:grid-cols-2 sm:gap-6">
      <AppInput
        {...textField("restaurantName")}
        label={fields.restaurantName}
        autoComplete="organization"
        maxLength={limits.shortTextMaxLength}
        required
      />
      <AppInput {...textField("contactName")} label={fields.contactName} autoComplete="name" required />
      <AppInput {...textField("email")} label={fields.email} type="email" inputMode="email" autoComplete="email" required />
      <AppInput {...textField("phone")} label={fields.phone} type="tel" inputMode="tel" autoComplete="tel" optional />
      <AppInput {...textField("city")} label={fields.city} autoComplete="address-level2" required />
      <AppInput {...textField("address")} label={fields.address} autoComplete="street-address" optional />
      <AppInput
        {...textField("cuisineType")}
        label={fields.cuisineType}
        placeholder={placeholders.cuisineType}
        required
      />
      <AppInput
        {...textField("websiteOrInstagram")}
        label={fields.websiteOrInstagram}
        placeholder={placeholders.websiteOrInstagram}
        autoComplete="url"
        optional
      />
      <AppInput
        {...textField("seatingCapacity")}
        label={fields.seatingCapacity}
        placeholder={placeholders.seatingCapacity}
        inputMode="numeric"
        pattern="[0-9]*"
        required
      />

      <AppChoiceGroup
        type="radio"
        id={fieldId("interestedInHosting")}
        name="interestedInHosting"
        legend={fields.interestedInHosting}
        options={HOSTING_OPTIONS}
        value={values.interestedInHosting}
        onChange={(selected) => setValue("interestedInHosting", selected)}
        error={fieldErrors.interestedInHosting}
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
