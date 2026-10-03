"use client";

import { useEffect, useRef } from "react";
import AppButton from "@/components/common/AppButton";
import IconCircle from "@/components/common/IconCircle";
import { AppRoutes } from "@/constants/app_routes";
import { AppStrings } from "@/constants/app_strings";

interface FormSuccessProps {
  message: string;
  onReset: () => void;
}

/** Replaces a submitted form; moves focus to the confirmation so it is announced. */
export default function FormSuccess({ message, onReset }: FormSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-start gap-5">
      <IconCircle name="check" size="lg" />
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-balance focus-visible:outline-none">
        {message}
      </h2>
      <div className="flex flex-col gap-3 min-[420px]:flex-row">
        <AppButton href={AppRoutes.home} shape="rounded">
          {AppStrings.forms.backHome}
        </AppButton>
        <AppButton variant="outline" shape="rounded" onClick={onReset}>
          {AppStrings.forms.submitAnother}
        </AppButton>
      </div>
    </div>
  );
}
