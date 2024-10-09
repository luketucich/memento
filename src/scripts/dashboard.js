// Imports styling
import "../styles/main.css";
import "../styles/header.css";
import "../styles/content.css";
import "../styles/footer.css";
import "../styles/new.css";

// Imports and updates icons
import feather from "feather-icons";
feather.replace();

// Imports functions
import {
  hideListModal,
  listModalSubmitForm,
  showListModal,
  updateDOM,
} from "./new";
import { userGreeting } from "./greeting";

// Display user's lists and tasks
updateDOM();

// Updates user information
const greeting = document.getElementById("greeting");
// Grab user's name from localStorage
greeting.textContent = userGreeting + ", " + localStorage.getItem("username");
// Grabs user's avatar from localStorage
const avatar = document.getElementById("avatar");
avatar.src = localStorage.getItem("avatar");

// Event listener for 'new -> list' button
document.getElementById("list").addEventListener("click", function () {
  showListModal();
});

// Event listener for closing the modal
document
  .getElementById("closeListModal")
  .addEventListener("click", function () {
    hideListModal();
  });
