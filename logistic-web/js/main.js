document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderIndicators = document.querySelector('.slider-indicators');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    // Create indicators
    heroSlides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slider-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        sliderIndicators.appendChild(indicator);
    });
    
    // Show slide
    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroSlides[index].classList.add('active');
        
        // Update indicators
        const indicators = document.querySelectorAll('.slider-indicator');
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(currentSlide);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        showSlide(index);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSection.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate stats counter
    const statItems = document.querySelectorAll('.stat-item h3');
    
    function animateStats() {
        statItems.forEach(item => {
            const target = parseInt(item.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    item.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    item.textContent = target;
                }
            };
            
            updateCount();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-section')) {
                    animateStats();
                }
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.service-card, .tech-content, .testimonial, .section-header');
    animatedElements.forEach(el => observer.observe(el));
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Service Cards Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      // Add hover effect
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'rotate(10deg) scale(1.1)';
        icon.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'rotate(0) scale(1)';
        icon.style.boxShadow = 'none';
      });
      
      // Add click effect for mobile
      card.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          this.classList.toggle('expanded');
        }
      });
    });
    
    // Animate features list items on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const features = entry.target.querySelectorAll('.features-list li');
          features.forEach((feature, index) => {
            setTimeout(() => {
              feature.style.opacity = '1';
              feature.style.transform = 'translateX(0)';
            }, index * 100);
          });
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });
  });