import { compareAsc, format } from 'date-fns';
import Project from './modules/project.js';
import Todo from './modules/todo.js';

const PROJECT_LIST = document.querySelector("#project-list");
const CREATE_PROJECT = document.querySelector("#create-project");
const DIALOG = document.querySelector("#project-dialog");

function loadTodos(project) {
    const title = document.querySelector("#title");
    title.innerText = project.name;

    const todoList = document.querySelector("#todo-list")
    todoList.replaceChildren();

    let todos = project.getTodos();
    todos = todos.sort((date, nextDate) => {
        return compareAsc(date.date, nextDate.date);
    });

    todos.forEach((todo)=> {
        let div = document.createElement("div");
        div.innerHTML = `<h2>${todo.name}</h2> <span> PRIORITY: ${todo.priority} </span>  <span>${format(todo.date, 'MM-dd-yyyy')}</span> <input type="checkbox">`
        todoList.appendChild(div);
    });

    let button = document.createElement("button");
    button.innerText = "Create new Todo";

    button.addEventListener("click", e=>{
        DIALOG.replaceChildren();
        let form = document.createElement("form");
        DIALOG.appendChild(form);

        let legend = document.createElement("legend");
        legend.innerText = "Create New Todo";
        form.appendChild(legend);

        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.required = true;
        form.appendChild(nameInput);

        let priorityInput = document.createElement("input");
        priorityInput.type = "text";
        priorityInput.required = true;
        form.appendChild(priorityInput);

        let dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.required = true;
        form.appendChild(dateInput);

        let Submit = document.createElement("Button");
        Submit.type = "Submit";
        Submit.innerText = "Submit";

        form.addEventListener('submit', e=>{
            e.preventDefault();
            let date = new Date(dateInput.valueAsNumber)
            let newTodo = new Todo(nameInput.value, priorityInput.value, new Date( date.getTime() - date.getTimezoneOffset() * -60000 )  );
            project.insertTodo(newTodo);

            loadTodos(project)

            DIALOG.close();

        }, {once: true})

        form.appendChild(Submit);

        DIALOG.showModal();
    });

    todoList.appendChild(button);
}

function loadProject(project) {
    let projectButton = document.createElement("button");
    projectButton.innerText = project.name;
        
    projectButton.addEventListener('click', e => {
        loadTodos(project);
    });

    PROJECT_LIST.insertBefore(projectButton, CREATE_PROJECT);
}

function loadProjects() {
    let projects = Project.getProjects();

    for (let project of projects) {
        loadProject(project);
    }
}

CREATE_PROJECT.addEventListener('click', e=>{
    DIALOG.replaceChildren();
    let form = document.createElement("form");
    DIALOG.appendChild(form);

    let legend = document.createElement("legend");
    legend.innerText = "Create New Project";
    form.appendChild(legend);

    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.required = true;
    form.appendChild(textInput);

    let Submit = document.createElement("Button");
    Submit.type = "Submit";
    Submit.innerText = "Submit";

    form.addEventListener('submit', e=>{
        e.preventDefault();

        let newProject = new Project(textInput.value);

        loadProject(newProject);

        DIALOG.close();

    }, {once: true})

    form.appendChild(Submit);

    DIALOG.showModal();
})

