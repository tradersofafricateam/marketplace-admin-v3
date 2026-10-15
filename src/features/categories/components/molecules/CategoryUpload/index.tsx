"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { CATEGORY_IMAGE_TYPES } from "../../../helpers/create-category-form";

type Props = { label: string; hint: string; file?: File; onChange: (file?: File) => void };

export function CategoryUpload({ label, hint, file, onChange }: Props) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const previewUrl = useRef("");
  useEffect(() => () => { if (previewUrl.current) URL.revokeObjectURL(previewUrl.current); }, []);
  function clearPreview() {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = "";
    setPreview("");
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold">{label} <span className="font-normal text-slate-400">Optional</span></label>
        {file && <button type="button" aria-label={`Remove ${label.toLowerCase()}`} onClick={() => { onChange(undefined); clearPreview(); setError(""); if (input.current) input.current.value = ""; }} className="rounded p-1 text-slate-500 hover:bg-slate-100"><X size={16} /></button>}
      </div>
      <label htmlFor={id} className="relative flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center transition hover:border-sky-500 hover:bg-sky-50 focus-within:ring-2 focus-within:ring-sky-500">
        {file && preview ? <Image src={preview} alt={`${label} preview`} width={128} height={80} unoptimized className="h-20 w-32 object-contain" /> : <ImagePlus size={28} className="text-sky-600" aria-hidden="true" />}
        <span className="max-w-full truncate text-sm font-medium text-sky-700">{file ? file.name : `Choose ${label.toLowerCase()}`}</span>
        <span className="text-xs text-slate-500">{file ? `${(file.size / 1024).toFixed(1)} KB · Click to replace` : "JPEG, PNG or WebP"}</span>
        <input ref={input} id={id} type="file" accept={CATEGORY_IMAGE_TYPES.join(",")} aria-describedby={`${id}-hint`} className="sr-only" onChange={(event) => {
          const selected = event.target.files?.[0];
          if (!selected) return;
          if (!CATEGORY_IMAGE_TYPES.includes(selected.type)) { setError("Choose a JPEG, PNG or WebP file."); event.target.value = ""; return; }
          clearPreview();
          previewUrl.current = URL.createObjectURL(selected);
          setPreview(previewUrl.current);
          setError(""); onChange(selected);
        }} />
      </label>
      <p id={`${id}-hint`} className="text-xs text-slate-500">{hint}</p>
      {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
