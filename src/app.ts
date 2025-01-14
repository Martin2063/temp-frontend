import m from "mithril";
import { LoginView } from "./login";
import {
  applyColorThemeFromPrimaryColor,
  getActualMaterialColors,
} from "./utils";
// js/app.js

let dark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
applyColorThemeFromPrimaryColor(getActualMaterialColors("primary"), dark);
const app = document.getElementById("app")!;

let About = {
  view: function () {
    return m("div", [
      m("h1", "Über Uns"),
      m("p", "Dies ist eine Beispielseite."),
    ]);
  },
};

m.route(app, "/ClimPi", {
  "/ClimPi": LoginView,
  "/ClimPi/Dashboard": About,
});
