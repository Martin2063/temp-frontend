import m from "mithril";
import { Fab } from "./components";

interface NavigationAttrs {}

export class Navigation implements m.ClassComponent<NavigationAttrs> {
  private navActive: boolean = false;
  view(vnode: m.Vnode<NavigationAttrs, this>): m.Children | null | void {
    return m(
      ".cp-nav",
      {},
      this.navActive
        ? null
        : m(Fab, {
            icon: "menu",
            onclick: () => {
              console.log("geklickt");
              this.navActive = true;
            },
            lowered: true,
          })
    );
  }
}
