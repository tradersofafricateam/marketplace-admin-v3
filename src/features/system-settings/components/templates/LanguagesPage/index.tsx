"use client";

import { useState } from "react";
import { QueryError } from "@/components/organisms/QueryError";
import { EntityListPageSkeleton } from "../EntityListPageSkeleton";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { StatusToggleModal } from "@/components/organisms/StatusToggleModal";
import { useChangeLanguageStatus, useLanguages } from "../../../hooks";
import type { Language } from "../../../types";
import { LanguagesTable } from "../../organisms";

export function LanguagesPage() {
  const languages = useLanguages();
  const changeStatus = useChangeLanguageStatus();
  const [statusTarget, setStatusTarget] = useState<Language | null>(null);

  if (languages.isPending) return <EntityListPageSkeleton columns={5} showAction={false} />;
  if (languages.isError) return <QueryError resource="languages" onRetry={() => { void languages.refetch(); }} />;

  return (
    <div className="space-y-7">
      <SectionTitle eyebrow="Configuration" title="Languages" description="Locale and language availability across the marketplace." />
      <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        <LanguagesTable languages={languages.data ?? []} onToggleStatus={setStatusTarget} />
      </section>
      <StatusToggleModal
        open={statusTarget !== null}
        title="language"
        subtitle={statusTarget?.name}
        isActive={statusTarget?.status === "active"}
        isPending={changeStatus.isPending}
        onClose={() => setStatusTarget(null)}
        onConfirm={() => {
          if (!statusTarget) return;
          changeStatus.mutate(
            { languageId: statusTarget.id, status: statusTarget.status === "active" ? "inactive" : "active" },
            { onSuccess: () => setStatusTarget(null) },
          );
        }}
      />
    </div>
  );
}
