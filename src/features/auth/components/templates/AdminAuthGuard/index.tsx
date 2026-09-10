"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentAdmin = useAuthStore((state) => state.currentAdmin);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  useEffect(() => {
    if (isAuthInitialized && !currentAdmin) router.replace("/login");
  }, [currentAdmin, isAuthInitialized, router]);

  if (!currentAdmin) {
    return <main className="grid min-h-screen place-items-center bg-slate-50"><div className="text-center text-navy"><LoaderCircle className="mx-auto animate-spin" size={28} /><p className="mt-3 text-sm text-slate-500">Verifying admin session...</p></div></main>;
  }
  return children;
}
