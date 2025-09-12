// Улучшенный lazy loading для изображений
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Добавляем класс загрузки
            img.classList.add('lazy-loading');
            
            // Создаем новое изображение для предзагрузки
            const newImg = new Image();
            newImg.onload = () => {
                // Когда изображение загружено, заменяем src
                img.src = img.dataset.src;
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                img.removeAttribute('data-src');
                
                // Перестаем наблюдать за этим элементом
                imageObserver.unobserve(img);
            };
            
            newImg.onerror = () => {
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-error');
                console.error('Ошибка загрузки изображения:', img.dataset.src);
            };
            
            // Начинаем загрузку
            newImg.src = img.dataset.src;
        }
    });
}, observerOptions);

// Наблюдение за ленивыми изображениями
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        // Добавляем атрибут loading="lazy" программно если его нет
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        imageObserver.observe(img);
    });
});

// Анимации при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Плавное появление элементов
const addScrollAnimations = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
};

// Cookie consent banner
const showCookieConsent = () => {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p data-key="cookie_text">Ta strona używa plików cookie dla lepszego doświadczenia użytkownika.</p>
                <button onclick="acceptCookies()" data-key="cookie_accept">Akceptuję</button>
            </div>
        `;
        document.body.appendChild(banner);
    }
};

const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    document.querySelector('.cookie-banner').remove();
};

// Форма контактов с валидацией
const setupContactForm = () => {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Простая валидация
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Показать loading состояние
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wysyłanie...';
        submitBtn.disabled = true;
        
        // Симуляция отправки (замените на реальную отправку)
        setTimeout(() => {
            alert('Wiadomość została wysłana!');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
};

let translations = {};
let currentLanguage = 'pl';

// Добавляем создание всех секций динамически
function createSectionContent() {
    // Создаем меню навигации
    const nav = document.getElementById('mobile-nav');
    if (nav && !nav.innerHTML.trim()) {
        nav.innerHTML = `
            <ul>
                <li><a href="#home" data-key="nav_home"><i class="fas fa-home"></i> Strona Główna</a></li>
                <li><a href="#about" data-key="nav_about"><i class="fas fa-info-circle"></i> O Nas</a></li>
                <li><a href="#process" data-key="nav_process"><i class="fas fa-cogs"></i> Proces</a></li>
                <li><a href="#products" data-key="nav_products"><i class="fas fa-fire"></i> Produkty</a></li>
                <li><a href="#contact" data-key="nav_contact"><i class="fas fa-envelope"></i> Kontakt</a></li>
            </ul>
        `;
    }

    // Создаем controls если их нет
    const controls = document.querySelector('.controls');
    if (controls && !controls.innerHTML.trim()) {
        controls.innerHTML = `
            <div class="lang-switcher">
                <button onclick="changeLanguage('pl')">PL</button>
                <button onclick="changeLanguage('ru')">RU</button>
                <button onclick="changeLanguage('uk')">UK</button>
                <button onclick="changeLanguage('en')">EN</button>
            </div>
            <button id="theme-toggle" onclick="toggleTheme()">
                <i class="fas fa-moon"></i>
            </button>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                <i class="fas fa-bars"></i>
            </button>
        `;
    }

    // Создаем секцию процесса если ее заголовок пустой
    const processHeader = document.querySelector('#process .section-header');
    if (processHeader && !processHeader.innerHTML.trim()) {
        processHeader.innerHTML = `
            <h2 class="section-title" data-key="process_title">Jak Tworzymy Nasze Świece</h2>
            <p class="section-subtitle" data-key="process_subtitle">Poznaj nasz proces tworzenia świec krok po kroku</p>
        `;
    }

    // Создаем шаги процесса если их нет
    const processSteps = document.querySelector('#process .process-steps');
    if (processSteps && !processSteps.innerHTML.trim()) {
        processSteps.innerHTML = `
            <div class="step">
                <div class="step-number">1</div>
                <div class="step-icon"><i class="fas fa-seedling"></i></div>
                <h4 data-key="step1_title">Wybór Składników</h4>
                <p data-key="step1_desc">Starannie wybieramy najwyższej jakości naturalne składniki</p>
            </div>
            <div class="step">
                <div class="step-number">2</div>
                <div class="step-icon"><i class="fas fa-fire"></i></div>
                <h4 data-key="step2_title">Topienie Wosku</h4>
                <p data-key="step2_desc">Delikatnie topimy wosk w odpowiedniej temperaturze</p>
            </div>
            <div class="step">
                <div class="step-number">3</div>
                <div class="step-icon"><i class="fas fa-palette"></i></div>
                <h4 data-key="step3_title">Dodanie Aromatu</h4>
                <p data-key="step3_desc">Dodajemy naturalne olejki eteryczne dla pięknego zapachu</p>
            </div>
            <div class="step">
                <div class="step-number">4</div>
                <div class="step-icon"><i class="fas fa-gift"></i></div>
                <h4 data-key="step4_title">Finalizacja</h4>
                <p data-key="step4_desc">Pakujemy gotowe świece z miłością i dbałością</p>
            </div>
        `;
    }

    // Создаем заголовок секции продуктов
    const productsHeader = document.querySelector('#products .section-header');
    if (productsHeader && !productsHeader.innerHTML.trim()) {
        productsHeader.innerHTML = `
            <h2 class="section-title" data-key="products_title">Nasze Produkty</h2>
            <p class="section-subtitle" data-key="products_subtitle">Odkryj naszą kolekcję pięknych, aromatycznych świec</p>
        `;
    }

    // Создаем заголовок секции контактов
    const contactHeader = document.querySelector('#contact .section-header');
    if (contactHeader && !contactHeader.innerHTML.trim()) {
        contactHeader.innerHTML = `
            <h2 class="section-title" data-key="contact_title">Kontakt</h2>
            <p class="section-subtitle" data-key="contact_text">Skontaktuj się z nami, aby zamówić świece lub uzyskać więcej informacji.</p>
        `;
    }

    // Создаем контент контактов
    const contactContent = document.querySelector('#contact .contact-content');
    if (contactContent && !contactContent.innerHTML.trim()) {
        contactContent.innerHTML = `
            <div class="contact-info">
                <h3 data-key="contact_info">Informacje Kontaktowe</h3>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span data-key="email">info@domoweswieczki.pl</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span data-key="phone">+48 123 456 789</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-clock"></i>
                    <span data-key="hours">Pn-Pt: 9:00-17:00</span>
                </div>
            </div>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name" data-key="form_name">Imię</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email" data-key="form_email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message" data-key="form_message">Wiadomość</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn-submit" data-key="form_submit">Wyślij Wiadomość</button>
            </form>
        `;
    }
}

// Обновляем функцию загрузки переводов
async function loadTranslations() {
    try {
        const response = await fetch('data/translations.json');
        translations = await response.json();
        
        // Создаем контент секций
        createSectionContent();
        
        // Загружаем сохраненный язык или используем польский по умолчанию
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'pl';
        
        // Сначала обновляем текст
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[savedLanguage] && translations[savedLanguage][key]) {
                element.textContent = translations[savedLanguage][key];
            }
        });
        
        // Затем загружаем продукты
        updateProducts(savedLanguage);
        
        currentLanguage = savedLanguage;
        document.documentElement.lang = savedLanguage;
        
    } catch (error) {
        console.error('Ошибка загрузки переводов:', error);
        // Fallback - создаем контент в любом случае
        createSectionContent();
    }
}

function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;

    // Update text elements
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update products - ВАЖНО!
    updateProducts(lang);
    
    // Сохраняем выбранный язык
    localStorage.setItem('selectedLanguage', lang);
    
    console.log(`Language changed to: ${lang}`);
}

let currentImageIndex = 0;
let modalImages = [];

function updateProducts(lang) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    
    if (!translations[lang] || !translations[lang].products) return;
    
    // Сбрасываем массив изображений для модального окна
    modalImages = [];
    
    translations[lang].products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product fade-in';
        
        // Используем изображение из данных или placeholder
        const imageSrc = product.image || 'images/placeholder.jpg';
        
        // Добавляем изображение в массив для модального окна
        modalImages.push({
            src: imageSrc,
            caption: `${product.name} - ${product.desc}`,
            price: product.price
        });
        
        productDiv.innerHTML = `
            <div class="product-image" onclick="openImageModal(${index})" title="Кликните, чтобы увеличить">
                <img src="${imageSrc}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">
            </div>
            <div class="product-content">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-price">${product.price || '29.99 zł'}</div>
            </div>
        `;
        productsList.appendChild(productDiv);
    });
    
    // Запускаем наблюдение за новыми изображениями
    const newImages = productsList.querySelectorAll('img[loading="lazy"]');
    newImages.forEach(img => {
        if (typeof imageObserver !== 'undefined') {
            imageObserver.observe(img);
        }
    });
}

// Функция для открытия модального окна
function openImageModal(imageIndex = 0) {
    if (modalImages.length === 0) return;
    
    currentImageIndex = imageIndex;
    const modal = document.getElementById('image-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    
    const currentImage = modalImages[currentImageIndex];
    
    // Предотвращаем прокрутку
    document.body.classList.add('modal-open');
    
    // Устанавливаем изображение и подпись
    modalImage.src = currentImage.src;
    modalImage.alt = currentImage.caption;
    modalCaption.innerHTML = `
        <strong>${currentImage.caption}</strong><br>
        <span style="color: var(--primary-color); font-size: 1.2em;">${currentImage.price}</span>
    `;
    
    // Показываем модальное окно с плавной анимацией
    modal.classList.add('active');
    
    // Добавляем класс для контента с небольшой задержкой
    requestAnimationFrame(() => {
        modalContent.classList.add('active');
    });
    
    // Обновляем видимость кнопок навигации
    updateNavigationButtons();
}

// Функция для закрытия модального окна
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Убираем класс active с контента
    modalContent.classList.remove('active');
    
    // Через короткую задержку убираем класс с модального окна
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }, 150); // Половина времени анимации для более плавного эффекта
}

// Функция для навигации по изображениям
function navigateModal(direction) {
    if (modalImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Зацикливание
    if (currentImageIndex >= modalImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = modalImages.length - 1;
    }
    
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const modalNav = document.querySelector('.modal-navigation');
    const currentImage = modalImages[currentImageIndex];
    
    // Плавная анимация смены изображения
    modalImage.style.opacity = '0';
    modalCaption.style.opacity = '0';
    modalNav.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = currentImage.src;
        modalImage.alt = currentImage.caption;
        modalCaption.innerHTML = `
            <strong>${currentImage.caption}</strong><br>
            <span style="color: var(--primary-color); font-size: 1.2em;">${currentImage.price}</span>
        `;
        
        // Возвращаем видимость
        modalImage.style.opacity = '1';
        modalCaption.style.opacity = '1';
        modalNav.style.opacity = '1';
    }, 150);
    
    updateNavigationButtons();
}

// Функция для обновления кнопок навигации
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    // Показываем кнопки только если изображений больше одного
    if (modalImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// Обработчики событий для модального окна
document.addEventListener('DOMContentLoaded', function() {
    let isClosing = false; // Флаг для предотвращения множественных закрытий
    
    // Закрытие модального окна
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('image-modal');
        
        if (isClosing) return;
        
        // Закрытие по клику на фон
        if (e.target === modal) {
            isClosing = true;
            closeImageModal();
            setTimeout(() => { isClosing = false; }, 300);
        }
        
        // Закрытие по клику на крестик - ИСПРАВЛЕНО
        if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
            e.preventDefault();
            e.stopPropagation();
            isClosing = true;
            closeImageModal();
            setTimeout(() => { isClosing = false; }, 300);
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('image-modal');
        
        if (modal.classList.contains('active') && !isClosing) {
            if (e.key === 'Escape') {
                isClosing = true;
                closeImageModal();
                setTimeout(() => { isClosing = false; }, 300);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateModal(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateModal(1);
            }
        }
    });
    
    // Предотвращение прокрутки при открытом модальном окне
    const modal = document.getElementById('image-modal');
    modal.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Предотвращение закрытия при клике на контент
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Добавляем отдельный обработчик для крестика
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked'); // Для отладки
            closeImageModal();
        });
    }
});

// Обновляем стили для предотвращения прокрутки
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        body.modal-open {
            overflow: hidden !important;
            padding-right: var(--scrollbar-width, 0px);
        }
        
        .modal-content img {
            transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Исправляем "прыжок" при блокировке прокрутки */
        html {
            --scrollbar-width: 0px;
        }
        
        @media (hover: hover) {
            html {
                --scrollbar-width: calc(100vw - 100%);
            }
        }
    `;
    document.head.appendChild(style);
});

