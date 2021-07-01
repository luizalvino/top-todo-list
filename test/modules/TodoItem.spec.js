const { TodoItem } = require("../../src/modules/TodoItem");

let todoItem;

const setup = () => {
  todoItem = new TodoItem(
    "Default task",
    "A default task",
    new Date(2021, 5, 30),
    1,
    false
  );
};

beforeEach(() => {
  setup();
});

test("should be created with correct properties", () => {
  expect(todoItem).toHaveProperty("title", "Default task");
  expect(todoItem).toHaveProperty("description", "A default task");
  expect(todoItem).toHaveProperty("dueDate", new Date(2021, 5, 30));
  expect(todoItem).toHaveProperty("priority", 1);
  expect(todoItem).toHaveProperty("completed", false);
});

test("should toggle completed", () => {
  todoItem.toggleCompleted();
  expect(todoItem).toHaveProperty("completed", true);

  todoItem.toggleCompleted();
  expect(todoItem).toHaveProperty("completed", false);
});
