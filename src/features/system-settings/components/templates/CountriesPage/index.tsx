"use client";

import { useState } from "react";
import { QueryError } from "@/components/organisms/QueryError";
import { EntityListPageSkeleton } from "../EntityListPageSkeleton";
import { Plus } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { StatusToggleModal } from "@/components/organisms/StatusToggleModal";
import { useChangeCountryStatus, useCountries } from "../../../hooks";
import type { Country } from "../../../types";
import { CountriesTable, CreateCountryModal, EditCountryModal } from "../../organisms";

export function CountriesPage() {
  const countries = useCountries();
  const changeStatus = useChangeCountryStatus();
  const [createOpen, setCreateOpen] = useState(false);
  const [countryBeingEdited, setCountryBeingEdited] = useState<Country | null>(null);
  const [statusTarget, setStatusTarget] = useState<Country | null>(null);

  if (countries.isPending) return <EntityListPageSkeleton columns={4} />;
  if (countries.isError) return <QueryError resource="countries" onRetry={() => { void countries.refetch(); }} />;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Configuration" title="Countries" description="Countries available for buyers and sellers on the marketplace." />
        <button onClick={() => setCreateOpen(true)} className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white shadow-lg shadow-navy/15 hover:bg-navy-deep">
          <Plus size={17} />
          Add country
        </button>
      </div>
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CountriesTable countries={countries.data ?? []} onEdit={setCountryBeingEdited} onToggleStatus={setStatusTarget} />
      </section>
      <CreateCountryModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <EditCountryModal country={countryBeingEdited} onClose={() => setCountryBeingEdited(null)} />
      <StatusToggleModal
        open={statusTarget !== null}
        title="country"
        subtitle={statusTarget?.name}
        isActive={statusTarget?.status === "active"}
        isPending={changeStatus.isPending}
        onClose={() => setStatusTarget(null)}
        onConfirm={() => {
          if (!statusTarget) return;
          changeStatus.mutate(
            { countryId: statusTarget.id, status: statusTarget.status === "active" ? "inactive" : "active" },
            { onSuccess: () => setStatusTarget(null) },
          );
        }}
      />
    </div>
  );
}
