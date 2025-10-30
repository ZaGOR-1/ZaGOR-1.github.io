import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, memo } from 'react';
import { Heart, Lightbulb, Users, Target } from 'lucide-react';
import { staggerContainerVariants, fadeInVariants } from '../utils/animations';

const About = memo(({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const t = translations[language];

  const characteristics = useMemo(() => [
    {
      icon: Heart,
      title: t.about.characteristics.passionate.title,
      description: t.about.characteristics.passionate.description,
    },
    {
      icon: Lightbulb,
      title: t.about.characteristics.creative.title,
      description: t.about.characteristics.creative.description,
    },
    {
      icon: Users,
      title: t.about.characteristics.teamPlayer.title,
      description: t.about.characteristics.teamPlayer.description,
    },
    {
      icon: Target,
      title: t.about.characteristics.dedicated.title,
      description: t.about.characteristics.dedicated.description,
    },
  ], [t]);

  const containerVariants = useMemo(() => staggerContainerVariants(), []);
  const itemVariants = useMemo(() => fadeInVariants, []);

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-purple-900/10"></div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-custom mx-auto relative z-10"
      >
        <motion.div variants={itemVariants}>
          <h2 className="section-title gradient-text">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.about.bio1}
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.about.bio2}
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.about.bio3}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="relative order-first lg:order-last"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 z-10"></div>
              <img
                src="/images/about.jpg"
                alt="About"
                width="800"
                height="600"
                className="rounded-2xl w-full transform transition-transform duration-700 hover:scale-110"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop';
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16"
        >
          {characteristics.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect p-4 sm:p-6 rounded-2xl text-center card-hover group"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center
                         bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg group-hover:shadow-purple-500/50 
                         transition-shadow duration-300"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <item.icon size={24} className="text-white sm:w-8 sm:h-8" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

About.displayName = 'About';

export default About;
