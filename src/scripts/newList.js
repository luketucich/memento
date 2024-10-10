import "../styles/listModal.css";
import feather from "feather-icons";

class List {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

// Placeholder list
if (!localStorage.getItem("lists")) {
  localStorage.setItem("lists", JSON.stringify([]));
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
        <i data-feather="more-vertical" class="more"></i>
      </div>
      <div class="taskContainer" data-index="${index}">
     </div>
    </div>
  `
    )
    .join("");

  // Insert the constructed HTML into the container
  listContainer.innerHTML = html;

  // Initialize Feather icons
  feather.replace();
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

    // Hides modal and resets form
    hideListModal();
    form.reset();
  });
})();
