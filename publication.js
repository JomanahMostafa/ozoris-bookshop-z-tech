// ======= Osiris Publications - Cleaned JS (With Pagination) =======
document.addEventListener('DOMContentLoaded', () => initPublicationsPage());

function initPublicationsPage() {
    initParticleSystem();
    initAdvancedSearch();
    initBooksView();
    initBooksData();
    initModal();
    initPagination();
}

/* ---------------- particles ---------------- */
function initParticleSystem() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) createParticle(container);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 15;
    const color = getRandomParticleColor();

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

/* --------------- Advanced Search ------------- */
function initAdvancedSearch() {
    const toggleBtn = document.querySelector('.toggle-search-btn');
    const searchForm = document.getElementById('searchForm');
    const searchSubmitBtn = document.querySelector('.search-submit-btn');
    const searchResetBtn = document.querySelector('.search-reset-btn');

    if (toggleBtn && searchForm) {
        toggleBtn.addEventListener('click', function() {
            searchForm.classList.toggle('active');
            this.innerHTML = searchForm.classList.contains('active') ? '<i class="fas fa-chevron-up"></i>' : '<i class="fas fa-chevron-down"></i>';
        });
    }

    if (searchSubmitBtn) searchSubmitBtn.addEventListener('click', performSearch);
    if (searchResetBtn) {
        searchResetBtn.addEventListener('click', function() {
            document.querySelectorAll('#searchForm input, #searchForm select').forEach(input => {
                if (input.type !== 'submit' && input.type !== 'button') input.value = '';
            });
            performSearch();
        });
    }

    document.querySelectorAll('#searchForm input[type="text"]').forEach(input => {
        input.addEventListener('input', debounce(performSearch, 500));
    });
    document.querySelectorAll('#searchForm select').forEach(select => select.addEventListener('change', performSearch));
}

