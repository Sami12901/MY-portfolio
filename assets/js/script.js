/**
 * Md Sami Islam - Premium Portfolio JS Engine
 * High-Fidelity UI Animations, Spotlights, Obfuscation & Dynamic Filters
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Anti-Spam Email Decryption (Security)
    // ----------------------------------------------------
    const secureData = {
        encEmail: "bWRzYW1paXNsYW0yMDA2QGdtYWlsLmNvbQ==", // mdsamiislam2006@gmail.com
    };

    const decodeSec = (str) => atob(str);
    const email = decodeSec(secureData.encEmail);

    // Securely inject email address to DOM
    document.querySelectorAll('.sec-email').forEach(el => {
        el.textContent = email;
        if (el.tagName === 'A') {
            el.setAttribute('href', `mailto:${email}`);
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
                    t.classList.add('text-slate-500', 'hover:text-slate-800', 'dark:text-slate-400', 'dark:hover:text-slate-200');
                });
                
                // Add active state to clicked tab
                tab.classList.add('bg-indigo-600', 'text-white', 'shadow-indigo-600/20');
                tab.classList.remove('text-slate-500', 'hover:text-slate-800', 'dark:text-slate-400', 'dark:hover:text-slate-200');

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
                header.querySelector('nav').classList.add('rounded-none', 'px-8', 'border-b', 'border-slate-200/50', 'dark:border-slate-900/50');
            } else {
                header.classList.remove('py-2');
                header.querySelector('nav').classList.add('rounded-2xl', 'px-6');
                header.querySelector('nav').classList.remove('rounded-none', 'px-8', 'border-b', 'border-slate-200/50', 'dark:border-slate-900/50');
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
    // 8. Unique Interactive Hacker Terminal Logic
    // ----------------------------------------------------
    const termBody = document.getElementById('terminal-body');
    const termBtns = document.querySelectorAll('.terminal-btn');

    if (termBody && termBtns.length > 0) {
        termBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.getAttribute('data-cmd');
                
                // Print user command
                const userLine = document.createElement('div');
                userLine.className = 'text-indigo-600 dark:text-indigo-400 font-bold mt-1';
                userLine.textContent = `$ sami --${cmd}`;
                if (cmd === 'clear') userLine.textContent = '$ clear';
                termBody.appendChild(userLine);

                // Command responses
                const respLine = document.createElement('div');
                respLine.className = 'text-slate-700 dark:text-slate-300 pl-2 border-l border-slate-300 dark:border-slate-800 text-[11px]';
                
                if (cmd === 'clear') {
                    termBody.innerHTML = `<div>$ cat welcome.txt</div><div class="text-slate-500 dark:text-slate-400">Terminal console logs cleared. Welcome back!</div>`;
                    return;
                } else if (cmd === 'about') {
                    respLine.textContent = "Md Sami Islam: High-performance Frontend & Mobile developer based in Chittagong, Bangladesh. Adaptable, fast self-learner.";
                } else if (cmd === 'skills') {
                    respLine.textContent = "React, Tailwind CSS, Javascript, Node.js, MongoDB, Kotlin, Android Studio & dynamic AI implementations.";
                } else if (cmd === 'focus') {
                    respLine.textContent = "OmniCore ecosystem: a local-first multi-module Kotlin project designed for top-tier mobile modularity.";
                }
                
                termBody.appendChild(respLine);
                
                // Auto scroll to bottom smoothly
                termBody.scrollTo({
                    top: termBody.scrollHeight,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ----------------------------------------------------
    // 9. Unique Chittagong Dynamic Clock (Developer Status)
    // ----------------------------------------------------
    const clockElement = document.getElementById('local-clock');
    if (clockElement) {
        const updateClock = () => {
            const options = {
                timeZone: 'Asia/Dhaka',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const timeFormatter = new Intl.DateTimeFormat('en-US', options);
            clockElement.textContent = timeFormatter.format(new Date());
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    // ----------------------------------------------------
    // 10. Secure Contact Form with Premium Toast Alerts
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

            // Send to FormSubmit
            const submitUrl = "https://formsubmit.co/ajax/" + email;
            
            fetch(submitUrl, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: userEmail,
                    _subject: subject,
                    message: msg
                })
            })
            .then(response => response.json())
            .then(data => {
                showToast(`Thank you, ${name}! Your message was securely sent.`, 'success');
                contactForm.reset();
            })
            .catch(error => {
                showToast(`Sorry, there was an error sending your message.`, 'error');
            });
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
                <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">${message}</div>
            `;
        } else {
            toast.classList.add('border-red-500/30');
            toast.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">${message}</div>
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
