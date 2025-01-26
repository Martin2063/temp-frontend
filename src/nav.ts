import m from "mithril";
import { Elevation, Fab } from "./components";
import { NavigationItem, NavigationItemAttrs } from "./navigation_item";
import { getActualMaterialColors } from "./utils";

interface NavigationAttrs {}

export class Navigation implements m.ClassComponent<NavigationAttrs> {
  private navActive: boolean = false;
  private navElement: HTMLElement = document.getElementById("leftbar")!;
  getItems(): {
    items: NavigationItemAttrs[];
    bottom: NavigationItemAttrs[];
  } {
    let items: NavigationItemAttrs[] = [];
    items.push({
      icon: m("img", {
        id: "climpi-logo-small",
        src: "icons/logo.png",
        style: {
          scale: "1.9",
          marginTop: "4px",
        },
      }),
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
        m.route.set("/ClimPi/Dashboard");
      },
      active: () => false,
    });
    items.push({
      icon: "menu",
      label: "Schließen",
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
      },
    });
    items.push({
      icon: "dashboard",
      label: "Dashboard",
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
        m.route.set("/ClimPi/Dashboard");
      },
      active: (path) => {
        return path.endsWith("Dashboard");
      },
    });
    items.push({
      icon: "sensors",
      label: "Sensoren",
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
        m.route.set("/ClimPi/Sensoren");
      },
      active: (path) => {
        return path.endsWith("Sensoren");
      },
    });
    items.push({
      icon: "air",
      label: "Lüfter",
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
        m.route.set("/ClimPi/NurFans");
      },
      active: (path) => {
        return path.endsWith("NurFans");
      },
    });
    items.push({
      icon: "notifications_active",
      label: "Meldungen",
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
        m.route.set("/ClimPi/Meldungen");
      },
      active: (path) => {
        return path.endsWith("Meldungen");
      },
    });
    items.push({
      icon: "timeline",
      label: "Historie",
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
        m.route.set("/ClimPi/Historie");
      },
      active: (path) => {
        return path.endsWith("Historie");
      },
    });
    items.push({
      icon: "settings",
      label: "Einstellungen",
      action: () => {
        this.navElement.style.backgroundColor = "transparent";
        this.navActive = false;
        m.route.set("/ClimPi/Einstellungen");
      },
      active: (path) => {
        return path.endsWith("Einstellungen");
      },
    });
    return {
      items,
      bottom: [
        {
          icon: "logout",
          label: "Ausloggen",
          action: async (evt) => {
            sessionStorage.removeItem("session");
            m.mount(this.navElement, null);
            m.route.set("/login");
          },
        },
      ],
    };
  }

  view(vnode: m.Vnode<NavigationAttrs, this>): m.Children | null | void {
    const { items, bottom } = this.getItems();
    return this.navActive
      ? m(
          "",
          // navigationHidden ? '.hidden' : '',
          m(Elevation),
          items.map((item) => m(NavigationItem, item)),
          bottom &&
            m(
              ".bottom",
              bottom.map((item) => m(NavigationItem, item))
            )
        )
      : m(Fab, {
          style: { position: "fixed", left: "1rem", top: "1rem" },
          icon: "menu",
          onclick: () => {
            this.navActive = true;
            this.navElement.style.backgroundColor = getActualMaterialColors(
              "surface-container-low"
            );
          },
          lowered: true,
        });
  }
}
