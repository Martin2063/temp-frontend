import Dygraph from "dygraphs";
import m from "mithril";
import { getActualMaterialColors } from "../../utils";

interface DynamicGraphAttrs {
  data: any[];
  g: Dygraph;
  setGraph: (gr: Dygraph) => void;
}

export class DynamicGraph implements m.ClassComponent<DynamicGraphAttrs> {
  oncreate({
    attrs: { data, g, setGraph },
    dom,
  }: m.VnodeDOM<DynamicGraphAttrs, this>) {
    g = new Dygraph(dom as HTMLElement, data, {
      color: getActualMaterialColors("primary"),
      labels: ["Zeit", "Temperatur"],
    });
    setGraph(g);
    console.log("Graph ?", g);
  }
  view(vnode: m.Vnode<DynamicGraphAttrs, this>): m.Children | null | void {
    return m(".cp-dynamic-graph", {
      style: {
        maxWidth: "400px",
        marginLeft: "-2rem",
      },
    });
  }
}
