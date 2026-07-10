import catalog from "@/data";
import type { BuilderStep as BuilderStepType } from "@/config/builder";

import { ProductLayout } from "../products";
import NextButton from "../NextButton";

interface BuilderStepContentProps {
  step: BuilderStepType;
}

export default function BuilderStepContent({ step }: BuilderStepContentProps) {
  const products = step.isPlanStep
    ? catalog.plans
    : catalog.devices.filter((device) => device.category === step.category);

  return (
    <div className="builder-step-content bg-[#F6FAFF]">
      <div className="space-y-4">
        <ProductLayout products={products} />
        <NextButton />
      </div>
    </div>
  );
}
