import m from "mithril";
import {
  BigLabelButton,
  DygraphDiv,
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
  // private data: string | number | Date[][] = [];
  private currentTemp: number = 0;
  private tempIntervall?: any;
  private graph: Dygraph = null!;
  private formattedData: [Date, number][] = [];
  async oninit(vnode: m.Vnode<DashboardAttrs, this>) {
    let getTemp = async () => {
      let path = window.location.href;
      let response = await fetch(
        `http://${path.split("/")[2].split(":")[0]}:5000/api/temp/get`
      );
      let { timestamp, value } = await response.json();
      this.currentTemp = value;
      this.formattedData.push([new Date(timestamp), this.currentTemp]);
      this.getGraph()?.updateOptions({
        file: this.formattedData as any,
      });
      m.redraw();
    };
    this.tempIntervall = setInterval(getTemp, 1000);
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
    // console.log(formattedData);
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
            rpm: 2250,
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
