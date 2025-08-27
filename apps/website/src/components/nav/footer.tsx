// apps/website/src/app/_components/footer.tsx
import { Logo } from "@/components/brand/logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo className="h-6 w-6" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mongolytics. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="#documentation"
          >
            Docs
          </Link>
          <a
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com/your-username/mongolytics"
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
