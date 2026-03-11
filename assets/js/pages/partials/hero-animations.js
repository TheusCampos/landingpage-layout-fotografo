export function initHeroParallax() {
  const heroSection = document.querySelector('.hero');
  const layers = document.querySelectorAll('.hero-img');

  if (!heroSection || layers.length === 0) return;

  // Mobile Parallax (Device Orientation / Scroll)
  if (window.matchMedia('(pointer: coarse)').matches) {
    // Simple scroll parallax for mobile
    layers.forEach((layer, i) => {
      const speed = i * 0.2 + 0.1;
      gsap.to(layer, {
        y: 50 * speed,
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          scrub: true
        }
      });
    });
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Desktop Mouse Parallax
  let rafId = 0;
  let lastX = 0;
  let lastY = 0;

  const render = () => {
    rafId = 0;
    const x = (window.innerWidth - lastX * 2) / 100;
    const y = (window.innerHeight - lastY * 2) / 100;

    layers.forEach((layer) => {
      const speed = Number(layer.getAttribute('data-speed'));
      if (!Number.isFinite(speed)) return;
      layer.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
    });
  };

  heroSection.addEventListener('mousemove', (event) => {
    lastX = event.pageX;
    lastY = event.pageY;

    if (rafId) return;
    rafId = window.requestAnimationFrame(render);
  });
}
