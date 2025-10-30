# 🎯 Getting Started Guide

Швидкий старт для роботи з проектом - від встановлення до деплою.

---

## ⚡ Швидкий старт (5 хвилин)

### 🚀 1. Install Dependencies

```bash
npm install
```

### 🎨 2. Customize Your Info

#### Basic Information

Open `src/data/translations.js` and update:

```javascript
// Your name and role
hero: {
  name: 'Your Name',              // Change this
  role: 'Your Job Title',          // Change this
  description: 'Your description', // Change this
}
```

#### Contact Information

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

#### Social Links

Edit `src/components/Hero.jsx` (line ~40):

```javascript
const socialLinks = [
  { icon: Github, url: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  // Update these URLs
];
```

### 📸 3. Add Your Images

Add these images to `public/images/`:
- `profile.jpg` - Your photo (400x400px recommended)
- `about.jpg` - About section image
- `project1.jpg` to `project4.jpg` - Your project screenshots

💡 **Tip**: The site uses placeholder images if you don't add these yet!

### 📄 4. Add Your Resume

Replace `public/resume.pdf` with your actual resume PDF file.

### ✅ 5. Check Your Setup

```bash
npm run check
```

This will verify all required files are in place.

### 🎉 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎯 Customization Priority

### 1. ✅ **Must Update First**:
- Name and role
- Contact email
- Social media links
- Resume PDF

### 2. 🎨 **Important**:
- About section bio
- Skills list
- Projects
- Profile photo

### 3. 💅 **Nice to Have**:
- Color scheme
- Additional images
- Extra projects
- Certifications

---

## 📚 Next Steps

- **Customize Content**: Update projects, skills, experience in `src/data/translations.js`
- **Change Colors**: Edit `tailwind.config.js` for different colors
- **Read Guides**:
  - `README.md` - Full project overview
  - `docs/CUSTOMIZATION.md` - Detailed customization guide
  - `docs/DEPLOYMENT.md` - Complete deployment guide

---

## 🌐 7. Deploy (When Ready)

### Option 1: GitHub Pages (рекомендовано для zagor.me)

#### Крок 1: Створіть репозиторій на GitHub

👉 Перейдіть на: https://github.com/new

- **Назва**: `ZaGOR-1.github.io` (для основного домену)
- **Видимість**: Public
- **НЕ** додавайте README або .gitignore
- Натисніть **Create repository**

#### Крок 2: Завантажте код

```bash
# Встановіть remote URL
git remote set-url origin https://github.com/ZaGOR-1/ZaGOR-1.github.io.git

# Або додайте новий remote
git remote add origin https://github.com/ZaGOR-1/ZaGOR-1.github.io.git

# Завантажте код
git push -u origin main
```

#### Крок 3: Увімкніть GitHub Pages

👉 Перейдіть на: https://github.com/ZaGOR-1/ZaGOR-1.github.io/settings/pages

- В **Source** виберіть: **GitHub Actions**
- Збережіть

#### Крок 4: Дочекайтесь деплою (2-3 хв)

👉 Перевірте статус: https://github.com/ZaGOR-1/ZaGOR-1.github.io/actions

#### Крок 5: Відкрийте сайт! 🎉

👉 **https://zagor-1.github.io**

---

### Option 2: Vercel (Easiest - 2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Click "Deploy"
6. Done! ✨

---

### Option 3: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Select your repository
5. Click "Deploy"
6. Done! ✨

---

## 🌐 Налаштування кастомного домену (zagor.me)

### Налаштуйте DNS у вашого реєстратора:

#### Додайте 4 A записи:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### Додайте CNAME запис:
```
www → zagor-1.github.io
```

### Верифікація на GitHub

Файл `CNAME` вже створено в `public/`, тому GitHub автоматично налаштує кастомний домен.

1. Перейдіть на https://github.com/ZaGOR-1/ZaGOR-1.github.io/settings/pages
2. Дочекайтесь перевірки DNS (зелена галочка біля "DNS check successful")
3. Увімкніть **"Enforce HTTPS"**

### Дочекайтесь поширення DNS

DNS зміни можуть зайняти від 5 хвилин до 48 годин.

Перевірити статус:
- https://dnschecker.org (введіть zagor.me)
- Або в терміналі: `nslookup zagor.me`

---

## 🔄 Оновлення сайту

### Після налаштування GitHub Pages:

```bash
# Внесіть зміни у код
git add .
git commit -m "Update content"
git push origin main
```

GitHub Actions автоматично задеплоїть зміни на сайт через 2-3 хвилини! ✨

---

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

**Сайт не відкривається на zagor.me:**
- Перевірте DNS записи
- Дочекайтесь поширення DNS (до 48 годин)
- Спробуйте очистити кеш браузера

**GitHub Actions падає з помилкою:**
- Перевірте вкладку Actions для деталей помилки
- Переконайтеся що локально `npm run build` працює
- Перевірте що налаштування Pages встановлено на "GitHub Actions"

**404 на zagor-1.github.io:**
- Перевірте що файл `public/CNAME` містить `zagor.me`
- Перезавантажте деплой: `git commit --allow-empty -m "Redeploy" && git push`

---

## 💡 Pro Tips

1. **Test on mobile**: Your portfolio will be viewed on phones!
2. **Keep it updated**: Add new projects regularly
3. **Use real data**: Actual projects > placeholder content
4. **Optimize images**: Compress before adding
5. **Get feedback**: Ask friends to review

---

## 🛠️ ШВИДКІ КОМАНДИ

```bash
# Розробка
npm run dev              # Запустити dev сервер
npm run build            # Build для продакшена
npm run preview          # Перегляд build

# Корисні скрипти
npm run update-sitemap   # Оновити sitemap.xml
npm run generate-resume  # Згенерувати PDF резюме

# Перевірка
npm run check            # Перевірити setup
```

---

## 📚 Детальні інструкції

Якщо потрібно більше деталей:

- 🇺🇦 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Повна інструкція з деплою
- 🇬🇧 **[CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md)** - English guide
- ✅ **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Що було зроблено
- 📋 **[CHECKLIST.md](./CHECKLIST.md)** - Контрольні списки
- ⚡ **[COMMANDS.md](./COMMANDS.md)** - Всі команди

---

## 🎊 You're All Set!

Your portfolio is ready to impress! Keep it updated with your latest work and achievements.

**Good luck!** 🚀

---

**За 5 хвилин ваш сайт буде онлайн! 🚀**
