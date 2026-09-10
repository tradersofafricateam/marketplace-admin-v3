"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/atoms/Logo";
import { adminModules, moduleGroups } from "@/lib/constants/admin-modules";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-white/10 bg-navy-deep px-4 text-white lg:flex"><div className="flex h-24 shrink-0 items-center px-3"><Logo variant="sidebar" /></div><nav className="min-h-0 flex-1 space-y-6 overflow-y-auto pb-8 pr-1 [scrollbar-gutter:stable]">{moduleGroups.map((group) => <section key={group}><h2 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-300">{group}</h2><div className="space-y-1">{adminModules.filter((item) => item.group === group).map(({ title, href, icon: Icon }) => <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white", pathname === href && "bg-sky-600 text-white hover:bg-sky-600")}><Icon size={17} /><span>{title}</span></Link>)}</div></section>)}</nav></aside>;
}
