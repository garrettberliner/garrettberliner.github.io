// ======================
// Main JS
// ======================

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------
    // 1️⃣ Load Navbar
    // ----------------------
    const navbarElement = document.getElementById("navbar");
  
    if (navbarElement) {
      // Determine relative path based on current folder
      let navbarPath = "src/partials/nav.html"; // default root
      const path = window.location.pathname;
  
      // Adjust for subfolders
      if (path.includes("/cv/") || path.includes("/experience/") || path.includes("/resume/")) {
        navbarPath = "../src/partials/nav.html";
      }
  
      fetch(navbarPath)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load navbar from ${navbarPath}`);
          return response.text();
        })
        .then(data => {
          navbarElement.innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
    }


    // Adjust navbar links dynamically
    function adjustNavLinks() {
        const links = document.querySelectorAll(".nav-bar a");
        const path = window.location.pathname; // e.g., "/cv/" or "/"
        
        links.forEach(link => {
        const target = link.getAttribute("data-link");
        let href = `/${target}`; // default root
        if (path !== "/") {
            // If in a subfolder, keep href relative
            href = `/${target}`;
        }
        link.setAttribute("href", href);
        });
    }
    fetch(navbarPath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load navbar from ${navbarPath}`);
            return response.text();
        })
        .then(data => {
            navbarElement.innerHTML = data;
            adjustNavLinks(); // ✅ Set correct hrefs
        })
        .catch(error => console.error("Error loading navbar:", error));

  
  
    // ----------------------
    // 2️⃣ Toggle mobile menu
    // ----------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
    }
  
    // ----------------------
    // 3️⃣ Smooth scrolling for anchor links
    // ----------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // ----------------------
    // 4️⃣ Update footer year
    // ----------------------
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  
    // ----------------------
    // 5️⃣ Form validation
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
    // 6️⃣ Experience accordion
    // ----------------------
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");
  
        // Close other accordion items
        document.querySelectorAll(".accordion-item").forEach(other => {
          if (other !== item) other.classList.remove("active");
        });
  
        item.classList.toggle("active");
      });
    });
  
    // Accordion preview click to expand individual entries
    document.querySelectorAll(".experience-entry .accordion-preview").forEach(preview => {
      preview.addEventListener("click", () => {
        const hidden = preview.nextElementSibling; // accordion-hidden
        hidden.classList.toggle("active");
      });
    });
  
    // ----------------------
    // 7️⃣ Load sections dynamically
    // ----------------------
    function loadSection(sectionId, filePath) {
      const sectionElement = document.getElementById(sectionId);
      if (!sectionElement) return;
  
      fetch(filePath)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${filePath}`);
          return response.text();
        })
        .then(data => {
          sectionElement.innerHTML = data;
        })
        .catch(error => console.error('Error loading section:', error));
    }
  
    // Adjust paths for subfolders
    let basePath = "";
    if (path.includes("/cv/") || path.includes("/experience/") || path.includes("/resume/")) {
      basePath = "../";
    }
  
    loadSection('about', `${basePath}sections/about.html`);
    loadSection('projects', `${basePath}sections/projects.html`);
    loadSection('resume-cv', `${basePath}sections/resume.html`);
  });
  