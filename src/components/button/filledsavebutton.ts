import m from "mithril";
import { Icon } from "../icon";

export interface FilledSaveButtonAttrs {
  label?: string;
  icon?: string;
  save: () => Promise<any>;
  [key: string]: any;
}

export class FilledSaveButton
  implements m.ClassComponent<FilledSaveButtonAttrs>
{
  view({
    attrs: { label, icon, save, ...other },
    children,
  }: m.Vnode<FilledSaveButtonAttrs, this>): void | m.Children {
    return m(
      label ? "md-filled-button" : "md-filled-icon-button",
      {
        onclick: async () => {
          await save();
          await new Promise((r) => setTimeout(r, 200));
          m.redraw();
        },
        icon,
        ...other,
      },
      icon
        ? label
          ? m(Icon, { icon, slot: "icon" })
          : m(Icon, { icon })
        : null,
      label,
      children
    );
  }
}
