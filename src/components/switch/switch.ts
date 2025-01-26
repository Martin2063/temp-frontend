import '@material/web/switch/switch';

import m from 'mithril';

interface SwitchAttr {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    [key: string]: any;
}

export class Switch implements m.ClassComponent<SwitchAttr> {
    view({ attrs: { onclick, ...other }, children }: m.Vnode<SwitchAttr>) {
        return m('md-switch', { onclick, ...other }, children);
    }
}
