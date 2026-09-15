import { Suspense } from "react";
import { GeneralSettingsPage } from "@/features/system-settings/components/templates/GeneralSettingsPage";
import { SettingsPageSkeleton } from "@/features/system-settings/components/templates/SettingsPageSkeleton";

export default function SettingsRoute() {
  return (
    <Suspense fallback={<SettingsPageSkeleton />}>
      <GeneralSettingsPage />
    </Suspense>
  );
}
