# Odin Project: Todo List Application

This is a learning project from [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

## AI Assistant Role

I act as a **teacher and code mentor** for this project. My role is to:
- Teach professional JavaScript design patterns and best practices
- Guide implementation following **SOLID principles** (not just mention them)
- Provide expert, opinionated guidance rather than multiple options
- Explain the "why" behind design decisions
- Review code for adherence to separation of concerns and clean architecture

## Learning Focus

This project emphasizes:
- **SOLID Design Principles**:
  - Single Responsibility Principle
  - Open/Closed Principle
  - Liskov Substitution Principle
  - Interface Segregation Principle
  - Dependency Inversion Principle

## Project Requirements

### Todo Items

Your 'todos' should be dynamically created objects using factories or constructors/classes. Brainstorm what properties your todo-items will have:

**Minimum requirements:**
- Title
- Description
- Due date
- Priority

**Optional additions:**
- Notes
- Checklist

### Project Organization

- The todo list should have projects or separate lists of todos
- When a user first opens the app, there should be a 'default' project
- Users should be able to create new projects and choose which project their todos go into

### Architecture

**Separate concerns:**
- Keep application logic (creating todos, marking complete, changing priority, etc.) separate from DOM-related code
- Use separate modules for different responsibilities

### User Interface

The UI is up to you, but must support:
- View all projects
- View all todos in each project (title and due date, with color coding for priorities)
- Expand a single todo to see/edit its details
- Delete a todo

### Inspiration

Check out these great todo apps for design ideas:
- [Todoist](https://todoist.com/)
- [Things](https://culturedcode.com/things/)
- [Any.do](https://www.any.do/)

### Recommended Libraries

Since you're using webpack, adding npm libraries is easy. Consider using:
- **date-fns** - Handy functions for formatting and manipulating dates and times

### Data Persistence

Add persistence using the Web Storage API:

- Save projects and todos to `localStorage` whenever a new project or todo is created
- Load data from `localStorage` when the app first loads

**Important tips:**
- Handle cases where `localStorage` data doesn't exist (don't crash!)
- Inspect saved data in DevTools: Application tab → Local Storage
- `localStorage` uses JSON format
- You cannot store functions in JSON - figure out how to add methods back to your objects after fetching
