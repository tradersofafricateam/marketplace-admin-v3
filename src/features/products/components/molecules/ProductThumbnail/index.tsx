import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "../../../types";

export function ProductThumbnail({ images, className }: { images: ProductImage[]; className?: string }) {
  const primary = images.find((image) => image.isPrimary) ?? images[0];
  return (
    <span className={cn("grid shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100 text-slate-400", className)}>
      {primary?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={primary.url} alt="" className="size-full object-cover" />
      ) : (
        <ImageOff size={16} />
      )}
    </span>
  );
}
