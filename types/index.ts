/** A file in the public Supabase Storage bucket, with intrinsic size to avoid layout shift. */
export interface StorageAsset {
  readonly path: string;
  readonly width: number;
  readonly height: number;
}

export type ActionStatus = "success" | "duplicate" | "invalid" | "error";

/** Safe, user-presentable result returned by controllers. Never contains raw DB errors. */
export interface ActionResult<TData = undefined> {
  status: ActionStatus;
  message: string;
  data?: TData;
  fieldErrors?: Record<string, string>;
}

export interface NavItem {
  label: string;
  href: string;
}
