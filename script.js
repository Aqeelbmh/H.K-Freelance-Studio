// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    delay: 100
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference and system preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light-mode';
}

// Set initial theme
body.className = getPreferredTheme();
updateThemeIcon(body.classList.contains('dark-mode'));

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    updateThemeIcon(isDarkMode);
    localStorage.setItem('theme', body.className);
});

function updateThemeIcon(isDarkMode) {
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
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

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
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

// Add scroll reveal animation to elements
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Pricing Section - Toggle price details
document.addEventListener('DOMContentLoaded', function() {
    const priceItems = document.querySelectorAll('.price-item');
    
    priceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Close all other price items
            priceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            this.classList.toggle('active');
        });
    });

    // Scroll arrows for services section
    const servicesScrollContainer = document.querySelector('.services-scroll-container');
    const servicesLeftArrow = document.querySelector('#services .scroll-arrow.left');
    const servicesRightArrow = document.querySelector('#services .scroll-arrow.right');

    if (servicesScrollContainer && servicesLeftArrow && servicesRightArrow) {
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

        // Show/hide arrows based on scroll position
        servicesScrollContainer.addEventListener('scroll', () => {
            const { scrollLeft, scrollWidth, clientWidth } = servicesScrollContainer;
            
            servicesLeftArrow.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            servicesRightArrow.style.opacity = scrollLeft < scrollWidth - clientWidth ? '1' : '0.5';
        });
    }

    // Scroll arrows for pricing section
    const pricingScrollContainer = document.querySelector('.pricing-scroll-container');
    const pricingLeftArrow = document.querySelector('#pricing .scroll-arrow.left');
    const pricingRightArrow = document.querySelector('#pricing .scroll-arrow.right');

    if (pricingScrollContainer && pricingLeftArrow && pricingRightArrow) {
        const scrollAmount = 300;

        pricingLeftArrow.addEventListener('click', () => {
            pricingScrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        pricingRightArrow.addEventListener('click', () => {
            pricingScrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Show/hide arrows based on scroll position
        pricingScrollContainer.addEventListener('scroll', () => {
            const { scrollLeft, scrollWidth, clientWidth } = pricingScrollContainer;
            
            pricingLeftArrow.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            pricingRightArrow.style.opacity = scrollLeft < scrollWidth - clientWidth ? '1' : '0.5';
        });

        // Initialize arrow visibility
        const updateArrowVisibility = () => {
            const { scrollLeft, scrollWidth, clientWidth } = pricingScrollContainer;
            pricingLeftArrow.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            pricingRightArrow.style.opacity = scrollLeft < scrollWidth - clientWidth ? '1' : '0.5';
        };

        // Update on load and resize
        window.addEventListener('load', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);
    }
});
