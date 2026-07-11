import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [builder, review] = children as ReactNode[];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <div className="mx-auto w-full max-w-[1120px] md:px-5 md:py-7">
        <div className="min-w-0 md:max-lg:grid md:max-lg:grid-cols-[minmax(0,1fr)_280px] md:max-lg:items-start md:max-lg:gap-5">
          <section className="min-w-0 [container-type:inline-size]">
            {builder}
          </section>

          <aside className="mt-6 min-w-0 shrink-0 rounded-xl md:max-lg:sticky md:max-lg:top-5 md:max-lg:mt-0">
            {review}
          </aside>
        </div>
      </div>
    </main>
  );
}
