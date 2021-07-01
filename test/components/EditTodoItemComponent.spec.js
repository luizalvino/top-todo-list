/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByText,
  queryByText,
} from "@testing-library/dom";
import { format } from "date-fns";

import { TodoItem } from "../../src/modules/TodoItem";
import { EditTodoItemComponent } from "../../src/components/EditTodoItemComponent";
import { Project } from "../../src/modules/Project";

let component;
let projects;
let updateTodo;
let cancel;

const setup = () => {
  projects = [new Project("Project 1", [])];
  updateTodo = jest.fn();
  cancel = jest.fn();
  const todoItem = new TodoItem(
    "Task 1 default",
    "Task 1 description default",
    new Date(2021, 5, 1),
    1,
    false
  );
  component = EditTodoItemComponent({
    id: "new-todo-item",
    todoItem,
    updateTodo,
    cancel,
  });
  document.body.appendChild(component);
};

describe("EditTodoItemComponent", () => {
  test("renders form", () => {
    setup();

    expect(component).not.toBeEmptyDOMElement();

    expect(getByRole(component, "textbox", { name: "Title" })).toHaveValue(
      "Task 1 default"
    );
    expect(
      getByRole(component, "textbox", { name: "Description" })
    ).toHaveValue("Task 1 description default");

    const dueDateEl = component.querySelector("input[name='due-date']");
    expect(dueDateEl).toHaveValue(format(new Date(2021, 5, 1), "yyyy-MM-dd"));

    expect(
      getByRole(component, "radio", { name: "priority-low", checked: true })
    ).toBeInTheDocument();
    expect(
      getByRole(component, "radio", { name: "priority-medium", checked: false })
    ).toBeInTheDocument();
    expect(
      getByRole(component, "radio", { name: "priority-high", checked: false })
    ).toBeInTheDocument();

    expect(
      getByRole(component, "button", { name: "Update" })
    ).toBeInTheDocument();

    expect(
      getByRole(component, "button", { name: "Cancel" })
    ).toBeInTheDocument();
  });

  test("submit update todo item form", () => {
    setup();

    expect(projects[0].todos).toHaveLength(0);

    const titleEl = getByRole(component, "textbox", { name: "Title" });
    const descriptionEl = getByRole(component, "textbox", {
      name: "Description",
    });
    const dueDateEl = component.querySelector("input[name='due-date']");
    const priorityEl = getByRole(component, "radio", {
      name: "priority-medium",
    });

    const formEl = getByRole(component, "form", { name: "Update todo" });

    fireEvent.change(titleEl, { target: { value: "Task 1" } });
    fireEvent.change(descriptionEl, {
      target: { value: "Task 1 description" },
    });
    fireEvent.change(dueDateEl, {
      target: { value: format(new Date(2021, 5, 30), "yyyy-MM-dd") },
    });
    fireEvent.click(priorityEl);

    fireEvent.submit(formEl);

    expect(updateTodo).toHaveBeenCalledWith({
      oldTitle: "Task 1 default",
      title: "Task 1",
      description: "Task 1 description",
      dueDate: new Date(2021, 5, 30),
      priority: 2,
    });
  });

  test("return to project page", () => {
    setup();

    const returnButtonEl = getByRole(component, "button", { name: "Cancel" });

    fireEvent.click(returnButtonEl);

    expect(cancel).toHaveBeenCalled();
  });
});
