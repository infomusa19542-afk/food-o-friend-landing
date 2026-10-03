import type { ReactNode } from "react";
import { cn } from "@/utils/classnames";

/** White rounded surface that holds a standalone form. */
export default function FormCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full min-w-0 rounded-3xl bg-white p-5 text-text-dark shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-8 lg:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
