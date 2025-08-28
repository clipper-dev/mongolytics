import { CodeBlock } from "@/components/misc/code-bloc";

// Define all necessary code snippets at the top for clarity
const codeStep1 = `npm install @clipper-dev/mongolytics-next`;

const codeStep2 = `# .env.local
MONGOLYTICS_URI="your-mongodb-atlas-connection-string"
MONGOLYTICS_DB_NAME="your-analytics-database-name"`;

const codeStep2a = `# .env.local
MONGOLYTICS_COLLECTION_SESSIONS="mongolytics-sessions"`;

const codeStep3App = `// app/api/mongolytics/dashboard/route.ts
import { mongolyticsDashboardAppRouteHandler as GET } from '@clipper-dev/mongolytics-next/server';
export { GET };`;

const codeStep3Pages = `// pages/api/mongolytics-dashboard.ts
import { mongolyticsDashboardPagesRouterHandler } from '@clipper-dev/mongolytics-next/server';
export default mongolyticsDashboardPagesRouterHandler;`;

const codeStep4App = `// app/dashboard/analytics/page.tsx
import { MongolyticsDashboard } from '@clipper-dev/mongolytics-next/dashboard';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <MongolyticsDashboard />
    </div>
  );
}`;

const codeStep4Pages = `// pages/dashboard/analytics.tsx
import { MongolyticsDashboard } from '@clipper-dev/mongolytics-next/dashboard';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <MongolyticsDashboard routerType="pages" />
    </div>
  );
}`;

const codeStep5Custom = `// lib/analytics.ts
import { getAnalyticsData } from '@clipper-dev/mongolytics-next/server';

export async function fetchDashboardData() {
  const data = await getAnalyticsData();
  return data;
}

// app/dashboard/custom/page.tsx
import { fetchDashboardData } from '@/lib/analytics';

export default async function CustomDashboard() {
  const { totalSessions, totalPageviews, topPages } = await fetchDashboardData();
  
  return (
    <div className="grid gap-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Sessions</div>
          <div className="stat-value">{totalSessions}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">{totalPageviews}</div>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Top Pages</h2>
          <ul className="space-y-2">
            {topPages.map((page) => (
              <li key={page.path} className="flex justify-between">
                <span>{page.path}</span>
                <span className="badge">{page.count} views</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}`;

