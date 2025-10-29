import { useState, useEffect } from 'react';
import { Menu, X, Download, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToSection } from '../hooks/useScrollProgress';

const Header = ({ language, setLanguage, darkMode, setDarkMode, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollToSection = useScrollToSection();

  const t = translations[language];

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'uk' : 'en');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'education', label: t.nav.education },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/98 dark:bg-gray-800/98 shadow-md dark:border-b dark:border-gray-600'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <div
            className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            DZ
          </div>

          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 
                         transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 
                       dark:hover:bg-gray-500 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} className="text-gray-200" /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 
                       dark:hover:bg-gray-500 transition-colors duration-200 flex items-center space-x-1"
              aria-label="Toggle language"
            >
              <Globe size={20} className="text-gray-700 dark:text-gray-200" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{language.toUpperCase()}</span>
            </button>

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
};

export default Header;
