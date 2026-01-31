import { parseISO, startOfDay, differenceInDays, format } from 'date-fns';

export class Todo {
  #id
  #title
  #description
  #dueDate
  #notes
  #priority
  #isComplete
  #projectId

  constructor(data) {
    this.#id = crypto.randomUUID();
    this.#title = data.title;
    this.#description = data.description || '';
    this.#dueDate = data.dueDate ? this.#stripTime(parseISO(data.dueDate)) : null;
    this.#priority = this.#validatePriority(data.priority);
    this.#notes = data.notes || '';
    this.#isComplete = data.isComplete || false;
    this.#projectId = data.projectId;
  }

  #stripTime(date) {
    return startOfDay(date);
  }

  #validatePriority(priority) {
    if (typeof priority !== 'number') {
      throw new Error('Priority must be a number');
    }
    if (priority > 10 || priority < 1) {
      throw new Error('Priority must be between 1 and 10');
    }
    return priority;
  }

  get id() { return this.#id }

  get title() { return this.#title }
  set title(v) { this.#title = v }

  get description() { return this.#description }
  set description(v) { this.#description = v }

  get dueDate() {
    if (!this.#dueDate) return null;
    return format(this.#dueDate, 'yyyy-MM-dd');
  }
  set dueDate(v) {
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

  get priority() { return this.#priority }
  set priority(v) { this.#priority = this.#validatePriority(v) }

  get notes() { return this.#notes }
  set notes(v) { this.#notes = v }

  get isComplete() { return this.#isComplete }
  toggleComplete() { this.#isComplete = !this.#isComplete }

  get projectId() { return this.#projectId }
  set projectId(v) { this.#projectId = v }
}
