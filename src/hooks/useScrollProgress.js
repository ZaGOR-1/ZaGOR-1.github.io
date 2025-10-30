import { useState, useEffect, useCallback, useMemo } from 'react';
import { SCROLL_THROTTLE_DELAY, HEADER_OFFSET, HOME_HEADER_OFFSET } from '../utils/constants';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }
    const scrolled = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
    setProgress(scrolled);
  }, []);

  const throttledUpdate = useMemo(() => {
    let timeoutId;
    let lastRan;
    return () => {
      if (!lastRan) {
        updateProgress();
        lastRan = Date.now();
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (Date.now() - lastRan >= SCROLL_THROTTLE_DELAY) {
            updateProgress();
            lastRan = Date.now();
          }
        }, SCROLL_THROTTLE_DELAY - (Date.now() - lastRan));
      }
    };
  }, [updateProgress]);

  useEffect(() => {
    updateProgress();

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('resize', throttledUpdate, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
    };
  }, [updateProgress, throttledUpdate]);

  return progress;
};

export const useScrollToSection = () => {
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = id === 'home' ? HOME_HEADER_OFFSET : HEADER_OFFSET;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return scrollToSection;
};
