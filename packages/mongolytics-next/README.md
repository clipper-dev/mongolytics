# `mongolytics-next`

[![NPM Version](https://img.shields.io/npm/v/@clipper-dev/mongolytics-next.svg)](https://www.npmjs.com/package/@clipper-dev/mongolytics-next)
[![License](https://img.shields.io/npm/l/@clipper-dev/mongolytics-next.svg)](https://github.com/your-username/mongolytics/blob/main/LICENSE)

A lightweight, self-hosted analytics solution for Next.js applications, supporting both the **App Router** and **Pages Router**. Powered by your own MongoDB database, Mongolytics allows you to take full ownership of your user data.

## Key Features

-   **✅ Universal Next.js Support:** Simple, consistent setup for both App and Pages Routers.
-   **✅ Full Data Ownership:** Your analytics data is stored in your own MongoDB instance.
-   **🚀 Drop-in Component:** Get started in minutes with a simple API handler and a single React component.
-   **⚡️ Performant & Non-Blocking:** Designed to be invisible. The tracking script uses `navigator.sendBeacon` to ensure it never slows down your user experience.

## Prerequisites

-   A Next.js project (v12+).
-   Access to a MongoDB database and its connection string. A free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is a perfect way to start.

## Installation

```bash
npm install @clipper-dev/mongolytics-next uuid
npm install -D @types/uuid
```

## Setup Guide

Getting started is a simple three-step process.

### Step 1: Configure Environment Variables

Create a `.env.local` file in the root of your Next.js project. This tells Mongolytics how to connect to your database.

```env
# .env.local

MONGOLYTICS_URI="your-mongodb-atlas-connection-string"
MONGOLYTICS_DB_NAME="your-analytics-database-name"
```

---

### Step 2: Create the API Endpoint

This single API endpoint securely receives tracking data. **Choose the setup for your router type.**

#### For App Router (Next.js 13+)

Create a new file at `app/api/mongolytics/route.ts` and export our pre-built handler.

```typescript
// app/api/mongolytics/route.ts
import { mongolyticsAppRouteHandler as POST } from '@clipper-dev/mongolytics-next/server';

export { POST };
```

#### For Pages Router (Legacy)

Create a new file at `pages/api/mongolytics.ts`.

```typescript
// pages/api/mongolytics.ts
import { mongolyticsPagesRouterHandler } from '@clipper-dev/mongolytics-next/server';

export default mongolyticsPagesRouterHandler;
```

---

### Step 3: Add the Tracking Component

Add the `<Mongolyth />` component to your root layout file. It automatically detects page changes and sends tracking events.

#### For App Router (Next.js 13+)

Add the component to `app/layout.tsx`.

```tsx
// app/layout.tsx
import { Mongolyth } from '@clipper-dev/mongolytics-next/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Mongolyth />
        {children}
      </body>
    </html>
  );
}
```

#### For Pages Router (Legacy)

Add the component to `pages/_app.tsx` and specify the `routerType`.

```tsx
// pages/_app.tsx
import { Mongolyth } from '@clipper-dev/mongolytics-next/client';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Mongolyth routerType="pages" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

---

## Advanced Usage: The `useMongolytics` Hook

For more complex use cases where you might need to integrate analytics tracking with other logic, you can use the underlying `useMongolytics` hook directly instead of the `<Mongolyth />` component.

```tsx
'use client';

import { useMongolytics } from '@clipper-dev/mongolytics-next/client';

function MyCustomComponent() {
  // For App Router (default)
  useMongolytics();

  // For Pages Router
  useMongolytics({ routerType: 'pages' });

  // ... your other component logic
  return <div>...</div>
}
```

## Verification

Deploy your application. You can verify it's working by visiting a few pages and checking your MongoDB database for a new **`sessions`** collection containing user session documents.