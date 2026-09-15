import type {
  Country,
  Currency,
  Language,
  PaymentMethodConfig,
  SettingCategory,
  SystemSetting,
} from "../types";

export const SYSTEM_SETTINGS_ENDPOINT = "/admin/settings";
export const COUNTRIES_ENDPOINT = "/admin/countries";
export const CURRENCIES_ENDPOINT = "/admin/currencies";
export const LANGUAGES_ENDPOINT = "/admin/languages";
export const PAYMENT_METHODS_ENDPOINT = "/admin/payment-methods";
export const USE_SYSTEM_SETTINGS_MOCK = false;

export const SETTINGS_CATEGORY_LABELS: Record<SettingCategory, string> = {
  general: "General",
  marketplace: "Marketplace",
  localization: "Localization",
  order: "Orders",
  rfq: "RFQ",
  delivery: "Delivery",
  dispute: "Disputes",
  return: "Returns",
  refund: "Refunds",
  notification: "Notifications",
  security: "Security",
  file_upload: "File uploads",
  audit: "Audit",
  settlement: "Settlement",
  payout: "Payout",
};

export const GENERAL_SETTINGS_CATEGORIES: SettingCategory[] = [
  "general",
  "marketplace",
  "localization",
  "order",
  "rfq",
  "delivery",
  "dispute",
  "return",
  "refund",
  "notification",
  "security",
  "file_upload",
  "audit",
];

export const SETTLEMENT_PAYOUT_CATEGORIES: SettingCategory[] = ["settlement", "payout"];

export const HIGH_RISK_SETTING_KEYS = [
  "automaticSettlementEnabled",
  "settlementProcessingEnabled",
  "settlementHoldDays",
  "maximumAutomaticPayoutAmount",
  "payoutApprovalMode",
];

function setting(
  key: string,
  category: SettingCategory,
  value: SystemSetting["value"],
  description: string,
  options: Partial<Pick<SystemSetting, "isPublic" | "isEditable">> = {},
): SystemSetting {
  return {
    id: `setting_${key}`,
    key,
    category,
    value,
    valueType: Array.isArray(value) ? "array" : (typeof value as SystemSetting["valueType"]),
    description,
    isPublic: options.isPublic ?? false,
    isEditable: options.isEditable ?? true,
    updatedAt: new Date(Date.UTC(2026, 7, 28, 10, 0)).toISOString(),
  };
}

export const mockSystemSettings: SystemSetting[] = [
  setting("marketplaceName", "general", "Traders of Africa", "The public-facing name of the marketplace.", { isPublic: true }),
  setting("defaultCountry", "marketplace", "NG", "Default country used when a buyer's country cannot be determined.", { isPublic: true }),
  setting("defaultCurrency", "marketplace", "NGN", "Default currency used for marketplace pricing.", { isPublic: true }),
  setting("defaultLanguage", "localization", "en", "Default marketplace language.", { isPublic: true }),

  setting("defaultQuoteValidityDays", "rfq", 7, "Number of days a submitted RFQ quote remains valid."),
  setting("maximumRFQAttachments", "rfq", 5, "Maximum number of attachments allowed on an RFQ."),
  setting("RFQExpiryReminderEnabled", "rfq", true, "Send a reminder notification before an RFQ expires."),
  setting("maximumMarketRFQResponses", "rfq", 50, "Global cap on responses to a single Market RFQ."),

  setting("integratedLogisticsEnabled", "delivery", true, "Allow orders to use TOFA-integrated logistics providers."),
  setting("sellerArrangedLogisticsEnabled", "delivery", true, "Allow sellers to arrange their own delivery."),
  setting("buyerArrangedLogisticsEnabled", "delivery", false, "Allow buyers to arrange their own pickup/delivery."),

  setting("disputeWindowDays", "dispute", 7, "Number of days after delivery a buyer may open a dispute.", { isPublic: true }),
  setting("maximumDisputeEvidenceFiles", "dispute", 10, "Maximum evidence files allowed on a dispute."),
  setting("disputeAutoCloseDays", "dispute", 14, "Number of days of inactivity before a dispute auto-closes."),

  setting("returnWindowDays", "return", 7, "Number of days after delivery a buyer may request a return.", { isPublic: true }),
  setting("maximumReturnEvidenceFiles", "return", 10, "Maximum evidence files allowed on a return request."),

  setting("manualRefundRequiresApproval", "refund", true, "Require Admin approval before a manual refund is processed."),
  setting("refundNotificationEnabled", "refund", true, "Notify buyers and sellers when a refund is processed."),
  setting("automaticRefundEnabled", "refund", false, "Allow eligible refunds to process automatically without manual review."),
  setting("maximumAutomaticRefundAmount", "refund", { NGN: 50000, GHS: 500, USD: 100 }, "Per-currency ceiling for refunds that may process automatically."),

  setting("emailNotificationsEnabled", "notification", true, "Send transactional emails for important marketplace events."),
  setting("smsNotificationsEnabled", "notification", false, "Send SMS notifications for important marketplace events."),

  setting("maxLoginAttempts", "security", 5, "Number of failed login attempts before an account is temporarily locked."),
  setting("loginLockMinutes", "security", 15, "Duration of the temporary lock after repeated failed logins."),
  setting("adminOtpExpiryMinutes", "security", 10, "Minutes before an Admin password-reset OTP expires."),
  setting("userOtpExpiryMinutes", "security", 10, "Minutes before a User OTP expires."),
  setting("adminSetupTokenExpiryHours", "security", 24, "Hours before an Admin invitation setup link expires."),

  setting("maxImageSizeMb", "file_upload", 10, "Maximum image upload size, in megabytes."),
  setting("maxDocumentSizeMb", "file_upload", 20, "Maximum document upload size, in megabytes."),
  setting("allowedImageTypes", "file_upload", ["image/jpeg", "image/png", "image/webp"], "Accepted image MIME types."),
  setting("allowedDocumentTypes", "file_upload", ["application/pdf"], "Accepted document MIME types."),
  setting("maximumFilesPerUpload", "file_upload", 5, "Maximum number of files accepted in a single upload."),

  setting("auditLogRetentionDays", "audit", 730, "Number of days audit log records are retained."),
  setting("auditExportExpiryMinutes", "audit", 60, "Minutes an exported audit report download link remains valid."),

  setting("settlementHoldDays", "settlement", 2, "Number of days after order completion before a seller settlement becomes eligible for payout."),
  setting("automaticSettlementEnabled", "settlement", false, "Allow eligible settlements to proceed automatically into payout processing."),
  setting("settlementProcessingEnabled", "settlement", true, "Master switch for seller payout processing."),
  setting("settlementProcessingDays", "settlement", ["monday", "tuesday", "wednesday", "thursday", "friday"], "Business days on which settlements are processed."),
  setting("settlementRequiresVerifiedSeller", "settlement", true, "Require the seller to be verified before settlement is eligible."),
  setting("settlementRequiresVerifiedPayoutAccount", "settlement", true, "Require a verified payout account before processing."),

  setting("minimumPayoutAmounts", "payout", {}, "Per-currency minimum payout threshold. Leave empty to disable minimums for v1."),
  setting("maximumAutomaticPayoutAmount", "payout", { NGN: 5000000, USD: 5000 }, "Per-currency ceiling for payouts that may auto-process."),
  setting("payoutApprovalMode", "payout", "maker_checker", "Whether payouts require a single approver or a maker-checker separation of duties."),
  setting("payoutRetryEnabled", "payout", true, "Automatically retry a failed payout."),
];

