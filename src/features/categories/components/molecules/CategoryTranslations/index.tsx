import { LANGUAGE_LABELS } from "../../../constants";
import type { Translation } from "../../../types";
export function CategoryTranslations({ value }: { value?: Translation | null }) {
  if (!value) return <p className="text-sm text-slate-500">Not provided</p>;
  const translations = typeof value === "string" ? { en: value } : value;
  return <dl className="space-y-3">{Object.entries(translations).map(([language, text]) => <div key={language}><dt className="text-xs text-slate-500">{LANGUAGE_LABELS[language as keyof typeof LANGUAGE_LABELS] ?? language}</dt><dd dir={language === "ar" ? "rtl" : "auto"} className="mt-1 whitespace-pre-wrap text-sm">{text}</dd></div>)}</dl>;
}
