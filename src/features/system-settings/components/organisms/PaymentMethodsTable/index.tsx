"use client";

import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { EntityStatusBadge } from "../../atoms";
import type { PaymentMethodConfig } from "../../../types";

type Props = { paymentMethods: PaymentMethodConfig[]; onToggleStatus: (paymentMethod: PaymentMethodConfig) => void };

export function PaymentMethodsTable({ paymentMethods, onToggleStatus }: Props) {
  const columns: DataTableColumn<PaymentMethodConfig>[] = [
    { key: "displayName", header: "Payment method", render: (pm) => <strong className="text-sm text-navy-deep">{pm.displayName}</strong> },
    { key: "code", header: "Code", render: (pm) => <span className="text-slate-700">{pm.code}</span> },
    {
      key: "currencies",
      header: "Supported currencies",
      render: (pm) => (
        <span className="flex flex-wrap gap-1">
          {pm.supportedCurrencies.map((code) => (
            <span key={code} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{code}</span>
          ))}
        </span>
      ),
    },
    { key: "status", header: "Status", render: (pm) => <EntityStatusBadge status={pm.status} /> },
    {
      key: "actions",
      header: "",
      className: "w-32",
      render: (pm) => (
        <button onClick={() => onToggleStatus(pm)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
          {pm.status === "active" ? "Deactivate" : "Activate"}
        </button>
      ),
    },
  ];
  return <DataTable columns={columns} data={paymentMethods} getRowKey={(pm) => pm.id} emptyMessage="No payment methods configured yet." />;
}
