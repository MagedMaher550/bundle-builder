import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [builder, review] = children as ReactNode[];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 lg:flex-row lg:items-start">
        <section className="min-w-0 flex-1">{builder}</section>

        <aside className="w-full lg:sticky lg:top-8 lg:w-[360px] xl:w-[400px]">
          {review}
        </aside>
      </div>
    </main>
  );
}
