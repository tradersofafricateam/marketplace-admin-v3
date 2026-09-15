import { Suspense } from "react";
import { AdminUsersPage } from "@/features/identity/components/templates/AdminUsersPage";
import { AdminUsersPageSkeleton } from "@/features/identity/components/templates/AdminUsersPageSkeleton";

export default function AdminUsersRoute() {
  return (
    <Suspense
      fallback={<AdminUsersPageSkeleton />}
    >
      <AdminUsersPage />
    </Suspense>
  );
}
