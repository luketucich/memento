// Imports styling
import "../styles/main.css";
import "../styles/header.css";
import "../styles/content.css";
import "../styles/footer.css";
import "../styles/new.css";
import "../styles/listModal.css";
import "../styles/taskModal.css";
import "../styles/completed.css";

// Imports and updates icons
import feather from "feather-icons";

// Imports functions
import { hideListModal, showListModal, updateDOMLists } from "./newList";

import {
  hideTaskModal,
  showTaskModal,
  updateDOMTasks,
  completedTasksDOM,
} from "./newTask";

import { userGreeting } from "./greeting";

// Display user's lists and tasks
updateDOMLists();
updateDOMTasks();
completedTasksDOM();

// Updates user information
const greeting = document.getElementById("greeting");
// Grab user's name from localStorage
greeting.textContent = userGreeting + ", " + localStorage.getItem("username");
// Grabs user's avatar from localStorage
const avatar = document.getElementById("avatar");
avatar.src = localStorage.getItem("avatar");

// LISTS
// Event listener for 'new -> list' button
document.getElementById("list").addEventListener("click", function () {
  showListModal();
});

// Event listener for closing the list modal
document
  .getElementById("closeListModal")
  .addEventListener("click", function () {
    hideListModal();
  });

// TASKS
// Event listener for 'new -> task' button
document.getElementById("task").addEventListener("click", function () {
  showTaskModal();
});

// Event listener for closing the task modal
document
  .getElementById("closeTaskModal")
  .addEventListener("click", function () {
    hideTaskModal();
  });
