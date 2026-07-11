import DeviceGlyph from "../../assets/icons/DeviceGylph";
import type { ReviewLineItem } from "../../types/review";
import { formatMoney } from "../../utils";

interface ReviewItemProps {
  item: ReviewLineItem;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ReviewItem({
  item,
  onIncrement,
  onDecrement,
}: ReviewItemProps) {
  const currentAmount = item.currentPrice * item.quantity;
  const originalAmount = item.originalPrice
    ? item.originalPrice * item.quantity
    : undefined;

  return (
    <div className="flex min-h-7 items-center gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        {item.image ? (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-white">
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-contain p-1"
            />
          </div>
        ) : (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] bg-white text-slate-400">
            <DeviceGlyph className="h-4 w-4" />
          </div>
        )}

        <div className="min-w-0 truncate text-[10px] font-medium leading-[13px] text-slate-700">
          {item.title}
        </div>
      </div>

      <div className="inline-flex shrink-0 items-center gap-1 rounded-[3px] bg-white px-1 text-[10px] font-semibold text-slate-500">
        <button
          type="button"
          onClick={onDecrement}
          disabled={item.quantity <= 1 || Boolean(item.suffix)}
          aria-label={`Decrease ${item.title} quantity`}
          className="flex h-4.5 w-4.5 items-center justify-center rounded-sm text-[13px] leading-none hover:bg-slate-100 disabled:opacity-40"
        >
          −
        </button>
        <span className="min-w-2.5 text-center">{item.quantity}</span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={Boolean(item.suffix)}
          aria-label={`Increase ${item.title} quantity`}
          className="flex h-4.5 w-4.5 items-center justify-center rounded-sm text-[13px] leading-none hover:bg-slate-100 disabled:opacity-40"
        >
          +
        </button>
      </div>

      <div className="w-[39px] shrink-0 text-right text-[9px] leading-[11px]">
        {originalAmount && (
          <div className="text-slate-400 line-through">
            {formatMoney(originalAmount)}
          </div>
        )}
        <div className="font-bold text-[#4d38d9]">
          {formatMoney(currentAmount)}
          {item.suffix}
        </div>
      </div>
    </div>
  );
}
