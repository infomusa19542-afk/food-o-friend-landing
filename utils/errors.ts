import { AppConfig } from "@/constants/app_config";

interface CodedError {
  code?: unknown;
  message?: unknown;
}

const hasCode = (error: unknown): error is CodedError =>
  typeof error === "object" && error !== null && "code" in error;

const readMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) return error.message;
  return hasCode(error) && typeof error.message === "string" ? error.message : undefined;
};

export const isUniqueViolation = (error: unknown): boolean =>
  hasCode(error) && error.code === AppConfig.database.errorCodes.uniqueViolation;

/**
 * Logs a failure server-side without personal data or full payloads.
 * Only the context label and error code/message are recorded — never `details`,
 * which Postgres may fill with the offending value (e.g. an email).
 */
export const logSafeError = (context: string, error: unknown): void => {
  const code = hasCode(error) ? String(error.code) : undefined;
  const message = readMessage(error);
  console.error(`[${context}]`, { code, message });
};
