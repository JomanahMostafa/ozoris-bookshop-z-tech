// OSIRIS BOOKSHOP - Catalogs Page JavaScript

// Error handling for better debugging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing catalogs page...');
    try {
        // Initialize the application
        initCatalogsPage();
    } catch (error) {
        console.error('Error in initCatalogsPage:', error);
        // تخطي شاشة التحميل في حالة حدوث خطأ
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
});

function initCatalogsPage() {
    try {
        // Initialize all components with error handling
        initLoadingScreen();
        initParticleSystem();
        initNavigation();
        initCatalogsContent();
        initSearchFilter();
        initCatalogModals();
        initScrollToTop();
        initStatsCounters();
    } catch (error) {
        console.error('Error in initCatalogsPage:', error);
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

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            // Complete loading
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 500);
        }

        // Update progress bar and text
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }, 100);
}

// Particle System for Background
function initParticleSystem() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 15;
    const color = getRandomParticleColor();

    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.background = color;

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

// Navigation with Active State and Indicator
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');

    // Set active state for current page
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'catalog.html') {
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

// Catalogs Content Initialization
function initCatalogsContent() {
    // Generate sample catalogs data
    const catalogs = generateCatalogsData(24);
    const featuredCatalogs = catalogs.filter(catalog => catalog.featured).slice(0, 6);

    // Render catalogs grid
    renderCatalogsGrid(catalogs.slice(0, 12));

    // Render featured catalogs
    renderFeaturedCatalogs(featuredCatalogs);

    // Initialize pagination
    initPagination(catalogs);

    // Update stats counters
    updateStatsCounters(catalogs);
}

function generateCatalogsData(count) {
    const categories = ['اللغات', 'العلوم', 'الطب', 'الهندسة', 'الأدب', 'التاريخ', 'الفلسفة', 'الفنون'];
    const publishers = ['أكسفورد', 'كامبريدج', 'ماكجرو هيل', 'بيرسون', 'دورلينج كيندرسلي', 'بينجوين', 'هاربر كولينز', 'سايمون وشوستر'];
    const seasons = ['ربيع 2023', 'صيف 2023', 'خريف 2023', 'شتاء 2023', 'ربيع 2024', 'صيف 2024'];

    const catalogs = [];

    for (let i = 0; i < count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const publisher = publishers[Math.floor(Math.random() * publishers.length)];
        const season = seasons[Math.floor(Math.random() * seasons.length)];

        catalogs.push({
            id: i + 1,
            title: `كتالوج ${category} - ${season}`,
            category: category,
            publisher: publisher,
            season: season,
            description: `كتالوج متخصص في ${category} يحتوي على أحدث الإصدارات والكتب المميزة في هذا المجال. تم إعداده بعناية لتلبية احتياجات الباحثين والمهتمين.`,
            image: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 100) + 1}`,
            booksCount: Math.floor(Math.random() * 50) + 20,
            pages: Math.floor(Math.random() * 100) + 50,
            featured: Math.random() > 0.7,
            books: generateCatalogBooks(Math.floor(Math.random() * 8) + 5)
        });
    }

    return catalogs;
}

function generateCatalogBooks(count) {
    const bookTitles = [
        'قاموس أكسفورد المتقدم', 'تعلم الإنجليزية في 30 يوم', 'الفيزياء الحديثة',
        'الرياضيات المتقدمة', 'قواعد اللغة العربية', 'علم النفس التربوي',
        'التاريخ الإسلامي', 'الكيمياء العضوية', 'علم الأحياء الدقيقة',
        'أساسيات البرمجة', 'التسويق الرقمي', 'إدارة الأعمال'
    ];

    const books = [];

    for (let i = 0; i < count; i++) {
        books.push({
            title: bookTitles[Math.floor(Math.random() * bookTitles.length)],
            price: (Math.random() * 100 + 50).toFixed(2),
            image: `https://picsum.photos/150/200?random=${Math.floor(Math.random() * 100) + 1}`
        });
    }

    return books;
}

