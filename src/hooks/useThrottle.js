import { useRef, useCallback } from 'react';

export const useThrottle = (callback, delay) => {
  const timeoutRef = useRef(null);
  const lastRanRef = useRef(null);

  const throttledCallback = useCallback((...args) => {
    if (!lastRanRef.current) {
      callback(...args);
      lastRanRef.current = Date.now();
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (Date.now() - lastRanRef.current >= delay) {
          callback(...args);
          lastRanRef.current = Date.now();
        }
      }, delay - (Date.now() - lastRanRef.current));
    }
  }, [callback, delay]);

  return throttledCallback;
};
