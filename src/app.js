import { Todo } from './todo.js';
import { Project } from './project.js';
import { Storage } from './storage.js';

// For debugging only
//TODO: Remove before production
window.Todo = Todo;
window.Project = Project;
window.Storage = Storage;

export const TodoApp = (function () {
  const storage = new Storage();

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
    const todo = storage.getTodoById(id);
    if (!todo) return null;
    todo.update(changes);
    return todo;
  }

  function toggleTodoComplete(id) {
    const todo = storage.getTodoById(id);
    if (!todo) return null;
    todo.toggleComplete();
    return todo;
  }

  function updateProject(id, changes) {
    const project = storage.getProjectById(id);
    if (!project) return null;
    project.update(changes);
    return project;
  }

  return {
    get getProjects() {
      return storage.allProjects;
    },
    get getTodos() {
      return storage.allTodos;
    },
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
  }

})();

window.TodoApp = TodoApp; //TODO: Remove after debugging
