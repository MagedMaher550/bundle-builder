import { BadgeCheck } from "lucide-react";

import type { ReviewLineItem } from "../../types/review";
import { formatMoney } from "../../utils";

interface ReviewSummaryProps {
  plan?: ReviewLineItem;
}

export default function ReviewSummary({
  plan,
}: ReviewSummaryProps) {
  return (
    <section className="border-b border-[#cedceb] py-3.5 lg:py-5">
      <p className="text-[9px] font-medium uppercase tracking-[0.01em] text-slate-400 lg:text-[11px]">
        Home monitoring plan
      </p>

      <div className="mt-2.5 flex items-center justify-between lg:mt-4">
        <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#4d38d9] lg:gap-2 lg:text-[14px]">
          <BadgeCheck className="h-3.5 w-3.5 lg:h-5 lg:w-5" />

          <span className="truncate">
            {plan?.title ?? "Choose your plan"}
          </span>
        </div>

        <div className="text-right text-[9px] leading-[11px] lg:text-[12px] lg:leading-[16px]">
          {plan?.originalPrice && (
            <div className="text-slate-400 line-through">
              {formatMoney(plan.originalPrice)}
            </div>
          )}

          {plan && (
            <div className="font-bold text-[#4d38d9]">
              {formatMoney(plan.currentPrice)}
              {plan.suffix}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}