import clsx from "clsx";
import type { BuilderStep as BuilderStepType } from "@/config/builder";

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
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={`builder-step-${step.id}`}
      className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-300 hover:bg-slate-50"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>

        <p className="mt-1 text-sm text-slate-600">{step.description}</p>
      </div>

      <ChevronDown
        size={20}
        className={clsx(
          "shrink-0 text-slate-500 transition-transform duration-300 ease-in-out",
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
