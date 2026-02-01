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
  const todoModal = createTodoModal();
  const sidebar = createSidebar();

  app.appendChild(projectModal);
  app.appendChild(todoModal);
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
    } else if (event.target.classList.contains('add-todo-btn')) {
      const todoProject = document.querySelector('#todo-project');
      todoProject.innerHTML = '';
      const projects = TodoApp.getProjects;
      projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.title;
        todoProject.appendChild(option);
      });

      showModal(todoModal);
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

function createTodoModal() {
  const modal = document.createElement('div');
  modal.className = 'todo-modal'

  const modalContent = document.createElement('div');
  modalContent.className = 'todo-modal-content';
  
  const title = document.createElement('h2');
  title.textContent = 'Add New Todo';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.className = 'modal-close-btn';
  modalContent.appendChild(closeBtn);

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title*:';
  titleLabel.className = 'todo-label';
  titleLabel.setAttribute('for', 'todo-title');
  
  const todoTitle = document.createElement('input');
  todoTitle.type = 'text';
  todoTitle.placeholder = 'Todo title...';
  todoTitle.className = 'todo-input';
  todoTitle.id = 'todo-title';
  
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description:';
  descriptionLabel.className = 'todo-label';
  descriptionLabel.setAttribute('for', 'todo-description');
  
  const todoDescription = document.createElement('textarea');
  todoDescription.placeholder = 'Add description...';
  todoDescription.className = 'todo-input';
  todoDescription.id = 'todo-description';
  
  const dueDateLabel = document.createElement('label');
  dueDateLabel.textContent = 'Due Date:';
  dueDateLabel.className = 'todo-label';
  dueDateLabel.setAttribute('for', 'todo-due-date');
  
  const todoDueDate = document.createElement('input');
  todoDueDate.type = 'date';
  todoDueDate.className = 'todo-input';
  todoDueDate.id = 'todo-due-date';
  
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority:';
  priorityLabel.className = 'todo-label';
  priorityLabel.setAttribute('for', 'todo-priority');
  
  const todoPriority = document.createElement('select');
  todoPriority.className = 'todo-input';
  todoPriority.id = 'todo-priority';
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    todoPriority.appendChild(option);
  }
  
  const notesLabel = document.createElement('label');
  notesLabel.textContent = 'Notes:';
  notesLabel.className = 'todo-label';
  notesLabel.setAttribute('for', 'todo-notes');
  
  const todoNotes = document.createElement('textarea');
  todoNotes.placeholder = 'Add notes...';
  todoNotes.className = 'todo-input';
  todoNotes.id = 'todo-notes';
  
  const projectLabel = document.createElement('label');
  projectLabel.textContent = 'Project:';
  projectLabel.className = 'todo-label';
  projectLabel.setAttribute('for', 'todo-project');
  
  const todoProject = document.createElement('select');
  todoProject.className = 'todo-input';
  todoProject.id = 'todo-project';
  const projects = TodoApp.getProjects;
  projects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.title;
    todoProject.appendChild(option);
  });
  
  const isCompleteLabel = document.createElement('label');
  isCompleteLabel.textContent = 'Is Complete:';
  isCompleteLabel.className = 'todo-label';
  isCompleteLabel.setAttribute('for', 'todo-complete');
  
  const todoComplete = document.createElement('input');
  todoComplete.type = 'checkbox';
  todoComplete.className = 'todo-input';
  todoComplete.id = 'todo-complete';
  
  const createBtn = document.createElement('button');
  createBtn.textContent = 'Create Todo';
  createBtn.className = 'create-project-btn';
  createBtn.type = 'button';
  modalContent.appendChild(createBtn);

  createBtn.addEventListener('click', () => {
    const title = todoTitle.value.trim();
    if (!title) { return }

    TodoApp.addTodo({
      title: title,
      description: todoDescription.value.trim(),
      dueDate: todoDueDate.value || null,
      priority: parseInt(todoPriority.value, 10),
      notes: todoNotes.value.trim(),
      projectId: todoProject.value,
      isComplete: todoComplete.checked,
    });

    todoTitle.value = '';
    todoDescription.value = '';
    todoDueDate.value = '';
    todoPriority.value = '1';
    todoNotes.value = '';
    todoProject.value = TodoApp.getCurrentProjectId();
    todoComplete.checked = false;

    hideModal(modal);
  });
  
  modalContent.appendChild(title);
  modalContent.appendChild(titleLabel);
  modalContent.appendChild(todoTitle);
  modalContent.appendChild(descriptionLabel);
  modalContent.appendChild(todoDescription);
  modalContent.appendChild(dueDateLabel);
  modalContent.appendChild(todoDueDate);
  modalContent.appendChild(priorityLabel);
  modalContent.appendChild(todoPriority);
  modalContent.appendChild(notesLabel);
  modalContent.appendChild(todoNotes);
  modalContent.appendChild(projectLabel);
  modalContent.appendChild(todoProject);
  modalContent.appendChild(isCompleteLabel);
  modalContent.appendChild(todoComplete);
  modalContent.appendChild(createBtn);
  
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
