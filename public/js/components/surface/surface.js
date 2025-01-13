var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import m from "mithril";
import { Elevation } from "../elevation/index";
export class Surface {
    view(_a) {
        var _b = _a.attrs, { elevation, backgroundColor, surfaceColorRole, style } = _b, other = __rest(_b, ["elevation", "backgroundColor", "surfaceColorRole", "style"]), { children } = _a;
        style = style || {};
        if (typeof elevation === "number") {
            style["--md-elevation-level"] = elevation;
        }
        if (backgroundColor) {
            style.backgroundColor = backgroundColor;
        }
        else if (surfaceColorRole) {
            style.backgroundColor = `var(--md-sys-color-surface-container-${surfaceColorRole})`;
        }
        return m(".surface", Object.assign({ style }, other), elevation ? m(Elevation) : null, children);
    }
}
