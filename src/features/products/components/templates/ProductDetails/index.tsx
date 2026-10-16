"use client";

import { RichText } from "@/components/atoms/RichText";
import { CopyableId } from "@/components/atoms/CopyableId";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImageOff, Layers, Package, Pencil, ShieldCheck, Store, Tag } from "lucide-react";
import { QueryError } from "@/components/organisms/QueryError";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { useProduct } from "../../../hooks";
import { calculateFinalPrice, formatProductDate, formatProductPrice, localizedText } from "../../../helpers";
import { InventoryStatusBadge, ProductStatusBadge } from "../../atoms";
import { TranslationCoverage } from "../../molecules";
import { ChangeProductStatusModal, VariantsTable } from "../../organisms";
import { ProductDetailsSkeleton } from "../ProductDetailsSkeleton";

export function ProductDetails({ productId }: { productId: string }) {
  const { data: product, isPending, isError, refetch } = useProduct(productId);
  const [statusOpen, setStatusOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (isPending) return <ProductDetailsSkeleton />;
  if (isError) return <QueryError resource="product" onRetry={() => { void refetch(); }} />;
  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <p className="font-semibold text-navy-deep">Product not found.</p>
        <Link href="/products" className="mt-3 inline-block text-sm text-sky-700">Return to products</Link>
      </div>
    );
  }

  const sortedImages = [...product.images].sort((a, b) => a.sortOrder - b.sortOrder);
  const mainImage = sortedImages[activeImage] ?? sortedImages[0];
  const finalPrice = calculateFinalPrice(product.price, product.discount);

  return (
    <div className="space-y-7">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy">
        <ArrowLeft size={16} />
        Products
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Commerce" title={localizedText(product.productName)} description="Listing details, variants, and moderation status." />
        {product.status !== "rejected" && (
          <button onClick={() => setStatusOpen(true)} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-navy px-4 text-sm font-semibold text-white hover:bg-navy-deep">
            <Pencil size={16} />
            Review product
          </button>
        )}
      </div>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.4fr]">
        <div className="space-y-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-slate-100 text-slate-400">
              {mainImage?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mainImage.url} alt="" className="size-full object-cover" />
              ) : (
                <ImageOff size={32} />
              )}
            </div>
            {sortedImages.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {sortedImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setActiveImage(index)}
                    className={`grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border-2 ${index === activeImage ? "border-navy" : "border-transparent"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.url} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-5 flex items-center justify-between">
              {product.productType === "simple" ? (
                <div>
                  <span className="text-lg font-bold text-navy-deep">{formatProductPrice(finalPrice, product.currency)}</span>
                  {product.discount ? <span className="ml-2 text-sm text-slate-400 line-through">{formatProductPrice(product.price, product.currency)}</span> : null}
                </div>
              ) : (
                <span className="text-sm font-semibold text-slate-600">Varies</span>
              )}
              <ProductStatusBadge status={product.status} />
            </div>
            <div className="mt-4">
              <InventoryStatusBadge status={product.inventoryStatus} />
            </div>
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-left text-sm text-slate-600">
              <p className="flex items-center gap-3">
                <Store size={16} className="text-sky-700" />
                {product.seller?.storeName ?? <CopyableId value={product.sellerId} label="Seller ID" />}
                {(product.seller?.isCompanyVerified ?? product.seller?.isVerified) && <ShieldCheck size={14} className="text-emerald-600" />}
              </p>
              <p className="flex items-center gap-3">
                <Package size={16} className="text-sky-700" />
                {product.totalStock} in stock
              </p>
              <p className="flex items-center gap-3">
                <Tag size={16} className="text-sky-700" />
                {product.countryOfOrigin}
              </p>
              <p className="flex items-center gap-3">
                <Layers size={16} className="text-sky-700" />
                {product.productType === "variable" ? "Multiple variants" : "Single variant"}
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-navy-deep">Categories</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.categoryIds.length ? (
                product.categoryIds.map((categoryId) => (
                  <span key={categoryId} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                    <CopyableId value={categoryId} label="Category ID" />
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500">No categories assigned.</p>
              )}
            </div>
          </article>
        </div>

        <div className="space-y-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-navy-deep">Description</h2>
              <TranslationCoverage value={product.productDescription} />
            </div>
            <RichText value={localizedText(product.productDescription)} emptyMessage="No product description provided." />
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Name translations</p>
              <TranslationCoverage value={product.productName} />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-navy-deep">Trade terms</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ["Supply capacity", `${product.supplyCapacity} ${product.unitForSupplyCapacity}`],
                ["Minimum order", `${product.minOrdersAllowed} ${product.unitForMinOrder}`],
                ["Lead time", `${product.minDuration}–${product.maxDuration} ${product.durationUnit}`],
                ["Barcode", product.barcode ?? "—"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-slate-100 pb-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
                  <dd className="mt-2 text-sm font-medium text-navy-deep">{value}</dd>
                </div>
              ))}
            </dl>
          </article>

          {product.productType === "variable" && (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-navy-deep">Variant options</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(product.variantOptions ?? []).map((option) => (
                  <span key={option.id} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                    <strong className="text-navy-deep">{option.name}:</strong> {option.values.join(", ")}
                  </span>
                ))}
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <VariantsTable variants={product.variants ?? []} currency={product.currency} />
              </div>
            </article>
          )}

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-navy-deep">Record</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Product ID</dt>
                <dd className="mt-2 text-sm font-medium text-navy-deep"><CopyableId value={product.id} label="Product ID" /></dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Currency</dt>
                <dd className="mt-2 text-sm font-medium text-navy-deep">{product.currency}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Created</dt>
                <dd className="mt-2 text-sm font-medium text-navy-deep">{formatProductDate(product.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last updated</dt>
                <dd className="mt-2 text-sm font-medium text-navy-deep">{formatProductDate(product.updatedAt)}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
      <ChangeProductStatusModal key={statusOpen ? product.id : "closed"} product={statusOpen ? product : null} onClose={() => setStatusOpen(false)} />
    </div>
  );
}
