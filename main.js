/**
 * ahmd project and development - Main Script
 */

// 0. Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Add fade out class
        preloader.classList.add('fade-out');
        
        // Remove from DOM after animation completes (0.8s)
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Scroll Animation (Intersection Observer)
    // Fades in sections as they enter the viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once it has faded in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the fade-in-section class
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Navbar Background Effect on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
    // 4. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked (mobile)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open faqs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 6. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    
    if (contactForm && formSuccessMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Mengirim...';
            btn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                formSuccessMessage.style.display = 'block';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formSuccessMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});