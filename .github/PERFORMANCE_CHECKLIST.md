# ⚡ Performance Checklist

## 🔍 Pre-Commit Checklist

Використовуйте цей чеклист перед кожним commit для підтримки високої якості коду.

### 1. React Best Practices
- [ ] Всі DOM атрибути використовують camelCase (fetchPriority, className, htmlFor)
- [ ] Console.log обгорнуто в `if (import.meta.env.DEV)`
- [ ] Використано React.memo() для компонентів що часто рендеряться
- [ ] Використано useMemo() та useCallback() де потрібно
- [ ] Немає inline функцій в render

### 2. Images
- [ ] Всі зображення мають width та height атрибути
- [ ] Критичні зображення мають fetchPriority="high"
- [ ] Некритичні зображення мають loading="lazy"
- [ ] Додано alt text для всіх зображень
- [ ] Розглянуто використання WebP/AVIF

### 3. Performance
- [ ] Немає непотрібних re-renders
- [ ] Lazy loading використано для некритичних компонентів
- [ ] CSS animations використовують GPU (transform, opacity)
- [ ] Використано willChange тільки де потрібно
- [ ] Видалено unused CSS

### 4. Build Check
```bash
npm run build
# Перевірити:
# - Build проходить без warnings
# - Bundle size не збільшився суттєво
# - Немає console logs у збірці
```

---

## 🚀 Pre-Deploy Checklist

### 1. Lighthouse Audit
```bash
# Запустити Lighthouse в Chrome DevTools
# Або використати CLI:
lighthouse https://localhost:3000 --view
```

**Мінімальні scores:**
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 100

### 2. Manual Testing
- [ ] Протестовано на Chrome
- [ ] Протестовано на Firefox
- [ ] Протестовано на Safari (якщо можливо)
- [ ] Протестовано на мобільних (iOS/Android)
- [ ] Протестовано в landscape mode
- [ ] Темна/світла тема працює коректно
- [ ] Перемикання мови працює

### 3. Core Web Vitals
- [ ] LCP < 2.5s (Largest Contentful Paint)
- [ ] FID < 100ms (First Input Delay)
- [ ] CLS < 0.1 (Cumulative Layout Shift)

### 4. Network Testing
- [ ] Протестовано на 3G
- [ ] Протестовано з throttling
- [ ] Працює offline (PWA)

### 5. Accessibility
- [ ] Keyboard navigation працює
- [ ] Screen reader friendly
- [ ] Color contrast достатній
- [ ] Focus states видимі

---

## 📊 Monthly Review Checklist

### 1. Dependencies
```bash
npm outdated
npm audit
```
- [ ] Оновити dependencies
- [ ] Виправити security vulnerabilities
- [ ] Протестувати після оновлення

### 2. Bundle Analysis
```bash
npm run build
npm run analyze  # якщо налаштовано
```
- [ ] Перевірити розмір бандлів
- [ ] Виявити дублікати
- [ ] Оптимізувати великі бандли

### 3. Performance Metrics
- [ ] Перевірити Google Search Console
- [ ] Перевірити Google Analytics (якщо є)
- [ ] Запустити WebPageTest
- [ ] Запустити PageSpeed Insights

### 4. SEO Check
- [ ] Перевірити indexing в Google
- [ ] Перевірити sitemap.xml
- [ ] Перевірити robots.txt
- [ ] Оновити структуровані дані

---

## 🐛 Bug Prevention

### React Warnings
**Найчастіші проблеми:**
1. `fetchpriority` замість `fetchPriority`
2. `for` замість `htmlFor`
3. `class` замість `className`
4. Keys у списках
5. UseEffect dependencies

### Performance Issues
**Що перевіряти:**
1. Re-renders через inline functions
2. Великі bundle sizes
3. Unoptimized images
4. Блокуючий JavaScript
5. Unused CSS

### Accessibility Issues
**Що перевіряти:**
1. Missing alt text
2. Low color contrast
3. No keyboard navigation
4. Missing ARIA labels
5. Non-semantic HTML

---

## 🛠️ Quick Fixes

### React Warning
```jsx
// ❌ Wrong
<img fetchpriority="high" />

// ✅ Correct
<img fetchPriority="high" />
```

### Console Logs
```javascript
// ❌ Wrong
console.log('Debug info');

// ✅ Correct
if (import.meta.env.DEV) {
  console.log('Debug info');
}
```

### Image CLS
```jsx
// ❌ Wrong
<img src="image.jpg" alt="..." />

// ✅ Correct
<img 
  src="image.jpg" 
  alt="..."
  width="800"
  height="600"
/>
```

### Re-renders
```jsx
// ❌ Wrong
<button onClick={() => handleClick(id)}>

// ✅ Correct
const onClick = useCallback(() => {
  handleClick(id);
}, [id]);

<button onClick={onClick}>
```

---

## 📈 Metrics Targets

### Lighthouse Scores
```
Performance:      95+ ⭐⭐⭐⭐⭐
Accessibility:    95+ ⭐⭐⭐⭐⭐
Best Practices:  100  ⭐⭐⭐⭐⭐
SEO:             100  ⭐⭐⭐⭐⭐
```

### Core Web Vitals
```
LCP: < 2.5s   🟢 Good
FID: < 100ms  🟢 Good
CLS: < 0.1    🟢 Good
FCP: < 1.8s   🟢 Good
TTI: < 3.8s   🟢 Good
```

### Bundle Sizes
```
React Vendor:    < 200 kB
Framer Motion:   < 80 kB
Main App:        < 30 kB
Total (gzipped): < 100 kB
```

---

## 🔗 Useful Links

### Testing Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

### Documentation
- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Last Updated:** October 30, 2024  
**Version:** 1.0.0
