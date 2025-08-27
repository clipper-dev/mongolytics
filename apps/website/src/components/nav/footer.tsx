// apps/website/src/app/_components/footer.tsx
import { Logo } from "@/components/brand/logo";
import { GITHUB_URL } from "@/data/links";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-2 md:py-8 sm:flex-row">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ in Szczecin, PL
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="/docs"
          >
            Docs
          </Link>
          <a
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
