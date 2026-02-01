import { TodoApp } from './app.js';

export function RenderApp() {
  const app = document.querySelector('#app');

  app.appendChild(createHeader());
  app.appendChild(createSidebar());
  app.appendChild(createMainContent());

  //render all todos intitiall
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

  const sidebarText = document.createElement('p');
  sidebarText.textContent = 'Select your project:';
  sidebar.appendChild(sidebarText);

  //const select = createProjectSelector();
  //sidebar.appendChild(select);

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
  return;
}

function renderTodoList(todos) {
  return null;
}
