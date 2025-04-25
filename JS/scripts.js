// scripts.js

// Smooth scroll (unchanged)
function smoothScrollTo(targetY, duration) {
  /* …existing code… */
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (unchanged)
  /* …existing code… */

  // Smooth scrolling (unchanged)
  /* …existing code… */

  // Timeline, Projects & Skills interactivity:

  // 1. Project cards: attach toggles so only the clicked card opens
  document.querySelectorAll('.project-card').forEach(card => {
    const details = card.querySelector('.project-details');
    const btn = card.querySelector('.toggle-btn');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      details.classList.toggle('hidden');
    });
    card.addEventListener('click', () => {
      details.classList.toggle('hidden');
    });
  });

  // 2. Animate skill bars on load
  window.addEventListener('load', () => {
    document.querySelectorAll('.skill-bar .fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-percentage');
    });
  });
});
