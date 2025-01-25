import m from "mithril";
import { FanFace, SensorFace } from "./components";

interface FanViewAttrs {}

type Fans = {
  label: string;
  onlineSince: Date;
  rpm: number;
  warnings: number;
};

export class FanView implements m.ClassComponent<FanViewAttrs> {
  private fans: Fans[] = [];

  oninit(vnode: m.Vnode<FanViewAttrs, this>) {
    for (let i = 1; i <= 10; i++) {
      this.fans.push({
        label: `Zero DB Cooling ${i}`,
        onlineSince: new Date(Date.parse("2025.01.01")),
        rpm: 2250,
        warnings: 3,
      });
    }
  }
  view(vnode: m.Vnode<FanViewAttrs, this>): m.Children | null | void {
    return m(
      ".cp-fan-view",
      {
        style: {
          width: "100%",
        },
      },
      m("H1", { style: { textAlign: "center" } }, "Fans"),
      m(
        ".fans",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          },
        },
        this.fans.map((fan) => {
          return m(
            ".fan",
            {
              style: {
                marginRight: "1rem",
                marginBottom: "1rem",
              },
            },
            m(FanFace, {
              label: fan.label,
              rpm: fan.rpm,
              warnings: fan.warnings,
              onlineSince: fan.onlineSince,
              colorRole: "highest",
            })
          );
        })
      )
    );
  }
}
