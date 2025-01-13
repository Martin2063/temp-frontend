import m from "mithril";
import { Surface } from "./components/index";

interface LoginViewAttrs {}

export class LoginView implements m.ClassComponent<LoginViewAttrs> {
  view(vnode: m.Vnode<LoginViewAttrs, this>): m.Children | null | void {
    return m("div", [
      m(
        Surface,
        {
          style: {
            maxWidth: "400px",
          },
          elevation: 2,
          surfaceColorRole: "high",
          backgroundColor: "var(--md-sys-color-surface)",
        },
        m("h1", "Willkommen bei unserer SPA!"),
        m(
          "button",
          {
            onclick: function () {
              alert("Du hast geklickt!");
            },
            class: "btn waves-effect waves-light",
          },
          "Klick mich"
        )
      ),
    ]);
  }
}
