import m from "mithril";
import { BigLabelButton, FanFace, SensorFace, Surface } from "./components";

interface DashboardAttrs {}

export class Dashboard implements m.ClassComponent<DashboardAttrs> {
  view(vnode: m.Vnode<DashboardAttrs, this>): m.Children | null | void {
    return m(
      ".cp-dashboard",
      {},
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
            label: "Backdoor Sensor",
            onlineSince: new Date("2024-12-12"),
            temp: 50,
            warnings: 3,
          }),
          m(FanFace, {
            label: "Zero DB Cooling",
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
            value: 1,
          }),
          m(BigLabelButton, {
            label: "Fans",
            value: 1,
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
            m(
              "div",
              { style: { fontSize: "4rem", textAlign: "center" } },
              "Platz für den Graph"
            )
          )
        )
      )
    );
  }
}
