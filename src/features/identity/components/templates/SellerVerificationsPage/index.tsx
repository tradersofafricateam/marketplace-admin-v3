"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { QueryError } from "@/components/organisms/QueryError";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { useSellerVerifications } from "../../../hooks";
import type { SellerVerificationStatus, SellerVerificationsQuery } from "../../../types";
import { AdminPagination } from "../../molecules";
import { SellerVerificationsTable, SellerVerificationsTableSkeleton } from "../../organisms";

export function SellerVerificationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: SellerVerificationsQuery = {
    status: (searchParams.get("status") ?? "") as SellerVerificationStatus | "",
    page: Math.max(1, Number(searchParams.get("page")) || 1),
    limit: [10, 20, 50].includes(Number(searchParams.get("limit"))) ? Number(searchParams.get("limit")) : 20,
  };
  const verifications = useSellerVerifications(query);

  function updateQuery(updates: Record<string, string | number>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => (value ? next.set(key, String(value)) : next.delete(key)));
    router.push(`/seller-verification?${next.toString()}`);
  }

  return (
    <div className="space-y-7">
      <SectionTitle
        eyebrow="People & access"
        title="Seller verification"
        description="Review submitted company information and documents, then approve or reject business verification requests."
      />
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {(["", "pending", "approved", "rejected"] as const).map((status) => (
              <button
                key={status || "all"}
                onClick={() => updateQuery({ status, page: 1 })}
                className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize ${
                  query.status === status ? "bg-navy text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {status || "All"}
              </button>
            ))}
          </div>
        </div>
        {verifications.isPending ? (
          <SellerVerificationsTableSkeleton />
        ) : verifications.isError ? (
          <div className="p-5">
            <QueryError resource="seller verification requests" onRetry={() => { void verifications.refetch(); }} />
          </div>
        ) : (
          <SellerVerificationsTable verifications={verifications.data?.data ?? []} />
        )}
        {verifications.isSuccess && <AdminPagination
          pagination={verifications.data.meta}
          onPageChange={(page) => updateQuery({ page })}
          onLimitChange={(limit) => updateQuery({ limit, page: 1 })}
        />}
      </section>
    </div>
  );
}
