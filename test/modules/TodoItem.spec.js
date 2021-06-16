test("TodoItem should be created with correct properties", () => {
  const todoItem = new TodoItem(
    "Default task",
    "A default task",
    "2021-06-30",
    1
  );
  expect(todoItem).toBeUndefined();
});
