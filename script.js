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

// Highlight the current reading position without controlling content visibility.
const readingLinks = [...document.querySelectorAll('.nav-links a[href^="#"], .article-nav a[href^="#"]')];
const readingSections = readingLinks.map((link) => document.querySelector(link.getAttribute('href')));
let readingFramePending = false;

function updateReadingPosition() {
  const marker = navigation.getBoundingClientRect().bottom + 32;
  let activeIndex = -1;
  readingSections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= marker) activeIndex = index;
  });
  // Short final sections cannot always scroll as high as the header marker.
  if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) {
    activeIndex = readingLinks.length - 1;
  }
  readingLinks.forEach((link, index) => {
    if (index === activeIndex) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  readingFramePending = false;
}

window.addEventListener('scroll', () => {
  if (!readingFramePending) {
    readingFramePending = true;
    requestAnimationFrame(updateReadingPosition);
  }
}, { passive: true });
window.addEventListener('resize', updateReadingPosition);
window.addEventListener('pageshow', updateReadingPosition);
