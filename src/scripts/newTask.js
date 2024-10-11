import "../styles/taskModal.css";
import completedSound from "./completed.wav";
import feather from "feather-icons";

class Task {
  constructor(name, date, time, priority) {
    this.name = name;
    this.date = date;
    this.time = time;
    this.priority = priority;
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

function finishTaskLocalStorage() {
  // Get current task's parent list by index
  const parentListIndex = event.target
    .closest(".task")
    .closest(".taskContainer")
    .closest(".project").dataset.index;
  console.log(parentListIndex);

  // Get current task by index in parent list
  const taskIndex = event.target.closest(".task").dataset.index;

  // Update Local Storage
  const storedLists = localStorage.getItem("lists");
  const lists = JSON.parse(storedLists);

  // Move task from 'tasks' to 'completed'
  const task = lists[parentListIndex].tasks[taskIndex];
  lists[parentListIndex].completed.push(task);
  lists[parentListIndex].tasks.splice(taskIndex, 1);

  // Update Local Storage
  localStorage.setItem("lists", JSON.stringify(lists));
}
function finishTaskDOM() {}

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
      taskElement.dataset.index = task;
      const taskDate = new Date(currListTasks[task].date);
      const formattedDate = `${(taskDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${taskDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${taskDate.getFullYear().toString().slice(-2)}`;

      // Convert time to 0:00 AM/PM format
      const [hour, minute] = currListTasks[task].time.split(":");
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      const formattedTime = `${formattedHour}:${minute} ${ampm}`;

      taskElement.innerHTML = `
      <i data-feather="circle" class="circle"></i>
      <p class="taskName">${currListTasks[task].name}</p>
      <input type="checkbox" class="dropdownArrow">
      <div class="dateContainer">
        <i data-feather="clock" class="clock"></i>
        <p class="taskDate">Due <u>${formattedDate}</u> at <u>${formattedTime}</u></p>
      </div>
      <div class="priorityContainer">
        <i data-feather="flag" class="flag"></i>
        <p class="taskPriority">${currListTasks[task].priority} Priority</p>
      </div>
      `;

      currTaskContainer.appendChild(taskElement);
      feather.replace();

      const dropdownArrow = taskElement.querySelector(".dropdownArrow");
      const dateContainer = taskElement.querySelector(".dateContainer");
      const priorityContainer = taskElement.querySelector(".priorityContainer");
      const circle = taskElement.querySelector(".circle");

      dropdownArrow.addEventListener("change", function () {
        if (dropdownArrow.checked) {
          dropdownArrow.style = "transform: rotate(90deg)";
          taskElement.style = "padding-bottom: 5rem";
          dateContainer.style = "opacity: 1";
          priorityContainer.style = "opacity: 1";
        } else {
          dropdownArrow.style = "transform: rotate(0deg)";
          taskElement.style = "padding-bottom: 0.5rem";
          dateContainer.style = "opacity: 0";
          priorityContainer.style = "opacity: 0";
        }
      });

      circle.addEventListener("click", function () {
        // Play sound
        const audio = new Audio(completedSound);
        audio.play();

        // Update Local Storage
        finishTaskLocalStorage();
        updateDOMTasks();
      });
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
    const priority = document.getElementById("prioritySelect").value;
    const list = document.getElementById("listSelect").selectedIndex;
    const task = new Task(name, date, time, priority);

    // Adds task to corresponding list in local storage
    addTaskToLocalStorage(list, task);
    updateDOMTasks();

    hideTaskModal();
    form.reset();
  });
})();
