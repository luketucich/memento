import "../styles/modal.css";

const lists = [];

class List {
  constructor(title) {
    this.title = title;
  }
}

function hideListModal() {
  const modalContainer = document.getElementById("listModalContainer");
  const newButton = document.getElementById("newContainer");

  modalContainer.style.display = "none";
  newButton.style.display = "flex";
}

function showListModal() {
  const modalContainer = document.getElementById("listModalContainer");
  const newButton = document.getElementById("newContainer");
  const closeButton = document.getElementById("closeListModal");

  modalContainer.style.display = "block";
  newButton.style.display = "none";

  closeButton.addEventListener("click", function () {
    hideListModal();
  });
}

function newListDOM() {
  const listTitle = document.getElementById("listTitle").value;
  const list = new List("New List");
}

function listModalSubmitForm() {
  const form = document.getElementById("listModalForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.reset();
    hideListModal();
    newListDOM();
  });
}

export function newList() {
  showListModal();
  listModalSubmitForm();
}
