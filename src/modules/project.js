export default class project {
    static projects = [];

    constructor(name) {
        this.name = name;
        this.todos = [];

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
};
