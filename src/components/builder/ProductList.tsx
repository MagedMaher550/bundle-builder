import catalog from "@/data";
import type { BuilderStep } from "@/config/builder";
import ProductCard from "./ProductCard";

interface ProductListProps {
  step: BuilderStep;
}

export default function ProductList({ step }: ProductListProps) {
  if (step.isPlanStep) {
    return (
      <div className="space-y-4">
        {catalog.plans.map((plan) => (
          <ProductCard key={plan.id} product={plan} />
        ))}
      </div>
    );
  }

  const devices = catalog.devices.filter(
    (device) => device.category === step.category,
  );

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <ProductCard key={device.id} product={device} />
      ))}
    </div>
  );
}
