// apps/website/src/app/page.tsx

import LogoBig from "@/components/brand/logo-big";
import { GetStarted } from "./(sections)/get-started";
import { Hero } from "./(sections)/hero";
import { WhySection } from "./(sections)/why-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <main className="flex-1">
        <Hero />
        <LogoBig />
        <WhySection />
        <GetStarted />
      </main>
    </div>
  );
}