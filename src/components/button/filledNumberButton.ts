import m from "mithril";
import { Elevation } from "../elevation";

interface FilledNumberButtonAttrs {
  value: number;
  elevation?: number;
  [k: string]: any;
}

export class FilledNumberButton
  implements m.ClassComponent<FilledNumberButtonAttrs>
{
  view({
    attrs: { value, elevation, style, ...other },
  }: m.Vnode<FilledNumberButtonAttrs, {}>) {
    return m(
      "cp-numberButton",
      {},
      m(
        ".border",
        {
          style: {
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            backgroundColor: "var(--md-sys-color-surface-container-low",
            boxShadow:
              "0px 4px 6px rgba(0,0,0,0.2), 0px 2px 4px rgba(0,0,0,0.2)",
          },
        },
        elevation ? m(Elevation) : null,
        value
      )
    );
  }
}
