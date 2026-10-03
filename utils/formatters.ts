import { AppConfig } from "@/constants/app_config";

const countFormatter = new Intl.NumberFormat(AppConfig.locale);

const formatCount = (value: number): string => countFormatter.format(value);

export const currentYear = (): number => new Date().getFullYear();

export interface WaitlistCountCopy {
  plural: string;
  singular: string;
  empty: string;
  unavailable: string;
}

/** Splits social proof into an emphasized count and its label, handling 0/1/many/unknown. */
export const formatWaitlistCount = (
  count: number | null,
  copy: WaitlistCountCopy,
): { count: string | null; label: string } => {
  if (count === null) return { count: null, label: copy.unavailable };
  if (count <= 0) return { count: null, label: copy.empty };
  return { count: formatCount(count), label: count === 1 ? copy.singular : copy.plural };
};
