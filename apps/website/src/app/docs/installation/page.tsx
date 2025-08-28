import { CodeBlock } from "@/components/misc/code-bloc";

// Define all necessary code snippets at the top for clarity
const codeStep1 = `npm install @clipper-dev/mongolytics-next`;

const codeStep2 = `# .env.local

MONGOLYTICS_URI="your-mongodb-atlas-connection-string"
MONGOLYTICS_DB_NAME="your-analytics-database-name"`;

const codeStep2a = `# .env.local

MONGOLYTICS_COLLECTION_SESSIONS="mongolytics-sessions"
`;

const codeStep3App = `// app/api/mongolytics/route.ts
import { mongolyticsAppRouteHandler as POST } from '@clipper-dev/mongolytics-next/server';

export { POST };`;

const codeStep3Pages = `// pages/api/mongolytics.ts
import { mongolyticsPagesRouterHandler } from '@clipper-dev/mongolytics-next/server';

export default mongolyticsPagesRouterHandler;`;

const codeStep4App = `// app/layout.tsx
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

const codeStep4Pages = `// pages/_app.tsx
import { Mongolyth } from '@clipper-dev/mongolytics-next/client';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Mongolyth routerType="pages" />
      <Component {...pageProps} />
    </>
  );
}`;

export default function InstallationPage() {
  return (
    <article className="prose prose-invert max-w-6xl mx-auto pr-6 md:pr-0">
      <h1>Installation Guide</h1>
      <p>
        Follow these steps to integrate Mongolytics into your Next.js
        application. The process is designed to be as simple as possible, with
        distinct instructions for the App Router and Pages Router where
        necessary.
      </p>

      <hr />

      <h2>Step 1: Install the Package</h2>
      <p>
        First, install the package from NPM into your project. All required
        internal dependencies like `uuid` will be installed automatically.
      </p>
      <CodeBlock code={codeStep1} />

      <h2>Step 2: Environment Variables</h2>
      <p>
        Next, you need to provide the connection details for your MongoDB
        database. Create a <code>.env.local</code> file in your project root if
        you don&apos;t have one already.
      </p>
      <p>
        You can get your connection string from your MongoDB provider (e.g., a
        free cluster from{" "}
        <a
          href="https://www.mongodb.com/cloud/atlas"
          target="_blank"
          rel="noopener noreferrer"
        >
          MongoDB Atlas
        </a>
        ).
      </p>
      <CodeBlock title="/.env.local" code={codeStep2} />
      <p>
        By default, the package will use the <code>sessions</code> collection.
        This may create a conflict with your own collections. To use a custom
        collection nam, simply define it in the <code>.env.local</code> file.
      </p>
      <CodeBlock title="/.env.local" code={codeStep2a} />
      <h2>Step 3: Create the API Endpoint</h2>
      <p>
        This single API endpoint will securely receive tracking data from your
        application. Choose the setup that matches your Next.js router.
      </p>

      <h3>For App Router (Recommended)</h3>
      <p>
        Create a new file at <code>app/api/mongolytics/route.ts</code> and
        export our pre-built handler.
      </p>
      <CodeBlock title="/app/api/mongolytics/route.ts" code={codeStep3App} />

      <h3>For Pages Router</h3>
      <p>
        Create a new file at <code>pages/api/mongolytics.ts</code> and export
        the pages-specific handler.
      </p>
      <CodeBlock title="/pages/api/mongolytics.ts" code={codeStep3Pages} />

      <h2>Step 4: Add the Tracking Component</h2>
      <p>
        Finally, add the <code>&lt;Mongolyth /&gt;</code> component to your root
        layout. This component is a client-side tracker that automatically
        detects page changes.
      </p>

      <h3>For App Router (Recommended)</h3>
      <p>
        Add the component directly to your <code>app/layout.tsx</code> file.
      </p>
      <CodeBlock title="/app/layout.tsx" code={codeStep4App} />

      <h3>For Pages Router</h3>
      <p>
        Add the component to your <code>pages/_app.tsx</code> file and be sure
        to include the <code>routerType=&quot;pages&quot;</code> prop.
      </p>
      <CodeBlock title="/pages/_app.tsx" code={codeStep4Pages} />

      <hr />

      <h2>Step 5: Verify Your Setup</h2>
      <p>
        That&apos;s it! To verify your installation, run your Next.js
        application, navigate to a few pages, and then check your MongoDB
        database. You should see a new collection named{" "}
        <strong>sessions</strong> containing your website&apos;s traffic data.
      </p>
    </article>
  );
}
