import { useMemo } from "react";

import clsx from "clsx";

import { useBundle } from "@/hooks/useBundle";

type ReviewLineItem = {
  id: string;
  title: string;
  subtitle: string;
  quantity: number;
  amount: number;
  suffix?: string;
  image?: string;
};

export default function ReviewPanel() {
  const {
    selectedDevices,
    selectedPlan,
    subtotal,
    savings,
    total,
    totalItems,
    clearBundle,
  } = useBundle();

  const hasSelections = Boolean(selectedDevices.length || selectedPlan);

  const lineItems = useMemo(() => {
    const deviceLines: ReviewLineItem[] = selectedDevices.map((d) => {
      const variantImage =
        d.variantId && d.variants?.length
          ? d.variants.find((v) => v.id === d.variantId)?.image
          : undefined;

      return {
        id: d.id,
        title: d.name,
        subtitle: d.variantId ? "Variant selected" : "Device",
        quantity: d.quantity,
        amount: d.pricing.currentPrice * d.quantity,
        image: variantImage ?? d.image,
      };
    });

    const planLine: ReviewLineItem[] = selectedPlan
      ? [
          {
            id: selectedPlan.id,
            title: selectedPlan.name,
            subtitle: "Subscription",
            quantity: 1,
            amount: selectedPlan.pricing.currentPrice,
            suffix: "/mo",
          },
        ]
      : [];

    return [...deviceLines, ...planLine];
  }, [selectedDevices, selectedPlan]);

  return (
    <>
      {/* Desktop/Laptop/Tablet full review (until true mobile) */}
      <div className="hidden md:block">
        <aside className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
          <div className="p-5">
            <h2 className="text-[14px] font-semibold leading-5 text-slate-900">
              Your security system
            </h2>
            <p className="mt-1 text-[12px] leading-4 text-slate-500">
              Review your selections before checkout.
            </p>
          </div>

          <div className="border-t border-slate-200/70 bg-[#F6FAFF] p-5">
            <div className="rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <img
                  src="/images/satisfaction_badge.png"
                  alt="30-day hassle-free returns"
                  className="h-12 w-auto"
                  loading="lazy"
                />

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                  <BadgeCheck className="h-4 w-4 text-violet-600" />
                  Warranty included
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-[12px] font-semibold text-slate-900">
                  Items
                </div>
                <div className="text-[12px] font-semibold text-slate-900">
                  {totalItems}
                </div>
              </div>

              <div className="mt-3 space-y-3">
                {lineItems.length ? (
                  lineItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="flex min-w-0 items-start gap-2">
                        {item.image ? (
                          <div className="mt-0.5 h-8 w-8 overflow-hidden rounded-lg bg-[#F3F7FF] shadow-sm">
                            <img
                              src={item.image}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3F7FF] text-slate-400 shadow-sm">
                            <DeviceGlyph className="h-4 w-4" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="truncate text-[12px] font-semibold leading-4 text-slate-900">
                            {item.title}
                          </div>
                          <div className="mt-1 text-[11px] leading-4 text-slate-500">
                            {item.subtitle} · Qty {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 text-[12px] font-semibold leading-4 text-slate-900">
                        {formatMoney(item.amount)}
                        {item.suffix ?? null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-3 text-[12px] leading-5 text-slate-500">
                    No items selected yet. Start by choosing a camera.
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-slate-200/70 pt-4">
                <div className="flex items-center justify-between text-[12px] leading-4 text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatMoney(subtotal)}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[12px] leading-4 text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    Savings
                  </span>
                  <span
                    className={clsx(
                      "font-semibold",
                      savings > 0 ? "text-emerald-700" : "text-slate-900",
                    )}
                  >
                    −{formatMoney(savings)}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[12px] leading-4 text-slate-600">
                  <span>Free shipping</span>
                  <span className="font-semibold text-slate-900">FREE</span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-[11px] leading-4 text-slate-500">
                      Total
                    </div>
                    <div className="text-[18px] font-semibold leading-6 text-slate-900">
                      {formatMoney(total)}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={clsx(
                      "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[12px] font-semibold text-white shadow-[0_6px_18px_rgba(76,29,149,0.18)] transition-colors",
                      hasSelections
                        ? "bg-violet-600 hover:bg-violet-700"
                        : "bg-slate-300",
                    )}
                    disabled={!hasSelections}
                  >
                    Checkout
                  </button>
                </div>

                <button
                  type="button"
                  onClick={clearBundle}
                  className="mt-3 text-[11px] font-semibold text-slate-500 hover:text-slate-700"
                >
                  Clear selections
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile: compact sticky checkout summary only */}
      <div className="md:hidden">
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
          <div className="pointer-events-auto overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
            <div className="flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] leading-4 text-slate-500">
                  Your security system
                </div>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <div className="text-[16px] font-semibold leading-5 text-slate-900">
                    {formatMoney(total)}
                  </div>
                  <div className="text-[11px] leading-4 text-slate-500">
                    {totalItems} items
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={clsx(
                  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[12px] font-semibold text-white transition-colors",
                  hasSelections
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-slate-300",
                )}
                disabled={!hasSelections}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Spacer so content doesn't hide behind sticky bar */}
        <div className="h-24" />
      </div>
    </>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function BadgeCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.5 15 5.2 18.8 5l.7 3.8L22 12l-2.5 3.2-.7 3.8-3.8-.2L12 21.5 9 18.8 5.2 19l-.7-3.8L2 12l2.5-3.2L5.2 5l3.8.2L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.7 12 2 2 4.6-5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
