import m from "mithril";
import {
  FilledTonalButton,
  OutlinedTextField,
  Surface,
} from "./components/index";
import { Navigation } from "./nav";
import { nav } from "./app";

// async function hasch(password: string) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(password);
//   const hashBuffer = await crypto.subtle.digest("SHA-256", data);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
//   return hashHex;
// }

type StringMap = {
  [key: string]: string;
};
const auth: StringMap = {
  "Kel Akbaba": "20euro",
  Zero: "eiscreme",
  Kutters: "cheekybreeky",
  Chrono2063: "altersack",
  JimyJJimothy: "grisu",
  Jung: "marine",
};

interface LoginViewAttrs {}

export class LoginView implements m.ClassComponent<LoginViewAttrs> {
  private user: string = "";
  private password: string = "";
  private showPW: boolean = false;
  private loginError: boolean = false;
  private errorText: string = "Benutzername oder Passwort stimmen nicht.";
  oninit(vnode: m.Vnode<LoginViewAttrs, this>) {
    let session = sessionStorage.getItem("session");
    if (session) {
      m.route.set("/ClimPi/Dashboard");
    }
  }
  view(vnode: m.Vnode<LoginViewAttrs, this>): m.Children | null | void {
    return m(
      ".cp-login",
      {
        style: {
          display: "flex",
          justifyContent: "center",
        },
      },
      m(
        Surface,
        {
          style: {
            maxWidth: "400px",
          },
          elevation: 2,
          surfaceColorRole: "highest",
        },
        m(
          ".Logo",
          {
            style: {
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              marginBottom: "2rem",
            },
          },
          m(
            "text-aligner",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
            },
            m("h1", "ClimPi")
          ),
          m("img", {
            id: "climpi-logo",
            src: "icons/logo.png",
            style: {
              width: "28%",
              height: "auto",
              marginLeft: "3rem",
            },
          })
        ),
        m(OutlinedTextField, {
          style: {
            width: "100%",
            marginBottom: "1rem",
          },
          label: "Benutzer",
          trailingicon: "person",
          value: this.user,
          oninput: (ev: any) => {
            this.loginError = false;
            this.user = ev.target.value;
          },
          error: this.loginError,
          errorText: this.errorText,
        }),
        m(OutlinedTextField, {
          style: {
            width: "100%",
            marginBottom: "1rem",
          },
          label: "Passwort",
          trailingicon: this.showPW ? "visibility_off" : "visibility",
          ontrailinIconClick: () => {
            this.showPW = !this.showPW;
          },
          value: this.password,
          type: this.showPW ? "text" : "password",
          oninput: (ev: any) => {
            this.loginError = false;
            this.password = ev.target.value;
          },
          error: this.loginError,
          errorText: this.errorText,
        }),
        m(
          ".middle-button",
          { style: { display: "flex", justifyContent: "center" } },
          m(FilledTonalButton, {
            label: "Login",
            onclick: async () => {
              // let pHaschW = await hasch(this.password);
              let checkPW = auth[this.user];
              if (auth[this.user] !== undefined) {
                if (this.password === checkPW) {
                  sessionStorage.setItem("session", "true");
                  m.mount(nav, Navigation);
                  m.route.set("/ClimPi/Dashboard");
                  m.redraw();
                } else {
                  this.loginError = true;
                  m.redraw();
                }
              } else {
                this.loginError = true;
                m.redraw();
              }
              // m.route.set("/about");
            },
          })
        )
      )
    );
  }
}
