import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects = ({ language, translations }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = translations[language];
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: language === 'en' ? 'E-commerce Platform' : 'E-commerce Платформа',
      description: language === 'en' 
        ? 'Full-stack online store with shopping cart, payment integration, and admin dashboard'
        : 'Full-stack онлайн магазин з кошиком, інтеграцією оплати та адмін панеллю',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      liveUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 2,
      title: language === 'en' ? 'Task Management App' : 'Додаток для Управління Завданнями',
      description: language === 'en'
        ? 'Productivity app with real-time collaboration, drag-and-drop interface, and notifications'
        : 'Додаток продуктивності з співпрацею в реальному часі, drag-and-drop інтерфейсом та сповіщеннями',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', 'Firebase'],
      category: 'frontend',
      liveUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 3,
      title: language === 'en' ? 'Weather Dashboard' : 'Погодний Дашборд',
      description: language === 'en'
        ? 'Real-time weather app with 7-day forecast, interactive maps, and location-based alerts'
        : 'Додаток погоди в реальному часі з 7-денним прогнозом, інтерактивними картами та сповіщеннями за локацією',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      category: 'frontend',
      liveUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 4,
      title: language === 'en' ? 'RESTful API Service' : 'RESTful API Сервіс',
      description: language === 'en'
        ? 'Scalable REST API with authentication, rate limiting, and comprehensive documentation'
        : 'Масштабований REST API з автентифікацією, rate limiting та повною документацією',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      category: 'backend',
      liveUrl: null,
      githubUrl: 'https://github.com',
    },
    {
      id: 5,
      title: language === 'en' ? 'Social Media Dashboard' : 'Дашборд Соціальних Мереж',
      description: language === 'en'
        ? 'Analytics dashboard for tracking social media metrics across multiple platforms'
        : 'Аналітичний дашборд для відстеження метрик соціальних мереж на різних платформах',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      technologies: ['React', 'D3.js', 'Node.js', 'Redis'],
      category: 'fullstack',
      liveUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 6,
      title: language === 'en' ? 'Blog CMS' : 'CMS для Блогу',
      description: language === 'en'
        ? 'Content management system with markdown support, SEO optimization, and media library'
        : 'Система управління контентом з підтримкою markdown, SEO оптимізацією та медіа бібліотекою',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
      technologies: ['PHP', 'MySQL', 'TinyMCE'],
      category: 'backend',
      liveUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com',
    },
  ];

  const filters = [
    { id: 'all', label: language === 'en' ? 'All' : 'Всі' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-800/50" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-custom mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h2 className="section-title gradient-text">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
                ${activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              className="glass-effect rounded-2xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                              flex items-end justify-center pb-4 gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-3 bg-white/90 hover:bg-white rounded-full 
                               text-gray-900 transition-colors duration-200"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 bg-white/90 hover:bg-white rounded-full 
                             text-gray-900 transition-colors duration-200"
                    aria-label="View source code"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 
                               text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 sm:py-16"
          >
            <Filter size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              {language === 'en' ? 'No projects found for this filter.' : 'Немає проектів для цього фільтру.'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
