const progress = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (current / height) * 100;
  progress.style.width = percent + "%";
});

/* The cta button
const ctaButton = document.querySelector(".cta-button");

//event listener for the cta button
ctaButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default behavior of the button
  alert("BUTTON WAS CLICKED!..."); // Display an alert message
}); */
