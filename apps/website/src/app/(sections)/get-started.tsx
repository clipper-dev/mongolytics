// apps/website/src/app/_components/get-started.tsx
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/misc/copy-button";
import Link from "next/link";

// --- Define the updated code snippets for each step ---

const codeStep1 = `npm install @clipper-dev/mongolytics-next`;

const codeStep2 = `# .env.local

MONGOLYTICS_URI="your-mongodb-atlas-connection-string"
MONGOLYTICS_DB_NAME="your-analytics-database-name"`;

const codeStep3 = `// app/api/mongolytics/route.ts
import { mongolyticsAppRouteHandler as POST } from '@clipper-dev/mongolytics-next/server';

export { POST };`;

const codeStep4 = `// app/layout.tsx
import { Mongolyth } from '@clipper-dev/mongolytics-next/client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Mongolyth />
        {children}
      </body>
    </html>
  );
}`;

// --- Reusable component for displaying each step ---

const CodeStep = ({ title, code }: { title: string; code: string }) => (
  <div className="flex flex-col gap-2">
    <p className="text-sm font-semibold text-muted-foreground">{title}</p>
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

// --- The main GetStarted section component ---

export function GetStarted() {
  return (
    <section className="bg-muted/70 py-16 sm:py-24" id="documentation">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Integrate Mongolytics into your Next.js project with a few simple
            steps.
          </p>
        </div>

        {/* Main container for the steps */}
        <div className="mt-12 max-w-4xl mx-auto flex flex-col gap-8">
          <CodeStep title="1. Install the package from NPM." code={codeStep1} />
          <CodeStep
            title="2. Configure your environment variables."
            code={codeStep2}
          />
          <CodeStep title="3. Create the API endpoint." code={codeStep3} />
          <CodeStep
            title="4. Add the tracking component to your root layout."
            code={codeStep4}
          />
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            asChild
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Link href="/docs">View Full Documentation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
