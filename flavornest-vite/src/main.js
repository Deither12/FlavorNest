/* FlavorNest — main.js */

// ---- Navbar scroll behaviour ----
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

// ---- Reveal on scroll (IntersectionObserver) ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Project image cycling on hover ----
const cycles = new Map();

function cycleImgs(row) {
  const imgs = row.querySelectorAll('.project-imgs img');
  if (imgs.length < 2) return;
  let i = 0;
  // make sure first image is visible
  imgs[0].style.opacity = '1';
  const id = setInterval(() => {
    imgs[i].style.opacity = '0';
    i = (i + 1) % imgs.length;
    imgs[i].style.opacity = '1';
  }, 700);
  cycles.set(row, id);
}

function resetImgs(row) {
  const id = cycles.get(row);
  if (id) clearInterval(id);
  cycles.delete(row);
  row.querySelectorAll('.project-imgs img').forEach((img, i) => {
    img.style.opacity = i === 0 ? '1' : '0';
  });
}

// ---- Newsletter subscribe ----
const nlBtn = document.getElementById('nlBtn');
if (nlBtn) {
  nlBtn.addEventListener('click', () => {
    const input = nlBtn.previousElementSibling;
    if (!input.value || !input.value.includes('@')) {
      input.style.outline = '1px solid #b07d3a';
      setTimeout(() => input.style.outline = '', 1500);
      return;
    }
    input.value = 'You\'re subscribed!';
    input.disabled = true;
    nlBtn.textContent = 'Done ✓';
    nlBtn.style.background = '#2e6e49';
    nlBtn.disabled = true;
  });
}
