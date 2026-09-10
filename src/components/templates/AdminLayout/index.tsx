import { AdminHeader } from "@/components/organisms/AdminHeader";
import { AdminSidebar } from "@/components/organisms/AdminSidebar";

export function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-slate-50"><AdminSidebar /><div className="min-w-0 lg:pl-72"><AdminHeader /><main className="p-5 md:p-8">{children}</main></div></div>;
}
