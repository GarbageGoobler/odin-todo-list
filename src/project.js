export class Project {
  #id
  #title
  #color
  constructor(data) {
    this.#id = crypto.randomUUID();
    this.#title = data.title;
    this.#color = data.color || this.#getRandomCatpuccinColor();
  }

  get id() { return this.#id }

  get title() { return this.#title }
  set title(v) { this.#title = v }

  get color() { return this.#color }
  set color(v) { this.#color = v }

  #getRandomCatpuccinColor() {
    const CATPUCCIN_COLORS = [
      '#f5c2e7',
      '#cba6f7',
      '#f38ba8',
      '#fab387',
      '#f9e2af',
      '#a6e3a1',
      '#94e2d5',
      '#89dceb',
      '#74c7ec',
      '#89b4fa',
      '#b4befe'
    ];
    return CATPUCCIN_COLORS[Math.floor(Math.random() * CATPUCCIN_COLORS.length)];
  }
}
