import { useMemo, useCallback, memo } from 'react';
import { Heart, Github, Linkedin, Send, Mail } from './Icons';
import { SOCIAL_LINKS } from '../config/constants';

const Footer = memo(({ language, translations }) => {
  const t = useMemo(() => translations[language], [translations, language]);

  const getIconComponent = useCallback((iconName) => {
    const icons = {
      Github,
      Linkedin,
      Send,
      Mail,
    };
    return icons[iconName] || Mail;
  }, []);

  const socialLinks = useMemo(() => SOCIAL_LINKS.map(link => ({
    ...link,
    IconComponent: getIconComponent(link.icon),
  })), [getIconComponent]);

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom mx-auto px-4 py-8 sm:py-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-3 sm:mb-4">Denys Zahorovskyi</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {language === 'en'
                ? 'Full Stack Developer passionate about creating beautiful and functional web applications.'
                : 'Full Stack Developer, який створює красиві та функціональні веб-додатки.'}
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
              {language === 'en' ? 'Quick Links' : 'Швидкі посилання'}
            </h4>
            <ul className="space-y-2">
              {['home', 'about', 'skills', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(section);
                      if (element) {
                        const offset = section === 'home' ? 0 : 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-blue-500 
                             dark:hover:text-blue-400 transition-colors"
                  >
                    {translations[language].nav[section]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
              {language === 'en' ? 'Connect' : 'Соціальні мережі'}
            </h4>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
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
                  <social.IconComponent size={18} className="sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 flex-wrap">
            © {new Date().getFullYear()} {t.footer.by}. {t.footer.rights} {t.footer.madeWith}{' '}
            <Heart size={16} className="text-red-500" /> {language === 'en' ? 'and' : 'та'} React
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;