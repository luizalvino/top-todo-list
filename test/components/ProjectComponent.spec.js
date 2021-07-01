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

import { ProjectComponent } from "../../src/components/ProjectComponent";
import { Project } from "../../src/modules/Project";
import { TodoItem } from "../../src/modules/TodoItem";

let component;
let addTodo = jest.fn();
let editTodo = jest.fn();
let removeTodo = jest.fn();
let toggleCompleted = jest.fn();

const setup = () => {
  const project = new Project("Default project", []);
  component = ProjectComponent({
    id: "project-1",
    project,
    addTodo,
    editTodo,
    removeTodo,
    toggleCompleted,
  });
  document.body.appendChild(component);
};

const setupWithTodos = () => {
  const project = new Project("Default project", [
    new TodoItem(
      "Task 1 title",
      "Task 1 description",
      new Date(2021, 5, 1),
      1,
      false
    ),
    new TodoItem(
      "Task 2 title",
      "Task 2 description",
      new Date(2021, 5, 2),
      1,
      true
    ),
  ]);
  component = ProjectComponent({
    id: "project-1",
    project,
    addTodo,
    editTodo,
    removeTodo,
    toggleCompleted,
  });
  document.body.appendChild(component);
};

describe("ProjectComponent", () => {
  test("renders correctly", () => {
    setup();
    expect(component).not.toBeEmptyDOMElement();
    expect(component).toHaveClass("project");
  });

  test("renders project properties but not todos", () => {
    setup();
    expect(getByText(component, "Default project")).toBeInTheDocument();
    expect(component.querySelector("ul")).not.toBeInTheDocument();
  });

  test("renders project properties with todos", () => {
    setupWithTodos();

    expect(getByText(component, "Default project")).toBeInTheDocument();
    expect(component.querySelector("ul")).toBeInTheDocument();
    expect(getByText(component, "Task 1 title")).toBeInTheDocument();
    expect(queryByText(component, "wrong text")).not.toBeInTheDocument();
  });

  test("navigate to add todo page", () => {
    setupWithTodos();

    const buttonEl = getByRole(component, "button", { name: "add" });
    fireEvent.click(buttonEl);

    expect(addTodo).toHaveBeenCalled();
  });

  test("navigate to edit todo page", () => {
    setupWithTodos();

    const buttonEl = getByRole(component, "button", { name: "edit-1" });
    fireEvent.click(buttonEl);

    expect(editTodo).toHaveBeenCalled();
  });

  test("remove todo from list", () => {
    setupWithTodos();

    expect(getByRole(component, "list")).not.toBeEmptyDOMElement();
    expect(getAllByRole(component, "listitem").length).toBe(2);

    const firstTaskEl = getByRole(component, "button", { name: "remove-0" });
    fireEvent.click(firstTaskEl);

    expect(removeTodo).toHaveBeenCalled();

    expect(getAllByRole(component, "listitem").length).toBe(1);

    const secondTaskEl = getByRole(component, "button", { name: "remove-1" });
    fireEvent.click(secondTaskEl);

    expect(getByRole(component, "list")).toBeEmptyDOMElement();
  });

  test("toggle todo completed", () => {
    setupWithTodos();

    const firstCompleteEl = getByRole(component, "checkbox", {
      name: "completed-0",
    });
    expect(firstCompleteEl).not.toBeChecked();

    fireEvent.click(firstCompleteEl);
    expect(firstCompleteEl).toBeChecked();

    const secondCompleteEl = getByRole(component, "checkbox", {
      name: "completed-1",
    });
    expect(secondCompleteEl).toBeChecked();

    fireEvent.click(secondCompleteEl);
    expect(secondCompleteEl).not.toBeChecked();
  });
});
