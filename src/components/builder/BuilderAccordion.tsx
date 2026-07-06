import { Fragment, useState } from "react";

import { BUILDER_STEPS } from "@/config/builder";

import BuilderStep from "./builderStep";

export default function BuilderAccordion() {
  const [activeStep, setActiveStep] = useState<number>(BUILDER_STEPS[0].id);

  const handleToggle = (stepId: number) => {
    if (stepId === activeStep) return setActiveStep(-1);

    setActiveStep(stepId);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {BUILDER_STEPS.map((step, index) => (
        <Fragment key={step.id}>
          <BuilderStep
            step={step}
            expanded={activeStep === step.id}
            onToggle={() => handleToggle(step.id)}
          />

          {index < BUILDER_STEPS.length - 1 && (
            <div className="border-b border-slate-200" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
