const progress = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (current / height) * 100;
  progress.style.width = percent + "%";
});
