import m from 'mithril';
interface VAlignerAttrs {
    maxWidth?: string;
    width?: string;
    marginRight?: string;
    marginTop?: string;
}
export class VAligner implements m.ClassComponent<VAlignerAttrs> {
    view({
        attrs: { maxWidth, width, marginRight, marginTop },
        children,
    }: m.Vnode<VAlignerAttrs, this>): void | m.Children {
        return m(
            '.ds-valigner',
            {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: maxWidth,
                    width: width ? width : '',
                    marginRight: marginRight,
                    marginTop: marginTop,
                },
            },
            children
        );
    }
}
