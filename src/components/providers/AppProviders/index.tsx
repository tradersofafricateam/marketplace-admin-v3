"use client";

import { AuthProvider } from "../AuthProvider";
import { QueryProvider } from "../QueryProvider";
import { ToastProvider } from "../ToastProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <QueryProvider><AuthProvider>{children}</AuthProvider><ToastProvider /></QueryProvider>;
}
