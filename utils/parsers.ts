/** Helpers for reading untrusted JSON (e.g. `site_content.content`) with typed fallbacks. */

export type JsonRecord = Record<string, unknown>;

export const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readString = (source: JsonRecord, key: string, fallback: string): string => {
  const value = source[key];
  return typeof value === "string" && value.trim() ? value : fallback;
};

export const readStringArray = (
  source: JsonRecord,
  key: string,
  fallback: readonly string[],
): readonly string[] => {
  const value = source[key];
  if (!Array.isArray(value)) return fallback;
  const items = value.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  return items.length > 0 ? items : fallback;
};

export const readRecordArray = (source: JsonRecord, key: string): JsonRecord[] => {
  const value = source[key];
  return Array.isArray(value) ? value.filter(isRecord) : [];
};
