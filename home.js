// OSIRIS BOOKSHOP - Enhanced JavaScript with Animations and Interactions
// Responsive Design Optimized

// Error handling for better debugging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Responsive utilities
const ResponsiveUtils = {
    isMobile: () => window.innerWidth <= 767,
    isTablet: () => window.innerWidth > 767 && window.innerWidth <= 991,
    isDesktop: () => window.innerWidth > 991,
    isLandscape: () => window.innerHeight < window.innerWidth,

    getScreenSize: () => {
        if (window.innerWidth <= 375) return 'xs';
        if (window.innerWidth <= 575) return 'sm';
        if (window.innerWidth <= 767) return 'md';
        if (window.innerWidth <= 991) return 'lg';
        if (window.innerWidth <= 1199) return 'xl';
        return 'xxl';
    },

    // Adjust particle count based on screen size
    getParticleCount: () => {
        const size = ResponsiveUtils.getScreenSize();
        const counts = { xs: 15, sm: 25, md: 35, lg: 45, xl: 55, xxl: 65 };
        return counts[size] || 45;
    },

    // Get optimal animation duration based on device
    getAnimationDuration: () => {
        if (ResponsiveUtils.isMobile()) return '8s';
        if (ResponsiveUtils.isTablet()) return '6s';
        return '4s';
    },

    // Get optimal font size multiplier
    getFontScale: () => {
        const size = ResponsiveUtils.getScreenSize();
        const scales = { xs: 0.7, sm: 0.8, md: 0.9, lg: 1, xl: 1.1, xxl: 1.2 };
        return scales[size] || 1;
    },

    // Adjust animation performance based on device
    shouldReduceMotion: () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            ResponsiveUtils.isMobile();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    try {
        // Initialize the application
        initApp();
    } catch (error) {
        console.error('Error in initApp:', error);
        // تخطي شاشة التحميل في حالة حدوث خطأ
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
});

function initApp() {
    try {
        // Initialize all components with error handling
        initLoadingScreen();
        initParticleSystem();
        initNavigation();
        initHeroAnimations();
        initBookFilters();
        initStatsCounters();
        initScrollAnimations();
        initScrollToTop();
        initSearchFunctionality();
        initCartSystem();
        initDarkMode();
        initResponsiveHandlers();
    } catch (error) {
        console.error('Error in initApp:', error);
        // تخطي شاشة التحميل في حالة حدوث خطأ
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
}

// Advanced Loading Screen with Progress Simulation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const floatingBooks = document.querySelectorAll('.floating-book');

    // Check if elements exist
    if (!loadingScreen || !progressFill || !progressText) {
        console.error('Loading screen elements not found');
        return;
    }

    // Animate floating books with random delays
    floatingBooks.forEach((book, index) => {
        book.style.animationDelay = `${index * 0.5}s`;
    });

    // Simulate loading progress with more realistic steps
    let progress = 0;
    const loadingSteps = [
        { progress: 20, delay: 500 },
        { progress: 40, delay: 800 },
        { progress: 60, delay: 1000 },
        { progress: 80, delay: 1200 },
        { progress: 95, delay: 1500 },
        { progress: 100, delay: 2000 }
    ];

    let currentStep = 0;

    function updateProgress() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            progress = step.progress;

            // Update progress bar and text with smooth animation
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;

            // Add loading text based on progress
            const loadingText = document.querySelector('.loading-dots span');
            if (loadingText) {
                const texts = [
                    'جاري تحضير مكتبتك...',
                    'تحميل الكتب...',
                    'إعداد الفهارس...',
                    'تحضير البحث...',
                    'شكراً لانتظارك...',
                    'تم الانتهاء!'
                ];
                loadingText.textContent = texts[currentStep] || texts[0];
            }

            currentStep++;

            if (currentStep < loadingSteps.length) {
                setTimeout(updateProgress, step.delay);
            } else {
                // Complete loading
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        // Initialize animations after loading
                        initScrollAnimations();
                    }, 1000);
                }, 500);
            }
        }
    }

    // Start the loading process
    setTimeout(updateProgress, 300);
}

