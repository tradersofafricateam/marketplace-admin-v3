import { Suspense } from "react";
import { PaymentMethodsPage } from "@/features/system-settings/components/templates/PaymentMethodsPage";
import { EntityListPageSkeleton } from "@/features/system-settings/components/templates/EntityListPageSkeleton";

export default function PaymentMethodsRoute() {
  return (
    <Suspense fallback={<EntityListPageSkeleton columns={4} showAction={false} />}>
      <PaymentMethodsPage />
    </Suspense>
  );
}
