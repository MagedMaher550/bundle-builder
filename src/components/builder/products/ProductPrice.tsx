import { formatMoney } from "@/utils";

interface ProductPriceProps {
  currentPrice: number;
  originalPrice?: number;
  isDevice: boolean;
  hasDiscount: boolean;
}

export default function ProductPrice({
  currentPrice,
  originalPrice,
  isDevice,
  hasDiscount,
}: ProductPriceProps) {
  return (
    <div
      className={
        isDevice
          ? "flex flex-col items-end gap-0.5 whitespace-nowrap lg:flex-row lg:items-center lg:gap-1"
          : "flex flex-col items-end gap-0.5 whitespace-nowrap"
      }
    >
      {hasDiscount && originalPrice && (
        <span className="text-[13px] font-normal leading-none tracking-[0.5px] text-[#D8392B] line-through">
          {formatMoney(originalPrice)}
        </span>
      )}

      <span className="text-[13px] font-normal leading-none tracking-[0.5px] text-[#575757]">
        {formatMoney(currentPrice)}
        {!isDevice && "/mo"}
      </span>
    </div>
  );
}
