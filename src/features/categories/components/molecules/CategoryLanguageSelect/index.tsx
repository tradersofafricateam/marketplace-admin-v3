"use client";

import { useState } from "react";
import { useLanguages } from "@/features/system-settings/hooks/use-languages";
import { fieldClass } from "../../atoms/CategoryField";

export function CategoryLanguageSelect() {
  const languages = useLanguages();
  const [selected, setSelected] = useState<string | null>(null);
  const active = (languages.data ?? []).filter((language) => language.status === "active");
  const preferred = selected ?? (active.some((language) => language.code === "en") ? "en" : "");
  const value = active.some((language) => language.code === preferred) ? preferred : "";

  return (
    <div className="space-y-2">
      <label className="block space-y-2 text-sm font-medium">
        Content language
        <select
          name="sourceLanguage"
          value={value}
          disabled={languages.isPending || languages.isError || !active.length}
          onChange={(event) => setSelected(event.target.value)}
          className={fieldClass}
        >
          <option value="">{languages.isPending ? "Loading languages…" : languages.isError ? "Languages unavailable" : !active.length ? "No active languages" : "Use default language"}</option>
          {active.map((language) => <option key={language.id} value={language.code}>{language.name}</option>)}
        </select>
      </label>
      {languages.isError && (
        <p role="alert" className="text-sm text-red-600">
          Unable to load languages. <button type="button" onClick={() => { void languages.refetch(); }} className="font-semibold underline">Retry</button>
        </p>
      )}
    </div>
  );
}
