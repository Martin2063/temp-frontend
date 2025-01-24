import Dygraph from "dygraphs";
import m from "mithril";

interface DygraphDivAttrs {
  data: any;
}

export class DygraphDiv implements m.ClassComponent<DygraphDivAttrs> {
  oncreate({ attrs: { data }, dom }: m.VnodeDOM<DygraphDivAttrs, this>) {
    new Dygraph(dom as HTMLElement, data, {
      labels: ["Datum", "Höchst", "Niedrigst"],
    });
  }
  view({
    attrs: {},
  }: m.Vnode<DygraphDivAttrs, this>): m.Children | null | void {
    return m(".cp-dygraph", {
      style: {
        maxWidth: "400px",
      },
    });
  }
}
