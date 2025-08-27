// /src/client/useMongolytics.ts (Optimized Version)
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getOrSetVisitorId, getOrSetSessionId } from './identifiers';
import { SessionDataPayload } from '../types';

export function useMongolytics() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const trackPageView = () => {
      // The function to execute when the browser is idle
      const handleTracking = () => {
        const data: SessionDataPayload = {
          visitorId: getOrSetVisitorId(),
          sessionId: getOrSetSessionId(),
          hostname: window.location.hostname,
          language: navigator.language,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          url: window.location.href,
          pathname: window.location.pathname,
        };
        navigator.sendBeacon('/api/mongolytics', JSON.stringify(data));
      };

      // Check if requestIdleCallback is supported
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(handleTracking);
      } else {
        // Fallback for older browsers: run it after a short delay
        setTimeout(handleTracking, 200);
      }
    };

    trackPageView();
    router.events.on('routeChangeComplete', trackPageView);

    return () => {
      router.events.off('routeChangeComplete', trackPageView);
    };
  }, [router.events]);
}