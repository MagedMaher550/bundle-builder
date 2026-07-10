import clsx from "clsx";

import ProductContent from "../ProductContent";
import ProductImage from "../PorductImage";
import ProductPrice from "../ProductPrice";
import ProductVariants from "../ProductsVariants";
import QuantityControl from "../QuantityControl";
import PlanSelectButton from "../PlanSelectButton";

import type { SecurityDevice } from "@/types";
import type { ProductCardSharedProps } from "./ProductCard.types";

export default function ProductCardDesktop({
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
  return (
    <article
      className={clsx(
        "product-card group flex h-full min-w-0 flex-col overflow-hidden border bg-white shadow-[0_6px_18px_rgba(15,23,42,0.045)] transition-[border-color,box-shadow,background-color]",
        !isDevice && "subscription-card",
        isSelected
          ? "border-[#8caaf8] bg-[#f8faff] ring-1 ring-[#b9c9fa]"
          : "border-slate-200/70",
        "hover:border-slate-300/70 hover:shadow-[0_5px_16px_rgba(15,23,42,0.055)]",
      )}
    >
      <div className="product-card-body relative flex flex-1 flex-col">
        {hasDiscount && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-violet-600 px-2.5 py-1 text-[11px] font-semibold leading-none text-white shadow-[0_4px_10px_rgba(76,29,149,0.18)]">
            Save {savingsPercent}%
          </span>
        )}

        <ProductImage image={mainImage} name={product.name} />

        <ProductContent
          title={product.name}
          description={product.description}
        />
      </div>

      {isDevice && (
        <ProductVariants
          product={product as SecurityDevice}
          selectedVariantId={selectedVariantId}
          onSelectVariant={(variantId) => {
            if (quantity <= 0) {
              handlers.addDevice(product.id);
            }

            handlers.selectDeviceVariant(product.id, variantId);
          }}
        />
      )}

      <div className="product-card-footer mt-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
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

          <div className="shrink-0 text-right">
            <ProductPrice
              currentPrice={currentPrice}
              originalPrice={originalPrice}
              isDevice={isDevice}
              hasDiscount={hasDiscount}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
