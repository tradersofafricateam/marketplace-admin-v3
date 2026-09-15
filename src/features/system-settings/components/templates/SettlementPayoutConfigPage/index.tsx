import { SETTLEMENT_PAYOUT_CATEGORIES } from "../../../constants";
import { SettingsPage } from "../SettingsPage";

export function SettlementPayoutConfigPage() {
  return (
    <SettingsPage
      eyebrow="Configuration"
      title="Settlement & payout"
      description="Financial schedules, limits, and rules that govern when and how seller settlements become eligible for payout."
      categories={SETTLEMENT_PAYOUT_CATEGORIES}
      banner="These settings control real seller payouts. Changes only affect settlements calculated after the change — existing eligibleAt dates and completed payouts are never recalculated."
    />
  );
}
