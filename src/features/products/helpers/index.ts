import { PRODUCT_STATUS_TRANSITIONS, SUPPORTED_LANGUAGES } from "../constants";
import type { ProductStatus, SupportedLanguage, TranslationObject } from "../types";

export function localizedText(value: TranslationObject | undefined, locale: SupportedLanguage = "en") {
  if (!value) return "";
  return value[locale] ?? value.en ?? Object.values(value)[0] ?? "";
}

export function translationCoverage(value: TranslationObject | undefined) {
  return SUPPORTED_LANGUAGES.map((language) => ({ ...language, hasTranslation: Boolean(value?.[language.code]?.trim()) }));
}

export function formatProductDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function formatProductPrice(price: number | null, currency: string) {
  if (price === null) return "—";
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 2 }).format(price);
  } catch {
    return `${currency} ${price.toLocaleString()}`;
  }
}

/** Display-only estimate; the backend remains the authoritative source per the product spec. */
export function calculateFinalPrice(price: number | null, discount: number | null) {
  if (price === null) return null;
  if (!discount) return price;
  return price - (price * discount) / 100;
}

export function getAvailableStatusTransitions(status: ProductStatus): ProductStatus[] {
  return PRODUCT_STATUS_TRANSITIONS[status] ?? [];
}
