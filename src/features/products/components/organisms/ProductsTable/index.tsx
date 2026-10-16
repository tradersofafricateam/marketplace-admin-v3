"use client";

import { CopyableId } from "@/components/atoms/CopyableId";

import Link from "next/link";
import { MoreHorizontal, ShieldCheck } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/organisms/DataTable";
import { formatProductDate, formatProductPrice, localizedText } from "../../../helpers";
import { InventoryStatusBadge, ProductStatusBadge } from "../../atoms";
import { ProductThumbnail } from "../../molecules";
import type { AdminProduct } from "../../../types";

type Props = { products: AdminProduct[]; onChangeStatus: (product: AdminProduct) => void };

export function ProductsTable({ products, onChangeStatus }: Props) {
  const columns: DataTableColumn<AdminProduct>[] = [
    {
      key: "product",
      header: "Product",
      render: (product) => (
        <div className="group flex items-center gap-3">
          <ProductThumbnail images={product.images} className="size-10" />
          <span>
            <Link href={`/products/${product.id}`} className="block max-w-56 truncate text-sm font-bold text-navy-deep hover:text-sky-700">{localizedText(product.productName)}</Link>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              {product.seller?.storeName ?? <CopyableId value={product.sellerId} label="Seller ID" />}
              {(product.seller?.isCompanyVerified ?? product.seller?.isVerified) && <ShieldCheck size={12} className="text-emerald-600" />}
            </span>
          </span>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (product) =>
        product.productType === "variable" ? (
          <span className="text-slate-700">
            Varies
          </span>
        ) : (
          <span className="whitespace-nowrap text-slate-700">{formatProductPrice(product.price, product.currency)}</span>
        ),
    },
    { key: "stock", header: "Stock", render: (product) => <InventoryStatusBadge status={product.inventoryStatus} /> },
    { key: "status", header: "Status", render: (product) => <ProductStatusBadge status={product.status} /> },
    { key: "updatedAt", header: "Updated", render: (product) => <span className="whitespace-nowrap text-slate-500">{formatProductDate(product.updatedAt)}</span> },
    {
      key: "actions",
      header: "",
      className: "w-14",
      render: (product) => (
        <details className="relative">
          <summary className="list-none cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <MoreHorizontal size={18} />
          </summary>
          <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-sm shadow-xl">
            <Link href={`/products/${product.id}`} className="block rounded-lg px-3 py-2 hover:bg-slate-50">
              View product
            </Link>
            {product.status !== "rejected" && (
              <button onClick={() => onChangeStatus(product)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50">
                Review product
              </button>
            )}
          </div>
        </details>
      ),
    },
  ];
  return <DataTable columns={columns} data={products} getRowKey={(product) => product.id} emptyMessage="No products match these filters." />;
}
