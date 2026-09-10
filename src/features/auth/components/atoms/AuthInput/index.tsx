import { cn } from "@/lib/utils";

export function AuthInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-12.5 w-full rounded-[10px] border border-navy-deep/8 bg-white/70 px-4 text-[15px] text-navy-deep outline-none transition-colors duration-150 placeholder:text-slate-400 focus:border-navy/30 focus:bg-white",
        className,
      )}
      {...props}
    />
  );
}
