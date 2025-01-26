import m from "mithril";
import {
  OutlinedSegmentedButton,
  OutlinedSegmentedButtonSet,
} from "./components";

type SegmentOptions = "day" | "week" | "month";

interface HistorieViewAttrs {}

export class HistorieView implements m.ClassComponent<HistorieViewAttrs> {
  private selectedSegment: SegmentOptions = "day";
  view(vnode: m.Vnode<HistorieViewAttrs, this>): m.Children | null | void {
    return m(
      ".cp-history-view",
      {
        style: {
          width: "100%",
        },
      },
      m("H1", { style: { textAlign: "center" } }, "Historie"),
      m(
        ".segmented-switch",
        {
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
            multiselect: false,
          },
          m(OutlinedSegmentedButton, {
            label: "Tag",
            selected: this.selectedSegment === "day",
            onclick: () => {
              this.selectedSegment = "day";
            },
          }),
          m(OutlinedSegmentedButton, {
            label: "Woche",
            selected: this.selectedSegment === "week",
            onclick: () => {
              this.selectedSegment = "week";
            },
          }),
          m(OutlinedSegmentedButton, {
            label: "Monat",
            selected: this.selectedSegment === "month",
            onclick: () => {
              this.selectedSegment = "month";
            },
          })
        )
      )
    );
  }
}

const temperaturDatenMonth = [
  ["28.12.2024", 55, 30],
  ["29.12.2024", 62, 28],
  ["30.12.2024", 71, 22],
  ["31.12.2024", 78, 36],
  ["01.01.2025", 72, 18],
  ["02.01.2025", 68, 33],
  ["03.01.2025", 87, 44],
  ["04.01.2025", 70, 39],
  ["05.01.2025", 70, 40],
  ["06.01.2025", 63, 32],
  ["07.01.2025", 40, 30],
  ["08.01.2025", 86, 49],
  ["09.01.2025", 54, 31],
  ["10.01.2025", 63, 50],
  ["11.01.2025", 48, 21],
  ["12.01.2025", 57, 31],
  ["13.01.2025", 69, 28],
  ["14.01.2025", 53, 39],
  ["15.01.2025", 79, 50],
  ["16.01.2025", 58, 41],
  ["17.01.2025", 72, 51],
  ["18.01.2025", 66, 29],
  ["19.01.2025", 54, 36],
  ["20.01.2025", 87, 60],
  ["21.01.2025", 57, 40],
  ["22.01.2025", 47, 30],
  ["23.01.2025", 67, 24],
  ["24.01.2025", 77, 45],
  ["25.01.2025", 72, 23],
  ["26.01.2025", 75, 47],
];

const TemperaturDatenWeek = [
  ["20.01.2025", 87, 60],
  ["21.01.2025", 57, 40],
  ["22.01.2025", 47, 30],
  ["23.01.2025", 67, 24],
  ["24.01.2025", 77, 45],
  ["25.01.2025", 72, 23],
  ["26.01.2025", 75, 47],
];

const temperaturDatenTag = [
  ["26.01.2025 00:00", 55, 30],
  ["26.01.2025 01:00", 57, 32],
  ["26.01.2025 02:00", 59, 33],
  ["26.01.2025 03:00", 60, 34],
  ["26.01.2025 04:00", 58, 31],
  ["26.01.2025 05:00", 56, 29],
  ["26.01.2025 06:00", 54, 28],
  ["26.01.2025 07:00", 52, 27],
  ["26.01.2025 08:00", 50, 26],
  ["26.01.2025 09:00", 48, 25],
  ["26.01.2025 10:00", 46, 24],
  ["26.01.2025 11:00", 45, 23],
  ["26.01.2025 12:00", 47, 24],
  ["26.01.2025 13:00", 49, 25],
  ["26.01.2025 14:00", 51, 26],
  ["26.01.2025 15:00", 53, 27],
  ["26.01.2025 16:00", 55, 28],
  ["26.01.2025 17:00", 57, 29],
  ["26.01.2025 18:00", 59, 30],
  ["26.01.2025 19:00", 61, 31],
  ["26.01.2025 20:00", 63, 32],
  ["26.01.2025 21:00", 65, 33],
  ["26.01.2025 22:00", 67, 34],
  ["26.01.2025 23:00", 69, 35],
];
