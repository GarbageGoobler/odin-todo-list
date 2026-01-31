import { parseISO, startOfDay, differenceInDays, format } from 'date-fns';

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
    this.#dueDate = data.dueDate ? this.#stripTime(parseISO(data.dueDate)) : null;
    this.#priority = this.#checkPriority(data.priority) || 1.0;
    this.#notes = data.notes || '';
    this.#isComplete = data.isComplete || false;
  }

  #stripTime(date) {
    return startOfDay(date);
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
    return format(this.#dueDate, 'yyyy-MM-dd');
  }
  setDueDate(v) {
    this.#dueDate = v ? this.#stripTime(parseISO(v)) : null;
  }
  daysUntilDue() {
    const today = startOfDay(new Date());
    const days = differenceInDays(this.#dueDate, today);
    return days;
  }
  isOverdue() {
    return this.daysUntilDue() < 0;
  }

  getPriority() { return this.#priority };
  setPriority(v) { this.#priority = this.#checkPriority(v) };

  getNotes() { return this.#notes };
  setNotes(v) { this.#notes = v };

  getIsComplete() { return this.#isComplete }
  toggleIsComplete() { this.#isComplete = !this.#isComplete }
}
