document.addEventListener("DOMContentLoaded", () => {
    // ----------------------
    // 1️⃣ Load Navbar
    // ----------------------
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      let navbarPath = "/src/partials/nav.html"; // absolute path from root
  
      fetch(navbarPath)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load navbar from ${navbarPath}`);
          return response.text();
        })
        .then(data => {
          navbarElement.innerHTML = data;
  
          // Initialize mobile menu toggle after loading navbar
          const menuToggle = document.querySelector('.menu-toggle');
          const navMenu = document.querySelector('.nav-menu');
          if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
              navMenu.classList.toggle('active');
            });
          }
        })
        .catch(error => console.error("Error loading navbar:", error));
    }
  
    // ----------------------
    // 2️⃣ Smooth Scrolling for Anchor Links
    // ----------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // ----------------------
    // 3️⃣ Update Footer Year
    // ----------------------
    const yearElement = document.querySelector('.current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
  
    // ----------------------
    // 4️⃣ Form Validation
    // ----------------------
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', e => {
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const message = form.querySelector('textarea[name="message"]');
        if (!name.value || !email.value || !message.value) {
          e.preventDefault();
          alert('Please fill out all fields.');
        }
      });
    }
  
    // ----------------------
    // 5️⃣ Experience Accordion
    // ----------------------
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");
        document.querySelectorAll(".accordion-item").forEach(other => {
          if (other !== item) other.classList.remove("active");
        });
        item.classList.toggle("active");
      });
    });
  
    document.querySelectorAll(".experience-entry .accordion-preview").forEach(preview => {
      preview.addEventListener("click", () => {
        const hidden = preview.nextElementSibling; // accordion-hidden
        hidden.classList.toggle("active");
      });
    });
  
    // ----------------------
    // 6️⃣ Load Sections Dynamically
    // ----------------------
    function loadSection(sectionId, filePath) {
      const sectionElement = document.getElementById(sectionId);
      if (!sectionElement) return;
      fetch(filePath)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${filePath}`);
          return response.text();
        })
        .then(data => { sectionElement.innerHTML = data; })
        .catch(error => console.error('Error loading section:', error));
    }
  
    const path = window.location.pathname;
    let basePath = "/"; // default root
    if (path.includes("/cv/") || path.includes("/experience/") || path.includes("/resume/") || path.includes("/about/")) {
      basePath = "../";
    }
  
    loadSection('about', `${basePath}sections/about.html`);
    loadSection('projects', `${basePath}sections/projects.html`);
    loadSection('resume-cv', `${basePath}sections/resume.html`);
  });
  