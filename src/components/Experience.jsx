import { m as motion, useInView } from 'framer-motion';
import { useRef, useMemo, memo } from 'react';
import { Calendar } from './Icons';

const Experience = memo(({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = useMemo(() => translations[language], [translations, language]);

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

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800/50" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-custom mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h2 className="section-title gradient-text">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line - adjusted for mobile */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-600 
                        dark:bg-blue-500
                        md:transform md:-translate-x-1/2"></div>

          {t.experience.list.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative mb-8 sm:mb-12 pl-12 sm:pl-16 md:pl-0"
            >
              {/* Timeline dot - adjusted for mobile */}
              <div className="absolute left-2.5 sm:left-4 md:left-1/2 top-6 w-3 h-3 sm:w-4 sm:h-4 
                            bg-blue-600 dark:bg-blue-500 rounded-full 
                            md:transform md:-translate-x-1/2 border-2 border-white dark:border-gray-800"></div>
              
              <div className={`${
                index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)] md:ml-auto'
              }`}>
                <div className="glass-effect p-4 sm:p-6 rounded-2xl card-hover">
                  <div className="flex items-center gap-2 mb-2 text-blue-500 dark:text-blue-400">
                    <Calendar size={16} />
                    <span className="font-semibold text-sm sm:text-base">{exp.period}</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">{exp.position}</h3>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">{exp.company}</p>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;