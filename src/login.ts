import m from "mithril";
import {
  FilledTonalButton,
  OutlinedTextField,
  Surface,
} from "./components/index";

async function hasch(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
type StringMap = {
  [key: string]: string;
};
const auth: StringMap = {
  "Kel Akbaba":
    "b089104ade571769b43b41ba49e6ec9894a5415f2056d30966bcc7dda4516a23",
  Zero: "2020e77c722373646a4bee091e5dd4a8a70f07f185b07db36815b32450f65e02",
  Kutters: "c79d57e2e93bfb24bab6614b33bbb6beaef1ce3214daf30a6315ae8c854ae95d",
  Chrono2063:
    "c2d3950071e327a9c3867374bea3a0d247c6e5d68cfffa10c4ecbaf809a5232c",
  JimyJJimothy:
    "421b2952962b72e3a2ec86a9b3f686e5ce23b11b63fea033d6d4030980bd839f",
  Jung: "8fe26efbd6c39984f6538ba14968a881925d02fc3ca58fd5b3caa63a4c310f17",
};

interface LoginViewAttrs {}

export class LoginView implements m.ClassComponent<LoginViewAttrs> {
  private user: string = "";
  private password: string = "";
  private showPW: boolean = false;
  private loginError: boolean = false;
  private errorText: string = "Benutzername oder Passwort stimmen nicht.";
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
              let pHaschW = await hasch(this.password);
              let checkPW = auth[this.user];
              console.log(this.user, "<<<>>>", pHaschW, "<<<>>>", checkPW);
              if (auth[this.user] !== undefined) {
                if (pHaschW === checkPW) {
                  sessionStorage.setItem("session", "true");
                  m.route.set("/ClimPi/Dashboard");
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
