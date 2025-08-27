# `mongolytics-next`

[![NPM Version](https://img.shields.io/npm/v/@your-scope/mongolytics-next.svg)](https://www.npmjs.com/package/@your-scope/mongolytics-next)
[![License](https://img.shields.io/npm/l/@your-scope/mongolytics-next.svg)](https://github.com/your-username/mongolytics/blob/main/LICENSE)

A lightweight, self-hosted analytics solution for Next.js applications, powered by your own MongoDB database. Take full ownership of your user data with a simple, performant, and easy-to-integrate package.

## Key Features

-   **✅ Self-Hosted & Full Data Ownership:** Your analytics data is stored in your own MongoDB instance (Atlas, self-hosted, etc.), not a third-party service.
-   **🚀 Easy Next.js Integration:** Get started in minutes with a simple API route and a React Hook.
-   **⚡️ Performant & Non-Blocking:** Designed to be invisible. The tracking script runs after page render and uses `navigator.sendBeacon` to ensure it never slows down your user experience or page navigations.
-   **🔒 Privacy-Focused by Design:** Since you own the data, you control the privacy.
-   **💻 TypeScript Native:** Built with TypeScript for a great developer experience.

## Prerequisites

-   A Next.js project (v14+, but should work with older versions too).
-   Access to a MongoDB database and its connection string. A free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is a perfect way to start.

## Installation

```bash
npm install @your-scope/mongolytics-next uuid
npm install -D @types/uuid
```
*(Note: Replace `@your-scope` with your actual NPM scope/username)*

## Setup Guide

Follow these three steps to get Mongolytics running on your site.

### 1. Configure Environment Variables

Create a `.env.local` file in the root of your Next.js project (or add to your existing one). These variables are used by your API route on the server side.

```env
# .env.local

MONGOLYTICS_URI="your-mongodb-atlas-connection-string"
MONGOLYTICS_DB_NAME="your-analytics-database-name"
```

### 2. Create the API Endpoint

This single API endpoint will securely receive tracking data from your application and save it to your database.

Create a new file at `pages/api/mongolytics.ts` and add the following code:

```typescript
// pages/api/mongolytics.ts
import { mongolyticsHandler } from '@your-scope/mongolytics-next/server';

export default mongolyticsHandler;
```

### 3. Add the Tracking Hook to Your App

To enable site-wide tracking, import and use the `useMongolytics` hook in your `pages/_app.tsx` file. This hook will automatically track page views as users navigate your site.

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useMongolytics } from '@your-scope/mongolytics-next/client';

// Your global styles
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Run the hook on every page. It handles everything automatically.
  useMongolytics();

  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## Verification

That's it! Deploy your application.

To verify it's working:
1.  Visit a few pages of your live application.
2.  Open your MongoDB Atlas dashboard (or your database client).
3.  Navigate to the database you specified in `MONGOLYTICS_DB_NAME`.
4.  You should see a new collection named **`sessions`**.
5.  Inside this collection, you will find documents representing each user session. As you navigate the site, the `pageviews` count and `lastSeenAt` timestamp will be updated for your current session.

## The Data Model

Each document in the `sessions` collection represents a single user session and will look similar to this:

```json
{
  "_id": "session_uuid_here",
  "visitorId": "persistent_visitor_uuid_here",
  "startTimestamp": "2023-10-28T12:00:00.000Z",
  "lastSeenAt": "2023-10-28T12:05:30.000Z",
  "pageviews": 5,
  "landingPage": "https://yoursite.com/",
  "currentUrl": "https://yoursite.com/pricing",
  "hostname": "yoursite.com",
  "language": "en-US",
  "screenResolution": "1920x1080",
  "ipAddress": "192.0.2.1",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
}
```

## License

This project is licensed under the MIT License.