export function initHeroParallax() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroSection = document.querySelector('.hero');
  const layers = document.querySelectorAll('.hero-img');

  if (!heroSection || layers.length === 0) return;

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
