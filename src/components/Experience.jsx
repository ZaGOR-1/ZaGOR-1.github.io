import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { staggerContainerVariants, fadeInVariants } from '../utils/animations';

const Experience = ({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = translations[language];

  const containerVariants = useMemo(() => staggerContainerVariants(), []);
  const itemVariants = useMemo(() => fadeInVariants, []);

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
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-600 
                        dark:bg-blue-500
                        transform md:-translate-x-1/2"></div>

          {t.experience.list.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative mb-8 sm:mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className={`${index % 2 === 0 ? 'md:mr-32' : 'md:ml-32'}`}>
                  <div
                    className="glass-effect p-4 sm:p-6 rounded-2xl card-hover"
                  >
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
                          <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
