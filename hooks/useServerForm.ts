"use client";

import { useCallback, useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { AppConfig } from "@/constants/app_config";
import { AppStrings } from "@/constants/app_strings";
import type { ActionResult, ActionStatus, FieldErrors } from "@/types";
import { asString, summarizeFieldErrors } from "@/utils/validators";

export interface FormFeedback {
  status: ActionStatus;
  message: string;
}

/** Keys of `T` whose values are plain strings (text inputs, selects, textareas). */
type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];

type TextControlEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

interface UseServerFormOptions<TValues, TResult extends ActionResult<unknown>> {
  /** Prefix for generated control ids, unique per page. */
  idPrefix?: string;
  initialValues: TValues;
  /** Client-side validation for fast feedback; the server validates again. */
  validate: (values: TValues) => FieldErrors;
  /** Server Action to call with the values plus the honeypot field. */
  submit: (payload: TValues & { honeypot: string }) => Promise<TResult>;
  onSuccess?: (result: TResult) => void;
}

/** Focuses the first control (in DOM order) whose `name` has an error. */
const focusFirstInvalid = (form: HTMLFormElement, errors: FieldErrors) => {
  const target = Array.from(form.elements).find(
    (element): element is HTMLElement & { name: string } =>
      "name" in element && typeof element.name === "string" && element.name in errors,
  );
  target?.focus();
};

/**
 * Shared client flow for every public form: controlled values, client validation,
 * single in-flight submission, honeypot pass-through and safe feedback.
 */
export function useServerForm<TValues extends object, TResult extends ActionResult<unknown>>({
  idPrefix = "form",
  initialValues,
  validate,
  submit,
  onSuccess,
}: UseServerFormOptions<TValues, TResult>) {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);
  const [isPending, startTransition] = useTransition();
  const inFlight = useRef(false);

  const setValue = useCallback(<K extends keyof TValues>(key: K, value: TValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setFieldErrors((previous) => {
      if (!(key in previous)) return previous;
      const next = { ...previous };
      delete next[key as string];
      return next;
    });
  }, []);

  const clearFeedback = useCallback(() => setFeedback(null), []);

  const fieldId = (key: keyof TValues) => `${idPrefix}-${String(key)}`;

  /** Props for a text-like control bound to a string field. */
  const textField = <K extends StringKeys<TValues>>(key: K) => ({
    id: fieldId(key),
    name: String(key),
    value: values[key] as string,
    error: fieldErrors[key as string],
    onChange: (event: TextControlEvent) => setValue(key, event.target.value as TValues[K]),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFeedback({ status: "invalid", message: summarizeFieldErrors(errors) });
      focusFirstInvalid(form, errors);
      return;
    }

    const honeypot = asString(new FormData(form).get(AppConfig.forms.honeypotField));
    inFlight.current = true;
    setFeedback(null);

    startTransition(async () => {
      try {
        const result = await submit({ ...values, honeypot });
        setFeedback({ status: result.status, message: result.message });
        setFieldErrors(result.fieldErrors ?? {});
        if (result.status === "success") {
          setValues(initialValues);
          onSuccess?.(result);
        } else if (result.fieldErrors) {
          focusFirstInvalid(form, result.fieldErrors);
        }
      } catch {
        setFeedback({ status: "error", message: AppStrings.errors.network });
      } finally {
        inFlight.current = false;
      }
    });
  };

  return { values, setValue, fieldErrors, feedback, clearFeedback, isPending, handleSubmit, fieldId, textField };
}
