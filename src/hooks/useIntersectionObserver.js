import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    const target = targetRef.current;
    
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: optionsRef.current.threshold || 0.3,
      rootMargin: optionsRef.current.rootMargin || '0px',
      ...optionsRef.current,
    });

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return [targetRef, isIntersecting];
};
