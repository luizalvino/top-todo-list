import { format } from "date-fns";
import templateToDom from "../utils/templateToDom";

import "../styles/project.css";

export const ProjectComponent = ({
  id,
  project,
  addTodo,
  editTodo,
  removeTodo,
  toggleCompleted,
  className = "project",
}) => {
  const template = `
    <div id="${id}" class="${className}">
      <h3>${project.title}</h3>
      ${
        project.todos.length
          ? `<ul>${project.todos
              .map(
                (todo, idx) =>
                  `<li data-title="${todo.title}" class="${
                    todo.completed ? "completed" : ""
                  } ${"priority-" + todo.priority}"
                  >
                    <span role="checkbox"
                      aria-checked="${todo.completed}"
                      aria-label="completed-${idx}"
                      title="Toggle completed"
                    >
                      <i class="far ${
                        todo.completed ? "fa-check-square" : "fa-square"
                      }"></i>
                    </span>
                    <span class="title">${todo.title}</span>
                    <span aria-label="due-date-${idx}" class="due-date">
                      ${format(todo.dueDate, "yyyy-MM-dd")}
                    </span>
                    <button aria-label="edit-${idx}" title="Edit"><i class="fa fa-edit"></i></button>
                    <button aria-label="remove-${idx}" title="Remove"><i class="fa fa-trash"></i></button>
                  </li>`
              )
              .join("")}</ul>`
          : ""
      }
      <button aria-label="add" class="button">
      <i class="fas fa-plus"></i> Add todo
      </button>
    </div>
  `;

  const component = templateToDom(template);
  if (addTodo) {
    component
      .querySelector("button[aria-label=add]")
      .addEventListener("click", () => {
        addTodo();
      });
  }

  if (editTodo) {
    component.querySelectorAll("[aria-label*=edit]").forEach((editButtonEl) => {
      editButtonEl.addEventListener("click", () => {
        const liEl = editButtonEl.parentElement;
        editTodo(liEl.dataset.title);
        liEl.remove();
      });
    });
  }

  if (removeTodo) {
    component
      .querySelectorAll("[aria-label*=remove]")
      .forEach((removeButtonEl) => {
        removeButtonEl.addEventListener("click", () => {
          const liEl = removeButtonEl.parentElement;
          removeTodo(liEl.dataset.title);
          liEl.remove();
        });
      });
  }

  if (toggleCompleted) {
    component.querySelectorAll("[aria-label*=completed]").forEach((checkEl) => {
      checkEl.addEventListener("click", () => {
        const checked = !("true" === checkEl.getAttribute("aria-checked"));
        checkEl.setAttribute("aria-checked", checked);
        checkEl.innerHTML = `<i class="far ${
          checked ? "fa-check-square" : "fa-square"
        }"></i>`;
        const liEl = checkEl.parentElement;
        liEl.classList.toggle("completed");
        toggleCompleted(checkEl.parentElement.dataset.title);
      });
    });
  }

  return component;
};
