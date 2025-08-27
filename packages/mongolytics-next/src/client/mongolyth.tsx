"use client";

import { useMongolytics } from "./useMongolytics";

interface MongolythProps {
  routerType?: "app" | "pages";
}
export function Mongolyth({ routerType = "app" }: MongolythProps) {
  // This hook will track page views automatically
  useMongolytics({ routerType });

  return null; // This component renders nothing
}
