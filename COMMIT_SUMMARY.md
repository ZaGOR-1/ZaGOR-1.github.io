# Налаштування автоматичного розгортання на GitHub Pages

## Зміни

### Конфігурація проєкту
- **vite.config.js**: Встановлено `base: '/'` для роботи з кореневим доменом
- **package.json**: Оновлено `homepage` на `https://zagor.me/` та посилання на репозиторій `ZaGOR-1.github.io`
- **public/.nojekyll**: Створено файл для відключення Jekyll на GitHub Pages
- **public/CNAME**: Створено файл з доменом `zagor.me` для кастомного домену

### GitHub Actions
- **.github/workflows/deploy.yml**: Створено workflow для автоматичного деплою
  - Автоматичний білд при пуші до main
  - Використання офіційних GitHub Actions для Pages
  - Можливість ручного запуску через workflow_dispatch

### Документація
- **README.md**: Додано секцію про автоматичний деплой на GitHub Pages
- **DEPLOYMENT.md**: Оновлено інструкції з GitHub Pages
- **GITHUB_PAGES_SETUP_UK.md**: Створено детальні інструкції українською з налаштуванням кастомного домену
- **GITHUB_PAGES_CHANGES.md**: Створено summary всіх змін
- **CUSTOM_DOMAIN_SETUP.md**: Створено детальні інструкції англійською для налаштування zagor.me
- **QUICK_DEPLOY.md**: Створено швидкий гайд українською для деплою

## Як працює

1. При пуші до гілки `main` автоматично запускається GitHub Actions workflow
2. Workflow встановлює залежності, білдить проєкт і деплоїть на GitHub Pages
3. Сайт доступний за адресами:
   - https://zagor-1.github.io/ (GitHub Pages)
   - https://zagor.me/ (кастомний домен, після налаштування DNS)

## Наступні кроки

1. Увімкніть GitHub Pages в налаштуваннях репозиторію:
   - Settings → Pages → Source → "GitHub Actions"
2. Зробіть push змін до main
3. Перевірте вкладку Actions для моніторингу деплою
4. Відкрийте сайт за адресою: https://zagor-1.github.io/ або https://zagor.me/
5. Налаштуйте DNS для домену zagor.me (інструкції в CUSTOM_DOMAIN_SETUP.md)

## Тестування

Локальне тестування з правильними шляхами:
```bash
npm run build
npm run preview
# Відкрийте http://localhost:4173/
```
