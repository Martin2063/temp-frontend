import '@material/web/icon/icon';

import m from 'mithril';

export interface IconAttrs {
    icon: string;
    modifiers?: string;
    [key: string]: any;
}

export class Icon implements m.ClassComponent<IconAttrs> {
    view({ attrs: { icon, modifiers, ...other } }: m.Vnode<IconAttrs>) {
        return m(`md-icon${modifiers ? modifiers : ''}`, { ...other }, icon);
    }
}
