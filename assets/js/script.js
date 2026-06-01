/**
 * Md Sami Islam - Portfolio Script
 * Dynamic Theme Switcher, Mobile Navigation, and anti-spam Security Features
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Anti-Spam Email & Phone Obfuscation (Security)
    // ----------------------------------------------------
    // We encode the sensitive email and phone number into Base64 
    // to prevent automated spambots and scrapers from indexing them.
    const secureData = {
        encEmail: "bWRzYW1paXNsYW0yMDA2QGdtYWlsLmNvbQ==", // mdsamiislam2006@gmail.com
        encPhone: "MDE2MjUxMDAwMTM="                        // 01625100013
    };

    // Decode function
    const decodeSec = (str) => atob(str);

    const email = decodeSec(secureData.encEmail);
    const phone = decodeSec(secureData.encPhone);

    // Securely inject email address to DOM elements
    const secureEmails = document.querySelectorAll('.sec-email');
    secureEmails.forEach(el => {
        el.textContent = email;
        if (el.tagName === 'A') {
            el.setAttribute('href', `mailto:${email}`);
        }
    });

    // Securely inject phone number to DOM elements
    const securePhones = document.querySelectorAll('.sec-phone');
    securePhones.forEach(el => {
        el.textContent = phone;
        if (el.tagName === 'A') {
            el.setAttribute('href', `tel:${phone}`);
        }
    });

    // ----------------------------------------------------
    // 2. Dark / Light Theme Toggle Management
    // ----------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        html.classList.remove('dark');
        html.classList.add('light');
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
    }

    // Toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                html.classList.add('light');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.remove('light');
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ----------------------------------------------------
    // 3. Sticky Frosted-Glass Header Transitions
    // ----------------------------------------------------
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('py-2');
                header.querySelector('nav').classList.remove('rounded-2xl', 'px-6');
                header.querySelector('nav').classList.add('rounded-none', 'px-8', 'border-b');
            } else {
                header.classList.remove('py-2');
                header.querySelector('nav').classList.add('rounded-2xl', 'px-6');
                header.querySelector('nav').classList.remove('rounded-none', 'px-8', 'border-b');
            }
        });
    }

    // ----------------------------------------------------
    // 4. Ultra-Responsive Mobile Menu Toggle
    // ----------------------------------------------------
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isHidden = mobileMenu.classList.contains('hidden');
            menuIcon.className = isHidden ? 'fa-solid fa-bars text-xl' : 'fa-solid fa-xmark text-xl';
        });

        // Close mobile menu automatically on clicking any navigation link
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-xl';
            });
        });
    }

    // ----------------------------------------------------
    // 5. Contact Form Sanitization & Security Validation
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Secure validation & sanitization
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const sanitizeHTML = (str) => {
                return str.replace(/[&<>"']/g, (m) => {
                    switch (m) {
                        case '&': return '&amp;';
                        case '<': return '&lt;';
                        case '>': return '&gt;';
                        case '"': return '&quot;';
                        case "'": return '&#039;';
                        default: return m;
                    }
                });
            };

            const sanitizedName = sanitizeHTML(nameInput.value.trim());
            const sanitizedEmail = sanitizeHTML(emailInput.value.trim());
            const sanitizedSubject = sanitizeHTML(subjectInput.value.trim());
            const sanitizedMessage = sanitizeHTML(messageInput.value.trim());

            if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) {
                alert('Please enter valid data in all fields.');
                return;
            }

            // Successfully validated
            alert(`Thank you, ${sanitizedName}! Your message was sanitized and securely simulated for transmission.`);
            contactForm.reset();
        });
    }
});
