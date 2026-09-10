import { Suspense } from "react";
import { AdminUsersPage, AdminUsersPageSkeleton } from "@/features/identity";

export default function AdminUsersRoute() {
  return (
    <Suspense
      fallback={<AdminUsersPageSkeleton />}
    >
      <AdminUsersPage />
    </Suspense>
  );
}
