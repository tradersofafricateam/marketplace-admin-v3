import { Suspense } from "react";
import { UsersPage } from "@/features/identity/components/templates/UsersPage";
import { UsersPageSkeleton } from "@/features/identity/components/templates/UsersPageSkeleton";

export default function UsersRoute() {
  return (
    <Suspense fallback={<UsersPageSkeleton />}>
      <UsersPage />
    </Suspense>
  );
}
