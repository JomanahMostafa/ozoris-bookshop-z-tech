// OSIRIS BOOKSHOP - Signup Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // اكتشف أي صفحة نحن فيها وتهيئتها accordingly
    if (document.getElementById('signupForm')) {
        initSignupPage();
    } else if (document.getElementById('loginForm')) {
        initLoginPage();
    }
});

function initSignupPage() {
    initParticleSystem();
    initPasswordToggle();
    initFormValidation();
    initAnimations();
}

function initLoginPage() {
    initParticleSystem();
    initPasswordToggle();
    initLoginFormValidation();
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
        'rgba(0, 212, 255, 0.3)',
        'rgba(255, 215, 0, 0.3)',
        'rgba(255, 107, 53, 0.3)',
        'rgba(157, 78, 237, 0.3)',
        'rgba(78, 205, 196, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Password visibility toggle - الإصدار المصحح
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.password-toggle');

    toggleButtons.forEach(button => {
        // البحث عن حقل الإدخال المرتبط بشكل صحيح
        const inputGroup = button.closest('.input-group');
        const input = inputGroup ? inputGroup.querySelector('input[type="password"], input[type="text"]') : null;

        if (input) {
            // تعيين الحالة الأولية للأيقونة
            const icon = button.querySelector('i');

            // التأكد من أن الحقل مشفر في البداية
            input.type = 'password';
            icon.classList.add('fa-eye');
            icon.classList.remove('fa-eye-slash');
            button.classList.remove('active');

            // إضافة event listener للنقر
            button.addEventListener('click', function() {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                    button.classList.add('active');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                    button.classList.remove('active');
                }
            });
        }
    });
}

// Form validation for signup
function initFormValidation() {
    const form = document.getElementById('signupForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            simulateSignup();
        }
    });

    // Real-time validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (password && confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            validatePasswords();
        });
    }
}

function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    let isValid = true;

    // Reset previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-group').forEach(el => el.classList.remove('error'));

    // Validate First Name
    if (firstName && !firstName.value.trim()) {
        showError(firstName, 'الاسم الأول مطلوب');
        isValid = false;
    }

    // Validate Last Name
    if (lastName && !lastName.value.trim()) {
        showError(lastName, 'الاسم الأخير مطلوب');
        isValid = false;
    }

    // Validate Email
    if (email && !email.value.trim()) {
        showError(email, 'البريد الإلكتروني مطلوب');
        isValid = false;
    } else if (email && !isValidEmail(email.value)) {
        showError(email, 'البريد الإلكتروني غير صحيح');
        isValid = false;
    }

    // Validate Password
    if (password && !password.value) {
        showError(password, 'كلمة المرور مطلوبة');
        isValid = false;
    } else if (password && password.value.length < 6) {
        showError(password, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        isValid = false;
    }

    // Validate Confirm Password
    if (password && confirmPassword && !validatePasswords()) {
        isValid = false;
    }

    // Validate Terms
    if (terms && !terms.checked) {
        showError(terms, 'يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }

    return isValid;
}

function validatePasswords() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (!password || !confirmPassword) return true;

    // Remove previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        if (el.parentElement.contains(password) || el.parentElement.contains(confirmPassword)) {
            el.remove();
        }
    });

    password.parentElement.classList.remove('error');
    confirmPassword.parentElement.classList.remove('error');

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'كلمات المرور غير متطابقة');
        return false;
    }

    return true;
}

function showError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('error');

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        color: #ff6b6b;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
    `;

    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    parent.appendChild(errorElement);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Simulate signup process
function simulateSignup() {
    const form = document.getElementById('signupForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('span').textContent;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.querySelector('span').textContent = 'جاري إنشاء الحساب...';
    submitButton.querySelector('i').className = 'fas fa-spinner fa-spin';

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('تم إنشاء حسابك بنجاح! سيتم توجيهك إلى صفحة التسجيل.', 'success');

        // Reset form
        form.reset();

        // إعادة تعيين أيقونات كلمات المرور
        document.querySelectorAll('.password-toggle').forEach(button => {
            const icon = button.querySelector('i');
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            button.classList.remove('active');
        });

        // Redirect to login page after delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 1500);
}

// Form validation for login
function initLoginFormValidation() {
    const form = document.getElementById('loginForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateLoginForm()) {
            simulateLogin();
        }
    });
}

function validateLoginForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    // Reset previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-group').forEach(el => el.classList.remove('error'));

    // Validate Email
    if (email && !email.value.trim()) {
        showError(email, 'البريد الإلكتروني مطلوب');
        isValid = false;
    } else if (email && !isValidEmail(email.value)) {
        showError(email, 'البريد الإلكتروني غير صحيح');
        isValid = false;
    }

    // Validate Password
    if (password && !password.value) {
        showError(password, 'كلمة المرور مطلوبة');
        isValid = false;
    }

    return isValid;
}

function simulateLogin() {
    const form = document.getElementById('loginForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('span').textContent;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.querySelector('span').textContent = 'جاري تسجيل الدخول...';
    submitButton.querySelector('i').className = 'fas fa-spinner fa-spin';

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('تم تسجيل الدخول بنجاح! يتم توجيهك إلى الصفحة الرئيسية.', 'success');

        // Redirect to home page after delay
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1500);
    }, 1500);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

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
        background: ${type === 'success' ? 'var(--accent-green)' : '#ff6b6b'};
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
    const animatedElements = document.querySelectorAll('.signup-card, .signup-features, .login-card');

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

// Utility function for throttling
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
