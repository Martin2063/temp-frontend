import m from "mithril";
import { FilledNumberButton } from "../button";

interface BigLabelButtonAttrs {
  value: number;
  label: string;
}

export class BigLabelButton implements m.ClassComponent<BigLabelButtonAttrs> {
  view({
    attrs: { value, label },
  }: m.Vnode<BigLabelButtonAttrs, this>): m.Children | null | void {
    return m(
      ".cp-big-label-button",
      {
        style: {
          display: "flex",
          flexDirection: "column",
        },
      },
      m(
        ".number-but",
        { style: { alignSelf: "center" } },
        m(FilledNumberButton, { value })
      ),
      m("h3", { style: { fontSize: "14px", textAlign: "center" } }, label)
    );
  }
}
