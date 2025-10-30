import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { staggerContainerVariants, fadeInVariants } from '../utils/animations';

const Education = ({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = translations[language];

  const containerVariants = useMemo(() => staggerContainerVariants(), []);
  const itemVariants = useMemo(() => fadeInVariants, []);

  return (
    <section id="education" className="section-padding bg-gray-50 dark:bg-gray-800/50" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-custom mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h2 className="section-title gradient-text">{t.education.title}</h2>
          <p className="section-subtitle">{t.education.subtitle}</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto glass-effect p-6 sm:p-8 md:p-12 rounded-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-600 
                       dark:bg-blue-600
                       flex items-center justify-center flex-shrink-0"
            >
              <GraduationCap size={24} className="text-white sm:w-8 sm:h-8" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{t.education.university}</h3>
              <p className="text-lg sm:text-xl text-blue-500 dark:text-blue-400 mb-2">{t.education.degree}</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">{t.education.period}</p>
              <p className="text-base sm:text-lg font-semibold text-green-600 dark:text-green-400">
                {t.education.gpa}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <BookOpen className="text-blue-500 dark:text-blue-400" size={20} />
                <h4 className="text-lg sm:text-xl font-bold">{t.education.relevantCourses}</h4>
              </div>
              <ul className="space-y-2">
                {t.education.courses.map((course, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Award className="text-purple-500 dark:text-purple-400" size={20} />
                <h4 className="text-lg sm:text-xl font-bold">{t.education.certificates}</h4>
              </div>
              <ul className="space-y-2">
                {t.education.certList.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Education;
