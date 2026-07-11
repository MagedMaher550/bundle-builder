import clsx from "clsx";
import type { BuilderStep as BuilderStepType } from "@/config/builder";
import { useBundle } from "@/hooks/useBundle";
import { Camera, ClipboardList, Cpu, Shield } from "lucide-react";
import ChevronDown from "@/assets/icons/ChevronDown";
import StepSeparator from "./StepSeparator";

interface BuilderStepHeaderProps {
  step: BuilderStepType;
  expanded: boolean;
  onToggle: () => void;
}

const TOTAL_STEPS = 4;

export default function BuilderStepHeader({
  step,
  expanded,
  onToggle,
}: BuilderStepHeaderProps) {
  const { selectedDevices, selectedPlan } = useBundle();

  const selectedCount = step.isPlanStep
    ? selectedPlan
      ? 1
      : 0
    : selectedDevices
        .filter((device) => device.category === step.category)
        .reduce((sum, device) => sum + device.quantity, 0);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={`builder-step-${step.id}`}
      id={`builder-step-header-${step.id}`}
      className={clsx(
        "w-full px-7 py-4 text-left transition-colors duration-200",
        expanded ? "bg-[#F8FBFF]" : "hover:bg-slate-50",
      )}
    >
      {/* Step counter */}
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
        STEP {step.id} OF {TOTAL_STEPS}
      </div>

      {/* Divider */}
      <StepSeparator marginTop={5} marginBottom={21} />

      {/* Header */}
      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <StepIcon stepId={step.id} />

            <h2 className="truncate text-[17px] font-semibold leading-none text-slate-900">
              {step.title}
            </h2>
            <StepSeparator />
            
          </div>
        </div>
        

        <div className="mt-0.5 flex shrink-0 items-center gap-2.5">
          {selectedCount > 0 && (
            <span className="inline-flex h-5 items-center px-2 text-[11px] font-semibold leading-none text-violet-700">
              {selectedCount} selected
            </span>
          )}

          <ChevronDown
            className={clsx(
              "text-slate-400 transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </div>
        
      </div>
      <StepSeparator marginTop={21} />
    </button>
  );
}

function StepIcon({ stepId }: { stepId: number }) {
  const props = {
    size: 15,
    strokeWidth: 1.8,
    className: "shrink-0 text-slate-500",
  };

  switch (stepId) {
    case 1:
      return <Camera {...props} />;

    case 2:
      return <ClipboardList {...props} />;

    case 3:
      return <Cpu {...props} />;

    default:
      return <Shield {...props} />;
  }
}
