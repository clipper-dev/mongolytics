# `mongolytics-next`

[![NPM Version](https://img.shields.io/npm/v/@your-scope/mongolytics-next.svg)](https://www.npmjs.com/package/@your-scope/mongolytics-next)
[![License](https://img.shields.io/npm/l/@your-scope/mongolytics-next.svg)](https://github.com/your-username/mongolytics/blob/main/LICENSE)

A lightweight, self-hosted analytics solution for Next.js applications, supporting both the **App Router** and **Pages Router**. Powered by your own MongoDB database, Mongolytics allows you to take full ownership of your user data.

## Key Features

-   **✅ Supports App & Pages Routers:** Simple setup for both modern and legacy Next.js projects.
-   **✅ Full Data Ownership:** Your analytics data is stored in your own MongoDB instance.
-   **🚀 Easy Integration:** Get started in minutes with a simple API route and a React Hook.
-   **⚡️ Performant & Non-Blocking:** Designed to be invisible. The tracking script uses `navigator.sendBeacon` to ensure it never slows down your user experience.

## Prerequisites

-   A Next.js project (v12+).
-   Access to a MongoDB database and its connection string. A free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is a perfect way to start.

## Installation

```bash
npm install @your-scope/mongolytics-next uuid
npm install -D @types/uuid
```
*(Note: Replace `@your-scope` with your actual NPM scope/username)*

## Setup Guide

Follow the guide for your specific Next.js version.

### 1. Configure Environment Variables (For Both Routers)

Create a `.env.local` file in the root of your Next.js project.

```env
# .env.local

MONGOLYTICS_URI="your-mongodb-atlas-connection-string"
MONGOLYTICS_DB_NAME="your-analytics-database-name"
```

---

### 2. Setup for App Router (Next.js 13+)

This is the default and recommended setup for modern Next.js applications.

#### A. Create the API Endpoint

Create a new file at `app/api/mongolytics/route.ts`. This file will handle the tracking requests.

```typescript
// app/api/mongolytics/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Re-using the same env variables
const uri = process.env.MONGOLYTICS_URI;
const dbName = process.env.MONGOLYTICS_DB_NAME;

// Basic validation
if (!uri || !dbName) {
  throw new Error('Missing Mongolytics environment variables');
}

// Re-use the same MongoDB client across requests
let client: MongoClient;

export async function POST(request: Request) {
  try {
    const sessionData = await request.json();
    
    if (!client) {
      client = new MongoClient(uri!);
      await client.connect();
    }
    const db = client.db(dbName);
    const collection = db.collection('sessions');

    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    await collection.updateOne(
      { _id: sessionData.sessionId },
      {
        $set: {
          lastSeenAt: new Date(),
          currentUrl: sessionData.url,
          userAgent: userAgent,
        },
        $inc: { pageviews: 1 },
        $setOnInsert: {
          _id: sessionData.sessionId,
          visitorId: sessionData.visitorId,
          startTimestamp: new Date(),
          landingPage: sessionData.url,
          hostname: sessionData.hostname,
          language: sessionData.language,
          screenResolution: sessionData.screenResolution,
          ipAddress: ipAddress,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Session tracked' }, { status: 200 });
  } catch (error) {
    console.error('Mongolytics API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
```

#### B. Add the Tracking Hook

The `useMongolytics` hook is a client component. The best place to use it is in your root `layout.tsx` file by wrapping it in a simple client component.

First, create a new client component:
**`components/MongolyticsTracker.tsx`**
```tsx
'use client';

import { useMongolytics } from '@your-scope/mongolytics-next/client';

export function MongolyticsTracker() {
  // This hook will track page views automatically
  useMongolytics();

  return null; // This component renders nothing
}
```

Next, add this component to your root layout:
**`app/layout.tsx`**
```tsx
import { MongolyticsTracker } from '../components/MongolyticsTracker';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MongolyticsTracker />
        {children}
      </body>
    </html>
  )
}
```

---

### 3. Setup for Pages Router (Next.js 12 or legacy projects)

For projects using the `pages` directory.

#### A. Create the API Endpoint

Create a new file at `pages/api/mongolytics.ts`. Our pre-built handler makes this very simple.

```typescript
// pages/api/mongolytics.ts
import { mongolyticsHandler } from '@your-scope/mongolytics-next/server';

export default mongolyticsHandler;
```

#### B. Add the Tracking Hook

Enable site-wide tracking by adding the `useMongolytics` hook to your `pages/_app.tsx` file. **You must specify `routerType: 'pages'`**.

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useMongolytics } from '@your-scope/mongolytics-next/client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Pass the 'pages' option for legacy router support
  useMongolytics({ routerType: 'pages' });

  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## Verification

Deploy your application. You can verify it's working by visiting a few pages and checking your MongoDB database for a new **`sessions`** collection containing user session documents.