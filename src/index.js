import Project from './modules/project.js'
import Todo from './modules/todo.js'

const PROJECT_LIST = document.querySelector("#project-list");
const CREATE_PROJECT = document.querySelector("#create-project");
const DIALOG = document.querySelector("#project-dialog");

function loadTodos(project) {

}

function loadProjects() {
    let projects = Project.getProjects();

    for (project of projects) {
        let projectButton = document.createElement("button");
        
        projectButton.addEventListener('click', e => {
            loadTodos(project);
        });
    }
}

CREATE_PROJECT.addEventListener('click', e=>{
    DIALOG.showModal();
})

loadProjects();

