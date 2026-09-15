import { apiClient } from "@/lib/api";
import {
  COUNTRIES_ENDPOINT,
  CURRENCIES_ENDPOINT,
  LANGUAGES_ENDPOINT,
  PAYMENT_METHODS_ENDPOINT,
  SYSTEM_SETTINGS_ENDPOINT,
} from "../constants";
import type {
  Country,
  CreateCountryPayload,
  CreateCurrencyPayload,
  Currency,
  EntityActionResponse,
  EntityStatusPayload,
  Language,
  PaymentMethodConfig,
  SettingCategory,
  SystemSettingActionResponse,
  SystemSettingsResponse,
  UpdateCountryPayload,
  UpdateCurrencyPayload,
  UpdateSystemSettingPayload,
} from "../types";

export async function getSystemSettings(category?: SettingCategory) {
  const { data } = await apiClient.get<SystemSettingsResponse>(SYSTEM_SETTINGS_ENDPOINT, { params: category ? { category } : undefined });
  return data;
}

export async function updateSystemSetting(key: string, payload: UpdateSystemSettingPayload) {
  const { data } = await apiClient.patch<SystemSettingActionResponse>(`${SYSTEM_SETTINGS_ENDPOINT}/${key}`, payload);
  return data;
}

export async function getCountries() {
  const { data } = await apiClient.get<{ success: boolean; data: Country[] }>(COUNTRIES_ENDPOINT);
  return data.data;
}

export async function createCountry(payload: CreateCountryPayload) {
  const { data } = await apiClient.post<EntityActionResponse>(COUNTRIES_ENDPOINT, payload);
  return data;
}

export async function updateCountry(countryId: string, payload: UpdateCountryPayload) {
  const { data } = await apiClient.patch<EntityActionResponse>(`${COUNTRIES_ENDPOINT}/${countryId}`, payload);
  return data;
}

export async function changeCountryStatus(countryId: string, payload: EntityStatusPayload) {
  const { data } = await apiClient.patch<EntityActionResponse>(`${COUNTRIES_ENDPOINT}/${countryId}/status`, payload);
  return data;
}

export async function getCurrencies() {
  const { data } = await apiClient.get<{ success: boolean; data: Currency[] }>(CURRENCIES_ENDPOINT);
  return data.data;
}

export async function createCurrency(payload: CreateCurrencyPayload) {
  const { data } = await apiClient.post<EntityActionResponse>(CURRENCIES_ENDPOINT, payload);
  return data;
}

export async function updateCurrency(currencyId: string, payload: UpdateCurrencyPayload) {
  const { data } = await apiClient.patch<EntityActionResponse>(`${CURRENCIES_ENDPOINT}/${currencyId}`, payload);
  return data;
}

export async function changeCurrencyStatus(currencyId: string, payload: EntityStatusPayload) {
  const { data } = await apiClient.patch<EntityActionResponse>(`${CURRENCIES_ENDPOINT}/${currencyId}/status`, payload);
  return data;
}

export async function getLanguages() {
  const { data } = await apiClient.get<{ success: boolean; data: Language[] }>(LANGUAGES_ENDPOINT);
  return data.data;
}

export async function changeLanguageStatus(languageId: string, payload: EntityStatusPayload) {
  const { data } = await apiClient.patch<EntityActionResponse>(`${LANGUAGES_ENDPOINT}/${languageId}/status`, payload);
  return data;
}

export async function getPaymentMethods() {
  const { data } = await apiClient.get<{ success: boolean; data: PaymentMethodConfig[] }>(PAYMENT_METHODS_ENDPOINT);
  return data.data;
}

export async function changePaymentMethodStatus(paymentMethodId: string, payload: EntityStatusPayload) {
  const { data } = await apiClient.patch<EntityActionResponse>(`${PAYMENT_METHODS_ENDPOINT}/${paymentMethodId}/status`, payload);
  return data;
}
