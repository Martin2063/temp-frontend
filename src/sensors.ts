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

  oninit(vnode: m.Vnode<SensorViewAttrs, this>) {
    let getTemp = () => {
      let tempTemp = Math.random() * 100;
      tempTemp = Math.ceil(tempTemp * 100) / 100;
      this.currentTemp = tempTemp;
      m.redraw();
    };
    this.tempIntervall = setInterval(getTemp, 1000);
    for (let i = 1; i <= 10; i++) {
      this.sensors.push({
        label: `Sensor ${i}`,
        onlineSince: new Date(Date.parse("2025.01.01")),
        temp: this.currentTemp,
        warnings: 3,
      });
    }
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
