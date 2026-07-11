import { Truck } from "lucide-react";

interface ReviewBenefitsProps {
  badgeImage?: string;
  variant: "shipping" | "returns";
  monthlyPayment?: number;
}

export default function ReviewBenefits({
  badgeImage = "/images/satisfaction_badge.png",
  variant,
  monthlyPayment,
}: ReviewBenefitsProps) {
  if (variant === "shipping") {
    return (
      <section className="border-b border-[#cedceb] py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[#18bdb6]">
            <Truck className="h-4 w-4" strokeWidth={1.8} />
          </div>

          <h3 className="flex-1 text-[11px] font-medium text-slate-700">
            Fast Shipping
          </h3>

          <div className="text-right">
            <div className="text-[10px] text-slate-400 line-through">$5.99</div>

            <div className="text-[11px] font-bold text-[#4d38d9]">FREE</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="flex items-start gap-4">
        <img
          src={badgeImage}
          alt="30-day hassle-free returns"
          loading="lazy"
          className="
            h-[56px] w-[56px]
            shrink-0 object-contain

            lg:h-[78px]
            lg:w-[78px]
                          hidden lg:block

          "
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <h3
            className="
              text-[11px]
              font-semibold
              text-slate-700

              lg:text-[18px]
              hidden lg:block

            "
          >
            30-day hassle-free returns
          </h3>

          <p
            className="
              mt-1
              text-[10px]
              leading-4
              text-slate-500

              lg:mt-2
              lg:text-[14px]
              lg:leading-6

              hidden lg:block
            "
          >
            If you're not totally in love with your product, we will refund you
            100%.
          </p>

          {monthlyPayment && (
            <div
              className="
                mt-3
                self-end

                lg:mt-5
              "
            >
              <span
                className="
                  inline-flex
                  rounded-[3px]
                  bg-[#5130D9]
                  px-2
                  py-1
                  text-[9px]
                  font-semibold
                  text-white

                  lg:px-3
                  lg:py-1.5
                  lg:text-[11px]
                  hidden lg:block

                "
              >
                as low as ${monthlyPayment.toFixed(2)}/mo
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
