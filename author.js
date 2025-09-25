// OSIRIS BOOKSHOP - Authors Page JavaScript

// Error handling for better debugging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing authors page...');
    try {
        // Initialize the application
        initAuthorsPage();
    } catch (error) {
        console.error('Error in initAuthorsPage:', error);
        // تخطي شاشة التحميل في حالة حدوث خطأ
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
});

function initAuthorsPage() {
    try {
        // Initialize all components with error handling
        initLoadingScreen();
        initParticleSystem();
        initNavigation();
        initAuthorsContent();
        initSearchFilter();
        initAuthorModals();
        initScrollToTop();
        initStatsCounters();
    } catch (error) {
        console.error('Error in initAuthorsPage:', error);
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
        if (link.getAttribute('href') === 'author.html') {
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

// Authors Content Initialization
function initAuthorsContent() {
    // Generate sample authors data
    const authors = generateAuthorsData(24);
    const featuredAuthors = authors.filter(author => author.featured).slice(0, 6);

    // Render authors grid
    renderAuthorsGrid(authors.slice(0, 12));

    // Render featured authors
    renderFeaturedAuthors(featuredAuthors);

    // Initialize pagination
    initPagination(authors);

    // Update stats counters
    updateStatsCounters(authors);
}

function generateAuthorsData(count) {
    const specialties = ['اللغات', 'العلوم', 'الطب', 'الهندسة', 'الأدب', 'التاريخ', 'الفلسفة', 'الفنون'];
    const countries = ['مصر', 'لبنان', 'سوريا', 'السعودية', 'الامارات', 'الاردن', 'المغرب', 'الجزائر', 'تونس', 'العراق'];
    const firstNames = ['أحمد', 'محمد', 'علي', 'حسن', 'حسين', 'إبراهيم', 'يوسف', 'خالد', 'عمر', 'مصطفى', 'سعيد', 'طارق'];
    const lastNames = ['عبد الله', 'الشافعي', 'الحسيني', 'المرصفي', 'الغنيمي', 'الشربيني', 'العقاد', 'حافظ', 'محمود', 'الخولي', 'السحار', 'العريان'];

    const authors = [];

    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const specialty = specialties[Math.floor(Math.random() * specialties.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];

        authors.push({
            id: i + 1,
            name: `${firstName} ${lastName}`,
            specialty: specialty,
            country: country,
            bio: `كاتب ومؤلف متخصص في مجال ${specialty}، له العديد من الإسهامات البارزة في هذا المجال. حاصل على عدة جوائز تقديرية لمساهماته الأدبية والعلمية.`,
            image: `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`,
            booksCount: Math.floor(Math.random() * 20) + 5,
            followers: Math.floor(Math.random() * 10000) + 1000,
            featured: Math.random() > 0.7,
            books: generateAuthorBooks(Math.floor(Math.random() * 5) + 3)
        });
    }

    return authors;
}

function generateAuthorBooks(count) {
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
            year: Math.floor(Math.random() * 20) + 2000,
            image: `https://picsum.photos/150/200?random=${Math.floor(Math.random() * 100) + 1}`
        });
    }

    return books;
}

