import { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import BackToTop from './components/BackToTop';
import LoadingSpinner from './components/LoadingSpinner';
import { translations } from './data/translations';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useLocalStorage } from './hooks/useLocalStorage';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 
                    transition-colors duration-200 relative overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                   dark:from-blue-400 dark:via-purple-400 dark:to-pink-400
                   transform origin-left z-[60] shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />

      <Header
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        translations={translations}
      />

      <main id="main">
        <Hero language={language} translations={translations} />
        <Suspense fallback={<LoadingSpinner />}>
          <About language={language} translations={translations} />
          <Skills language={language} translations={translations} />
          <Education language={language} translations={translations} />
          <Experience language={language} translations={translations} />
          <Projects language={language} translations={translations} />
          <Contact language={language} translations={translations} />
          <Footer language={language} translations={translations} />
        </Suspense>
      </main>

      <BackToTop />
    </div>
  );
}

export default App;
