export class List {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks.pop(task);
  }
}
