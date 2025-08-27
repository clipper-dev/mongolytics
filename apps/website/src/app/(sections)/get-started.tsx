// apps/website/src/app/_components/get-started.tsx
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/misc/copy-button";
import Link from "next/link";

// Define code snippets as constants for clarity and reuse
const codeStep1 = `npm install @your-scope/mongolytics-next uuid`;
const codeStep2 = `// app/api/mongolytics/route.ts

// The logic for this route can be found in our full documentation.
// It involves creating a MongoDB client and updating session data.`;
const codeStep3 = `'use client';
import { useMongolytics } from '@your-scope/mongolytics-next/client';

export function MongolyticsTracker() {
  useMongolytics();
  return null;
}`;

// A reusable component for each step's code block
const CodeStep = ({ title, code }: { title: string; code: string }) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm text-muted-foreground">{title}</p>
    <div className="relative rounded-lg border bg-card p-4">
      <div className="absolute top-3 right-2">
        <CopyButton textToCopy={code} />
      </div>
      <pre className="text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export function GetStarted() {
  return (
    <section className="bg-muted/40 py-16 sm:py-24" id="documentation">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Integrate Mongolytics into your Next.js project in minutes.
          </p>
        </div>

        {/* Main container for the steps */}
        <div className="mt-12 max-w-4xl mx-auto flex flex-col gap-8">
          <CodeStep
            title="1. Install the package and its dependencies."
            code={codeStep1}
          />
          <CodeStep
            title="2. Create the API Route to handle tracking data."
            code={codeStep2}
          />
          <CodeStep
            title="3. Add the tracker component to your root layout."
            code={codeStep3}
          />
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/docs">Read Full Documentation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
