# 🚀 Deployment Guide

Complete guide for deploying your portfolio to various hosting platforms.

## 📋 Table of Contents

1. [GitHub Pages (Recommended)](#github-pages-recommended)
2. [Vercel](#vercel)
3. [Netlify](#netlify)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Other Options](#other-options)

---

## 🐙 GitHub Pages (Recommended)

**Best for**: Free hosting, custom domains, automatic deployment from GitHub.

### Quick Setup (5 minutes)

#### 1. Enable GitHub Pages

1. Go to: https://github.com/ZaGOR-1/ZaGOR-1.github.io/settings/pages
2. Under **"Source"**, select: **"GitHub Actions"**
3. Click **Save**

#### 2. Push Your Code

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### 3. Monitor Deployment

- Go to **Actions** tab: https://github.com/ZaGOR-1/ZaGOR-1.github.io/actions
- Wait 2-3 minutes for deployment
- Your site is live! 🎉

#### 4. Access Your Site

- GitHub Pages: **https://zagor-1.github.io/**
- Custom domain: **https://zagor.me/** (after DNS setup)

### What's Pre-configured

- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Vite configured for root domain (`base: '/'`)
- ✅ `.nojekyll` file (disables Jekyll processing)
- ✅ CNAME file for custom domain support
- ✅ Automatic deployment on push to main

### Custom Domain Setup

See [Custom Domain Setup](#custom-domain-setup) section below.

### Troubleshooting

**Build Failed?**
- Check Actions tab for error logs
- Verify `package.json` scripts are correct
- Ensure Node version is compatible (v14+)

**Site Not Updating?**
- Clear browser cache (Ctrl+Shift+R)
- Wait a few minutes for GitHub CDN to update
- Check Actions tab to verify deployment completed

**404 Errors?**
- Verify GitHub Pages source is set to "GitHub Actions"
- Check that `base: '/'` in `vite.config.js`
- Ensure `.nojekyll` file exists in `public/`

---

## ⚡ Vercel

**Best for**: Instant deployments, preview environments, analytics.

### Method 1: Deploy via Vercel Website (Easiest)

1. **Create Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click **"Add New"** → **"Project"**
   - Select your GitHub repository
   - Vercel automatically detects Vite configuration

3. **Configure (Auto-detected)**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes
   - Your site is live! 🎉

5. **Get Your URL**
   - Vercel provides: `your-project.vercel.app`
   - Add custom domain in Project Settings → Domains

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Custom Domain on Vercel

1. Go to Project Settings → **Domains**
2. Click **"Add"**
3. Enter your domain: `zagor.me`
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

### Continuous Deployment

- Every push to `main` → production deployment
- Every pull request → preview deployment
- Free SSL certificate
- Automatic performance optimization
- Edge network (fast globally)

---

## 🔷 Netlify

**Best for**: Forms, serverless functions, split testing.

### Method 1: Deploy via Netlify Website

1. **Create Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **New Site from Git**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose GitHub
   - Select your repository

3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click **"Deploy site"**

4. **Site is Live!**
   - Netlify provides: `random-name-123456.netlify.app`
   - Rename in Site settings
   - Add custom domain

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Custom Domain on Netlify

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `zagor.me`
4. Configure DNS (Netlify provides instructions)
5. Enable HTTPS

### Netlify Features

- Instant cache invalidation
- Deploy previews for PRs
- Form handling (built-in)
- Serverless functions
- Split testing
- Free SSL certificates

---

## 🌍 Custom Domain Setup

Complete guide for setting up `zagor.me` domain.

### Step 1: Configure DNS Records

Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these DNS records:

#### For GitHub Pages:

**A Records** (add all 4):
```
Type: A
Host: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600
```
```
Type: A
Host: @
Value: 185.199.109.153
TTL: 3600
```
```
Type: A
Host: @
Value: 185.199.110.153
TTL: 3600
```
```
Type: A
Host: @
Value: 185.199.111.153
TTL: 3600
```

**CNAME Record** (for www):
```
Type: CNAME
Host: www
Value: zagor-1.github.io
TTL: 3600
```

#### For Vercel:

Follow Vercel's specific DNS instructions (they provide custom nameservers or CNAME records).

#### For Netlify:

```
Type: A
Host: @
Value: 75.2.60.5
TTL: 3600
```
```
Type: CNAME
Host: www
Value: your-site.netlify.app
TTL: 3600
```

### Step 2: Verify CNAME File

Ensure `public/CNAME` file exists with content:
```
zagor.me
```

### Step 3: Configure on Hosting Platform

**GitHub Pages:**
1. Go to Settings → Pages
2. Enter custom domain: `zagor.me`
3. Click Save
4. Enable "Enforce HTTPS"

**Vercel:**
1. Project Settings → Domains
2. Add domain: `zagor.me`
3. Follow verification steps

**Netlify:**
1. Site settings → Domain management
2. Add custom domain: `zagor.me`
3. Verify domain

### Step 4: Wait for DNS Propagation

- **Typical time**: 5-30 minutes
- **Maximum time**: 24-48 hours
- **Check status**: https://dnschecker.org

### Step 5: Enable HTTPS

**GitHub Pages:**
- Automatically provisions SSL certificate (Let's Encrypt)
- Enable "Enforce HTTPS" after DNS verifies (may take 24 hours)

**Vercel & Netlify:**
- Automatically provision SSL certificates
- HTTPS enabled immediately after domain verification

### DNS Troubleshooting

**Domain not resolving?**
```bash
# Check DNS records
nslookup zagor.me

# Check A records
dig zagor.me

# Check CNAME
dig www.zagor.me
```

**Still not working?**
- Verify DNS records are correct (check for typos)
- Wait longer (DNS can take up to 48 hours)
- Clear DNS cache:
  - Windows: `ipconfig /flushdns`
  - Mac: `sudo dscacheutil -flushcache`
  - Linux: `sudo systemd-resolve --flush-caches`
- Contact domain registrar support

**HTTPS errors?**
- Wait 24 hours after DNS setup
- Verify domain ownership
- Check hosting provider SSL settings
- Try disabling/re-enabling HTTPS

---

## 🌐 Other Options

### AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Configure build:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy

### Surge.sh (Quick Deploy)

```bash
# Install Surge
npm install -g surge

# Build
npm run build

# Deploy
cd dist
surge
```

---

## 📊 Comparison Table

| Feature | GitHub Pages | Vercel | Netlify |
|---------|-------------|--------|---------|
| **Price** | Free | Free (hobby) | Free (personal) |
| **Build Time** | 2-3 min | 1-2 min | 1-2 min |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free |
| **SSL Certificate** | ✅ Free | ✅ Free | ✅ Free |
| **Auto Deploy** | ✅ Git push | ✅ Git push | ✅ Git push |
| **Preview Deploys** | ❌ | ✅ | ✅ |
| **Analytics** | ❌ | ✅ Limited | ✅ Limited |
| **Forms** | ❌ | ❌ | ✅ |
| **Functions** | ❌ | ✅ | ✅ |
| **Bandwidth** | 100GB/month | 100GB/month | 100GB/month |
| **Build Minutes** | Unlimited | 100 hours/month | 300 minutes/month |
| **Global CDN** | ✅ | ✅ | ✅ |

---

## 🔄 Continuous Deployment

All platforms support automatic deployment:

1. **Push to main branch**
```bash
git add .
git commit -m "Update content"
git push origin main
```

2. **Automatic build & deploy**
   - Platform detects changes
   - Runs `npm run build`
   - Deploys to production
   - Usually takes 2-3 minutes

3. **Verify deployment**
   - Check build logs
   - Visit your site
   - Test functionality

---

## 📝 Deployment Checklist

Before deploying:

- [ ] Test build locally: `npm run build`
- [ ] Preview build: `npm run preview`
- [ ] Update content (personal info, projects, etc.)
- [ ] Add resume PDF
- [ ] Add images
- [ ] Update social links
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Commit all changes
- [ ] Push to GitHub

After deploying:

- [ ] Verify site loads correctly
- [ ] Test all links
- [ ] Check images load
- [ ] Test contact form
- [ ] Verify mobile responsiveness
- [ ] Test dark/light theme
- [ ] Check language switching
- [ ] Test download resume button
- [ ] Configure custom domain (if applicable)
- [ ] Enable HTTPS
- [ ] Add site to Google Search Console
- [ ] Set up analytics (optional)

---

## 🆘 Getting Help

- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **DNS Help**: [dnschecker.org](https://dnschecker.org)

---

**Ready to deploy? Pick a platform and follow the guide above! 🚀**