/* --------------- Books data (مثال) ------------- */
const booksData = [
    { id: 1, title: 'ماذا تفقد المرأه عندما تتزوج', author: 'دكتور-ايمان عليوة', category: '', price: 100, image: 'images/women.png', description: ' ' },
    { id: 2, title: 'dizionario hoepli arabo', author: 'دكتور-c.m.tresso', category: '', price: 350, image: 'images/1660126752.jpeg', description: '' },
    { id: 3, title: 'Lecciones Estilisticas En El Espanol', author: 'د.-عبد العزيز فهد', category: 'dictionaries', price: 200, image: 'images/1662634755.jpeg', description: '' },
    { id: 4, title: 'Via della Grammatica', author: 'دكتور-ricci', category: 'dictionaries', price: 350, image: 'images/1660127623.jpg', description: '' },
    { id: 5, title: 'Xi Jinping: The Governance of China', author: 'دكتور-Xi Jinping', category: 'dictionaries', price: 500, image: 'images/1659962895.jpg', description: '' },
    { id: 6, title: 'Diccionario De Uso Del Español Actual: CLAVE + CD', author: 'دكتور-sm', category: '', price: 500, image: 'images/1659963246.jpg', description: '' },
    { id: 7, title: 'Gramatica de Uso Del Espanol. teorta y practica. con solucionario A1-B2', author: 'دكتور-aragones', category: '', price: 150, image: 'images/1659962112.jpeg', description: '' },
    { id: 8, title: 'el sincero اللغة الاسبانية', author: 'أ-احمد عبد الصادق على', category: '', price: 60, image: 'images/1659949417.jpg', description: '' },

    { id: 9, title: 'NO ES MOCO DE PAVO', author: 'أ-احمد عبد الصادق على', category: '', price: 500, image: 'images/1659948913.jpeg', description: '' },
    { id: 10, title: 'إنزيمات الأكسدة والإختزال فى مسارات التنفس: مناشطها الحيوية وطرق تقديرها', author: 'دكتور-مصطفى حلمي', category: '', price: 250, image: 'images/1659873807.jpg', description: '' },
    { id: 11, title: 'قواعد الغة العبرية من الالف الى الياء', author: 'أ-احمد عمر عبد العزيز ', category: '', price: 100, image: 'images/1659790976.jpg', description: '' },
    { id: 12, title: 'سيرة الدالاى لاما', author: 'دكتور-محمد انور الشيخ', category: '', price: 100, image: 'images/1659790662.jpg', description: '' },
    { id: 13, title: 'NO ES MOCO DE PAVO', author: 'أ-احمد عبد الصادق على', category: '', price: 500, image: 'images/1659948913.jpeg', description: '' },

    { id: 14, title: 'اعداد البحث العلمى باللغة اليابانية', author: 'دكتور-test1', category: '', price: '', image: 'images/1659790449.jpg', description: '' },
    { id: 15, title: 'المرجع فى قواعد اللغة الالمانية', author: 'دكتور-خيرى على سلطان', category: '', price: 180, image: 'images/1659790209.jpg', description: '' },
    { id: 16, title: 'قاموس خوليو كورتيس (عربي - إسباني)', author: 'دكتور-test1', category: '', price: 350, image: 'images/1659626935.jpg', description: '' },
    { id: 17, title: 'قاموس ف. كورينتي (أسباني - عربي) حجم كبير', author: 'دكتور-test1', category: '', price: 350, image: 'images/1659627048.jpg', description: '' },
    { id: 18, title: "reflexiones sobre la traduccion literaria", author: 'دكتور-على عبد اللطيف', category: '', price: 200, image: 'images/1659949034.jpg', description: '' },
    { id: 19, title: 'الاسبانية الدارجة', author: 'دكتور-احمد عباس الراوى', category: '', price: 50, image: 'images/1659948157.jpeg', description: '' },
    { id: 20, title: 'الوافى فى قواعد اللغة الايطالية الجزء الثانى', author: 'دكتور-د. وفاء عبد الرووف البيه د . شيرين طة النوسانى', category: '', price: 120, image: 'images/1659876563.jpg', description: '' },
    { id: 21, title: 'تصريف الافعال الايطالية', author: 'دكتور-د. وفاء عبد الرووف البيه د . شيرين طة النوسانى', category: '', price: 120, image: 'images/1659876676.jpg', description: '' },
    { id: 22, title: 'قواعد اللغة الإسبانية: دراسات في التحليل النحوي مع تمرينات للتقييم الذاتي', author: 'دكتور-د/ سلام سيد عبد القوي', category: '', price: 100, image: 'images/1659875426.jpg', description: '' },
    { id: 23, title: ' فيروسات الطحالب', author: ' دكتور-د/ ايمان محمد مختار ', category: '', price: 150, image: 'images/1659874404.jpg ', description: '' },
    { id: 24, title: ' الميكروبيولوجي بين العلم والتطبيق ', author: ' دكتور-مظهر دسوقى ', category: '', price: 250, image: 'images/1659873908.jpg ', description: ' ' },
    { id: 25, title: '	مبادئ الألبان وتطبيقاتها العملية', author: 'دكتور-أ.د/ محمد عبد الرحيم الشوبري - د/ علي إبراهيم بحبو', category: '', price: 250, image: 'images/1659875001.jpg', description: '' },
    { id: 26, title: ' المنتجات الطبيعية النباتية الدليل المعملى لطرق الاستخلاص والتقنية والتقدير الكمى وقياس الفاعلية البيولوجية ', author: ' أ.د.-عبد المنعم صادق', category: '', price: 350, image: 'images/1659874065.jpg ', description: ' ' },
    { id: 27, title: '	المنبوذة', author: 'أ-شريف رسمى', category: '', price: 80, image: 'images/1659459043.png', description: '' },
    { id: 29, title: ' المعين في قواعد اللغة الإسبانية ', author: ' أ.د.-عبد العزيز فهد', category: '', price: 120, image: 'images/1659458245.jpg ', description: ' ' },
    { id: 30, title: '	المرشد في اللغة الأسبانية (قواعد-محادثة-مفردات-مصطلحات-تمرينات)', author: 'أ- السيد عبد المنعم', category: '', price: 120, image: 'images/1659961818.jpg', description: '' },
    { id: 31, title: ' معجم ألفاظ القرآن الكريم باللغة الأسبانية', author: ' دكتور-سري محمد عبد اللطيف', category: '', price: 80, image: 'images/1659961727.jpg ', description: ' ' },
    { id: 32, title: '	 قاموس المصطلحات العلمية ( عربى - اسبانى / اسبانى - عربى )', author: 'دكتور-زيدان عبد الحليم', category: '', price: '', image: ' images/1659538212.jpeg ', description: ' ' },
    { id: 33, title: ' معجم ألفاظ القرآن الكريم باللغة الأسبانية', author: ' دكتور-سري محمد عبد اللطيف', category: '', price: 80, image: 'images/1659961727.jpg ', description: ' ' },
    { id: 34, title: '	ممتاز 3 جزء ', author: ' دكتور-نرمين شوقى', category: '', price: 300, image: ' images/1659613049.jpg ', description: ' ' },
    { id: 35, title: '		 سينما يوليو ', author: ' دكتور-عمرو منير ', category: ' ', price: 100, image: 'images/1659865002.jpg ', description: ' ' },
    { id: 36, title: ' المبسط في قواعد اللغة الصينية ج3', author: ' أ.د.-إبراهيم عكاشة وآخرون', category: '', price: 50, image: 'images/1332786338.jpg ', description: ' ' },
    { id: 37, title: ' 	  الإدارة الفنية لمصانع الأغذية', author: ' أ.د.-ممدوح القليوبي', category: '', price: 60, image: 'images/1332704814.jpg ', description: ' ' },

    { id: 38, title: ' علوم انتاج الاسماك والمزارع السمكية', author: 'أ.د.-دياب محمد سعد', category: '', price: 85, image: 'images/1332702661.jpg ', description: ' ' },
    { id: 39, title: ' 	  جودة بيض ولحوم الدواجن', author: ' أ.د.-محمد السيد سلطان', category: '', price: 75, image: 'images/1332702308.jpg ', description: ' ' },
    { id: 40, title: ' التكنولوجيا الحيوية في أمراض النبات', author: ' أ.د.-مصطفى حلمي مصطفى', category: '', price: 80, image: 'images/1332701212.jpg ', description: ' ' },
    { id: 41, title: ' 	  اخطانا الحكم على الصين', author: ' أ-شريف رسمى', category: '', price: 100, image: 'images/1659518032.jpg ', description: ' ' },
    { id: 40, title: ' التكنولوجيا الحيوية في أمراض النبات', author: ' أ.د.-مصطفى حلمي مصطفى', category: '', price: 80, image: 'images/1332701212.jpg ', description: ' ' },
    { id: 41, title: ' 	  اخطانا الحكم على الصين', author: ' أ-شريف رسمى', category: '', price: 100, image: 'images/1659518032.jpg ', description: ' ' },

    { id: 42, title: ' قاموس المصطلحات القانونية ( عربى - اسبانى / اسبانى - عربى )', author: ' دكتور-زيدان عبد الحليم', category: '', price: '', image: 'images/1659538250.jpeg ', description: ' ' },
    { id: 43, title: ' 	  كبسولات ترجمية', author: 'دكتور-على عبد اللطيف', category: '', price: '', image: ' images/1659534024 (1).jpg', description: ' ' },


    { id: 44, title: 'مختارات من مقالاتت ماريانو خوسيه دى لارا ', author: ' دكتور-على عبد اللطيف', category: '', price: 50, image: 'images/1659957020.jpg', description: ' ' },
    { id: 45, title: ' 	  لعبة العروش وعلمية الفن قراءة نقدية لعمل فنى غربى', price: 100, image: ' images/1659456431.png', description: ' ' },

    { id: 46, title: ' 	 علم النبات العام- الجزء الثالث - فسيولوجيا النبات', author: ' أ.د.-أحمد أصلان', category: '', price: '', image: ' images/1333552334.jpg', description: ' ' },
    { id: 47, title: ' 	 المبسط في قواعد اللغة الصينية ج2', author: ' أ.د.-إبراهيم عكاشة وآخرون', category: '', price: 50, image: ' images/1332786391.jpg', description: ' ' },
    { id: 47, title: ' 	 المبسط في قواعد اللغة الصينية ج1', author: ' أ.د.-إبراهيم عكاشة وآخرون', category: '', price: 50, image: ' images/1332786391.jpg', description: ' ' },

];

