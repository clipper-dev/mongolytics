// /src/client/identifiers.ts
import { v4 as uuidv4 } from 'uuid';

// Check if running in a browser environment
const isBrowser = typeof window !== 'undefined';

export function getOrSetVisitorId(): string {
  if (!isBrowser) return '';
  let visitorId = localStorage.getItem('mongolytics_visitorId');
  if (!visitorId) {
    visitorId = uuidv4();
    localStorage.setItem('mongolytics_visitorId', visitorId);
  }
  return visitorId;
}

export function getOrSetSessionId(): string {
  if (!isBrowser) return '';
  let sessionId = sessionStorage.getItem('mongolytics_sessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('mongolytics_sessionId', sessionId);
  }
  return sessionId;
}