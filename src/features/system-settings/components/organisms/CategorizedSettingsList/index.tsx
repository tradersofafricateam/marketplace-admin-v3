"use client";

import { Pencil } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { SETTINGS_CATEGORY_LABELS } from "../../../constants";
import { settingKeyLabel } from "../../../helpers";
import type { SettingCategory, SystemSetting } from "../../../types";
import { SettingValueDisplay } from "../../molecules";

type Props = {
  categories: SettingCategory[];
  settings: SystemSetting[];
  onEdit: (setting: SystemSetting) => void;
};

export function CategorizedSettingsList({ categories, settings, onEdit }: Props) {
  const columns: DataTableColumn<SystemSetting>[] = [
    {
      key: "key",
      header: "Setting",
      render: (setting) => (
        <div>
          <strong className="block text-sm text-navy-deep">{settingKeyLabel(setting.key)}</strong>
          <span className="text-xs text-slate-500">{setting.description}</span>
        </div>
      ),
    },
    { key: "value", header: "Current value", render: (setting) => <SettingValueDisplay setting={setting} /> },
    {
      key: "visibility",
      header: "Visibility",
      render: (setting) => <span className="text-xs font-semibold text-slate-500">{setting.isPublic ? "Public" : "Private"}</span>,
    },
    {
      key: "actions",
      header: "",
      className: "w-14",
      render: (setting) =>
        setting.isEditable ? (
          <button onClick={() => onEdit(setting)} aria-label={`Edit ${setting.key}`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <Pencil size={16} />
          </button>
        ) : null,
    },
  ];

  const groups = categories
    .map((category) => ({ category, items: settings.filter((setting) => setting.category === category) }))
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">No settings configured yet.</div>;
  }

  return (
    <div className="space-y-6">
      {groups.map(({ category, items }) => (
        <section key={category} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold text-navy-deep">{SETTINGS_CATEGORY_LABELS[category]}</h2>
          </header>
          <DataTable columns={columns} data={items} getRowKey={(setting) => setting.id} />
        </section>
      ))}
    </div>
  );
}
