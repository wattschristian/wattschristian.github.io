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
    // Ease in-out quadratic function for smoother animation
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
        // Offset to accommodate fixed navbar (adjust as needed)
        const targetY = targetSection.offsetTop - 60;
        // Animate scroll over 300 milliseconds
        smoothScrollTo(targetY, 300);
      }
      
      // Close the mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Demo contact form submission handling
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('FORM SUBMITTED: THIS IS A DEMO. PLEASE ADD YOUR FORM HANDLER.');
  });
});

// Toggle project details on card click
function toggleProjectDetails(projectCard) {
  const details = projectCard.querySelector('.project-details');
  details.classList.toggle('hidden');
}
