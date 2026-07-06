import clsx from "clsx";

import type { BuilderStep as BuilderStepType } from "@/config/builder";

import BuilderStepContent from "./BuilderStepContent";
import BuilderStepHeader from "./BuilderStepHeader";

interface BuilderStepProps {
  step: BuilderStepType;
  expanded: boolean;
  onToggle: () => void;
}

export default function BuilderStep({
  step,
  expanded,
  onToggle,
}: BuilderStepProps) {
  return (
    <>
      <BuilderStepHeader step={step} expanded={expanded} onToggle={onToggle} />

      <div
        id={`builder-step-${step.id}`}
        className={clsx(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <BuilderStepContent step={step} />
        </div>
      </div>
    </>
  );
}
