import { BUILDER_STEPS, LAST_STEP } from "@/config/builder";
import { useBundle } from "@/hooks/useBundle";

export default function NextButton() {
  const { currentStep, nextStep } = useBundle();

  if (currentStep >= LAST_STEP) {
    return null;
  }

  const currentIndex = BUILDER_STEPS.findIndex((s) => s.id === currentStep);

  const next = BUILDER_STEPS[Math.max(0, currentIndex + 1)];

  const nextStepHandler = () => {
    nextStep();

    const nextId = next?.id;
    if (!nextId) return;

    setTimeout(() => {
      const el = document.getElementById(`builder-step-header-${nextId}`);

      if (!el) return;

      const targetY = el.getBoundingClientRect().top + window.scrollY - 24;

      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 700;

      let startTime: number | null = null;

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo({
          top: startY + distance * easeInOutCubic(progress),
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, 300);
  };

  return (
    <div className="flex justify-center pt-2">
      <button
        type="button"
        onClick={nextStepHandler}
        className="rounded-full border border-violet-300 bg-white px-5 py-2 text-[12px] font-semibold text-violet-700 shadow-sm transition-colors hover:bg-violet-50"
      >
        Next: {next?.title ?? "Next"}
      </button>
    </div>
  );
}