export const mockCountries: Country[] = [
  { id: "country_ng", code: "NG", name: "Nigeria", phoneCode: "+234", status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "country_gh", code: "GH", name: "Ghana", phoneCode: "+233", status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "country_ke", code: "KE", name: "Kenya", phoneCode: "+254", status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "country_za", code: "ZA", name: "South Africa", phoneCode: "+27", status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "country_eg", code: "EG", name: "Egypt", phoneCode: "+20", status: "inactive", createdAt: "2026-01-01T00:00:00Z" },
];

export const mockCurrencies: Currency[] = [
  { id: "currency_ngn", code: "NGN", name: "Nigerian Naira", symbol: "₦", decimalPlaces: 2, status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "currency_ghs", code: "GHS", name: "Ghanaian Cedi", symbol: "₵", decimalPlaces: 2, status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "currency_usd", code: "USD", name: "US Dollar", symbol: "$", decimalPlaces: 2, status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "currency_kes", code: "KES", name: "Kenyan Shilling", symbol: "KSh", decimalPlaces: 2, status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "currency_egp", code: "EGP", name: "Egyptian Pound", symbol: "E£", decimalPlaces: 2, status: "inactive", createdAt: "2026-01-01T00:00:00Z" },
];

export const mockLanguages: Language[] = [
  { id: "language_en", code: "en", name: "English", nativeName: "English", direction: "ltr", status: "active" },
  { id: "language_fr", code: "fr", name: "French", nativeName: "Français", direction: "ltr", status: "active" },
  { id: "language_ar", code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl", status: "active" },
  { id: "language_sw", code: "sw", name: "Swahili", nativeName: "Kiswahili", direction: "ltr", status: "active" },
  { id: "language_pt", code: "pt", name: "Portuguese", nativeName: "Português", direction: "ltr", status: "inactive" },
];

export const mockPaymentMethods: PaymentMethodConfig[] = [
  { id: "pm_bank_transfer", code: "bank_transfer", displayName: "Bank Transfer", status: "active", supportedCurrencies: ["NGN", "GHS", "USD", "KES"], sortOrder: 1 },
  { id: "pm_flutterwave", code: "flutterwave", displayName: "Flutterwave", status: "active", supportedCurrencies: ["NGN", "GHS", "USD", "KES"], sortOrder: 2 },
  { id: "pm_paystack", code: "paystack", displayName: "Paystack", status: "active", supportedCurrencies: ["NGN", "GHS"], sortOrder: 3 },
  { id: "pm_transactworld", code: "transactworld", displayName: "TransactWorld", status: "inactive", supportedCurrencies: ["USD"], sortOrder: 4 },
  { id: "pm_papss", code: "papss", displayName: "PAPSS", status: "active", supportedCurrencies: ["NGN", "GHS", "KES"], sortOrder: 5 },
];
