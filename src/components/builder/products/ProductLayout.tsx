import type { SecurityDevice, SubscriptionPlan } from "@/types";

import ProductCard from "./productCard/ProductCard";

interface ProductLayoutProps {
  products: Array<SecurityDevice | SubscriptionPlan>;
}

export default function ProductLayout({ products }: ProductLayoutProps) {
  return (
    <div className="product-grid auto-rows-fr">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
