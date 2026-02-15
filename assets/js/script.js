/**
 * Code'x Wolfer - Personal Portfolio JavaScript
 * Features: Dark/Light Mode, Typing Effect, Portfolio Filter, AOS Animations
 */

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initThemeToggle();
    initTypingEffect();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavLink();
    initSkillBars();
    initPortfolioFilter();
    initPortfolioModal();
    initContactForm();
    initParticles();
    initAOS();
});

// ============================================
// Dark/Light Mode Toggle
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (savedTheme === 'light') {
        body.setAttribute('data-bs-theme', 'light');
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    } else {
        body.setAttribute('data-bs-theme', 'dark');
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-bs-theme');
        
        if (currentTheme === 'dark') {
            // Switch to light mode
            body.setAttribute('data-bs-theme', 'light');
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            body.setAttribute('data-bs-theme', 'dark');
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
            localStorage.setItem('theme', 'dark');
        }
        
        // Refresh AOS animations after theme change
        AOS.refresh();
    });
}

// ============================================
// Typing Effect
// ============================================
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    
    if (!typingText) return;
    
    const texts = [
        'I am a Developer',
        'I am a Freelancer',
        'I am a Designer',
        'I am a Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    if (!menuToggle || !sidebar) return;
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = window.innerWidth < 992 ? 60 : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Active Navigation Link
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set initial active state
}

