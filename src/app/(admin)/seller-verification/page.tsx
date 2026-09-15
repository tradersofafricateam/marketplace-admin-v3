import { Suspense } from "react";
import { SellerVerificationsPage } from "@/features/identity/components/templates/SellerVerificationsPage";
import { SellerVerificationsPageSkeleton } from "@/features/identity/components/templates/SellerVerificationsPageSkeleton";

export default function SellerVerificationRoute() {
  return (
    <Suspense fallback={<SellerVerificationsPageSkeleton />}>
      <SellerVerificationsPage />
    </Suspense>
  );
}
