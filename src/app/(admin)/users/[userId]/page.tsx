import { UserDetails } from "@/features/identity/components/templates/UserDetails";

export default async function UserRoute({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <UserDetails userId={userId} />;
}
