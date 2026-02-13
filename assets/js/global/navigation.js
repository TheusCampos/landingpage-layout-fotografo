export function initNavigation() {
  const menuBtn = document.querySelector('.menu-btn');
  const menuOverlay = document.querySelector('#menu-overlay');
  const menuItems = document.querySelectorAll('#menu-overlay .menu-item');

  if (!menuBtn || !menuOverlay) return;

  const setOpenState = (isOpen) => {
    menuOverlay.classList.toggle('active', isOpen);
    menuOverlay.setAttribute('aria-hidden', String(!isOpen));
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.textContent = isOpen ? 'CLOSE -' : 'MENU +';
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
  };

  const toggleMenu = () => setOpenState(!menuOverlay.classList.contains('active'));
  const closeMenu = () => setOpenState(false);

  menuBtn.addEventListener('click', toggleMenu);

  menuItems.forEach((item) => {
    item.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!menuOverlay.classList.contains('active')) return;
    closeMenu();
  });
}
