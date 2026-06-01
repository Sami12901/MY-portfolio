/**
 * Md Sami Islam - Premium Portfolio JS Engine
 * High-Fidelity UI Animations, Spotlights, Obfuscation & Dynamic Filters
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Anti-Spam Email & Phone Decryption (Security)
    // ----------------------------------------------------
    const secureData = {
        encEmail: "bWRzYW1paXNsYW0yMDA2QGdtYWlsLmNvbQ==", // mdsamiislam2006@gmail.com
        encPhone: "MDE2MjUxMDAwMTM="                        // 01625100013
    };

    const decodeSec = (str) => atob(str);
    const email = decodeSec(secureData.encEmail);
    const phone = decodeSec(secureData.encPhone);

    // Securely inject email address to DOM
    document.querySelectorAll('.sec-email').forEach(el => {
        el.textContent = email;
        if (el.tagName === 'A') {
            el.setAttribute('href', `mailto:${email}`);
        }
    });

    // Securely inject phone number to DOM
    document.querySelectorAll('.sec-phone').forEach(el => {
        el.textContent = phone;
        if (el.tagName === 'A') {
            el.setAttribute('href', `tel:${phone}`);
        }
    });

    // ----------------------------------------------------
    // 2. High-Fidelity Typing Animation Loop (Hero Section)
    // ----------------------------------------------------
    const typeTarget = document.getElementById('typing-text');
    if (typeTarget) {
        const roles = [
            "Full-Stack Web & Mobile Developer",
            "Next-Gen AI Integrator",
            "Problem Solver",
            "Clean Code Enthusiast"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeLoop = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typeTarget.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40; // delete faster
            } else {
                typeTarget.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80; // normal type speed
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // pause at full text
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400; // brief pause before next word
            }

            setTimeout(typeLoop, typingSpeed);
        };

        // Start Typing Animation
        setTimeout(typeLoop, 1000);
    }

    // ----------------------------------------------------
    // 3. Mouse Coordinate Tracking for Spotlights (Bento Cards)
    // ----------------------------------------------------
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ----------------------------------------------------
    // 4. Smooth Project Category Filter Engine
    // ----------------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterTabs.length > 0 && projectCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active states
                filterTabs.forEach(t => {
                    t.classList.remove('bg-indigo-600', 'text-white', 'shadow-indigo-600/20');
                    t.classList.add('text-slate-400', 'hover:text-slate-200');
                });
                
                // Add active state to clicked tab
                tab.classList.add('bg-indigo-600', 'text-white', 'shadow-indigo-600/20');
                tab.classList.remove('text-slate-400', 'hover:text-slate-200');

                const filterVal = tab.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-categories').split(' ');
                    
                    if (filterVal === 'all' || categories.includes(filterVal)) {
                        card.classList.remove('filtered-out');
                        setTimeout(() => {
                            card.style.display = 'flex';
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.transform = 'scale(0.95)';
                        card.style.opacity = '0';
                        card.classList.add('filtered-out');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400); // match transition duration
                    }
                });
            });
        });
    }

    // ----------------------------------------------------
    // 5. Dark / Light Theme Toggle Management
    // ----------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        html.classList.remove('dark');
        html.classList.add('light');
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
    }

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
    // 6. Sticky Frosted Header Smooth Scrolling
    // ----------------------------------------------------
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('py-2');
                header.querySelector('nav').classList.remove('rounded-2xl', 'px-6');
                header.querySelector('nav').classList.add('rounded-none', 'px-8', 'border-b', 'border-slate-900/50', 'dark:border-slate-900/50', 'light:border-slate-200/50');
            } else {
                header.classList.remove('py-2');
                header.querySelector('nav').classList.add('rounded-2xl', 'px-6');
                header.querySelector('nav').classList.remove('rounded-none', 'px-8', 'border-b', 'border-slate-900/50', 'dark:border-slate-900/50', 'light:border-slate-200/50');
            }
        });
    }

    // ----------------------------------------------------
    // 7. Ultra-Responsive Mobile Menu Controls
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

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-xl';
            });
        });
    }

    // ----------------------------------------------------
    // 8. Secure Contact Form with Premium Toast Alerts
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Dynamic Inputs
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

            const name = sanitizeHTML(nameInput.value.trim());
            const userEmail = sanitizeHTML(emailInput.value.trim());
            const subject = sanitizeHTML(subjectInput.value.trim());
            const msg = sanitizeHTML(messageInput.value.trim());

            if (!name || !userEmail || !subject || !msg) {
                showToast('Please complete all form fields.', 'error');
                return;
            }

            // Mock success display
            showToast(`Thank you, ${name}! Your message was securely sent.`, 'success');
            contactForm.reset();
        });
    }

    // High fidelity custom Toast Notification helper
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-8 right-8 z-50 flex items-center space-x-3 px-6 py-4 rounded-2xl glassmorphism shadow-2xl transition-all duration-500 transform translate-y-10 opacity-0 border`;
        
        if (type === 'success') {
            toast.classList.add('border-indigo-500/30');
            toast.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <div class="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">${message}</div>
            `;
        } else {
            toast.classList.add('border-red-500/30');
            toast.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">${message}</div>
            `;
        }

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        }, 50);

        // Animate out and remove
        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    }
});
