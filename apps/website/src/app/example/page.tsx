import React from "react";
import { AnalyticsDashboard } from "@clipper-dev/mongolytics-next/dashboards";

export default function Page() {
  return (
    <div className="container py-8 mx-auto min-h-[calc(100vh-10rem-2px)]">
      <AnalyticsDashboard />
    </div>
  );
}
