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
import { MenuComponent } from "../../src/components/MenuComponent";
import { Project } from "../../src/modules/Project";

let component;
let projects;
let goToProjectPage;

const setup = () => {
  projects = [new Project("Default project", [])];

  goToProjectPage = jest.fn();

  component = MenuComponent({
    id: "menu",
    projects,
    addProject: () => {},
    goToProjectPage: () => goToProjectPage("Default project"),
  });
  document.body.appendChild(component);
};

describe("MenuComponent", () => {
  test("renders correctly", () => {
    setup();
    expect(component).not.toBeEmptyDOMElement();
    expect(component).toHaveClass("menu");
  });
  test("should redirect to project page when link is clicked", () => {
    setup();
    const firstProjectLink = getByRole(component, "button", {
      name: "Default project",
    });
    expect(firstProjectLink).toBeInTheDocument();

    fireEvent.click(firstProjectLink);

    expect(goToProjectPage).toHaveBeenCalledWith("Default project");
    expect(goToProjectPage).not.toHaveBeenCalledWith("Wrong project title");
  });
});
