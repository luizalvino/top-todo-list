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

import { NewTodoItemComponent } from "../../src/components/NewTodoItemComponent";
import { Project } from "../../src/modules/Project";

let component;
let projects;
let saveTodo;
let cancel;

const setup = () => {
  projects = [new Project("Project 1", [])];
  saveTodo = jest.fn();
  cancel = jest.fn();
  component = NewTodoItemComponent({
    id: "new-todo-item",
    saveTodo,
    cancel,
  });
  document.body.appendChild(component);
};

describe("NewTodoItemComponent", () => {
  test("renders form", () => {
    setup();

    expect(component).not.toBeEmptyDOMElement();

    expect(
      getByRole(component, "textbox", { name: "Title" })
    ).toBeInTheDocument();
    expect(
      getByRole(component, "textbox", { name: "Description" })
    ).toBeInTheDocument();
    expect(
      component.querySelector("input[name='due-date']")
    ).toBeInTheDocument();

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
      getByRole(component, "button", { name: "Submit" })
    ).toBeInTheDocument();

    expect(
      getByRole(component, "button", { name: "Cancel" })
    ).toBeInTheDocument();
  });

  test("submit new todo item", () => {
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

    const formEl = getByRole(component, "form", { name: "Save todo" });

    fireEvent.change(titleEl, { target: { value: "Task 1" } });
    fireEvent.change(descriptionEl, {
      target: { value: "Task 1 description" },
    });
    fireEvent.change(dueDateEl, {
      target: { value: format(new Date(2021, 5, 30), "yyyy-MM-dd") },
    });
    fireEvent.click(priorityEl);

    fireEvent.submit(formEl);

    expect(saveTodo).toHaveBeenCalledWith({
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
