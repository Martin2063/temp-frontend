import "@material/web/fab/fab";

import m from "mithril";
import { Icon } from "../icon";

interface FabAttrs {
  size?: string;
  icon: string;
  lowered: boolean;
  onclick: (e: Event) => void;
  [key: string]: any;
}

export class Fab implements m.ClassComponent<FabAttrs> {
  view({
    attrs: { size, icon, lowered, onclick, ...other },
    children,
  }: m.Vnode<FabAttrs>) {
    return m(
      "md-fab",
      { size, lowered, onclick, ...other },
      m(Icon, { icon, slot: "icon" }),
      children
    );
  }
}
