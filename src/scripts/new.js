import "../styles/modal.css";
import feather from "feather-icons";

const lists = [];

class List {
  constructor(name) {
    this.name = name;
  }
}

export function hideListModal() {
  const modalContainer = document.getElementById("listModalContainer");
  const newButton = document.getElementById("newContainer");

  modalContainer.style.display = "none";
  newButton.style.display = "flex";
}

export function showListModal() {
  const modalContainer = document.getElementById("listModalContainer");
  const newButton = document.getElementById("newContainer");

  modalContainer.style.display = "block";
  newButton.style.display = "none";
}

export function createList(name) {
  const list = new List(name);
  lists.push(list);
}

function updateDOM() {
  const listContainer = document.getElementById("projectsContainer");

  // Remove all lists from DOM to ensure no duplicates
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }

  for (let i = 0; i < lists.length; i++) {
    // Create list container
    const list = document.createElement("div");
    list.classList.add("project");
    list.setAttribute("index", `${i}`);

    // Create list header
    const listHeader = document.createElement("div");
    listHeader.classList.add("projectHeader");
    // List title
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = lists[i].name;
    // Options icon
    const options = document.createElement("i");
    options.setAttribute("data-feather", "more-vertical");
    options.classList.add("more");
    listHeader.appendChild(title);
    listHeader.appendChild(options);
    list.appendChild(listHeader);

    // Add list to lists container
    listContainer.appendChild(list);

    // Load feather icons
    feather.replace();
  }
}

export const listModalSubmitForm = (() => {
  const form = document.getElementById("listModalForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Adds list to lists array
    createList(document.getElementById("listName").value);

    // Hides modal and resets form
    hideListModal();
    form.reset();

    updateDOM();
  });
})();
