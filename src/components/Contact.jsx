import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback, useMemo, memo } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { validateFormData } from '../utils/validation';
import { FORM_SUCCESS_MESSAGE_DURATION, FORM_SUBMIT_DELAY } from '../utils/constants';
import { staggerContainerVariants, fadeInVariants } from '../utils/animations';

const Contact = memo(({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { isValid } = validateFormData(formData);
    
    if (!isValid) {
      setFormStatus('error');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setFormStatus('');
      }, FORM_SUCCESS_MESSAGE_DURATION);
    }, FORM_SUBMIT_DELAY);
  }, [formData]);

  const contactInfo = useMemo(() => [
    {
      icon: Mail,
      label: t.contact.info.email,
      value: 'denys.zahorovskyi@example.com',
      link: 'mailto:denys.zahorovskyi@example.com',
    },
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: '+380 (12) 345-67-89',
      link: 'tel:+380123456789',
    },
    {
      icon: MapPin,
      label: t.contact.info.location,
      value: t.contact.info.locationValue,
      link: null,
    },
  ], [t]);

  const containerVariants = useMemo(() => staggerContainerVariants(), []);
  const itemVariants = useMemo(() => fadeInVariants, []);

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-custom mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h2 className="section-title gradient-text">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text">
                {language === 'en' ? 'Get In Touch' : "Зв'яжіться зі мною"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
                {language === 'en'
                  ? "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
                  : 'Я завжди відкритий для обговорення нових проектів, креативних ідей або можливостей стати частиною ваших планів.'}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 sm:gap-4 glass-effect p-3 sm:p-4 rounded-xl"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 
                                dark:bg-blue-600
                                flex items-center justify-center flex-shrink-0">
                    <info.icon size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">{info.label}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-sm sm:text-lg font-semibold hover:text-blue-500 
                                 dark:hover:text-blue-400 transition-colors break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm sm:text-lg font-semibold break-all">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="glass-effect p-6 sm:p-8 rounded-2xl space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.contact.form.namePlaceholder}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.contact.form.emailPlaceholder}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.form.messagePlaceholder}
                  rows="5"
                  className="input-field resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                <span>{isSubmitting ? t.contact.form.sending : t.contact.form.send}</span>
              </button>

              {formStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-400 text-center font-semibold"
                  role="alert"
                  aria-live="polite"
                >
                  {t.contact.form.success}
                </motion.p>
              )}

              {formStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 dark:text-red-400 text-center font-semibold"
                  role="alert"
                  aria-live="assertive"
                >
                  {t.contact.form.error}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
