import { splitTextToSpans } from './utils.js';

export function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({ ignoreMobileResize: true });

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) ScrollTrigger.normalizeScroll(true);

  const paper = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() || '#cdcaca';
  const ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#000000';

  // Perform DOM manipulation (splitting text) once, outside matchMedia
  const manifesto = document.querySelector('.manifesto');
  if (manifesto && !manifesto.querySelector('.char')) {
    splitTextToSpans(manifesto, 'char');
  }

  // Generic animations that should work on all devices
  const initGenericAnimations = () => {
    // Reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => {
      if (element.classList.contains('manifesto')) return;

      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          },
        },
      );
    });

    // Headings
    const headings = document.querySelectorAll('.display-text:not(.cta-text)');
    headings.forEach((heading) => {
      gsap.from(heading, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 90%',
        },
      });
    });

    // Manifesto Text Stagger
    if (manifesto) {
      gsap.from('.manifesto .char', {
        scrollTrigger: {
          trigger: '.manifesto',
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 1,
        },
        opacity: 0.1,
        color: '#555',
        stagger: 0.01,
        ease: 'power2.out',
      });
    }

    // Gallery Parallax (simpler on mobile, full on desktop)
    document.querySelectorAll('.gallery-item').forEach((item) => {
      const image = item.querySelector('img');
      if (!image) return;

      gsap.to(image, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Testimonials
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  };

  // Initialize generic animations
  initGenericAnimations();

  ScrollTrigger.matchMedia({
    '(min-width: 769px)': () => {
      const scrollContainer = document.querySelector('.scroll-container');
      const wrapper = document.querySelector('.horizontal-wrapper');

      if (scrollContainer && wrapper) {
        const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

        gsap.to(wrapper, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: scrollContainer,
            start: 'top top',
            end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      const footerWrapper = document.querySelector('.footer-wrapper');
      const ctaPhrase = document.querySelector('#cta-phrase');
      const contactDetails = document.querySelector('#contact-details');
      const footerLinks = document.querySelectorAll('.footer-link');

      if (footerWrapper && ctaPhrase && contactDetails) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerWrapper,
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onLeave: () => {
              footerLinks.forEach((link) => link.classList.add('is-visible'));
            },
            onEnterBack: () => {
              footerLinks.forEach((link) => link.classList.remove('is-visible'));
            },
          },
        });

        tl.to(ctaPhrase, {
          scale: 80,
          duration: 1,
          ease: 'power2.inOut',
        });

        tl.to(
          'body',
          {
            backgroundColor: ink,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          '<',
        );

        tl.to(
          ctaPhrase,
          {
            opacity: 0,
            duration: 0.5,
          },
          '>-0.5',
        );

        tl.to(contactDetails, {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            footerLinks.forEach((link) => link.classList.add('is-visible'));
          },
        });
      }
    },
    '(max-width: 768px)': () => {
      const footerLinks = document.querySelectorAll('.footer-link');
      footerLinks.forEach((link) => link.classList.add('is-visible'));

      ScrollTrigger.create({
        trigger: '.footer-container',
        start: 'top 80%',
        onEnter: () => gsap.to('body', { backgroundColor: ink, duration: 0.5 }),
        onLeaveBack: () => gsap.to('body', { backgroundColor: paper, duration: 0.5 }),
      });
    },
  });

}
