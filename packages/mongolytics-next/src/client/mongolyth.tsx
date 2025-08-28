// /src/client/Mongolyth.tsx
"use client";

import { Suspense } from "react";
import { useMongolytics } from "./useMongolytics";

interface MongolythProps {
  routerType?: "app" | "pages";
}

// Inner component that uses the hook
function MongolythInner({ routerType = "app" }: MongolythProps) {
  useMongolytics({ routerType });
  return null;
}

// Main component with Suspense wrapper for App Router
export function Mongolyth({ routerType = "app" }: MongolythProps) {
  // Pages Router doesn't need Suspense
  if (routerType === "pages") {
    return <MongolythInner routerType="pages" />;
  }

  // App Router needs Suspense because useSearchParams is used
  return (
    <Suspense fallback={null}>
      <MongolythInner routerType="app" />
    </Suspense>
  );
}