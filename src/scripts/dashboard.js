// Imports styling
import "../styles/main.css";
import "../styles/header.css";
import "../styles/content.css";
import "../styles/footer.css";
import "../styles/new.css";

// Imports and updates icons
import feather from "feather-icons";
feather.replace();

// Imports functions
import { create } from "./new";
import { userGreeting } from "./greeting";

// Updates user greeting based off time
const greeting = document.getElementById("greeting");
greeting.textContent = userGreeting + ", " + localStorage.getItem("username");

const avatar = document.getElementById("avatar");
avatar.src = localStorage.getItem("avatar");
