import "@material/web/labs/segmentedbuttonset/outlined-segmented-button-set";
import "@material/web/labs/segmentedbutton/outlined-segmented-button";

import m from "mithril";
import { Icon } from "../icon";

interface SegmentedButtonSetAttrs {
  disabled?: boolean;
  multiselect?: boolean;
  [key: string]: any;
}

export class OutlinedSegmentedButtonSet
  implements m.ClassComponent<SegmentedButtonSetAttrs>
{
  view({
    attrs: { disabled, multiselect, ...other },
    children,
  }: m.Vnode<SegmentedButtonSetAttrs>) {
    return m(
      "md-outlined-segmented-button-set",
      { disabled, multiselect, ...other },
      children
    );
  }
}

interface SegmentedButtonAttrs {
  disabled?: boolean;
  selected?: boolean;
  noCheckmark?: boolean;
  label?: string;
  [key: string]: any;
}

export class OutlinedSegmentedButton
  implements m.ClassComponent<SegmentedButtonAttrs>
{
  view({
    attrs: { disabled, selected, noCheckmark, icon, ...other },
    children,
  }: m.Vnode<SegmentedButtonAttrs>) {
    return m(
      "md-outlined-segmented-button.md-outlined-segmented-button--without-checkmark",
      { disabled, selected, noCheckmark: true, ...other },
      m(Icon, { icon, slot: "icon" }),
      children
    );
  }
}
