# GitHub Actions Workflows

## deploy.yml

Автоматичне розгортання на GitHub Pages.

**Тригери:**
- Push до гілки `main`
- Ручний запуск через Actions tab (workflow_dispatch)

**Що робить:**
1. Встановлює Node.js 20
2. Встановлює npm залежності
3. Білдить проєкт (`npm run build`)
4. Завантажує білд на GitHub Pages
5. Деплоїть на GitHub Pages

**Результат:**
- Сайт доступний за адресою: https://zagor-1.github.io/testcto/
- Час деплою: ~2-3 хвилини

**Налаштування:**
- У налаштуваннях репозиторію (Settings → Pages) має бути обрано "GitHub Actions" як джерело

**Моніторинг:**
- Статус деплою можна переглянути на вкладці Actions
- При помилці workflow надішле повідомлення