/* -------- initialize books -------- */
let currentPage = 1;
const booksPerPage = 15;

function initBooksData() {
    window.allBooks = booksData;
    renderPage(currentPage);
}

/* ---------- View toggle & sort ---------- */
function initBooksView() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const booksGrid = document.getElementById('booksGrid');

    if (viewBtns && viewBtns.length) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                viewBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const viewType = this.getAttribute('data-view');
                if (booksGrid) booksGrid.classList.toggle('list-view', viewType === 'list');
            });
        });
    }

    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) sortSelect.addEventListener('change', function() { sortBooks(this.value); });
}

/* -------------- Pagination Core -------------- */
function renderPage(page) {
    currentPage = page;
    const start = (page - 1) * booksPerPage;
    const end = start + booksPerPage;
    const paginatedBooks = (window.filteredBooks || window.allBooks).slice(start, end);
    displayBooks(paginatedBooks);
    updatePaginationControls();
}

function updatePaginationControls() {
    const totalBooks = (window.filteredBooks || window.allBooks).length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    let html = `<button class="pagination-btn prev" ${currentPage === 1 ? 'disabled' : ''}>السابق</button>`;
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-number ${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    html += `<button class="pagination-btn next" ${currentPage === totalPages ? 'disabled' : ''}>التالي</button>`;

    paginationContainer.innerHTML = html;

    paginationContainer.querySelectorAll('.page-number').forEach(btn => {
        btn.addEventListener('click', () => renderPage(parseInt(btn.textContent)));
    });
    const prevBtn = paginationContainer.querySelector('.prev');
    const nextBtn = paginationContainer.querySelector('.next');
    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) renderPage(currentPage - 1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { const total = Math.ceil(totalBooks / booksPerPage); if (currentPage < total) renderPage(currentPage + 1); });
}

