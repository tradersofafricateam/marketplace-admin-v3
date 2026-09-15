"use client";

import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { EntityStatusBadge } from "../../atoms";
import type { Language } from "../../../types";

type Props = { languages: Language[]; onToggleStatus: (language: Language) => void };

export function LanguagesTable({ languages, onToggleStatus }: Props) {
  const columns: DataTableColumn<Language>[] = [
    { key: "name", header: "Language", render: (language) => <strong className="text-sm text-navy-deep">{language.name}</strong> },
    { key: "nativeName", header: "Native name", render: (language) => <span className="text-slate-700">{language.nativeName ?? "—"}</span> },
    { key: "code", header: "Code", render: (language) => <span className="text-slate-700">{language.code}</span> },
    { key: "direction", header: "Direction", render: (language) => <span className="uppercase text-slate-700">{language.direction}</span> },
    { key: "status", header: "Status", render: (language) => <EntityStatusBadge status={language.status} /> },
    {
      key: "actions",
      header: "",
      className: "w-32",
      render: (language) => (
        <button onClick={() => onToggleStatus(language)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
          {language.status === "active" ? "Deactivate" : "Activate"}
        </button>
      ),
    },
  ];
  return <DataTable columns={columns} data={languages} getRowKey={(language) => language.id} emptyMessage="No languages configured yet." />;
}
