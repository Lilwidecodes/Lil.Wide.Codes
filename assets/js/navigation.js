/* NAVIGATION CONTROLLER - Lil.Wide.Codes V3 | Purpose: PWA SW register, active state highlights, theme switches & morphing menu */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggles = document.querySelectorAll(".menu-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const header = document.querySelector(".site-header");
  const pagePath = window.location.pathname;

  // 1. REGISTER PWA SERVICE WORKER DYNAMICALLY
  let serviceWorkerPath = './service-worker.js';
  if (pagePath.includes('/pages/learn/')) {
    serviceWorkerPath = '../../service-worker.js';
  } else if (pagePath.includes('/pages/')) {
    serviceWorkerPath = '../service-worker.js';
  }
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(serviceWorkerPath)
      .then(reg => {
        // SW active
      })
      .catch(err => {
        // SW failed
      });
  }

  // 2. LIGHT/DARK THEME TOGGLER
  const themeToggle = document.querySelector(".theme-toggle-btn");
  if (themeToggle) {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
      localStorage.setItem("theme", currentTheme);
    });
  }

  // Apply theme check immediately on other pages if nav is loaded
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" && !document.body.classList.contains("light-theme")) {
    document.body.classList.add("light-theme");
  }

  // 3. MORPHING HAMBURGER & NAVIGATION OVERLAY
  menuToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const isOpen = navOverlay.classList.contains("open");
      if (isOpen) {
        navOverlay.classList.remove("open");
        document.body.style.overflow = "";
        toggle.classList.remove("open");
      } else {
        navOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
        toggle.classList.add("open");
      }
    });
  });

  // Close overlay on link clicks
  const overlayLinks = document.querySelectorAll(".nav-overlay a");
  overlayLinks.forEach(link => {
    link.addEventListener("click", () => {
      navOverlay.classList.remove("open");
      document.body.style.overflow = "";
      menuToggles.forEach(toggle => toggle.classList.remove("open"));
    });
  });

  // Sticky header scrolls
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Auto active link highlighters
  const allLinks = document.querySelectorAll(".nav-links a, .nav-overlay a");
  allLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    
    // Resolve absolute pathways or subpages comparison
    const linkPath = href.replace("../", "").replace("pages/", "");
    const cleanPath = pagePath.substring(pagePath.lastIndexOf("/") + 1);

    if (
      (cleanPath === "" && href === "index.html") || 
      (cleanPath === "index.html" && href.includes("index.html")) || 
      (cleanPath !== "" && cleanPath !== "index.html" && cleanPath === linkPath)
    ) {
      link.classList.add("active");
    }
  });
});