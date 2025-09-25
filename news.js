// OSIRIS BOOKSHOP - Enhanced News Page JavaScript with Advanced Animations

// Error handling for better debugging
window.addEventListener('error', function(e) {
    console.error('News Page JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('News Page Unhandled Promise Rejection:', e.reason);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('News page DOM loaded, initializing...');
    try {
        initNewsPage();
    } catch (error) {
        console.error('Error in initNewsPage:', error);
    }
});

function initNewsPage() {
    // Initialize all components with error handling
    initLoadingScreen();
    initParticleSystem();
    initAdvancedFilter();
    initNewsView();
    initNewsData();
    initModal();
    initPagination();
    initStatsCounter();
    initScrollAnimations();
    initSearchFunctionality();
    initNewsInteractions();
    initFloatingElements();
    initNavigation();
    initScrollToTop();
    initCartSystem();
    initDarkMode();
}

// -------------------- ENHANCED LOADING SCREEN --------------------
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressText = document.querySelector('.loader-percent');
    const loadingText = document.querySelector('.loader-text');
    const progressBar = document.querySelector('.loader-progress-bar');
    
    if (!loadingScreen || !progressText) {
        console.warn('Loading elements not found');
        return;
    }

    let progress = 0;
    const loadingSteps = [
        { progress: 15, text: 'جاري تحميل الأخبار...', delay: 200 },
        { progress: 35, text: 'إعداد الفلاتر...', delay: 400 },
        { progress: 55, text: 'تحميل الصور...', delay: 600 },
        { progress: 75, text: 'إعداد البحث...', delay: 800 },
        { progress: 90, text: 'شكراً لانتظارك...', delay: 1000 },
        { progress: 100, text: 'تم الانتهاء!', delay: 1200 }
    ];

    let currentStep = 0;

    function updateProgress() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            progress = step.progress;
            
            // Update progress bar and text
            progressText.textContent = progress + "%";
            if (loadingText) {
                loadingText.textContent = step.text;
            }
            
            // Update progress bar width
            if (progressBar) {
                progressBar.style.width = progress + "%";
            }

            currentStep++;
            
            if (currentStep < loadingSteps.length) {
                setTimeout(updateProgress, step.delay);
            } else {
                // Complete loading
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                    }, 1000);
                }, 500);
            }
        }
    }

    // Start the loading process
    setTimeout(updateProgress, 100);
}

// -------------------- ENHANCED PARTICLE EFFECT --------------------
function initParticleSystem() {
    const particlesContainer = document.getElementById('particlesContainer');
    if (!particlesContainer) {
        console.warn('Particles container not found');
        return;
    }

    const particleCount = 40; // Increased particle count
    const bookParticleCount = 8; // Special book-shaped particles

    // Create regular particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, 'regular');
    }

    // Create special book particles
    for (let i = 0; i < bookParticleCount; i++) {
        createParticle(particlesContainer, 'book');
    }

    // Add mouse interaction
    particlesContainer.addEventListener('mousemove', handleMouseInteraction);
}

function createParticle(container, type = 'regular') {
    const particle = document.createElement('div');
    particle.classList.add('particle', type);

    const size = type === 'book' ? Math.random() * 8 + 6 : Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 15 + 10;
    
    const colors = ['#ef444455', '#f9731655', '#fbbf2455', '#ff6b6b55', '#f59e0b55'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (type === 'book') {
        particle.innerHTML = '<i class="fas fa-book"></i>';
        particle.style.fontSize = `${size}px`;
        particle.style.color = color;
    } else {
        particle.style.background = color;
    }

    particle.style.cssText += `
        width:${size}px; height:${size}px;
        left:${posX}%; top:${posY}%;
        animation-delay:${delay}s; animation-duration:${duration}s;
    `;
    
    container.appendChild(particle);

    // Add hover effect
    particle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.5) rotate(180deg)';
        this.style.transition = 'all 0.3s ease';
    });

    particle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

function handleMouseInteraction(e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY - (rect.top + rect.height / 2), 2)
        );

        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.style.transform = `scale(${1 + force * 0.5}) translate(${force * 10}px, ${force * 10}px)`;
            particle.style.transition = 'all 0.1s ease';
        } else {
            particle.style.transform = 'scale(1) translate(0, 0)';
        }
    });
}

