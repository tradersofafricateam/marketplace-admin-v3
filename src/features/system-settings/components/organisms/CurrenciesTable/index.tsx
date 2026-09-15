"use client";

import { MoreHorizontal } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { EntityStatusBadge } from "../../atoms";
import type { Currency } from "../../../types";

type Props = { currencies: Currency[]; onEdit: (currency: Currency) => void; onToggleStatus: (currency: Currency) => void };

export function CurrenciesTable({ currencies, onEdit, onToggleStatus }: Props) {
  const columns: DataTableColumn<Currency>[] = [
    { key: "name", header: "Currency", render: (currency) => <strong className="text-sm text-navy-deep">{currency.name}</strong> },
    { key: "code", header: "Code", render: (currency) => <span className="text-slate-700">{currency.code}</span> },
    { key: "symbol", header: "Symbol", render: (currency) => <span className="text-slate-700">{currency.symbol ?? "—"}</span> },
    { key: "decimalPlaces", header: "Decimals", render: (currency) => <span className="text-slate-700">{currency.decimalPlaces}</span> },
    { key: "status", header: "Status", render: (currency) => <EntityStatusBadge status={currency.status} /> },
    {
      key: "actions",
      header: "",
      className: "w-14",
      render: (currency) => (
        <details className="relative">
          <summary className="list-none cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <MoreHorizontal size={18} />
          </summary>
          <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl">
            <button onClick={() => onEdit(currency)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">Edit</button>
            <button onClick={() => onToggleStatus(currency)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">
              {currency.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        </details>
      ),
    },
  ];
  return <DataTable columns={columns} data={currencies} getRowKey={(currency) => currency.id} emptyMessage="No currencies configured yet." />;
}
