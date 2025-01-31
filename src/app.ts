import m from "mithril";
import { LoginView } from "./login";
import { applyColorThemeFromPrimaryColor } from "./utils";
import { Dashboard } from "./dashboard";
import { SensorView } from "./sensors";
import { FanView } from "./fans";
import { MessageView } from "./message";
import { Navigation } from "./nav";
import { ThemeView } from "./theme";
import { HistorieView } from "./history";
// js/app.js

let dark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
let color = "#ffb0cd";
if (localStorage.getItem("color") != null) {
  color = localStorage.getItem("color")!;
}
applyColorThemeFromPrimaryColor(color, dark);
const app = document.getElementById("app")!;
export const nav = document.getElementById("leftbar")!;
const Placeholder = {
  view: function () {
    return m("div", { style: { textAlign: "center" } }, "Hallo Welt");
  },
};
let session: boolean =
  sessionStorage.getItem("session") === "true" ? true : false;
console.log(session);
if (session) {
  m.mount(nav, Navigation);
}
m.route(app, "/ClimPi", {
  "/ClimPi": session ? Dashboard : LoginView,
  "/ClimPi/Dashboard": session ? Dashboard : LoginView,
  "/ClimPi/Sensoren": session ? SensorView : LoginView,
  "/ClimPi/NurFans": session ? FanView : LoginView,
  "/ClimPi/Meldungen": session ? MessageView : LoginView,
  "/ClimPi/Historie": session ? HistorieView : LoginView,
  "/ClimPi/Einstellungen": session ? ThemeView : LoginView,
});
