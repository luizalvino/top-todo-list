import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faEdit,
  faPlus,
  faTasks,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import MainPage from "./pages/mainPage";
import "./styles/style.css";

library.add(
  faTasks,
  faPlus,
  faTrash,
  faSquare,
  faCheckSquare,
  faCheck,
  faTimes,
  faEdit
);
dom.watch();

document.querySelector("body").appendChild(MainPage());
