import { Heart, Github, Linkedin, Send, Mail } from 'lucide-react';

const Footer = ({ language, translations }) => {
  const t = translations[language];

  const socialLinks = [
    { icon: Github, url: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Send, url: 'https://t.me/', label: 'Telegram' },
    { icon: Mail, url: 'mailto:denys.zahorovskyi@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom mx-auto px-4 py-8 sm:py-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-3 sm:mb-4">Denys Zahorovskyi</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {language === 'en'
                ? 'Frontend Developer passionate about creating beautiful and functional web applications.'
                : 'Frontend Developer, який створює красиві та функціональні веб-додатки.'}
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
                        element.scrollIntoView({ behavior: 'smooth' });
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
                  aria-label={social.label}
                >
                  <social.icon size={18} className="sm:w-5 sm:h-5" />
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
};

export default Footer;
