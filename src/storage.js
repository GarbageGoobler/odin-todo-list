import { DEFAULT_PROJECT_ID } from './constants.js';

class Storage {
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

  addTodo(todo) { this.#todos.push(todo) }
  addProject(project) { this.#projects.push(project) }

  deleteTodo(id) {
    const index = this.#todos.findIndex(todo => todo.id === id);
    // returns -1 if not found
    if (index  !== -1) {
      this.#todos.splice(index, 1);
    }
  }

  deleteProject(projectId) {
    const projectTodos = this.#todos.filter(t => t.projectId === projectId);
    
    // move todos to default
    if (projectTodos.length > 0) {
      projectTodos.forEach(todo => {
        todo.projectId = DEFAULT_PROJECT_ID;
      });
    }
    
    const index = this.#projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      this.#projects.splice(index, 1);
    }
  }

}
