// OSIRIS BOOKSHOP - Cart Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCartPage();
});

function initCartPage() {
    initParticleSystem();
    initCartItems();
    initCartInteractions();
    initAnimations();
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

// Initialize cart items
function initCartItems() {
    const cartItems = [{
            id: 1,
            title: 'قاموس أكسفورد المتقدم',
            author: 'أحمد محمد',
            image: 'https://via.placeholder.com/100x140/1a1a1a/ffffff?text=قاموس',
            price: 150.00,
            quantity: 1,
            category: 'قواميس'
        },
        {
            id: 2,
            title: 'تعلم الإنجليزية في 30 يوم',
            author: 'سارة عبد الله',
            image: 'https://via.placeholder.com/100x140/1a1a1a/ffffff?text=انجليزي',
            price: 120.00,
            quantity: 2,
            category: 'لغات'
        },
        {
            id: 3,
            title: 'الفيزياء الحديثة',
            author: 'محمد علي',
            image: 'https://via.placeholder.com/100x140/1a1a1a/ffffff?text=فيزياء',
            price: 200.00,
            quantity: 1,
            category: 'أكاديمية'
        }
    ];

    displayCartItems(cartItems);
    updateCartSummary(cartItems);
}

function displayCartItems(items) {
    const cartItemsContainer = document.getElementById('cartItems');

    if (items.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h3>سلة المشتريات فارغة</h3>
                <p>ابدأ بالتسوق الآن وأضف بعض الكتب إلى سلة مشترياتك</p>
                <a href="home.html" class="cta-btn primary-cta">
                    <span>استكشاف الكتب</span>
                    <i class="fas fa-book-open"></i>
                </a>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-author">${item.author}</p>
                <div class="cart-item-meta">
                    <span>${item.category}</span>
                    <span>رقم المنتج: ${item.id}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-item-action-btn save-for-later">
                        <i class="fas fa-bookmark"></i>
                        حفظ لاحقاً
                    </button>
                    <button class="cart-item-action-btn add-to-wishlist">
                        <i class="fas fa-heart"></i>
                        المفضلة
                    </button>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-item-price">${item.price.toFixed(2)} ج.م</div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateCartSummary(items) {
    const itemsCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * 0.1; // 10% discount
    const shipping = 25.00;
    const grandTotal = subtotal - discount + shipping;

    document.getElementById('itemsCount').textContent = itemsCount;
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} ج.م`;
    document.getElementById('grandTotal').textContent = `${grandTotal.toFixed(2)} ج.م`;
    document.getElementById('totalAmount').textContent = `${grandTotal.toFixed(2)} ج.م`;
}

// Initialize cart interactions
function initCartInteractions() {
    // Quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.closest('.increase')) {
            const itemId = e.target.closest('.increase').dataset.id;
            increaseQuantity(itemId);
        } else if (e.target.closest('.decrease')) {
            const itemId = e.target.closest('.decrease').dataset.id;
            decreaseQuantity(itemId);
        } else if (e.target.closest('.remove-item-btn')) {
            const itemId = e.target.closest('.remove-item-btn').dataset.id;
            removeItem(itemId);
        }
    });

    // Clear cart
    document.querySelector('.clear-cart-btn').addEventListener('click', clearCart);

    // Apply coupon
    document.querySelector('.apply-coupon-btn').addEventListener('click', applyCoupon);

    // Checkout
    document.querySelector('.checkout-btn').addEventListener('click', proceedToCheckout);

    // Continue shopping
    document.querySelector('.continue-shopping').addEventListener('click', function() {
        window.location.href = 'home.html';
    });

    // Quick checkout
    document.querySelector('.quick-checkout').addEventListener('click', quickCheckout);

    // Add recommended items to cart
    document.querySelectorAll('.add-to-cart-sm').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemElement = this.closest('.recommended-item');
            const title = itemElement.querySelector('h4').textContent;
            const price = parseFloat(itemElement.querySelector('p').textContent);

            addToCart({
                title: title,
                price: price,
                image: itemElement.querySelector('img').src,
                author: 'مؤلف مجهول',
                category: 'مقترح'
            });
        });
    });
}

function increaseQuantity(itemId) {
    // In a real app, this would update the cart state
    const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    const quantityElement = itemElement.querySelector('.quantity-value');
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;

    // Update price display (in real app, recalculate from data)
    animateValueChange(quantityElement);
    updateCartSummary(getCartItems());
}

function decreaseQuantity(itemId) {
    const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    const quantityElement = itemElement.querySelector('.quantity-value');
    let quantity = parseInt(quantityElement.textContent);

    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        animateValueChange(quantityElement);
        updateCartSummary(getCartItems());
    }
}

function removeItem(itemId) {
    const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);

    // Animation for removal
    itemElement.style.animation = 'slideOutRight 0.5s ease forwards';

    setTimeout(() => {
        itemElement.remove();

        // In a real app, this would update the cart state
        const remainingItems = document.querySelectorAll('.cart-item');
        if (remainingItems.length === 0) {
            displayCartItems([]);
        }

        updateCartSummary(getCartItems());
        showNotification('تم إزالة المنتج من السلة', 'success');
    }, 500);
}

function clearCart() {
    const cartItems = document.querySelectorAll('.cart-item');

    if (cartItems.length === 0) {
        showNotification('سلة المشتريات فارغة بالفعل', 'info');
        return;
    }

    // Animation for clearing all items
    cartItems.forEach((item, index) => {
        item.style.animation = `slideOutRight 0.5s ease ${index * 0.1}s forwards`;
    });

    setTimeout(() => {
        displayCartItems([]);
        showNotification('تم تفريغ سلة المشتريات', 'success');
    }, 500 + (cartItems.length * 100));
}

function applyCoupon() {
    const couponInput = document.getElementById('couponCode');
    const couponCode = couponInput.value.trim();

    if (!couponCode) {
        showNotification('يرجى إدخال كود الخصم', 'error');
        return;
    }

    // Simulate coupon validation
    showNotification('جاري التحقق من كود الخصم...', 'info');

    setTimeout(() => {
        if (couponCode === 'OSIRIS10') {
            showNotification('تم تطبيق خصم 10% بنجاح!', 'success');
            couponInput.disabled = true;
            document.querySelector('.apply-coupon-btn').disabled = true;
        } else {
            showNotification('كود الخصم غير صحيح', 'error');
        }
    }, 1500);
}

function proceedToCheckout() {
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
        showNotification('سلة المشتريات فارغة', 'error');
        return;
    }

    showNotification('جاري الانتقال إلى صفحة الدفع...', 'info');

    setTimeout(() => {
        // In a real app, this would redirect to checkout page
        window.location.href = 'checkout.html';
    }, 2000);
}

function quickCheckout() {
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
        showNotification('سلة المشتريات فارغة', 'error');
        return;
    }

    showNotification('جاري معالجة طلبك السريع...', 'info');

    // Simulate quick checkout process
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.querySelector('span').textContent;

    checkoutBtn.disabled = true;
    checkoutBtn.querySelector('span').textContent = 'جاري المعالجة...';
    checkoutBtn.querySelector('i').className = 'fas fa-spinner fa-spin';

    setTimeout(() => {
        showNotification('تمت عملية الشراء بنجاح! شكراً لثقتك بمكتبة أوزيريس', 'success');

        // Reset button
        setTimeout(() => {
            checkoutBtn.disabled = false;
            checkoutBtn.querySelector('span').textContent = originalText;
            checkoutBtn.querySelector('i').className = 'fas fa-lock';

            // Clear cart after successful purchase
            clearCart();
        }, 1000);
    }, 3000);
}

function addToCart(item) {
    showNotification(`تم إضافة "${item.title}" إلى السلة`, 'success');

    // Animation for adding to cart
    const notification = document.querySelector('.notification:last-child');
    if (notification) {
        notification.style.animation = 'bounce 0.5s ease';
    }

    // In a real app, this would add to actual cart state
    // For now, we'll just show a message
}

function getCartItems() {
    // In a real app, this would get from state management
    // For demo purposes, we'll simulate it
    const items = [];
    document.querySelectorAll('.cart-item').forEach(item => {
        const id = item.dataset.id;
        const title = item.querySelector('.cart-item-title').textContent;
        const price = parseFloat(item.querySelector('.cart-item-price').textContent);
        const quantity = parseInt(item.querySelector('.quantity-value').textContent);

        items.push({ id, title, price, quantity });
    });

    return items;
}

function animateValueChange(element) {
    element.style.transform = 'scale(1.2)';
    element.style.color = 'var(--accent-cyan)';

    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 300);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: ${type === 'success' ? 'var(--accent-green)' : 
                    type === 'error' ? '#ff6b6b' : 'var(--accent-cyan)'};
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

// Initialize animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.cart-item, .order-summary-card, .recommended-books');

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

// Add CSS for slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
// Shopping Cart System - تم التصحيح
function initCartSystem() {
    const cartLink = document.querySelector('.cart-link');
    const cartCount = document.querySelector('.cart-count');

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('osiris_cart')) || [];
    updateCartCount(cart.length);

    // Cart click event - تم التصحيح هنا
    cartLink.addEventListener('click', function(e) {
        // لا تمنع السلوك الافتراضي، دع المستخدم ينتقل إلى صفحة cart.html
        // يمكنك إضافة أي منطق إضافي هنا قبل الانتقال إذا needed
    });
}
