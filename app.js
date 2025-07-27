// Portfolio JavaScript functionality

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const backToTop = document.getElementById('back-to-top');
const header = document.getElementById('header');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        // Remove existing theme attributes
        document.documentElement.removeAttribute('data-color-scheme');
        document.body.classList.remove('dark-theme', 'light-theme');
        
        // Set new theme
        document.documentElement.setAttribute('data-color-scheme', theme);
        document.body.classList.add(`${theme}-theme`);
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        
        console.log(`Theme switched to: ${theme}`);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // Mobile menu toggle
        navToggle.addEventListener('click', () => this.showMenu());
        navClose.addEventListener('click', () => this.hideMenu());
        
        // Close menu when clicking on nav links and handle navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                this.hideMenu();
                this.setActiveLink(link);
                
                // Handle smooth scrolling
                if (href.startsWith('#')) {
                    this.scrollToSection(href);
                }
            });
        });

        // Handle scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Handle all anchor links
        this.setupSmoothScrolling();
    }

    setupSmoothScrolling() {
        // Handle all anchor links on the page
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    showMenu() {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    }

    hideMenu() {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }

    setActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    handleScroll() {
        // Header background on scroll
        if (window.scrollY >= 80) {
            // header.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 255), 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            // header.style.background = 'var(--color-surface)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Active navigation link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink?.classList.add('active');
            }
        });

        // Back to top button
        if (window.scrollY >= 560) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetweenWords = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetweenWords = delayBetweenWords;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = this.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special handling for skills
                    if (entry.target.classList.contains('skills__container')) {
                        setTimeout(() => this.animateSkills(), 300);
                    }
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        this.observeElements();
    }

    observeElements() {
        // Add animation classes to elements
        const elementsToAnimate = [
            { selector: '.hero__content', animation: 'fade-in' },
            { selector: '.hero__image', animation: 'slide-right' },
            { selector: '.about__info', animation: 'slide-left' },
            { selector: '.skills__container', animation: 'slide-right' },
            { selector: '.project__card', animation: 'fade-in' },
            { selector: '.education__item', animation: 'slide-left' },
            { selector: '.achievements__list', animation: 'fade-in' },
            { selector: '.contact__info', animation: 'slide-left' },
            { selector: '.contact__form', animation: 'slide-right' }
        ];

        elementsToAnimate.forEach(({ selector, animation }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add(animation);
                element.style.transitionDelay = `${index * 0.1}s`;
                this.observer.observe(element);
            });
        });
    }

    animateSkills() {
        const skillBars = document.querySelectorAll('.skill__progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            }, index * 200);
        });
    }
}

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.init();
    }

    init() {
        // Ensure messages are hidden on page load
        this.hideAllMessages();
        
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        console.log('Form submitted');
        
        // Hide any existing messages
        this.hideAllMessages();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        console.log('Form data:', data);

        // Validate form
        if (!this.validateForm(data)) {
            console.log('Form validation failed');
            this.showMessage('error', 'Please fill in all fields correctly.');
            return;
        }

        console.log('Form validation passed');

        // Show loading state
        this.setLoadingState(true);

        // Simulate API call
        try {
            await this.simulateEmailSend(data);
            console.log('Email sent successfully');
            this.showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.log('Email sending failed:', error);
            this.showMessage('error', 'Something went wrong. Please try again later.');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return (
            data.name.trim().length >= 2 &&
            emailRegex.test(data.email) &&
            data.subject.trim().length >= 5 &&
            data.message.trim().length >= 10
        );
    }

    async simulateEmailSend(data) {
        // Check if EmailJS is properly configured
        if (typeof emailjs === 'undefined') {
            console.log('EmailJS not loaded, using simulation');
            return this.simulateEmailSendFallback(data);
        }
        
        // Check if EmailJS keys are configured
        const publicKey = "ZblffiKvWjxtPf5zn";
        const serviceId = "service_g9830rc";
        const templateId = "template_kexay39";
        
        if (publicKey === "YOUR_PUBLIC_KEY" || serviceId === "YOUR_SERVICE_ID" || templateId === "YOUR_TEMPLATE_ID") {
            console.log('EmailJS not configured, using simulation');
            return this.simulateEmailSendFallback(data);
        }
        
        try {
            // Initialize EmailJS
            emailjs.init(publicKey);
            
            // Send email using EmailJS
            const response = await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message,
                    to_email: "gauravchauhan1903@gmail.com"
                }
            );
            
            console.log('Email sent successfully:', response);
            return response;
        } catch (error) {
            console.error('EmailJS failed, falling back to simulation:', error);
            return this.simulateEmailSendFallback(data);
        }
    }
    
    simulateEmailSendFallback(data) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    console.log('Email data (simulation):', data);
                    console.log('📧 Email would be sent to: gauravchauhan1903@gmail.com');
                    console.log('📧 To enable real emails, follow the setup guide in EMAIL_SETUP.md');
                    resolve();
                } else {
                    reject(new Error('Network error (simulation)'));
                }
            }, 2000);
        });
    }

    setLoadingState(loading) {
        const btnText = submitBtn.querySelector('.btn__text');
        const btnLoading = submitBtn.querySelector('.btn__loading');
        
        if (loading) {
            btnText.classList.add('hide');
            btnLoading.classList.add('show');
            submitBtn.disabled = true;
        } else {
            btnText.classList.remove('hide');
            btnLoading.classList.remove('show');
            submitBtn.disabled = false;
        }
    }

    hideAllMessages() {
        console.log('Hiding all messages');
        if (successMessage) {
            successMessage.classList.add('hidden');
            console.log('Success message hidden');
        }
        if (errorMessage) {
            errorMessage.classList.add('hidden');
            console.log('Error message hidden');
        }
    }

    showMessage(type, text) {
        console.log(`Showing ${type} message:`, text);
        
        // First hide all messages
        this.hideAllMessages();
        
        // Small delay to ensure hide operation completes
        setTimeout(() => {
            // Get the correct message element
            const messageElement = type === 'success' ? successMessage : errorMessage;
            
            // Check if element exists
            if (!messageElement) {
                console.error(`Message element not found: ${type}-message`);
                return;
            }
            
            // Update text and show message
            const textElement = messageElement.querySelector('p');
            if (textElement) {
                textElement.textContent = text;
            }
            
            // Remove hidden class to show the message
            messageElement.classList.remove('hidden');
            console.log(`${type} message shown`);
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                if (messageElement) {
                    messageElement.classList.add('hidden');
                    console.log(`${type} message hidden`);
                }
            }, 5000);
        }, 100);
    }
}

