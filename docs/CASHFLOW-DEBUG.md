# 🔍 Діагностика проблем з графіком Cashflow

## Що зроблено

1. ✅ Додано детальне логування в console
2. ✅ Додано перевірку існування canvas елемента
3. ✅ Поліпшено логіку знищення старого графіка
4. ✅ Створено тестову сторінку для діагностики

## Як перевірити

### Варіант 1: Основний Dashboard

1. Відкрити http://localhost:8000/dashboard
2. Натиснути **F12** (відкрити DevTools)
3. Перейти на вкладку **Console**
4. Перезавантажити сторінку (Ctrl+R)
5. Подивитися що виводиться в консоль:

**Очікувані повідомлення:**
```
Cashflow API response: {success: true, data: {...}}
Cashflow data points: 6
Currency: UAH
Creating new chart...
Chart created successfully!
```

**Якщо є помилки - скопіюйте їх!**

### Варіант 2: Тестова сторінка

1. Відкрити http://localhost:8000/test-cashflow.html
2. Ця сторінка показує:
   - Статус завантаження
   - Сирі дані з API
   - Всі console.log на екрані
   - Графік з тими ж налаштуваннями

3. Спробувати:
   - Перемикати періоди (7d, 14d, 30d, 3m, 6m)
   - Перемикати валюти (UAH, USD, PLN)
   - Дивитися чи змінюється графік

## Можливі проблеми

### 1. Графік не відображається взагалі
**Причини:**
- Chart.js не завантажився
- Canvas елемент не знайдений
- Немає даних з API

**Перевірка:**
```javascript
// В консолі браузера:
typeof Chart  // Має бути "function"
document.getElementById('cashflowChart')  // Має бути canvas елемент
```

### 2. Графік "стрибає" при зміні даних
**Причини:**
- Старий chart не знищується
- Конфлікт з іншими графіками

**Виправлення:**
- Додано `cashflowChart = null` після destroy
- Додано перевірку `if (!ctx)` перед створенням

### 3. Помилка в console
**Можливі помилки:**
- `Cannot read property 'destroy' of null` - старий chart не існує (норма)
- `Canvas element not found` - проблема з HTML
- `HTTP error! status: 401` - не авторизований
- `HTTP error! status: 500` - помилка на сервері

### 4. Графік змінює масштаб
**Виправлення:**
- Додано `beginAtZero: true` - завжди починається з 0
- Додано `grace: '5%'` - відступ зверху
- Додано `animation` для плавних переходів

## Що логується

### При завантаженні даних:
```javascript
console.log('Cashflow API response:', data);
console.log('Cashflow data points:', cashflow.length);
console.log('Currency:', currency);
```

### При створенні графіка:
```javascript
console.log('Destroying old chart...');  // Якщо старий існує
console.log('Creating new chart...');
console.log('Chart created successfully!');
```

### При помилках:
```javascript
console.error('Canvas element not found!');
console.error('API returned success=false:', data.message);
console.error('HTTP error! status:', response.status);
console.error('Error fetching cashflow:', err);
```

## Команди для перевірки

```bash
# Очистити всі кеші
php artisan optimize:clear

# Перевірити логи Laravel
tail -f storage/logs/laravel.log

# Перевірити чи працює API
curl http://localhost:8000/api/v1/stats/cashflow?period=6m
```

## Наступні кроки

1. **Відкрити Dashboard** → F12 → Console → переглянути логи
2. **Якщо є помилки** → скопіювати текст помилки
3. **Якщо графік не показується** → відкрити test-cashflow.html
4. **Якщо тестова сторінка працює** → проблема в dashboard
5. **Якщо обидві не працюють** → проблема в API або Chart.js

---

**Що саме не працює в графіку?**
- [ ] Не показується взагалі
- [ ] Показується але змінює масштаб
- [ ] Показується але не оновлюється при зміні валюти/періоду
- [ ] Показується але виходить за межі
- [ ] Інше: _________________

**Повідомте що ви бачите в Console (F12) і я допоможу виправити!**
