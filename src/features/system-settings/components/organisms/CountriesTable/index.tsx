"use client";

import { MoreHorizontal } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { EntityStatusBadge } from "../../atoms";
import type { Country } from "../../../types";

type Props = { countries: Country[]; onEdit: (country: Country) => void; onToggleStatus: (country: Country) => void };

export function CountriesTable({ countries, onEdit, onToggleStatus }: Props) {
  const columns: DataTableColumn<Country>[] = [
    { key: "name", header: "Country", render: (country) => <strong className="text-sm text-navy-deep">{country.name}</strong> },
    { key: "code", header: "Code", render: (country) => <span className="text-slate-700">{country.code}</span> },
    { key: "phoneCode", header: "Phone code", render: (country) => <span className="text-slate-700">{country.phoneCode ?? "—"}</span> },
    { key: "status", header: "Status", render: (country) => <EntityStatusBadge status={country.status} /> },
    {
      key: "actions",
      header: "",
      className: "w-14",
      render: (country) => (
        <details className="relative">
          <summary className="list-none cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <MoreHorizontal size={18} />
          </summary>
          <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl">
            <button onClick={() => onEdit(country)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">Edit</button>
            <button onClick={() => onToggleStatus(country)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">
              {country.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        </details>
      ),
    },
  ];
  return <DataTable columns={columns} data={countries} getRowKey={(country) => country.id} emptyMessage="No countries configured yet." />;
}
