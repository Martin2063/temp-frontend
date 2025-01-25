import m from "mithril";
import { LoginView } from "./login";
import {
  applyColorThemeFromPrimaryColor,
  getActualMaterialColors,
} from "./utils";
import { Dashboard } from "./dashboard";
import { SensorView } from "./sensors";
import { FanView } from "./fans";
import { MessageView } from "./message";
// js/app.js

let dark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
applyColorThemeFromPrimaryColor(getActualMaterialColors("primary"), dark);
const app = document.getElementById("app")!;
export const nav = document.getElementById("leftbar")!;
const Placeholder = {
  view: function () {
    return m("div", { style: { textAlign: "center" } }, "Hallo Welt");
  },
};
m.route(app, "/ClimPi", {
  // TUWU change back to Login start when finished
  "/ClimPi": LoginView,
  "/ClimPi/Dashboard": Dashboard,
  "/ClimPi/Sensoren": SensorView,
  "/ClimPi/NurFans": FanView,
  "/ClimPi/Meldungen": MessageView,
  "/ClimPi/Historie": Placeholder,
  "/ClimPi/Einstellungen": Placeholder,
  // "/ClimPi": Dashboard,
});
