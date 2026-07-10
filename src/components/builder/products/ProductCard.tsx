import { useMemo } from "react";

import clsx from "clsx";

import { useBundle } from "@/hooks/useBundle";
import type { SecurityDevice, SubscriptionPlan } from "@/types";
import ProductVariants from "./ProductsVariants";
import QuantityControl from "./QuantityControl";
import ProductImage from "./PorductImage";
import ProductContent from "./ProductContent";
import ProductPrice from "./ProductPrice";
import { getPricingInfo } from "@/utils/pricing";
import PlanSelectButton from "./PlanSelectButton";

interface ProductCardProps {
  product: SecurityDevice | SubscriptionPlan;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isDevice = "category" in product;

  const {
    selectedDevices,
    selectedPlan,
    addDevice,
    incrementQuantity,
    decrementQuantity,
    selectDeviceVariant,
    selectPlan,
  } = useBundle();

  const selectedDevice = useMemo(() => {
    if (!isDevice) return undefined;
    return selectedDevices.find((d) => d.id === product.id);
  }, [isDevice, product.id, selectedDevices]);

  const isSelected = isDevice
    ? Boolean(selectedDevice)
    : selectedPlan?.id === product.id;

  const quantity = selectedDevice?.quantity ?? 0;
  const selectedVariantId = selectedDevice?.variantId;

  const selectedVariant = useMemo(() => {
    if (!isDevice) return undefined;
    if (!selectedVariantId) return undefined;
    return product.variants?.find((v) => v.id === selectedVariantId);
  }, [isDevice, product, selectedVariantId]);

  const { currentPrice, originalPrice, hasDiscount, savingsPercent } =
    getPricingInfo(product.pricing);

  const mainImage =
    isDevice && selectedVariant?.image
      ? selectedVariant.image
      : isDevice
        ? product.image
        : undefined;

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
      <div className="product-card-body relative">
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
          product={product}
          selectedVariantId={selectedVariantId}
          onSelectVariant={(variantId) => {
            if (quantity <= 0) addDevice(product.id);
            selectDeviceVariant(product.id, variantId);
          }}
        />
      )}

      <div className="product-card-footer px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {isDevice ? (
            <QuantityControl
              quantity={quantity}
              onIncrement={() => {
                if (quantity <= 0) {
                  addDevice(product.id);
                } else {
                  incrementQuantity(product.id);
                }
              }}
              onDecrement={() => decrementQuantity(product.id)}
            />
          ) : (
            <PlanSelectButton
              selected={isSelected}
              onSelect={() => selectPlan(product.id)}
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
