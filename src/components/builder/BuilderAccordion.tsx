import { Fragment } from "react";

import { BUILDER_STEPS } from "@/config/builder";
import { useBundle } from "@/hooks/useBundle";

import BuilderStep from "./builderStep";

export default function BuilderAccordion() {
  const { currentStep, setCurrentStep } = useBundle();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
      {BUILDER_STEPS.map((step, index) => (
        <Fragment key={step.id}>
          <BuilderStep
            step={step}
            expanded={currentStep === step.id}
            onToggle={() => setCurrentStep(step.id)}
          />

          {index < BUILDER_STEPS.length - 1 && (
            <div className="border-b border-slate-200/70" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
