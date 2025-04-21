// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    try {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            delay: 100,
            disable: window.innerWidth < 768
        });
    } catch (error) {
        console.error('AOS initialization failed:', error);
    }

    // Initialize other components
    initializeTheme();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializePortfolioFilter();
    initializeFormSubmission();
    initializeScrollReveal();
    initializePricingSection();
    initializeServicesScroll();
});

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle?.querySelector('i');

    if (!themeToggle || !icon) return;

    // Check for saved theme preference and system preference
    function getPreferredTheme() {
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light-mode';
        } catch (error) {
            console.error('Error getting preferred theme:', error);
            return 'light-mode';
        }
    }

    // Set initial theme
    body.className = getPreferredTheme();
    updateThemeIcon(body.classList.contains('dark-mode'));

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        updateThemeIcon(isDarkMode);
        try {
            localStorage.setItem('theme', body.className);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    });

    function updateThemeIcon(isDarkMode) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Portfolio Filtering
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Form Submission
function initializeFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(notification);
    
    // Add styles for the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.zIndex = '1000';
    notification.style.transition = 'opacity 0.3s ease';
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll Reveal
function initializeScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(element => {
        observer.observe(element);
    });
}

// Pricing Section
function initializePricingSection() {
    const priceItems = document.querySelectorAll('.price-item');
    
    if (!priceItems.length) return;

    priceItems.forEach(item => {
        item.addEventListener('click', function() {
            priceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
        });
    });
}

// Services Scroll
function initializeServicesScroll() {
    const servicesScrollContainer = document.querySelector('.services-scroll-container');
    const servicesLeftArrow = document.querySelector('#services .scroll-arrow.left');
    const servicesRightArrow = document.querySelector('#services .scroll-arrow.right');

    if (!servicesScrollContainer || !servicesLeftArrow || !servicesRightArrow) return;

    const scrollAmount = 300;

    servicesLeftArrow.addEventListener('click', () => {
        servicesScrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    servicesRightArrow.addEventListener('click', () => {
        servicesScrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    const updateArrowVisibility = () => {
        const { scrollLeft, scrollWidth, clientWidth } = servicesScrollContainer;
        servicesLeftArrow.style.display = scrollLeft > 0 ? 'block' : 'none';
        servicesRightArrow.style.display = scrollLeft < scrollWidth - clientWidth ? 'block' : 'none';
    };

    servicesScrollContainer.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    updateArrowVisibility();
}
