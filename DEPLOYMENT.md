# Deployment Guide

This guide will help you deploy your portfolio website to various hosting platforms.

## 📋 Table of Contents

1. [Vercel (Recommended)](#vercel-recommended)
2. [Netlify](#netlify)
3. [GitHub Pages](#github-pages)
4. [Other Options](#other-options)

## 🚀 Vercel (Recommended)

Vercel is the easiest and fastest way to deploy your React application.

### Method 1: Deploy via Vercel Website (Easiest)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will automatically detect Vite

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 1-2 minutes)
   - Your site is live! 🎉

5. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

### Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch auto-deploys to production
- Every pull request creates a preview deployment
- Free SSL certificate included
- Automatic performance optimization

---

## 🔷 Netlify

Netlify is another excellent free hosting option with great features.

### Method 1: Deploy via Netlify Website

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Site is live!

4. **Custom Domain**
   - Site settings → Domain management
   - Add custom domain
   - Configure DNS

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Initialize**
```bash
netlify init
```

4. **Deploy**
```bash
# Deploy to draft
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Netlify Configuration File

Create `netlify.toml` in root directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📘 GitHub Pages

GitHub Pages is free hosting directly from your GitHub repository.

### Setup

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/repository-name/', // Replace with your repo name
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)
   - Save

6. **Wait & Visit**
   - Wait 2-3 minutes for deployment
   - Visit: `https://yourusername.github.io/repository-name`

### Updating Your Site

Every time you want to update:
```bash
npm run deploy
```

---

## 🌐 Other Options

### Firebase Hosting

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login**
```bash
firebase login
```

3. **Initialize**
```bash
firebase init hosting
```

Select:
- Public directory: `dist`
- Single-page app: Yes
- GitHub deploys: No (for now)

4. **Build and Deploy**
```bash
npm run build
firebase deploy
```

### Render

1. **Create Account** at [render.com](https://render.com)
2. **New Static Site** from Git
3. **Configure**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. **Deploy**

### Railway

1. **Create Account** at [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. **Configure**:
   - Build Command: `npm run build`
   - Start Command: `npx serve dist`
4. **Deploy**

### Cloudflare Pages

1. **Create Account** at [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create Application** → Connect to Git
3. **Configure**:
   - Framework: Vite
   - Build command: `npm run build`
   - Build output: `dist`
4. **Deploy**

---

## 🔧 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All personal information is updated
- [ ] All images are added or placeholders work
- [ ] Resume PDF is added to `public/` folder
- [ ] Social media links are correct
- [ ] Contact form is configured (if using external service)
- [ ] All console errors are fixed
- [ ] Site tested on mobile devices
- [ ] Build runs successfully: `npm run build`
- [ ] Preview works: `npm run preview`
- [ ] Meta tags in `index.html` are updated
- [ ] Environment variables are set (if any)

---

## 🐛 Common Deployment Issues

### Issue: 404 on Page Refresh

**Solution**: Configure redirects for SPA

For Netlify, add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

For Vercel, add `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Issue: Images Not Loading

**Solution**: Check image paths
- Use relative paths starting with `/`
- Example: `/images/profile.jpg` not `./images/profile.jpg`

### Issue: Environment Variables

**Solution**: Set environment variables in hosting platform

Vercel:
- Project Settings → Environment Variables
- Add variables
- Redeploy

Netlify:
- Site settings → Environment variables
- Add variables
- Trigger deploy

### Issue: Build Fails

**Solution**: Check build logs
1. Look for error messages in build logs
2. Test build locally: `npm run build`
3. Check Node.js version compatibility
4. Clear node_modules: `rm -rf node_modules && npm install`

### Issue: Large Bundle Size

**Solution**: Optimize build
1. Remove unused dependencies
2. Use code splitting
3. Optimize images (compress, use WebP)
4. Lazy load components

---

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
   - Use [TinyPNG](https://tinypng.com/)
   - Convert to WebP format
   - Maximum 500KB per image

2. **Audit Performance**
```bash
npm run build
npm run preview
```
Then run Lighthouse audit in Chrome DevTools

3. **Check Bundle Size**
```bash
npm run build
```
Look at the dist/ folder size

### Post-Deployment

1. **Enable Compression**
   - Most hosting platforms enable gzip/brotli automatically
   - Verify in Network tab of DevTools

2. **CDN Configuration**
   - Vercel and Netlify include global CDN
   - Cloudflare provides additional CDN layer

3. **Monitoring**
   - Use Google Analytics for visitor tracking
   - Use Vercel/Netlify analytics for performance metrics

---

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to Git
   - Use `.env` files for development
   - Set environment variables in hosting platform

2. **API Keys**
   - Keep API keys in environment variables
   - Use server-side functions for sensitive operations

3. **HTTPS**
   - All recommended platforms provide free SSL
   - Force HTTPS in deployment settings

---

## 📈 Post-Deployment

### Custom Domain Setup

Most platforms support custom domains:

1. **Purchase Domain**
   - Namecheap, Google Domains, GoDaddy, etc.

2. **Configure DNS**
   - Point A record to hosting platform IP
   - Or use CNAME to hosting platform URL

3. **Verify Domain**
   - Wait for DNS propagation (up to 48 hours)
   - Verify in hosting platform

### Analytics Setup

Add Google Analytics to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### SEO Optimization

Update `index.html`:

```html
<head>
  <meta name="description" content="Your portfolio description">
  <meta name="keywords" content="developer, portfolio, react, web development">
  <meta property="og:title" content="Your Name - Portfolio">
  <meta property="og:description" content="Your portfolio description">
  <meta property="og:image" content="/images/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

---

## 📞 Support

If you encounter deployment issues:

1. Check hosting platform documentation
2. Review build logs for errors
3. Test build locally first
4. Check platform status pages
5. Contact platform support

---

## 🎉 Congratulations!

Your portfolio is now live and accessible to the world! 

Don't forget to:
- Share your portfolio URL on social media
- Add it to your resume
- Update it regularly with new projects
- Monitor performance and analytics

**Good luck with your job search!** 🚀
