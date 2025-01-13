import m from "mithril";
import { Elevation } from "../elevation/index";

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type SurfaceColorRole = "lowest" | "low" | "high" | "highest";

interface SurfaceAttrs {
  elevation?: SurfaceLevel;
  surfaceColorRole?: SurfaceColorRole;
  backgroundColor?: string;
  [k: string]: any;
}

export class Surface implements m.ClassComponent<SurfaceAttrs> {
  view({
    attrs: { elevation, backgroundColor, surfaceColorRole, style, ...other },
    children,
  }: m.Vnode<SurfaceAttrs, {}>) {
    style = style || ({} as any);
    if (typeof elevation === "number") {
      style["--md-elevation-level"] = elevation;
    }
    if (backgroundColor) {
      style.backgroundColor = backgroundColor;
    } else if (surfaceColorRole) {
      style.backgroundColor = `var(--md-sys-color-surface-container-${surfaceColorRole})`;
    }
    return m(
      ".surface",
      {
        style,
        ...other,
      },
      elevation ? m(Elevation) : null,
      children
    );
  }
}
