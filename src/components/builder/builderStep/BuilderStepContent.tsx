import type { BuilderStep as BuilderStepType } from "@/config/builder";

import ProductList from "../ProductList";

interface BuilderStepContentProps {
  step: BuilderStepType;
}

export default function BuilderStepContent({ step }: BuilderStepContentProps) {
  return (
    <div className="border-t border-slate-200 p-6">
      <ProductList step={step} />
    </div>
  );
}
