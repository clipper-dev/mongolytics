// apps/website/src/app/not-found.tsx
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground grain-texture">

      <main className="flex-1 flex items-center justify-center text-center">
        <div className="container relative z-10 flex flex-col items-center gap-6">
          <div className="flex items-baseline gap-4">
            <span className="text-8xl font-bold text-rose-500">404</span>
            <h1 className="text-3xl font-semibold tracking-tight">Page Not Found</h1>
          </div>
          <p className="max-w-md text-muted-foreground">
            Sorry, we couldn&apos;t find the page you were looking for. It might have been moved, deleted, or you may have mistyped the URL.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}