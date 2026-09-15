import { Suspense } from "react";
import { CurrenciesPage } from "@/features/system-settings/components/templates/CurrenciesPage";
import { EntityListPageSkeleton } from "@/features/system-settings/components/templates/EntityListPageSkeleton";

export default function CurrenciesRoute() {
  return (
    <Suspense fallback={<EntityListPageSkeleton columns={5} />}>
      <CurrenciesPage />
    </Suspense>
  );
}
