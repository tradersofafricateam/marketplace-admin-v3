export type SettingValueType = "string" | "number" | "boolean" | "array" | "object";

export type SettingCategory =
  | "general"
  | "marketplace"
  | "localization"
  | "order"
  | "rfq"
  | "delivery"
  | "dispute"
  | "return"
  | "refund"
  | "notification"
  | "security"
  | "file_upload"
  | "audit"
  | "settlement"
  | "payout";

export type SettingValue = string | number | boolean | string[] | Record<string, number> | Record<string, boolean>;

export type SystemSetting = {
  id: string;
  key: string;
  category: SettingCategory;
  value: SettingValue;
  valueType: SettingValueType;
  description: string;
  isPublic: boolean;
  isEditable: boolean;
  updatedAt: string;
};

export type SystemSettingsResponse = { success: boolean; data: SystemSetting[] };
export type UpdateSystemSettingPayload = { value: SettingValue };
export type SystemSettingActionResponse = { success: boolean; message: string; data?: { key: string; value: SettingValue } };

export type EntityStatus = "active" | "inactive";

export type Country = {
  id: string;
  code: string;
  name: string;
  phoneCode?: string;
  status: EntityStatus;
  createdAt: string;
};

export type Currency = {
  id: string;
  code: string;
  name: string;
  symbol?: string;
  decimalPlaces: number;
  status: EntityStatus;
  createdAt: string;
};

export type LanguageDirection = "ltr" | "rtl";

export type Language = {
  id: string;
  code: string;
  name: string;
  nativeName?: string;
  direction: LanguageDirection;
  status: EntityStatus;
};

export type PaymentMethodConfig = {
  id: string;
  code: string;
  displayName: string;
  status: EntityStatus;
  supportedCurrencies: string[];
  sortOrder?: number;
};

export type CreateCountryPayload = { code: string; name: string; phoneCode?: string };
export type UpdateCountryPayload = Partial<CreateCountryPayload>;

export type CreateCurrencyPayload = { code: string; name: string; symbol?: string; decimalPlaces: number };
export type UpdateCurrencyPayload = Partial<CreateCurrencyPayload>;

export type EntityStatusPayload = { status: EntityStatus };
export type EntityActionResponse = { success: boolean; message: string };
