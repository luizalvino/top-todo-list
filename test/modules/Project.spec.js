const { Project } = require("../../src/modules/Project");
const { TodoItem } = require("../../src/modules/TodoItem");

const createTodos = () => [
  new TodoItem("Task 1", "Task 1 description", new Date(2021, 5, 30), 1, false),
  new TodoItem("Task 2", "Task 2 description", new Date(2021, 6, 31), 2, true),
];

test("should be created with correct properties", () => {
  const todos = createTodos();
  const project = new Project("Default project", todos);

  expect(project).toHaveProperty("title", "Default project");
  expect(project).toHaveProperty("todos", todos);
});

test("should add a todo", () => {
  const project = new Project("Default project", []);
  const todos = [
    new TodoItem(
      "Task 1",
      "Task 1 description",
      new Date(2021, 5, 30),
      1,
      false
    ),
  ];

  project.addTodo(todos[0]);

  expect(project).toHaveProperty("todos", todos);
});

test("should update a todo by title", () => {
  const todos = createTodos();
  const project = new Project("Default project", todos);
  const todo = Object.assign({}, todos[0]);
  const oldTitle = todo.title;
  todo.title = "Updated task 1 title";
  todo.description = "Updated task 1 description";
  todo.dueDate = new Date(2021, 5, 29);
  todo.priority = 10;
  todo.completed = true;

  project.updateTodo(oldTitle, todo);

  expect(project.todos[0]).toHaveProperty("title", "Updated task 1 title");
  expect(project.todos[0]).toHaveProperty(
    "description",
    "Updated task 1 description"
  );
  expect(project.todos[0]).toHaveProperty("dueDate", new Date(2021, 5, 29));
  expect(project.todos[0]).toHaveProperty("priority", 10);
  expect(project.todos[0]).toHaveProperty("completed", true);
});

test("should remove by title", () => {
  const todos = createTodos();
  const todosWithRemovedElement = [
    new TodoItem(
      "Task 1",
      "Task 1 description",
      new Date(2021, 5, 30),
      1,
      false
    ),
  ];

  const project = new Project("Default project", todos);
  project.removeTodo("Task 2");

  expect(project).toHaveProperty("todos", todosWithRemovedElement);
});

test("should find a todo by title", () => {
  const todos = createTodos();
  const project = new Project("Default project", todos);

  const todoItem = project.findTodo("Task 2");

  expect(todoItem).toStrictEqual(
    new TodoItem("Task 2", "Task 2 description", new Date(2021, 6, 31), 2, true)
  );
});
