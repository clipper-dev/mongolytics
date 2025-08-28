// packages/mongolytics-next/src/client/identifiers.ts

// REMOVED: No longer need the uuid dependency
// import { v4 as uuidv4 } from 'uuid';

// Check if running in a browser environment
const isBrowser = typeof window !== 'undefined';

// --- NEW: Lightweight generator for the Visitor ID ---
class ClientVisitorId {
  static generate() {
    const prefix = 'CC';
    // Use the current timestamp in base-36 for a compact, time-based component
    const timestampPart = Date.now().toString(36);
    // Generate a long random string in base-36 for high entropy
    const randomPartLength = 16;
    let randomPart = '';
    for (let i = 0; i < randomPartLength; i++) {
      randomPart += Math.floor(Math.random() * 36).toString(36);
    }
    // e.g., "CCky1zjg14f8t7uw1b2x3y4z5"
    return prefix + timestampPart + randomPart;
  }
}

// --- The ObjectId-compatible generator for Session ID (Unchanged) ---
class ClientObjectId {
  static generate() {
    const timestamp = Math.floor(Date.now() / 1000);
    const hexTimestamp = timestamp.toString(16).padStart(8, '0');
    let randomHex = '';
    for (let i = 0; i < 16; i++) {
      randomHex += Math.floor(Math.random() * 16).toString(16);
    }
    return hexTimestamp + randomHex;
  }
}

// --- Visitor ID: Persists across sessions (uses the new generator) ---
export function getOrSetVisitorId(): string {
  if (!isBrowser) return '';
  let visitorId = localStorage.getItem('mongolytics_visitorId');
  if (!visitorId) {
    // CHANGED: Use the new custom generator instead of uuidv4()
    visitorId = ClientVisitorId.generate();
    localStorage.setItem('mongolytics_visitorId', visitorId);
  }
  return visitorId;
}

// --- Session ID: Uses the ClientObjectId generator (Unchanged) ---
export function getOrSetSessionId(): string {
  if (!isBrowser) return '';
  let sessionId = sessionStorage.getItem('mongolytics_sessionId');
  if (!sessionId) {
    sessionId = ClientObjectId.generate();
    sessionStorage.setItem('mongolytics_sessionId', sessionId);
  }
  return sessionId;
}