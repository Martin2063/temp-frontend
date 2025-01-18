import m from "mithril";
import { Surface } from "../surface";

interface FanFaceAttrs {
  label: string;
  onlineSince: Date;
  rpm: number;
  warnings: number;
}

export class FanFace implements m.ClassComponent<FanFaceAttrs> {
  calcDays(onlineSince: Date): string {
    let milliTimeDif = new Date(Date.now()).getTime() - onlineSince.getTime();
    return `${Math.round(milliTimeDif / 1000 / 60 / 60 / 24)} Tage`;
  }

  view({
    attrs: { label, onlineSince, rpm, warnings },
  }: m.Vnode<FanFaceAttrs, this>): m.Children | null | void {
    return m(
      "cp-fan",
      {},
      m(
        Surface,
        {
          style: {
            width: "160px",
            maxWidth: "160px",
          },
          elevation: 2,
          surfaceColorRole: "low",
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
            ".label",
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
              "Fan"
            ),
            m("div", { style: { textWrap: "nowrap" } }, label)
          ),
          m(
            ".uptime",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              },
            },
            m("div", { style: { textWrap: "nowrap" } }, "Online"),
            m(
              "div",
              { style: { textWrap: "nowrap" } },
              this.calcDays(onlineSince)
            )
          ),
          m(
            ".rpm",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              },
            },
            m("div", { style: { textWrap: "nowrap" } }, "RPM"),
            m("div", { style: { textWrap: "nowrap" } }, `${rpm}`)
          ),
          m(
            ".warnings",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              },
            },
            m("div", { style: { textWrap: "nowrap" } }, "Meldungen"),
            m("div", { style: { textWrap: "nowrap" } }, warnings)
          )
        )
      )
    );
  }
}
