// Imports styling
import "./styles/main.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/footer.css";
import "./styles/new.css";
import "./styles/listModal.css";

// Imports and updates icons
import feather from "feather-icons";
feather.replace();

// Imports functions
import { create } from "./scripts/new";
import { userGreeting } from "./scripts/greeting";

// Updates user greeting based off time
const greeting = document.getElementById("greeting");
greeting.textContent = userGreeting;
