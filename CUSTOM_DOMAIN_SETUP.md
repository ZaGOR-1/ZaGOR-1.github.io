# Custom Domain Setup for zagor.me

This guide will help you configure your portfolio to work with the custom domain **zagor.me** and GitHub Pages deployment.

## 🎯 What's Already Configured

- ✅ `vite.config.js` - Base path set to `/` for root domain
- ✅ `package.json` - Homepage URL set to `https://zagor.me/`
- ✅ `public/CNAME` - CNAME file created with `zagor.me`
- ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment

## 🚀 Step-by-Step Setup

### Step 1: Push to GitHub Repository

Make sure your code is pushed to the repository:

```bash
git add .
git commit -m "Configure for zagor.me custom domain"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/ZaGOR-1/ZaGOR-1.github.io
2. Click on **Settings** tab
3. Click on **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 3: Configure DNS Records

Go to your domain registrar's DNS management panel (Namecheap, Google Domains, Cloudflare, etc.) and add the following DNS records:

#### Option 1: Using A Records (Recommended)

| Type  | Name | Value              | TTL  |
|-------|------|--------------------|------|
| A     | @    | 185.199.108.153    | Auto |
| A     | @    | 185.199.109.153    | Auto |
| A     | @    | 185.199.110.153    | Auto |
| A     | @    | 185.199.111.153    | Auto |
| CNAME | www  | zagor-1.github.io  | Auto |

#### Option 2: Using CNAME (Alternative)

| Type  | Name | Value              | TTL  |
|-------|------|--------------------|------|
| CNAME | @    | zagor-1.github.io  | Auto |

**Note:** Some DNS providers don't allow CNAME for root domain (@). In that case, use Option 1 with A records.

### Step 4: Verify Custom Domain on GitHub

1. Go to Settings → Pages in your repository
2. You should see "Custom domain" field with `zagor.me` already configured
3. Wait for DNS check to complete (green checkmark)
4. Enable **Enforce HTTPS** checkbox once DNS is verified

### Step 5: Wait for DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to propagate globally.

**Check DNS propagation:**
- Online tool: https://dnschecker.org
- Command line: `nslookup zagor.me`
- Command line: `dig zagor.me`

## 🌐 Your Site URLs

Once configured, your portfolio will be accessible at:

- **Primary:** https://zagor.me
- **With www:** https://www.zagor.me (redirects to zagor.me)
- **GitHub Pages:** https://zagor-1.github.io (redirects to zagor.me)

## 🔄 Automatic Updates

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your site
2. Deploy to GitHub Pages
3. Make it available on zagor.me

```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push origin main
# Wait 2-3 minutes for automatic deployment
```

## 🔒 SSL Certificate

GitHub Pages automatically provides a free SSL certificate for your custom domain:
- Certificate is issued by Let's Encrypt
- Auto-renews every 90 days
- Enable "Enforce HTTPS" in Settings → Pages after DNS verification

## 🛠️ Troubleshooting

### DNS not resolving

```bash
# Check if DNS is configured correctly
nslookup zagor.me

# Should return:
# Non-authoritative answer:
# Name: zagor.me
# Address: 185.199.108.153
# (and other IP addresses)
```

### HTTPS not working

1. Wait for DNS to fully propagate (up to 48 hours)
2. Go to Settings → Pages
3. Uncheck and re-check "Enforce HTTPS"
4. Wait 10-15 minutes for certificate issuance

### Custom domain shows 404

1. Check that `public/CNAME` file exists and contains `zagor.me`
2. Rebuild and redeploy:
   ```bash
   git commit --allow-empty -m "Trigger rebuild"
   git push origin main
   ```
3. Check GitHub Actions tab for deployment status

### Site works on zagor-1.github.io but not on zagor.me

1. Verify DNS records are correct
2. Check DNS propagation with `nslookup zagor.me`
3. Wait for DNS to propagate globally (up to 48 hours)
4. Clear your browser cache or try incognito mode

## 📋 DNS Configuration Examples

### Namecheap

1. Go to Dashboard → Domain List
2. Click "Manage" next to your domain
3. Go to "Advanced DNS" tab
4. Add the A and CNAME records as specified above

### Cloudflare

1. Go to DNS settings for your domain
2. Add A records for @ pointing to GitHub IPs
3. Add CNAME record for www pointing to zagor-1.github.io
4. Make sure proxy status (orange cloud) is OFF for GitHub Pages

### Google Domains

1. Go to DNS settings
2. Click "Manage custom records"
3. Add the A and CNAME records as specified above

## 📞 Need Help?

If you encounter issues:
1. Check [GitHub Pages Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
2. Review deployment logs in the Actions tab
3. Verify local build works: `npm run build && npm run preview`
4. Check that base path in `vite.config.js` is set to `'/'`

---

**Good luck with your portfolio! 🚀**
