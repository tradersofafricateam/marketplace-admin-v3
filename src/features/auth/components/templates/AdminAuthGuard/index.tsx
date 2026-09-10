"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/atoms/Skeleton";
import { useAuthStore } from "@/store/auth-store";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentAdmin = useAuthStore((state) => state.currentAdmin);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  useEffect(() => {
    if (isAuthInitialized && !currentAdmin) router.replace("/login");
  }, [currentAdmin, isAuthInitialized, router]);

  if (!currentAdmin) {
    return <main className="min-h-screen bg-slate-50" role="status" aria-label="Verifying admin session"><div className="fixed inset-y-0 left-0 hidden w-72 bg-navy-deep p-5 lg:block"><Skeleton className="h-14 w-28 bg-white/10" /><div className="mt-10 space-y-4">{Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} className="h-9 w-full bg-white/10" />)}</div></div><div className="lg:pl-72"><div className="h-20 border-b border-slate-200 bg-white px-8 py-5"><Skeleton className="h-5 w-40" /></div><div className="space-y-7 p-8"><Skeleton className="h-9 w-64" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-40 rounded-2xl" />)}</div><Skeleton className="h-80 rounded-2xl" /></div></div><span className="sr-only">Verifying admin session</span></main>;
  }
  return children;
}
