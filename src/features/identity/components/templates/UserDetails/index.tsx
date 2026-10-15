"use client";

import Link from "next/link";
import { isAxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { QueryError } from "@/components/organisms/QueryError";
import { useUser } from "../../../hooks/use-user";
import { UserProfile } from "../../organisms/UserProfile";
import { UserDetailsSkeleton } from "../UserDetailsSkeleton";

export function UserDetails({ userId }: { userId: string }) {
  const user = useUser(userId);
  if (user.isPending) return <UserDetailsSkeleton />;
  const notFound = (isAxiosError(user.error) && user.error.response?.status === 404) || (user.isSuccess && !user.data);
  return (
    <div className="space-y-7">
      <Link href="/users" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline"><ArrowLeft size={16} />Users</Link>
      {notFound ? <p className="rounded-2xl border border-slate-200 bg-white p-6">User not found.</p> : user.isError ? (
        <QueryError resource="user information" onRetry={() => { void user.refetch(); }} />
      ) : user.data && <>
        <SectionTitle eyebrow="User profile" title="User information" description="Contact details, account status, and marketplace verification." />
        <UserProfile user={user.data} />
      </>}
    </div>
  );
}
