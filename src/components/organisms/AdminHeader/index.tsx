"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { getAdminModule } from "@/lib/constants/admin-modules";
import { useAuthStore } from "@/store/auth-store";

export function AdminHeader() {
  const current = getAdminModule(usePathname());
  const admin = useAuthStore((state) => state.currentAdmin);
  const initials = `${admin?.firstName?.[0] ?? "A"}${admin?.lastName?.[0] ?? "D"}`.toUpperCase();
  return <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur md:px-8"><div><p className="text-xs font-medium text-sky-600">Admin console</p><h2 className="font-bold text-navy-deep">{current?.title ?? "Marketplace"}</h2></div><div className="flex items-center gap-3"><label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex"><Search size={16} className="text-slate-400" /><input aria-label="Search administration" className="w-44 bg-transparent text-sm outline-none" placeholder="Search..." /></label><button aria-label="Notifications" className="rounded-xl border border-slate-200 p-2.5 text-navy"><Bell size={18} /></button><div className="hidden text-right sm:block"><p className="text-sm font-semibold text-navy-deep">{admin ? `${admin.firstName} ${admin.lastName}`.trim() : "Administrator"}</p><p className="max-w-40 truncate text-xs text-slate-500">{admin?.email}</p></div><div className="grid size-10 place-items-center rounded-full bg-navy text-sm font-bold text-white">{initials}</div></div></header>;
}