// Функция для переключения мобильного меню (обновленная версия)
function toggleMobileMenu() {
    const nav = document.getElementById('mobile-nav');
    const body = document.body;
    
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
    }
}

// Функция для закрытия мобильного меню (обновленная версия)
function closeMobileMenu() {
    const nav = document.getElementById('mobile-nav');
    const body = document.body;
    
    nav.classList.remove('active');
    body.classList.remove('menu-open');
    
    // Дополнительная проверка через небольшую задержку
    setTimeout(() => {
        if (!nav.classList.contains('active')) {
            body.style.overflow = '';
            body.classList.remove('menu-open');
        }
    }, 50);
}

// Закрытие меню при клике на фон или крестик
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('mobile-nav');
    
    // Закрытие при клике на фон
    nav.addEventListener('click', function(e) {
        if (e.target === nav || e.target.matches('nav::before')) {
            closeMobileMenu(); // Используем новую функцию
        }
    });
    
    // Закрытие при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu(); // Используем новую функцию
        });
    });
    
    // Закрытие при изменении размера экрана
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            closeMobileMenu(); // Используем новую функцию
        }
    });
    
    // Улучшенная прокрутка для мобильных
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Сначала закрываем меню и восстанавливаем прокрутку
            closeMobileMenu();
            
            // Небольшая задержка перед прокруткой
            setTimeout(() => {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100); // Задержка 100мс для плавности
        });
    });
    
    // Touch события для лучшего UX
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - можно добавить действие
            } else {
                // Swipe down - можно добавить действие
            }
        }
    }
    
    // Дополнительная проверка для восстановления прокрутки
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Если страница стала видимой, убеждаемся что прокрутка работает
            const nav = document.getElementById('mobile-nav');
            if (!nav.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        }
    });
    
    // Обработчик для escape ключа
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});

