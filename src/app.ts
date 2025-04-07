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

function getSession(): boolean {
  let session = sessionStorage.getItem("session") === "true" ? true : false;
  return session;
}

if (getSession()) {
  m.mount(nav, Navigation);
}
m.route(app, "/ClimPi", {
  "/ClimPi": LoginView,
  "/ClimPi/Dashboard": Dashboard,
  "/ClimPi/Sensoren": SensorView,
  "/ClimPi/NurFans": FanView,
  "/ClimPi/Meldungen": MessageView,
  "/ClimPi/Historie": HistorieView,
  "/ClimPi/Einstellungen": ThemeView,
});
