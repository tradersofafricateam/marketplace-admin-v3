import type { SellerVerificationStatus } from "../../../types";
import { cn } from "@/lib/utils";

export function SellerVerificationStatusBadge({ status }: { status: SellerVerificationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        status === "approved" && "bg-emerald-50 text-emerald-700",
        status === "pending" && "bg-amber-50 text-amber-700",
        status === "rejected" && "bg-red-50 text-red-700",
      )}
    >
      {status}
    </span>
  );
}
