"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { useAdminUser } from "../../../hooks";
import { formatAdminDate, getInitials } from "../../../helpers";
import { AdminStatusBadge } from "../../atoms";
import { AdminUserDetailsSkeleton } from "../AdminUserDetailsSkeleton";

export function AdminUserDetails({ adminId }: { adminId: string }) {
  const { data: admin, isPending } = useAdminUser(adminId);
  if (isPending) return <AdminUserDetailsSkeleton />;
  if (!admin) return <div className="rounded-2xl border border-slate-200 bg-white p-8"><p className="font-semibold text-navy-deep">Administrator not found.</p><Link href="/admin-users" className="mt-3 inline-block text-sm text-sky-700">Return to admin accounts</Link></div>;
  return <div className="space-y-7"><Link href="/admin-users" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy"><ArrowLeft size={16} />Admin accounts</Link><SectionTitle eyebrow="Administrator profile" title={`${admin.firstName} ${admin.lastName}`} description="Account information, role assignment, and access status." /><section className="grid gap-5 lg:grid-cols-[1fr_1.6fr]"><article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"><span className="mx-auto grid size-20 place-items-center rounded-full bg-sky-50 text-2xl font-bold text-navy">{getInitials(admin.firstName, admin.lastName)}</span><h2 className="mt-4 text-xl font-bold text-navy-deep">{admin.firstName} {admin.lastName}</h2><div className="mt-2"><AdminStatusBadge status={admin.status} /></div><div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-left text-sm text-slate-600"><p className="flex items-center gap-3"><Mail size={16} />{admin.email}</p><p className="flex items-center gap-3"><Phone size={16} />{admin.phoneNumber}</p><p className="flex items-center gap-3"><ShieldCheck size={16} />{admin.isSuperAdmin ? "Super Admin" : admin.role.name}</p></div></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-bold text-navy-deep">Account activity</h2><dl className="mt-5 divide-y divide-slate-100">{[["Administrator ID", admin.id], ["Created", formatAdminDate(admin.createdAt)], ["Last login", formatAdminDate(admin.lastLoginAt)], ["Role", admin.isSuperAdmin ? "Super Admin" : admin.role.name]].map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-2"><dt className="text-sm text-slate-500">{label}</dt><dd className="text-sm font-medium text-navy-deep">{value}</dd></div>)}</dl></article></section></div>;
}
