import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    // Add the grain-texture class to the main section
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center grain-texture">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
      <div className="container relative z-20">
        
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Effortless Traffic Tracking for Next.js
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
          A free, open-source solution using MongoDB to give you full ownership
          of your websites traffic data.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Link href="#documentation">Get Started Now</Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/your-username/mongolytics"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" /> View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
