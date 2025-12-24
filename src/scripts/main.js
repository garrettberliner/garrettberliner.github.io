// Toggle mobile navigation menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Update the footer with the current year
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Basic form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');

            if (!name.value || !email.value || !message.value) {
                e.preventDefault();
                alert('Please fill out all fields.');
            }
        });
    }
});

// Function to load HTML content into a specific element
function loadSection(sectionId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(sectionId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading section:', error);
        });
}

// Load sections dynamically
document.addEventListener('DOMContentLoaded', () => {
    loadSection('about', 'sections/about.html');
    loadSection('projects', 'sections/projects.html');
    loadSection('resume-cv', 'sections/resume.html');
});

fetch("../partials/nav.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch(error => {
    console.error("Error loading navbar:", error);
  });

document.querySelectorAll(".experience-entry .accordion-preview").forEach(preview => {
    preview.addEventListener("click", () => {
        const hidden = preview.nextElementSibling; // accordion-hidden
        hidden.classList.toggle("active");
    });
});

//   Experience
document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".accordion-header");
  
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");
  
        // Optional: close other sections
        document.querySelectorAll(".accordion-item").forEach(other => {
          if (other !== item) {
            other.classList.remove("active");
          }
        });
  
        item.classList.toggle("active");
      });
    });
  });
  