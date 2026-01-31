import { Todo } from './todo.js';

const todo = new Todo({
  title: 'Test Task',
  description: 'Testing date operations',
  dueDate: '2025-02-15',
  priority: 5,
  notes: 'Check if date formatting works'
});

console.log('Todo created:', todo.getTitle());
console.log('Due date:', todo.getDueDate());
console.log('Days until due:', todo.daysUntilDue());
console.log('Is overdue:', todo.isOverdue());
console.log('Priority:', todo.getPriority());

const futureDate = new Todo({
  title: 'Future Task',
  dueDate: '2026-01-01'
});

console.log('\nFuture task:');
console.log('Due date:', futureDate.getDueDate());
console.log('Days until due:', futureDate.daysUntilDue());
