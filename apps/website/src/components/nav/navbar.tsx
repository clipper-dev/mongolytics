// apps/website/src/app/_components/navbar.tsx
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { Github } from "lucide-react";
import Link from "next/link";
import { GITHUB_URL } from "@/data/config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container grid grid-cols-2 md:grid-cols-3 h-16 items-center justify-between mx-auto">
        <Logo />
        <nav className="hidden items-center justify-center gap-6 md:flex">
          <Link
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="#documentation"
          >
            Docs
          </Link>
        </nav>
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-0.5" /> GitHub
            </a>
          </Button>
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-600 text-white" // Add this line
          >
            <Link href="#documentation">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
