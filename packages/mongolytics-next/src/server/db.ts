// /src/server/db.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGOLYTICS_URI;
const dbName = process.env.MONGOLYTICS_DB_NAME;
const collectionSessions = process.env.MONGOLYTICS_COLLECTION_SESSIONS ?? 'sessions';

if (!uri) {
  throw new Error('Please define the MONGOLYTICS_URI environment variable');
}
if (!dbName) {
  throw new Error('Please define the MONGOLYTICS_DB_NAME environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb, collectionSessions };
  }

  const client = new MongoClient(uri!);
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db, collectionSessions };
}