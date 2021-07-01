import templateToDom from "../utils/templateToDom";

import "../styles/menu.css";

export const MenuComponent = ({
  id = "menu",
  className = "menu",
  activeIndex = 0,
  projects,
  addProject,
  goToProjectPage,
}) => {
  const template = `
    <div id="${id}" class="${className}">
      <ul aria-label="projects"></ul>
      <button id="add-project" aria-label="add-project" class="button">
        <i class="fas fa-plus"></i> Add Project
      </button>
    </div>
  `;

  const component = templateToDom(template);

  const projectsEl = component.querySelector("ul[aria-label=projects]");
  projects.forEach((project, index) => {
    const liEl = document.createElement("li");
    liEl.setAttribute("arial-label", project.title);

    const buttonEl = document.createElement("button");
    buttonEl.innerHTML = project.title;
    buttonEl.addEventListener("click", () => {
      projectsEl
        .querySelectorAll("li")
        .forEach((projectLiEl) => projectLiEl.classList.remove("active"));
      liEl.classList.add("active");

      goToProjectPage(project.title);
    });

    if (index === activeIndex) {
      liEl.classList.add("active");
    }

    liEl.appendChild(buttonEl);
    projectsEl.appendChild(liEl);
  });

  const addProjectEl = component.querySelector("#add-project");
  addProjectEl.addEventListener("click", addProject);

  return component;
};
