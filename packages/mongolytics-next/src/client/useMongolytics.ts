// /src/client/useMongolytics.ts
"use client"
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { getOrSetVisitorId, getOrSetSessionId } from "./identifiers";
import { SessionDataPayload } from "../types";

type MongolyticsOptions = {
  routerType?: "app" | "pages";
};

// Hook for App Router (uses useSearchParams, needs Suspense)
export function useMongolytics(options: MongolyticsOptions = {}) {
  const { routerType = "app" } = options;

  const trackPageView = () => {
    if (typeof window === "undefined") return;

    const data: SessionDataPayload = {
      visitorId: getOrSetVisitorId(),
      sessionId: getOrSetSessionId(),
      hostname: window.location.hostname,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      url: window.location.href,
      pathname: window.location.pathname,
    };

    navigator.sendBeacon("/api/mongolytics", JSON.stringify(data));
  };

  // App Router logic
  if (routerType === "app") {
    const pathname = usePathname();
    const searchParams = useSearchParams(); // This needs Suspense!

    useEffect(() => {
      trackPageView();
    }, [pathname, searchParams]);
  }

  // Pages Router logic
  if (routerType === "pages") {
    const router = useRouter();

    useEffect(() => {
      trackPageView();
      router.events.on("routeChangeComplete", trackPageView);

      return () => {
        router.events.off("routeChangeComplete", trackPageView);
      };
    }, [router.events]);
  }
}