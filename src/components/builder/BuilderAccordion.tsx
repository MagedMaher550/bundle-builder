import { BUILDER_STEPS } from "@/config/builder";
import { useBundle } from "@/hooks/useBundle";

import BuilderStep from "./builderStep";

export default function BuilderAccordion() {
  const { currentStep, setCurrentStep } = useBundle();

  const onToggleHandler = (stepId: number) => {
    setCurrentStep(currentStep === stepId ? -1 : stepId);
  };

  return (
    <div className="builder-accordion overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_26px_rgba(15,23,42,0.045)]">
      {BUILDER_STEPS.map((step) => (
        <BuilderStep
          key={step.id}
          step={step}
          expanded={true}
          // expanded={currentStep === step.id}
          onToggle={() => onToggleHandler(step.id)}
        />
      ))}
    </div>
  );
}
