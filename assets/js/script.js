// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Simple Mobile Testimonial Scroll
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carouselControls = document.querySelector('.carousel-controls');
    
    // Only show carousel controls on mobile (when screen width <= 768px)
    if (window.innerWidth <= 768 && testimonialSlides.length > 1) {
        let currentSlide = 0;
        const totalSlides = testimonialSlides.length;
        const maxSlides = totalSlides - 1; // Only 1 slide visible on mobile
        
        // Create dots for mobile navigation
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
        
        function updateCarousel() {
            const translateX = -currentSlide * 100;
            testimonialCarousel.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function goToSlide(slideIndex) {
            currentSlide = Math.max(0, Math.min(slideIndex, maxSlides));
            updateCarousel();
        }
        
        function nextSlide() {
            if (currentSlide >= maxSlides) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateCarousel();
        }
        
        function prevSlide() {
            if (currentSlide <= 0) {
                currentSlide = maxSlides;
            } else {
                currentSlide--;
            }
            updateCarousel();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-scroll on mobile
        let autoScroll = setInterval(nextSlide, 4000);
        
        // Pause on touch
        testimonialCarousel.addEventListener('touchstart', function() {
            clearInterval(autoScroll);
        });
        
        testimonialCarousel.addEventListener('touchend', function() {
            autoScroll = setInterval(nextSlide, 4000);
        });
        
        // Initialize carousel
        updateCarousel();
    } else {
        // Hide controls on desktop - always show 3 reviews
        if (carouselControls) {
            carouselControls.style.display = 'none';
        }
        if (testimonialCarousel) {
            testimonialCarousel.classList.add('static');
        }
    }

    // Add loading animation for images
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            // Only apply fade-in effect if image is not already loaded
            if (!img.complete || img.naturalHeight === 0) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const showImage = function() {
                    img.style.opacity = '1';
                };
                
                img.addEventListener('load', showImage);
                img.addEventListener('error', showImage);
                
                // Fallback: show image after 2 seconds regardless
                setTimeout(showImage, 2000);
            }
        });
    }

    // Initialize image loading
    preloadImages();

    // Add hover effects to cards
    const cards = document.querySelectorAll('.benefit-card, .testimonial-card');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-dark), var(--accent-blue));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    createScrollProgress();

    console.log('EverGreen Freelancing website initialized successfully!');
}); 