import { CodeBlock } from "@/components/misc/code-bloc";

// Define all necessary code snippets for the reference
const codeMongolythApp = `// app/layout.tsx
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

const codeMongolythPages = `// pages/_app.tsx
import { Mongolyth } from '@clipper-dev/mongolytics-next/client';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Mongolyth routerType="pages" />
      <Component {...pageProps} />
    </>
  );
}`;

const codeUseMongolytics = `'use client';
import { useMongolytics } from '@clipper-dev/mongolytics-next/client';

function MyCustomComponent() {
  // For App Router (default)
  useMongolytics();

  // For Pages Router
  useMongolytics({ routerType: 'pages' });

  // ... your other component logic
}`;

const codeHandlerApp = `// app/api/mongolytics/route.ts
import { mongolyticsAppRouteHandler as POST } from '@clipper-dev/mongolytics-next/server';

export { POST };`;

const codeHandlerPages = `// pages/api/mongolytics.ts
import { mongolyticsPagesRouterHandler } from '@clipper-dev/mongolytics-next/server';

export default mongolyticsPagesRouterHandler;`;

export default function ApiReferencePage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>
        This page provides a detailed reference for all the public functions,
        components, and hooks exported by the{" "}
        <code>@clipper-dev/mongolytics-next</code> package.
      </p>

      <hr />

      <section>
        <h2>Client API</h2>
        <p>
          These exports are intended for use in client-side code (React
          components) to initiate tracking. They should be imported from{" "}
          <code>@clipper-dev/mongolytics-next/client</code>.
        </p>

        <h3>
          <code>&lt;Mongolyth /&gt;</code>
        </h3>
        <p>
          The <code>&lt;Mongolyth /&gt;</code> component is the simplest and
          recommended way to enable site-wide analytics. It&apos;s a
          &quot;drop-in&quot; client component that renders nothing to the DOM
          but automatically handles page view tracking.
        </p>
        <h4>Props</h4>
        <ul>
          <li>
            <strong>
              <code>routerType</code>
            </strong>
            <ul>
              <li>
                Type: <code>&apos;app&apos; | &apos;pages&apos;</code>
              </li>
              <li>
                Default: <code>&apos;app&apos;</code>
              </li>
              <li>
                Description: Specifies which Next.js router you are using. This
                is required for projects using the legacy Pages Router.
              </li>
            </ul>
          </li>
        </ul>
        <h4>Usage</h4>
        <CodeBlock title="For App Router" code={codeMongolythApp} />
        <CodeBlock title="For Pages Router" code={codeMongolythPages} />

        <h3 className="mt-8">
          <code>useMongolytics()</code>
        </h3>
        <p>
          The <code>useMongolytics()</code> hook is the underlying logic used by
          the <code>&lt;Mongolyth /&gt;</code> component. You can use it
          directly for more advanced use cases, such as integrating analytics
          tracking into custom components or other hooks.
        </p>
        <h4>Parameters</h4>
        <p>
          The hook accepts an optional options object with the following
          property:
        </p>
        <ul>
          <li>
            <strong>
              <code>routerType</code>
            </strong>
            <ul>
              <li>
                Type: <code>&apos;app&apos; | &apos;pages&apos;</code>
              </li>
              <li>
                Default: <code>&apos;app&apos;</code>
              </li>
              <li>
                Description: Same as the prop for the{" "}
                <code>&lt;Mongolyth /&gt;</code> component.
              </li>
            </ul>
          </li>
        </ul>
        <h4>Usage</h4>
        <CodeBlock
          title="In a custom client component"
          code={codeUseMongolytics}
        />
      </section>

      <hr />

      <section>
        <h2>Server API</h2>
        <p>
          These exports are pre-built API handlers for use in your Next.js
          backend to receive tracking data. They should be imported from{" "}
          <code>@clipper-dev/mongolytics-next/server</code>.
        </p>

        <h3>
          <code>mongolyticsAppRouteHandler</code>
        </h3>
        <p>
          This is the API handler designed for the Next.js App Router. It should
          be exported as <code>POST</code> from a <code>route.ts</code> file.
        </p>
        <h4>Usage</h4>
        <CodeBlock
          title="/app/api/mongolytics/route.ts"
          code={codeHandlerApp}
        />

        <h3>
          <code>mongolyticsPagesRouterHandler</code>
        </h3>
        <p>
          This is the API handler designed for the legacy Pages Router. It
          should be the default export from an API file in the{" "}
          <code>pages/api</code> directory.
        </p>
        <h4>Usage</h4>
        <CodeBlock title="/pages/api/mongolytics.ts" code={codeHandlerPages} />
      </section>
    </article>
  );
}
