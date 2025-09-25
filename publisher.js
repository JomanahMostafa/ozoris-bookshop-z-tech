// OSIRIS BOOKSHOP - Publishers Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initPublishersPage();
});

function initPublishersPage() {
    initParticleSystem();
    initAdvancedFilter();
    initPublishersView();
    initPublishersData();
    initModal();
    initPagination();
    initStatsCounter();
}

// Initialize particle system for background
function initParticleSystem() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 4 + 2;
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

// Advanced Filter functionality
function initAdvancedFilter() {
    const toggleBtn = document.querySelector('.toggle-filter-btn');
    const filterForm = document.getElementById('filterForm');
    const applyBtn = document.querySelector('.filter-apply-btn');
    const resetBtn = document.querySelector('.filter-reset-btn');
    const rangeSlider = document.getElementById('publisherFounded');

    // Toggle filter form
    toggleBtn.addEventListener('click', function() {
        filterForm.classList.toggle('active');
        this.innerHTML = filterForm.classList.contains('active') ?
            '<i class="fas fa-chevron-up"></i>' :
            '<i class="fas fa-chevron-down"></i>';
    });

    // Range slider value display
    rangeSlider.addEventListener('input', function() {
        document.getElementById('rangeMax').textContent = this.value;
    });

    // Apply filter
    applyBtn.addEventListener('click', function() {
        performFilter();
    });

    // Reset filter
    resetBtn.addEventListener('click', function() {
        document.querySelectorAll('#filterForm input, #filterForm select').forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button') {
                input.value = input.tagName === 'SELECT' ? '' : input.defaultValue;
            }
        });
        rangeSlider.value = 2024;
        document.getElementById('rangeMax').textContent = '2024';
        performFilter();
    });

    // Add real-time filter for text inputs
    document.querySelectorAll('#filterForm input[type="text"]').forEach(input => {
        input.addEventListener('input', debounce(performFilter, 500));
    });

    // Add change event for selects
    document.querySelectorAll('#filterForm select').forEach(select => {
        select.addEventListener('change', performFilter);
    });

    // Add input event for range slider
    rangeSlider.addEventListener('input', debounce(performFilter, 300));
}

// Publishers View Toggle
function initPublishersView() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const publishersGrid = document.getElementById('publishersGrid');
    const publishersMap = document.getElementById('publishersMap');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const viewType = this.getAttribute('data-view');

            if (viewType === 'map') {
                publishersGrid.style.display = 'none';
                publishersMap.style.display = 'block';
                initWorldMap();
            } else {
                publishersGrid.style.display = 'grid';
                publishersMap.style.display = 'none';
                publishersGrid.classList.toggle('list-view', viewType === 'list');
            }
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortPublishers');
    sortSelect.addEventListener('change', function() {
        sortPublishers(this.value);
    });
}

// Initialize publishers data
function initPublishersData() {
    // Generate sample publishers data
    const publishers = generateSamplePublishers(20);
    displayPublishers(publishers);
    initFilters(publishers);
}

