import catalog from "@/data";
import type { BuilderStep as BuilderStepType } from "@/config/builder";

import NextButton from "../NextButton";
import { ProductLayout } from "../products";

interface BuilderStepContentProps {
  step: BuilderStepType;
}

export default function BuilderStepContent({ step }: BuilderStepContentProps) {
  const products = step.isPlanStep
    ? catalog.plans
    : catalog.devices.filter((device) => device.category === step.category);

  return (
    <div className="border-t border-slate-200/70 bg-[#F6FAFF] px-4 py-4 lg:px-5">
      <div className="space-y-4">
        <ProductLayout products={products} />

        <NextButton />
      </div>
    </div>
  );
}
