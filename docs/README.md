# Student Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. Features bilingual support (English/Ukrainian), dark/light theme toggle, and smooth animations.

## 🌟 Features

- **Bilingual Support**: Switch between English and Ukrainian
- **Theme Toggle**: Dark and light mode with localStorage persistence
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Smooth Animations**: Powered by Framer Motion
- **Modern UI**: Glassmorphism effects and gradient designs
- **Interactive Components**: Hover effects, scroll animations, and more
- **Contact Form**: Working contact form with validation
- **Project Showcase**: Filterable project cards
- **Skills Visualization**: Progress bars for skill levels
- **Timeline Experience**: Beautiful experience timeline

## 🚀 Quick Start

**New here? Start with [Getting Started Guide](./GETTING_STARTED.md)** - Complete setup in 5-10 minutes!

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZaGOR-1/ZaGOR-1.github.io.git
cd ZaGOR-1.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation with language/theme toggles
│   ├── Hero.jsx            # Hero section with typing animation
│   ├── About.jsx           # About section with characteristics
│   ├── Skills.jsx          # Skills with progress bars
│   ├── Education.jsx       # Education details
│   ├── Projects.jsx        # Project showcase with filters
│   ├── Experience.jsx      # Experience timeline
│   ├── Contact.jsx         # Contact form
│   └── Footer.jsx          # Footer with social links
├── data/
│   └── translations.js     # All text content in both languages
├── hooks/
│   └── useScrollProgress.js # Custom scroll hooks
├── App.jsx                 # Main app component
├── index.css               # Global styles and Tailwind
└── main.jsx                # Entry point
```

## 🎨 Customization Guide

### 1. Personal Information

Edit `src/data/translations.js` to update your personal information:

```javascript
// Change your name, role, description, etc.
hero: {
  name: 'Your Name',
  role: 'Your Role',
  description: 'Your description...',
  // ...
}
```

### 2. Skills

Update your skills in `src/data/translations.js`:

```javascript
export const skillsData = [
  {
    category: 'frontend',
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      // Add or modify skills here
    ],
  },
  // ...
];
```

### 3. Projects

Add or modify projects in `src/data/translations.js`:

```javascript
projects: {
  list: [
    {
      title: 'Your Project',
      description: 'Project description',
      image: '/images/project1.jpg',
      tags: ['React', 'Node.js'],
      github: 'https://github.com/yourusername/project',
      live: 'https://yourproject.com',
    },
    // Add more projects
  ],
}
```

### 4. Images

Replace placeholder images in the `public/images/` directory:

- `profile.jpg` - Your profile picture
- `about.jpg` - About section image
- `project1.jpg`, `project2.jpg`, etc. - Project screenshots

If images are missing, the site will automatically use placeholder images from external sources.

### 5. Resume PDF

Replace `public/resume.pdf` with your actual resume PDF file.

### 6. Contact Information

Update contact details in `src/data/translations.js` and `src/components/Footer.jsx`:

```javascript
// In translations.js
contact: {
  info: {
    email: 'your.email@example.com',
    phone: '+380 (XX) XXX-XX-XX',
    locationValue: 'Your City, Country',
  },
}

// Update social links in Hero.jsx and Footer.jsx
const socialLinks = [
  { icon: Github, url: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  // ...
];
```

### 7. Color Scheme

Modify colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#3b82f6', // Change primary color
        dark: '#2563eb',
      },
      secondary: {
        DEFAULT: '#8b5cf6', // Change secondary color
        dark: '#7c3aed',
      },
    },
  },
}
```

Or update CSS variables in `src/index.css`:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  /* ... */
}
```

### 8. Experience and Education

Update your work experience and education in `src/data/translations.js`:

```javascript
education: {
  university: 'Your University',
  degree: 'Your Degree',
  period: '2021 - 2025',
  courses: [
    'Course 1',
    'Course 2',
    // ...
  ],
}

experience: {
  list: [
    {
      company: 'Company Name',
      position: 'Your Position',
      period: 'Jan 2023 - Present',
      description: [
        'Achievement 1',
        'Achievement 2',
      ],
    },
  ],
}
```

## 🌐 Deployment

This project is **pre-configured** for automatic deployment to GitHub Pages with custom domain support!

### Quick Deploy to GitHub Pages ⭐

1. Go to Settings → Pages in your repository
2. Select **"GitHub Actions"** as source
3. Push to `main` branch
4. Your site will be live at `https://zagor-1.github.io` or `https://zagor.me`

📖 **Complete deployment guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Supports:**
- ✅ GitHub Pages (automatic deployment)
- ✅ Vercel (instant preview deployments)
- ✅ Netlify (forms and serverless functions)
- ✅ Custom domains (zagor.me)
- ✅ HTTPS/SSL certificates (automatic)

## 🛠️ Technologies Used

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **PDFKit** - Resume generator

## ⚡ Performance

This portfolio is **heavily optimized** for speed:
- 87% smaller main bundle (214 KB → 27 KB)
- Lazy loading for all components
- Service Worker for offline support
- Optimized images and fonts
- 90+ Lighthouse performance score

📖 **Learn more:** [OPTIMIZATION_GUIDE.md](./OPTIMIZATION_GUIDE.md) | [CACHING_GUIDE.md](./CACHING_GUIDE.md)

## 📚 Documentation

### Getting Started
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Complete setup guide (5-10 minutes)
- **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** - How to customize content, colors, and images
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deploy to GitHub Pages, Vercel, or Netlify

### Guides
- **[OPTIMIZATION_GUIDE.md](./OPTIMIZATION_GUIDE.md)** - Performance optimizations explained
- **[CACHING_GUIDE.md](./CACHING_GUIDE.md)** - Caching strategies and PWA features
- **[PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)** - Testing and monitoring performance

### Reference
- **[FEATURES.md](./FEATURES.md)** - Complete list of features
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute

## 🐛 Troubleshooting

### Images Not Showing
- Ensure images are in `public/images/` directory
- Check file paths in `translations.js`
- Site uses fallback placeholders if images missing

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### More Help
See [GETTING_STARTED.md](./GETTING_STARTED.md#troubleshooting) for detailed troubleshooting.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📧 Contact

For questions or support, please contact [your.email@example.com](mailto:your.email@example.com)

---

**Made with ❤️ and React** | **⚡ Optimized for Performance** | **🌐 Deploy in Minutes**
