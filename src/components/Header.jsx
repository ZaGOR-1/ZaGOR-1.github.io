import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Menu, X, Download, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToSection } from '../hooks/useScrollProgress';
import { HEADER_SCROLL_THRESHOLD } from '../utils/constants';

const Header = memo(({ language, setLanguage, darkMode, setDarkMode, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollToSection = useScrollToSection();

  const t = translations[language];

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'uk' : 'en');
  }, [language, setLanguage]);

  const toggleTheme = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  const handleNavClick = useCallback((id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  }, [scrollToSection]);

  const navItems = useMemo(() => [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'education', label: t.nav.education },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ], [t]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect shadow-lg'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            DZ
          </motion.div>

          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-700 dark:text-gray-200 font-medium text-sm xl:text-base relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 
                               group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 
                       hover:from-purple-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-500
                       transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-purple-600" />}
            </motion.button>

            <motion.button
              onClick={toggleLanguage}
              className="p-2 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 
                       hover:from-purple-100 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-500
                       transition-all duration-300 flex items-center space-x-1 shadow-md hover:shadow-lg"
              aria-label="Toggle language"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{language.toUpperCase()}</span>
            </motion.button>

            <a
              href="/resume.pdf"
              download
              className="btn-primary flex items-center space-x-2"
            >
              <Download size={18} />
              <span>{t.nav.downloadCV}</span>
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-600 
                     text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-lg"
            >
              <div className="py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 
                             hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors
                             dark:hover:text-blue-400"
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="flex items-center space-x-2 px-4">
                  <button
                    onClick={toggleTheme}
                    className="flex-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center 
                             justify-center space-x-2 text-gray-700 dark:text-gray-200"
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
                  </button>
                  
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center 
                             justify-center space-x-2 text-gray-700 dark:text-gray-200"
                  >
                    <Globe size={20} />
                    <span className="text-sm">{language.toUpperCase()}</span>
                  </button>
                </div>

                <a
                  href="/resume.pdf"
                  download
                  className="block btn-primary text-center mx-4"
                >
                  <Download size={18} className="inline mr-2" />
                  {t.nav.downloadCV}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
