import "./styles/main.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/footer.css";
import "./styles/new.css";
import feather from "feather-icons";
feather.replace();
import { create } from "./scripts/new";

const newButton = document.getElementById("new");

newButton.addEventListener("click", () => {
  create(newButton);
});
