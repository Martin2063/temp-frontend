import m from "mithril";
import { SensorFace } from "./components";

interface SensorViewAttrs {}

type Sensors = {
  label: string;
  onlineSince: Date;
  temp: number;
  warnings: number;
};

export class SensorView implements m.ClassComponent<SensorViewAttrs> {
  private sensors: Sensors[] = [];
  private tempIntervall?: any;
  private currentTemp: number = 0;

  async oninit(vnode: m.Vnode<SensorViewAttrs, this>) {
    let session = sessionStorage.getItem("session");
    if (!session) {
      m.route.set("/ClimPi");
    }
    let path = window.location.href;
    let response = await fetch(
      `http://${path.split("/")[2].split(":")[0]}:5000/api/temp/get`
    );
    let { timestamp, value } = await response.json();
    this.currentTemp = value;
    m.redraw();
    for (let i = 1; i <= 10; i++) {
      this.sensors.push({
        label: `Sensor ${i}`,
        onlineSince: new Date(Date.parse("2025.01.01")),
        temp: this.currentTemp,
        warnings: 3,
      });
    }
    let getTemp = async () => {
      let response = await fetch(
        `http://${path.split("/")[2].split(":")[0]}:5000/api/temp/get`
      );
      let { timestamp, value } = await response.json();
      this.currentTemp = value;
      m.redraw();
    };
    this.tempIntervall = setInterval(getTemp, 5000);
  }
  onremove(vnode: m.VnodeDOM<SensorViewAttrs, this>) {
    if (this.tempIntervall) {
      clearInterval(this.tempIntervall);
    }
  }
  view(vnode: m.Vnode<SensorViewAttrs, this>): m.Children | null | void {
    return m(
      ".cp-sensor-view",
      {
        style: {
          width: "100%",
        },
      },
      m("H1", { style: { textAlign: "center" } }, "Sensoren"),
      m(
        ".sensors",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          },
        },
        this.sensors.map((sens) => {
          return m(
            ".sensor",
            {
              style: {
                marginRight: "1rem",
                marginBottom: "1rem",
              },
            },
            m(SensorFace, {
              label: sens.label,
              temp: this.currentTemp,
              warnings: sens.warnings,
              onlineSince: sens.onlineSince,
              colorRole: "highest",
            })
          );
        })
      )
    );
  }
}
