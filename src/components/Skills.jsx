import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { skillsData } from '../data/translations';
import { staggerContainerVariants, fadeInVariants } from '../utils/animations';

const Skills = ({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = translations[language];

  const containerVariants = useMemo(() => staggerContainerVariants(), []);
  const itemVariants = useMemo(() => fadeInVariants, []);

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-custom mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h2 className="section-title gradient-text">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skillsData.map((categoryData, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="glass-effect p-6 sm:p-8 rounded-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 gradient-text">
                {t.skills.categories[categoryData.category]}
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {categoryData.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        {skill.name}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="relative w-full h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        style={{ 
                          willChange: 'width',
                          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        }}
                        className="h-full rounded-full relative overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                       animate-shimmer" 
                              style={{ 
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s linear infinite'
                              }}></span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {language === 'en' 
              ? 'Always learning and improving my skills!' 
              : 'Завжди навчаюсь та покращую свої навички!'}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
