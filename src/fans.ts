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
  private tempIntervall?: any;
  private tempTarget: number = 25;
  private maxRPM: number = 3700;
  private currentRPM: number = 0;

  calcRPM(currentTemp: number): number {
    if (currentTemp <= this.tempTarget) {
      return 0;
    } else {
      let diff = currentTemp - this.tempTarget;
      let speed = Math.min(10 + diff * 10 + diff ** 1.8 * 3, 100);
      if (speed < 10) {
        speed = 10;
      }
      return Math.round((this.maxRPM / 100) * speed);
    }
  }

  async oninit(vnode: m.Vnode<FanViewAttrs, this>) {
    let session = sessionStorage.getItem("session");
    if (!session) {
      m.route.set("/ClimPi");
    }
    let path = window.location.href;
    let response = await fetch(
      `http://${path.split("/")[2].split(":")[0]}:5000/api/temp/get`
    );
    let { timestamp, value } = await response.json();
    this.currentRPM = this.calcRPM(value);
    m.redraw();
    for (let i = 1; i <= 10; i++) {
      this.fans.push({
        label: `Zero DB Cooling ${i}`,
        onlineSince: new Date(Date.parse("2025.01.01")),
        rpm: this.currentRPM,
        warnings: 0,
      });
    }
    let getTemp = async () => {
      let response = await fetch(
        `http://${path.split("/")[2].split(":")[0]}:5000/api/temp/get`
      );
      let { timestamp, value } = await response.json();
      this.currentRPM = this.calcRPM(value);
      m.redraw();
    };
    this.tempIntervall = setInterval(getTemp, 5000);
  }
  onremove(vnode: m.VnodeDOM<FanViewAttrs, this>) {
    if (this.tempIntervall) {
      clearInterval(this.tempIntervall);
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
