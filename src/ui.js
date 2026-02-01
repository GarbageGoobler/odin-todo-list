import { TodoApp } from './app.js';
import { DEFAULT_PROJECT_ID } from './constants.js';

// add deafult project
TodoApp.addProject({ id: DEFAULT_PROJECT_ID, title: 'All Projects'});

export function RenderApp() {
  const app = document.querySelector('#app');

  app.appendChild(createHeader());
  app.appendChild(createSidebar());
  app.appendChild(createMainContent());

  renderTodoList(TodoApp.getTodos);
}

function createHeader() {
  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = "GarbageGoobler's Todo Gobbler"

  header.appendChild(title);
  return header;
}

function createSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';

  const select = createProjectSelector();
  sidebar.appendChild(select);

  return sidebar;
}

function createMainContent() {
  const main = document.createElement('main');

  const sidebarText = document.createElement('p');
  sidebarText.textContent = 'Test';
  main.appendChild(sidebarText);
  return main;
}

function createProjectSelector() {
  const container = document.createElement('div');
  container.className = 'project-selector-container';

  const label = document.createElement('label');
  label.textContent = 'Select Project:';
  label.setAttribute('for', 'project-selector');
  container.appendChild(label);

  const select = document.createElement('select');
  select.id = 'project-selector';
  addProjectsToSelector(select);

  const addBtn = document.createElement('button');
  addBtn.textContent = '+ Add Project';
  addBtn.className = 'add-project-btn';

  container.appendChild(select);
  container.appendChild(addBtn);
  return container;
}

function addProjectsToSelector(selectorElement) {
  const projects = TodoApp.getProjects;
  projects.forEach( project => {
    const projectElement = document.createElement('option');
    projectElement.value = project.id;
    projectElement.textContent = project.title;

    selectorElement.appendChild(projectElement);
  });
}

function renderTodoList(todos) {
  return null;
}
