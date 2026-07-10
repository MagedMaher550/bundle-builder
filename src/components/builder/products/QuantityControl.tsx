interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <div className="quantity-control inline-flex items-center rounded-full bg-white">
      <button
        type="button"
        className="quantity-button inline-flex items-center justify-center rounded-full text-[14px] font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        onClick={onDecrement}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <div className="quantity-value text-center text-[12px] font-semibold text-slate-900">
        {quantity}
      </div>

      <button
        type="button"
        className="quantity-button inline-flex items-center justify-center rounded-full text-[14px] font-semibold text-slate-600 hover:bg-slate-50"
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
