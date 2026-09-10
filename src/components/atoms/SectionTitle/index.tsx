type SectionTitleProps = { eyebrow?: string; title: string; description?: string };

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return <div>{eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">{eyebrow}</p>}<h1 className="text-2xl font-bold tracking-tight text-navy-deep sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p>}</div>;
}