function renderCatalogsGrid(catalogs) {
    const catalogsGrid = document.getElementById('catalogsGrid');

    if (!catalogsGrid) return;

    catalogsGrid.innerHTML = catalogs.map(catalog => `
        <div class="catalog-card animate-fade-in" data-catalog-id="${catalog.id}" data-category="${catalog.category}">
            <div class="catalog-image">
                <img src="${catalog.image}" alt="${catalog.title}">
                <div class="catalog-overlay">
                    <span class="catalog-category">${catalog.category}</span>
                </div>
            </div>
            <div class="catalog-content">
                <h3 class="catalog-title">${catalog.title}</h3>
                <p class="catalog-description">${catalog.description}</p>
                <div class="catalog-stats">
                    <div class="stat-item">
                        <span class="stat-number">${catalog.booksCount}</span>
                        <span class="stat-label">كتاب</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${catalog.pages}</span>
                        <span class="stat-label">صفحة</span>
                    </div>
                </div>
                <div class="catalog-actions">
                    <button class="catalog-btn btn-primary view-catalog" data-catalog-id="${catalog.id}">
                        <i class="fas fa-eye"></i>
                        <span>عرض الكتالوج</span>
                    </button>
                    <button class="catalog-btn btn-secondary download-catalog" data-catalog-id="${catalog.id}">
                        <i class="fas fa-download"></i>
                        <span>تحميل</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFeaturedCatalogs(catalogs) {
    const featuredSlider = document.getElementById('featuredSlider');

    if (!featuredSlider) return;

    featuredSlider.innerHTML = catalogs.map(catalog => `
        <div class="featured-catalog animate-fade-in" data-catalog-id="${catalog.id}">
            <div class="featured-catalog-image">
                <img src="${catalog.image}" alt="${catalog.title}">
            </div>
            <div class="featured-catalog-info">
                <h4 class="featured-catalog-title">${catalog.title}</h4>
                <p class="featured-catalog-category">${catalog.category}</p>
            </div>
        </div>
    `).join('');
}

function initPagination(catalogs) {
    const pagination = document.getElementById('pagination');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!pagination || !pageNumbers) return;

    const itemsPerPage = 12;
    const totalPages = Math.ceil(catalogs.length / itemsPerPage);
    let currentPage = 1;

    // Render page numbers
    function renderPageNumbers() {
        pageNumbers.innerHTML = '';

        // Always show first page
        pageNumbers.innerHTML += `
            <span class="page-number ${currentPage === 1 ? 'active' : ''}" data-page="1">1</span>
        `;

        // Show ellipsis if needed
        if (currentPage > 3) {
            pageNumbers.innerHTML += `<span class="page-number dots">...</span>`;
        }

        // Show current page and neighbors
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (i > 1 && i < totalPages) {
                pageNumbers.innerHTML += `
                    <span class="page-number ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</span>
                `;
            }
        }

        // Show ellipsis if needed
        if (currentPage < totalPages - 2) {
            pageNumbers.innerHTML += `<span class="page-number dots">...</span>`;
        }

        // Always show last page if there is more than one page
        if (totalPages > 1) {
            pageNumbers.innerHTML += `
                <span class="page-number ${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</span>
            `;
        }

        // Update button states
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // Go to specific page
    function goToPage(page) {
        currentPage = page;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageCatalogs = catalogs.slice(startIndex, endIndex);

        renderCatalogsGrid(pageCatalogs);
        renderPageNumbers();

        // Scroll to top of grid
        const catalogsGrid = document.getElementById('catalogsGrid');
        if (catalogsGrid) {
            catalogsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });

    pageNumbers.addEventListener('click', (e) => {
        if (e.target.classList.contains('page-number') && !e.target.classList.contains('dots')) {
            const page = parseInt(e.target.getAttribute('data-page'));
            goToPage(page);
        }
    });

    // Initial render
    renderPageNumbers();
}

function updateStatsCounters(catalogs) {
    const catalogsCount = document.getElementById('catalogsCount');
    const booksCount = document.getElementById('booksCount');
    const categoriesCount = document.getElementById('categoriesCount');

    if (!catalogsCount || !booksCount || !categoriesCount) return;

    // Calculate total books
    const totalBooks = catalogs.reduce((sum, catalog) => sum + catalog.booksCount, 0);

    // Calculate unique categories
    const uniqueCategories = new Set(catalogs.map(catalog => catalog.category));

    // Animate counters
    animateCounter(catalogsCount, catalogs.length);
    animateCounter(booksCount, totalBooks);
    animateCounter(categoriesCount, uniqueCategories.size);
}

function animateCounter(element, target) {
    const duration = 2000;
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

// Search and Filter Functionality
function initSearchFilter() {
    const searchInput = document.getElementById('catalogSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (!searchInput || !categoryFilter || !sortFilter) return;

    // Generate sample catalogs data
    const catalogs = generateCatalogsData(50);

    // Filter catalogs based on search and filters
    function filterCatalogs() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;

        let filteredCatalogs = catalogs.filter(catalog => {
            const matchesSearch = catalog.title.toLowerCase().includes(searchTerm) ||
                catalog.category.toLowerCase().includes(searchTerm) ||
                catalog.description.toLowerCase().includes(searchTerm);

            const matchesCategory = !category || catalog.category === category;

            return matchesSearch && matchesCategory;
        });

        // Sort catalogs
        switch (sortBy) {
            case 'newest':
                filteredCatalogs.sort((a, b) => b.id - a.id);
                break;
            case 'oldest':
                filteredCatalogs.sort((a, b) => a.id - b.id);
                break;
            case 'popular':
                filteredCatalogs.sort((a, b) => b.booksCount - a.booksCount);
                break;
            case 'name':
                filteredCatalogs.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        // Update pagination with filtered results
        initPagination(filteredCatalogs);
    }

    // Event listeners
    searchInput.addEventListener('input', debounce(filterCatalogs, 300));
    categoryFilter.addEventListener('change', filterCatalogs);
    sortFilter.addEventListener('change', filterCatalogs);
}

// Catalog Modals
function initCatalogModals() {
    const modal = document.getElementById('catalogModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');

    if (!modal || !modalBody || !closeModal) return;

    // Generate sample catalogs data
    const catalogs = generateCatalogsData(50);

    // Open modal with catalog details
    function openCatalogModal(catalogId) {
        const catalog = catalogs.find(c => c.id === catalogId);

        if (!catalog) return;

        modalBody.innerHTML = `
            <div class="catalog-modal-header">
                <div class="catalog-modal-image">
                    <img src="${catalog.image}" alt="${catalog.title}">
                </div>
                <div class="catalog-modal-info">
                    <h2 class="catalog-modal-title">${catalog.title}</h2>
                    <p class="catalog-modal-category">${catalog.category} • ${catalog.publisher}</p>
                    <div class="catalog-modal-stats">
                        <div class="catalog-modal-stat">
                            <span class="catalog-modal-stat-number">${catalog.booksCount}</span>
                            <span class="catalog-modal-stat-label">كتاب</span>
                        </div>
                        <div class="catalog-modal-stat">
                            <span class="catalog-modal-stat-number">${catalog.pages}</span>
                            <span class="catalog-modal-stat-label">صفحة</span>
                        </div>
                        <div class="catalog-modal-stat">
                            <span class="catalog-modal-stat-number">${catalog.season}</span>
                            <span class="catalog-modal-stat-label">الموسم</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="catalog-modal-description">
                <p>${catalog.description}</p>
            </div>
            <div class="catalog-modal-books">
                <h3 class="catalog-modal-books-title">أبرز الكتب في هذا الكتالوج</h3>
                <div class="catalog-books-grid">
                    ${catalog.books.map(book => `
                        <div class="catalog-book">
                            <div class="catalog-book-image">
                                <img src="${book.image}" alt="${book.title}">
                            </div>
                            <div class="catalog-book-info">
                                <h4 class="catalog-book-title">${book.title}</h4>
                                <p class="catalog-book-price">${book.price} ج.م</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeCatalogModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-catalog')) {
            const catalogId = parseInt(e.target.getAttribute('data-catalog-id'));
            openCatalogModal(catalogId);
        }
        
        if (e.target.classList.contains('featured-catalog')) {
            const catalogId = parseInt(e.target.getAttribute('data-catalog-id'));
            openCatalogModal(catalogId);
        }
        
        if (e.target.classList.contains('download-catalog')) {
            const catalogId = parseInt(e.target.getAttribute('data-catalog-id'));
            downloadCatalog(catalogId);
        }
    });
    
    closeModal.addEventListener('click', closeCatalogModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCatalogModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCatalogModal();
        }
    });
}

function downloadCatalog(catalogId) {
    // Simulate download process
    const catalog = generateCatalogsData(1)[0];
    catalog.id = catalogId;
    
    // Show download notification
    showNotification(`جاري تحميل كتالوج ${catalog.title}`, 'success');
    
    // Simulate download delay
    setTimeout(() => {
        showNotification(`تم تحميل كتالوج ${catalog.title} بنجاح`, 'success');
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: ${type === 'success' ? 'var(--accent-green)' : 'var(--gradient-primary)'};
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

// Scroll to Top Functionality
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
