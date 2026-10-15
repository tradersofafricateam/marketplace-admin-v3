"use client";

import Link from "next/link";
import { Copy } from "lucide-react";
import { showToast } from "@/lib/toast";

export function CopyableId({ value, href, label = "ID" }: { value: string; href?: string; label?: string }) {
  const display = value.length > 18 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${label} copied`);
    } catch {
      showToast(`Unable to copy ${label.toLowerCase()}. Please try again.`, "error");
    }
  }

  return (
    <span className="inline-flex max-w-full items-center gap-1 align-middle">
      {href ? (
        <Link href={href} title={value} aria-label={`${label}: ${value}`} className="truncate font-mono text-sky-700 hover:underline focus-visible:outline-2 focus-visible:outline-sky-700">{display}</Link>
      ) : <span title={value} aria-label={`${label}: ${value}`} className="truncate font-mono">{display}</span>}
      <button type="button" title={`Copy ${label.toLowerCase()}`} aria-label={`Copy ${label.toLowerCase()}: ${value}`} onClick={(event) => { event.stopPropagation(); void copy(); }} className="inline-flex size-7 shrink-0 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-700">
        <Copy size={14} aria-hidden="true" />
      </button>
    </span>
  );
}
