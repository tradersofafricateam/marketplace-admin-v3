import { cn } from "@/lib/utils";
import { INVENTORY_STATUS_LABELS } from "../../../constants";
import type { InventoryStatus } from "../../../types";

export function InventoryStatusBadge({ status }: { status: InventoryStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        status === "in_stock" ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-500",
      )}
    >
      <span className={cn("size-1.5 rounded-full", status === "in_stock" ? "bg-sky-500" : "bg-slate-400")} />
      {INVENTORY_STATUS_LABELS[status]}
    </span>
  );
}