// Load translations on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    loadTheme();
    
    // Убираем дублирующуюся обработку smooth scroll, она уже есть выше
    addScrollAnimations();
    showCookieConsent();
    setupContactForm();
    
    // Дополнительная проверка прокрутки при загрузке
    document.body.style.overflow = '';
});

function updateContent(lang) {
    if (!translations[lang]) return;
    
    const elementsWithDataKey = document.querySelectorAll('[data-key]');
    elementsWithDataKey.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Обновляем мета-теги
    document.documentElement.lang = lang;
    document.title = translations[lang].title || document.title;
    
    // Сохраняем выбранный язык
    localStorage.setItem('selectedLanguage', lang);
    
    console.log(`Language changed to: ${lang}`); // Для отладки
}

// Упрощенная загрузка фонового изображения
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    // Простая проверка загрузки изображения
    const testImage = new Image();
    testImage.onload = function() {
        console.log('Фоновое изображение загружено успешно');
        hero.style.backgroundImage = 'url("images/hero-bg.jpg"), linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)';
    };
    
    testImage.onerror = function() {
        console.log('Ошибка загрузки изображения, используем градиент');
        hero.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)';
    };
    
    // Тестируем загрузку
    testImage.src = 'images/hero-bg.jpg';
});

// Улучшенная система уведомлений
function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; margin-left: 1rem;">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Автоматическое удаление
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

