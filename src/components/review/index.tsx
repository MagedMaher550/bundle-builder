import { useMemo } from "react";

import { useBundle } from "@/hooks/useBundle";

import ReviewBenefits from "./ReviewBenefits";
import ReviewItems from "./ReviewItems";
import ReviewSummary from "./ReviewSummary";
import ReviewTotal from "./ReviewTotal";

import type { ReviewLineItem } from "../../types/review";

export default function ReviewPanel() {
  const {
    selectedDevices,
    selectedPlan,
    total,
    savings,
    clearBundle,
    incrementQuantity,
    decrementQuantity,
  } = useBundle();

  const hasSelections = Boolean(selectedDevices.length || selectedPlan);

  const { deviceLines, planLine } = useMemo(() => {
    const deviceLines: ReviewLineItem[] = selectedDevices.map((d) => {
      const variantImage =
        d.variantId && d.variants?.length
          ? d.variants.find((v) => v.id === d.variantId)?.image
          : undefined;

      return {
        id: d.id,
        title: d.name,
        category: d.category,
        quantity: d.quantity,
        currentPrice: d.pricing.currentPrice,
        originalPrice: d.pricing.originalPrice,
        image: variantImage ?? d.image,
      };
    });

    const planLine = selectedPlan
      ? [
          {
            id: selectedPlan.id,
            title: selectedPlan.name,
            category: "protection" as const,
            quantity: 1,
            currentPrice: selectedPlan.pricing.currentPrice,
            originalPrice: selectedPlan.pricing.originalPrice,
            suffix: "/mo",
          },
        ]
      : [];

    return { deviceLines, planLine };
  }, [selectedDevices, selectedPlan]);

  return (
    <aside className="bg-[#edf5ff] px-2.5 pb-5 pt-4 text-slate-700 md:px-3.5 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(250px,0.85fr)] lg:gap-x-7 lg:px-7 lg:py-6">
      <div className="lg:col-start-1">
        <div className="border-b border-[#cedceb] pb-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.04em] text-slate-500">Review</p>
          <h2 className="mt-1 text-[17px] font-bold leading-5 text-slate-800">Your security system</h2>
          <p className="mt-1 text-[10px] leading-[12px] text-slate-500">Review your personalized protection system designed to keep what matters most safe.</p>
        </div>
        <ReviewItems items={deviceLines} onIncrement={incrementQuantity} onDecrement={decrementQuantity} />
        <ReviewSummary plan={planLine[0]} />
        <ReviewBenefits variant="shipping" />
      </div>
      <div className="border-t border-[#cedceb] lg:col-start-2 lg:row-start-1 lg:border-t-0">
        <ReviewBenefits variant="returns" />
        <ReviewTotal total={total} savings={savings} hasSelections={hasSelections} onClear={clearBundle} />
      </div>
    </aside>
  );
}
