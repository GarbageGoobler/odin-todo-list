import { DEFAULT_PROJECT_ID } from './constants.js';
import { Todo } from './todo.js';
import { Project } from './project.js';

export class Storage {
  #projects = []
  #todos = []

  get allTodos() { return [...this.#todos] }
  getTodoById(id) {
    return this.#todos.find(todo => todo.id === id);
  }
  getTodosByProjectId(projectId) {
    return this.#todos.filter(todo => todo.projectId === projectId);
  }

  get allProjects() { return [...this.#projects]}
  getProjectById(projectId) {
    return this.#projects.find(project => project.id === projectId);
  }

  addTodo(todo) {
    this.#todos.push(todo)
    this.save();
    return todo;
  }
  addProject(project) {
    this.#projects.push(project)
    this.save();
    return project;
  }

  updateTodo(id, changes) {
    const todo = this.getTodoById(id);
    if (!todo) return null;
    todo.update(changes);
    this.save();
    return todo;
  }

  toggleTodoComplete(id) {
    const todo = this.getTodoById(id);
    if (!todo) return null;
    todo.toggleComplete();
    this.save();
    return todo;
  }

  updateProject(id, changes) {
    const project = this.getProjectById(id);
    if (!project) return null;
    project.update(changes);
    this.save();
    return project;
  }

  deleteTodo(id) {
    const index = this.#todos.findIndex(todo => todo.id === id);
    // returns -1 if not found
    if (index  !== -1) {
      this.#todos.splice(index, 1);
      this.save()
    }
  }

  deleteProject(projectId) {
    const projectTodos = this.#todos.filter(t => t.projectId === projectId);
    
    // move todos to default
    if (projectTodos.length > 0) {
      projectTodos.forEach(todo => {
        todo.projectId = DEFAULT_PROJECT_ID;
      });
      this.save();
    }
    
    const index = this.#projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      this.#projects.splice(index, 1);
      this.save()
    }
  }

  // for localStorage
  save() {
    const projectData = this.#projects.map(p => p.toPlainObject());
    const todoData = this.#todos.map(t => t.toPlainObject());
    localStorage.setItem('todoData', JSON.stringify({
      projects: projectData, todos: todoData
    }));
  }

  load() {
    const data = localStorage.getItem('todoData');
    if (data) {
      const parsed = JSON.parse(data);
      this.#projects = parsed.projects.map(Project.fromPlainObject);
      this.#todos = parsed.todos.map(Todo.fromPlainObject);
    }
  }
}
