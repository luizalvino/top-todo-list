import "./styles/style.css";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faTasks } from "@fortawesome/free-solid-svg-icons/faTasks";
// import "@fortawesome/fontawesome-free/css/";

import MainPage from "./components/mainPage";

library.add(faTasks);
dom.watch();

document.querySelector("body").innerHTML = MainPage();
