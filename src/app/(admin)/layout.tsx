import { AdminLayout } from "@/components/templates/AdminLayout";
import { AdminAuthGuard } from "@/features/auth";

export default function AdminRouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminAuthGuard><AdminLayout>{children}</AdminLayout></AdminAuthGuard>;
}
