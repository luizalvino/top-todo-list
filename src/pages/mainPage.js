import { Project } from "../modules/Project";
import { TodoItem } from "../modules/TodoItem";
import { ProjectComponent } from "../components/ProjectComponent";

import templateToDom from "../utils/templateToDom";
import { NewProjectComponent } from "../components/NewProjectComponent";
import { MenuComponent } from "../components/MenuComponent";
import { NewTodoItemComponent } from "../components/NewTodoItemComponent";
import { EditTodoItemComponent } from "../components/EditTodoItemComponent";

let projects = [];

function findProject(title) {
  return projects.find((p) => p.title === title);
}

function addProject(project) {
  projects = [...projects, project];
  saveProjectsToStorage();
}

function updateProject(project) {
  projects = projects.map((p) =>
    p.title === project.title ? Object.assign(new Project(), { ...project }) : p
  );
  console.log(projects);
  saveProjectsToStorage();
}

function saveProjectsToStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  const projectsFromStorage =
    JSON.parse(localStorage.getItem("projects")) || [];
  const projectsCasted = projectsFromStorage.map((project) => {
    project.todos = project.todos.map((todoItem) => {
      todoItem.dueDate = new Date(todoItem.dueDate);
      return Object.assign(new TodoItem(), todoItem);
    });
    return Object.assign(new Project(), project);
  });
  projects = [...Array.from(projectsCasted)];
  console.log(projects);
}

function createDefaultProject() {
  return new Project("Default project", [
    new TodoItem(
      "Task 1 title",
      "Task 1 description",
      new Date(2021, 5, 1),
      1,
      false
    ),
    new TodoItem(
      "Task 2",
      "Task 2 description",
      new Date(2021, 6, 31),
      2,
      true
    ),
  ]);
}

const template = `
  <div class="content">
    <header>
      <div class="container">
        <h1>
          <i class="fas fa-tasks"></i>
          TODO LIST
        </h1>
      </div>
    </header>
    <main>
      <div class="menu-content"></div>
      <div class="container">
        <div class="main-content">
        </div>
      </div>
    </main>
    <footer>
      <div class="container">Copyright © 2021 Luiz Alvino</div>
    </footer>
  </div>
`;

const mainPage = () => {
  const component = templateToDom(template);
  const menuEl = component.querySelector(".menu-content");
  const mainContentEl = component.querySelector(".main-content");

  loadProjects();

  if (projects.length == 0) {
    projects = [createDefaultProject()];
    saveProjectsToStorage();
  }

  const goToProjectPage = (project) => {
    mainContentEl.innerHTML = "";
    mainContentEl.appendChild(createProjectComponent(project));
  };

  const createProjectComponent = (project) =>
    ProjectComponent({
      id: "project-1",
      project,
      addTodo: () => {
        mainContentEl.innerHTML = "";
        mainContentEl.appendChild(createNewTodoItemComponent(project));
      },
      editTodo: (title) => {
        const todoItem = project.findTodo(title);
        mainContentEl.innerHTML = "";
        mainContentEl.appendChild(
          createEditTodoItemComponent(project, todoItem)
        );
      },
      removeTodo: (title) => {
        project.removeTodo(title);
        updateProject(project);
      },
      toggleCompleted: (title) => {
        const todoItem = project.findTodo(title);
        todoItem.toggleCompleted();
        updateProject(project);
      },
    });

  const createMenuComponent = (activeIndex = 0) =>
    MenuComponent({
      id: "menu",
      projects,
      activeIndex,
      addProject: () => {
        mainContentEl.innerHTML = "";
        mainContentEl.appendChild(createNewProjectComponent());
      },
      goToProjectPage: (title) => {
        goToProjectPage(findProject(title));
      },
    });

  const createNewProjectComponent = () =>
    NewProjectComponent({
      id: "new-project",
      saveProject: ({ title }) => {
        const project = new Project(title, []);
        addProject(project);

        menuEl.innerHTML = "";
        menuEl.appendChild(createMenuComponent(projects.length - 1));
        goToProjectPage(project);
      },
    });

  const createNewTodoItemComponent = (project) =>
    NewTodoItemComponent({
      id: "new-todo-item",
      saveTodo: ({ title, description, dueDate, priority }) => {
        const todoItem = new TodoItem(
          title,
          description,
          dueDate,
          priority,
          false
        );

        project.todos.push(todoItem);
        updateProject(project);

        goToProjectPage(project);
      },
      cancel: () => {
        goToProjectPage(project);
      },
    });

  const createEditTodoItemComponent = (project, todoItem) =>
    EditTodoItemComponent({
      id: "edit-todo-item",
      todoItem,
      updateTodo: ({ oldTitle, title, description, dueDate, priority }) => {
        const updatedTodoItem = new TodoItem(
          title,
          description,
          dueDate,
          priority
        );
        project.todos = project.todos.map((todo) =>
          todo.title === oldTitle ? updatedTodoItem : todo
        );
        updateProject(project);
        goToProjectPage(project);
      },
      cancel: () => {
        goToProjectPage(project);
      },
    });

  menuEl.appendChild(createMenuComponent());
  goToProjectPage(projects[0]);
  return component;
};

export default mainPage;
