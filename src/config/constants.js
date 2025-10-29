// src/config/constants.js
export const SOCIAL_LINKS = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/ZaGOR-1',
    icon: 'Github'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/denys-zahorovskyi',
    icon: 'Linkedin'
  },
  { 
    name: 'Telegram', 
    url: 'https://t.me/denys_zahorovskyi',
    icon: 'Send'
  },
  { 
    name: 'Email', 
    url: 'mailto:zahorovskyi.denys@gmail.com',
    icon: 'Mail'
  },
];

export const CONTACT_INFO = {
  email: 'zahorovskyi.denys@gmail.com',
  phone: '+380 (96) 123-45-67',
  phoneLink: 'tel:+380961234567',
  location: {
    en: 'Zhytomyr, Ukraine',
    uk: 'Житомир, Україна'
  }
};

export const ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  itemDuration: 0.3,
  scrollThreshold: 0.3,
  maxDelay: 1, // Maximum delay for animations
};

export const SCROLL_CONFIG = {
  throttleDelay: 100,
  headerScrollThreshold: 50,
  backToTopThreshold: 500,
  smoothScrollOffset: 80,
};

export const SITE_CONFIG = {
  title: 'Denys Zahorovskyi - Full Stack Developer',
  description: 'Full Stack Developer specializing in React, Node.js, PHP, C, and C#. 2nd year Software Engineering student at Zhytomyr Polytechnic.',
  url: 'https://zagor.me',
  author: 'Denys Zahorovskyi',
};