// Resume Download Handler
class ResumeHandler {
    constructor() {
        this.init();
    }

    init() {
        const resumeBtn = document.querySelector('.resume__btn');
        resumeBtn.addEventListener('click', () => this.downloadResume());
    }

    downloadResume() {
        // Create a simple resume content
        const resumeContent = this.generateResumeContent();
        
        // Create and download file
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Gaurav_Kumar_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        const originalText = document.querySelector('.resume__btn').innerHTML;
        document.querySelector('.resume__btn').innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        
        setTimeout(() => {
            document.querySelector('.resume__btn').innerHTML = originalText;
        }, 2000);
    }

    generateResumeContent() {
        return `
GAURAV KUMAR
B.Tech Computer Science and Engineering (3rd Year)
Email: gauravchauhan1903@gmail.com
Phone: +91 9193959511

OBJECTIVE:
Passionate Computer Science student with a strong foundation in full-stack development, problem-solving, and modern web technologies. Eager to contribute to innovative projects and grow in the tech industry.

EDUCATION:
• B.Tech Computer Science and Engineering (2022-2026) - CGPA: 8.5/10
• 12th Grade Science (2020-2022) - 85.6%
• 10th Grade (2018-2020) - 92.4%

TECHNICAL SKILLS:
• Programming Languages: JavaScript, Python, C++
• Web Technologies: HTML5, CSS3, React.js, Node.js
• Databases: MongoDB, SQL
• Tools: Git/GitHub, Express.js

PROJECTS:
• Dynamic Portfolio Website - React.js, Node.js, CSS3
• E-Commerce Platform - MERN Stack, Stripe API
• Task Management System - React.js, Firebase, Material-UI
• Weather Forecast App - JavaScript, OpenWeather API, Chart.js
• Real-Time Chat Application - Socket.io, Node.js, MongoDB
• Library Management System - Python, Django, SQLite

ACHIEVEMENTS:
• Winner of College Coding Competition 2024
• Completed 500+ problems on LeetCode
• Internship at Tech Startup (Summer 2024)
• Open Source contributor with 50+ GitHub repositories
• Organized technical workshop on Web Development

INTERESTS:
• Full-stack Development
• Problem Solving
• Open Source Contribution
• Technology Innovation
        `.trim();
    }
}

// Utility Functions
class Utils {
    static smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize Application
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        console.log('Initializing portfolio components...');
        
        // Ensure contact form messages are hidden on initialization
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');
        
        if (successMessage) {
            successMessage.classList.add('hidden');
            console.log('Success message hidden on initialization');
        }
        if (errorMessage) {
            errorMessage.classList.add('hidden');
            console.log('Error message hidden on initialization');
        }
        
        // Initialize all components
        new ThemeManager();
        new NavigationManager();
        new ScrollAnimations();
        new ContactFormHandler();
        new ResumeHandler();

        // Initialize typing animation
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            new TypingAnimation(typingElement, [
                'Full Stack Developer',
                'Problem Solver',
                'Tech Enthusiast',
                'Code Creator'
            ]);
        }

        // Back to top functionality
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Add loading state to page
        document.body.classList.add('loaded');
        
        // Preload animations with delay
        setTimeout(() => {
            const heroContent = document.querySelector('.hero__content');
            const heroImage = document.querySelector('.hero__image');
            
            if (heroContent) heroContent.classList.add('animate');
            if (heroImage) heroImage.classList.add('animate');
        }, 300);
        
        console.log('Portfolio components initialized successfully');
    }
}

// Start the application
new PortfolioApp();

// Handle form validation in real-time
document.addEventListener('DOMContentLoaded', () => {
    // Ensure contact form messages are hidden on page load
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (successMessage) successMessage.classList.add('hidden');
    if (errorMessage) errorMessage.classList.add('hidden');
    
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = 'var(--color-success)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }
    
    // Enter key on theme toggle
    if (e.key === 'Enter' && document.activeElement === themeToggle) {
        themeToggle.click();
    }
});

// Performance optimization: Throttle scroll events
window.addEventListener('scroll', Utils.debounce(() => {
    // Additional scroll-based animations or updates can go here
}, 16)); // ~60fps

// Console message for developers
console.log(`
🚀 Gaurav Kumar's Portfolio
Built with vanilla JavaScript, CSS3, and HTML5
Theme: Professional & Modern
Features: Dark/Light mode, Smooth animations, Responsive design

📧 Contact: gauravchauhan1903@gmail.com
📱 Phone: +91 9193959511

Thanks for checking out the code! 💻
`);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, ThemeManager, NavigationManager };
}