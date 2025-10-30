# 📚 Best Practices для розробки

## React Performance Best Practices

### 1. **Мемоізація**

#### Коли використовувати React.memo:
```javascript
// ✅ ДОБРЕ - компонент отримує багато пропсів
const Header = memo(({ language, darkMode, setDarkMode, translations }) => {
  // ...
});

// ❌ ПОГАНО - простий компонент з одним пропсом
const Title = memo(({ text }) => <h1>{text}</h1>);
```

#### Коли використовувати useMemo:
```javascript
// ✅ ДОБРЕ - складні обчислення
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => acc + calculateComplex(item), 0);
}, [data]);

// ❌ ПОГАНО - прості обчислення
const sum = useMemo(() => a + b, [a, b]); // Просто використай: const sum = a + b
```

#### Коли використовувати useCallback:
```javascript
// ✅ ДОБРЕ - функція передається в мемоізований дочірній компонент
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// ❌ ПОГАНО - функція використовується тільки в поточному компоненті
const handleClick = useCallback(() => {
  console.log('click');
}, []); // Просто використай звичайну функцію
```

---

### 2. **Hooks Rules**

#### Стабільні референції:
```javascript
// ✅ ДОБРЕ - використовуй функціональну форму setState
const setValue = useCallback((value) => {
  setState(prev => {
    const newValue = value instanceof Function ? value(prev) : value;
    return newValue;
  });
}, [key]); // Тільки key в залежностях

// ❌ ПОГАНО - state в залежностях
const setValue = useCallback((value) => {
  setState(value);
}, [key, state]); // state створює нові референції
```

#### Refs для об'єктів:
```javascript
// ✅ ДОБРЕ - для options використовуй ref
const optionsRef = useRef(options);
useEffect(() => {
  optionsRef.current = options;
});

// ❌ ПОГАНО - options об'єкт в залежностях
useEffect(() => {
  // код
}, [options]); // Буде викликатись при кожному рендері
```

---

### 3. **Canvas та Animations**

#### Оптимізація canvas:
```javascript
// ✅ ДОБРЕ - зупиняй анімації коли вкладка неактивна
const handleVisibilityChange = () => {
  isTabActive = !document.hidden;
};
document.addEventListener('visibilitychange', handleVisibilityChange);

// ✅ ДОБРЕ - використовуй requestAnimationFrame правильно
const animate = () => {
  if (!isActive) {
    animationId = requestAnimationFrame(animate);
    return; // Пропускай обчислення
  }
  // Виконуй обчислення
  animationId = requestAnimationFrame(animate);
};
```

---

### 4. **Lazy Loading та Code Splitting**

```javascript
// ✅ ДОБРЕ - lazy load для великих компонентів
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// ✅ ДОБРЕ - Suspense з fallback
<Suspense fallback={<LoadingSpinner />}>
  <Projects />
  <Contact />
</Suspense>
```

---

### 5. **Event Listeners**

```javascript
// ✅ ДОБРЕ - passive listeners для scroll/touch
window.addEventListener('scroll', handleScroll, { passive: true });

// ✅ ДОБРЕ - cleanup в return
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

---

### 6. **Constants та Static Data**

```javascript
// ✅ ДОБРЕ - винеси за межі компонента
const SOCIAL_LINKS = [
  { icon: Github, url: 'https://github.com' },
  // ...
];

const MyComponent = () => {
  // використовуй SOCIAL_LINKS
};

// ❌ ПОГАНО - всередині компонента
const MyComponent = () => {
  const socialLinks = useMemo(() => [
    { icon: Github, url: 'https://github.com' },
  ], []); // Непотрібний useMemo для статичних даних
};
```

---

### 7. **Framer Motion Optimization**

```javascript
// ✅ ДОБРЕ - переіспользовуй variants
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Використовуй в багатьох місцях
<motion.div variants={fadeInVariants}>

// ❌ ПОГАНО - створюй variants в кожному компоненті
const MyComponent = () => {
  const variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }), []); // Винеси в окремий файл
};
```

---

### 8. **Image Optimization**

```javascript
// ✅ ДОБРЕ - додавай width, height, loading
<img
  src="/image.jpg"
  alt="Description"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
/>

