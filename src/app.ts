import m from "mithril";
import { LoginView } from "./login";
import {
  applyColorThemeFromPrimaryColor,
  getActualMaterialColors,
} from "./utils";
import { Dashboard } from "./dashboard";
import { Navigation } from "./nav";
// js/app.js

let dark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
applyColorThemeFromPrimaryColor(getActualMaterialColors("primary"), dark);
const app = document.getElementById("app")!;
export const nav = document.getElementById("nav")!;

m.route(app, "/ClimPi", {
  // TUWU change back to Login start when finished
  "/ClimPi": LoginView,
  "/ClimPi/Dashboard": Dashboard,
  // "/ClimPi": Dashboard,
});
