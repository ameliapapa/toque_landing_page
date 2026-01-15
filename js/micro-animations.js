// Micro Animations JavaScript for Toque Website

(function() {
  'use strict';

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate on scroll
  const animateElements = [
    '.layout183_item',
    '.blog21_item',
    '.team14_item',
    '.testimonial22_item',
    '.header40_content',
    '.layout1_component',
    '.cta42_component',
    '.footer5_component'
  ];

  // Wait for DOM to be ready
  function initScrollAnimations() {
    animateElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
      });
    });
  }

  // Add ripple effect to buttons
  function addRippleEffect() {
    const buttons = document.querySelectorAll('.button, .button-primary, .button-secondary');
    buttons.forEach(button => {
      button.classList.add('ripple-effect');
    });
  }

  // Parallax effect for hero sections
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.header40_background-image-wrapper img, .layout183_image-wrapper img');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0) {
          const speed = 0.5;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    });
  }

  // Add hover effect to navigation items
  function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.navbar-link, .nav-link');
    navLinks.forEach(link => {
      link.style.position = 'relative';
    });
  }

  // Stagger animation for grid items
  function initStaggerAnimation() {
    const gridContainers = document.querySelectorAll('.layout183_list, .blog21_list, .team14_list');

    gridContainers.forEach(container => {
      const items = container.querySelectorAll('.layout183_item, .blog21_item, .team14_item');
      items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Add pulse animation to primary CTA buttons
  function initCTAPulse() {
    const ctaButtons = document.querySelectorAll('.button-primary');
    ctaButtons.forEach((btn, index) => {
      // Add pulse to first primary button only
      if (index === 0) {
        btn.classList.add('cta-pulse');
      }
    });
  }

  // Mouse move parallax effect for cards
  function initMouseParallax() {
    const cards = document.querySelectorAll('.layout183_item, .blog21_item, .team14_item');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // Add loading animation for images
  function initImageLoading() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
      if (!img.complete) {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
          this.style.transition = 'opacity 0.5s ease';
          this.style.opacity = '1';
        });
      }
    });
  }

  // Counter animation for numbers
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = Math.round(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.round(start);
      }
    }, 16);
  }

  // Initialize counters if they exist
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = parseInt(entry.target.getAttribute('data-counter'));
          animateCounter(entry.target, target);
          entry.target.classList.add('counted');
        }
      });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Add page transition effect
  function initPageTransition() {
    document.body.classList.add('page-transition');
  }

  // Initialize all animations
  function init() {
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initScrollAnimations();
    addRippleEffect();
    initParallax();
    enhanceNavigation();
    initStaggerAnimation();
    initSmoothScroll();
    initCTAPulse();
    initMouseParallax();
    initImageLoading();
    initCounters();
    initPageTransition();

    console.log('Micro animations initialized');
  }

  // Start initialization
  init();

})();
