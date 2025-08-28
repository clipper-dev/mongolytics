"use client"
// /src/client/useMongolytics.ts (Optimized Version)
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { getOrSetVisitorId, getOrSetSessionId } from "./identifiers";
import { SessionDataPayload } from "../types";

// Define the options for the hook
type MongolyticsOptions = {
  routerType?: "app" | "pages";
};

export function useMongolytics(options: MongolyticsOptions = {}) {
  // Default to 'app' router if not specified
  const { routerType = "app" } = options;

  // This function is universal and can be shared
  const trackPageView = () => {
    // Ensure this only runs on the client
    if (typeof window === "undefined") return;

    const data: SessionDataPayload = {
      
      visitorId: getOrSetVisitorId(),
      sessionId: getOrSetSessionId(),
      hostname: window.location.hostname,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      url: window.location.href,
      pathname: window.location.pathname,
    } as SessionDataPayload;

    // Use sendBeacon for reliable, non-blocking tracking
    navigator.sendBeacon("/api/mongolytics", JSON.stringify(data));
  };

  // --- Logic for App Router (Default) ---
  if (routerType === "app") {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
      // This effect hook will run on initial load and every time the URL changes
      trackPageView();
    }, [pathname, searchParams]);
  }

  // --- Logic for Pages Router (Legacy) ---
  if (routerType === "pages") {
    const router = useRouter();

    useEffect(() => {
      // Track the initial page load
      trackPageView();

      // Track subsequent page changes
      router.events.on("routeChangeComplete", trackPageView);

      // Clean up the event listener on component unmount
      return () => {
        router.events.off("routeChangeComplete", trackPageView);
      };
    }, [router.events]);
  }
}
