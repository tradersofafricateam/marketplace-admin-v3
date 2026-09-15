import { HIGH_RISK_SETTING_KEYS } from "../constants";

export function isHighRiskSetting(key: string) {
  return HIGH_RISK_SETTING_KEYS.includes(key);
}

export function formatSettingsDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function settingKeyLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
}
