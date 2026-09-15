/** Marketplace configuration: general settings, settlement/payout rules, countries, currencies, languages, and payment methods. */
export const systemSettingsCapabilities = [
  "settings",
  "settlement-payout-config",
  "countries",
  "currencies",
  "languages",
  "payment-methods",
] as const;
export {
  CountriesPage,
  CurrenciesPage,
  EntityListPageSkeleton,
  GeneralSettingsPage,
  LanguagesPage,
  PaymentMethodsPage,
  SettingsPageSkeleton,
  SettlementPayoutConfigPage,
} from "./components";
