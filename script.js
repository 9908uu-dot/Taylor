document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Navigation Scroll Effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 2. Mobile Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Burger animation
        const bars = mobileToggle.querySelectorAll('.bar');
        if (mobileToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // ==========================================
    // 3. Theme Toggle (Dark / Light)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.className = 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // 4. Scroll Active Navigation Highlights
    // ==========================================
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
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

    // ==========================================
    // 5. Portfolio Filtering
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // 6. Intersection Observers for Scroll Animations
    // ==========================================
    // Stats Count Up Animation
    const statsSection = document.getElementById('about');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
            current += 1;
            element.textContent = current;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, Math.max(stepTime, 15));
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                statNumbers.forEach(num => countUp(num));
                animatedStats = true;
            }
        });
    }, { threshold: 0.3 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Skills Bar Progression Animation
    const skillsSection = document.getElementById('skills');
    const skillItems = document.querySelectorAll('.skill-item');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach(item => {
                    item.classList.add('animated');
                });
            }
        });
    }, { threshold: 0.2 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ==========================================
    // 7. Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple user UX simulation
            formStatus.className = 'form-status';
            formStatus.textContent = '傳送中...';
            formStatus.style.opacity = '1';

            setTimeout(() => {
                // Success feedback
                formStatus.classList.add('success');
                formStatus.textContent = `感謝您的聯絡，${name}！您的訊息已發送成功。`;
                contactForm.reset();

                // Fade out after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                }, 5000);
            }, 1200);
        });
    }
});
