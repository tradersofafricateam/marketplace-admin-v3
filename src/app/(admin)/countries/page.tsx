import { Suspense } from "react";
import { CountriesPage } from "@/features/system-settings/components/templates/CountriesPage";
import { EntityListPageSkeleton } from "@/features/system-settings/components/templates/EntityListPageSkeleton";

export default function CountriesRoute() {
  return (
    <Suspense fallback={<EntityListPageSkeleton columns={4} />}>
      <CountriesPage />
    </Suspense>
  );
}
