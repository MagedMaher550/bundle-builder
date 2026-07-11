import ReviewItem from "./ReviewItem";
import type { ReviewLineItem } from "../../types/review";

interface ReviewItemsProps {
  items: ReviewLineItem[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const sectionTitles = { camera: "Cameras", sensor: "Sensors", protection: "Accessories" } as const;

export default function ReviewItems({ items, onIncrement, onDecrement }: ReviewItemsProps) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-3.5 text-[13px] leading-5 text-slate-500">
        No items selected yet. Start by choosing a camera.
      </div>
    );
  }

  const groupedItems = (Object.keys(sectionTitles) as ReviewLineItem["category"][])
    .map((category) => ({ category, items: items.filter((item) => item.category === category) }))
    .filter((group) => group.items.length);

  return <div>{groupedItems.map((group) => (
    <section key={group.category} className="border-b border-[#cedceb] py-3.5">
      <h3 className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.01em] text-slate-400">{sectionTitles[group.category]}</h3>
      <div className="space-y-3">{group.items.map((item) => (
        <ReviewItem key={item.id} item={item} onIncrement={() => onIncrement(item.id)} onDecrement={() => onDecrement(item.id)} />
      ))}</div>
    </section>
  ))}</div>;
}
