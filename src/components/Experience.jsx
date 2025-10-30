import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Calendar, Briefcase, TrendingUp, CheckCircle2 } from 'lucide-react';
import { staggerContainerVariants, fadeInVariants } from '../utils/animations';

const Experience = ({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = translations[language];

  const containerVariants = useMemo(() => staggerContainerVariants(), []);
  const itemVariants = useMemo(() => fadeInVariants, []);

  // Calculate experience duration
  const calculateDuration = (period) => {
    const months = period.toLowerCase().includes('june') || period.toLowerCase().includes('червень') ? 3 : 
                   period.toLowerCase().includes('present') || period.toLowerCase().includes('теперішній') ? 
                   new Date().getMonth() - 2 : 3; // March to now
    return months;
  };

  const totalExperienceMonths = t.experience.list.reduce((acc, exp) => 
    acc + calculateDuration(exp.period), 0);

  const experienceStats = {
    totalMonths: totalExperienceMonths,
    positions: t.experience.list.length,
    current: t.experience.list.some(exp => 
      exp.period.toLowerCase().includes('present') || 
      exp.period.toLowerCase().includes('теперішній')
    )
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

        {/* Experience Summary Scale */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-effect p-6 rounded-2xl">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {/* Total Experience */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                              flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">
                    {experienceStats.totalMonths}+ {language === 'uk' ? 'міс.' : 'mos.'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'uk' ? 'Загальний досвід' : 'Total Experience'}
                  </div>
                </div>
              </div>

              {/* Number of Positions */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 
                              flex items-center justify-center">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">
                    {experienceStats.positions}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'uk' ? 'Позиції' : 'Positions'}
                  </div>
                </div>
              </div>

              {/* Active Status */}
              {experienceStats.current && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 
                                  animate-ping opacity-75"></div>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {language === 'uk' ? 'Активно працюю' : 'Currently Working'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Gradient Timeline Line */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-1 
                        bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600 
                        dark:from-blue-500 dark:via-purple-500 dark:to-blue-500
                        transform md:-translate-x-1/2 rounded-full opacity-30"></div>
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 
                        bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600 
                        dark:from-blue-500 dark:via-purple-500 dark:to-blue-500
                        transform md:-translate-x-1/2 shadow-lg shadow-blue-500/50"></div>

          {t.experience.list.map((exp, index) => {
            const duration = calculateDuration(exp.period);
            const isLeft = index % 2 === 0;
            const isCompleted = !exp.period.toLowerCase().includes('present') && 
                               !exp.period.toLowerCase().includes('теперішній');

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.2 + index * 0.2, type: "spring", stiffness: 200 }}
                  className={`absolute left-6 sm:left-8 md:left-1/2 transform 
                            ${isLeft ? 'md:-translate-x-1/2' : 'md:-translate-x-1/2'} -translate-y-1/2 top-6 z-10`}
                >
                  <div className="relative">
                    {/* Outer ring with pulse animation */}
                    <motion.div 
                      className="absolute inset-0 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 opacity-30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    {/* Middle ring */}
                    <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 
                                  dark:from-blue-500 dark:to-purple-500 p-1 shadow-lg shadow-blue-500/50">
                      {/* Inner white dot */}
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 
                                    flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Card */}
                <div className={`ml-16 sm:ml-20 md:ml-0 md:w-[calc(50%-3rem)] 
                              ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-effect p-6 rounded-2xl card-hover relative overflow-hidden"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                                  from-blue-600 via-purple-600 to-blue-600"></div>
                    
                    {/* Status Badges Container */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      {/* Duration Badge */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ delay: 0.3 + index * 0.2 }}
                        className="bg-gradient-to-br from-blue-100 to-purple-100 
                                  dark:from-blue-900/30 dark:to-purple-900/30
                                  px-3 py-1 rounded-full text-xs font-bold
                                  text-blue-700 dark:text-blue-300 whitespace-nowrap"
                      >
                        {duration} {language === 'uk' ? 'міс.' : 'mos.'}
                      </motion.div>

                      {/* Completed Badge */}
                      {isCompleted && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ delay: 0.4 + index * 0.2, type: "spring" }}
                          className="bg-gradient-to-br from-green-100 to-emerald-100 
                                    dark:from-green-900/30 dark:to-emerald-900/30
                                    px-3 py-1 rounded-full text-xs font-bold
                                    text-green-700 dark:text-green-300 
                                    flex items-center gap-1 whitespace-nowrap"
                        >
                          <CheckCircle2 size={12} />
                          {language === 'uk' ? 'Завершено' : 'Completed'}
                        </motion.div>
                      )}
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400">
                      <Calendar size={18} className="flex-shrink-0" />
                      <span className="font-semibold text-sm">{exp.period}</span>
                    </div>
                    
                    {/* Position */}
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 pr-24 sm:pr-28">
                      {exp.position}
                    </h3>
                    
                    {/* Company */}
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase size={18} className="text-gray-500 dark:text-gray-400" />
                      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    
                    {/* Experience Scale Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${Math.min((duration / 12) * 100, 100)}%` } : { width: 0 }}
                          transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                                   rounded-full relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/30"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{language === 'uk' ? 'Початок' : 'Start'}</span>
                        <span>{language === 'uk' ? `${duration} міс.` : `${duration} mos.`}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.6 + index * 0.2 + itemIndex * 0.1 }}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-blue-600 dark:text-blue-400 mt-1 font-bold">▸</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
