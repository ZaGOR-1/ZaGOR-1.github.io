import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillsData } from '../data/translations';
import { ANIMATION_CONFIG } from '../config/constants';

const Skills = ({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_CONFIG.staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ANIMATION_CONFIG.itemDuration,
      },
    },
  };

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
                {categoryData.skills.map((skill, skillIndex) => {
                  // Calculate delay with max limit to prevent long delays
                  const calculatedDelay = categoryIndex * ANIMATION_CONFIG.staggerDelay + 
                                        skillIndex * 0.05;
                  const delay = Math.min(calculatedDelay, ANIMATION_CONFIG.maxDelay);
                  
                  return (
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
                      
                      <div className="w-full h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: delay,
                            ease: 'easeOut',
                          }}
                          style={{ willChange: 'width' }}
                          className="h-full bg-blue-600 
                                   dark:bg-blue-500 rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                  );
                })}
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