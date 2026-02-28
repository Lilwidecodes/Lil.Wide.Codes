const toggleBtn =
document.querySelector(".menu-toggle");
const navLinks =
document.querySelector(".nav-links");
toggleBtn.addEventListener("click", () =>
{
    navLinks.classList.toggle("open");
});

const menuToggle =
document.querySelector(".menu-toggle");
const navlinks =
document.querySelector(".nav-links");
menuToggle.addEventListener("click", () =>
{
    navLinks.classList.toggle("show");
});