import { m as motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, Send } from './Icons';
import { useScrollToSection } from '../hooks/useScrollProgress';
import { SOCIAL_LINKS } from '../config/constants';

const Hero = ({ language, translations }) => {
  const scrollToSection = useScrollToSection();
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const getIconComponent = (iconName) => {
    const icons = { Github, Linkedin, Send, Mail };
    return icons[iconName] || Mail;
  };

  const socialLinks = SOCIAL_LINKS.map(link => ({
    ...link,
    IconComponent: getIconComponent(link.icon),
  }));

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 bg-white dark:bg-gray-800"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          <motion.div variants={itemVariants} className="flex-1 text-center lg:text-left w-full lg:w-auto">
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="gradient-text">{t.hero.name}</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6"
            >
              <span className="text-blue-600 dark:text-blue-400">
                {t.hero.role}
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
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
                onClick={() => scrollToSection('contact')}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Mail size={20} />
                <span>{t.hero.contactMe}</span>
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-3 sm:gap-4 justify-center lg:justify-start flex-wrap"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-blue-600 
                           dark:hover:bg-blue-600
                           hover:text-white text-gray-700 dark:text-gray-200 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.IconComponent size={20} className="sm:w-6 sm:h-6" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center w-full lg:w-auto"
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full gradient-border overflow-hidden shadow-lg">
              <img
                src="/images/profile.jpg"
                alt={t.hero.name}
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Denys+Zahorovskyi&size=400&background=3b82f6&color=fff&bold=true';
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;