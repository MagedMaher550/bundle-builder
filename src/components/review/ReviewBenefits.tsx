import { Truck } from "lucide-react";

interface ReviewBenefitsProps {
  badgeImage?: string;
  variant: "shipping" | "returns";
}

export default function ReviewBenefits({
  badgeImage = "/images/satisfaction_badge.png",
  variant,
}: ReviewBenefitsProps) {
  if (variant === "shipping") {
    return (
      <section className="border-b border-[#cedceb] py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-white text-[#18bdb6]">
            <Truck className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <h3 className="min-w-0 flex-1 text-[10px] font-medium leading-[13px] text-slate-700">
            Fast Shipping
          </h3>
          <div className="text-right text-[9px] leading-[11px]">
            <div className="text-slate-400 line-through">$5.99</div>
            <div className="font-bold text-[#4d38d9]">FREE</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-3.5">
      <div className="flex items-center gap-2.5">
        <img src={badgeImage} alt="30-day hassle-free returns" loading="lazy" className="h-[52px] w-[52px] shrink-0 object-contain" />
        <div className="min-w-0 flex-1">
          <h3 className="text-[10px] font-medium leading-[13px] text-slate-700">30-day hassle-free returns</h3>
          <p className="mt-1 text-[9px] leading-[11px] text-slate-500">If you're not totally in love with your product, we will refund you 100%.</p>
        </div>
      </div>
    </section>
  );
}
