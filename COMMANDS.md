# ⚡ Швидкі Команди

## 🚀 Розробка

```bash
# Запустити dev сервер
npm run dev

# Build для продакшена
npm run build

# Preview build локально
npm run preview
```

---

## 🛠️ Корисні Скрипти

```bash
# Оновити sitemap.xml (автоматично оновлює дату)
npm run update-sitemap

# Згенерувати PDF резюме
npm run generate-resume

# Перевірити налаштування проекту
npm run check
```

---

## 📦 Встановлення Нових Пакетів

### EmailJS (Контактна форма)
```bash
npm install @emailjs/browser
```

### PWA Plugin
```bash
npm install vite-plugin-pwa -D
```

### Toast Notifications
```bash
npm install react-hot-toast
```

### Image Conversion (Sharp)
```bash
npm install --save-dev sharp
```

### Google Analytics
```bash
npm install react-ga4
```

### Error Tracking (Sentry)
```bash
npm install @sentry/react
```

### TypeScript (опціонально)
```bash
npm install -D typescript @types/react @types/react-dom
```

### Testing (опціонально)
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Linting (опціонально)
```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react
```

---

## 🔧 Git Команди

```bash
# Перевірити статус
git status

# Додати всі зміни
git add .

# Commit з повідомленням
git commit -m "Add Projects section and SEO improvements"

# Push на remote
git push origin main

# Створити нову гілку
git checkout -b feature/new-feature

# Повернутися на main
git checkout main
```

---

## 🧪 Тестування

```bash
# Запустити Lighthouse в терміналі (якщо встановлено)
npx lighthouse https://zagor.me --view

# Перевірити bundle size
npm run build
ls -lh dist/assets/
```

---

## 📱 Локальне Тестування на Мобільних

```bash
# Знайти локальну IP адресу
# Mac/Linux:
ipconfig getifaddr en0
# або
hostname -I

# Windows:
ipconfig

# Потім відкрийте на телефоні:
# http://YOUR_IP:5173
```

---

## 🔍 Перевірка SEO

```bash
# Перевірити sitemap
cat public/sitemap.xml

# Оновити sitemap з новою датою
npm run update-sitemap
```

---

## 📊 Аналіз Bundle Size

```bash
# Build з аналізом
npm run build

# Перевірити розмір файлів
ls -lh dist/assets/

# Перевірити GZIP розмір
gzip -c dist/assets/index-*.js | wc -c
```

---

## 🧹 Очищення

```bash
# Видалити node_modules
rm -rf node_modules

# Видалити dist
rm -rf dist

# Перевстановити залежності
npm install

# Очистити npm cache (якщо потрібно)
npm cache clean --force
```

---

## 🐛 Дебаг

```bash
# Перевірити версії
node --version
npm --version

# Перевірити встановлені пакети
npm list

# Перевірити застарілі пакети
npm outdated

# Оновити пакети
npm update
```

---

## 📝 Швидкі Нотатки

### Dev сервер зависає?
```bash
# Спробуйте перезапустити з очищенням кешу
rm -rf node_modules/.vite
npm run dev
```

### Build падає з помилкою?
```bash
# Перевірте консоль на синтаксичні помилки
# Спробуйте очистити і перебудувати
rm -rf dist
npm run build
```

### Port вже зайнятий?
```bash
# Знайти процес на порту 5173
lsof -i :5173
# Або змінити порт у vite.config.js:
# server: { port: 3000 }
```

---

## 🚀 Deployment

### GitHub Pages
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### Netlify
```bash
# Build команда: npm run build
# Publish directory: dist
```

### Vercel
```bash
# Build команда: npm run build
# Output directory: dist
```

---

## 📚 Документація

```bash
# Відкрити головний README
cat README.md

# Перевірити рекомендації
cat WEBSITE_AUDIT_RECOMMENDATIONS.md

# Інструкції з впровадження
cat IMPLEMENTATION_GUIDE.md

# Що було покращено
cat ЩО_ПОКРАЩЕНО.md

# Чекліст завдань
cat CHECKLIST.md
```

---

## 💡 Корисні Псевдоніми (Aliases)

Додайте у ваш `.bashrc` або `.zshrc`:

```bash
# Швидкі команди для проекту
alias dev="npm run dev"
alias build="npm run build"
alias preview="npm run preview"
alias sitemap="npm run update-sitemap"
alias resume="npm run generate-resume"

# Git швидко
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline -10"

# npm швидко
alias ni="npm install"
alias nid="npm install -D"
alias nu="npm update"
```

Після додавання перезапустіть термінал або виконайте:
```bash
source ~/.bashrc  # або ~/.zshrc
```

---

## 🎯 Швидкий Workflow

### Типовий день розробки:
```bash
# 1. Початок роботи
git pull origin main
npm install  # якщо щось оновилось

# 2. Запустити dev
npm run dev

# 3. Робота над кодом...

# 4. Перевірка build
npm run build

# 5. Commit змін
git add .
git commit -m "Descriptive message"
git push origin main

# 6. Оновити sitemap (якщо потрібно)
npm run update-sitemap
git add public/sitemap.xml
git commit -m "Update sitemap"
git push
```

---

**Останнє оновлення:** 29 жовтня 2024