const codeStep6Protection = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect the analytics dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard/analytics')) {
    const authToken = request.cookies.get('auth-token');
    
    // Replace with your actual authentication logic
    if (!authToken || !isValidToken(authToken.value)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};`;

export default function DashboardPage() {
  return (
    <article className="prose prose-invert max-w-6xl mx-auto pr-6 md:pr-0">
      <h1>Dashboard Setup Guide</h1>
      <p>
        Learn how to set up and customize the Mongolytics analytics dashboard to
        visualize your website traffic data. This guide covers both the
        pre-built dashboard component and custom dashboard implementations.
      </p>

      <hr />

      <h2>Prerequisites</h2>
      <p>
        Before setting up the dashboard, ensure you have completed the basic
        Mongolytics installation. If you haven&apos;t done so yet, follow the{" "}
        <a href="/docs/installation">Installation Guide</a> first.
      </p>

      <h2>Step 1: Verify Package Installation</h2>
      <p>
        Make sure you have the latest version of Mongolytics installed that
        includes dashboard components:
      </p>
      <CodeBlock code={codeStep1} />

      <h2>Step 2: Configure Environment Variables</h2>
      <p>
        The dashboard uses the same environment variables as the tracking
        component. Ensure these are set in your <code>.env.local</code> file:
      </p>
      <CodeBlock title="/.env.local" code={codeStep2} />

      <p>Optional: Customize the collection name if needed:</p>
      <CodeBlock title="/.env.local" code={codeStep2a} />

      <h2>Step 3: Create the Dashboard API Endpoint</h2>
      <p>
        The dashboard needs a dedicated API endpoint to fetch analytics data.
        This endpoint is separate from the tracking endpoint for security and
        performance reasons.
      </p>

      <h3>For App Router (Recommended)</h3>
      <p>
        Create a new file at <code>app/api/mongolytics/dashboard/route.ts</code>
        :
      </p>
      <CodeBlock
        title="/app/api/mongolytics/dashboard/route.ts"
        code={codeStep3App}
      />

      <h3>For Pages Router</h3>
      <p>
        Create a new file at <code>pages/api/mongolytics-dashboard.ts</code>:
      </p>
      <CodeBlock
        title="/pages/api/mongolytics-dashboard.ts"
        code={codeStep3Pages}
      />

      <h2>Step 4: Add the Dashboard Component</h2>
      <p>
        Now you can add the pre-built dashboard component to any page in your
        application. We recommend creating a dedicated analytics page.
      </p>

      <h3>For App Router (Recommended)</h3>
      <p>Create a new page for your analytics dashboard:</p>
      <CodeBlock
        title="/app/dashboard/analytics/page.tsx"
        code={codeStep4App}
      />

      <h3>For Pages Router</h3>
      <p>
        Create a new page and include the <code>routerType</code> prop:
      </p>
      <CodeBlock title="/pages/dashboard/analytics.tsx" code={codeStep4Pages} />

      <hr />

      <h2>Step 5: Customizing the Dashboard (Optional)</h2>
      <p>
        If you want to build a custom dashboard with your own design, you can
        use the <code>getAnalyticsData</code> function directly:
      </p>
      <CodeBlock
        title="Custom Dashboard Implementation"
        code={codeStep5Custom}
      />

      <h2>Step 6: Protecting Your Dashboard (Recommended)</h2>
      <p>
        Since analytics data can be sensitive, we strongly recommend protecting
        your dashboard route with authentication. Here&apos;s an example using
        Next.js middleware:
      </p>
      <CodeBlock title="/middleware.ts" code={codeStep6Protection} />

      <hr />

      <h2>Dashboard Features</h2>
      <p>The pre-built dashboard component includes the following features:</p>
      <ul>
        <li>
          <strong>Total Sessions:</strong> Number of unique visitor sessions
        </li>
        <li>
          <strong>Total Page Views:</strong> Cumulative count of all page visits
        </li>
        <li>
          <strong>Top Pages:</strong> Most visited pages with view counts
        </li>
        <li>
          <strong>Real-time Updates:</strong> Auto-refreshes every 30 seconds
        </li>
        <li>
          <strong>Responsive Design:</strong> Works on all screen sizes
        </li>
        <li>
          <strong>Dark Mode Support:</strong> Automatically adapts to your theme
        </li>
      </ul>

      <h2>Data Structure</h2>
      <p>The dashboard API returns the following data structure:</p>
      <pre className="language-typescript">
        <code>{`interface AnalyticsData {
  totalSessions: number;
  totalPageviews: number;
  topPages: PageStat[];
}

interface PageStat {
  path: string;
  count: number;
}`}</code>
      </pre>

      <h2>Customization Options</h2>
      <p>
        The <code>MongolyticsDashboard</code> component accepts several props
        for customization:
      </p>
      <ul>
        <li>
          <code>refreshInterval</code> - Update frequency in milliseconds
          (default: 30000)
        </li>
        <li>
          <code>showRealtime</code> - Show real-time indicator (default: true)
        </li>
        <li>
          <code>className</code> - Custom CSS classes for styling
        </li>
        <li>
          <code>routerType</code> - Required for Pages Router
          (&quot;pages&quot;)
        </li>
      </ul>

      <hr />

      <h2>Troubleshooting</h2>
      <h3>Dashboard shows no data</h3>
      <p>
        - Ensure tracking is properly set up and data exists in MongoDB
        <br />
        - Check that environment variables are correctly configured
        <br />- Verify the API endpoint is accessible at{" "}
        <code>/api/mongolytics/dashboard</code>
      </p>

      <h3>Authentication issues</h3>
      <p>
        - Ensure your middleware is correctly configured
        <br />
        - Check that authentication cookies/tokens are properly set
        <br />- Verify the dashboard route matches your middleware matcher
      </p>

      <h3>Styling conflicts</h3>
      <p>
        - The dashboard uses Tailwind CSS classes by default
        <br />- Use the <code>className</code> prop to override default styles
        <br />- Consider wrapping in a container with isolated styles if needed
      </p>

      <h2>Next Steps</h2>
      <p>Congratulations! Your analytics dashboard is now set up. You can:</p>
      <ul>
        <li>Customize the dashboard appearance to match your brand</li>
        <li>Add additional metrics and visualizations</li>
        <li>Set up alerts for traffic anomalies</li>
        <li>Export data for further analysis</li>
      </ul>
      <p>
        For more advanced features and API documentation, check out the{" "}
        <a href="/docs/api-reference">API Reference</a>.
      </p>
    </article>
  );
}
