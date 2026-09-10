import { cn } from "@/lib/utils";

type StatusBadgeProps = React.ComponentProps<"span"> & { tone?: "neutral" | "success" | "warning" };

export function StatusBadge({ className, tone = "neutral", ...props }: StatusBadgeProps) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", tone === "success" && "bg-emerald-50 text-emerald-700", tone === "warning" && "bg-amber-50 text-amber-700", tone === "neutral" && "bg-slate-100 text-slate-600", className)} {...props} />;
}
