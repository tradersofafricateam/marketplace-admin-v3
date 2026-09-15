"use client";

import { useState } from "react";
import { QueryError } from "@/components/organisms/QueryError";
import { EntityListPageSkeleton } from "../EntityListPageSkeleton";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { StatusToggleModal } from "@/components/organisms/StatusToggleModal";
import { useChangePaymentMethodStatus, usePaymentMethods } from "../../../hooks";
import type { PaymentMethodConfig } from "../../../types";
import { PaymentMethodsTable } from "../../organisms";

export function PaymentMethodsPage() {
  const paymentMethods = usePaymentMethods();
  const changeStatus = useChangePaymentMethodStatus();
  const [statusTarget, setStatusTarget] = useState<PaymentMethodConfig | null>(null);

  if (paymentMethods.isPending) return <EntityListPageSkeleton columns={4} showAction={false} />;
  if (paymentMethods.isError) return <QueryError resource="payment methods" onRetry={() => { void paymentMethods.refetch(); }} />;

  return (
    <div className="space-y-7">
      <SectionTitle eyebrow="Configuration" title="Payment methods" description="Payment rails available to buyers and sellers at checkout." />
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <PaymentMethodsTable paymentMethods={paymentMethods.data ?? []} onToggleStatus={setStatusTarget} />
      </section>
      <StatusToggleModal
        open={statusTarget !== null}
        title="payment method"
        subtitle={statusTarget?.displayName}
        isActive={statusTarget?.status === "active"}
        isPending={changeStatus.isPending}
        onClose={() => setStatusTarget(null)}
        onConfirm={() => {
          if (!statusTarget) return;
          changeStatus.mutate(
            { paymentMethodId: statusTarget.id, status: statusTarget.status === "active" ? "inactive" : "active" },
            { onSuccess: () => setStatusTarget(null) },
          );
        }}
      />
    </div>
  );
}
