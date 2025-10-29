# Quick Start Guide

Get your portfolio up and running in 5 minutes! ⚡

## 🚀 1. Install Dependencies

```bash
npm install
```

## 🎨 2. Customize Your Info

### Basic Information

Open `src/data/translations.js` and update:

```javascript
// Your name and role
hero: {
  name: 'Your Name',              // Change this
  role: 'Your Job Title',          // Change this
  description: 'Your description', // Change this
}
```

### Contact Information

In the same file:

```javascript
contact: {
  info: {
    email: 'your.email@example.com',     // Change this
    phone: '+XX (XX) XXX-XX-XX',         // Change this
    locationValue: 'Your City, Country',  // Change this
  },
}
```

### Social Links

Edit `src/components/Hero.jsx` (line ~40):

```javascript
const socialLinks = [
  { icon: Github, url: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  // Update these URLs
];
```

## 📸 3. Add Your Images

Add these images to `public/images/`:
- `profile.jpg` - Your photo (400x400px recommended)
- `about.jpg` - About section image
- `project1.jpg` to `project4.jpg` - Your project screenshots

💡 **Tip**: The site uses placeholder images if you don't add these yet!

## 📄 4. Add Your Resume

Replace `public/resume.pdf` with your actual resume PDF file.

## ✅ 5. Check Your Setup

```bash
npm run check
```

This will verify all required files are in place.

## 🎉 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 7. Deploy (When Ready)

### Option 1: Vercel (Easiest - 2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Click "Deploy"
6. Done! ✨

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Select your repository
5. Click "Deploy"
6. Done! ✨

## 📚 Next Steps

- **Customize Content**: Update projects, skills, experience in `src/data/translations.js`
- **Change Colors**: Edit `tailwind.config.js` for different colors
- **Read Guides**:
  - `README.md` - Full project overview
  - `CUSTOMIZATION.md` - Detailed customization guide
  - `DEPLOYMENT.md` - Complete deployment guide

## 🆘 Need Help?

### Common Issues

**Build fails?**
```bash
rm -rf node_modules
npm install
npm run build
```

**Images not showing?**
- Check file names match exactly
- Images should be in `public/images/`
- Site uses fallback placeholders if images missing

**Can't start dev server?**
```bash
# Make sure port 5173 is free
# Try closing other running apps
npm run dev
```

## 🎯 Customization Priority

1. ✅ **Must Update First**:
   - Name and role
   - Contact email
   - Social media links
   - Resume PDF

2. 🎨 **Important**:
   - About section bio
   - Skills list
   - Projects
   - Profile photo

3. 💅 **Nice to Have**:
   - Color scheme
   - Additional images
   - Extra projects
   - Certifications

## 💡 Pro Tips

1. **Test on mobile**: Your portfolio will be viewed on phones!
2. **Keep it updated**: Add new projects regularly
3. **Use real data**: Actual projects > placeholder content
4. **Optimize images**: Compress before adding
5. **Get feedback**: Ask friends to review

## 🎊 You're All Set!

Your portfolio is ready to impress! Keep it updated with your latest work and achievements.

**Good luck!** 🚀
