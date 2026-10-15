import { cn } from "@/lib/utils";
import { translationCoverage } from "../../../helpers";
import type { TranslationObject } from "../../../types";

export function TranslationCoverage({ value }: { value: TranslationObject | undefined }) {
  const coverage = translationCoverage(value);
  return (
    <div className="flex flex-wrap gap-1.5">
      {coverage.map((language) => (
        <span
          key={language.code}
          title={`${language.label}${language.hasTranslation ? "" : " — not translated"}`}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-lg text-[11px] font-bold uppercase",
            language.hasTranslation ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-400",
          )}
        >
          {language.code}
        </span>
      ))}
    </div>
  );
}
