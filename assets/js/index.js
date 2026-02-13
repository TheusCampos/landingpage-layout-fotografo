import { initCursor } from './global/animations.js';
import { initNavigation } from './global/navigation.js';
import { initGSAP } from './global/gsap-manager.js';
import { initHeroParallax } from './pages/partials/hero-animations.js';

function applyNoAnimationFallback() {
  const contactDetails = document.querySelector('#contact-details');
  const footerLinks = document.querySelectorAll('.footer-link');

  if (contactDetails) contactDetails.style.opacity = '1';
  footerLinks.forEach((link) => link.classList.add('is-visible'));
}

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initNavigation();

  if (prefersReducedMotion) {
    applyNoAnimationFallback();
    return;
  }

  if (window.gsap && window.ScrollTrigger) {
    initGSAP();
  } else {
    applyNoAnimationFallback();
  }

  if (window.gsap) initCursor();
  initHeroParallax();
});
