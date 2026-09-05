const navigation = document.querySelector('.navigation');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

// Keep the navigation available when JavaScript is disabled.
navigation.dataset.enhanced = 'true';
menuToggle.hidden = false;

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.innerHTML = open ? 'Close <span aria-hidden="true">−</span>' : 'Menu <span aria-hidden="true">+</span>';
  navLinks.classList.toggle('is-open', open);
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target)) setMenu(false);
});
window.matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));
