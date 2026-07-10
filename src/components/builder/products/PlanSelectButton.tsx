import clsx from "clsx";

interface PlanSelectButtonProps {
  selected: boolean;
  onSelect: () => void;
}

export default function PlanSelectButton({
  selected,
  onSelect,
}: PlanSelectButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "inline-flex w-fit items-center justify-center rounded-full px-3.5 py-2 text-[12px] font-semibold leading-none shadow-sm transition-colors",
        selected
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "bg-violet-600 text-white hover:bg-violet-700",
      )}
    >
      {selected ? "Selected" : "Choose"}
    </button>
  );
}
