export class Todo {
  #id
  #title
  #description
  #dueDate
  #notes
  #priority
  #isComplete

  constructor(data) {
    this.#id = crypto.randomUUID();
    this.#title = data.title;
    this.#description = data.description || '';
    this.#dueDate = data.dueDate ? this.#stripTime(new Date(data.dueDate)) : null;
    this.#priority = this.#checkPriority(data.priority) || 1.0;
    this.#notes = data.notes || '';
    this.#isComplete = data.isComplete || false;
  }

  #stripTime(date) {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  #daysUntilDue(date) {
    if (!date) return null;
    const today = this.#stripTime(new Date());
    const diff = date - today;
    //milliseconds to days
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  #isOverdue(date) {
    if (!date) return null;
    return this.#daysUntilDue(date) < 0;
  }

  #checkPriority(priority) {
    if (typeof priority !== 'number' || priority > 10 || priority < 1) {
      return null;
    }
    return priority;
  }

  getId() { return this.#id }

  getTitle() { return this.#title };
  setTitle(v) { this.#title = v };

  getDescription() { return this.#description };
  setDescription(v) { this.#description = v };

  getDueDate() {
    if (!this.#dueDate) return null;
    const year = this.#dueDate.getFullYear();
    const month = String(this.#dueDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.#dueDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  setDueDate(v) {
    this.#dueDate = v ? this.#stripTime(new Date(v)) : null;
  }

  getPriority() { return this.#priority };
  setPriority(v) { this.#priority = this.#checkPriority(v) };

  getNotes() { return this.#notes };
  setNotes(v) { this.#notes = v };

  getIsComplete() { return this.#isComplete }
  toggleIsComplete() { this.#isComplete = !this.#isComplete }
}