// Улучшенная обработка ошибок
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    showNotification('Wystąpił błąd. Spróbuj odświeżyć stronę.', 'error');
});

// Улучшенная обработка форм
const setupAdvancedContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // Валидация в реальном времени
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Валидация всех полей
        const isValid = Array.from(inputs).every(validateField);
        
        if (!isValid) {
            showNotification('Proszę poprawić błędy w formularzu', 'error');
            return;
        }
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Показать loading состояние
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wysyłanie...';
        submitBtn.disabled = true;
        form.classList.add('loading');
        
        try {
            // Симуляция отправки (замените на реальную отправку)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Wiadomość została wysłana pomyślnie!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Błąd во время отправки сообщения', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.classList.remove('loading');
        }
    });
};

function validateField(event) {
    const field = event.target || event;
    const value = field.value.trim();
    let isValid = true;
    
    // Удаляем предыдущие ошибки
    clearFieldError({ target: field });
    
    // Валидация email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Nieprawidłowy format email');
            isValid = false;
        }
    }
    
    // Валидация обязательных полей
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'To pole jest wymagane');
        isValid = false;
    }
    
    // Валидация минимальной длины для сообщения
    if (field.name === 'message' && value && value.length < 10) {
        showFieldError(field, 'Wiadomość musi mieć co najmniej 10 znaków');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Улучшенная анимация при скролле
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Добавляем класс fade-in ко всем секциям и элементам
    document.querySelectorAll('section, .feature, .product, .step').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
};

