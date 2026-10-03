import { AppConfig } from "@/constants/app_config";

interface CodedError {
  code?: unknown;
}

const hasCode = (error: unknown): error is CodedError =>
  typeof error === "object" && error !== null && "code" in error;

export const isUniqueViolation = (error: unknown): boolean =>
  hasCode(error) && error.code === AppConfig.database.errorCodes.uniqueViolation;

/**
 * Logs a failure server-side without personal data or full payloads.
 * Only the context label and error code/message are recorded.
 */
export const logSafeError = (context: string, error: unknown): void => {
  const code = hasCode(error) ? String(error.code) : undefined;
  const message = error instanceof Error ? error.message : undefined;
  console.error(`[${context}]`, { code, message });
};
