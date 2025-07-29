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

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
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

    // CTA button click handlers
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Register') || buttonText.includes('Start') || buttonText.includes('Join')) {
                // Show notification for now
                showNotification('Registration coming soon!', 'info');
            }
        });
    });

    // Login/Register button handlers
    const loginBtn = document.querySelector('.btn-outline-primary');
    const registerBtn = document.querySelector('.btn-primary');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showNotification('Login functionality coming soon!', 'info');
        });
    }
    
    if (registerBtn && !registerBtn.textContent.includes('Register')) {
        registerBtn.addEventListener('click', function() {
            showNotification('Registration functionality coming soon!', 'info');
        });
    }

    // Social media link handlers
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.includes('facebook') ? 'Facebook' :
                           this.querySelector('i').className.includes('twitter') ? 'Twitter' :
                           this.querySelector('i').className.includes('linkedin') ? 'LinkedIn' :
                           this.querySelector('i').className.includes('instagram') ? 'Instagram' : 'Social Media';
            showNotification(`${platform} link coming soon!`, 'info');
        });
    });

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--white);
            color: var(--dark-gray);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            border-left: 4px solid #339CB5;
        `;

        // Add type-specific styles
        if (type === 'success') {
            notification.style.borderLeftColor = '#28a745';
        } else if (type === 'error') {
            notification.style.borderLeftColor = '#dc3545';
        } else if (type === 'info') {
            notification.style.borderLeftColor = '#339CB5';
        }

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(function() {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.transform = 'translateX(100%)';
            setTimeout(function() {
                notification.remove();
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Add loading animation for images
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
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