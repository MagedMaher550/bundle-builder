import clsx from "clsx";

import type { SecurityDevice } from "@/types";
import type { ProductCardSharedProps } from "./ProductCard.types";

import QuantityControl from "../QuantityControl";
import ProductPrice from "../ProductPrice";
import PlanSelectButton from "../PlanSelectButton";
import DeviceGlyph from "../DeviceGylph";

export default function ProductCardTablet({
  product,
  isDevice,
  isSelected,
  quantity,
  selectedVariantId,
  currentPrice,
  originalPrice,
  hasDiscount,
  savingsPercent,
  mainImage,
  handlers
}: ProductCardSharedProps) {
  const variants =
    isDevice && "variants" in product
      ? ((product as SecurityDevice).variants ?? [])
      : [];

  return (
    <article
      className={clsx(
        "rounded-xl border bg-white p-3 transition-all",
        isSelected
          ? "border-[#8caaf8] ring-1 ring-[#b9c9fa]"
          : "border-slate-200",
      )}
    >
      {hasDiscount && (
        <div className="mb-2 inline-flex rounded-full bg-violet-600 px-2 py-1 text-[10px] font-semibold text-white">
          Save {savingsPercent}%
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-[#F3F7FF]">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-16 object-contain"
            />
          ) : (
            <DeviceGlyph className="h-7 w-7 text-slate-400" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="line-clamp-1 text-sm font-semibold text-slate-900">
            {product.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
            {product.description}
          </p>

          <button
            className="mt-1 w-fit text-xs font-semibold text-violet-700 underline"
            type="button"
          >
            Learn more
          </button>
        </div>
      </div>

      {isDevice && variants.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => {
                if (quantity <= 0) handlers.addDevice(product.id);
                handlers.selectDeviceVariant(product.id, variant.id);
              }}
              className={clsx(
                "flex h-7 items-center gap-1 rounded border px-2 text-[11px]",
                selectedVariantId === variant.id
                  ? "border-emerald-300"
                  : "border-slate-200",
              )}
            >
              <img
                src={variant.image}
                alt=""
                className="h-4 w-4 object-contain"
              />
              {variant.title}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        {isDevice ? (
          <QuantityControl
            quantity={quantity}
            onIncrement={() => {
              if (quantity <= 0) {
                handlers.addDevice(product.id);
              } else {
                handlers.incrementQuantity(product.id);
              }
            }}
            onDecrement={() => handlers.decrementQuantity(product.id)}
          />
        ) : (
          <PlanSelectButton
            selected={isSelected}
            onSelect={() => handlers.selectPlan(product.id)}
          />
        )}

        <ProductPrice
          currentPrice={currentPrice}
          originalPrice={originalPrice}
          isDevice={isDevice}
          hasDiscount={hasDiscount}
        />
      </div>
    </article>
  );
}
