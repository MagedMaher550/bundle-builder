import { useMemo } from "react";

import { useBundle } from "@/hooks/useBundle";
import { getPricingInfo } from "@/utils/pricing";

import type { SecurityDevice, SubscriptionPlan } from "@/types";

import ProductCardDesktop from "./ProductCardDesktop";
import ProductCardTablet from "./ProductCardTablet";

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

    return product.variants?.find(
      (variant) => variant.id === selectedVariantId,
    );
  }, [isDevice, product, selectedVariantId]);

  const { currentPrice, originalPrice, hasDiscount, savingsPercent } =
    getPricingInfo(product.pricing);

  const mainImage =
    isDevice && selectedVariant?.image
      ? selectedVariant.image
      : isDevice
        ? product.image
        : undefined;

  const sharedProps = {
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

    handlers: {
      addDevice,
      incrementQuantity,
      decrementQuantity,
      selectDeviceVariant,
      selectPlan,
    },
  };

  return (
    <>
      {/* Desktop + Mobile */}
      <div className="block min-[640px]:hidden min-[1024px]:block">
        <ProductCardDesktop {...sharedProps} />
      </div>

      {/* Tablet */}
      <div className="hidden min-[640px]:block min-[1024px]:hidden">
        <ProductCardTablet {...sharedProps} />
      </div>
    </>
  );
}
