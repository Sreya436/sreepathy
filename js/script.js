/* 
   =============================================
   SIMAT Website - Main JavaScript
   =============================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Loading Screen --- */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000); // 1s simulation

    /* --- Scroll Progress Bar --- */
    const scrollBar = document.getElementById('scroll-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + '%';
    });

    /* --- Mobile Menu Toggle --- */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* --- Sticky Header --- */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    });

    /* --- Active Link Highlight on Scroll --- */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

            if(navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    });

    /* --- Back to Top Button --- */
    const backTop = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 400) {
            backTop.classList.add('show-back-top');
        } else {
            backTop.classList.remove('show-back-top');
        }
    });

    /* --- Scroll Reveal Animation --- */
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    /* --- Counter Animation --- */
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.stats');
    if(statsSection) {
        window.addEventListener('scroll', () => {
            if (hasAnimated) return;
            const sectionTop = statsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                animateCounters();
                hasAnimated = true;
            }
        });
    }

    /* --- Gallery Lightbox --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery__item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery__img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if(lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    /* --- Testimonial Slider --- */
    const slides = document.querySelectorAll('.testimonial__card');
    const dotsContainer = document.getElementById('slider-dots');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const goToSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[n].classList.add('active');
            dots[n].classList.add('active');
            currentSlide = n;
            
            // Reset interval when manually clicked
            resetInterval();
        };

        const nextSlide = () => {
            let next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        };

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        startInterval();
    }

    /* --- Progress Bars Animation --- */
    const progressBars = document.querySelectorAll('.progress');
    const placementsSection = document.querySelector('.placements');
    let progressAnimated = false;

    if(placementsSection) {
        window.addEventListener('scroll', () => {
            if (progressAnimated) return;
            const sectionTop = placementsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                progressAnimated = true;
            }
        });
    }

});
