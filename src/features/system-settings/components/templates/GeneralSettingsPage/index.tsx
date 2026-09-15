import { GENERAL_SETTINGS_CATEGORIES } from "../../../constants";
import { SettingsPage } from "../SettingsPage";

export function GeneralSettingsPage() {
  return (
    <SettingsPage
      eyebrow="Configuration"
      title="Marketplace settings"
      description="System-wide operational configuration. Changes apply prospectively and never rewrite historical transactions."
      categories={GENERAL_SETTINGS_CATEGORIES}
    />
  );
}
