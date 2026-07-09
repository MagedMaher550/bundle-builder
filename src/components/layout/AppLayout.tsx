import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [builder, review] = children as ReactNode[];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef5ff]">
      <div className="mx-auto w-full max-w-[1440px] px-3 py-4 sm:px-4 md:px-5 md:py-6 xl:px-7 xl:py-7">
        <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:gap-5 xl:gap-7">
          <section className="min-w-0 flex-1 [container-type:inline-size]">
            {builder}
          </section>

          <aside className="w-full min-w-0 shrink-0 md:sticky md:top-6 md:w-[280px] lg:w-[320px] xl:top-7 xl:w-[360px]">
            {review}
          </aside>
        </div>
      </div>
    </main>
  );
}
