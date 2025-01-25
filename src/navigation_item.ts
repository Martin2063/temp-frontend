import m from "mithril";
import "@material/web/labs/navigationtab/navigation-tab";
import { Icon } from "./components";

export interface NavigationItemAttrs {
  href?: string | (() => string);
  action?: (evt: Event) => void;
  label?: string;
  icon: string | m.Children;
  active?: (path: string) => boolean;
  divide?: boolean;
  subNavigation?: NavigationItem[];
  [key: string]: any;
}
export class NavigationItem implements m.ClassComponent<NavigationItemAttrs> {
  view({
    attrs: { href, action, label, icon, active, divide, ...other },
  }: m.Vnode<any, {}>): m.Children {
    active = active || ((path: string) => path.startsWith(href));
    if (active(m.route.get() || "")) {
      document.title = `ClimPi - ${label}`;
    }
    const icons = [];
    if (typeof icon === "string") {
      icons.push(m(Icon, { slot: "activeIcon", icon }));
      icons.push(m(Icon, { slot: "inactiveIcon", icon }));
    } else {
      icons.push(m(".icon", { slot: "activeIcon" }, icon));
      icons.push(m(".icon", { slot: "inactiveIcon" }, icon));
    }
    const it = m(
      "md-navigation-tab",
      {
        ...other,
        onclick: (evt: Event) => {
          if (action) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            action(evt);
            return false;
          } else if (href) {
            if (typeof href === "string") {
              console.log("navigate to", href);
              m.route.set(href);
            } else {
              m.route.set(href());
              let navTo: string = href().split("/")[1];
              if (navTo === "") {
                navTo = "Dashboard";
              }
              console.log("navigate to", navTo);
            }
          }
        },
        label,
        active: active ? active(m.route.get() || "") : false,
      },
      m(Icon, { slot: "active-icon", icon }),
      m(Icon, { slot: "inactive-icon", icon })
    );
    return divide ? [it, m("md-divider")] : it;
  }
}
