import "../styles/taskModal.css";
import feather from "feather-icons";

class Task {
  constructor(name, date, time) {
    this.name = name;
    this.date = date;
    this.time = time;
  }
}
function displayListOptions() {
  // Grabs lists stored in localStorage
  const storedLists = localStorage.getItem("lists");
  // Converts stored lists JSON to an array
  const lists = JSON.parse(storedLists);
  // Get 'listSelect' container
  const select = document.getElementById("listSelect");
  // Adds each list to task modal dropdown
  for (let i = 0; i < lists.length; i++) {
    const option = document.createElement("option");
    option.value = lists[i].name;
    option.textContent = lists[i].name;
    option.classList.add("listOption");
    select.appendChild(option);
  }
}

export function hideTaskModal() {
  const modalContainer = document.getElementById("taskModalContainer");
  const newButton = document.getElementById("newContainer");
  const form = document.getElementById("taskModalForm");

  modalContainer.style.display = "none";
  newButton.style.display = "flex";
  form.reset();
}

export function showTaskModal() {
  const modalContainer = document.getElementById("taskModalContainer");
  const newButton = document.getElementById("newContainer");

  modalContainer.style.display = "block";
  newButton.style.display = "none";
  displayListOptions();
}

// export function updateDOM() {
//   const listContainer = document.getElementById("projectsContainer");

//   // Remove all lists from DOM to ensure no duplicates
//   while (listContainer.firstChild) {
//     listContainer.removeChild(listContainer.firstChild);
//   }

//   // Grabs lists stored in localStorage
//   const storedLists = localStorage.getItem("lists");
//   // Converts stored lists JSON to an array
//   const lists = JSON.parse(storedLists);

//   for (let i = 0; i < lists.length; i++) {
//     // Create list container
//     const list = document.createElement("div");
//     list.classList.add("project");
//     list.setAttribute("index", `${i}`);

//     // Create list header
//     const listHeader = document.createElement("div");
//     listHeader.classList.add("projectHeader");
//     // List title
//     const title = document.createElement("p");
//     title.classList.add("title");
//     title.textContent = lists[i].name;
//     // Options icon
//     const options = document.createElement("i");
//     options.setAttribute("data-feather", "more-vertical");
//     options.classList.add("more");
//     listHeader.appendChild(title);
//     listHeader.appendChild(options);
//     list.appendChild(listHeader);

//     // Add list to lists container
//     listContainer.appendChild(list);

//     // Load feather icons
//     feather.replace();
//   }
// }

// export function updateLocalStorage(name) {
//   // Grabs lists stored in localStorage
//   const storedLists = localStorage.getItem("lists");
//   // Converts stored lists JSON to an array
//   const lists = JSON.parse(storedLists);
//   // Adds new list to array
//   lists.push(new List(name));
//   // Updates localStorage with new list
//   const updatedStoredLists = JSON.stringify(lists);
//   localStorage.setItem("lists", updatedStoredLists);
// }
function addTaskToLocalStorage(list, task) {
  // Grabs lists stored in localStorage
  const storedLists = localStorage.getItem("lists");
  // Converts stored lists JSON to an array
  const lists = JSON.parse(storedLists);
  // Adds new task to list
  lists[list].tasks.push(task);
  // Updates localStorage with new task
  const updatedStoredLists = JSON.stringify(lists);
  localStorage.setItem("lists", updatedStoredLists);
}

const taskModalSubmitForm = (() => {
  const form = document.getElementById("taskModalForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("taskName").value;
    const date = document.getElementById("dateSelect").value;
    const time = document.getElementById("timeSelect").value;
    const list = document.getElementById("listSelect").selectedIndex - 1;
    const task = new Task(name, date, time);

    // Adds task to corresponding list in local storage
    addTaskToLocalStorage(list, task);

    hideTaskModal();
    form.reset();
  });
})();
