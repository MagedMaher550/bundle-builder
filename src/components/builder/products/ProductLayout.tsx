import type { SecurityDevice, SubscriptionPlan } from "@/types";

import ProductCard from "./ProductCard";

interface ProductLayoutProps {
  products: Array<SecurityDevice | SubscriptionPlan>;
}

export default function ProductLayout({ products }: ProductLayoutProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
