// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeNavigation();
  initializeMobileMenu();
  updateCurrentYear();
  initializeScrollEffects();
  initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Handle scroll effect on navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Highlight active navigation link based on scroll position
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section, header");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Mobile menu functionality
function initializeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  mobileMenu.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".navbar")) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Update current year in footer
function updateCurrentYear() {
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only handle internal links
      if (href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbar = document.querySelector(".navbar");
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// // Scroll effects and animations
// function initializeScrollEffects() {
//   // Intersection Observer for fade-in animations
//   const observerOptions = {
//     threshold: 0.1,
//     rootMargin: "0px 0px -50px 0px",
//   };

//   const observer = new IntersectionObserver(function (entries) {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.style.opacity = "1";
//         entry.target.style.transform = "translateY(0)";
//       }
//     });
//   }, observerOptions);

//   // Observe elements for animation
//   const animatedElements = document.querySelectorAll(
//     ".project-card, .experience-item, .contact-item, .skill-item"
//   );

//   animatedElements.forEach((element) => {
//     element.style.opacity = "0";
//     element.style.transform = "translateY(30px)";
//     element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
//     observer.observe(element);
//   });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");

    if (hero && scrolled < hero.offsetHeight) {
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
}

// Utility function for debouncing scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced scroll performance
const debouncedScrollHandler = debounce(function () {
  // Additional scroll-based functionality can be added here
  updateScrollProgress();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Scroll progress indicator (optional enhancement)
function updateScrollProgress() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  // You can use this to create a scroll progress bar if desired
  // document.querySelector('.scroll-progress').style.width = scrolled + '%';
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Enable keyboard navigation for mobile menu
  if (e.key === "Escape") {
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (navMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }
});

// Contact form enhancement (if needed in future)
function initializeContactForm() {
  // Placeholder for contact form functionality
  // This can be expanded if a contact form is added
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize enhanced features
window.addEventListener("load", function () {
  initializeLazyLoading();

  // Add loaded class to body for CSS animations
  document.body.classList.add("loaded");
});

// Error handling for external resources
window.addEventListener(
  "error",
  function (e) {
    console.error("Resource loading error:", e.target.src || e.target.href);
  },
  true
);

// Smooth reveal animation for hero section
window.addEventListener("load", function () {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";

    setTimeout(() => {
      heroContent.style.transition = "opacity 1s ease, transform 1s ease";
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 100);
  }
});

// Console message for developers
console.log("👋 Welcome to Jamal Apicha's Portfolio Website!");
console.log("💻 Built with vanilla HTML, CSS, and JavaScript");
console.log("🚀 Optimized for performance and accessibility");
