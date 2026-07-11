import clsx from "clsx";

import { formatMoney } from "../../utils";

interface ReviewTotalProps {
  total: number;
  savings: number;
  hasSelections: boolean;
  onClear: () => void;
}

export default function ReviewTotal({
  total,
  savings,
  hasSelections,
}: ReviewTotalProps) {
  const monthlyPayment = (total / 12).toFixed(2);

  return (
    <section className="pt-4">
      {/* Desktop */}
      <div className="hidden lg:flex w-full">
        <div className="flex w-full items-end justify-between">
          <div className="mb-2 rounded-[3px] bg-[#5130D9] px-3 py-1 text-[10px] font-semibold text-white">
            as low as ${monthlyPayment}/mo
          </div>

          <div>
            <span className="text-[20px] font-bold leading-none text-[#6F7882] mr-2 line-through">
              {formatMoney(total + savings)}
            </span>
            <span className="text-[24px] font-bold leading-none text-[#4934D6]">
              {formatMoney(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet */}
{/* Mobile & Tablet */}
<div className="flex items-start justify-between lg:hidden">
  <img
    src="/images/satisfaction_badge.png"
    alt="30-day hassle-free returns"
    className="h-[58px] w-[58px] shrink-0 object-contain"
  />

  <div className="flex flex-col items-end gap-2">
    <div className="rounded-[3px] bg-[#5130D9] px-2.5 py-1 text-[8px] font-semibold text-white">
      as low as ${monthlyPayment}/mo
    </div>

    <div className="flex items-end gap-2">
      <span className="text-[16px] font-semibold leading-none text-[#7C8592] line-through">
        {formatMoney(total + savings)}
      </span>

      <span className="text-[22px] font-bold leading-none text-[#4934D6]">
        {formatMoney(total)}
      </span>
    </div>
  </div>
</div>

      {savings > 0 && (
        <p className="mt-2 text-center text-[10px] font-medium leading-4 text-[#18BDB6]">
          Congrats! You're saving {formatMoney(savings)} on your security
          bundle!
        </p>
      )}

      <button
        type="button"
        disabled={!hasSelections}
        className={clsx(
          "mt-3 flex h-[42px] w-full items-center justify-center rounded-[4px] text-[13px] font-bold text-white transition-colors",
          hasSelections
            ? "bg-gradient-to-r from-[#5428E4] to-[#4420C9] hover:from-[#4821D2] hover:to-[#3719AD]"
            : "bg-slate-300",
        )}
      >
        Checkout
      </button>

      <button
        type="button"
        disabled={!hasSelections}
        className="mt-2 w-full text-center text-[10px] font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700 disabled:opacity-40"
      >
        Save my selections for later
      </button>
    </section>
  );
}
