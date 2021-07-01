import { format, parseISO } from "date-fns";
import "../styles/editTodoItem.css";
import templateToDom from "../utils/templateToDom";

export const EditTodoItemComponent = ({
  id,
  todoItem,
  className = "edit-todo-item",
  updateTodo,
  cancel,
}) => {
  const template = `
    <div id="${id}" class="${className}">
      <h2>Edit todo</h2>
      <form aria-label="Update todo">
        <div class="form-control">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            title="Title"
            placeholder="Enter the title"
            value="${todoItem.title}"
          />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            title="Description"
            placeholder="Enter the Description"
            value="${todoItem.description}"
          />
        </div>
        <div class="form-control">
          <label for="due-date">Due date</label>
          <input
            id="due-date"
            type="date"
            title="Due date"
            name="due-date"
            placeholder="Enter the due date"
            value="${format(todoItem.dueDate, "yyyy-MM-dd")}"
          />
        </div>
        <div class="form-control">
          <p>Priority</p>
          <div class="row">
            <input
              id="priority-low"
              aria-label="priority-low"
              type="radio"
              name="priority"
              value="1"
              ${todoItem.priority === 1 ? "checked" : ""}
            />
            <label for="priority-low">Low</label>
            <input
              id="priority-medium"
              aria-label="priority-medium"
              type="radio"
              name="priority"
              value="2"
              ${todoItem.priority === 2 ? "checked" : ""}
            />
            <label for="priority-medium">Medium</label>
            <input
              id="priority-high"
              aria-label="priority-high"
              type="radio"
              name="priority"
              value="3"
              ${todoItem.priority === 3 ? "checked" : ""}
            />
            <label for="priority-high">High</label>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="button">
            <i class="fas fa-check"></i> Update
          </button>
          <button aria-label="Cancel" type="button" class="button">
            <i class="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  `;

  const component = templateToDom(template);

  const formEl = component.querySelector("form");
  const cancelEl = component.querySelector("button[aria-label=Cancel]");

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const oldTitle = todoItem.title;
    const titleEl = component.querySelector("#title");
    const descriptionEl = component.querySelector("#description");
    const dueDateEl = component.querySelector("#due-date");
    const priorityEl = component.querySelector("input[name=priority]:checked");
    const title = titleEl.value;
    const description = descriptionEl.value;
    const dueDate = parseISO(dueDateEl.value);
    const priority = +priorityEl.value;
    updateTodo({ oldTitle, title, description, dueDate, priority });
  });

  cancelEl.addEventListener("click", (e) => {
    cancel();
  });

  return component;
};
