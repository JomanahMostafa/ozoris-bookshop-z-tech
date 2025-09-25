// OSIRIS BOOKSHOP - Contact Page JavaScript

// Error handling for better debugging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing contact page...');
    try {
        // Initialize the application
        initContactPage();
    } catch (error) {
        console.error('Error in initContactPage:', error);
        // تخطي شاشة التحميل في حالة حدوث خطأ
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
});

function initContactPage() {
    try {
        // Initialize all components with error handling
        initLoadingScreen();
        initParticleSystem();
        initNavigation();
        initContactForm();
        initFAQAccordion();
        initScrollToTop();
        initStatsCounters();
    } catch (error) {
        console.error('Error in initContactPage:', error);
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
        if (link.getAttribute('href') === 'connect.html') {
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

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        // Validate form
        if (validateForm(formObject)) {
            // Simulate form submission
            simulateFormSubmission(formObject);
        }
    });

    // Close modal event
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
            contactForm.reset();
        });
    }
}

function validateForm(formData) {
    // Basic validation
    const errors = [];

    if (!formData.name || formData.name.trim().length < 3) {
        errors.push('الاسم يجب أن يكون至少 3 أحرف');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('البريد الإلكتروني غير صحيح');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('الرسالة يجب أن تكون至少 10 أحرف');
    }

    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormErrors(errors) {
    // Remove any existing error messages
    removeFormErrors();

    // Show new error messages
    errors.forEach(error => {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${error}</span>
        `;

        // Add styles
        errorElement.style.cssText = `
            background: rgba(255, 107, 53, 0.2);
            border: 1px solid var(--accent-orange);
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--accent-orange);
            animation: fadeIn 0.5s ease;
        `;

        const contactForm = document.getElementById('contactForm');
        contactForm.insertBefore(errorElement, contactForm.firstChild);
    });

    // Scroll to errors
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function removeFormErrors() {
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
}

function simulateFormSubmission(formData) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <span>جاري الإرسال...</span>
    `;
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success modal
        const successModal = document.getElementById('successModal');
        successModal.classList.add('active');

        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Log form data (in real app, this would be sent to a server)
        console.log('Form submitted:', formData);
    }, 2000);
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Stats Counters
function initStatsCounters() {
    const supportCount = document.getElementById('supportCount');
    const responseTime = document.getElementById('responseTime');
    const satisfactionRate = document.getElementById('satisfactionRate');

    if (!supportCount || !responseTime || !satisfactionRate) return;

    // Animate counters
    animateCounter(supportCount, 127);
    animateCounter(responseTime, 24);
    animateCounter(satisfactionRate, 98);
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
        element.textContent = Math.round(current);
    }, 16);
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