// Улучшенная производительность
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Оптимизированная обработка скролла
const optimizedScrollHandler = debounce(() => {
    animateOnScroll();
}, 16); // ~60fps

window.removeEventListener('scroll', animateOnScroll);
window.addEventListener('scroll', optimizedScrollHandler);

// Обновляем главную функцию загрузки
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    loadTheme();
    
    // Добавляем skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Przejdź do treści';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    observeElements();
    showCookieConsent();
    setupAdvancedContactForm();
    
    // Дополнительная проверка прокрутки при загрузке
    document.body.style.overflow = '';
    
    // Показываем, что страница загружена
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Улучшенная поддержка свайпов для мобильных устройств
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isSwipeNavigation = false;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwipeNavigation = false;
    }, { passive: true });
    
    modal.addEventListener('touchmove', function(e) {
        const touchCurrentX = e.changedTouches[0].screenX;
        const touchCurrentY = e.changedTouches[0].screenY;
        
        const diffX = Math.abs(touchCurrentX - touchStartX);
        const diffY = Math.abs(touchCurrentY - touchStartY);
        
        // Если горизонтальное движение больше вертикального, это навигация
        if (diffX > diffY && diffX > 10) {
            isSwipeNavigation = true;
            e.preventDefault(); // Предотвращаем прокрутку
        }
    }, { passive: false });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    }, { passive: true });
    
    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);
        
        // Проверяем, что это горизонтальный свайп
        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // Свайп влево - следующее изображение
                navigateModal(1);
            } else {
                // Свайп вправо - предыдущее изображение
                navigateModal(-1);
            }
        }
        // Свайп вниз для закрытия
        else if (touchStartY - touchEndY < -100 && !isSwipeNavigation) {
            closeImageModal();
        }
    }
});

// Функции для работы с темой
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
    
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeButton = document.getElementById('theme-toggle');
    if (themeButton) {
        const icon = themeButton.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }
}