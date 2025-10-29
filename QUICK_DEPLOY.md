# 🚀 Швидкий деплой на zagor.me

## Крок 1: Підготовка репозиторію

Створіть новий репозиторій на GitHub з назвою **ZaGOR-1.github.io**:

1. Перейдіть на https://github.com/new
2. Назва репозиторію: `ZaGOR-1.github.io`
3. Виберіть "Public"
4. НЕ додавайте README, .gitignore або ліцензію (вони вже є у проєкті)
5. Натисніть "Create repository"

## Крок 2: Завантажте код

```bash
# Перейдіть до папки проєкту
cd /path/to/your/project

# Додайте новий remote (якщо потрібно)
git remote set-url origin https://github.com/ZaGOR-1/ZaGOR-1.github.io.git

# Або створіть новий remote
git remote add origin https://github.com/ZaGOR-1/ZaGOR-1.github.io.git

# Перевірте поточну гілку
git branch

# Якщо не на main, перейдіть на main
git checkout main

# Завантажте код
git push -u origin main
```

## Крок 3: Увімкніть GitHub Pages

1. Відкрийте https://github.com/ZaGOR-1/ZaGOR-1.github.io/settings/pages
2. В розділі **"Source"** виберіть **"GitHub Actions"**
3. Збережіть налаштування

## Крок 4: Дочекайтесь деплою

1. Перейдіть на https://github.com/ZaGOR-1/ZaGOR-1.github.io/actions
2. Дочекайтесь завершення workflow "Deploy to GitHub Pages" (2-3 хвилини)
3. Зелена галочка ✓ означає успішний деплой

## Крок 5: Перевірте сайт

Ваш сайт вже доступний на **https://zagor-1.github.io** 🎉

## Крок 6: Налаштуйте домен zagor.me

### А. Налаштування DNS

Зайдіть в панель управління вашого реєстратора домену і додайте DNS записи:

**A Records (для apex домену):**
```
Тип: A, Ім'я: @, Значення: 185.199.108.153
Тип: A, Ім'я: @, Значення: 185.199.109.153
Тип: A, Ім'я: @, Значення: 185.199.110.153
Тип: A, Ім'я: @, Значення: 185.199.111.153
```

**CNAME Record (для www):**
```
Тип: CNAME, Ім'я: www, Значення: zagor-1.github.io
```

### Б. Верифікація на GitHub

Файл `CNAME` вже створено, тому GitHub автоматично налаштує кастомний домен після деплою.

1. Перейдіть на https://github.com/ZaGOR-1/ZaGOR-1.github.io/settings/pages
2. Дочекайтесь перевірки DNS (зелена галочка біля "DNS check successful")
3. Увімкніть **"Enforce HTTPS"**

### В. Дочекайтесь поширення DNS

DNS зміни можуть зайняти від 5 хвилин до 48 годин.

Перевірити статус:
- https://dnschecker.org (введіть zagor.me)
- Або в терміналі: `nslookup zagor.me`

## ✅ Готово!

Ваш сайт тепер доступний на:
- **https://zagor.me** 🎯
- **https://www.zagor.me** (редірект на zagor.me)
- **https://zagor-1.github.io** (редірект на zagor.me)

## 🔄 Оновлення сайту

Тепер для оновлення сайту просто робіть:

```bash
# Внесіть зміни у код
git add .
git commit -m "Опис змін"
git push origin main
```

GitHub Actions автоматично задеплоїть зміни на zagor.me через 2-3 хвилини! 🚀

## 📚 Детальні інструкції

- [GITHUB_PAGES_SETUP_UK.md](./GITHUB_PAGES_SETUP_UK.md) - Детальна українська інструкція
- [CUSTOM_DOMAIN_SETUP.md](./CUSTOM_DOMAIN_SETUP.md) - Англійська інструкція з налаштування домену

## 🆘 Проблеми?

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
