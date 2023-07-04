export default class project {
    static projects = [];

    constructor(name) {
        this.name = name;
        this.todos = [];

        projects.push(this);
    }


    static getProjects() {
        return projects;
    }

    get todos() {
        return this.todos;
    }

    insertTodo(todo) {
        this.todos.push(todo);
    }
};