function renderAuthorsGrid(authors) {
    const authorsGrid = document.getElementById('authorsGrid');

    if (!authorsGrid) return;

    authorsGrid.innerHTML = authors.map(author => `
        <div class="author-card animate-fade-in" data-author-id="${author.id}" data-specialty="${author.specialty}">
            <div class="author-image">
                <img src="${author.image}" alt="${author.name}">
                <div class="author-overlay">
                    <span class="author-specialty">${author.specialty}</span>
                </div>
            </div>
            <div class="author-content">
                <h3 class="author-name">${author.name}</h3>
                <p class="author-bio">${author.bio}</p>
                <div class="author-stats">
                    <div class="stat-item">
                        <span class="stat-number">${author.booksCount}</span>
                        <span class="stat-label">كتاب</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${formatNumber(author.followers)}</span>
                        <span class="stat-label">متابع</span>
                    </div>
                </div>
                <div class="author-actions">
                    <button class="author-btn btn-primary view-author" data-author-id="${author.id}">
                        <i class="fas fa-eye"></i>
                        <span>عرض الملف</span>
                    </button>
                    <button class="author-btn btn-secondary follow-author" data-author-id="${author.id}">
                        <i class="fas fa-plus"></i>
                        <span>متابعة</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFeaturedAuthors(authors) {
    const featuredSlider = document.getElementById('featuredSlider');

    if (!featuredSlider) return;

    featuredSlider.innerHTML = authors.map(author => `
        <div class="featured-author animate-fade-in" data-author-id="${author.id}">
            <div class="featured-author-image">
                <img src="${author.image}" alt="${author.name}">
            </div>
            <div class="featured-author-info">
                <h4 class="featured-author-name">${author.name}</h4>
                <p class="featured-author-specialty">${author.specialty}</p>
            </div>
        </div>
    `).join('');
}

function initPagination(authors) {
    const pagination = document.getElementById('pagination');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!pagination || !pageNumbers) return;

    const itemsPerPage = 12;
    const totalPages = Math.ceil(authors.length / itemsPerPage);
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
        const pageAuthors = authors.slice(startIndex, endIndex);

        renderAuthorsGrid(pageAuthors);
        renderPageNumbers();

        // Scroll to top of grid
        const authorsGrid = document.getElementById('authorsGrid');
        if (authorsGrid) {
            authorsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

function updateStatsCounters(authors) {
    const authorsCount = document.getElementById('authorsCount');
    const booksCount = document.getElementById('booksCount');
    const countriesCount = document.getElementById('countriesCount');

    if (!authorsCount || !booksCount || !countriesCount) return;

    // Calculate total books
    const totalBooks = authors.reduce((sum, author) => sum + author.booksCount, 0);

    // Calculate unique countries
    const uniqueCountries = new Set(authors.map(author => author.country));

    // Animate counters
    animateCounter(authorsCount, authors.length);
    animateCounter(booksCount, totalBooks);
    animateCounter(countriesCount, uniqueCountries.size);
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
    const searchInput = document.getElementById('authorSearch');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (!searchInput || !specialtyFilter || !sortFilter) return;

    // Generate sample authors data
    const authors = generateAuthorsData(50);

    // Filter authors based on search and filters
    function filterAuthors() {
        const searchTerm = searchInput.value.toLowerCase();
        const specialty = specialtyFilter.value;
        const sortBy = sortFilter.value;

        let filteredAuthors = authors.filter(author => {
            const matchesSearch = author.name.toLowerCase().includes(searchTerm) ||
                author.specialty.toLowerCase().includes(searchTerm) ||
                author.bio.toLowerCase().includes(searchTerm);

            const matchesSpecialty = !specialty || author.specialty === specialty;

            return matchesSearch && matchesSpecialty;
        });

        // Sort authors
        switch (sortBy) {
            case 'name':
                filteredAuthors.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredAuthors.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'books':
                filteredAuthors.sort((a, b) => b.booksCount - a.booksCount);
                break;
            case 'popular':
                filteredAuthors.sort((a, b) => b.followers - a.followers);
                break;
        }

        // Update pagination with filtered results
        initPagination(filteredAuthors);
    }

    // Event listeners
    searchInput.addEventListener('input', debounce(filterAuthors, 300));
    specialtyFilter.addEventListener('change', filterAuthors);
    sortFilter.addEventListener('change', filterAuthors);
}

// Author Modals
function initAuthorModals() {
    const modal = document.getElementById('authorModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');

    if (!modal || !modalBody || !closeModal) return;

    // Generate sample authors data
    const authors = generateAuthorsData(50);

    // Open modal with author details
    function openAuthorModal(authorId) {
        const author = authors.find(a => a.id === authorId);

        if (!author) return;

        modalBody.innerHTML = `
            <div class="author-modal-header">
                <div class="author-modal-image">
                    <img src="${author.image}" alt="${author.name}">
                </div>
                <div class="author-modal-info">
                    <h2 class="author-modal-name">${author.name}</h2>
                    <p class="author-modal-specialty">${author.specialty} • ${author.country}</p>
                    <div class="author-modal-stats">
                        <div class="author-modal-stat">
                            <span class="author-modal-stat-number">${author.booksCount}</span>
                            <span class="author-modal-stat-label">كتاب</span>
                        </div>
                        <div class="author-modal-stat">
                            <span class="author-modal-stat-number">${formatNumber(author.followers)}</span>
                            <span class="author-modal-stat-label">متابع</span>
                        </div>
                        <div class="author-modal-stat">
                            <span class="author-modal-stat-number">${author.books.length}</span>
                            <span class="author-modal-stat-label">أعمال</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="author-modal-bio">
                <p>${author.bio}</p>
            </div>
            <div class="author-modal-books">
                <h3 class="author-modal-books-title">أبرز أعمال المؤلف</h3>
                <div class="author-books-grid">
                    ${author.books.map(book => `
                        <div class="author-book">
                            <div class="author-book-image">
                                <img src="${book.image}" alt="${book.title}">
                            </div>
                            <div class="author-book-info">
                                <h4 class="author-book-title">${book.title}</h4>
                                <p class="author-book-year">${book.year}</p>
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
    function closeAuthorModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-author')) {
            const authorId = parseInt(e.target.getAttribute('data-author-id'));
            openAuthorModal(authorId);
        }
        
        if (e.target.classList.contains('featured-author')) {
            const authorId = parseInt(e.target.getAttribute('data-author-id'));
            openAuthorModal(authorId);
        }
    });
    
    closeModal.addEventListener('click', closeAuthorModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAuthorModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeAuthorModal();
        }
    });
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

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
