import { DEFAULT_PROJECT_ID, CATPUCCIN_COLORS } from './constants.js';
import { Todo } from './todo.js';
import { Project } from './project.js';
import { Storage } from './storage.js';

export const TodoApp = (function () {
  const storage = new Storage();
  storage.load(); // from localStorage

  let currentProjectId = DEFAULT_PROJECT_ID;

  if (!storage.getProjectById(DEFAULT_PROJECT_ID)) {
    storage.addProject(new Project({
      id: DEFAULT_PROJECT_ID,
      title: 'Unmarked Projects',
      color: CATPUCCIN_COLORS[0],
    }));
  }

  function getCurrentProjectId() {
    return currentProjectId;
  }

  function setCurrentProjectId(id) {
    currentProjectId = id;
  }

  function addTodo(data) {
    const todo = new Todo(data);
    storage.addTodo(todo);
  }

  function addProject(data) {
    const project = new Project(data);
    storage.addProject(project);
  }

  function getTodoById(id) {
    return storage.getTodoById(id);
  }

  function getProjectById(id) {
    return storage.getProjectById(id);
  }

  function getTodosByProjectId(projectId) {
    return storage.getTodosByProjectId(projectId);
  }

  function deleteTodo(id) {
    return storage.deleteTodo(id);
  }

  function deleteProject(id) {
    return storage.deleteProject(id);
  }

  function updateTodo(id, changes) {
    return storage.updateTodo(id, changes);
  }

  function toggleTodoComplete(id) {
    return storage.toggleTodoComplete(id);
  }

  function updateProject(id, changes) {
    return storage.updateProject(id, changes);
  }

  return {
    get getProjects() {
      return storage.allProjects;
    },
    get getTodos() {
      return storage.allTodos;
    },
    setCurrentProjectId,
    getCurrentProjectId,
    getTodoById,
    getProjectById,
    getTodosByProjectId,
    addTodo,
    addProject,
    deleteTodo,
    deleteProject,
    updateTodo,
    toggleTodoComplete,
    updateProject,
  };
})();
