import { cn } from "@/lib/utils";
import type { EntityStatus } from "../../../types";

export function EntityStatusBadge({ status }: { status: EntityStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
      )}
    >
      {status}
    </span>
  );
}
