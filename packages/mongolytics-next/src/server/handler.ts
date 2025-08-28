import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { AnalyticsData, PageStat, SessionDataPayload } from "../..";
import { connectToDatabase } from "./db";

// Helper to validate the incoming string
const isValidObjectIdString = (id: string) => /^[0-9a-f]{24}$/.test(id);

export async function POST(
  request: Request,  // Use Request instead of NextRequest
  context: { params: Promise<{}> }
) {
  try {
    const sessionData: SessionDataPayload = await request.json();

    // Validation Step
    if (!sessionData || !isValidObjectIdString(sessionData.sessionId)) {
      return NextResponse.json(
        { message: "A valid 24-char hex sessionId is required" },
        { status: 400 }
      );
    }

    const { db, collectionSessions } = await connectToDatabase();
    const collection = db.collection(collectionSessions ?? "sessions");

    // Get IP address from headers instead of request.ip
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(',')[0]?.trim() ?? "unknown";
    const userAgent = request.headers.get("user-agent");

    const sessionObjectId = new ObjectId(sessionData.sessionId);

    // Single operation using aggregation pipeline
    await collection.updateOne(
      { _id: sessionObjectId },
      [
        {
          $set: {
            // Always update these
            lastSeenAt: new Date(),
            currentUrl: sessionData.url,
            userAgent: userAgent,
            pageviews: { $add: [{ $ifNull: ["$pageviews", 0] }, 1] },
            
            // Set initial values if document is new
            visitorId: { $ifNull: ["$visitorId", sessionData.visitorId] },
            startTimestamp: { $ifNull: ["$startTimestamp", new Date()] },
            landingPage: { $ifNull: ["$landingPage", sessionData.url] },
            hostname: { $ifNull: ["$hostname", sessionData.hostname] },
            language: { $ifNull: ["$language", sessionData.language] },
            screenResolution: { $ifNull: ["$screenResolution", sessionData.screenResolution] },
            ipAddress: { $ifNull: ["$ipAddress", ipAddress] },
            
            // Update visitedPages array
            visitedPages: {
              $let: {
                vars: {
                  existingPages: { $ifNull: ["$visitedPages", []] },
                  currentPath: sessionData.pathname,
                },
                in: {
                  $cond: {
                    // Check if path exists in array
                    if: {
                      $in: [sessionData.pathname, "$$existingPages.path"],
                    },
                    // If exists, increment count
                    then: {
                      $map: {
                        input: "$$existingPages",
                        as: "page",
                        in: {
                          $cond: {
                            if: { $eq: ["$$page.path", sessionData.pathname] },
                            then: {
                              path: "$$page.path",
                              count: { $add: ["$$page.count", 1] },
                            },
                            else: "$$page",
                          },
                        },
                      },
                    },
                    // If doesn't exist, append new entry
                    else: {
                      $concatArrays: [
                        "$$existingPages",
                        [{ path: sessionData.pathname, count: 1 }],
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      ],
      { upsert: true }
    );

    return NextResponse.json({ message: "Session tracked" }, { status: 200 });
  } catch (error) {
    console.error("Mongolytics API Error:", error);
    
    if (
      error instanceof Error &&
      error.message.includes("Argument passed in must be a string of 12 bytes")
    ) {
      return NextResponse.json(
        { message: "Invalid sessionId format for ObjectId" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET handler
export async function GET(
  request: Request,  // Use Request instead of NextRequest
  context: { params: Promise<{}> }
) {
  try {
    const { db, collectionSessions } = await connectToDatabase();
    const collection = db.collection(collectionSessions ?? "sessions");

    // --- 1. Get Total Sessions ---
    const totalSessions = await collection.countDocuments();

    // --- 2. Get Total Pageviews ---
    const pageviewsResult = await collection
      .aggregate([{ $group: { _id: null, total: { $sum: "$pageviews" } } }])
      .toArray();
    const totalPageviews = pageviewsResult[0]?.total || 0;

    // --- 3. Get Top Visited Pages using an Aggregation Pipeline ---
    const topPagesPipeline = [
      // Stage 1: Deconstruct the visitedPages array
      { $unwind: "$visitedPages" },
      
      // Stage 2: Group by path and sum the counts
      {
        $group: {
          _id: "$visitedPages.path",
          count: { $sum: "$visitedPages.count" },
        },
      },
      
      // Stage 3: Sort by count in descending order
      { $sort: { count: -1 } },
      
      // Stage 4: Limit to top 10
      { $limit: 10 },
      
      // Stage 5: Reshape output
      {
        $project: {
          _id: 0,
          path: "$_id",
          count: 1,
        },
      },
    ];
    
    const topPages = await collection
      .aggregate<PageStat>(topPagesPipeline)
      .toArray();

    const data: AnalyticsData = {
      totalSessions,
      totalPageviews,
      topPages,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}