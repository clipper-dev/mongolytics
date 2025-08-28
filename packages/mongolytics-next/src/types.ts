// /src/types.ts

// Data sent from the client-side hook
export interface SessionDataPayload {
  visitorId: string;
  sessionId: string;
  url: string;
  hostname: string;
  pathname: string;
  language: string;
  screenResolution: string;
}

// Full document stored in MongoDB, including server-side data
export interface SessionDocument extends SessionDataPayload {
  _id: string; // Will be the sessionId
  ipAddress?: string;
  userAgent?: string;
  receivedAt: Date;
  lastSeenAt: Date;
  startTimestamp: Date;
  landingPage: string;
  pageviews: number;
  visitedPages: PageStat[];
}

// Define the shape of our aggregated data for type safety
export interface PageStat {
  path: string;
  count: number;
}

export interface AnalyticsData {
  totalSessions: number;
  totalPageviews: number;
  topPages: PageStat[];
}
