// OSIRIS BOOKSHOP - About Page JavaScript
// Updated with Red/Orange/Yellow Color Scheme

// Error handling for better debugging
window.addEventListener('error', function(e) {
    console.error('About Page JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('About Page Unhandled Promise Rejection:', e.reason);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('About page DOM loaded, initializing...');
    try {
        initAboutPage();
    } catch (error) {
        console.error('Error in initAboutPage:', error);
    }
});

function initAboutPage() {
    // Initialize all components with error handling
    initLoadingScreen();
    initParticleSystem();
    initScrollAnimations();
    initStatsCounter();
    initNavigation();
    initScrollToTop();
    initSearchFunctionality();
    initCartSystem();
    initFloatingElements();
    initTeamInteractions();
    initTimelineAnimations();
    initValueCards();
    initPartnerLogos();
    initCTAButtons();
}

// -------------------- ENHANCED LOADING SCREEN --------------------
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    if (!loadingScreen || !progressFill || !progressText) {
        console.warn('Loading elements not found');
        return;
    }

    let progress = 0;
    const loadingSteps = [
        { progress: 15, text: 'جاري تحميل معلومات المكتبة...', delay: 200 },
        { progress: 35, text: 'إعداد البيانات...', delay: 400 },
        { progress: 55, text: 'تحميل الصور...', delay: 600 },
        { progress: 75, text: 'إعداد الأنيميشن...', delay: 800 },
        { progress: 90, text: 'شكراً لانتظارك...', delay: 1000 },
        { progress: 100, text: 'تم الانتهاء!', delay: 1200 }
    ];

    let currentStep = 0;

    function updateProgress() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];

            setTimeout(() => {
                progress = step.progress;
                progressFill.style.width = progress + '%';
                progressText.textContent = progress + '%';

                // Add loading text if element exists
                const loadingText = document.querySelector('.loading-dots span');
                if (loadingText) {
                    loadingText.textContent = step.text;
                }

                currentStep++;
                updateProgress();
            }, step.delay);
        } else {
            // Complete loading
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 500);
        }
    }

    // Start loading process
    updateProgress();
}

// -------------------- PARTICLE SYSTEM --------------------
function initParticleSystem() {
    const particlesContainer = document.getElementById('particlesContainer');
    if (!particlesContainer) return;

    const particleCount = 30;
    const bookParticleCount = 5;

    // Create regular particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, 'regular');
    }

    // Create book particles
    for (let i = 0; i < bookParticleCount; i++) {
        createParticle(particlesContainer, 'book');
    }

    // Add mouse interaction
    document.addEventListener('mousemove', function(e) {
        const particles = particlesContainer.querySelectorAll('.particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
                Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
            );

            if (distance < 100) {
                particle.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.1}px, ${(e.clientY - rect.top - rect.height / 2) * 0.1}px)`;
                particle.style.opacity = '0.3';
            } else {
                particle.style.transform = 'translate(0, 0)';
                particle.style.opacity = '0.1';
            }
        });
    });
}

function createParticle(container, type) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    if (type === 'book') {
        particle.innerHTML = '📚';
        particle.style.fontSize = '1.5rem';
    }

    const size = type === 'book' ? 20 : Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 15 + 10;
    const colors = ['#ef444455', '#f9731655', '#fbbf2455', '#ff6b6b55', '#f59e0b55'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        width:${size}px; height:${size}px;
        left:${posX}%; top:${posY}%;
        animation-delay:${delay}s; animation-duration:${duration}s;
        background:${type === 'book' ? 'transparent' : color};
        color:${type === 'book' ? '#ef4444' : 'transparent'};
    `;

    // Add hover effect
    particle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.5)';
        this.style.opacity = '0.8';
    });

    particle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.opacity = '0.1';
    });

    container.appendChild(particle);
}

// -------------------- SCROLL ANIMATIONS --------------------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .timeline-item, .mission-card, .vision-card, .value-item, .team-member, .partner-logo');

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

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// -------------------- STATS COUNTER --------------------
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// -------------------- NAVIGATION --------------------
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('section, .main-content');

    // Set initial active link
    setActiveNavLink();

    // Update on scroll
    window.addEventListener('scroll', throttle(setActiveNavLink, 100));

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // إذا كان الرابط يشير إلى صفحة خارجية (ليست #)
            if (!href.startsWith('#')) {
                return; // دع السلوك الافتراضي يعمل (الانتقال إلى الصفحة)
            }

            // إذا كان الرابط يشير إلى عنصر في نفس الصفحة
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    function setActiveNavLink() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');

                    // Update indicator position
                    if (navIndicator) {
                        const linkRect = activeLink.getBoundingClientRect();
                        const navRect = activeLink.closest('.nav-menu').getBoundingClientRect();
                        navIndicator.style.left = (linkRect.left - navRect.left) + 'px';
                        navIndicator.style.width = linkRect.width + 'px';
                        navIndicator.style.opacity = '1';
                    }
                }
            }
        });
    }
}

