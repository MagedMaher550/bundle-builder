import type { SecurityDevice, SubscriptionPlan } from "@/types";

interface ProductCardProps {
  product: SecurityDevice | SubscriptionPlan;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>

      <p className="mt-2 text-sm text-slate-600">{product.description}</p>
    </article>
  );
}
