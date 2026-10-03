import { AppConfig } from "@/constants/app_config";

const countFormatter = new Intl.NumberFormat(AppConfig.locale);

export const formatCount = (value: number): string => countFormatter.format(value);

export const currentYear = (): number => new Date().getFullYear();