// ============================================
// Skill Bars Animation
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ============================================
// Portfolio Filter
// ============================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0 || portfolioItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// Portfolio Modal with Project Details
// ============================================
function initPortfolioModal() {
    const modalElement = document.getElementById('projectModal');
    
    if (!modalElement) return;
    
    const modal = new bootstrap.Modal(modalElement);
    const modalTitle = document.getElementById('projectModalTitle');
    const modalImage = document.getElementById('projectModalImage');
    const modalContent = document.getElementById('projectModalContent');
    const modalLink = document.getElementById('projectModalLink');
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    
    // Project details data
    const projectDetails = {
        fittrack: {
            title: 'FitTrack Pro',
            image: 'images/project-app-1.jpg',
            description: `
                <p><strong>FitTrack Pro</strong> is a comprehensive fitness tracking mobile application designed to help users monitor their health and wellness journey.</p>
                <h6>Key Features:</h6>
                <ul>
                    <li>Real-time activity tracking with GPS integration</li>
                    <li>Personalized workout plans and exercise library</li>
                    <li>Nutrition tracking with calorie counter</li>
                    <li>Progress analytics with detailed charts and reports</li>
                    <li>Social features to connect with friends and share achievements</li>
                </ul>
                <h6>Technologies Used:</h6>
                <p>React Native, Node.js, MongoDB, Firebase, HealthKit Integration</p>
            `,
            link: '#'
        },
        shopease: {
            title: 'ShopEase E-commerce',
            image: 'images/project-web-1.jpg',
            description: `
                <p><strong>ShopEase</strong> is a modern e-commerce platform that provides a seamless shopping experience for customers and powerful management tools for store owners.</p>
                <h6>Key Features:</h6>
                <ul>
                    <li>Intuitive product catalog with advanced filtering</li>
                    <li>Secure payment gateway integration (Stripe, PayPal)</li>
                    <li>Real-time inventory management</li>
                    <li>Customer review and rating system</li>
                    <li>Order tracking and shipment notifications</li>
                </ul>
                <h6>Technologies Used:</h6>
                <p>Next.js, Node.js, PostgreSQL, Redis, AWS S3</p>
            `,
            link: '#'
        },
        businesscard: {
            title: 'Alistair Finch Branding',
            image: 'images/project-card-1.jpg',
            description: `
                <p>A complete brand identity design for <strong>Alistair Finch Architectural Design</strong>, featuring elegant business cards that reflect the company's premium positioning.</p>
                <h6>Design Elements:</h6>
                <ul>
                    <li>Geometric pattern inspired by architectural blueprints</li>
                    <li>Premium navy blue and gold color palette</li>
                    <li>Custom monogram logo design</li>
                    <li>High-quality matte finish with spot UV coating</li>
                    <li>Consistent brand guidelines for all materials</li>
                </ul>
                <h6>Deliverables:</h6>
                <p>Business Cards, Letterheads, Envelopes, Brand Guidelines Document</p>
            `,
            link: '#'
        },
        socialconnect: {
            title: 'SocialConnect',
            image: 'images/project-app-2.jpg',
            description: `
                <p><strong>SocialConnect</strong> is a next-generation social media platform focused on meaningful connections and authentic content sharing.</p>
                <h6>Key Features:</h6>
                <ul>
                    <li>Ephemeral stories with creative filters and stickers</li>
                    <li>End-to-end encrypted messaging</li>
                    <li>Interest-based communities and groups</li>
                    <li>Live streaming with interactive features</li>
                    <li>AI-powered content recommendations</li>
                </ul>
                <h6>Technologies Used:</h6>
                <p>Flutter, GraphQL, AWS AppSync, DynamoDB, WebRTC</p>
            `,
            link: '#'
        },
        dataviz: {
            title: 'DataViz Dashboard',
            image: 'images/project-web-2.jpg',
            description: `
                <p><strong>DataViz Dashboard</strong> is an enterprise analytics platform that transforms complex data into actionable insights through interactive visualizations.</p>
                <h6>Key Features:</h6>
                <ul>
                    <li>Real-time data streaming and updates</li>
                    <li>Customizable dashboard widgets and layouts</li>
                    <li>Advanced filtering and drill-down capabilities</li>
                    <li>Automated report generation and scheduling</li>
                    <li>Role-based access control and permissions</li>
                </ul>
                <h6>Technologies Used:</h6>
                <p>React, D3.js, Python, FastAPI, ClickHouse, Docker</p>
            `,
            link: '#'
        },
        ignite: {
            title: 'Ignite Creative Agency',
            image: 'images/project-web-3.jpg',
            description: `
                <p><strong>Ignite Creative</strong> is a bold and dynamic website for a digital creative agency, showcasing their portfolio and services with stunning visuals.</p>
                <h6>Key Features:</h6>
                <ul>
                    <li>Immersive hero section with animated elements</li>
                    <li>Interactive portfolio showcase with case studies</li>
                    <li>Team member profiles with hover animations</li>
                    <li>Smooth page transitions and micro-interactions</li>
                    <li>Contact form with integrated CRM</li>
                </ul>
                <h6>Technologies Used:</h6>
                <p>Vue.js, GSAP, Three.js, Strapi CMS, Vercel</p>
            `,
            link: '#'
        },
        wedding: {
            title: 'Eternal Love Wedding Invitation',
            image: 'images/project-card-2.jpg',
            description: `
                <p>A romantic and elegant wedding invitation design for a special couple, featuring delicate floral elements and sophisticated typography.</p>
                <h6>Design Elements:</h6>
                <ul>
                    <li>Hand-painted watercolor floral illustrations</li>
                    <li>Soft blush pink and cream color palette</li>
                    <li>Elegant script and serif font pairing</li>
                    <li>Rose gold foil accent details</li>
                    <li>Wax seal embellishment option</li>
                </ul>
                <h6>Deliverables:</h6>
                <p>Main Invitation, RSVP Card, Details Card, Envelope with Calligraphy</p>
            `,
            link: '#'
        },
        foodie: {
            title: 'Foodie Express',
            image: 'images/project-app-3.jpg',
            description: `
                <p><strong>Foodie Express</strong> is a food delivery application that connects hungry customers with their favorite local restaurants.</p>
                <h6>Key Features:</h6>
                <ul>
                    <li>Restaurant discovery with filters and reviews</li>
                    <li>Real-time order tracking with live map</li>
                    <li>Multiple payment options including cash on delivery</li>
                    <li>Loyalty program with rewards and discounts</li>
                    <li>In-app chat with delivery drivers</li>
                </ul>
                <h6>Technologies Used:</h6>
                <p>Swift, Kotlin, Google Maps API, Stripe, Firebase</p>
            `,
            link: '#'
        }
    };
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalContent.innerHTML = project.description;
                modalLink.href = project.link;
                
                modal.show();
            }
        });
    });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 2000);
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    
    const icon = type === 'success' ? 'bi-check-circle' : 
                 type === 'error' ? 'bi-x-circle' : 'bi-info-circle';
    
    notification.innerHTML = `
        <i class="bi ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: #ffffff;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    // Add animation keyframes if not exists
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// Particles Background
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    const particleCount = 30;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(13, 110, 253, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// AOS Animation Initialization
// ============================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// ============================================
// Add fadeIn animation for portfolio filter
// ============================================
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(fadeInStyle);

// ============================================
// Preloader (Optional)
// ============================================
window.addEventListener('load', function() {
    // Add loaded class to body for any load animations
    document.body.classList.add('loaded');
});

// ============================================
// Resize Handler for Mobile Menu
// ============================================
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (window.innerWidth >= 992) {
        // Reset mobile menu state on desktop
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});
