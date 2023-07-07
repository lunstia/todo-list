export default class project {
  static projects = [];

  constructor(name, todos) {
    this.name = name;
    this.todos = todos || [];

    project.projects.push(this);
  }

  static getProjects() {
    return this.projects;
  }

  getTodos() {
    return this.todos;
  }

  insertTodo(todo) {
    this.todos.push(todo);
  }
}
