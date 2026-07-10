import type { SecurityDevice, SubscriptionPlan } from "@/types";

import ProductCard from "./ProductCard";

interface ProductLayoutProps {
  products: Array<SecurityDevice | SubscriptionPlan>;
}

export default function ProductLayout({ products }: ProductLayoutProps) {
  return (
    <div
      className="
        flex flex-wrap justify-center gap-4
        lg:grid lg:grid-cols-5
      "
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="
            w-full
            sm:w-[calc(50%-0.5rem)]
            lg:w-auto
          "
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}