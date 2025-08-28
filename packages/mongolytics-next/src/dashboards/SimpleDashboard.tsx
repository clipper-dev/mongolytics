import { AnalyticsData } from "../types";

// Define a separate component for the error state for cleanliness
function DashboardError({ message }: { message: string }) {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        color: "#ffcdd2",
        background: "#4d2323",
        padding: "2rem",
        borderRadius: "8px",
        border: "1px solid #e57373",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          margin: 0,
          color: "#ef9a9a",
        }}
      >
        Dashboard Error
      </h1>
      <p style={{ marginTop: "0.5rem" }}>{message}</p>
      <code
        style={{
          background: "#3e1c1c",
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          display: "inline-block",
          marginTop: "1rem",
        }}
      >
        /app/api/analytics/route.ts
      </code>
    </div>
  );
}

export async function AnalyticsDashboard() {
  let data: AnalyticsData | null = null;
  let errorMessage: string | null = null;

  try {
    // Fetch data from our new API endpoint.
    // `cache: 'no-store'` is crucial for dashboards to ensure fresh data on every request.
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/mongolytics`,
      {
        cache: "no-store",
      }
    );

    // Check if the request was successful
    if (!res.ok) {
      // If the API returns an error status (404, 500, etc.), throw an error to be caught.
      throw new Error(`API responded with status ${res.status}`);
    }

    data = await res.json();
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    // This catch block will run if the API endpoint doesn't exist (404),
    // if there's a server error (500), or a network issue.
    errorMessage =
      "Could not load analytics data. Please ensure the API endpoint is correctly set up and running.";
  }

  // --- Render the error message if something went wrong ---
  if (errorMessage) {
    return <DashboardError message={errorMessage} />;
  }

  // --- Render the dashboard if data was fetched successfully ---
  const { totalSessions, totalPageviews, topPages } = data || {
    totalSessions: 0,
    totalPageviews: 0,
    topPages: [],
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        color: "#eee",
        background: "#222",
        padding: "2rem",
        borderRadius: "8px",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          borderBottom: "1px solid #444",
          paddingBottom: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        Analytics Dashboard
      </h1>

      {/* Top Level Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{ background: "#333", padding: "1rem", borderRadius: "6px" }}
        >
          <h2 style={{ fontSize: "0.9rem", color: "#aaa", margin: 0 }}>
            Total Sessions
          </h2>
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              margin: "0.25rem 0 0 0",
            }}
          >
            {totalSessions}
          </p>
        </div>
        <div
          style={{ background: "#333", padding: "1rem", borderRadius: "6px" }}
        >
          <h2 style={{ fontSize: "0.9rem", color: "#aaa", margin: 0 }}>
            Total Pageviews
          </h2>
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              margin: "0.25rem 0 0 0",
            }}
          >
            {totalPageviews}
          </p>
        </div>
      </div>

      {/* Top Pages Table */}
      <div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Top 10 Visited Pages
        </h2>
        {topPages && topPages.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #444" }}>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#aaa",
                  }}
                >
                  Rank
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#aaa",
                  }}
                >
                  Path
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#aaa",
                  }}
                >
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, index) => (
                <tr key={page.path} style={{ borderBottom: "1px solid #333" }}>
                  <td style={{ padding: "0.75rem", width: "50px" }}>
                    {index + 1}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      fontFamily: "monospace",
                      color: "#a7f3d0",
                    }}
                  >
                    {page.path}
                  </td>
                  <td style={{ padding: "0.75rem", fontWeight: "bold" }}>
                    {page.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#aaa", fontStyle: "italic" }}>
            No page view data available yet.
          </p>
        )}
      </div>
    </div>
  );
}
