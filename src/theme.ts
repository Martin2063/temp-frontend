import m from "mithril";
import {
  applyColorThemeFromPrimaryColor,
  getActualMaterialColors,
} from "./utils";
import { StandardIconButton, Surface, Switch, VAligner } from "./components";

export interface ThemeViewAttrs {}

export class ThemeView implements m.ClassComponent<ThemeViewAttrs> {
  setColor(color: string, dark: boolean) {
    applyColorThemeFromPrimaryColor(color, dark);
  }

  view(vnode: m.Vnode<ThemeViewAttrs, this>): void | m.Children {
    let mainColor: string = null!;
    let darkMode: boolean = undefined!;
    if (localStorage.getItem("color") != null) {
      mainColor = localStorage.getItem("color")
        ? localStorage.getItem("color")!
        : "";
    } else {
      mainColor = "#ffb0cd";
    }
    if (localStorage.getItem("darkMode") != null) {
      darkMode = localStorage.getItem("darkMode") === "true" ? true : false;
    } else {
      darkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return m(
      ".ds-theme-settings",
      {
        style: {
          display: "flex",
          justifyContent: "center",
        },
      },
      m(
        ".columniser",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "calc(100%)",
          },
        },
        m(
          Surface,
          {
            elevation: 1,
            surfaceColorRole: "high",
            style: {
              width: "28rem",
              maxWidth: "calc(100% - 4rem)",
              margin: "1rem",
            },
          },
          m(
            ".settings-save",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
              },
            },
            m("H3", "Einstellungen")
          )
        ),
        m(
          ".scroll-area",
          {
            style: {
              height: "calc(100%)",
              width: "calc(100%)",
              overflow: "auto",
            },
          },
          m(
            Surface,
            {
              elevation: 1,
              surfaceColorRole: "high",
              style: {
                width: "28rem",
                maxWidth: "calc(100% - 4rem)",
                margin: "1rem",
              },
            },
            m(
              ".dark-mode-switch",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                },
              },
              m("H3", "Dark Mode"),
              m(
                VAligner,
                m(Switch, {
                  selected: darkMode,
                  onclick: () => {
                    darkMode = !darkMode;
                    this.setColor(mainColor, darkMode);
                    localStorage.setItem("darkMode", `${darkMode}`);
                  },
                })
              )
            ),
            m(
              ".pick-color",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                },
              },
              m("H3", "Farbauswahl"),
              m(
                VAligner,
                m("input", {
                  type: "color",
                  id: "theme-color-picker",
                  value: mainColor,
                  style: {
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    border: "0px",
                    marginRight: "-2px",
                  },
                  onchange: (e: any) => {
                    mainColor = e.target.value;
                    this.setColor(mainColor, darkMode);
                    localStorage.setItem("color", `${mainColor}`);
                  },
                })
              )
            ),
            m(
              ".restore-default",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                },
              },
              m("H3", "Standart Theme"),
              m(
                VAligner,
                m(StandardIconButton, {
                  icon: "undo",
                  onclick: () => {
                    let dark =
                      window.matchMedia &&
                      window.matchMedia("(prefers-color-scheme: dark)").matches;
                    applyColorThemeFromPrimaryColor("#ffb0cd", dark);
                    mainColor = getActualMaterialColors("primary");
                    darkMode = dark;
                    localStorage.removeItem("darkMode");
                    localStorage.removeItem("color");
                  },
                })
              )
            )
          )
        )
      )
    );
  }
}
