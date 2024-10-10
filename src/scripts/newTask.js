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
  // Clears initial list options to prevent duplicates
  const listDropdownMenu = document.getElementById("listSelect");
  listDropdownMenu.innerHTML = "";
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

export function updateDOMTasks() {
  // Retrieve and parse the stored lists
  const storedLists = localStorage.getItem("lists");
  const lists = JSON.parse(storedLists);

  // Output
  for (const list in lists) {
    const currListTasks = lists[list].tasks;
    const currTaskContainer = document.querySelector(
      `div.taskContainer[data-index="${list}"]`
    );
    currTaskContainer.innerHTML = "";
    for (const task in currListTasks) {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.innerHTML = `
      <i data-feather="circle" class="circle"></i>
      <p class="taskName">${currListTasks[task].name}</p>
      `;

      currTaskContainer.appendChild(taskElement);
      feather.replace();
    }
  }
}

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
    const list = document.getElementById("listSelect").selectedIndex;
    const task = new Task(name, date, time);

    // Adds task to corresponding list in local storage
    addTaskToLocalStorage(list, task);
    updateDOMTasks();

    hideTaskModal();
    form.reset();
  });
})();
