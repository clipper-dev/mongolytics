// apps/website/src/app/docs/layout.tsx
import { MobileSidebar } from "@/components/nav/mobile-sidebar";
import { DocsSidebar } from "./(sidebar)";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-10rem-2px)] flex-row">
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      <DocsSidebar />
      <main className="py-8 px-2 border-none w-full h-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
