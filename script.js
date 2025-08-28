// Helpers
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

// Year
qs('#year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = qs('.menu-toggle');
const nav = qs('.main-nav');
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav on link click (mobile)
qsa('.main-nav a').forEach(a => a.addEventListener('click', () => {
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
}));

// Custom Cursor
const cursor = qs('.cursor');
const cursorInner = qs('.cursor--inner');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

const activateCursor = (active) => {
  [cursor, cursorInner].forEach(el => el.classList.toggle('active', active));
};

qsa('a, button, .card, .grid-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    activateCursor(true);
    cursor.classList.add('alt');
  });
  el.addEventListener('mouseleave', () => {
    activateCursor(false);
    cursor.classList.remove('alt');
  });
});

// Hide cursor on touch devices
const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
if (isTouch) {
  cursor.style.display = 'none';
  cursorInner.style.display = 'none';
}

// Scroll Reveal (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

qsa('.reveal').forEach(el => observer.observe(el));

// Animate skill bars on reveal
const animateBars = () => {
  qsa('.skill__bar').forEach(bar => {
    const pct = Number(bar.getAttribute('data-percent') || 0);
    requestAnimationFrame(() => (bar.style.width = pct + '%'));
  });
};

const skillsSection = qs('#about');
if (skillsSection) {
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateBars();
        skillObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  skillObs.observe(skillsSection);
}

// Simple contact form validation
const form = qs('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || !message) {
      e.preventDefault();
      alert('Please provide a valid name, email, and message.');
    }
  });
}


