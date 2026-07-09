// import catalog from "@/data";
// import type { BuilderStep } from "@/config/builder";

// import ProductGrid from "./ProductLayout";

// interface ProductListProps {
//   step: BuilderStep;
// }

// export default function ProductList({ step }: ProductListProps) {
//   if (step.isPlanStep) {
//     return <ProductGrid products={catalog.plans} />;
//   }

//   const devices = catalog.devices.filter(
//     (device) => device.category === step.category,
//   );

//   return <ProductGrid products={devices} />;
// }


export { default as ProductLayout } from "./ProductLayout";
export { default as ProductCard } from "./ProductCard";