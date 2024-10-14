import "../styles/listModal.css";
import { updateDOMTasks, completedTasksDOM } from "./newTask";
import feather from "feather-icons";

class List {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.completed = [];
  }
}

// Placeholder list
if (!localStorage.getItem("lists")) {
  const firstList = new List("My First List");
  const lists = [firstList];
  localStorage.setItem("lists", JSON.stringify(lists));
}

export function hideListModal() {
  const modalContainer = document.getElementById("listModalContainer");
  const newButton = document.getElementById("newContainer");
  const form = document.getElementById("listModalForm");

  modalContainer.style.display = "none";
  newButton.style.display = "flex";
  form.reset();
}

export function showListModal() {
  const modalContainer = document.getElementById("listModalContainer");
  const newButton = document.getElementById("newContainer");

  modalContainer.style.display = "block";
  newButton.style.display = "none";
}

function deleteList(index) {
  const storedLists = localStorage.getItem("lists");
  const lists = JSON.parse(storedLists);
  lists.splice(index, 1);
  localStorage.setItem("lists", JSON.stringify(lists));
}

export function updateDOMLists() {
  const listContainer = document.getElementById("projectsContainer");

  // Clear the container
  listContainer.innerHTML = "";

  // Retrieve and parse the stored lists
  const storedLists = localStorage.getItem("lists");
  const lists = JSON.parse(storedLists);

  // Construct the HTML
  const html = lists
    .map(
      (list, index) => `
    <div class="project" data-index="${index}">
      <div class="projectHeader">
        <p class="title">${list.name}</p>
        <div class="optionsContainer">
          <i data-feather="more-vertical" class="optionsIcon"></i>
          <div class="optionsDropdown">
            <button class="deleteButton">
              <i data-feather="trash-2" class="deleteIcon"></i>
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>
      <div class="taskContainer" data-index="${index}"></div>
      <div class="completedTasksHeader" data-index="${index}">
        <input type="checkbox" id="completedArrow" class="dropdownArrow">
        <p>Completed Tasks</p>
      </div>
      <div class="completedTasksContainer" data-index="${index}">
      </div>
    </div>
  `
    )
    .join("");

  // Insert the constructed HTML into the container
  listContainer.innerHTML = html;
  // Initialize Feather icons
  feather.replace();

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const listIndex = button.closest(".project").dataset.index;
      deleteList(listIndex);
      updateDOMLists();
      updateDOMTasks();
      completedTasksDOM();
    });
  });

  const completedArrows = document.querySelectorAll("#completedArrow");
  completedArrows.forEach((arrow) => {
    arrow.addEventListener("change", function () {
      const completedTasks = arrow
        .closest(".project")
        .querySelector(".completedTask");
      const completedTasksContainer = arrow
        .closest(".project")
        .querySelector(".completedTasksContainer");

      if (arrow.checked) {
        arrow.style.transform = "rotate(90deg)";
        completedTasksContainer.style.display = "flex";
      } else {
        arrow.style.transform = "rotate(0deg)";
        completedTasksContainer.style.display = "none";
      }
    });
  });

  const completedTasksHeader = document.querySelectorAll(
    ".completedTasksHeader"
  );

  completedTasksHeader.forEach((header) => {
    const currListIndex = header.dataset.index;
    const localStorageLists = JSON.parse(localStorage.getItem("lists"));
    const localStorageCompletedTasks =
      localStorageLists[currListIndex].completed;

    if (localStorageCompletedTasks.length === 0) {
      header.style.display = "none";
    } else {
      header.style.display = "flex";
    }
  });
}

function addListToLocalStorage(name) {
  // Grabs lists stored in localStorage
  const storedLists = localStorage.getItem("lists");
  // Converts stored lists JSON to an array
  const lists = JSON.parse(storedLists);
  // Adds new list to array
  const list = new List(name);

  lists.push(list);
  // Updates localStorage with new list
  const updatedStoredLists = JSON.stringify(lists);
  localStorage.setItem("lists", updatedStoredLists);
}

const listModalSubmitForm = (() => {
  const form = document.getElementById("listModalForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const listName = document.getElementById("listName").value;

    // Update local storage and DOM
    addListToLocalStorage(listName);
    updateDOMLists();
    updateDOMTasks();

    // Hides modal and resets form
    hideListModal();
    form.reset();
  });
})();
