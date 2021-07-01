import templateToDom from "../utils/templateToDom";

import "../styles/newProject.css";

export const NewProjectComponent = ({
  id,
  className = "new-project",
  saveProject,
}) => {
  const template = `
    <div id="${id}" class="${className}">
      <h2>New project</h2>
      <form aria-label="Save project">
        <div class="form-control">
          <label for="title">Title</label>
          <input id="title" type="text" title="Title" placeholder="Enter the title"/>
        </div>
        <button type="submit" class="button">
          <i class="fas fa-plus"></i> Submit
        </button>
      </form>
    </div>
  `;

  const component = templateToDom(template);
  const titleEl = component.querySelector("#title");
  const formEl = component.querySelector("form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleEl.value;
    saveProject({ title });
  });

  return component;
};
