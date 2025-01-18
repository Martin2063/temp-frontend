import m from "mithril";
import { Surface } from "../surface";

interface SensorFaceAttrs {
  label: string;
  onlineSince: Date;
  temp: number;
  warnings: number;
}

export class SensorFace implements m.ClassComponent<SensorFaceAttrs> {
  calcDays(onlineSince: Date): string {
    let milliTimeDif = new Date(Date.now()).getTime() - onlineSince.getTime();
    return `${Math.round(milliTimeDif / 1000 / 60 / 60 / 24)} Tage`;
  }

  view({
    attrs: { label, onlineSince, temp, warnings },
  }: m.Vnode<SensorFaceAttrs, this>): m.Children | null | void {
    return m(
      "cp-sensor",
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
              "Sensor"
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
            ".temp",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              },
            },
            m("div", { style: { textWrap: "nowrap" } }, "Temperatur"),
            m("div", { style: { textWrap: "nowrap" } }, `${temp}° Grad`)
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
