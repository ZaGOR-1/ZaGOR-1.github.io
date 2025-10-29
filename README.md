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

### GitHub Pages (Automatic Deployment) ⭐

This project is **already configured** for automatic deployment to GitHub Pages with custom domain support! 

**Quick Setup:**

1. Go to your repository settings on GitHub: https://github.com/ZaGOR-1/ZaGOR-1.github.io
2. Navigate to Settings → Pages
3. Under "Source", select **"GitHub Actions"**
4. Push your changes to the `main` branch
5. Your site will be live at:
   - **Primary:** `https://zagor.me` (custom domain)
   - **GitHub Pages:** `https://zagor-1.github.io`

Every time you push to `main`, your site will automatically rebuild and redeploy!

📖 **Detailed instructions:**
- [GITHUB_PAGES_SETUP_UK.md](./GITHUB_PAGES_SETUP_UK.md) (in Ukrainian)
- [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) (in English - Custom Domain Guide)

**What's already configured:**
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Vite base URL configured for root domain (`/`)
- ✅ `.nojekyll` file to prevent Jekyll processing
- ✅ Homepage URL in package.json pointing to zagor.me
- ✅ CNAME file for custom domain configuration

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

📖 **More deployment options:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📝 Tips for Students

1. **Keep it Simple**: Start by updating text and images, then gradually customize colors and layouts
2. **Test Responsiveness**: Check your site on different screen sizes
3. **Optimize Images**: Compress images before adding them to reduce load time
4. **Update Content Regularly**: Keep your projects and skills up to date
5. **Add Analytics**: Consider adding Google Analytics to track visitors
6. **SEO**: Update meta tags in `index.html` for better search engine visibility
7. **Performance**: Run `npm run build` and check the bundle size

## 🐛 Troubleshooting

### Images Not Showing

- Make sure images are in the `public/images/` directory
- Check that image paths in `translations.js` are correct
- The site uses fallback placeholder images if originals are not found

### Build Errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Make sure you're using Node.js v14 or higher

### Styling Issues

- Clear browser cache
- Check that Tailwind CSS is properly configured
- Verify that `index.css` imports Tailwind directives

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you find bugs or have suggestions, please open an issue.

## 📧 Contact

For questions or support, please contact [your.email@example.com](mailto:your.email@example.com)

---

**Made with ❤️ and React**