// Particle System for Background
function initParticleSystem() {
    const particlesContainer = document.getElementById('particlesContainer');
    if (!particlesContainer) return;

    const particleCount = ResponsiveUtils.getParticleCount();

    // Clear existing particles
    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }

    // Store reference for responsive control
    window.particleSystem = {
        container: particlesContainer,
        setParticleCount: (count) => {
            particlesContainer.innerHTML = '';
            for (let i = 0; i < count; i++) {
                createParticle(particlesContainer);
            }
        },
        pause: () => {
            const particles = particlesContainer.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationPlayState = 'paused';
            });
        },
        resume: () => {
            const particles = particlesContainer.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationPlayState = 'running';
            });
        }
    };
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Responsive properties
    const isMobile = ResponsiveUtils.isMobile();
    const isTablet = ResponsiveUtils.isTablet();

    // Random properties with responsive adjustments
    const baseSize = isMobile ? 3 : isTablet ? 4 : 5;
    const size = Math.random() * baseSize + (isMobile ? 1 : 2);
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    const baseDuration = isMobile ? 20 : isTablet ? 18 : 15;
    const duration = Math.random() * 10 + baseDuration;
    const color = getRandomParticleColor();

    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.background = color;

    // Add responsive class
    if (isMobile) {
        particle.classList.add('particle-mobile');
    } else if (isTablet) {
        particle.classList.add('particle-tablet');
    }

    container.appendChild(particle);
}

function getRandomParticleColor() {
    const colors = [
        'rgba(239, 68, 68, 0.3)',
        'rgba(249, 115, 22, 0.3)',
        'rgba(251, 191, 36, 0.3)',
        'rgba(255, 107, 107, 0.3)',
        'rgba(245, 158, 11, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Navigation with Active State and Indicator - تم التصحيح
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('section, .main-content');

    // Set initial active link
    setActiveNavLink();

    // Update on scroll
    window.addEventListener('scroll', throttle(setActiveNavLink, 100));

    // Smooth scroll for nav links - تم التصحيح هنا
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // إذا كان الرابط يشير إلى صفحة خارجية (ليست #)
            if (!href.startsWith('#')) {
                return; // دع السلوك الافتراضي يعمل (الانتقال إلى الصفحة)
            }

            // إذا كان الرابط يشير إلى قسم في نفس الصفحة
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                smoothScrollTo(targetSection, 1000);
            }
        });
    });

    function setActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            // إذا كان الرابط يشير إلى قسم في نفس الصفحة
            if (href.startsWith('#') && href.substring(1) === currentSection) {
                link.classList.add('active');

                // Update nav indicator position
                const linkRect = link.getBoundingClientRect();
                const navRect = link.closest('.nav-menu').getBoundingClientRect();

                if (navIndicator && linkRect && navRect) {
                    navIndicator.style.width = `${linkRect.width}px`;
                    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
                    navIndicator.style.opacity = '1';
                }
            }
        });
    }
}

// Hero Section Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroTags = document.querySelectorAll('.tag');
    const orbitingElements = document.querySelectorAll('.orbit');

    // Animate orbiting elements with different speeds
    orbitingElements.forEach((orbit, index) => {
        orbit.style.animationDuration = `${15 + index * 5}s`;
    });

    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.querySelector('.btn-bg-animation').style.left = '100%';
        });

        button.addEventListener('mouseleave', function() {
            this.querySelector('.btn-bg-animation').style.left = '-100%';
        });
    });
}

// Book Filtering System
function initBookFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const booksGrid = document.getElementById('booksGrid');

    // Generate sample books (in a real app, this would come from an API)
    generateBooks(booksGrid, 12);

    // Add filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter books
            const filter = this.getAttribute('data-filter');
            filterBooks(booksGrid, filter);
        });
    });
}





// بيانات الكتب - اكتبي كل كتاب كـ object هنا
const booksData = [{
        title: 'ماذا تفقد المرأه عندما تتزوج',
        author: 'دكتور-ايمان عليوة',
        category: 'academic',
        price: 100,
        image: 'images/women.png',
        description: ''
    },
    {
        title: 'dizionario hoepli arabo',
        author: 'دكتور-c.m.tresso',
        category: 'academic',
        price: 350,
        image: 'images/1660126752.jpeg',
        description: ''
    },
    {
        title: 'Lecciones Estilisticas En El Espanol Y ',
        author: ' .د.-عبد العزيز فهد',
        category: 'dictionaries',
        price: '',
        image: 'images/1662634755.jpeg',
        description: ''

    },
    {
        title: "Via della Grammatica. teoria, esercizi, test e materiale autentico per stranieri. A1-",
        author: ' دكتور-ricci',
        category: 'dictionaries',
        price: 350,
        image: 'images/1660127623.jpg',
        description: ''

    }
    // زوّدي باقي الكتب بنفس الشكل
];

