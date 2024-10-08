// Import styling
import "../styles/welcome.css";

// Imports and updates icons
import feather from "feather-icons";
feather.replace();

// Function to generate a random avatar
function getRandomAvatarUrl() {
  const seed = Math.random().toString(36).substring(2);
  return `https://api.dicebear.com/5.x/thumbs/svg?seed=${encodeURIComponent(
    seed
  )}`;
}

const avatar1 = document.getElementById("avatar1");
const avatar2 = document.getElementById("avatar2");
const avatar3 = document.getElementById("avatar3");

avatar1.src = getRandomAvatarUrl();
const avatar1src = avatar1.src;
avatar2.src = getRandomAvatarUrl();
const avatar2src = avatar1.src;
avatar3.src = getRandomAvatarUrl();
const avatar3src = avatar1.src;

// Event listener for form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Save user's options to localStorage
  localStorage.setItem("username", document.getElementById("username").value);

  if (document.getElementById("avatar1Button").checked) {
    localStorage.setItem("avatar", avatar1src);
  } else if (document.getElementById("avatar2Button").checked) {
    localStorage.setItem("avatar", avatar2src);
  } else if (document.getElementById("avatar3Button").checked) {
    localStorage.setItem("avatar", avatar3src);
  }

  if (document.getElementById("darkButton").checked) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  // Redirect user to dashboard
  window.location.href = "dashboard.html";
});