function generateSamplePublishers(count) {
    const countries = ['egypt', 'uk', 'usa', 'france', 'germany', 'uae', 'saudi', 'lebanon'];
    const specialties = ['academic', 'scientific', 'children', 'literature', 'languages', 'dictionaries'];

    const publisherNames = [
        'دار أكسفورد للنشر', 'مؤسسة كامبريدج العلمية', 'دار الشروق',
        'المكتبة الأكاديمية', 'مركز المعارف', 'دار النهضة العربية',
        'المكتبة العلمية', 'دار المعارف', 'مؤسسة هنداوي', 'دار التنوير',
        'المركز القومي للترجمة', 'دار الكتب العلمية', 'مكتبة الأسرة',
        'دار الشعب', 'المكتبة الثقافية', 'دار العالم العربي',
        'مؤسسة الرسالة', 'دار الفكر', 'الدار المصرية اللبنانية', 'دار العين'
    ];

    const publisherDescriptions = [
        'دار نشر رائدة متخصصة في الكتب الأكاديمية والعلمية ذات السمعة العالمية في مجال النشر العلمي.',
        'مؤسسة تعليمية تنشر أعمالاً متميزة في مختلف المجالات العلمية والأدبية منذ عقود.',
        'تهدف إلى نشر المعرفة والثقافة من خلال إصدار كتب ذات جودة عالية في مختلف التخصصات.',
        'متخصصة في نشر الكتب والمراجع العلمية للباحثين والطلاب في الجامعات والمعاهد.',
        'تركز على نشر الأعمال المتميزة التي تثرى المكتبة العربية وتخدم الباحثين والقارئ العربي.',
        'من أعرق دور النشر في العالم العربي، تنشر كتباً في مختلف المجالات المعرفية.',
        'متخصصة في نشر الكتب العلمية والتقنية ذات المستوى الرفيع للباحثين والمتخصصين.',
        'تهتم بنشر الكتب التي تساهم في تطوير الفكر والمعرفة في العالم العربي.',
        'تنشر أعمالاً متميزة في مجالات الأدب والفنون والعلوم الإنسانية.',
        'تركز على نشر الكتب التي تثري الحوار الفكري والثقافي في المجتمع.'
    ];

    const publishers = [];

    for (let i = 0; i < count; i++) {
        const country = countries[Math.floor(Math.random() * countries.length)];
        const specialty = specialties[Math.floor(Math.random() * specialties.length)];

        const name = publisherNames[i % publisherNames.length];
        const description = publisherDescriptions[i % publisherDescriptions.length];

        const foundedYear = Math.floor(Math.random() * (2024 - 1800)) + 1800;
        const booksCount = Math.floor(Math.random() * 1000) + 50;
        const authorsCount = Math.floor(Math.random() * 500) + 10;

        const isInternational = Math.random() > 0.6;
        const isPremium = Math.random() > 0.8;

        publishers.push({
            id: i + 1,
            name: name,
            description: description,
            country: country,
            specialty: specialty,
            foundedYear: foundedYear,
            booksCount: booksCount,
            authorsCount: authorsCount,
            isInternational: isInternational,
            isPremium: isPremium,
            website: `https://www.${name.replace(/\s/g, '').toLowerCase()}.com`,
            image: `https://via.placeholder.com/400x200/1a1a1a/ffffff?text=${encodeURIComponent(name)}`,
            contact: {
                email: `info@${name.replace(/\s/g, '').toLowerCase()}.com`,
                phone: `+${Math.floor(Math.random() * 100)} ${Math.floor(Math.random() * 1000000000)}`,
                address: `شارع النشر - ${getCountryName(country)}`
            }
        });
    }

    return publishers;
}

function getCountryName(countryCode) {
    const countries = {
        'egypt': 'مصر',
        'uk': 'المملكة المتحدة',
        'usa': 'الولايات المتحدة',
        'france': 'فرنسا',
        'germany': 'ألمانيا',
        'uae': 'الإمارات',
        'saudi': 'السعودية',
        'lebanon': 'لبنان'
    };
    return countries[countryCode] || countryCode;
}

function getSpecialtyName(specialty) {
    const specialties = {
        'academic': 'أكاديمية',
        'scientific': 'علمية',
        'children': 'أطفال',
        'literature': 'أدب',
        'languages': 'لغات',
        'dictionaries': 'قواميس'
    };
    return specialties[specialty] || specialty;
}

