import { Suspense } from "react";
import { SettlementPayoutConfigPage } from "@/features/system-settings/components/templates/SettlementPayoutConfigPage";
import { SettingsPageSkeleton } from "@/features/system-settings/components/templates/SettingsPageSkeleton";

export default function SettlementPayoutConfigRoute() {
  return (
    <Suspense fallback={<SettingsPageSkeleton />}>
      <SettlementPayoutConfigPage />
    </Suspense>
  );
}
