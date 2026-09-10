import { notFound } from "next/navigation";
import { ModulePlaceholder } from "@/features/shared/components/templates/ModulePlaceholder";
import { adminModules } from "@/lib/constants/admin-modules";

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: slug } = await params;
  const adminModule = adminModules.find((item) => item.href === `/${slug}` && item.href !== "/dashboard");
  if (!adminModule) notFound();
  return <ModulePlaceholder module={adminModule} />;
}