// إنشاء الكروت لكل كتاب
function generateBooks(container, books) {
    books.forEach(book => {
        const bookCard = createBookCard(book);
        container.appendChild(bookCard);
    });
}

// تعديل createBookCard ليستقبل object
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card animate-fade-in';
    card.setAttribute('data-category', book.category);

    card.innerHTML = `
        <div class="book-image">
            <img src="${book.image}" alt="${book.title}">
            <div class="book-overlay">
                <span class="book-category">${getCategoryName(book.category)}</span>
            </div>
        </div>
        <div class="book-content">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <p class="book-description">${book.description}</p>
            <div class="book-footer">
                <span class="book-price">${book.price} ج.م</span>
                <button class="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;

    // زرار إضافة للسلة
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        addToCart(book.title, book.price);
        animateAddToCart(this);
    });

    return card;
}

// استدعاء التوليد بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('booksGrid');
    generateBooks(container, booksData);
});


function getCategoryName(category) {
    const categories = {
        'dictionaries': 'قواميس',
        'languages': 'لغات',
        'academic': 'أكاديمية',
        'modern': 'حديثة',
        'bestsellers': 'الأكثر مبيعاً'
    };
    return categories[category] || category;
}

function filterBooks(container, filter) {
    const books = container.querySelectorAll('.book-card');

    books.forEach(book => {
        if (filter === 'all' || book.getAttribute('data-category') === filter) {
            book.style.display = 'block';
            setTimeout(() => {
                book.classList.add('animate-fade-in');
            }, 50);
        } else {
            book.classList.remove('animate-fade-in');
            book.style.display = 'none';
        }
    });
}

// Statistics Counters
function initStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number-enhanced, .stat-number-mini');
    const progressCircles = document.querySelectorAll('.progress-circle');

    // Check if stats are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats counters
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });

                // Animate progress circles
                progressCircles.forEach(circle => {
                    animateProgressCircle(circle);
                });

                // Stop observing after animation
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    // Observe stats section
    const statsSection = document.querySelector('.stats-section-enhanced');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current).toLocaleString();
    }, 16);
}

function animateProgressCircle(circle) {
    const percent = circle.getAttribute('data-percent');
    const radius = circle.getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100 * circumference);

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    // Animate the progress
    setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
        circle.style.strokeDashoffset = offset;
    }, 500);
}

// Scroll Animations for Elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animated-section, .book-card, .stat-item-enhanced');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Scroll to Top Functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100));

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        smoothScrollTo(document.body, 800);
    });
}

// Search Functionality with Suggestions
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchSuggestions = document.getElementById('searchSuggestions');

    // Sample search data (in a real app, this would come from an API)
    const searchData = [
        'قاموس أكسفورد',
        'كتب تعليم الإنجليزية',
        'الرياضيات المتقدمة',
        'الفيزياء الحديثة',
        'علم النفس',
        'التاريخ الإسلامي',
        'أدب عربي',
        'علوم الحاسب',
        'إدارة الأعمال',
        'التسويق الرقمي'
    ];

    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.trim();

        if (query.length > 1) {
            const suggestions = searchData.filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            );

            showSearchSuggestions(suggestions, query);
        } else {
            hideSearchSuggestions();
        }
    }, 300));

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            hideSearchSuggestions();
        }
    });
}

function showSearchSuggestions(suggestions, query) {
    const searchSuggestions = document.getElementById('searchSuggestions');

    if (suggestions.length === 0) {
        searchSuggestions.innerHTML = '<div class="suggestion-item">لا توجد نتائج</div>';
    } else {
        searchSuggestions.innerHTML = suggestions.map(suggestion =>
            `<div class="suggestion-item">${highlightMatch(suggestion, query)}</div>`
        ).join('');
    }

    searchSuggestions.style.display = 'block';
}

function hideSearchSuggestions() {
    const searchSuggestions = document.getElementById('searchSuggestions');
    searchSuggestions.style.display = 'none';
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Shopping Cart System - تم التصحيح
function initCartSystem() {
    const cartLink = document.querySelector('.cart-link');
    const cartCount = document.querySelector('.cart-count');

    // Initialize cart from localStorage
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('osiris_cart')) || [];
    } catch (e) {
        console.error('Error reading cart from localStorage:', e);
        cart = [];
    }

    updateCartCount(cart.length);

    // Cart click event - تم التصحيح هنا
    cartLink.addEventListener('click', function(e) {
        // اترك السلوك الافتراضي يعمل (الانتقال إلى صفحة cart.html)
        // لا تمنع السلوك الافتراضي هنا
    });
}

function addToCart(title, price) {
    // التحقق من توفر localStorage
    if (typeof(Storage) === "undefined") {
        showNotification("المتصفح لا يدعم خاصية التخزين المحلي");
        return;
    }

    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('osiris_cart')) || [];
    } catch (e) {
        console.error('Error reading cart from localStorage:', e);
        cart = [];
    }

    // Add item to cart
    cart.push({
        id: Date.now(),
        title: title,
        price: price,
        quantity: 1
    });

    // Save to localStorage
    try {
        localStorage.setItem('osiris_cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart to localStorage:', e);
        showNotification("حدث خطأ في إضافة المنتج إلى السلة");
        return;
    }

    // Update UI
    updateCartCount(cart.length);

    // Show notification
    showNotification(`تم إضافة "${title}" إلى عربة التسوق`);
}

function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');

    if (count > 0) {
        cartCount.textContent = count;
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function animateAddToCart(button) {
    button.classList.add('adding');

    setTimeout(() => {
        button.classList.remove('adding');
    }, 1000);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(-100px);
        opacity: 0;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);

    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-100px)';
        notification.style.opacity = '0';

        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Dark Mode Toggle (Optional)
function initDarkMode() {
    // This is already a dark theme, but we can add a toggle to switch to light mode if needed
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <button class="toggle-btn">
            <i class="fas fa-moon"></i>
        </button>
    `;

    document.body.appendChild(darkModeToggle);

    const toggleBtn = document.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function smoothScrollTo(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add some CSS for the notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .highlight {
        background: var(--accent-gold);
        color: var(--primary-dark);
        padding: 0 0.2rem;
        border-radius: 3px;
        font-weight: 700;
    }
    
    .suggestion-item {
        padding: 0.8rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .suggestion-item:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .adding {
        animation: addToCartAnimation 0.5s ease;
    }
    
    @keyframes addToCartAnimation {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    /* Light mode styles (optional) */
    .light-mode {
        --primary-dark: #f8f9fa;
        --secondary-dark: #e9ecef;
        --tertiary-dark: #dee2e6;
        --glass-bg: rgba(255, 255, 255, 0.7);
        --glass-border: rgba(0, 0, 0, 0.1);
        --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        color: #212529;
    }
    
    .light-mode .glassmorphism {
        background: var(--glass-bg);
    }
    
    .light-mode .search-input {
        background: var(--glass-bg);
        color: #212529;
        border-color: var(--glass-border);
    }
    
    .light-mode .search-input::placeholder {
        color: rgba(33, 37, 41, 0.5);
    }
`;
document.head.appendChild(notificationStyles);

// Responsive Handlers
function initResponsiveHandlers() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(handleOrientationChange, 100);
    });

    // Handle reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);

    // Initial responsive setup
    handleResize();
    // أضف هذا السطر لضمان التوافق مع جميع العناصر
    window.dispatchEvent(new Event('resize'));
}

function handleResize() {
    const screenSize = ResponsiveUtils.getScreenSize();
    const isMobile = ResponsiveUtils.isMobile();
    const isTablet = ResponsiveUtils.isTablet();

    // Update body class for responsive styling
    document.body.className = document.body.className.replace(/screen-\w+/g, '');
    document.body.classList.add(`screen-${screenSize}`);

    if (isMobile) {
        document.body.classList.add('mobile-device');
    } else if (isTablet) {
        document.body.classList.add('tablet-device');
    } else {
        document.body.classList.add('desktop-device');
    }

    // Adjust floating elements for mobile
    adjustFloatingElements();

    // Adjust hero animations
    adjustHeroAnimations();

    // Adjust particle system
    adjustParticleSystem();

    // Adjust navigation
    adjustNavigation();

    // Adjust search functionality
    adjustSearchFunctionality();

    console.log(`Screen resized to: ${screenSize} (${window.innerWidth}x${window.innerHeight})`);
}

function handleOrientationChange() {
    // Recalculate layouts after orientation change
    setTimeout(() => {
        handleResize();
        // Reinitialize animations that depend on viewport
        if (window.particleSystem) {
            window.particleSystem.resize();
        }
    }, 100);
}

function handleMotionPreferenceChange(e) {
    if (e.matches) {
        // User prefers reduced motion
        document.body.classList.add('reduced-motion');
        // Disable heavy animations
        disableHeavyAnimations();
    } else {
        // User prefers normal motion
        document.body.classList.remove('reduced-motion');
        // Re-enable animations
        enableAnimations();
    }
}

function adjustFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element, .floating-mega-book, .orbiting-elements');
    const animationDuration = ResponsiveUtils.getAnimationDuration();

    floatingElements.forEach(element => {
        if (ResponsiveUtils.isMobile()) {
            // Reduce animation intensity on mobile
            element.style.setProperty('--animation-duration', animationDuration);
            element.style.setProperty('--float-intensity', '0.5');
            element.style.setProperty('--transform-scale', '0.8');
        } else if (ResponsiveUtils.isTablet()) {
            element.style.setProperty('--animation-duration', animationDuration);
            element.style.setProperty('--float-intensity', '0.7');
            element.style.setProperty('--transform-scale', '0.9');
        } else {
            element.style.setProperty('--animation-duration', animationDuration);
            element.style.setProperty('--float-intensity', '1');
            element.style.setProperty('--transform-scale', '1');
        }
    });

    // Adjust specific floating elements
    const megaBook = document.querySelector('.floating-mega-book');
    if (megaBook) {
        const scale = ResponsiveUtils.getFontScale();
        megaBook.style.setProperty('--book-scale', scale);
    }
}

function adjustHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const fontScale = ResponsiveUtils.getFontScale();

    if (ResponsiveUtils.isMobile()) {
        // Simplify hero animations on mobile
        if (heroTitle) {
            heroTitle.style.setProperty('--word-delay', '0.1s');
            heroTitle.style.setProperty('--font-scale', fontScale);
        }
        if (heroSubtitle) {
            heroSubtitle.style.setProperty('--animation-duration', '2s');
            heroSubtitle.style.setProperty('--font-scale', fontScale);
        }
        if (heroDescription) {
            heroDescription.style.setProperty('--font-scale', fontScale);
        }
    } else if (ResponsiveUtils.isTablet()) {
        if (heroTitle) {
            heroTitle.style.setProperty('--word-delay', '0.2s');
            heroTitle.style.setProperty('--font-scale', fontScale);
        }
        if (heroSubtitle) {
            heroSubtitle.style.setProperty('--animation-duration', '3s');
            heroSubtitle.style.setProperty('--font-scale', fontScale);
        }
        if (heroDescription) {
            heroDescription.style.setProperty('--font-scale', fontScale);
        }
    } else {
        if (heroTitle) {
            heroTitle.style.setProperty('--word-delay', '0.3s');
            heroTitle.style.setProperty('--font-scale', fontScale);
        }
        if (heroSubtitle) {
            heroSubtitle.style.setProperty('--animation-duration', '4s');
            heroSubtitle.style.setProperty('--font-scale', fontScale);
        }
        if (heroDescription) {
            heroDescription.style.setProperty('--font-scale', fontScale);
        }
    }
}

function adjustParticleSystem() {
    if (window.particleSystem) {
        const newCount = ResponsiveUtils.getParticleCount();
        window.particleSystem.setParticleCount(newCount);

        // Adjust existing particles for responsive behavior
        const particles = window.particleSystem.container.querySelectorAll('.particle');
        particles.forEach(particle => {
            // Remove old responsive classes
            particle.classList.remove('particle-mobile', 'particle-tablet');

            // Add appropriate responsive class
            if (ResponsiveUtils.isMobile()) {
                particle.classList.add('particle-mobile');
            } else if (ResponsiveUtils.isTablet()) {
                particle.classList.add('particle-tablet');
            }
        });
    }
}

function adjustNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (ResponsiveUtils.isMobile()) {
        // Adjust navigation for mobile
        if (navMenu) {
            navMenu.style.setProperty('--nav-gap', '0.5rem');
        }
        navLinks.forEach(link => {
            link.style.setProperty('--link-padding', '0.6rem 1rem');
        });
    } else if (ResponsiveUtils.isTablet()) {
        if (navMenu) {
            navMenu.style.setProperty('--nav-gap', '0.8rem');
        }
        navLinks.forEach(link => {
            link.style.setProperty('--link-padding', '0.8rem 1.2rem');
        });
    }
}

function adjustSearchFunctionality() {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const fontScale = ResponsiveUtils.getFontScale();

    if (ResponsiveUtils.isMobile()) {
        // Adjust search for mobile
        if (searchContainer) {
            searchContainer.style.setProperty('--search-width', '100%');
            searchContainer.style.setProperty('--search-max-width', '300px');
        }
        if (searchInput) {
            searchInput.style.setProperty('--input-font-size', `${0.9 * fontScale}rem`);
            searchInput.style.setProperty('--input-padding', '0.6rem 1rem');
        }
        if (searchBtn) {
            searchBtn.style.setProperty('--btn-padding', '0.6rem');
        }
    } else if (ResponsiveUtils.isTablet()) {
        if (searchContainer) {
            searchContainer.style.setProperty('--search-width', '80%');
            searchContainer.style.setProperty('--search-max-width', '400px');
        }
        if (searchInput) {
            searchInput.style.setProperty('--input-font-size', `${1 * fontScale}rem`);
            searchInput.style.setProperty('--input-padding', '0.8rem 1.2rem');
        }
        if (searchBtn) {
            searchBtn.style.setProperty('--btn-padding', '0.8rem');
        }
    } else {
        if (searchContainer) {
            searchContainer.style.setProperty('--search-width', '60%');
            searchContainer.style.setProperty('--search-max-width', '500px');
        }
        if (searchInput) {
            searchInput.style.setProperty('--input-font-size', `${1.1 * fontScale}rem`);
            searchInput.style.setProperty('--input-padding', '1rem 1.5rem');
        }
        if (searchBtn) {
            searchBtn.style.setProperty('--btn-padding', '1rem');
        }
    }
}

function disableHeavyAnimations() {
    // Disable particle system
    if (window.particleSystem) {
        window.particleSystem.pause();
    }

    // Disable floating animations
    const floatingElements = document.querySelectorAll('.floating-element, .floating-mega-book, .orbiting-elements');
    floatingElements.forEach(element => {
        element.style.animationPlayState = 'paused';
    });

    // Disable hero animations
    const heroElements = document.querySelectorAll('.hero-title .word, .hero-subtitle, .hero-description');
    heroElements.forEach(element => {
        element.style.animation = 'none';
    });

    // Disable book animations
    const bookElements = document.querySelectorAll('.book-card, .floating-logo-book');
    bookElements.forEach(element => {
        element.style.animationPlayState = 'paused';
    });
}

function enableAnimations() {
    // Re-enable particle system
    if (window.particleSystem) {
        window.particleSystem.resume();
    }

    // Re-enable floating animations
    const floatingElements = document.querySelectorAll('.floating-element, .floating-mega-book, .orbiting-elements');
    floatingElements.forEach(element => {
        element.style.animationPlayState = 'running';
    });

    // Re-enable hero animations
    const heroElements = document.querySelectorAll('.hero-title .word, .hero-subtitle, .hero-description');
    heroElements.forEach(element => {
        element.style.animation = '';
    });

    // Re-enable book animations
    const bookElements = document.querySelectorAll('.book-card, .floating-logo-book');
    bookElements.forEach(element => {
        element.style.animationPlayState = 'running';
    });
}

// ===== DARK/LIGHT MODE TOGGLE FUNCTIONALITY =====

// Initialize theme from localStorage or default to dark
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

// Toggle between dark and light mode
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Update theme toggle icon
function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector('.theme-toggle .sun');
    const moonIcon = document.querySelector('.theme-toggle .moon');
    
    if (theme === 'light') {
        if (sunIcon) sunIcon.style.display = 'flex';
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'flex';
    }
}

// Create theme toggle button
function createThemeToggle() {
    // Check if toggle button already exists
    const existingToggle = document.querySelector('.theme-toggle');
    if (existingToggle) {
        existingToggle.addEventListener('click', toggleTheme);
        return;
    }
    
    const toggleButton = document.createElement('div');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = `
        <i class="fas fa-sun sun"></i>
        <i class="fas fa-moon moon"></i>
    `;
    
    toggleButton.addEventListener('click', toggleTheme);
    document.body.appendChild(toggleButton);
}

// Initialize theme system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    createThemeToggle();
    
    // Force apply theme styles
    setTimeout(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, 100);
});

// Force theme application
function forceThemeApplication() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Force reflow
    document.body.offsetHeight;
    
    // Apply theme again
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// Call force theme application after a short delay
setTimeout(forceThemeApplication, 200);

// Additional force theme application
setTimeout(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        // Force apply light mode styles
        document.documentElement.setAttribute('data-theme', 'light');
        
        // Force reflow
        document.body.offsetHeight;
        
        // Apply theme again
        document.documentElement.setAttribute('data-theme', 'light');
        
        // Force all footer elements to be black
        const footerElements = document.querySelectorAll('.footer, .footer *');
        footerElements.forEach(element => {
            element.style.color = '#000000 !important';
            element.style.fontWeight = '500 !important';
        });
    }
}, 500);