"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ADMIN_PAGE_LIMITS } from "../../../constants";
import type { Pagination } from "../../../types";

type Props = { itemLabel?: string; pagination: Pagination; onPageChange: (page: number) => void; onLimitChange: (limit: number) => void };

export function AdminPagination({ pagination, onPageChange, onLimitChange, itemLabel = "admins" }: Props) {
  const from = pagination.total ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const to = Math.min(pagination.page * pagination.limit, pagination.total);
  return <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-slate-500">Showing {from}–{to} of {pagination.total} {itemLabel}</p><div className="flex items-center gap-3"><label className="flex items-center gap-2 text-sm text-slate-500">Rows<select value={pagination.limit} onChange={(event) => onLimitChange(Number(event.target.value))} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-navy-deep">{ADMIN_PAGE_LIMITS.map((limit) => <option key={limit}>{limit}</option>)}</select></label><button onClick={() => onPageChange(pagination.page - 1)} disabled={pagination.page <= 1} aria-label="Previous page" className="rounded-lg border border-slate-200 p-2 text-navy disabled:opacity-30"><ChevronLeft size={16} /></button><span className="text-sm font-medium text-navy-deep">{pagination.page} / {pagination.totalPages}</span><button onClick={() => onPageChange(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} aria-label="Next page" className="rounded-lg border border-slate-200 p-2 text-navy disabled:opacity-30"><ChevronRight size={16} /></button></div></div>;
}
