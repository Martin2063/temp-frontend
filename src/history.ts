import m from "mithril";
import {
  DygraphDiv,
  Icon,
  OutlinedSegmentedButton,
  OutlinedSegmentedButtonSet,
  VAligner,
} from "./components";

type SegmentOptions = "day" | "week" | "month";

interface HistorieViewAttrs {}

export class HistorieView implements m.ClassComponent<HistorieViewAttrs> {
  private selectedSegment: SegmentOptions = "month";
  private calcDone: boolean = false;
  private monthData: any = null;
  private dayData: any = null;
  async oninit(vnode: m.Vnode<HistorieViewAttrs, this>) {
    let session = sessionStorage.getItem("session");
    if (!session) {
      m.route.set("/ClimPi");
    } else {
      let path = window.location.href;
      let days = 30;
      let response = await fetch(
        `http://${
          path.split("/")[2].split(":")[0]
        }:5000/api/chart/get?days=${days}`
      );
      let data: any[] = await response.json();
      console.log(data);
      this.monthData = getDailyMinMax(data);
      this.dayData = getLast24Hours(data);
      this.calcDone = true;
      m.redraw();
    }
  }
  view(vnode: m.Vnode<HistorieViewAttrs, this>): m.Children | null | void {
    return m(
      ".cp-history-view",
      {
        key: "history-view",
        style: {
          width: "100%",
        },
      },
      m("H1", { key: "header", style: { textAlign: "center" } }, "Historie"),
      m(
        ".segmented-switch",
        {
          key: "segment123",
          style: {
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          },
        },
        m(
          OutlinedSegmentedButtonSet,
          {
            key: "segmentedset",
            multiselect: false,
          },
          m(OutlinedSegmentedButton, {
            key: "daybuttonseg",
            label: "Tag",
            selected: this.selectedSegment === "day",
            onclick: () => {
              this.selectedSegment = "day";
              m.redraw();
            },
          }),
          m(OutlinedSegmentedButton, {
            key: "weekbuttonseg",
            label: "Woche",
            selected: this.selectedSegment === "week",
            onclick: () => {
              this.selectedSegment = "week";
              m.redraw();
            },
          }),
          m(OutlinedSegmentedButton, {
            key: "monthbuttonseg",
            label: "Monat",
            selected: this.selectedSegment === "month",
            onclick: () => {
              this.selectedSegment = "month";
              m.redraw();
            },
          })
        )
      ),
      this.calcDone
        ? m(
            ".cp-historie-charts",
            {
              key: "charts",
              style: {
                marginTop: "2rem",
              },
            },
            this.selectedSegment === "month"
              ? m(DygraphDiv, {
                  key: "monthgraph",
                  data: this.monthData,
                  width: "calc(100% - 2rem)",
                })
              : this.selectedSegment === "week"
              ? m(DygraphDiv, {
                  key: "weekgraph",
                  data: filterLast7Days(this.monthData),
                  width: "calc(100% - 2rem)",
                })
              : m(DygraphDiv, {
                  key: "daygraph",
                  data: this.dayData,
                  width: "calc(100% - 2rem)",
                })
          )
        : m(
            ".loading",
            {
              key: "loadingpart",
              style: {
                display: "flex",
                justifyContent: "center",
              },
            },
            m("H3", "Daten werden Vorbereitet"),
            m(
              VAligner,
              m(Icon, {
                style: {
                  marginLeft: "2rem",
                  animation: "rotation infinite 1s ease",
                },
                icon: "autorenew",
              })
            )
          )
    );
  }
}
interface DataEntry {
  maxValue: number;
  minValue: number;
  timestamp: number;
}

interface DailyData {
  minValue: number;
  maxValue: number;
}

function getDailyMinMax(data: DataEntry[]): [Date, number, number][] {
  let dailyData: { [date: string]: DailyData } = {};

  data.forEach((entry) => {
    let date = new Date(entry.timestamp * 1000).toISOString().split("T")[0];
    if (!dailyData[date]) {
      dailyData[date] = { minValue: entry.minValue, maxValue: entry.maxValue };
    } else {
      dailyData[date].minValue = Math.min(
        dailyData[date].minValue,
        entry.minValue
      );
      dailyData[date].maxValue = Math.max(
        dailyData[date].maxValue,
        entry.maxValue
      );
    }
  });

  let formattedData: [Date, number, number][] = [];

  for (let date in dailyData) {
    formattedData.push([
      new Date(date),
      dailyData[date].minValue,
      dailyData[date].maxValue,
    ]);
  }

  return formattedData.reverse();
}
function getLast24Hours(data: DataEntry[]): [Date, number, number][] {
  let now = Math.floor(Date.now() / 1000); // Aktuelle Zeit in Sekunden
  let last24HoursData = data.filter((entry) => now - entry.timestamp <= 86400); // 86400 Sekunden = 24 Stunden

  let formattedData: [Date, number, number][] = last24HoursData.map((entry) => {
    let date = new Date(entry.timestamp * 1000).toISOString();
    return [new Date(date), entry.minValue, entry.maxValue];
  });

  return formattedData.reverse();
}

function filterLast7Days(
  dygraphData: [Date, number, number][]
): [Date, number, number][] {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return dygraphData.filter(([date]) => date >= sevenDaysAgo).reverse();
}
