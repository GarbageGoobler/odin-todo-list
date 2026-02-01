import { TodoApp } from './app.js';
import { DEFAULT_PROJECT_ID, CATPUCCIN_COLORS } from './constants.js';

window.TodoApp = TodoApp; // TODO: Remove after debugging

// add default project
TodoApp.addProject({
  id: DEFAULT_PROJECT_ID,
  title: 'All Projects',
  color: CATPUCCIN_COLORS[0]});

export function RenderApp() {
  const app = document.querySelector('#app');

  const projectModal = createProjectModal();
  const sidebar = createSidebar();

  app.appendChild(projectModal);
  app.appendChild(createHeader());
  app.appendChild(sidebar);
  app.appendChild(createMainContent());

  sidebar.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-project-btn')) {
      showModal(projectModal);
    } else if (event.target.classList.contains('delete-project-btn')) {
      const currentProjectId = TodoApp.getCurrentProjectId();
      if (currentProjectId === DEFAULT_PROJECT_ID) { return }
      TodoApp.deleteProject(currentProjectId);
      TodoApp.setCurrentProjectId(DEFAULT_PROJECT_ID);
      changeSidebarBorder(CATPUCCIN_COLORS[0]);
      const selector = document.querySelector('#project-selector');

      selector.innerHTML = '';
      addProjectsToSelector(selector);
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
  sidebar.style.borderRight = `4px solid ${CATPUCCIN_COLORS[0]}`;

  const select = editTodoProjectLists();
  sidebar.appendChild(select);

  return sidebar;
}

function createMainContent() {
  const main = document.createElement('main');
  return main;
}

function changeSidebarBorder(color) {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.style.borderRight = `4px solid ${color}`;
  }
}

function editTodoProjectLists() {
  const container = document.createElement('div');
  container.className = 'project-selector-container';

  const label = document.createElement('label');
  label.textContent = 'Select Project:';
  label.setAttribute('for', 'project-selector');
  container.appendChild(label);

  const select = document.createElement('select');
  select.id = 'project-selector';
  addProjectsToSelector(select);

  select.addEventListener('change', (e) => {
    TodoApp.setCurrentProjectId(event.target.value);
    const currentProject = TodoApp.getProjectById(TodoApp.getCurrentProjectId());
    changeSidebarBorder(currentProject.color);
  });

  const addBtn = document.createElement('button');
  addBtn.textContent = '+ Add Project';
  addBtn.className = 'add-project-btn';

  const addTodoBtn = document.createElement('button');
  addTodoBtn.textContent = '+ Add Todo';
  addTodoBtn.className = 'add-todo-btn';

  const deleteProjectBtn = document.createElement('button');
  deleteProjectBtn.textContent = '🗑️ Delete Project';
  deleteProjectBtn.className = 'delete-project-btn';

  container.appendChild(select);
  container.appendChild(addTodoBtn);
  container.appendChild(addBtn);
  container.appendChild(deleteProjectBtn);
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
    modalColorSelectionRemover(colorSelector); 
    projectInput.value = '';
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

  let selectedColor = CATPUCCIN_COLORS[0]; // Default color
  colorSelector.addEventListener('click', (event) => {
    if (event.target.classList.contains('color-option')) {
      // Remove selected from all
      modalColorSelectionRemover(colorSelector); 
    // Add selected to clicked
    event.target.classList.add('selected');
    selectedColor = event.target.dataset.color;
   }
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

  createBtn.addEventListener('click', () => {
    const projectName = projectInput.value.trim();
    if (!projectName) { return }

    TodoApp.addProject({
      title: projectName,
      color: selectedColor,
    });
    // Refresh dropdown
    const selector = document.querySelector('#project-selector');
    selector.innerHTML = '';
    addProjectsToSelector(selector);
    
    // Reset and close
    projectInput.value = '';
    modalColorSelectionRemover(colorSelector); 
    hideModal(modal);
  });
  
  modal.appendChild(modalContent);
  return modal;
}

function modalColorSelectionRemover(colorSelector) {
  colorSelector.querySelectorAll('.color-option').forEach(opt => {
    opt.classList.remove('selected');
  });
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
