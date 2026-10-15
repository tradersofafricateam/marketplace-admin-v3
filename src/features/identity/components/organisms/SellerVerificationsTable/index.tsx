"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { formatAdminDate } from "../../../helpers";
import { SellerVerificationStatusBadge } from "../../atoms";
import type { SellerVerificationSummary } from "../../../types";

export function SellerVerificationsTable({ verifications }: { verifications: SellerVerificationSummary[] }) {
  const columns: DataTableColumn<SellerVerificationSummary>[] = [
    {
      key: "company",
      header: "Company",
      render: (verification) => (
        <div className="space-y-1">
          <Link href={`/seller-verification/${verification.id}`} className="font-semibold text-navy-deep hover:text-sky-700">
            {verification.companyName}
          </Link>
          <p className="text-xs text-slate-500">Registration: {verification.registrationNumber || "—"}</p>
        </div>
      ),
    },
    {
      key: "applicant",
      header: "Applicant",
      render: ({ userId, user }) => user ? (
        <div className="space-y-1">
          <Link href={`/users/${encodeURIComponent(userId)}`} className="block font-medium text-sky-700 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-sky-700">
            {[user.firstName, user.lastName].filter(Boolean).join(" ") || "View applicant"}
          </Link>
          <a href={`mailto:${user.email}`} className="text-xs text-sky-700 hover:underline">{user.email}</a>
        </div>
      ) : <span className="text-slate-500">—</span>,
    },
    { key: "businessType", header: "Business type", render: (verification) => <span className="text-slate-700">{verification.businessType || "—"}</span> },
    { key: "country", header: "Country", render: (verification) => <span className="text-slate-700">{verification.country || "—"}</span> },
    { key: "submittedAt", header: "Submitted", render: (verification) => <span className="whitespace-nowrap text-slate-500">{formatAdminDate(verification.submittedAt)}</span> },
    { key: "status", header: "Status", render: (verification) => <SellerVerificationStatusBadge status={verification.verificationStatus} /> },
    {
      key: "actions",
      header: "",
      className: "w-14",
      render: (verification) => (
        <Link href={`/seller-verification/${verification.id}`} aria-label="View verification" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-navy">
          <ChevronRight size={18} />
        </Link>
      ),
    },
  ];
  return <DataTable columns={columns} data={verifications} getRowKey={(verification) => verification.id} emptyMessage="No seller verification requests match these filters." />;
}
