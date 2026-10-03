import type { SelectOption } from "@/components/common/AppSelect";

/** Builds select/choice options in the canonical order of `values`, labelled from AppStrings. */
export const toOptions = <T extends string>(values: readonly T[], labels: Record<T, string>): SelectOption[] =>
  values.map((value) => ({ value, label: labels[value] }));
