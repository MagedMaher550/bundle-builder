import clsx from "clsx";
import type { SecurityDevice } from "@/types";

interface ProductVariantsProps {
  product: SecurityDevice;
  selectedVariantId?: string;
  onSelectVariant: (variantId: string) => void;
}

export default function ProductVariants({
  product,
  selectedVariantId,
  onSelectVariant,
}: ProductVariantsProps) {
  if (!product.variants || product.variants.length <= 1) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {product.variants.map((variant) => {
        const active = selectedVariantId
          ? selectedVariantId === variant.id
          : product.variants && variant.id === product.variants[0].id;

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelectVariant(variant.id)}
            className={clsx(
              "inline-flex h-7 items-center gap-1.5 rounded border px-2 transition-colors ml-1",
              active
                ? "border-emerald-300 bg-white"
                : "border-slate-200 bg-white hover:border-slate-300",
            )}
          >
            <img
              src={variant.image}
              alt=""
              className="h-4 w-4 object-contain"
            />

            <span className="text-[11px] font-medium text-slate-700">
              {variant.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
