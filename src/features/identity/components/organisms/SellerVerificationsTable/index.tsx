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
        <Link href={`/seller-verification/${verification.verificationId}`} className="font-semibold text-navy-deep hover:text-sky-700">
          {verification.companyName}
        </Link>
      ),
    },
    { key: "userId", header: "Applicant", render: (verification) => <span className="text-slate-700">{verification.userId}</span> },
    { key: "submittedAt", header: "Submitted", render: (verification) => <span className="whitespace-nowrap text-slate-500">{formatAdminDate(verification.submittedAt)}</span> },
    { key: "status", header: "Status", render: (verification) => verification.status ? <SellerVerificationStatusBadge status={verification.status} /> : null },
    {
      key: "actions",
      header: "",
      className: "w-14",
      render: (verification) => (
        <Link href={`/seller-verification/${verification.verificationId}`} aria-label="View verification" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-navy">
          <ChevronRight size={18} />
        </Link>
      ),
    },
  ];
  return <DataTable columns={columns} data={verifications} getRowKey={(verification) => verification.verificationId} emptyMessage="No seller verification requests match these filters." />;
}
