import { AdminLayout } from "@/components/templates/AdminLayout";

export default function AdminRouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminLayout>{children}</AdminLayout>;
}
