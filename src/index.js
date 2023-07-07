import { compareAsc, format } from 'date-fns';
import Project from './modules/project';
import Todo from './modules/todo';
import Storage from './modules/localStorage';

const PROJECT_LIST = document.querySelector('#project-list');
const CREATE_PROJECT = document.querySelector('#create-project');
const DIALOG = document.querySelector('#project-dialog');

let StorageAvailable = false;

function loadTodos(project) {
  const title = document.querySelector('#title');
  title.innerText = project.name;

  const todoList = document.querySelector('#todo-list');
  todoList.replaceChildren();

  let todos = project.getTodos();
  todos = todos.sort((date, nextDate) => compareAsc(new Date(date.date), new Date(nextDate.date)));

  todos.forEach((todo) => {
    const div = document.createElement('div');
    div.innerHTML = `<h2>${todo.name}</h2> <span> PRIORITY: ${todo.priority} </span>  <span>${format(new Date(todo.date), 'MM-dd-yyyy')}</span> <input type="checkbox">`;
    todoList.appendChild(div);
  });

  const button = document.createElement('button');
  button.innerText = 'Create new Todo';

  button.addEventListener('click', () => {
    DIALOG.replaceChildren();
    const form = document.createElement('form');
    DIALOG.appendChild(form);

    const legend = document.createElement('legend');
    legend.innerText = 'Create New Todo';
    form.appendChild(legend);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;
    form.appendChild(nameInput);

    const priorityInput = document.createElement('input');
    priorityInput.type = 'text';
    priorityInput.required = true;
    form.appendChild(priorityInput);

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.required = true;
    form.appendChild(dateInput);

    const Submit = document.createElement('Button');
    Submit.type = 'Submit';
    Submit.innerText = 'Submit';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const date = new Date(dateInput.valueAsNumber);
      const newTodo = new Todo(
        nameInput.value,
        priorityInput.value,
        date.getTime() - date.getTimezoneOffset() * -60000,
      );
      project.insertTodo(newTodo);

      if (StorageAvailable) Storage.saveProjects(Project.projects);

      loadTodos(project);

      DIALOG.close();
    }, { once: true });

    form.appendChild(Submit);

    DIALOG.showModal();
  });

  todoList.appendChild(button);
}

function loadProject(project) {
  const projectButton = document.createElement('button');
  projectButton.innerText = project.name;

  projectButton.addEventListener('click', () => {
    loadTodos(project);
  });

  PROJECT_LIST.insertBefore(projectButton, CREATE_PROJECT);
}

function loadProjects() {
  const projects = Project.getProjects();

  projects.forEach((project) => {
    loadProject(project);
  });
}

CREATE_PROJECT.addEventListener('click', (e) => {
  DIALOG.replaceChildren();
  const form = document.createElement('form');
  DIALOG.appendChild(form);

  const legend = document.createElement('legend');
  legend.innerText = 'Create New Project';
  form.appendChild(legend);

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.required = true;
  form.appendChild(textInput);

  const br = document.createElement('br');
  form.appendChild(br);

  const Submit = document.createElement('input');
  Submit.type = 'Submit';
  Submit.innerText = 'Submit';

  form.addEventListener('submit', () => {
    e.preventDefault();

    const newProject = new Project(textInput.value);
    if (StorageAvailable) Storage.saveProjects(Project.projects);

    loadProject(newProject);

    DIALOG.close();
  }, { once: true });

  const Cancel = document.createElement('input');
  Cancel.type = 'button';
  Cancel.value = 'Cancel';

  Cancel.addEventListener('click', () => {
    DIALOG.close();
  });

  form.appendChild(Submit);
  form.appendChild(Cancel);

  DIALOG.showModal();
});

if (Storage.isAvailable()) {
  StorageAvailable = true;
  const newProjects = Storage.getProjects();

  newProjects.forEach((project) => {
    // eslint-disable-next-line no-new
    new Project(project.name, project.todos);
  });

  loadProjects();
}
