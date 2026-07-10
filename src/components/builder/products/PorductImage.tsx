import DeviceGlyph from "./DeviceGylph";

interface ProductImageProps {
  image?: string;
  name: string;
}

export default function ProductImage({ name, image }: ProductImageProps) {
  return (
    <div className="product-image-frame flex items-center justify-center overflow-hidden bg-[#F3F7FF]">
      {image ? (
        <img
          src={image}
          alt={name}
          loading="eager"
          className="product-image max-w-full object-contain drop-shadow-[0_6px_10px_rgba(15,23,42,0.07)]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="flex h-[92px] w-[92px] items-center justify-center rounded-2xl bg-white/70 text-slate-400 shadow-sm">
          <DeviceGlyph className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}
