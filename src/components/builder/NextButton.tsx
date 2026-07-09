import { BUILDER_STEPS, LAST_STEP } from "@/config/builder";
import { useBundle } from "@/hooks/useBundle";

export default function NextButton() {
  const { currentStep, nextStep } = useBundle();

  if (currentStep >= LAST_STEP) {
    return null;
  }

  const currentIndex = BUILDER_STEPS.findIndex((s) => s.id === currentStep);
  const next = BUILDER_STEPS[Math.max(0, currentIndex + 1)];

  return (
    <div className="flex justify-center pt-2">
      <button
        type="button"
        onClick={() => {
          nextStep();

          const nextId = next?.id;
          if (!nextId) return;

          requestAnimationFrame(() => {
            document
              .getElementById(`builder-step-header-${nextId}`)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }}
        className="rounded-full border border-violet-300 bg-white px-5 py-2 text-[12px] font-semibold text-violet-700 shadow-sm transition-colors hover:bg-violet-50"
      >
        Next: {next?.title ?? "Next"}
      </button>
    </div>
  );
}