// Display publishers in grid
function displayPublishers(publishers) {
    const publishersGrid = document.getElementById('publishersGrid');
    const viewType = document.querySelector('.view-btn.active').getAttribute('data-view');

    publishersGrid.innerHTML = publishers.map(publisher => `
        <div class="publisher-card" data-id="${publisher.id}" data-country="${publisher.country}" data-specialty="${publisher.specialty}" data-founded="${publisher.foundedYear}">
            <div class="publisher-header">
                <img src="${publisher.image}" alt="${publisher.name}" class="publisher-image">
                <div class="publisher-badges">
                    ${publisher.isPremium ? '<span class="publisher-badge badge-premium">مميز</span>' : ''}
                    ${publisher.isInternational ? '<span class="publisher-badge badge-international">عالمي</span>' : '<span class="publisher-badge badge-local">محلي</span>'}
                </div>
            </div>
            <div class="publisher-content">
                <h3 class="publisher-name">${publisher.name}</h3>
                <div class="publisher-meta">
                    <span><i class="fas fa-globe"></i> ${getCountryName(publisher.country)}</span>
                    <span><i class="fas fa-star"></i> ${getSpecialtyName(publisher.specialty)}</span>
                    <span><i class="fas fa-calendar"></i> تأسست ${publisher.foundedYear}</span>
                </div>
                <p class="publisher-description">${publisher.description}</p>
                
                <div class="publisher-stats">
                    <div class="stat-box">
                        <span class="stat-value">${publisher.booksCount}</span>
                        <span class="stat-label">كتاب</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-value">${publisher.authorsCount}</span>
                        <span class="stat-label">مؤلف</span>
                    </div>
                </div>
                
                <div class="publisher-actions">
                    <button class="publisher-btn btn-primary view-books-btn" data-publisher-id="${publisher.id}">
                        <i class="fas fa-book"></i>
                        استعرض الكتب
                    </button>
                    <button class="publisher-btn btn-secondary view-details-btn" data-publisher-id="${publisher.id}">
                        <i class="fas fa-info-circle"></i>
                        التفاصيل
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.view-books-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const publisherId = this.getAttribute('data-publisher-id');
            viewPublisherBooks(publisherId);
        });
    });

    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const publisherId = this.getAttribute('data-publisher-id');
            showPublisherDetails(publisherId);
        });
    });

    // Animate publishers
    animatePublishers();
}

function animatePublishers() {
    const publishers = document.querySelectorAll('.publisher-card');
    publishers.forEach((publisher, index) => {
        publisher.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize filters
function initFilters(publishers) {
    window.publishersData = publishers; // Store publishers data globally
}

// Perform filter
function performFilter() {
    const filterParams = {
        name: document.getElementById('publisherName').value.toLowerCase(),
        country: document.getElementById('publisherCountry').value,
        specialty: document.getElementById('publisherSpecialty').value,
        foundedYear: parseInt(document.getElementById('publisherFounded').value)
    };

    const filteredPublishers = window.publishersData.filter(publisher => {
        return (
            (filterParams.name === '' || publisher.name.toLowerCase().includes(filterParams.name)) &&
            (filterParams.country === '' || publisher.country === filterParams.country) &&
            (filterParams.specialty === '' || publisher.specialty === filterParams.specialty) &&
            (publisher.foundedYear <= filterParams.foundedYear)
        );
    });

    displayPublishers(filteredPublishers);
}

// Sort publishers
function sortPublishers(sortBy) {
    let sortedPublishers = [...window.publishersData];

    switch (sortBy) {
        case 'name':
            sortedPublishers.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
            break;
        case 'name-desc':
            sortedPublishers.sort((a, b) => b.name.localeCompare(a.name, 'ar'));
            break;
        case 'newest':
            sortedPublishers.sort((a, b) => b.foundedYear - a.foundedYear);
            break;
        case 'oldest':
            sortedPublishers.sort((a, b) => a.foundedYear - b.foundedYear);
            break;
        case 'books':
            sortedPublishers.sort((a, b) => b.booksCount - a.booksCount);
            break;
    }

    window.publishersData = sortedPublishers;
    displayPublishers(sortedPublishers);
}

// World Map visualization
function initWorldMap() {
    const worldMap = document.querySelector('.world-map');
    worldMap.innerHTML = `
        <div class="world-map-container">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400' fill='%23333'%3E%3Cpath d='M...'/%3E%3C/svg%3E" alt="World Map" class="map-base">
            <!-- Map points will be added dynamically -->
        </div>
    `;

    // Add publisher locations to map
    addPublisherLocations();
}

function addPublisherLocations() {
    // This would be replaced with actual map coordinates in a real implementation
    const mapPoints = [
        { country: 'egypt', x: 400, y: 200, count: 12 },
        { country: 'uk', x: 300, y: 100, count: 8 },
        { country: 'usa', x: 150, y: 150, count: 15 },
        { country: 'france', x: 320, y: 120, count: 7 },
        { country: 'germany', x: 340, y: 110, count: 6 },
        { country: 'uae', x: 450, y: 190, count: 5 },
        { country: 'saudi', x: 430, y: 180, count: 9 },
        { country: 'lebanon', x: 410, y: 170, count: 4 }
    ];

    const worldMap = document.querySelector('.world-map');

    mapPoints.forEach(point => {
        const pointSize = Math.max(10, Math.min(30, point.count * 2));
        const pointElement = document.createElement('div');
        pointElement.className = 'map-point';
        pointElement.style.cssText = `
            position: absolute;
            left: ${point.x}px;
            top: ${point.y}px;
            width: ${pointSize}px;
            height: ${pointSize}px;
            background: var(--gradient-primary);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
            animation: pulse 2s infinite;
        `;

        pointElement.setAttribute('data-country', point.country);
        pointElement.setAttribute('data-count', point.count);

        pointElement.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            filterByCountry(country);
        });

        worldMap.appendChild(pointElement);
    });
}

function filterByCountry(country) {
    document.getElementById('publisherCountry').value = country;
    performFilter();

    // Switch back to grid view
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === 'grid') {
            btn.classList.add('active');
        }
    });
    document.getElementById('publishersGrid').style.display = 'grid';
    document.getElementById('publishersMap').style.display = 'none';
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('publisherModal');
    const closeBtn = document.querySelector('.modal-close');

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

function showPublisherDetails(publisherId) {
    const publisher = window.publishersData.find(p => p.id == publisherId);
    const modal = document.getElementById('publisherModal');
    const modalBody = document.querySelector('.modal-body');

    if (publisher) {
        modalBody.innerHTML = `
            <div class="publisher-details">
                <div class="publisher-detail-header">
                    <img src="${publisher.image}" alt="${publisher.name}" class="detail-image">
                    <div class="detail-info">
                        <h2>${publisher.name}</h2>
                        <div class="detail-meta">
                            <span><i class="fas fa-globe"></i> ${getCountryName(publisher.country)}</span>
                            <span><i class="fas fa-star"></i> ${getSpecialtyName(publisher.specialty)}</span>
                            <span><i class="fas fa-calendar"></i> تأسست عام ${publisher.foundedYear}</span>
                        </div>
                    </div>
                </div>
                
                <div class="publisher-detail-content">
                    <div class="detail-section">
                        <h4><i class="fas fa-info-circle"></i> عن الناشر</h4>
                        <p>${publisher.description}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-chart-bar"></i> الإحصائيات</h4>
                        <div class="stats-grid">
                            <div class="stat-item-large">
                                <div class="stat-icon">
                                    <i class="fas fa-book"></i>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-value">${publisher.booksCount}</span>
                                    <span class="stat-label">كتاب منشور</span>
                                </div>
                            </div>
                            <div class="stat-item-large">
                                <div class="stat-icon">
                                    <i class="fas fa-user-pen"></i>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-value">${publisher.authorsCount}</span>
                                    <span class="stat-label">مؤلف متعاون</span>
                                </div>
                            </div>
                            <div class="stat-item-large">
                                <div class="stat-icon">
                                    <i class="fas fa-history"></i>
                                </div>
                                <div class="stat-info">
                                    <span class="stat-value">${new Date().getFullYear() - publisher.foundedYear}</span>
                                    <span class="stat-label">سنة من الخبرة</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-address-card"></i> معلومات الاتصال</h4>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>${publisher.contact.email}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>${publisher.contact.phone}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${publisher.contact.address}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-globe"></i>
                                <a href="${publisher.website}" target="_blank">${publisher.website}</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="detail-actions">
                    <button class="detail-action-btn primary">
                        <i class="fas fa-book"></i>
                        استعرض إصدارات الناشر
                    </button>
                    <button class="detail-action-btn secondary">
                        <i class="fas fa-heart"></i>
                        إضافة إلى المفضلة
                    </button>
                </div>
            </div>
        `;

        // Add event listener for browse books button
        document.querySelector('.detail-action-btn.primary').addEventListener('click', function() {
            viewPublisherBooks(publisherId);
            modal.classList.remove('show');
        });

        modal.classList.add('show');
    }
}

function viewPublisherBooks(publisherId) {
    // Redirect to publications page with publisher filter
    window.location.href = `publications.html?publisher=${publisherId}`;
}

// Pagination functionality
function initPagination() {
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    const pageNumbers = document.querySelectorAll('.page-number');

    pageNumbers.forEach(number => {
        number.addEventListener('click', function() {
            document.querySelectorAll('.page-number').forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            // Here you would load the appropriate page of results
        });
    });

    prevBtn.addEventListener('click', function() {
        if (!this.disabled) {
            // Go to previous page
        }
    });

    nextBtn.addEventListener('click', function() {
        // Go to next page
    });
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        animateCounter(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
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

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Add CSS for publisher details
const publisherDetailsStyles = document.createElement('style');
publisherDetailsStyles.textContent = `
    .publisher-details {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .publisher-detail-header {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .detail-image {
        width: 200px;
        height: 120px;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .detail-info h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--accent-cyan);
    }
    
    .detail-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .detail-meta span {
        background: rgba(42, 42, 42, 0.3);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .publisher-detail-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .detail-section h4 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: var(--accent-cyan);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }
    
    .stat-item-large {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: rgba(42, 42, 42, 0.3);
        border-radius: 15px;
        transition: var(--transition-smooth);
    }
    
    .stat-item-large:hover {
        background: rgba(42, 42, 42, 0.5);
        transform: translateY(-3px);
    }
    
    .stat-icon {
        width: 60px;
        height: 60px;
        background: var(--gradient-primary);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }
    
    .stat-info {
        display: flex;
        flex-direction: column;
    }
    
    .stat-value {
        font-size: 1.8rem;
        font-weight: 800;
        color: var(--accent-gold);
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(42, 42, 42, 0.3);
        border-radius: 10px;
    }
    
    .contact-item i {
        width: 20px;
        color: var(--accent-cyan);
    }
    
    .contact-item a {
        color: var(--accent-cyan);
        text-decoration: none;
        transition: var(--transition-smooth);
    }
    
    .contact-item a:hover {
        text-decoration: underline;
    }
    
    .detail-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }
    
    .detail-action-btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        transition: var(--transition-smooth);
    }
    
    .detail-action-btn.primary {
        background: var(--gradient-primary);
        color: white;
    }
    
    .detail-action-btn.primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
    }
    
    .detail-action-btn.secondary {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid var(--glass-border);
    }
    
    .detail-action-btn.secondary:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }
    
    @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    
    @media (max-width: 768px) {
        .publisher-detail-header {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .detail-image {
            justify-self: center;
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .detail-actions {
            flex-direction: column;
        }
        
        .contact-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
        }
    }
`;
document.head.appendChild(publisherDetailsStyles);
