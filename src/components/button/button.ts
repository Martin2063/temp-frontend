import "@material/web/button/elevated-button";
import "@material/web/button/filled-button";
import "@material/web/button/outlined-button";
import "@material/web/button/text-button";
import "@material/web/button/filled-tonal-button";

import m from "mithril";
import { Icon } from "../icon";

export interface ButtonAttrs {
  label: string;
  icon?: string;
  iconStyle?: any;
  onclick?: (e: Event) => void;
  [key: string]: any;
}

export class ElevatedButton implements m.ClassComponent<ButtonAttrs> {
  view({
    attrs: { label, icon, onclick, ...other },
    children,
  }: m.Vnode<ButtonAttrs>) {
    return m(
      "md-elevated-button",
      {
        onclick,
        ...other,
      },
      icon ? m(Icon, { icon, slot: "icon" }) : null,
      label,
      children
    );
  }
}

export class FilledTonalButton implements m.ClassComponent<ButtonAttrs> {
  view({
    attrs: { label, icon, onclick, ...other },
    children,
  }: m.Vnode<ButtonAttrs, this>): void | m.Children {
    return m(
      "md-filled-tonal-button",
      {
        onclick,
        ...other,
      },
      icon ? m(Icon, { icon, slot: "icon" }) : null,
      label,
      children
    );
  }
}

export class FilledButton implements m.ClassComponent<ButtonAttrs> {
  view({
    attrs: { label, icon, onclick, iconStyle, ...other },
    children,
  }: m.Vnode<ButtonAttrs>) {
    return m(
      "md-filled-button",
      {
        onclick,
        ...other,
      },
      icon ? m(Icon, { icon, slot: "icon", style: iconStyle }) : null,
      label,
      children
    );
  }
}

export class OutlinedButton implements m.ClassComponent<ButtonAttrs> {
  view({
    attrs: { label, icon, onclick, ...other },
    children,
  }: m.Vnode<ButtonAttrs>) {
    return m(
      "md-outlined-button",
      {
        onclick,
        ...other,
      },
      icon ? m(Icon, { icon, slot: "icon" }) : null,
      label,
      children
    );
  }
}

export class TextButton implements m.ClassComponent<ButtonAttrs> {
  view({
    attrs: { label, icon, onclick, ...other },
    children,
  }: m.Vnode<ButtonAttrs>) {
    return m(
      "md-text-button",
      {
        onclick,
        ...other,
      },
      icon ? m(Icon, { icon, slot: "icon" }) : null,
      label,
      children
    );
  }
}
