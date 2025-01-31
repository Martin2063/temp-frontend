import Dygraph from "dygraphs";
import m from "mithril";
import { getActualMaterialColors } from "../../utils";

interface DygraphDivAttrs {
  data: any;
  width?: string;
}

export class DygraphDiv implements m.ClassComponent<DygraphDivAttrs> {
  oncreate({ attrs: { data, width }, dom }: m.VnodeDOM<DygraphDivAttrs, this>) {
    new Dygraph(dom as HTMLElement, data, {
      labels: ["Datum", "Min", "Max"],
      colors: [
        getActualMaterialColors("primary"),
        getActualMaterialColors("inverse-primary"),
      ],
    });
  }
  view({
    attrs: { width },
  }: m.Vnode<DygraphDivAttrs, this>): m.Children | null | void {
    return m(".cp-dygraph", {
      style: {
        maxWidth: width ? width : "400px",
        width: width ? width : "400px",
      },
    });
  }
}
