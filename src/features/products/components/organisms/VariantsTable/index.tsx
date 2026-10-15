import { ImageOff } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { formatProductPrice } from "../../../helpers";
import type { ProductVariant } from "../../../types";

export function VariantsTable({ variants, currency }: { variants: ProductVariant[]; currency: string }) {
  const columns: DataTableColumn<ProductVariant>[] = [
    {
      key: "variant",
      header: "Variant",
      render: (variant) => (
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100 text-slate-400">
            {variant.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={variant.image} alt="" className="size-full object-cover" />
            ) : (
              <ImageOff size={14} />
            )}
          </span>
          <span className="flex flex-wrap gap-1">
            {Object.entries(variant.attributes).map(([name, value]) => (
              <span key={name} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {name}: {value}
              </span>
            ))}
          </span>
        </div>
      ),
    },
    { key: "sku", header: "SKU", render: (variant) => <span className="font-mono text-xs text-slate-500">{variant.sku}</span> },
    { key: "price", header: "Price", render: (variant) => <span className="text-slate-700">{formatProductPrice(variant.price, currency)}</span> },
    { key: "discount", header: "Discount", render: (variant) => <span className="text-slate-700">{variant.discount ? `${variant.discount}%` : "—"}</span> },
    { key: "quantity", header: "Stock", render: (variant) => <span className="text-slate-700">{variant.quantity}</span> },
  ];
  return <DataTable columns={columns} data={variants} getRowKey={(variant) => variant.id} emptyMessage="No variants configured." />;
}
