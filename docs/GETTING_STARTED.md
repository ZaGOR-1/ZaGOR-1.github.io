# 🚀 Getting Started

Quick guide to get your portfolio up and running in 5-10 minutes!

## 📋 Table of Contents

1. [Local Development](#local-development)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Custom Domain Setup](#custom-domain-setup)
4. [Updating Your Site](#updating-your-site)

---

## 🖥️ Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository:**
```bash
git clone https://github.com/ZaGOR-1/ZaGOR-1.github.io.git
cd ZaGOR-1.github.io
```

2. **Install dependencies:**
```bash
npm install
```

3. **Customize Your Info**

Open `src/data/translations.js` and update:

```javascript
// Your name and role
hero: {
  name: 'Your Name',              // Change this
  role: 'Your Job Title',          // Change this
  description: 'Your description', // Change this
}

// Contact information
contact: {
  info: {
    email: 'your.email@example.com',
    phone: '+XX (XX) XXX-XX-XX',
    locationValue: 'Your City, Country',
  },
}
```

4. **Add Your Images**

Add these images to `public/images/`:
- `profile.jpg` - Your photo (400x400px recommended)
- `about.jpg` - About section image
- `project1.jpg` to `project4.jpg` - Your project screenshots

💡 **Tip**: The site uses placeholder images if you don't add these yet!

5. **Add Your Resume**

Replace `public/resume.pdf` with your actual resume PDF file.

6. **Start Development Server:**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

7. **Build for Production:**
```bash
npm run build
```

8. **Preview Production Build:**
```bash
npm run preview
```

---

## 🌐 GitHub Pages Deployment

Your site is **already configured** for automatic deployment to GitHub Pages!

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/ZaGOR-1/ZaGOR-1.github.io
2. Navigate to **Settings** → **Pages**
3. Under **"Source"**, select **"GitHub Actions"**
4. Click **Save**

### Step 2: Push Your Changes

```bash
git add .
git commit -m "Enable GitHub Pages automatic deployment"
git push origin main
```

### Step 3: Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait 2-3 minutes for deployment to complete ⏱️

### Step 4: Open Your Site! 🎉

Your site will be live at:
- **https://zagor-1.github.io/** (GitHub Pages)
- **https://zagor.me/** (custom domain - after DNS setup)

### What's Already Configured:

- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Vite base URL configured for root domain (`/`)
- ✅ `.nojekyll` file to prevent Jekyll processing
- ✅ Homepage URL in package.json
- ✅ CNAME file for custom domain

---

## 🌍 Custom Domain Setup (zagor.me)

### DNS Configuration

Configure these DNS records with your domain registrar:

**A Records (for @ root domain):**
```
Host: @
Value: 185.199.108.153
```
```
Host: @
Value: 185.199.109.153
```
```
Host: @
Value: 185.199.110.153
```
```
Host: @
Value: 185.199.111.153
```

**CNAME Record (for www subdomain):**
```
Host: www
Value: zagor-1.github.io
```

### Verification

1. Wait 5 minutes to 48 hours for DNS propagation
2. Check DNS status: https://dnschecker.org
3. Enter your domain: `zagor.me`
4. Verify all A records are correct

### GitHub Pages Custom Domain

1. Go to: https://github.com/ZaGOR-1/ZaGOR-1.github.io/settings/pages
2. In **"Custom domain"** field, enter: `zagor.me`
3. Click **Save**
4. Wait for DNS check to complete
5. Enable **"Enforce HTTPS"** (recommended)

### Troubleshooting

**Domain not working?**
- Check DNS records are correct
- Wait longer for DNS propagation (can take up to 48 hours)
- Verify CNAME file exists in repository root: `public/CNAME`

**HTTPS not working?**
- Wait 24-48 hours after DNS setup
- GitHub automatically provisions SSL certificate
- Make sure "Enforce HTTPS" is enabled in Pages settings

---

## 🔄 Updating Your Site

After initial setup, updating is super easy!

### Making Changes

1. Edit your content (update translations, add projects, etc.)
2. Test locally:
```bash
npm run dev
```

3. Build and preview:
```bash
npm run build
npm run preview
```

4. Push changes:
```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

5. Wait 2-3 minutes - your site automatically rebuilds and redeploys! ✨

### What to Update

**Must Update:**
- Personal information (name, role, description)
- Contact details (email, phone)
- Social media links
- Resume PDF

**Should Update:**
- About section bio
- Skills list
- Projects
- Profile photo
- Experience and education

**Optional:**
- Color scheme (tailwind.config.js)
- Additional images
- Theme customization

---

## ✅ Setup Checklist

Use this checklist to ensure everything is configured:

- [ ] Installed dependencies (`npm install`)
- [ ] Updated personal info in `translations.js`
- [ ] Added profile photo (`public/images/profile.jpg`)
- [ ] Updated resume PDF (`public/resume.pdf`)
- [ ] Updated social media links
- [ ] Tested locally (`npm run dev`)
- [ ] Created GitHub repository `ZaGOR-1.github.io`
- [ ] Pushed code to GitHub
- [ ] Enabled GitHub Pages (Settings → Pages → GitHub Actions)
- [ ] Verified site is live at zagor-1.github.io
- [ ] (Optional) Configured custom domain DNS
- [ ] (Optional) Verified custom domain works

---

## 🆘 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Showing

- Make sure images are in `public/images/` directory
- Check file names match exactly (case-sensitive)
- Verify image paths in `translations.js`
- The site uses fallback placeholder images if originals are missing

### Deployment Failed

- Check Actions tab for error messages
- Verify GitHub Pages is enabled with "GitHub Actions" source
- Make sure repository is public
- Check that `.github/workflows/deploy.yml` file exists

### Port Already in Use

```bash
# Kill process on port 5173
# On Linux/Mac:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 📚 Next Steps

- **Full Documentation**: [README.md](./README.md)
- **Customization Guide**: [CUSTOMIZATION.md](./CUSTOMIZATION.md)
- **Deployment Options**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Performance Guide**: [PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 💡 Pro Tips

1. **Test on mobile**: Use Chrome DevTools mobile view
2. **Optimize images**: Compress images before adding (use tinypng.com)
3. **Keep it updated**: Add new projects regularly
4. **Get feedback**: Ask friends to review your portfolio
5. **Monitor analytics**: Consider adding Google Analytics
6. **Check performance**: Run Lighthouse audits regularly

---

**🎉 You're all set! Happy coding!**
