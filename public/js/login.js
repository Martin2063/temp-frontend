import m from "mithril";
import { Surface } from "./components/index";
export class LoginView {
    view(vnode) {
        return m("div", [
            m(Surface, {
                style: {
                    maxWidth: "400px",
                },
                elevation: 2,
                surfaceColorRole: "high",
                // backgroundColor: "var(--md-sys-color-surface)",
            }, m("h1", "Willkommen bei unserer SPA!"), m("button", {
                onclick: function () {
                    alert("Du hast geklickt!");
                },
                class: "btn waves-effect waves-light",
            }, "Klick mich")),
        ]);
    }
}