// -------------------- SCROLL TO TOP --------------------
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }, 100));

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// -------------------- SEARCH FUNCTIONALITY --------------------
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchSuggestions = document.getElementById('searchSuggestions');

    if (!searchInput || !searchBtn) return;

    const suggestions = [
        'كتب علمية', 'أكاديمية', 'بحث', 'دراسة', 'مكتبة',
        'أوزيريس', 'نشر', 'طباعة', 'توزيع', 'كتب إلكترونية'
    ];

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim();

        if (query.length > 0) {
            showSuggestions(query, suggestions);
        } else {
            hideSuggestions();
        }
    }, 300));

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            hideSuggestions();
        }
    });

    function showSuggestions(query, suggestions) {
        const filtered = suggestions.filter(s => s.includes(query));

        if (filtered.length > 0) {
            searchSuggestions.innerHTML = filtered.map(suggestion =>
                `<div class="suggestion-item" data-suggestion="${suggestion}">${suggestion}</div>`
            ).join('');

            searchSuggestions.style.display = 'block';

            // Add click handlers to suggestions
            searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.dataset.suggestion;
                    hideSuggestions();
                    performSearch(item.dataset.suggestion);
                });
            });
        } else {
            hideSuggestions();
        }
    }

    function hideSuggestions() {
        searchSuggestions.style.display = 'none';
    }

    function performSearch(query) {
        console.log('Searching for:', query);
        // Implement search logic here
        hideSuggestions();
    }
}

// -------------------- CART SYSTEM --------------------
function initCartSystem() {
    const cartLink = document.querySelector('.cart-link');
    const cartCount = document.querySelector('.cart-count');

    if (!cartLink || !cartCount) return;

    // Load cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('osiris_cart') || '[]');
    updateCartCount(cart.length);

    // Listen for cart updates
    window.addEventListener('cartUpdated', (e) => {
        updateCartCount(e.detail.count);
    });

    function updateCartCount(count) {
        if (count > 0) {
            cartCount.textContent = count;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// -------------------- FLOATING ELEMENTS --------------------
function initFloatingElements() {
    // Add floating books animation
    const floatingBooks = document.createElement('div');
    floatingBooks.className = 'floating-books';
    document.body.appendChild(floatingBooks);

    const bookIcons = ['📚', '📖', '📕', '📗', '📘', '📙'];

    for (let i = 0; i < 6; i++) {
        const book = document.createElement('div');
        book.className = `floating-book book-${i + 1}`;
        book.textContent = bookIcons[i];
        book.style.cssText = `
            position: absolute;
            font-size: 2rem;
            color: rgba(0, 212, 255, 0.2);
            animation: floatingBookAnimation 15s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        floatingBooks.appendChild(book);
    }

    // Add CSS for floating books
    const style = document.createElement('style');
    style.textContent = `
        .floating-books {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes floatingBookAnimation {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.2;
            }
            90% {
                opacity: 0.2;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// -------------------- TEAM INTERACTIONS --------------------
function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// -------------------- TIMELINE ANIMATIONS --------------------
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s ease';
        observer.observe(item);
    });
}

// -------------------- VALUE CARDS --------------------
function initValueCards() {
    const valueItems = document.querySelectorAll('.value-item');

    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
            this.style.boxShadow = '0 20px 50px rgba(0, 212, 255, 0.3)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.1)';
        });
    });
}

// -------------------- PARTNER LOGOS --------------------
function initPartnerLogos() {
    const partnerLogos = document.querySelectorAll('.partner-logo');

    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.querySelector('img').style.filter = 'grayscale(0%) brightness(1.2)';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.querySelector('img').style.filter = 'grayscale(100%)';
        });
    });
}

// -------------------- CTA BUTTONS --------------------
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// -------------------- UTILITY FUNCTIONS --------------------
function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

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

// -------------------- NOTIFICATION SYSTEM --------------------
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        padding: 1rem 2rem;
        color: white;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// -------------------- PERFORMANCE OPTIMIZATION --------------------
// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// -------------------- ACCESSIBILITY --------------------
function initAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .cta-btn, .team-member, .value-item');

    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        *:focus {
            outline: 2px solid var(--accent-red);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize accessibility features
initAccessibility();

console.log('About page JavaScript initialized with Red/Orange/Yellow color scheme!');

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