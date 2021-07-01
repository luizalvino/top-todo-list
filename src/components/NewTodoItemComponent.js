import templateToDom from "../utils/templateToDom";
import { parseISO } from "date-fns";

import "../styles/newTodoItem.css";

export const NewTodoItemComponent = ({
  id,
  className = "new-todo-item",
  saveTodo,
  cancel,
}) => {
  const template = `
    <div id="${id}" class="${className}">
      <h2>New todo</h2>
      <form aria-label="Save todo">
        <div class="form-control">
          <label for="title">Title</label>
          <input id="title" type="text" name="title" title="Title" placeholder="Enter the title"/>
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <input id="description" type="text" name="description" title="Description" placeholder="Enter the Description"/>
        </div>
        <div class="form-control">
          <label for="due-date">Due date</label>
          <input id="due-date" type="date" title="Due date" name="due-date" placeholder="Enter the due date"/>
        </div>
        <div class="form-control">
          <p>Priority</p>
          <div class="row">
            <input id="priority-low" aria-label="priority-low" type="radio" name="priority" value="1" checked>
            <label for="priority-low">Low</label>
            <input id="priority-medium" aria-label="priority-medium" type="radio" name="priority" value="2">
            <label for="priority-medium">Medium</label>
            <input id="priority-high" aria-label="priority-high" type="radio" name="priority" value="3">
            <label for="priority-high">High</label>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="button">
            <i class="fas fa-check"></i> Submit
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
    const titleEl = component.querySelector("#title");
    const descriptionEl = component.querySelector("#description");
    const dueDateEl = component.querySelector("#due-date");
    const priorityEl = component.querySelector("input[name=priority]:checked");
    const title = titleEl.value;
    const description = descriptionEl.value;
    const dueDate = parseISO(dueDateEl.value);
    const priority = +priorityEl.value;
    saveTodo({ title, description, dueDate, priority });
  });

  cancelEl.addEventListener("click", (e) => {
    cancel();
  });

  return component;
};
