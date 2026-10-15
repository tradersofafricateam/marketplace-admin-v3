import { cn } from "@/lib/utils";
import { PRODUCT_STATUS_LABELS } from "../../../constants";
import type { ProductStatus } from "../../../types";

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        status === "active" && "bg-emerald-50 text-emerald-700",
        status === "pending_approval" && "bg-amber-50 text-amber-700",
        status === "draft" && "bg-slate-100 text-slate-600",
        status === "inactive" && "bg-amber-50 text-amber-700",
        status === "archived" && "bg-slate-200 text-slate-700",
        status === "deleted" && "bg-red-50 text-red-700",
      )}
    >
      {PRODUCT_STATUS_LABELS[status]}
    </span>
  );
}
