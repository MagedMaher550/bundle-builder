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
  onClear,
}: ReviewTotalProps) {
  return (
    <section className="pt-4 text-center">
      {savings > 0 && (
        <div className="inline-flex rounded-sm bg-[#5130d9] px-2 py-0.5 text-[8px] font-semibold text-white">
          Save {formatMoney(savings)}
        </div>
      )}
      <div className="flex items-end justify-end gap-2">
        <span className="pb-0.5 text-[11px] font-medium text-slate-500">Total</span>
        <span className="text-[21px] font-bold leading-6 text-[#4934d6]">{formatMoney(total)}</span>
      </div>
      {savings > 0 && <p className="mt-1 text-[8px] font-medium leading-3 text-[#18bdb6]">Congrats! You're saving {formatMoney(savings)} on your security bundle!</p>}
      <button type="button" disabled={!hasSelections} className={clsx("mt-2 flex h-[34px] w-full items-center justify-center rounded-[3px] text-[11px] font-bold text-white transition-colors", hasSelections ? "bg-gradient-to-r from-[#5428e4] to-[#4420c9] hover:from-[#4821d2] hover:to-[#3719ad]" : "bg-slate-300")}>Checkout</button>
      <button type="button" onClick={onClear} disabled={!hasSelections} className="mt-1.5 text-[9px] font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700 disabled:opacity-40">Clear selections</button>
    </section>
  );
}
