import { TodoApp } from './app.js';
import { DEFAULT_PROJECT_ID, CATPUCCIN_COLORS } from './constants.js';

// add deafult project
TodoApp.addProject({ id: DEFAULT_PROJECT_ID, title: 'All Projects'});

export function RenderApp() {
  const app = document.querySelector('#app');

  const projectModal = createProjectModal();
  app.appendChild(projectModal);

  app.appendChild(createHeader());

  const sidebar = createSidebar();
  app.appendChild(sidebar);

  app.appendChild(createMainContent());

  sidebar.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-project-btn')) {
      showModal(projectModal);
    }
  });

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

function createProjectModal() {
  const modal = document.createElement('div');
  modal.className = 'project-modal'

  const modalContent = document.createElement('div');
  modalContent.className = 'project-modal-content';
  
  const title = document.createElement('h2');
  title.textContent = 'Add New Project';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.className = 'modal-close-btn';
  modalContent.appendChild(closeBtn);

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  
  const projectLabel = document.createElement('label');
  projectLabel.textContent = 'Project Name:';
  projectLabel.className = 'project-label';
  projectLabel.setAttribute('for', 'project-input');
  
  const projectInput = document.createElement('input');
  projectInput.type = 'text';
  projectInput.placeholder = 'Project name...';
  projectInput.className = 'project-input';
  projectInput.id = 'project-input';
  
  const colorLabel = document.createElement('p');
  colorLabel.textContent = 'Choose a color:';
  colorLabel.className = 'color-label';
  
  const colorSelector = document.createElement('div');
  colorSelector.className = 'color-selector';
  
  CATPUCCIN_COLORS.forEach(color => {
    const colorOption = document.createElement('div');
    colorOption.className = 'color-option';
    colorOption.style.backgroundColor = color;
    colorOption.dataset.color = color;
    colorSelector.appendChild(colorOption);
  });
  
  modalContent.appendChild(title);
  modalContent.appendChild(projectLabel);
  modalContent.appendChild(projectInput);
  modalContent.appendChild(colorLabel);
  modalContent.appendChild(colorSelector);
  
  const createBtn = document.createElement('button');
  createBtn.textContent = 'Create Project';
  createBtn.className = 'create-project-btn';
  createBtn.type = 'button';
  modalContent.appendChild(createBtn);
  
  modal.appendChild(modalContent);
  return modal;
}

function hideModal(modalElement) {
  modalElement.classList.remove('show');
}

function showModal(modalElement) {
  modalElement.classList.add('show');
}

function renderTodoList(todos) {
  return null;
}
