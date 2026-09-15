"use client";

import { useState } from "react";
import { QueryError } from "@/components/organisms/QueryError";
import { SettingsPageSkeleton } from "../SettingsPageSkeleton";
import { AlertTriangle } from "lucide-react";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { useSystemSettings } from "../../../hooks";
import type { SettingCategory, SystemSetting } from "../../../types";
import { CategorizedSettingsList, EditSystemSettingModal } from "../../organisms";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  categories: SettingCategory[];
  banner?: string;
};

export function SettingsPage({ eyebrow, title, description, categories, banner }: Props) {
  const settings = useSystemSettings(categories);
  const [settingBeingEdited, setSettingBeingEdited] = useState<SystemSetting | null>(null);

  if (settings.isPending) return <SettingsPageSkeleton />;
  if (settings.isError) return <QueryError resource="settings" onRetry={() => { void settings.refetch(); }} />;

  return (
    <div className="space-y-7">
      <SectionTitle eyebrow={eyebrow} title={title} description={description} />
      {banner && (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>{banner}</p>
        </div>
      )}
      <CategorizedSettingsList categories={categories} settings={settings.data?.data ?? []} onEdit={setSettingBeingEdited} />
      <EditSystemSettingModal key={settingBeingEdited?.id ?? "none"} setting={settingBeingEdited} onClose={() => setSettingBeingEdited(null)} />
    </div>
  );
}
