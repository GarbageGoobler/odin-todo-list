import { CATPUCCIN_COLORS } from './constants.js';

export class Project {
  #id
  #title
  #color
  constructor(data) {
    this.#id = data.id || crypto.randomUUID();
    this.#title = data.title;
    this.#color = data.color || CATPUCCIN_COLORS[0];
  }

  get id() { return this.#id }

  get title() { return this.#title }
  set title(v) { this.#title = v }

  get color() { return this.#color }
  set color(v) { this.#color = v }

  update(data) {
    const updatable = ['title', 'color'];
    for (const key of updatable) {
      if (data[key] !== undefined) {
        this[key] = data[key];
      }
    }
  }
  // needed for localStorage
  toPlainObject() {
    return {
      id: this.id,
      title: this.title,
      color: this.color,
    };
  }

  static fromPlainObject(data) {
    const project = new Project(data);
    if (data?.id) {
      project.#id = data.id;
    }
    return project;
  }
}
