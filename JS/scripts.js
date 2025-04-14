/* scripts.js */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });
    
    function smoothScroll(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Offset for fixed navbar height
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu when link is clicked
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
    
    // Prevent form submission (for demo purposes)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('FORM SUBMITTED: THIS IS A DEMO. PLEASE INSERT YOUR FORM HANDLER.');
    });
  });
  
  // Function to toggle the visibility of project details
  function toggleProjectDetails(projectElement) {
    const details = projectElement.querySelector('.project-details');
    if (details.classList.contains('hidden')) {
      details.classList.remove('hidden');
    } else {
      details.classList.add('hidden');
    }
  }
  