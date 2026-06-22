/* NAVIGATION CONTROLLER - Lil.Wide.Codes V2 | Purpose: Unified Header and Fullscreen Menu Overlay */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggles = document.querySelectorAll(".menu-toggle");
  const navOverlay = document.querySelector(".nav-overlay");
  const header = document.querySelector(".site-header");
  const pagePath = window.location.pathname;

  // Toggle fullscreen navigation menu overlay
  menuToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const isOpen = navOverlay.classList.contains("open");
      if (isOpen) {
        navOverlay.classList.remove("open");
        document.body.style.overflow = "";
        toggle.innerHTML = "🟰";
      } else {
        navOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
        toggle.innerHTML = "✖";
      }
    });
  });

  // Close overlay when clicking on a link
  const overlayLinks = document.querySelectorAll(".nav-overlay a");
  overlayLinks.forEach(link => {
    link.addEventListener("click", () => {
      navOverlay.classList.remove("open");
      document.body.style.overflow = "";
      menuToggles.forEach(toggle => toggle.innerHTML = "🟰");
    });
  });

  // Sticky header class updates on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Auto-highlight active links in navbar and overlay
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