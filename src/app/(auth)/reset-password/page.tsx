import type { Metadata } from "next";
import { ResetPasswordScreen } from "@/features/auth";

export const metadata: Metadata = { title: "Reset password" };

type ResetPasswordPageProps = {
  searchParams: Promise<{ email?: string | string[] }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const query = await searchParams;
  const email = Array.isArray(query.email) ? query.email[0] : query.email;
  return <ResetPasswordScreen initialEmail={email?.trim()} />;
}
