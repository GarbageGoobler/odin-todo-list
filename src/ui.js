import { TodoApp } from './app.js';
import ggImage from './gg.png';
import { DEFAULT_PROJECT_ID, CATPUCCIN_COLORS } from './constants.js';

window.TodoApp = TodoApp; // TODO: Remove after debugging
TodoApp.addTodo({
  title: 'Test Todo',
  description: 'Testing the update method',
  dueDate: '2026-02-15',
  priority: 1,
  notes: 'Some notes'
});

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
  const mainContent = createMainContent();

  app.appendChild(projectModal);
  app.appendChild(todoModal);
  app.appendChild(createHeader());
  app.appendChild(sidebar);
  app.appendChild(mainContent);

  mainContent.addEventListener('click', (event) => {
    if (!event.target.closest('button')) { return }

    const todoCard = event.target.closest('.todo-card');
    if (!todoCard) return;
    
    const todoId = todoCard.dataset.todoId;
    if (!todoId) return;

    const action = event.target.classList;
      
    if (action.contains('todo-toggle-complete-btn')) {
      const isComplete = TodoApp.toggleTodoComplete(todoId).isComplete;
      if (isComplete) {
        todoCard.classList.add('completed');
      } else {
        todoCard.classList.remove('completed');
      }
      renderTodoList(TodoApp.getTodosByProjectId(TodoApp.getCurrentProjectId()));
    }
    else if (action.contains('todo-edit-btn')) {
      showModal(todoModal);
      // TODO: Load todo data into modal for editing
    }
  });

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
      renderTodoList(TodoApp.getTodosByProjectId(DEFAULT_PROJECT_ID));
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

  const headerImage = document.createElement('img');
  headerImage.src = ggImage;
  headerImage.alt = 'Logo';
  headerImage.className = 'header-image';

  header.appendChild(headerImage);
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
  main.className = 'main-content';
  const contentHeader = makeContentHeader();
  main.appendChild(contentHeader);
  return main;
}

function makeContentHeader() {
  const header = document.createElement('div');
  header.className = 'todo-list-header';

  const status = document.createElement('span');
  status.className = 'todo-header-status';
  status.setAttribute('aria-hidden', 'true');

  const title = document.createElement('span');
  title.className = 'todo-header-title';
  title.textContent = 'Title';

  const dueDate = document.createElement('span');
  dueDate.className = 'todo-header-due-date';
  dueDate.textContent = 'Due Date';

  const priority = document.createElement('span');
  priority.className = 'todo-header-priority';
  priority.textContent = 'Priority';

  const options = document.createElement('span');
  options.className = 'todo-header-options';
  options.textContent = 'Options';

  header.appendChild(status);
  header.appendChild(title);
  header.appendChild(dueDate);
  header.appendChild(priority);
  header.appendChild(options);

  return header;
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

  select.addEventListener('change', (event) => {
    TodoApp.setCurrentProjectId(event.target.value);
    const currentProject = TodoApp.getProjectById(TodoApp.getCurrentProjectId());
    changeSidebarBorder(currentProject.color);
    renderTodoList(TodoApp.getTodosByProjectId(TodoApp.getCurrentProjectId()));
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

    const selectedProjectId = todoProject.value;

    todoTitle.value = '';
    todoDescription.value = '';
    todoDueDate.value = '';
    todoPriority.value = '1';
    todoNotes.value = '';
    todoProject.value = selectedProjectId;
    todoComplete.checked = false;

    hideModal(modal);
    TodoApp.setCurrentProjectId(selectedProjectId);
    const selector = document.querySelector('#project-selector');
    if (selector) {
      selector.value = selectedProjectId;
    }
    renderTodoList(TodoApp.getTodosByProjectId(selectedProjectId));
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
  const mainContentElement = document.querySelector('.main-content');
  mainContentElement.innerHTML = '';
  const contentHeader = makeContentHeader();
  mainContentElement.appendChild(contentHeader);

  todos.forEach(todo => {
    const todoCard = createTodoCard(todo);
    mainContentElement.appendChild(todoCard);
  })
}

function createTodoCard(todo) {

  const project = TodoApp.getProjectById(todo.projectId);

  const todoCardElement = document.createElement('div');
  todoCardElement.className = 'todo-card';
  todoCardElement.dataset.todoId = todo.id;

  if (todo.isComplete) {
    todoCardElement.classList.add('completed');
  }

  const status = document.createElement('span');
  status.className = 'todo-status';
  status.style.backgroundColor = project?.color || CATPUCCIN_COLORS[0];
  const title = document.createElement('p');
  title.className = 'todo-title';
  title.textContent = todo.title;
  const dueDate = document.createElement('span');
  dueDate.className = 'todo-due-date';
  dueDate.textContent = todo.dueDate ? todo.dueDate : 'Not Set';

  const priority = document.createElement('span');
  priority.className = 'todo-priority';
  const priorityValue = Number(todo.priority ?? 1);
  const t = Math.min(Math.max((priorityValue - 1) / 9, 0), 1);
  const priorityColor = lerpColor('#a6e3a1', '#f38ba8', t);
  priority.style.color = priorityColor;
  priority.style.borderColor = priorityColor;
  priority.textContent = String(priorityValue ?? '');

  const actions = document.createElement('div');
  actions.className = 'todo-actions';
  const toggleCompleteBtn = document.createElement('button');
  toggleCompleteBtn.className = 'todo-toggle-complete-btn';
  toggleCompleteBtn.type = 'button';
  toggleCompleteBtn.textContent = todo.isComplete ? 'Mark Incomplete' : 'Mark Complete';

  const editBtn = document.createElement('button');
  editBtn.className = 'todo-edit-btn';
  editBtn.type = 'button';
  editBtn.setAttribute('aria-label', 'Edit todo');
  editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.13 12L19.39 10.74C19.83 10.3 20.39 10.06 21 10V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H11V19.13L11.13 19H5V5H12V12H18.13M14 4.5L19.5 10H14V4.5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" /></svg>';

  actions.appendChild(toggleCompleteBtn);
  actions.appendChild(editBtn);
  todoCardElement.appendChild(status);
  todoCardElement.appendChild(title);
  todoCardElement.appendChild(dueDate);
  todoCardElement.appendChild(priority);
  todoCardElement.appendChild(actions);

  return todoCardElement;
}

function lerpColor(startHex, endHex, t) {
  const s = startHex.replace('#', '');
  const e = endHex.replace('#', '');
  const sr = parseInt(s.slice(0, 2), 16);
  const sg = parseInt(s.slice(2, 4), 16);
  const sb = parseInt(s.slice(4, 6), 16);
  const er = parseInt(e.slice(0, 2), 16);
  const eg = parseInt(e.slice(2, 4), 16);
  const eb = parseInt(e.slice(4, 6), 16);
  const r = Math.round(sr + (er - sr) * t);
  const g = Math.round(sg + (eg - sg) * t);
  const b = Math.round(sb + (eb - sb) * t);
  return `rgb(${r}, ${g}, ${b})`;
}
