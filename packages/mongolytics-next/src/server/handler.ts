// /src/server/handler.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './db';
import { SessionDataPayload } from '../types';

export async function mongolyticsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const sessionData: SessionDataPayload = req.body;
    const { db } = await connectToDatabase();
    const collection = db.collection('sessions');

    // Enrich with server-side data
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

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
          receivedAt: new Date(),
          landingPage: sessionData.url,
          hostname: sessionData.hostname,
          language: sessionData.language,
          screenResolution: sessionData.screenResolution,
          ipAddress: ipAddress,
        },
      },
      { upsert: true }
    );

    return res.status(200).json({ message: 'Session tracked' });
  } catch (error) {
    console.error('Mongolytics API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}