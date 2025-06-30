document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element Selectors ---
  const mobileToggleButton = document.querySelector('#mobile-menu'); // Main hamburger button
  const mobileOverlay = document.querySelector('.nav__overlay');     // The overlay menu
  const navLogo = document.querySelector('#navbar__logo');           // Logo (if needed by JS)
  const overlayLinks = document.querySelectorAll('.nav__overlay-links a'); // Links within the mobile overlay

  // --- Mobile Menu Toggle Functionality ---
  const toggleMobileMenu = () => {
    if (mobileToggleButton && mobileOverlay) {
      mobileToggleButton.classList.toggle('is-active'); // For hamburger icon animation
      mobileOverlay.classList.toggle('active');       // For showing/hiding the overlay
    }
  };

  // Attach event listener to the main toggle button
  if (mobileToggleButton) {
    mobileToggleButton.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking on an overlay link
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggleButton && mobileOverlay) {
        // Ensure menu is active before trying to close
        if (mobileToggleButton.classList.contains('is-active')) {
          mobileToggleButton.classList.remove('is-active');
        }
        if (mobileOverlay.classList.contains('active')) {
          mobileOverlay.classList.remove('active');
        }
      }
    });
  });

  // --- Active Menu Highlighting on Scroll ---
  const highlightMenu = () => {
    const elem = document.querySelector('.highlight'); // Currently active item
    // Ensure these IDs exist on your navigation <a> tags
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const servicesMenu = document.querySelector('#services-page');
    let scrollPos = window.scrollY;

    // Helper to remove highlight from all
    const removeHighlights = () => {
      if (homeMenu) homeMenu.classList.remove('highlight');
      if (aboutMenu) aboutMenu.classList.remove('highlight');
      if (servicesMenu) servicesMenu.classList.remove('highlight');
      if (elem) elem.classList.remove('highlight'); // Remove from previously highlighted
    };

    // Desktop highlighting logic
    if (window.innerWidth > 960) { // Assuming 960px is your breakpoint
      if (scrollPos < 600) {
        removeHighlights();
        if (homeMenu) homeMenu.classList.add('highlight');
      } else if (scrollPos < 1400) {
        removeHighlights();
        if (aboutMenu) aboutMenu.classList.add('highlight');
      } else if (scrollPos < 2345) {
        removeHighlights();
        if (servicesMenu) servicesMenu.classList.add('highlight');
      } else {
        // If scrolled past all sections, optionally remove all highlights
        // removeHighlights();
      }
    } else {
      // Mobile: remove highlight if any element has it (original logic)
      if (elem) {
        elem.classList.remove('highlight');
      }
    }
  };

  window.addEventListener('scroll', highlightMenu);
  // window.addEventListener('click', highlightMenu); // Clicking anywhere to highlight seems unusual. Consider removing if not essential.

  // --- Smooth Scroll for Anchor Links ---
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      // Check if it's a valid ID selector and not just "#"
      if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --- GSAP Cyber Animations (ensure GSAP and ScrollTrigger are loaded in your HTML) ---
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger if not done globally

    // Hero cyber lines parallax
    const cyberBg = document.querySelector('.cyber-bg'); // Make sure this element exists
    if (cyberBg) {
      // Ensure '.cyber-svg-bg g' and '.cyber-hero' exist for this animation
      if (document.querySelector('.cyber-svg-bg g') && document.querySelector('.cyber-hero')) {
        gsap.to('.cyber-svg-bg g', {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cyber-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
      }
    }

    // Hero content entrance (ensure these classes exist)
    if (document.querySelector('.hero__title')) gsap.from('.hero__title', { opacity: 0, y: 60, duration: 1, ease: 'power2.out' });
    if (document.querySelector('.hero__subtitle')) gsap.from('.hero__subtitle', { opacity: 0, y: 40, duration: 1, delay: 0.15, ease: 'power2.out' });
    if (document.querySelector('.hero__description')) gsap.from('.hero__description', { opacity: 0, y: 30, duration: 1, delay: 0.3, ease: 'power2.out' });
    if (document.querySelector('.cyber-btn')) gsap.from('.cyber-btn', { opacity: 0, scale: 0.9, duration: 0.8, delay: 0.5, ease: 'back.out(1.7)' });
    if (document.querySelector('.scroll-indicator')) gsap.from('.scroll-indicator', { opacity: 0, y: 20, duration: 1, delay: 0.7, ease: 'power2.out' });

    // Section headers (ensure '.section-header' exists)
    gsap.utils.toArray('.section-header').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.1 * i,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      });
    });

    // Service cards stagger (ensure '.cyber-card' exists)
    gsap.utils.toArray('.cyber-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.1 * i,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        }
      });
    });

    // About section (ensure '.about__content' and '.about__visual' exist)
    if (document.querySelector('.about__content')) {
      gsap.from('.about__content', {
        opacity: 0,
        x: -60,
        duration: 1,
        scrollTrigger: {
          trigger: '.about__content',
          start: 'top 85%',
        }
      });
    }
    if (document.querySelector('.about__visual')) {
      gsap.from('.about__visual', {
        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: '.about__visual',
          start: 'top 85%',
        }
      });
    }

    // Footer (ensure '.footer__content' and '.footer__socials a' exist)
    if (document.querySelector('.footer__content')) {
      gsap.from('.footer__content', {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: '.footer__content',
          start: 'top 90%',
        }
      });
    }
    if (document.querySelectorAll('.footer__socials a').length > 0) {
      gsap.from('.footer__socials a', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: {
          trigger: '.footer__socials',
          start: 'top 95%',
        }
      });
    }
  } else {
    console.warn('GSAP or ScrollTrigger not found. Animations will not run.');
  }
});