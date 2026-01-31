// Helper functions
function stripTime(date) {
  // don't care about hours
  date.setHours(0, 0, 0, 0);
  return date;
}

function daysUntilDue(date) {
  if (!date) return null;

  const today = stripTime(new Date());
  const diff = date - today;
  // milliseconds to days
  return Math.ceil( diff / (1000 * 60 * 60 * 24));
}

function isOverdue(date) {
  if (!date) return null;
  return daysUntilDue(date) < 0;
}

function checkPriority(priority) {
  if (typeof priority !== 'number' || priority > 10 || priority < 1) {
    return null;
  }
  return priority;
}

// Main Class
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
    this.#dueDate = data.dueDate ? stripTime(new Date(data.dueDate)) : null;
    this.#priority = checkPriority(data.priority) || 1.0; //TODO: Add algorithm for better calc
    this.#notes = data.notes || '';
    this.#isComplete = data.isComplete || false;
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
    this.#dueDate = v ? stripTime(new Date(v)) : null;
  }
  daysUntilDue() { return daysUntilDue(this.#dueDate) };
  isOverdue() { return isOverdue(this.#dueDate) };

  getPriority() { return this.#priority };
  setPriority(v) { this.#priority = checkPriority(v) };

  getNotes() { return this.#notes };
  setNotes(v) { this.#notes = v };

  getIsComplete() { return this.#isComplete }
  toggleIsComplete() { this.#isComplete = !this.#isComplete }
}
