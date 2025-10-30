import { motion } from 'framer-motion';
import { useMemo, useCallback, memo } from 'react';
import { Download, Mail, Github, Linkedin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollToSection } from '../hooks/useScrollProgress';
import { staggerContainerVariants, fadeInVariants } from '../utils/animations';

const SOCIAL_LINKS = [
  { icon: Github, url: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Send, url: 'https://t.me/', label: 'Telegram' },
  { icon: Mail, url: 'mailto:denys.zahorovskyi@example.com', label: 'Email' },
];

const Hero = memo(() => {
  const { t } = useTranslation();
  const scrollToSection = useScrollToSection();

  const containerVariants = useMemo(() => staggerContainerVariants(), []);

  const handleContactClick = useCallback(() => {
    scrollToSection('contact');
  }, [scrollToSection]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20"
    >
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-float"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          <motion.div variants={fadeInVariants} className="flex-1 text-center lg:text-left w-full lg:w-auto">
            <motion.p
              variants={fadeInVariants}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2 animate-fade-in-up"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              variants={fadeInVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="gradient-text">{t.hero.name}</span>
            </motion.h1>

            <motion.div
              variants={fadeInVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                {t.hero.role}
              </span>
            </motion.div>

            <motion.p
              variants={fadeInVariants}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              variants={fadeInVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <a
                href="/resume.pdf"
                download
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>{t.hero.downloadCV}</span>
              </a>

              <button
                onClick={handleContactClick}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Mail size={20} />
                <span>{t.hero.contactMe}</span>
              </button>
            </motion.div>

            <motion.div
              variants={fadeInVariants}
              className="flex gap-3 sm:gap-4 justify-center lg:justify-start flex-wrap animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                           hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-500
                           hover:text-white text-gray-700 dark:text-gray-200 
                           transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInVariants}
            className="flex-1 flex justify-center w-full lg:w-auto"
          >
            <motion.div 
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full gradient-border overflow-hidden shadow-2xl animate-float-slow"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src="/images/profile.jpg"
                alt={t.hero.name}
                width="384"
                height="384"
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Denys+Zahorovskyi&size=400&background=3b82f6&color=fff&bold=true';
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