// ✅ ДОБРЕ - обробляй помилки
<img
  src="/profile.jpg"
  onError={(e) => {
    e.target.src = '/fallback.jpg';
  }}
/>
```

---

### 9. **Accessibility (a11y)**

```javascript
// ✅ ДОБРЕ - додавай aria атрибути
<div 
  role="alert" 
  aria-live="polite"
>
  Успішно збережено!
</div>

// ✅ ДОБРЕ - aria-label для іконок
<button aria-label="Закрити меню">
  <X size={24} />
</button>

// ✅ ДОБРЕ - semantic HTML
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main id="main">
```

---

### 10. **Form Handling**

```javascript
// ✅ ДОБРЕ - обробляй стани форми
const [formData, setFormData] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [formStatus, setFormStatus] = useState(''); // '', 'success', 'error'

// ✅ ДОБРЕ - валідація перед відправкою
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const { isValid, errors } = validateFormData(formData);
  if (!isValid) {
    setFormStatus('error');
    setIsSubmitting(false);
    return;
  }
  
  // Відправка форми
};
```

---

## TypeScript Best Practices (для майбутньої міграції)

```typescript
// Типізація пропсів
interface HeaderProps {
  language: 'en' | 'uk';
  setLanguage: (lang: 'en' | 'uk') => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  translations: TranslationsType;
}

// Типізація хуків
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // implementation
}

// Типізація refs
const canvasRef = useRef<HTMLCanvasElement>(null);
```

---

## CSS/Tailwind Best Practices

### 1. **Переіспользовуй класи**
```css
/* globals.css */
.glass-effect {
  @apply backdrop-blur-md bg-white/70 dark:bg-gray-800/70;
}

.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
         text-white rounded-xl hover:shadow-lg transition-all;
}
```

### 2. **Responsive design**
```jsx
// ✅ ДОБРЕ - mobile-first
<div className="text-sm sm:text-base md:text-lg lg:text-xl">

// ❌ ПОГАНО - desktop-first
<div className="text-xl lg:text-lg md:text-base sm:text-sm">
```

---

## Git Commit Best Practices

```bash
# ✅ ДОБРЕ - описові коміти
git commit -m "fix: resolve memory leak in AnimatedBackground"
git commit -m "perf: add React.memo to Header component"
git commit -m "feat: add accessibility attributes to Contact form"

# ❌ ПОГАНО
git commit -m "fix bug"
git commit -m "update"
git commit -m "changes"
```

### Conventional Commits:
- `feat:` - нова функціональність
- `fix:` - виправлення бага
- `perf:` - оптимізація продуктивності
- `refactor:` - рефакторинг коду
- `style:` - зміни стилів (форматування)
- `docs:` - зміни документації
- `test:` - додавання тестів
- `chore:` - технічні зміни (залежності тощо)

---

## Performance Monitoring

### Використовуй React DevTools Profiler:
```javascript
import { Profiler } from 'react';

<Profiler id="Header" onRender={onRenderCallback}>
  <Header {...props} />
</Profiler>
```

### Web Vitals:
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## Testing Best Practices

```javascript
// Unit tests
describe('useLocalStorage', () => {
  it('should save value to localStorage', () => {
    // test
  });
});

// Integration tests
describe('Contact Form', () => {
  it('should submit form with valid data', () => {
    // test
  });
});

// E2E tests (Playwright/Cypress)
test('should navigate through all sections', async () => {
  // test
});
```

---

## Security Best Practices

### 1. **Sanitize user input**
```javascript
// ✅ ДОБРЕ - валідація email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 2. **External links**
```jsx
// ✅ ДОБРЕ - використовуй rel="noopener noreferrer"
<a 
  href={externalUrl} 
  target="_blank" 
  rel="noopener noreferrer"
>
```

### 3. **Environment variables**
```javascript
// ✅ ДОБРЕ - використовуй .env файли
const API_KEY = import.meta.env.VITE_API_KEY;

// ❌ ПОГАНО - хардкод в коді
const API_KEY = 'sk-1234567890';
```

---

## Документація

### JSDoc для складних функцій:
```javascript
/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, delay) => {
  // implementation
};
```

---

**Останнє оновлення:** 2024  
**Версія:** 1.0.0