/* -------------- displayBooks -------------- */
function displayBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;

    const activeViewBtn = document.querySelector('.view-btn.active');
    const viewType = activeViewBtn ? activeViewBtn.getAttribute('data-view') : 'grid';

    booksGrid.innerHTML = books.map((book, index) => {
                const id = book.id || index + 1;
                return `
      <div class="book-card ${viewType}-view" data-id="${id}" data-category="${book.category || ''}">
        <div class="book-image">
          <img src="${book.image}" alt="${escapeHtml(book.title)}">
        </div>
        <div class="book-content">
          <h3 class="book-title">${escapeHtml(book.title)}</h3>
          <p class="book-author">${escapeHtml(book.author || '')}</p>
          <div class="book-footer">
            <div class="book-price">${book.price ? `${book.price} ج.م` : ''}</div>
            <div class="book-actions">
              <button class="action-btn quick-view-btn" data-book-id="${id}"><i class="fas fa-eye"></i></button>
              <button class="action-btn add-to-cart-btn" data-book-id="${id}"><i class="fas fa-shopping-cart"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
    }).join('');

    // Attach listeners
    document.querySelectorAll('.quick-view-btn').forEach(btn => btn.addEventListener('click', function () {
        const bookId = this.getAttribute('data-book-id');
        showBookDetails(bookId);
    }));
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => btn.addEventListener('click', function () {
        const bookId = this.getAttribute('data-book-id');
        addToCart(bookId);
    }));

    animateBooks();
}

function animateBooks() {
    const books = document.querySelectorAll('.book-card');
    books.forEach((book, i) => book.style.animationDelay = `${i * 0.08}s`);
}

/* --------------- Filters & Search -------------- */
function initFilters(books) {
    window.booksData = books || [];
}

function performSearch() {
    if (!window.allBooks) return;
    const nameInput = document.getElementById('bookName');
    const name = nameInput ? nameInput.value.toLowerCase() : '';
    window.filteredBooks = window.allBooks.filter(b => !name || (b.title && b.title.toLowerCase().includes(name)));
    renderPage(1);
}

/* --------------- Sorting --------------- */
function sortBooks(sortBy) {
    if (!window.allBooks) return;
    let sorted = [...window.allBooks];
    switch (sortBy) {
        case 'price-low': sorted.sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0)); break;
        case 'price-high': sorted.sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0)); break;
        case 'name': sorted.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'ar')); break;
    }
    window.allBooks = sorted;
    renderPage(1);
}

/* --------------- Modal --------------- */
function initModal() {
    const modal = document.getElementById('bookModal');
    const closeBtn = document.querySelector('.modal-close');
    if (!modal) return;
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('show')) modal.classList.remove('show'); });
}

function showBookDetails(bookId) {
    const book = (window.allBooks || booksData).find(b => String(b.id) === String(bookId));
    const modal = document.getElementById('bookModal');
    const modalBody = modal ? modal.querySelector('.modal-body') : null;
    if (!book || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="book-details">
        <h2>${escapeHtml(book.title)}</h2>
        <p>${escapeHtml(book.author || '')}</p>
        <p>${book.price ? `${book.price} ج.م` : ''}</p>
      </div>
    `;
    modal.classList.add('show');
}

/* --------------- Cart & Notification --------------- */
function addToCart(bookId) {
    const book = (window.allBooks || booksData).find(b => String(b.id) === String(bookId));
    if (!book) return;
    showNotification(`تم إضافة "${book.title}" إلى السلة`);
    updateCartCount();
}

function updateCartCount() {
    let cartCount = document.querySelector('.cart-count');
    if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        document.body.appendChild(cartCount);
    }
    let count = parseInt(cartCount.textContent) || 0;
    count++;
    cartCount.textContent = count;
    cartCount.style.display = 'flex';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<div class="notification-content"><i class="fas fa-check-circle"></i><span>${escapeHtml(message)}</span></div>`;
    notification.style.cssText = "position:fixed;top:20px;left:20px;background:var(--gradient-primary);color:white;padding:1rem 1.2rem;border-radius:8px;z-index:10000;transform:translateX(-100px);opacity:0;transition:all .3s";
    document.body.appendChild(notification);
    setTimeout(()=> { notification.style.transform='translateX(0)'; notification.style.opacity='1'; }, 10);
    setTimeout(()=> { notification.style.transform='translateX(-100px)'; notification.style.opacity='0'; setTimeout(()=> notification.remove(), 300); }, 3000);
}

/* --------------- Pagination Init --------------- */
function initPagination() {
    renderPage(1);
}

/* --------------- Utils --------------- */
function debounce(func, wait) {
    let timeout;
    return function() { const context = this, args = arguments; clearTimeout(timeout); timeout = setTimeout(()=> func.apply(context, args), wait); };
}

function escapeHtml(unsafe) {
    return String(unsafe || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}


/* ===== end cleaned JS ====== */