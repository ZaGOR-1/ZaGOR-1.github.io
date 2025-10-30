import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { SCROLL_THROTTLE_DELAY } from '../utils/constants';

const BACK_TO_TOP_THRESHOLD = 500;

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > BACK_TO_TOP_THRESHOLD);
    };

    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(toggleVisibility, SCROLL_THROTTLE_DELAY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const buttonVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  }), []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          {...buttonVariants}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl text-white shadow-2xl overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label="Back to top"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <ArrowUp size={24} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
