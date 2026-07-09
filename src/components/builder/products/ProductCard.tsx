import { useMemo } from "react";

import clsx from "clsx";

import { useBundle } from "@/hooks/useBundle";
import type { SecurityDevice, SubscriptionPlan } from "@/types";

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

  const currentPrice = product.pricing.currentPrice;
  const originalPrice = product.pricing.originalPrice;
  const hasDiscount =
    typeof originalPrice === "number" && originalPrice > currentPrice;
  const savingsAmount = hasDiscount ? originalPrice - currentPrice : 0;
  const savingsPercent = hasDiscount
    ? Math.round((savingsAmount / originalPrice) * 100)
    : 0;

  const mainImage =
    isDevice && selectedVariant?.image
      ? selectedVariant.image
      : isDevice
        ? product.image
        : undefined;

  return (
    <article
      className={clsx(
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-white shadow-[0_3px_12px_rgba(15,23,42,0.045)] transition-[border-color,box-shadow,background-color]",
        isSelected
          ? "border-[#8caaf8] bg-[#f8faff] ring-1 ring-[#b9c9fa]"
          : "border-slate-200/70",
        "hover:border-slate-300/70 hover:shadow-[0_5px_16px_rgba(15,23,42,0.055)]",
      )}
    >
      <div className="relative p-3 md:p-3.5">
        {hasDiscount && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-violet-600 px-2.5 py-1 text-[11px] font-semibold leading-none text-white shadow-[0_4px_10px_rgba(76,29,149,0.18)]">
            Save {savingsPercent}%
          </span>
        )}

        <div className="mt-2 flex h-[100px] items-center justify-center overflow-hidden rounded-lg bg-[#F3F7FF]">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              loading="lazy"
              className="h-[88px] max-w-full object-contain drop-shadow-[0_6px_10px_rgba(15,23,42,0.07)]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-[92px] w-[92px] items-center justify-center rounded-2xl bg-white/70 text-slate-400 shadow-sm">
              <DeviceGlyph className="h-8 w-8" />
            </div>
          )}
        </div>

        <div className="mt-3">
          <h3 className="text-[13px] font-semibold leading-5 text-slate-900">
            {product.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-9 text-[12px] leading-[18px] text-slate-600">
            {product.description}
          </p>

          <button
            type="button"
            className="mt-1.5 text-[12px] font-semibold text-violet-700 hover:text-violet-800"
          >
            Learn more
          </button>
        </div>
      </div>

      <div className="mt-auto border-t border-slate-200/70 p-3 md:p-3.5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <div className="text-[13px] font-semibold leading-5 text-slate-900">
                {formatMoney(currentPrice)}
                {isDevice ? "" : "/mo"}
              </div>
              {hasDiscount && (
                <div className="text-[12px] font-medium leading-4 text-slate-400 line-through">
                  {formatMoney(originalPrice)}
                </div>
              )}
            </div>
            <div className="mt-1 text-[11px] leading-4 text-slate-500">
              {isDevice ? "One-time purchase" : "Subscription"}
            </div>
            {hasDiscount && (
              <div className="mt-1 text-[11px] font-semibold leading-4 text-emerald-700">
                You save {formatMoney(savingsAmount)}
              </div>
            )}
          </div>

          {!isDevice && (
            <button
              type="button"
              onClick={() => selectPlan(product.id)}
              className={clsx(
                "inline-flex shrink-0 items-center justify-center rounded-full px-3.5 py-2 text-[12px] font-semibold leading-none shadow-sm transition-colors",
                isSelected
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-violet-600 text-white hover:bg-violet-700",
              )}
              aria-pressed={isSelected}
            >
              {isSelected ? "Selected" : "Choose plan"}
            </button>
          )}
        </div>

        {isDevice && (
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-1 py-1 shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[14px] font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                onClick={() => decrementQuantity(product.id)}
                disabled={quantity <= 0}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <div className="min-w-8 text-center text-[12px] font-semibold text-slate-900">
                {quantity}
              </div>
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[14px] font-semibold text-slate-600 hover:bg-slate-50"
                onClick={() => {
                  if (quantity <= 0) addDevice(product.id);
                  else incrementQuantity(product.id);
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {product.variants?.length ? (
              <div className="flex min-w-0 items-center justify-end gap-2">
                {product.variants.map((variant) => {
                  const active = selectedVariantId
                    ? selectedVariantId === variant.id
                    : variant.id === product.variants?.[0]?.id;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => {
                        if (quantity <= 0) addDevice(product.id);
                        selectDeviceVariant(product.id, variant.id);
                      }}
                      className={clsx(
                        "relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-colors",
                        active
                          ? "border-violet-300 ring-2 ring-violet-200"
                          : "border-slate-200 hover:border-slate-300",
                      )}
                      aria-pressed={active}
                      aria-label={`Select variant ${variant.title}`}
                      title={variant.title}
                    >
                      <img
                        src={variant.image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function DeviceGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7.5 6.75A2.25 2.25 0 0 1 9.75 4.5h4.5A2.25 2.25 0 0 1 16.5 6.75v10.5A2.25 2.25 0 0 1 14.25 19.5h-4.5A2.25 2.25 0 0 1 7.5 17.25V6.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 8.25h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 15.75h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 12h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
