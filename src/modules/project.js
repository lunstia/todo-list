export default class project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    get todos() {
        return this.todos;
    }

    insertTodo(todo) {
        this.todos.push(todo);
    }
};
