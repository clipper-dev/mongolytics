import { connectToDatabase } from "../server/db";
import { AnalyticsData, PageStat } from "../types";

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    const { db, collectionSessions } = await connectToDatabase();
    const collection = db.collection(collectionSessions ?? 'sessions');

    // --- 1. Get Total Sessions ---
    const totalSessions = await collection.countDocuments();

    // --- 2. Get Total Pageviews ---
    const pageviewsResult = await collection.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$pageviews' },
        },
      },
    ]).toArray();
    const totalPageviews = pageviewsResult[0]?.total || 0;

    // --- 3. Get Top Visited Pages using an Aggregation Pipeline ---
    const topPagesPipeline = [
      // Stage 1: Deconstruct the visitedPages array into individual documents
      { $unwind: '$visitedPages' },
      
      // Stage 2: Group by page path and sum the counts from each session
      {
        $group: {
          _id: '$visitedPages.path',  // Group by the path field
          count: { $sum: '$visitedPages.count' },  // Sum the count field
        },
      },
      
      // Stage 3: Sort by total count in descending order
      { $sort: { count: -1 } },
      
      // Stage 4: Limit to the top 10 results
      { $limit: 10 },
      
      // Stage 5: Reshape the output for cleaner structure
      {
        $project: {
          _id: 0,
          path: '$_id',
          count: 1,
        },
      },
    ];

    const topPages = await collection.aggregate<PageStat>(topPagesPipeline).toArray();

    return {
      totalSessions,
      totalPageviews,
      topPages,
    };
  } catch (error) {
    console.error("Failed to fetch analytics data:", error);
    return {
      totalSessions: 0,
      totalPageviews: 0,
      topPages: [],
    };
  }
}