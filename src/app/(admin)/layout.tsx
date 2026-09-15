import { AdminAuthGuard } from "@/features/auth";
import { AdminLayout } from "@/components/templates/AdminLayout";

export default function AdminRouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminAuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthGuard>
  );
}
