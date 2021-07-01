export class Project {
  constructor(title, todos) {
    this.title = title;
    this.todos = todos;
  }

  addTodo(todoItem) {
    this.todos = [todoItem, ...this.todos];
  }

  updateTodo(title, updatedTodo) {
    const idx = this.todos.findIndex((t) => t.title === title);
    this.todos[idx] = Object.assign({}, updatedTodo);
  }

  removeTodo(title) {
    this.todos = [...this.todos.filter((t) => t.title !== title)];
  }

  findTodo(title) {
    return this.todos.find((todo) => todo.title === title);
  }
}
