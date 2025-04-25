// scripts.js

// Custom smooth scroll function (300ms duration)
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // value between 0 and 1
    const easedProgress = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const details = card.querySelector('.project-details');
      if (details) details.classList.toggle('hidden');
    });
  });
  // Initialize AOS once
  if (window.AOS) {
    AOS.init({ duration: 800, once: true });
  }

  // Mobile menu toggle (click + keyboard)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks   = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  menuToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navLinks.classList.toggle('active');
    }
  });

  // Smooth scrolling for links and buttons
  document.querySelectorAll('.nav-links a, .btn').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          smoothScrollTo(target.offsetTop - 60, 300);
        }
      }
    });
  });
});
