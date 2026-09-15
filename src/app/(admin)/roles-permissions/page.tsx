import { Suspense } from "react";
import { RolesPermissionsPage } from "@/features/identity/components/templates/RolesPermissionsPage";
import { RolesPermissionsPageSkeleton } from "@/features/identity/components/templates/RolesPermissionsPageSkeleton";

export default function RolesPermissionsRoute() {
  return (
    <Suspense fallback={<RolesPermissionsPageSkeleton />}>
      <RolesPermissionsPage />
    </Suspense>
  );
}
