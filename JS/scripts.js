// scripts.js

// Custom smooth scroll function (300ms duration)
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
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
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetID = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        const targetY = targetSection.offsetTop - 60;
        smoothScrollTo(targetY, 300);
      }
    });
  });

  // Smooth scrolling for buttons
  document.querySelectorAll('.btn').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetID = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        const targetY = targetSection.offsetTop - 60;
        smoothScrollTo(targetY, 300);
      }
    });
  });

  // Initialize AOS animations
  AOS.init({ duration: 800, once: true });

  // Animate skill bars
  const skillBars = document.querySelectorAll('.filled');
  function fillSkills() {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage;
    });
  }
  window.addEventListener('load', fillSkills);

  // Toggle project details on card click
  function toggleProjectDetails(projectCard) {
    const details = projectCard.querySelector('.project-details');
    details.classList.toggle('hidden');
  }
  window.toggleProjectDetails = toggleProjectDetails;

  // Fetch and display GitHub stats
  fetch('https://api.github.com/users/wattschristian')
    .then(res => res.json())
    .then(user => {
      document.getElementById('repo-count').innerText = user.public_repos;
      document.getElementById('follower-count').innerText = user.followers;
      return fetch(user.repos_url + '?per_page=100');
    })
    .then(res => res.json())
    .then(repos => {
      let stars = 0, forks = 0;
      repos.forEach(r => {
        stars += r.stargazers_count;
        forks += r.forks_count;
      });
      document.getElementById('star-count').innerText = stars;
      document.getElementById('fork-count').innerText = forks;
    })
    .catch(e => console.error(e));
});
