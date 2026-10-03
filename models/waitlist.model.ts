import type { ActionResult } from "@/types";

/** Untrusted input as submitted by a visitor. */
export interface WaitlistInput {
  email: string;
  name?: string;
  /** Honeypot field — real users leave it empty. */
  website?: string;
}

/** Validated, normalized payload inserted into the `waitlist` table. */
export interface WaitlistInsert {
  email: string;
  name: string | null;
  source: string;
}

export interface WaitlistResultData {
  /** Fresh total after a successful signup; null when it couldn't be loaded. */
  count: number | null;
}

export type WaitlistResponse = ActionResult<WaitlistResultData>;
