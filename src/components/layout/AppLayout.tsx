import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [builder, review] = children as ReactNode[];

  return (
    <main className="app-page min-h-screen overflow-x-hidden bg-[#eef5ff]">
      <div className="app-shell mx-auto w-full">
        <div className="app-layout min-w-0">
          <section className="builder-pane min-w-0 [container-type:inline-size]">
            {builder}
          </section>

          <aside className="review-pane min-w-0 shrink-0">
            {review}
          </aside>
        </div>
      </div>
    </main>
  );
}
