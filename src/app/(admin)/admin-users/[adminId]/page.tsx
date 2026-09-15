import { AdminUserDetails } from "@/features/identity/components/templates/AdminUserDetails";

export default async function AdminUserInfoRoute({ params }: { params: Promise<{ adminId: string }> }) {
  const { adminId } = await params;
  return <AdminUserDetails adminId={adminId} />;
}
