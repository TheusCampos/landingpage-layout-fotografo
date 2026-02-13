function splitTextToSpans(element, className = 'char') {
  if (!element) return;
  
  const text = element.textContent ?? '';
  const chars = text.split('');
  
  element.innerHTML = '';
  
  chars.forEach(char => {
    const span = document.createElement('span');
    span.classList.add(className);
    span.textContent = char;
    if (char === ' ') {
      span.style.width = '0.3em'; // Preserva espaço visual
      span.style.display = 'inline-block';
    } else {
      span.style.display = 'inline-block'; // Permite transform
    }
    element.appendChild(span);
  });
}

// --- GLOBAL ANIMATIONS ---
function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cursor = document.getElementById('cursor');
  const hoverTargets = document.querySelectorAll('.hover-target');

  if (!cursor) return;

  // Usa GSAP quickTo para performance extrema e suavidade
  const xTo = gsap.quickTo(cursor, "left", { duration: 0.2, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "top", { duration: 0.2, ease: "power3" });

  document.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const addHoverEffect = (target) => {
      target.addEventListener('mouseenter', () => {
          cursor.classList.add('active');
          const textElement = cursor.querySelector('.cursor-text');
          if (textElement) {
              if (target.tagName === 'A' || target.closest('a')) {
                  textElement.innerText = 'CLICK';
              } else if (target.classList.contains('gallery-item')) {
                  textElement.innerText = 'ZOOM';
              } else {
                  textElement.innerText = 'VIEW';
              }
          }
      });
      target.addEventListener('mouseleave', () => {
          cursor.classList.remove('active');
      });
  };

  document.querySelectorAll('.hover-target').forEach(addHoverEffect);
}

// --- NAVIGATION ---
function initNavigation() {
  const menuBtn = document.querySelector('[data-menu-button]');
  const menuOverlay = document.querySelector('[data-menu-overlay]');
  
  if (menuBtn && menuOverlay) {
    const links = Array.from(menuOverlay.querySelectorAll('.menu-item'));
    let isOpen = false;
    let previousBodyOverflow = '';

    if (window.gsap) {
      gsap.set(menuOverlay, { yPercent: -100, autoAlpha: 0, pointerEvents: 'none' });
    }

    const setOpen = (open) => {
      isOpen = open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuOverlay.setAttribute('aria-hidden', String(!open));
      menuBtn.textContent = open ? 'CLOSE -' : 'MENU +';

      if (open) {
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = previousBodyOverflow;
      }
    };

    const openMenu = () => {
      setOpen(true);

      if (window.gsap) {
        gsap.to(menuOverlay, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power4.inOut', pointerEvents: 'auto' });
        if (links.length) {
          gsap.fromTo(links, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.25, ease: 'power3.out' });
        }
      } else {
        menuOverlay.style.visibility = 'visible';
      }

      if (links[0]) links[0].focus();
    };

    const closeMenu = () => {
      setOpen(false);

      if (window.gsap) {
        gsap.to(menuOverlay, { yPercent: -100, autoAlpha: 0, duration: 0.8, ease: 'power4.inOut', pointerEvents: 'none' });
      } else {
        menuOverlay.style.visibility = 'hidden';
      }

      menuBtn.focus();
    };

    menuBtn.addEventListener('click', () => {
      if (isOpen) closeMenu();
      else openMenu();
    });

    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) closeMenu();
    });

    links.forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeMenu();
    });
  }
}

// --- HERO PARALLAX ---
function initHeroParallax() {
  const heroSection = document.querySelector('.hero');
  const layers = document.querySelectorAll('.hero-img');

  if (!heroSection || layers.length === 0) return;

  if (!window.matchMedia('(pointer: fine)').matches) return;

  let rafId = 0;
  let lastEvent = null;

  heroSection.addEventListener('mousemove', (e) => {
    lastEvent = e;
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = 0;
      if (!lastEvent) return;

      const x = (window.innerWidth - lastEvent.pageX * 2) / 100;
      const y = (window.innerHeight - lastEvent.pageY * 2) / 100;

      layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        if (!speed) return;
        layer.style.transform = `translateX(${x * Number(speed)}px) translateY(${y * Number(speed)}px)`;
      });
    });
  });
}

// --- GSAP MANAGER ---
function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia('(pointer: coarse)').matches) {
    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  // --- HORIZONTAL SCROLL SECTION ---
  const scrollContainer = document.querySelector(".scroll-container");
  const wrapper = document.querySelector(".horizontal-wrapper");

  if (scrollContainer && wrapper) {
    const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);
    gsap.to(wrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainer,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  // --- TEXT REVEAL (BIO SECTION) ---
  const manifesto = document.querySelector('.manifesto');
  if (manifesto) {
    splitTextToSpans(manifesto, 'char');
    
    gsap.from('.manifesto .char', {
      scrollTrigger: {
        trigger: '.manifesto',
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1,
      },
      opacity: 0.1,
      color: "#555",
      stagger: 0.01,
      ease: "power2.out"
    });
  }

  // --- FOOTER IMMERSIVE ZOOM ANIMATION ---
  const footerWrapper = document.querySelector('.footer-wrapper');
  const ctaPhrase = document.querySelector('#cta-phrase');
  const contactDetails = document.querySelector('#contact-details');
  const footerLinks = document.querySelectorAll('.footer-link');

  // Only run complex footer animation on Desktop
  if (footerWrapper && ctaPhrase && window.innerWidth > 768) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerWrapper,
        start: "top top",
        end: "+=300%", 
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onLeave: () => {
           footerLinks.forEach(link => link.classList.add('is-visible'));
        },
        onEnterBack: () => {
           footerLinks.forEach(link => link.classList.remove('is-visible'));
        }
      }
    });

    tl.to(ctaPhrase, {
      scale: 80, 
      duration: 1,
      ease: "power2.inOut"
    });

    tl.to("body", {
        backgroundColor: "#000000",
        duration: 0.5,
        ease: "power2.inOut"
    }, "<");

    tl.to(ctaPhrase, {
        opacity: 0,
        duration: 0.5
    }, ">-0.5");

    tl.to(contactDetails, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
            footerLinks.forEach(link => link.classList.add('is-visible'));
        }
    });
  } else if (window.innerWidth <= 768) {
    // Mobile Footer Setup (No Zoom)
    // Ensure body background changes when footer is reached
    ScrollTrigger.create({
      trigger: ".footer-container",
      start: "top 80%",
      onEnter: () => gsap.to("body", { backgroundColor: "#000000", duration: 0.5 }),
      onLeaveBack: () => gsap.to("body", { backgroundColor: "#cdcaca", duration: 0.5 })
    });
  }

  // --- GENERIC REVEALS ---
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(elem => {
    if (elem.classList.contains('manifesto')) return;
    if (elem.classList.contains('footer-link')) return; 
    
    gsap.fromTo(elem, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 80%",
        }
      }
    );
  });

  // Display Text Reveals
  const headings = document.querySelectorAll('.display-text:not(.cta-text)');
  headings.forEach(heading => {
    gsap.from(heading, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 90%"
      }
    });
  });

  // Parallax Gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;
    gsap.to(img, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // --- TESTIMONIALS DRAG/SCROLL ---
  // Simple draggable implementation via GSAP if desired, or native overflow
  // For now, let's just add a simple staggered reveal
  gsap.from(".testimonial-card", {
      scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 70%"
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
  });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) initGSAP();
  initCursor();
  
  initNavigation();
  initHeroParallax();
});
