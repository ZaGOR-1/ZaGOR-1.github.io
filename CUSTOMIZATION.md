# Customization Guide

This guide will help you customize the portfolio website to make it your own.

## 📝 Table of Contents

1. [Basic Information](#basic-information)
2. [Images](#images)
3. [Projects](#projects)
4. [Skills](#skills)
5. [Education](#education)
6. [Experience](#experience)
7. [Contact Information](#contact-information)
8. [Colors and Styling](#colors-and-styling)
9. [Adding Sections](#adding-sections)
10. [FAQ](#faq)

## 🎯 Basic Information

### 1. Name and Title

Edit `src/data/translations.js`:

```javascript
// For both languages (en and uk)
hero: {
  name: 'Your Name',
  role: 'Your Job Title',
  description: 'Your bio description...',
}
```

### 2. About Section

Update your biography:

```javascript
about: {
  bio1: 'First paragraph...',
  bio2: 'Second paragraph...',
  bio3: 'Third paragraph...',
}
```

## 🖼️ Images

### Profile Picture

1. Add your profile picture to `public/images/profile.jpg`
2. Recommended size: 400x400 pixels (square)
3. Format: JPG or PNG

### About Section Image

1. Add image to `public/images/about.jpg`
2. Recommended size: 800x600 pixels
3. Can be a workspace photo, hobby image, etc.

### Project Images

1. Add project screenshots to `public/images/`:
   - `project1.jpg`
   - `project2.jpg`
   - `project3.jpg`
   - `project4.jpg`
2. Recommended size: 800x600 pixels
3. Use clear, high-quality screenshots

### Image Optimization Tips

- Compress images using tools like TinyPNG or ImageOptim
- Use appropriate formats (JPG for photos, PNG for graphics)
- Maximum recommended file size: 500KB per image

## 🚀 Projects

### Adding a New Project

In `src/data/translations.js`, add to the `projects.list` array:

```javascript
{
  title: 'Project Name',
  description: 'Brief description of your project',
  image: '/images/project-new.jpg',
  tags: ['React', 'Node.js', 'MongoDB'],
  github: 'https://github.com/yourusername/project',
  live: 'https://yourproject.com',
}
```

### Project Tags

Common tags you might use:
- Frontend: React, Vue, Angular, HTML, CSS, JavaScript, TypeScript
- Backend: Node.js, Python, Django, Express, PHP
- Database: MongoDB, MySQL, PostgreSQL, Firebase
- Tools: Git, Docker, AWS, Heroku

### Removing a Project

Simply delete the project object from the `projects.list` array.

## 💪 Skills

### Adding New Skills

In `src/data/translations.js`, find `skillsData`:

```javascript
export const skillsData = [
  {
    category: 'frontend', // or 'backend', 'tools', 'soft'
    skills: [
      { name: 'New Skill', level: 75 }, // level: 0-100
    ],
  },
];
```

### Skill Categories

- **frontend**: HTML, CSS, JavaScript, React, etc.
- **backend**: Node.js, Python, databases, etc.
- **tools**: Git, Docker, VS Code, etc.
- **soft**: Communication, Teamwork, Problem Solving

### Skill Levels

- 0-30: Beginner
- 31-60: Intermediate
- 61-85: Advanced
- 86-100: Expert

Be honest about your skill levels!

## 🎓 Education

### University Information

Edit `src/data/translations.js`:

```javascript
education: {
  university: 'Your University Name',
  degree: 'Your Degree',
  period: 'Start Year - End Year',
  gpa: 'GPA: X.X/Y.Y',
}
```

### Courses

Update the courses array:

```javascript
courses: [
  'Course Name 1',
  'Course Name 2',
  'Course Name 3',
]
```

### Certificates

Update the certificates array:

```javascript
certList: [
  'Certificate Name 1',
  'Certificate Name 2',
]
```

## 💼 Experience

### Adding Work Experience

In `src/data/translations.js`:

```javascript
experience: {
  list: [
    {
      company: 'Company Name',
      position: 'Your Position',
      period: 'Month Year - Month Year',
      description: [
        'Responsibility or achievement 1',
        'Responsibility or achievement 2',
        'Responsibility or achievement 3',
      ],
    },
  ],
}
```

### Tips for Experience Section

- Use action verbs (Developed, Implemented, Managed)
- Include measurable achievements (Improved performance by 30%)
- Keep descriptions concise but informative
- If you don't have work experience, include:
  - Internships
  - Freelance projects
  - Volunteer work
  - Academic projects

## 📧 Contact Information

### Email and Phone

In `src/data/translations.js`:

```javascript
contact: {
  info: {
    email: 'your.email@example.com',
    phone: '+XX (XX) XXX-XX-XX',
    locationValue: 'Your City, Your Country',
  },
}
```

### Social Media Links

#### Hero Section

Edit `src/components/Hero.jsx` (around line 40):

```javascript
const socialLinks = [
  { icon: Github, url: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Send, url: 'https://t.me/yourusername', label: 'Telegram' },
  { icon: Mail, url: 'mailto:your.email@example.com', label: 'Email' },
];
```

#### Footer

Edit `src/components/Footer.jsx` (around line 20):

```javascript
const socialLinks = [
  { icon: Github, url: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Send, url: 'https://t.me/yourusername', label: 'Telegram' },
  { icon: Mail, url: 'mailto:your.email@example.com', label: 'Email' },
];
```

### Contact Form

The contact form currently has a demo implementation. To make it functional:

#### Option 1: FormSubmit (Free, No Backend Required)

Edit `src/components/Contact.jsx`, replace the `handleSubmit` function:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.target);
  
  try {
    await fetch('https://formsubmit.co/your-email@example.com', {
      method: 'POST',
      body: formData,
    });
    setFormStatus('success');
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    setFormStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

#### Option 2: EmailJS

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Install EmailJS:
```bash
npm install @emailjs/browser
```
3. Follow their documentation to integrate

## 🎨 Colors and Styling

### Primary Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#3b82f6', // Blue
    dark: '#2563eb',
  },
  secondary: {
    DEFAULT: '#8b5cf6', // Purple
    dark: '#7c3aed',
  },
}
```

### Popular Color Schemes

#### Professional Blue
```javascript
primary: { DEFAULT: '#3b82f6', dark: '#2563eb' }
secondary: { DEFAULT: '#8b5cf6', dark: '#7c3aed' }
```

#### Modern Green
```javascript
primary: { DEFAULT: '#10b981', dark: '#059669' }
secondary: { DEFAULT: '#14b8a6', dark: '#0d9488' }
```

#### Warm Orange
```javascript
primary: { DEFAULT: '#f97316', dark: '#ea580c' }
secondary: { DEFAULT: '#ec4899', dark: '#db2777' }
```

### Dark Mode Colors

Edit `src/index.css`:

```css
.dark {
  --bg-primary: #0a0a0a;      /* Main background */
  --bg-secondary: #111111;     /* Secondary background */
  --bg-card: #1a1a1a;         /* Card background */
  --text-primary: #ffffff;     /* Primary text */
  --text-secondary: #a0a0a0;   /* Secondary text */
  --border-color: #2a2a2a;    /* Borders */
}
```

### Font Changes

To use a different font:

1. Add font to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
```

2. Update `src/index.css`:
```css
body {
  font-family: 'Poppins', sans-serif;
}
```

## ➕ Adding Sections

### Example: Adding a Blog Section

1. Create `src/components/Blog.jsx`:
```jsx
import { motion } from 'framer-motion';

const Blog = ({ language, translations }) => {
  return (
    <section id="blog" className="section-padding">
      <div className="container-custom mx-auto">
        <h2 className="section-title gradient-text">Blog</h2>
        {/* Your blog content */}
      </div>
    </section>
  );
};

export default Blog;
```

2. Import in `src/App.jsx`:
```jsx
import Blog from './components/Blog';

// Add to the main section
<Blog language={language} translations={translations} />
```

3. Add translations to `src/data/translations.js`

## ❓ FAQ

### Q: How do I change the default language?

A: Edit `src/App.jsx`, line 11:
```javascript
return localStorage.getItem('language') || 'en'; // Change 'en' to 'uk'
```

### Q: How do I change the default theme?

A: Edit `src/App.jsx`, line 16:
```javascript
return saved ? JSON.parse(saved) : true; // Change true to false for light mode
```

### Q: How do I remove a section?

A: In `src/App.jsx`, simply delete or comment out the section component:
```jsx
// <Experience language={language} translations={translations} />
```

### Q: The images aren't showing. What should I do?

A: The site uses fallback placeholder images. Make sure:
1. Images are in `public/images/` directory
2. Image paths in translations.js match your file names
3. Images are named correctly (case-sensitive)

### Q: How do I add more languages?

A: In `src/data/translations.js`, add a new language object:
```javascript
export const translations = {
  en: { /* English */ },
  uk: { /* Ukrainian */ },
  de: { /* German */ },
};
```

Then update the language toggle in Header.jsx.

### Q: Can I use this for commercial purposes?

A: Yes! This template is open source and free to use for any purpose.

## 🆘 Need Help?

If you encounter any issues:

1. Check the console for error messages (F12 in browser)
2. Make sure all file paths are correct
3. Verify that all required fields in translations.js are filled
4. Try clearing your browser cache
5. Rebuild the project: `npm run build`

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

Happy customizing! 🎉
