interface ProductContentProps {
  title: string;
  description: string;
}

export default function ProductContent({
  title,
  description,
}: ProductContentProps) {
  return (
    <div className="product-copy">
      <h3 className="text-[13px] font-semibold leading-5 text-slate-900">
        {title}
      </h3>

      <p className="mt-1.5 line-clamp-2 min-h-9 text-[12px] leading-[18px] text-slate-600">
        {description}
      </p>

      <button
        type="button"
        className="mt-1.5 text-[12px] font-semibold text-violet-700 hover:text-violet-800 underline"
      >
        Learn more
      </button>
    </div>
  );
}