// -------------------- FILTERS --------------------
function initAdvancedFilter() {
    const toggleBtn = document.querySelector('.toggle-filter-btn');
    const filterForm = document.getElementById('filterForm');
    const applyBtn = document.querySelector('.filter-apply-btn');
    const resetBtn = document.querySelector('.filter-reset-btn');
    const dateSlider = document.getElementById('newsDate');

    toggleBtn.addEventListener('click', function() {
        filterForm.classList.toggle('active');
        this.innerHTML = filterForm.classList.contains('active') ?
            '<i class="fas fa-chevron-up"></i>' :
            '<i class="fas fa-chevron-down"></i>';
    });

    dateSlider.addEventListener('input', function() {
        document.getElementById('dateMax').textContent = this.value;
    });

    applyBtn.addEventListener('click', performFilter);

    resetBtn.addEventListener('click', function() {
        document.querySelectorAll('#filterForm input, #filterForm select').forEach(input => {
            input.value = '';
        });
        dateSlider.value = new Date().getFullYear();
        document.getElementById('dateMax').textContent = new Date().getFullYear();
        performFilter();
    });

    document.querySelectorAll('#filterForm input[type="text"]').forEach(input => {
        input.addEventListener('input', debounce(performFilter, 500));
    });

    document.querySelectorAll('#filterForm select').forEach(select => {
        select.addEventListener('change', performFilter);
    });
}


// -------------------- VIEW MODES --------------------
function initNewsView() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const newsGrid = document.getElementById('newsGrid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            newsGrid.classList.toggle('list-view', this.getAttribute('data-view') === 'list');
        });
    });

    const sortSelect = document.getElementById('sortNews');
    sortSelect.addEventListener('change', function() {
        sortNews(this.value);
    });
}

// -------------------- DATA --------------------
function initNewsData() {
    const news = generateSampleNews(15);
    window.newsData = news;
    displayNews(news);
}

function generateSampleNews(count) {
    const categories = ['تقنية', 'ثقافة', 'أدب', 'علوم', 'إصدارات جديدة'];
    const newsList = [];

    for (let i = 0; i < count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        newsList.push({
            id: i + 1,
            title: `عنوان الخبر ${i + 1}`,
            category: category,
            date: 2020 + Math.floor(Math.random() * 5),
            excerpt: 'ملخص قصير للخبر يوضح الفكرة العامة ويجذب القارئ لقراءة المزيد...',
            content: 'هذا هو المحتوى الكامل للخبر، يحتوي على تفاصيل موسعة وصور وروابط مرتبطة بالموضوع.',
            image: `https://via.placeholder.com/400x200/1a1a1a/ffffff?text=News+${i + 1}`
        });
    }
    return newsList;
}

