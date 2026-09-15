import { Suspense } from "react";
import { LanguagesPage } from "@/features/system-settings/components/templates/LanguagesPage";
import { EntityListPageSkeleton } from "@/features/system-settings/components/templates/EntityListPageSkeleton";

export default function LanguagesRoute() {
  return (
    <Suspense fallback={<EntityListPageSkeleton columns={5} showAction={false} />}>
      <LanguagesPage />
    </Suspense>
  );
}
