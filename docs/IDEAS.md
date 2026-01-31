# Todo List Project Design Ideas

We should first build the application logic before getting to the UI.

## Application Logic
Initially I want each todo item to have the simple:

- id
- title
- description
- dueDate
- priority
- notes
- complete
- project-id (see below)

Now the next point is that they should be able to be created as a default, or be added to separate lists/projects which can eventually be viewed separately in the UI. I suppose this should be added to the project attribute above, which can be empty by default but can be altered as needed. This means we also *need a separate storage for the list of projects*. Project items can also be an object with:

- id
- name
- color

For the id's we can use `crypto.randomUUID()` and put both in arrays for now, I think that is fine.

Note that we are told to use localStorage to store all todo data so this needs to be figured out as we go. I think for simplicity let us start with everything stored in memory only, and later can add localStorage after the core logic has been implemented.

The initial project structure can be:

- todo.js - Todo class
- project.js - Project class
- storage.js - Storage layer (in memory first, later localStorage)
- app.js - main orchestrator (imports classes + storage, coordinates logic)

with added `index.js` and `ui.js` for entry point and UI manipulation later.

Again reminder to use this project with *composition over inheritance* for practice with this and respect SOLID design principles as much as possible.
