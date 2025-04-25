// Smooth scroll helper
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY, distance = targetY - startY;
  let startTime;
  function animate(t) {
    if (!startTime) startTime = t;
    const progress = Math.min((t - startTime) / duration, 1);
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  document.querySelector('.menu-toggle')
    .addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('active'));

  // Smooth scroll nav links & buttons
  document.querySelectorAll('.nav-links a, .btn').forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) smoothScrollTo(section.offsetTop - 60, 300);
      }
    });
  });

  // AOS init
  AOS.init({ duration:800, once:true });

  // Animate skills bars
  window.addEventListener('load', () => {
    document.querySelectorAll('.filled').forEach(bar => {
      bar.style.width = bar.getAttribute('data-percentage');
    });
  });

  // GitHub stats fetch
  fetch('https://api.github.com/users/wattschristian')
    .then(r => r.json())
    .then(user => {
      document.getElementById('repo-count').innerText = user.public_repos;
      document.getElementById('follower-count').innerText = user.followers;
      return fetch(user.repos_url + '?per_page=100');
    })
    .then(r => r.json())
    .then(repos => {
      let stars=0,forks=0;
      repos.forEach(r=>{stars+=r.stargazers_count; forks+=r.forks_count;});
      document.getElementById('star-count').innerText = stars;
      document.getElementById('fork-count').innerText = forks;
    })
    .catch(console.error);

  // Project-card toggle (only the clicked card)
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
});
