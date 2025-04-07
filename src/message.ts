import m from "mithril";
import { MessageFace } from "./components";

interface MessageViewAttrs {}

type Message = {
  vom: Date;
  device: string;
  message: string;
};

export class MessageView implements m.ClassComponent<MessageViewAttrs> {
  private messages: Message[] = [];

  oninit(vnode: m.Vnode<MessageViewAttrs, this>) {
    let session = sessionStorage.getItem("session");
    if (!session) {
      m.route.set("/ClimPi");
    }
    this.messages.push({
      vom: new Date("1.3.2025"),
      device: "Sensor 1",
      message: "Temperatur über 50°",
    });
    this.messages.push({
      vom: new Date("1.8.2025"),
      device: "Sensor 3",
      message: "Temperatur über 50°",
    });
    this.messages.push({
      vom: new Date("1.20.2025"),
      device: "Sensor 1",
      message: "Sensor 1 meldet sich nicht",
    });
  }
  view(vnode: m.Vnode<MessageViewAttrs, this>): m.Children | null | void {
    return m(
      ".cp-messages",
      {
        style: {
          width: "100%",
        },
      },
      m("H1", { style: { textAlign: "center" } }, "Meldungen"),
      m(
        ".messages",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          },
        },
        this.messages.map((message) => {
          return m(
            ".message",
            { style: { marginRight: "1rem", marginBottom: "1rem" } },
            m(MessageFace, {
              vom: message.vom,
              device: message.device,
              message: message.message,
              colorRole: "highest",
            })
          );
        })
      )
    );
  }
}