// -------------------- DISPLAY --------------------
function displayNews(news) {
    const newsGrid = document.getElementById('newsGrid');

    newsGrid.innerHTML = news.map(item => `
        <div class="news-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="news-image">
            <div class="news-content">
                <h3 class="news-title">${item.title}</h3>
                <div class="news-meta">
                    <span><i class="fas fa-folder"></i> ${item.category}</span>
                    <span><i class="fas fa-calendar"></i> ${item.date}</span>
                </div>
                <p class="news-excerpt">${item.excerpt}</p>
                <button class="news-btn view-details-btn" data-id="${item.id}">
                    <i class="fas fa-info-circle"></i> اقرأ المزيد
                </button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNewsDetails(this.getAttribute('data-id'));
        });
    });

    animateNews();
}

function animateNews() {
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// -------------------- FILTER --------------------
function performFilter() {
    const params = {
        title: document.getElementById('newsTitle').value.toLowerCase(),
        category: document.getElementById('newsCategory').value,
        date: parseInt(document.getElementById('newsDate').value)
    };

    const filtered = window.newsData.filter(item => {
        return (
            (params.title === '' || item.title.toLowerCase().includes(params.title)) &&
            (params.category === '' || item.category === params.category) &&
            (item.date <= params.date)
        );
    });

    displayNews(filtered);
}

// -------------------- SORT --------------------
function sortNews(sortBy) {
    let sorted = [...window.newsData];
    switch (sortBy) {
        case 'title':
            sorted.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
            break;
        case 'title-desc':
            sorted.sort((a, b) => b.title.localeCompare(a.title, 'ar'));
            break;
        case 'newest':
            sorted.sort((a, b) => b.date - a.date);
            break;
        case 'oldest':
            sorted.sort((a, b) => a.date - b.date);
            break;
    }
    window.newsData = sorted;
    displayNews(sorted);
}

// -------------------- MODAL --------------------
function initModal() {
    const modal = document.getElementById('newsModal');
    const closeBtn = document.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('show'); });
}

function showNewsDetails(newsId) {
    const news = window.newsData.find(n => n.id == newsId);
    const modal = document.getElementById('newsModal');
    const modalBody = document.querySelector('.modal-body');

    if (news) {
        modalBody.innerHTML = `
            <div class="news-details">
                <img src="${news.image}" alt="${news.title}" class="detail-image">
                <h2>${news.title}</h2>
                <div class="detail-meta">
                    <span><i class="fas fa-folder"></i> ${news.category}</span>
                    <span><i class="fas fa-calendar"></i> ${news.date}</span>
                </div>
                <p>${news.content}</p>
            </div>
        `;
        modal.classList.add('show');
    }
}

// -------------------- PAGINATION --------------------
function initPagination() {
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');

    prevBtn.addEventListener('click', () => { /* صفحة قبل */ });
    nextBtn.addEventListener('click', () => { /* صفحة بعد */ });
}

// -------------------- STATS COUNTER --------------------
function initStatsCounter() {
    document.querySelectorAll('.stat-number').forEach(stat => animateCounter(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1500;
    const increment = target / (duration / 16);
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

// -------------------- SCROLL ANIMATIONS --------------------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.news-card, .stat-item, .filter-section');
    
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

// -------------------- SEARCH FUNCTIONALITY --------------------
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput) return;

    const searchData = [
        'أخبار تقنية', 'أخبار ثقافية', 'أخبار أدبية', 'أخبار علمية',
        'إصدارات جديدة', 'فعاليات', 'ورش عمل', 'ندوات', 'معارض'
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
    if (!searchSuggestions) return;

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
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// -------------------- NEWS INTERACTIONS --------------------
function initNewsInteractions() {
    // Add hover effects to news cards
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.news-card')) {
            const card = e.target.closest('.news-card');
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.2)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.news-card')) {
            const card = e.target.closest('.news-card');
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Add click ripple effect
    document.addEventListener('click', function(e) {
        if (e.target.closest('.news-btn, .filter-btn, .view-btn')) {
            createRippleEffect(e);
        }
    });
}

function createRippleEffect(e) {
    const button = e.target.closest('.news-btn, .filter-btn, .view-btn');
    if (!button) return;

    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
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

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// -------------------- FLOATING ELEMENTS --------------------
function initFloatingElements() {
    // Create floating book icons
    createFloatingBooks();
    
    // Create floating news icons
    createFloatingNewsIcons();
}

function createFloatingBooks() {
    const container = document.body;
    const bookCount = 5;

    for (let i = 0; i < bookCount; i++) {
        const book = document.createElement('div');
        book.className = 'floating-book-icon';
        book.innerHTML = '<i class="fas fa-book"></i>';
        
        book.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            color: rgba(0, 212, 255, 0.3);
            pointer-events: none;
            z-index: 1;
            animation: floatBook ${Math.random() * 10 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;

        container.appendChild(book);
    }
}

function createFloatingNewsIcons() {
    const container = document.body;
    const iconCount = 3;
    const icons = ['fas fa-newspaper', 'fas fa-bullhorn', 'fas fa-calendar-alt'];

    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-news-icon';
        icon.innerHTML = `<i class="${icons[i]}"></i>`;
        
        icon.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 15 + 10}px;
            color: rgba(255, 215, 0, 0.3);
            pointer-events: none;
            z-index: 1;
            animation: floatNews ${Math.random() * 8 + 12}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;

        container.appendChild(icon);
    }
}

// -------------------- UTILS --------------------
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
// -------------------- CSS ANIMATIONS --------------------
// Add CSS animations dynamically
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatBook {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatNews {
        0% {
            transform: translateY(100vh) rotate(0deg) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.4;
        }
        90% {
            opacity: 0.4;
        }
        100% {
            transform: translateY(-100px) rotate(180deg) scale(1.2);
            opacity: 0;
        }
    }
    
    .animate-fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
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
    
    .highlight {
        background: linear-gradient(45deg, #ffd700, #ff6b35);
        color: #000;
        padding: 0 0.2rem;
        border-radius: 3px;
        font-weight: 700;
    }
    
    .suggestion-item {
        padding: 0.8rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 5px;
    }
    
    .suggestion-item:hover {
        background: rgba(0, 212, 255, 0.1);
        transform: translateX(5px);
    }
    
    .news-card {
        transition: all 0.3s ease;
    }
    
    .news-card:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
    }
`;
 document.head.appendChild(animationStyles);

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

 // -------------------- SCROLL TO TOP --------------------
 function initScrollToTop() {
     const scrollTopBtn = document.getElementById('scrollTopBtn');

     if (!scrollTopBtn) return;

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

 // -------------------- CART SYSTEM --------------------
 function initCartSystem() {
     const cartLink = document.querySelector('.cart-link');
     const cartCount = document.querySelector('.cart-count');

     if (!cartLink || !cartCount) return;

     // Initialize cart from localStorage
     let cart = [];
     try {
         cart = JSON.parse(localStorage.getItem('osiris_cart')) || [];
     } catch (e) {
         console.error('Error reading cart from localStorage:', e);
         cart = [];
     }

     updateCartCount(cart.length);

     // Cart click event
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

 // -------------------- DARK MODE --------------------
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

 // -------------------- UTILITY FUNCTIONS --------------------
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
