/* ============================================
   SCRIPT.JS — Gifford Gabriel Sam Portfolio
   Handles: typing effect, smooth scroll,
   navigation, scroll reveal, contact form
   ============================================ */

// Wait for DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // ---------- TYPING EFFECT ----------
    // Array of phrases to cycle through in the hero section
    const typingPhrases = [
        'Aspiring Software Developer',
        'Business & FinTech Student',
        'Full-Stack Enthusiast',
        'Photography Hobbyist',
        'Problem Solver'
    ];

    const typingEl = document.getElementById('typingText');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70;    // ms per character when typing
    const deletingSpeed = 40;  // ms per character when deleting
    const pauseAfterType = 2000; // pause after full phrase

    function typeEffect() {
        const currentPhrase = typingPhrases[phraseIndex];

        if (!isDeleting) {
            // Typing forward
            typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                // Pause before deleting
                isDeleting = true;
                setTimeout(typeEffect, pauseAfterType);
                return;
            }
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Deleting backward
            typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            }
            setTimeout(typeEffect, deletingSpeed);
        }
    }

    // Start typing effect
    typeEffect();


    // ---------- NAVBAR SCROLL BEHAVIOUR ----------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Add 'scrolled' class to navbar on scroll
    function handleNavScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Highlight active nav link based on scroll position
    function highlightActiveLink() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleNavScroll();
        highlightActiveLink();
    });


    // ---------- MOBILE MENU TOGGLE ----------
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinksContainer.classList.remove('open');
        });
    });


    // ---------- SCROLL REVEAL ANIMATIONS ----------
    // Uses IntersectionObserver for performant scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target); // animate only once
            }
        });
    }, {
        threshold: 0.15,   // trigger when 15% visible
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => scrollObserver.observe(el));


    // ---------- HERO PARTICLES ----------
    // Generate small floating particles for visual flair
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Randomise position, size, and animation duration
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
            particle.style.animationDelay = (Math.random() * 6) + 's';
            particle.style.background = Math.random() > 0.5
                ? 'var(--accent)'
                : 'var(--accent-alt)';

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();


    // ---------- CONTACT FORM HANDLING ----------
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Simple client-side validation
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();

        if (!name || !email || !message) return;

        // Show sending state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formSuccess.classList.add('show');
                contactForm.reset();
                setTimeout(() => formSuccess.classList.remove('show'), 5000);
            } else {
                alert('Oops — something went wrong. Please try again.');
            }
        } catch (err) {
            alert('Network error. Please check your connection and try again.');
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
    });


    // ---------- PHOTOGRAPHY CAROUSEL ----------
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let autoPlayTimer;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoPlay();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoPlay();
        });
    });

    // Auto-advance every 6 seconds
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    startAutoPlay();


    // ---------- BRIDGECONNECT PROJECT MODAL ----------
    const projectModal = document.getElementById('projectModal');
    const openModalBtn = document.getElementById('openProjectModal');
    const closeModalBtn = document.getElementById('closeProjectModal');

    openModalBtn.addEventListener('click', () => {
        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    closeModalBtn.addEventListener('click', () => {
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Close on backdrop click
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ---------- PHOTO LIGHTBOX ----------
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    // Open lightbox when a carousel image is clicked
    document.querySelectorAll('.carousel-slide img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Close on lightbox backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Close on Escape key (modal + lightbox)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('open')) {
                lightbox.classList.remove('open');
                document.body.style.overflow = '';
            }
            if (projectModal.classList.contains('open')) {
                projectModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    });


    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    // Extra insurance on top of CSS scroll-behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
