import { sanitizeRichText } from "@/lib/helpers/sanitize-rich-text";

export function RichText({ value, emptyMessage = "No company bio provided." }: { value: string | null | undefined; emptyMessage?: string }) {
  const html = sanitizeRichText(value ?? "");

  return (
    <div
      className="mt-2 break-words whitespace-pre-wrap text-sm leading-relaxed text-slate-600 [&_p+p]:mt-3 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline [&_s]:line-through [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:font-semibold [&_a]:text-sky-700 [&_a]:underline"
      dangerouslySetInnerHTML={{ __html: html || emptyMessage }}
    />
  );
}
