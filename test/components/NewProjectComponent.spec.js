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

import { NewProjectComponent } from "../../src/components/NewProjectComponent";
import { Project } from "../../src/modules/Project";

let component;
let projects = [];

const setup = () => {
  component = NewProjectComponent({
    id: "new-project",
    saveProject: ({ title }) => {
      projects = [new Project(title, []), ...projects];
    },
  });
  document.body.appendChild(component);
};

describe("NewProjectComponent", () => {
  test("renders form", () => {
    setup();

    expect(component).not.toBeEmptyDOMElement();

    expect(
      getByRole(component, "textbox", { name: "Title" })
    ).toBeInTheDocument();

    expect(
      getByRole(component, "button", { name: "Submit" })
    ).toBeInTheDocument();
  });

  test("submit new project", () => {
    setup();

    expect(projects).toHaveLength(0);

    const titleEl = getByRole(component, "textbox", { name: "Title" });
    const formEl = getByRole(component, "form", { name: "Save project" });

    fireEvent.change(titleEl, { target: { value: "New task" } });
    fireEvent.submit(formEl);

    expect(projects).toHaveLength(1);
  });
});
