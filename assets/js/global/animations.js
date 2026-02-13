export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  const xTo = gsap.quickTo(cursor, 'left', { duration: 0.2, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'top', { duration: 0.2, ease: 'power3' });

  document.addEventListener('mousemove', (event) => {
    xTo(event.clientX);
    yTo(event.clientY);
  });

  document.querySelectorAll('.hover-target').forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      const textElement = cursor.querySelector('.cursor-text');
      if (!textElement) return;

      if (target.tagName === 'A' || target.closest('a')) {
        textElement.innerText = 'CLICK';
        return;
      }

      if (target.classList.contains('gallery-item')) {
        textElement.innerText = 'ZOOM';
        return;
      }

      textElement.innerText = 'VIEW';
    });

    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });
}
