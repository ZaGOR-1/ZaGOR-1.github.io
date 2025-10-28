# 🔍 Diagnostics Scripts

Скрипти для діагностики системи, перевірки розрахунків та виявлення проблем.

## 📋 Список скриптів

### `verify-dashboard.php` ⭐ (Головний)
Комплексна перевірка розрахунків dashboard - порівнює ручні підрахунки з API.

```bash
php diagnostics/verify-dashboard.php
```

**Перевіряє:**
- ✅ Всі транзакції користувача
- ✅ Конвертацію валют
- ✅ Розрахунки доходів та витрат
- ✅ Відповідність з StatsService API
- ✅ Точність балансу

**Вивід:**
```
📊 Перевірка розрахунків доходів/витрат
======================================================================
👤 Користувач: Test User
💱 Базова валюта: UAH

📋 Транзакції:
----------------------------------------------------------------------
📈 2025-10-06 20:10 | 2,400.00 PLN | Зарплата |
   → Дохід: 25200.00 UAH

======================================================================
💰 Загальний дохід:    25,200.00 UAH
💸 Загальні витрати:   0.00 UAH
📊 Баланс:             25,200.00 UAH

----------------------------------------------------------------------
🔍 Перевірка через StatsService:
API Дохід:    25,200.00 UAH
✅ Доходи збігаються!
✅ Витрати збігаються!
```

### `calculate-income.php`
Ручний розрахунок доходів з деталізацією по кожній транзакції.

```bash
php diagnostics/calculate-income.php
```

**Показує:**
- Кожну транзакцію з деталями
- Оригінальну валюту та суму
- Конвертовану суму в базову валюту
- Підсумкові доходи/витрати

### `diagnose-transaction.php`
Детальна діагностика конкретної транзакції.

```bash
php diagnostics/diagnose-transaction.php
```

**Аналізує:**
- Дані транзакції
- Курс обміну на дату
- Конвертовану суму
- Категорію та тип
- Чи правильно враховується в статистиці

### `test-api.php`
Перевірити роботу REST API endpoints.

```bash
php diagnostics/test-api.php
```

**Тестує:**
- `/api/v1/stats/overview`
- `/api/v1/stats/cashflow`
- `/api/v1/stats/category-breakdown`
- Авторизацію через Sanctum
- Формат відповідей JSON

### `test-currency-selector.php` 🆕
Перевірити вибір валюти в Cashflow та конвертацію.

```bash
php diagnostics/test-currency-selector.php
```

**Тестує:**
- Cashflow в різних валютах (UAH, USD, PLN)
- Всі періоди (7d, 14d, 30d, 3m, 6m)
- Точність конвертації валют
- Правильність курсів обміну

**Вивід:**
```
💱 Тестування валюти: USD
📅 Період: 30d
💵 Валюта відповіді: USD
📈 Загальні доходи: 798.23 $
📉 Загальні витрати: 37.53 $
💰 Баланс: 760.70 $
```

### `check-time.php`
Перевірити часовий пояс та формат дат у системі.

```bash
php diagnostics/check-time.php
```

**Перевіряє:**
- Timezone конфігурацію (має бути Europe/Kyiv)
- Поточний час сервера
- Формат дат у транзакціях
- Різницю з UTC

## 🎯 Типові сценарії використання

### Проблема: Неправильні суми на dashboard
```bash
# 1. Перевірити конвертацію валют
php ../currency/check-rates.php

# 2. Очистити кеш
php ../currency/clear-rates-cache.php

# 3. Діагностувати dashboard
php diagnostics/verify-dashboard.php
```

### Проблема: Транзакція не відображається
```bash
# 1. Знайти ID транзакції у БД або інтерфейсі
# 2. Діагностувати конкретну транзакцію
php diagnostics/diagnose-transaction.php

# 3. Перерахувати доходи
php diagnostics/calculate-income.php
```

### Проблема: API повертає помилки
```bash
# 1. Тестувати API endpoints
php diagnostics/test-api.php

# 2. Перевірити логи
tail -f storage/logs/laravel.log
```

### Проблема: Неправильний час транзакцій
```bash
# 1. Перевірити timezone
php diagnostics/check-time.php

# 2. Якщо потрібно - змінити в .env
APP_TIMEZONE=Europe/Kyiv

# 3. Очистити кеш конфігурації
php artisan config:clear
```

## 🔧 Створення власного діагностичного скрипту

```php
<?php

require __DIR__ . '/../../vendor/autoload.php';

$app = require_once __DIR__ . '/../../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Ваш код діагностики тут
echo "🔍 Діагностика...\n";

// Приклад: перевірити кількість транзакцій
$count = DB::table('transactions')->count();
echo "📊 Транзакцій у БД: {$count}\n";
```

## 📊 Моніторинг

Для production рекомендується:
- Регулярно запускати `verify-dashboard.php`
- Логувати результати
- Налаштувати alerts при невідповідностях

```bash
# Приклад cron для моніторингу (кожну годину)
0 * * * * cd /path/to/project && php scripts/diagnostics/verify-dashboard.php >> /var/log/finance-tracker-diagnostics.log 2>&1
```

## 📚 Документація

Історія виправлених проблем: `docs/archive/DIAGNOSTICS.md`
