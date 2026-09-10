import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden className={cn("animate-pulse rounded-lg bg-gradient-to-r from-slate-100 via-sky-100/80 to-slate-100 bg-[length:200%_100%]", className)} {...props} />;
}
