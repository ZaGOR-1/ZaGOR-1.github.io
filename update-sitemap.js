import { writeFileSync } from 'fs';
import { join } from 'path';

const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

const generateSitemap = () => {
  const baseUrl = 'https://zagor.me';
  const currentDate = getCurrentDate();
  
  const pages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/#about', priority: '0.8', changefreq: 'monthly' },
    { loc: '/#skills', priority: '0.8', changefreq: 'monthly' },
    { loc: '/#education', priority: '0.7', changefreq: 'yearly' },
    { loc: '/#experience', priority: '0.9', changefreq: 'monthly' },
    { loc: '/#projects', priority: '0.9', changefreq: 'weekly' },
    { loc: '/#contact', priority: '0.8', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.loc === '/' ? `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="uk" href="${baseUrl}/?lang=uk"/>` : ''}
  </url>`).join('')}
  
</urlset>
`;

  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Sitemap generated successfully at:', sitemapPath);
  console.log(`📅 Last modified: ${currentDate}`);
};

generateSitemap();
