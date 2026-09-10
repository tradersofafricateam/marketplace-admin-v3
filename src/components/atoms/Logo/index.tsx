import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "sidebar";
};

export function Logo({ className, variant = "default" }: LogoProps) {
  const isSidebar = variant === "sidebar";
  return (
    <Link href="/dashboard" aria-label="TOFA Marketplace admin" className={cn("group flex items-center gap-2.5", className)}>
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-[10px]", isSidebar ? "bg-white/10 ring-1 ring-inset ring-white/15" : "bg-navy shadow-[0_6px_16px_-6px_rgba(11,30,74,0.6)]")}>
        <Image src="/assets/images/tofa-mark.png" alt="" width={64} height={64} priority className="size-5 object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[17px] font-bold tracking-tight", isSidebar ? "text-white" : "text-navy-deep")}>TOFA</span>
        <span className={cn("mt-1 text-[9px] font-semibold uppercase tracking-[0.26em]", isSidebar ? "text-sky-300/85" : "text-slate-400")}>Marketplace</span>
      </span>
    </Link>
  );
}
