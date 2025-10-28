# 💱 Currency Scripts

Скрипти для управління курсами валют та тестування мультивалютності.

## 📋 Список скриптів

### Оновлення курсів

#### `update-rates.php` ⭐ (Рекомендовано)
Повне оновлення всіх курсів валют через ExchangeRate-API з детальною статистикою.

```bash
php currency/update-rates.php
```

**Виводить:**
- Список оновлених курсів
- Кількість курсів у БД
- Тестові конвертації
- Статус виконання

#### `update-currency-rates.php`
Простіше оновлення курсів (без детального виводу).

```bash
php currency/update-currency-rates.php
```

### Перевірка курсів

#### `check-rates.php`
Переглянути всі курси валют у базі даних з групуванням по датах.

```bash
php currency/check-rates.php
```

**Показує:**
- Курси по датах
- Загальна кількість записів
- Останнє оновлення

#### `test-exchangerate-api.php` 
Перевірити з'єднання з ExchangeRate-API.com та отримати актуальні курси.

```bash
php currency/test-exchangerate-api.php
```

**Тестує:**
- API ключ
- З'єднання з сервером
- Отримання курсів для UAH, USD, PLN
- Розрахунок зворотних курсів

### Управління кешем

#### `clear-rates-cache.php`
Очистити кеш курсів валют (корисно після оновлення).

```bash
php currency/clear-rates-cache.php
```

**Видаляє кеш для:**
- Всіх пар валют
- Всіх дат
- Примусово перезавантажує з БД

### Тестування

#### `test-currency-service.php`
Комплексний тест CurrencyService (конвертація, форматування).

```bash
php currency/test-currency-service.php
```

**Тестує:**
- Форматування сум
- Конвертацію між валютами
- Роботу з історичними датами

#### `test-multicurrency.php`
Тест мультивалютних транзакцій та розрахунків.

```bash
php currency/test-multicurrency.php
```

### Історичні дані

#### `add-historical-rates.php`
Додати історичні курси валют за попередні дати.

```bash
php currency/add-historical-rates.php
```

**Використання:**
Для заповнення курсів за минулі дати (якщо є старі транзакції).

#### `set-manual-rates.php`
Встановити курси валют вручну (для тестування або офлайн режиму).

```bash
php currency/set-manual-rates.php
```

**Коли використовувати:**
- API недоступне
- Тестове середовище
- Потрібні конкретні курси

#### `fix-currency-rates.php`
Виправити некоректні курси або додати відсутні.

```bash
php currency/fix-currency-rates.php
```

## 🎯 Типові сценарії

### Щоденне оновлення
```bash
# Автоматично через Laravel Scheduler (щодня о 16:00)
php artisan schedule:work

# Або вручну
php artisan currency:update-rates
```

### Перша установка
```bash
# 1. Отримати початкові курси
php currency/update-rates.php

# 2. Перевірити що збереглось
php currency/check-rates.php

# 3. Протестувати конвертацію
php currency/test-currency-service.php
```

### Проблеми з курсами
```bash
# 1. Очистити кеш
php currency/clear-rates-cache.php

# 2. Перевірити API
php currency/test-exchangerate-api.php

# 3. Оновити курси
php currency/update-rates.php
```

### Історичні транзакції
```bash
# 1. Додати курси за потрібні дати
php currency/add-historical-rates.php

# 2. Очистити кеш
php currency/clear-rates-cache.php

# 3. Перевірити dashboard
php ../diagnostics/verify-dashboard.php
```

## 🔧 Налаштування

Всі скрипти використовують конфігурацію з `.env`:

```env
EXCHANGE_RATE_PROVIDER=exchangerate-api
EXCHANGERATE_API_KEY=your_api_key_here
```

## 📚 Документація

Детальна документація: `docs/multi-currency-guide.md`

API довідка: `docs/EXCHANGERATE-API-SETUP.md`
