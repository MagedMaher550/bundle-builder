import clsx from "clsx";
import type { BuilderStep as BuilderStepType } from "@/config/builder";
import { useBundle } from "@/hooks/useBundle";

interface BuilderStepHeaderProps {
  step: BuilderStepType;
  expanded: boolean;
  onToggle: () => void;
}

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
        .filter((d) => d.category === step.category)
        .reduce((sum, d) => sum + d.quantity, 0);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={`builder-step-${step.id}`}
      id={`builder-step-header-${step.id}`}
      className={clsx(
        "flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors duration-200",
        expanded ? "bg-[#F6FAFF]" : "hover:bg-slate-50/70",
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-[15px] font-semibold leading-5 text-slate-900">
            {step.title}
          </h2>

          <span
            className={clsx(
              "hidden shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold leading-4",
              "sm:inline-flex",
              expanded
                ? "border-violet-200 bg-violet-50 text-violet-700"
                : "border-slate-200 bg-white text-slate-600",
            )}
          >
            {selectedCount} selected
          </span>
        </div>

        <p className="mt-1 line-clamp-1 text-[12px] leading-4 text-slate-500">
          {step.description}
        </p>
      </div>

      <ChevronDown
        size={18}
        className={clsx(
          "shrink-0 text-slate-400 transition-transform duration-200 ease-out",
          expanded && "rotate-180",
        )}
      />
    </button>
  );
}

function ChevronDown({
  size = 12,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 12 12`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.40682 9.43039C6.20741 9.70956 5.7925 9.70956 5.59309 9.43038L1.56472 3.79062C1.32834 3.45968 1.5649 3 1.97159 3H10.0284C10.4351 3 10.6716 3.45969 10.4353 3.79062L6.40682 9.43039Z"
        fill="currentColor"
      />
    </svg>
  );
}
