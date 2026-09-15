"use client";

import { useState } from "react";
import { QueryError } from "@/components/organisms/QueryError";
import { EntityListPageSkeleton } from "../EntityListPageSkeleton";
import { Plus } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { StatusToggleModal } from "@/components/organisms/StatusToggleModal";
import { useChangeCurrencyStatus, useCurrencies } from "../../../hooks";
import type { Currency } from "../../../types";
import { CreateCurrencyModal, CurrenciesTable, EditCurrencyModal } from "../../organisms";

export function CurrenciesPage() {
  const currencies = useCurrencies();
  const changeStatus = useChangeCurrencyStatus();
  const [createOpen, setCreateOpen] = useState(false);
  const [currencyBeingEdited, setCurrencyBeingEdited] = useState<Currency | null>(null);
  const [statusTarget, setStatusTarget] = useState<Currency | null>(null);

  if (currencies.isPending) return <EntityListPageSkeleton columns={5} />;
  if (currencies.isError) return <QueryError resource="currencies" onRetry={() => { void currencies.refetch(); }} />;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Configuration" title="Currencies" description="Currencies available for marketplace pricing and transactions." />
        <button onClick={() => setCreateOpen(true)} className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white shadow-lg shadow-navy/15 hover:bg-navy-deep">
          <Plus size={17} />
          Add currency
        </button>
      </div>
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CurrenciesTable currencies={currencies.data ?? []} onEdit={setCurrencyBeingEdited} onToggleStatus={setStatusTarget} />
      </section>
      <CreateCurrencyModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditCurrencyModal currency={currencyBeingEdited} onClose={() => setCurrencyBeingEdited(null)} />
      <StatusToggleModal
        open={statusTarget !== null}
        title="currency"
        subtitle={statusTarget?.name}
        isActive={statusTarget?.status === "active"}
        isPending={changeStatus.isPending}
        onClose={() => setStatusTarget(null)}
        onConfirm={() => {
          if (!statusTarget) return;
          changeStatus.mutate(
            { currencyId: statusTarget.id, status: statusTarget.status === "active" ? "inactive" : "active" },
            { onSuccess: () => setStatusTarget(null) },
          );
        }}
      />
    </div>
  );
}
