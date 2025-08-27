// apps/website/src/app/error.tsx
"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    // For now, we'll just log it to the console
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground grain-texture text-center">
        <div className="container flex flex-col items-center gap-6">
          <TriangleAlert className="h-16 w-16 text-destructive" />
          <h1 className="text-3xl font-semibold tracking-tight">
            Oops! Something Went Wrong
          </h1>
          <p className="max-w-md text-muted-foreground">
            We&apos;ve encountered an unexpected error. Our team has been
            notified. Please try again or return to the homepage.
          </p>

          {/* Optional: Show error details during development for easier debugging */}
          {process.env.NODE_ENV === "development" && (
            <pre className="mt-4 max-w-full overflow-x-auto rounded-md bg-muted p-4 text-left text-sm">
              <code>{error.message}</code>
            </pre>
          )}

          <div className="mt-4 flex gap-4">
            <Button size="lg" onClick={() => reset()}>
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Go Back Home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
