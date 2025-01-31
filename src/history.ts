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
    let path = window.location.href;
    let days = 30;
    let response = await fetch(
      `http://${
        path.split("/")[2].split(":")[0]
      }:5000/api/chart/get?days=${days}`
    );
    let data: any[] = await response.json();
    this.monthData = dailyMaxMinTemperatures(data);
    this.dayData = hourlyMaxMinTemperatures(data);
    this.calcDone = true;
    m.redraw();
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
interface TemperatureData {
  timestamp: number;
  value: number;
}

function dailyMaxMinTemperatures(
  data: TemperatureData[]
): [Date, number, number][] {
  const dailyTemps: Record<string, number[]> = {};

  data.forEach((da: TemperatureData) => {
    const date = new Date(da.timestamp * 1000).toISOString().split("T")[0];
    if (!dailyTemps[date]) {
      dailyTemps[date] = [];
    }
    dailyTemps[date].push(da.value);
  });

  const dygraphData: [Date, number, number][] = [];
  for (const date in dailyTemps) {
    const temps = dailyTemps[date];
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const formattedDate = new Date(date);
    dygraphData.push([formattedDate, minTemp, maxTemp]);
  }

  return dygraphData.reverse();
}

function hourlyMaxMinTemperatures(
  data: TemperatureData[]
): [Date, number, number][] {
  const now = new Date();
  const twentyFourHoursAgo = now.getTime() - 24 * 60 * 60 * 1000;

  const last24HoursTemps = data.filter(
    (da) => da.timestamp * 1000 > twentyFourHoursAgo
  );

  const hourlyTemps: Record<string, number[]> = {};
  last24HoursTemps.forEach(({ timestamp, value }) => {
    const hour =
      new Date(timestamp * 1000).toISOString().split(":")[0] + ":00:00Z"; // YYYY-MM-DDTHH
    if (!hourlyTemps[hour]) {
      hourlyTemps[hour] = [];
    }
    hourlyTemps[hour].push(value);
  });

  const dygraphData: [Date, number, number][] = [];
  for (const hour in hourlyTemps) {
    const temps = hourlyTemps[hour];
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const formattedDate = new Date(hour);
    dygraphData.push([formattedDate, minTemp, maxTemp]);
  }

  return dygraphData;
}
function filterLast7Days(
  dygraphData: [Date, number, number][]
): [Date, number, number][] {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return dygraphData.filter(([date]) => date >= sevenDaysAgo);
}
// const dygraphData: [Date, number, number][] = [
//   [new Date("2025-01-02"), 33, 68],
//   [new Date("2025-01-03"), 44, 87],
//   [new Date("2025-01-04"), 39, 70],
//   [new Date("2025-01-05"), 40, 70],
//   [new Date("2025-01-06"), 32, 63],
//   [new Date("2025-01-07"), 30, 40],
//   [new Date("2025-01-08"), 49, 86],
//   [new Date("2025-01-09"), 31, 54],
//   [new Date("2025-01-10"), 50, 63],
//   [new Date("2025-01-11"), 21, 48],
//   [new Date("2025-01-12"), 31, 57],
//   [new Date("2025-01-13"), 28, 69],
//   [new Date("2025-01-14"), 39, 53],
//   [new Date("2025-01-15"), 50, 79],
//   [new Date("2025-01-16"), 41, 58],
//   [new Date("2025-01-17"), 51, 72],
//   [new Date("2025-01-18"), 29, 66],
//   [new Date("2025-01-19"), 36, 54],
//   [new Date("2025-01-20"), 60, 87],
//   [new Date("2025-01-21"), 40, 57],
//   [new Date("2025-01-22"), 30, 47],
//   [new Date("2025-01-23"), 24, 67],
//   [new Date("2025-01-24"), 45, 77],
//   [new Date("2025-01-25"), 23, 72],
//   [new Date("2025-01-26"), 47, 75],
//   [new Date("2025-01-27"), 30, 55],
//   [new Date("2025-01-28"), 28, 62],
//   [new Date("2025-01-29"), 22, 71],
//   [new Date("2025-01-30"), 36, 78],
//   [new Date("2025-01-31"), 18, 72],
// ];

// const dygraphDataWeek = [
//   [new Date("2025-01-25"), 23, 72],
//   [new Date("2025-01-26"), 47, 75],
//   [new Date("2025-01-27"), 30, 55],
//   [new Date("2025-01-28"), 28, 62],
//   [new Date("2025-01-29"), 22, 71],
//   [new Date("2025-01-30"), 36, 78],
//   [new Date("2025-01-31"), 18, 72],
// ];

// const dygraphDataTag: [Date, number, number][] = [
//   [new Date("2025-01-26T00:00:00"), 30, 55],
//   [new Date("2025-01-26T01:00:00"), 32, 57],
//   [new Date("2025-01-26T02:00:00"), 33, 59],
//   [new Date("2025-01-26T03:00:00"), 34, 60],
//   [new Date("2025-01-26T04:00:00"), 31, 58],
//   [new Date("2025-01-26T05:00:00"), 29, 56],
//   [new Date("2025-01-26T06:00:00"), 28, 54],
//   [new Date("2025-01-26T07:00:00"), 27, 52],
//   [new Date("2025-01-26T08:00:00"), 26, 50],
//   [new Date("2025-01-26T09:00:00"), 25, 48],
//   [new Date("2025-01-26T10:00:00"), 24, 46],
//   [new Date("2025-01-26T11:00:00"), 23, 45],
//   [new Date("2025-01-26T12:00:00"), 24, 47],
//   [new Date("2025-01-26T13:00:00"), 25, 49],
//   [new Date("2025-01-26T14:00:00"), 26, 51],
//   [new Date("2025-01-26T15:00:00"), 27, 53],
//   [new Date("2025-01-26T16:00:00"), 28, 55],
//   [new Date("2025-01-26T17:00:00"), 29, 57],
//   [new Date("2025-01-26T18:00:00"), 30, 59],
//   [new Date("2025-01-26T19:00:00"), 31, 61],
//   [new Date("2025-01-26T20:00:00"), 32, 63],
//   [new Date("2025-01-26T21:00:00"), 33, 65],
//   [new Date("2025-01-26T22:00:00"), 34, 67],
//   [new Date("2025-01-26T23:00:00"), 35, 69],
// ];
