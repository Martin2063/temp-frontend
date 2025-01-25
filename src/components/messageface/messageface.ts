import m from "mithril";
import { Surface, SurfaceColorRole } from "../surface";

interface MessageFaceAttrs {
  vom: Date;
  device: string;
  message: string;
  colorRole?: SurfaceColorRole;
}

export class MessageFace implements m.ClassComponent<MessageFaceAttrs> {
  view({
    attrs: { vom, device, message, colorRole },
  }: m.Vnode<MessageFaceAttrs, this>): m.Children | null | void {
    return m(
      ".cp-message-face",
      {},
      m(
        Surface,
        {
          style: {
            width: "160px",
            maxWidth: "160px",
          },
          elevation: 2,
          surfaceColorRole: colorRole ? colorRole : "low",
        },
        m(
          ".text-lines",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              fontSize: "14px",
              width: "100%",
            },
          },
          m(
            ".from",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              },
            },
            m(
              "div",
              { style: { textWrap: "nowrap", marginRight: "1rem" } },
              "Vom"
            ),
            m("div", { style: { textWrap: "nowrap" } }, `${vom.getDate()}`)
          ),
          m(
            ".device-line",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              },
            },
            m("div", { style: { textWrap: "nowrap" } }, "Gerät"),
            m("div", { style: { textWrap: "nowrap" } }, device)
          ),
          m(
            ".message-line",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              },
            },
            m("div", { style: { textWrap: "nowrap" } }, "Meldung"),
            m("div", { style: { textWrap: "nowrap" } }, message)
          )
        )
      )
    );
  }
}
