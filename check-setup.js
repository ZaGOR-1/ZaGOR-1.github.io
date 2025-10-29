#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Checking Portfolio Setup...\n');

const checks = [
  {
    name: 'Resume PDF',
    path: 'public/resume.pdf',
    message: '⚠️  Add your resume.pdf to the public/ folder',
    optional: false
  },
  {
    name: 'Profile Image',
    path: 'public/images/profile.jpg',
    message: 'ℹ️  Optional: Add profile.jpg to public/images/ (will use placeholder)',
    optional: true
  },
  {
    name: 'About Image',
    path: 'public/images/about.jpg',
    message: 'ℹ️  Optional: Add about.jpg to public/images/ (will use placeholder)',
    optional: true
  },
  {
    name: 'Project Images',
    path: 'public/images/project1.jpg',
    message: 'ℹ️  Optional: Add project images to public/images/ (will use placeholders)',
    optional: true
  },
  {
    name: 'Translations',
    path: 'src/data/translations.js',
    message: '✅ Translations file exists',
    optional: false
  }
];

let allRequired = true;

checks.forEach(check => {
  const fullPath = path.join(__dirname, check.path);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    console.log(`✅ ${check.name}`);
  } else {
    if (check.optional) {
      console.log(`${check.message}`);
    } else {
      console.log(`❌ ${check.name}: ${check.message}`);
      allRequired = false;
    }
  }
});

console.log('\n📝 Customization Reminders:');
console.log('1. Update personal information in src/data/translations.js');
console.log('2. Update social media links in src/components/Hero.jsx and Footer.jsx');
console.log('3. Update contact information in src/data/translations.js');
console.log('4. Add your projects, skills, and experience');

console.log('\n🚀 Ready to start?');
console.log('Run: npm run dev');

console.log('\n📚 For detailed instructions:');
console.log('- Read README.md for overview');
console.log('- Read CUSTOMIZATION.md for customization guide');
console.log('- Read DEPLOYMENT.md for deployment guide');

if (allRequired) {
  console.log('\n✨ All required files are present! You\'re ready to customize your portfolio.\n');
  process.exit(0);
} else {
  console.log('\n⚠️  Some required files are missing. Please add them before deploying.\n');
  process.exit(1);
}
