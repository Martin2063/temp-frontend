import m from "mithril";
import { FilledTonalButton, Surface } from "./components/index";

interface LoginViewAttrs {}

export class LoginView implements m.ClassComponent<LoginViewAttrs> {
  view(vnode: m.Vnode<LoginViewAttrs, this>): m.Children | null | void {
    return m("div", [
      m(
        Surface,
        {
          style: {
            maxWidth: "400px",
            padding: "0.5rem",
          },
          elevation: 2,
          surfaceColorRole: "highest",
          // backgroundColor: "var(--md-sys-color-surface)",
        },
        m("h1", "Willkommen bei unserer SPA!"),
        m(
          ".middle-button",
          { style: { display: "flex", justifyContent: "center" } },
          m(FilledTonalButton, {
            label: "Press it",
            onclick: function () {
              alert("Du hast geklickt!");
            },
          })
        )
      ),
    ]);
  }
}
