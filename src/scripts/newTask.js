import "../styles/taskModal.css";
import feather from "feather-icons";

class Task {
  constructor(name, date, priority) {
    this.name = name;
    this.date = date;
    this.priority = priority;
  }
}
export function displayListOptions() {
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

  modalContainer.style.display = "none";
  newButton.style.display = "flex";
}

export function showTaskModal() {
  const modalContainer = document.getElementById("taskModalContainer");
  const newButton = document.getElementById("newContainer");

  modalContainer.style.display = "block";
  newButton.style.display = "none";
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

// export const listModalSubmitForm = (() => {
//   const form = document.getElementById("listModalForm");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const listName = document.getElementById("listName").value;

//     // Update local storage and DOM
//     updateLocalStorage(listName);
//     updateDOM();

//     // Hides modal and resets form
//     hideListModal();
//     form.reset();
//   });
// })();
