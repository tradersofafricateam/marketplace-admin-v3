"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { APP_TOAST_EVENT, type AppToastDetail } from "@/lib/toast";

export function ToastProvider() {
  const [toast, setToast] = useState<AppToastDetail | null>(null);
  useEffect(() => {
    const handleToast = (event: Event) => {
      setToast((event as CustomEvent<AppToastDetail>).detail);
      window.setTimeout(() => setToast(null), 3500);
    };
    window.addEventListener(APP_TOAST_EVENT, handleToast);
    return () => window.removeEventListener(APP_TOAST_EVENT, handleToast);
  }, []);
  if (!toast) return null;
  const Icon = toast.tone === "error" ? XCircle : CheckCircle2;
  return <div role="status" className="fixed right-5 top-5 z-[70] flex max-w-sm items-center gap-3 rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-semibold text-navy-deep shadow-2xl"><Icon size={19} className={toast.tone === "error" ? "text-red-600" : "text-emerald-600"} />{toast.message}</div>;
}
