import { cn } from "@/lib/utils";

export function AuthLabel({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-semibold text-navy-deep", className)} {...props} />;
}
