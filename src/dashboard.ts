import m from "mithril";
import {
  BigLabelButton,
  DynamicGraph,
  FanFace,
  SensorFace,
  Surface,
} from "./components";
import Dygraph from "dygraphs";

interface DashboardAttrs {}
type TimeTemp = {
  time: number;
  temp: number;
};
export class Dashboard implements m.ClassComponent<DashboardAttrs> {
  private tempTarget: number = 25;
  private maxRPM: number = 3700;
  private currentRPM: number = 0;
  private currentTemp: number = 0;
  private tempIntervall?: any;
  private graph: Dygraph = null!;
  private formattedData: [Date, number][] = [];
  async oninit(vnode: m.Vnode<DashboardAttrs, this>) {
    let session = sessionStorage.getItem("session");
    if (!session) {
      m.route.set("/ClimPi");
    } else {
      let getTemp = async () => {
        let path = window.location.href;
        let response = await fetch(
          `http://${path.split("/")[2].split(":")[0]}:5000/api/temp/get`
        );
        let { timestamp, value } = await response.json();
        if (timestamp === undefined) {
          timestamp = Date.now() / 1000;
          value = 30;
        }
        this.currentTemp = value;
        if (this.currentTemp <= this.tempTarget) {
          this.currentRPM = 0;
        } else {
          let diff = this.currentTemp - this.tempTarget;
          let speed = Math.min(10 + diff * 10 + diff ** 1.8 * 3, 100);
          if (speed < 10) {
            speed = 10;
          }
          this.currentRPM = Math.round((this.maxRPM / 100) * speed);
        }
        this.formattedData.push([new Date(timestamp * 1000), this.currentTemp]);
        if (this.formattedData.length > 30) {
          this.formattedData.shift();
        }
        this.getGraph()?.updateOptions({
          file: this.formattedData as any,
        });
        m.redraw();
      };
      this.tempIntervall = setInterval(getTemp, 1000);
    }
  }
  getGraph(): Dygraph | undefined {
    return this.graph;
  }
  setGraph(gr: Dygraph) {
    this.graph = gr;
  }
  onremove(vnode: m.VnodeDOM<DashboardAttrs, this>) {
    if (this.tempIntervall) {
      clearInterval(this.tempIntervall);
    }
  }
  view(vnode: m.Vnode<DashboardAttrs, this>): m.Children | null | void {
    return m(
      ".cp-dashboard",
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
          ".headline",
          m(
            Surface,
            {
              style: {
                maxWidth: "368px",
                marginBottom: "1rem",
              },
              elevation: 2,
              surfaceColorRole: "low",
            },
            m(
              ".header",
              {
                style: {
                  textAlign: "center",
                },
              },
              m(
                "h1",
                { style: { marginTop: "-0.5rem", marginBottom: "-0.5rem" } },
                "ClimPi"
              )
            )
          )
        ),
        m(
          ".sensor-fan-line",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "400px",
              marginBottom: "1rem",
            },
          },
          m(SensorFace, {
            label: "Sensor 1",
            onlineSince: new Date("2024-12-12"),
            temp: this.currentTemp,
            warnings: 3,
          }),
          m(FanFace, {
            label: "Zero DB Cooling 1",
            onlineSince: new Date("2024-12-8"),
            rpm: this.currentRPM,
            warnings: 0,
          })
        ),
        m(
          ".button-line",
          {
            style: {
              display: "flex",
              justifyContent: "space-around",
            },
          },
          m(BigLabelButton, {
            label: "Sensoren",
            value: 10,
          }),
          m(BigLabelButton, {
            label: "Fans",
            value: 10,
          }),
          m(BigLabelButton, {
            label: "Meldungen",
            value: 3,
          })
        ),
        m(
          ".graph",
          m(
            Surface,
            {
              style: {
                maxWidth: "368px",
                marginBottom: "1rem",
              },
              elevation: 2,
              surfaceColorRole: "low",
            },
            m(DynamicGraph, {
              g: this.graph,
              data: this.formattedData,
              setGraph: this.setGraph.bind(this),
            })
          )
        )
      )
    );
  }
}
